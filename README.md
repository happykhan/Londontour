# London Tour

A deployable static Vercel app for a self-guided London walking tour.

## Features

- Shows a pre-baked London walking route with markers.
- Uses browser geolocation to show the user's current position on the map.
- Uses free OpenStreetMap tiles through Leaflet.
- Includes a printable directions panel with print-specific styling.

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
