const CACHE_NAME = 'londontour-offline-v58';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/assets/app.js',
  '/assets/styles.css',
  '/assets/vendor/maplibre/maplibre-gl.js',
  '/assets/vendor/maplibre/maplibre-gl.css',
  '/assets/vendor/pmtiles/pmtiles.js',
  '/assets/maplibre-leaflet-adapter.js',
  '/assets/layers.json',
  '/assets/tube-network.json',
  '/assets/route-geometry.json',
  '/assets/offline-map-assets.json',
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
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      await Promise.all(
        clients.map((client) => {
          try {
            const url = new URL(client.url);
            if (url.origin !== self.location.origin) return null;
            return client.navigate(client.url);
          } catch (error) {
            return null;
          }
        })
      );
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
      const cached = (await cache.match(event.request)) || (await cache.match(url.pathname));
      const isJsonAsset = url.origin === self.location.origin && url.pathname.startsWith('/assets/') && url.pathname.endsWith('.json');
      const isAppShell =
        url.pathname === '/' ||
        url.pathname === '/index.html' ||
        url.pathname === '/assets/app.js' ||
        url.pathname === '/assets/styles.css';
      if (!isJsonAsset && !isAppShell && cached) return cached;

      try {
        const response = await fetch(event.request);
        if (response && (response.ok || response.type === 'opaque')) {
          cache.put(event.request, response.clone());
        }
        return response;
      } catch (error) {
        if (cached) return cached;
        if (url.pathname === '/' || url.pathname === '/index.html') {
          return cache.match('/index.html');
        }
        throw error;
      }
    })()
  );
});
