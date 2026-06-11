/**
 * Cloudflare Worker for Zach's Terminal Website
 * Serves static files with caching and proper content types
 */

// Cache configuration
const CACHE_CONFIG = {
  HTML: 'public, max-age=3600, s-maxage=86400',
  CSS: 'public, max-age=86400, s-maxage=604800', // 1 day browser, 1 week CDN
  JS: 'public, max-age=86400, s-maxage=604800',
  IMAGES: 'public, max-age=604800, s-maxage=2592000', // 1 week browser, 30 days CDN
};

// File mappings
const FILE_MAP = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/styles.css': 'styles.css',
  '/script.js': 'script.js',
  '/data.js': 'data.js',
  '/manifest.json': 'manifest.json',
};

// Content type mappings
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// GitHub base URL for raw files
const GITHUB_BASE = 'https://raw.githubusercontent.com/taddiemason/PersonalWebsite/main/';

/**
 * Pull the common request metadata Cloudflare gives us for free.
 */
function requestMeta(request) {
  const cf = request.cf || {};
  return {
    referer: request.headers.get('Referer') || null,
    userAgent: request.headers.get('User-Agent') || null,
    country: cf.country || null,
    city: cf.city || null,
    ip: request.headers.get('CF-Connecting-IP') || null,
    rayId: request.headers.get('CF-Ray') || null,
  };
}

/**
 * Record an HTML page load in the `visits` table (all traffic, bots included).
 */
async function logVisit(request, env, pathname) {
  if (!env.DB) return; // No D1 binding configured yet — skip silently.
  try {
    const m = requestMeta(request);
    await env.DB.prepare(
      `INSERT INTO visits (path, referer, user_agent, country, city, ip, ray_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(pathname, m.referer, m.userAgent, m.country, m.city, m.ip, m.rayId)
      .run();
  } catch (err) {
    console.error('logVisit failed:', err.message);
  }
}

/**
 * Handle the client-side beacon: a request that gets here ran JS in a real
 * browser, so it's recorded in the `verified_humans` table.
 */
async function handleTrack(request, env, ctx) {
  // Only POST is meaningful; anything else just gets a polite no-op.
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }

  // Parse the (optional) JSON payload the page sends. Never trust its size.
  let payload = {};
  try {
    const text = await request.text();
    if (text && text.length <= 2048) payload = JSON.parse(text);
  } catch {
    payload = {};
  }

  if (env.DB) {
    const m = requestMeta(request);
    const path = typeof payload.path === 'string' ? payload.path.slice(0, 512) : null;
    const referer =
      typeof payload.referrer === 'string' && payload.referrer
        ? payload.referrer.slice(0, 512)
        : m.referer;
    const screen = typeof payload.screen === 'string' ? payload.screen.slice(0, 32) : null;
    const timezone = typeof payload.tz === 'string' ? payload.tz.slice(0, 64) : null;
    const language = typeof payload.language === 'string' ? payload.language.slice(0, 32) : null;

    ctx.waitUntil(
      env.DB.prepare(
        `INSERT INTO verified_humans
           (path, referer, user_agent, country, city, ip, ray_id, screen, timezone, language)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          path,
          referer,
          m.userAgent,
          m.country,
          m.city,
          m.ip,
          m.rayId,
          screen,
          timezone,
          language
        )
        .run()
        .catch((err) => console.error('handleTrack insert failed:', err.message))
    );
  }

  // 204 = accepted, nothing to return. Keeps the beacon lightweight.
  return new Response(null, { status: 204 });
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Verified-human beacon: the page POSTs here after it loads in a real
      // browser. Bots/crawlers that never run JS won't reach this.
      if (pathname === '/track') {
        return handleTrack(request, env, ctx);
      }

      // Map the pathname to a file
      let fileName = FILE_MAP[pathname] || pathname.slice(1);

      // Security: Prevent directory traversal
      if (fileName.includes('..') || fileName.includes('//')) {
        return new Response('Invalid path', { status: 400 });
      }

      // Build GitHub URL (strip query params since GitHub doesn't use them)
      // But keep them in cache key for proper versioning
      const githubUrl = GITHUB_BASE + fileName;

      // CACHING COMPLETELY DISABLED - Always fetch fresh from GitHub
      // const cache = caches.default;
      // let response = await cache.match(request);

      // Fetch from GitHub (bypassing cache entirely)
      let response = await fetch(githubUrl);

      if (!response.ok) {
        return new Response(`File not found: ${fileName}`, { status: 404 });
      }

      // Determine content type
      const extension = fileName.substring(fileName.lastIndexOf('.'));
      const contentType = CONTENT_TYPES[extension] || 'text/plain';

      // Determine cache control
      let cacheControl;
      if (extension === '.html') {
        cacheControl = CACHE_CONFIG.HTML;
      } else if (extension === '.css') {
        cacheControl = CACHE_CONFIG.CSS;
      } else if (extension === '.js') {
        cacheControl = CACHE_CONFIG.JS;
      } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico'].includes(extension)) {
        cacheControl = CACHE_CONFIG.IMAGES;
      } else {
        cacheControl = 'public, max-age=3600';
      }

      // Create response with proper headers
      const headers = new Headers({
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'X-Cache': 'MISS',
        'X-Content-Source': 'GitHub',
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'",
      });

      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
      });

      // Caching disabled - not storing in cache
      // ctx.waitUntil(cache.put(request, modifiedResponse.clone()));

      // Log one row per HTML page load (every hit the Worker sees, bots
      // included). Asset requests (css/js/json) are skipped to avoid
      // counting a single page view many times. Non-blocking.
      if (extension === '.html') {
        ctx.waitUntil(logVisit(request, env, pathname));
      }

      return modifiedResponse;
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        `Error loading website: ${error.message}`,
        {
          status: 500,
          headers: { 'Content-Type': 'text/plain' },
        }
      );
    }
  },
};
