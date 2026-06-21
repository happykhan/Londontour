const CACHE_NAME = 'londontour-offline-v26';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/app.js',
  '/assets/styles.css',
  '/assets/vendor/leaflet.js',
  '/assets/vendor/leaflet.css',
  '/assets/layers.json',
  '/assets/tube-network.json',
  '/assets/route-geometry.json',
  '/assets/tiles-manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);

      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isLocalAsset =
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/tiles/') ||
      url.pathname === '/' ||
      url.pathname === '/index.html');

  if (!isLocalAsset) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      if (cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && (response.ok || response.type === 'opaque')) {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        if (url.pathname === '/' || url.pathname === '/index.html') {
          return cache.match('/index.html');
        }
        throw error;
      }
    })()
  );
});
