# Testing Workflow

Use this workflow for every Londontour map/UI change. The goal is one reliable path, not a grab bag of browser attempts.

## Canonical Commands

Run these from the repo root:

```bash
npm run test:static
npm run test:map
```

`npm run test:static` runs the Node smoke tests against files and generated data.

`npm run test:map` is the definitive browser test. It uses the checked-in Playwright config, starts `public/` on `http://127.0.0.1:3000`, opens Chromium, and checks the real MapLibre runtime.

For a full local gate:

```bash
npm run test:all
```

For production after deploy:

```bash
npm run test:live
```

## One-Time Browser Setup

If `npm run test:map` says Chromium is missing, run:

```bash
npm run setup:browsers
```

Do not switch to ad hoc `npx playwright screenshot`, in-app browser poking, or guessed Chrome paths. Fix the checked-in Playwright setup and rerun `npm run test:map`.

## What `test:map` Proves

The browser test in `tests/browser/map-render.spec.mjs` checks:

- the app boots in browse mode
- the MapLibre debug hook exists
- `tube-network-lines` exists as a real MapLibre layer and source
- the tube layer has thousands of line features and at least ten colours
- `river-service-lines` exists as a real MapLibre layer and source
- both overlay layers sit above the basemap label layers
- the mobile nearby panel is bounded and scrollable
- there are no browser console/page errors during the check

This is the test to trust for “tube lines show” regressions. Static grep tests are not enough for that class of bug.

## Version And Cache Rule

After JS/CSS/service-worker changes, bump:

- `assetVersion` in `public/assets/app.js`
- `CACHE_NAME` in `public/sw.js`
- versioned asset URLs in `public/index.html`
- `public/assets/offline-map-assets.json`
- version assertions in `tests/smoke.test.mjs` and `tests/live-smoke.test.mjs`

Then run:

```bash
npm run test:all
```

## Debugging Rule

If a map visual bug is reported:

1. Reproduce with `npm run test:map` or add a focused assertion there.
2. Inspect `window.__londontourMapDebug` from the browser test if needed.
3. Fix the implementation.
4. Rerun `npm run test:all`.

Do not spend time cycling between unrelated browser tools. The default is Playwright through the repo scripts.
