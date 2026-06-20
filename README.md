# London Tour

A deployable static Vercel app for a self-guided London walking tour.

## Features

- Shows a pre-baked London tour with markers and POIs.
- Uses browser geolocation to show the user's current position on the map.
- Uses a real CARTO/OpenStreetMap basemap by default.
- Keeps self-generated local tiles in `public/tiles` as the offline fallback map.
- Keeps attractions, pubs, toilets, transport links, and supermarkets in reusable map layers.
- Includes route-aware layer filtering so new categories can be added without editing route data.
- Includes light/dark theme state, route sharing, and a printable route sheet with map and directions.
- Caches the app shell, route geometry, selected layers, and optional tiles through a service worker.
- Includes an offline pack manager for the current route, visible layers, and local tile bundle.

## Build tiles

```bash
npm run tiles
```

This regenerates the offline fallback PNG tile set served from `/tiles/...png`.

## Local preview

```bash
npm install
npm start
```

## Deploy to Vercel

```bash
npm install
npx vercel --prod
```

No API keys are required. Geolocation requires HTTPS, which Vercel provides for production deployments.
For offline use, open the tour once while online and tap "Download offline pack" so the app can cache route data and the fallback tile pack.
