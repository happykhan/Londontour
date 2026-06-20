# London Tour

A deployable static Vercel app for a self-guided London walking tour.

## Features

- Shows a pre-baked London tour with markers and POIs.
- Uses browser geolocation to show the user's current position on the map.
- Uses self-generated local street map tiles with Leaflet and a Vercel tile endpoint.
- Includes a printable directions panel with print-specific styling.
- Caches the app shell, tiles, and route geometry through a service worker.
- Includes a one-click offline pack download for the current London route.

## Build tiles

```bash
npm run tiles
```

This regenerates the self-hosted PNG tile set used by both `/tiles/...png` and `/api/tile`.

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
For offline use, open the tour once while online and tap "Download offline pack" so the app can cache the self-generated tiles and route data.
