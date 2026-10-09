/* A Sailor's Guide to the Galaxy — offline service worker.
   Bump VERSION on deploys that should invalidate cached pages. */
const VERSION = 'clsa-v7';
const PRECACHE = ['/', '/index.html', '/learn.html', '/racecourse.html', '/scoring.html', '/weather.html', '/rigging.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Network-first for same-origin GETs: fresh copy when online, cache when not.
   Cross-origin (weather API, burgee, knot videos) passes through untouched. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() =>
        caches.match(e.request, { ignoreSearch: true })
          .then(hit => hit || caches.match('/index.html'))
      )
  );
});
