/**
 * Cloudflare Worker for Zach's Terminal Website
 * Serves static files with caching and proper content types
 */

// Cache configuration
const CACHE_CONFIG = {
  // Cache for 1 hour in browser, 1 day on CDN
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

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathname = url.pathname;

      // Map the pathname to a file
      let fileName = FILE_MAP[pathname] || pathname.slice(1);

      // Security: Prevent directory traversal
      if (fileName.includes('..') || fileName.includes('//')) {
        return new Response('Invalid path', { status: 400 });
      }

      // Build GitHub URL (strip query params since GitHub doesn't use them)
      // But keep them in cache key for proper versioning
      const githubUrl = GITHUB_BASE + fileName;

      // Check cache first
      const cache = caches.default;
      let response = await cache.match(request);

      if (response) {
        // Return cached response with cache hit header
        response = new Response(response.body, response);
        response.headers.set('X-Cache', 'HIT');
        return response;
      }

      // Fetch from GitHub
      response = await fetch(githubUrl);

      if (!response.ok) {
        // If file not found and it's root, try fetching Core.html as fallback
        if (response.status === 404 && (pathname === '/' || pathname === '/index.html')) {
          const fallbackUrl = GITHUB_BASE + 'Core.html';
          response = await fetch(fallbackUrl);

          if (!response.ok) {
            return new Response('Website content not found', { status: 404 });
          }
        } else {
          return new Response(`File not found: ${fileName}`, { status: 404 });
        }
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
      });

      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
      });

      // Store in cache for future requests
      ctx.waitUntil(cache.put(request, modifiedResponse.clone()));

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
