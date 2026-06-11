-- D1 schema for Zach's Terminal Website analytics
-- Apply with:
--   wrangler d1 execute personalwebsite-analytics --remote --file=./schema.sql
-- (use --local instead of --remote to set up the local dev DB)

-- Every HTML page load the Worker sees, including bots/crawlers.
CREATE TABLE IF NOT EXISTS visits (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ts         TEXT NOT NULL DEFAULT (datetime('now')),
  path       TEXT,
  referer    TEXT,
  user_agent TEXT,
  country    TEXT,
  city       TEXT,
  ip         TEXT,
  ray_id     TEXT
);

-- Only visits confirmed as a real browser via the client-side JS beacon.
CREATE TABLE IF NOT EXISTS verified_humans (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ts         TEXT NOT NULL DEFAULT (datetime('now')),
  path       TEXT,
  referer    TEXT,
  user_agent TEXT,
  country    TEXT,
  city       TEXT,
  ip         TEXT,
  ray_id     TEXT,
  screen     TEXT,
  timezone   TEXT,
  language   TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_ts          ON visits(ts);
CREATE INDEX IF NOT EXISTS idx_verified_humans_ts ON verified_humans(ts);
