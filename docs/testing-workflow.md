# Testing workflow

Use this workflow for every Londontour UI/map change. The goal is to prove the exact behaviour that changed without wasting time in stale browser state, service-worker cache, or guessed selectors.

## 1. Define the failure

- Write the bug as one observable sentence.
- Identify the minimum route, mode, zoom, layer state, and click sequence that should reproduce it.
- If the bug was reported with a screenshot, match that view as closely as possible before testing.

Example:

> In browse mode, clicking a tube station highlights its served lines; clicking empty map space should clear the station selection and restore normal tube-line styling.

## 2. Inspect the relevant code first

- Search with `rg`, not broad manual browsing.
- Read the event handlers, state variables, render function, and tests for the affected feature.
- For map bugs, check both `public/assets/app.js` and `public/assets/maplibre-leaflet-adapter.js`.
- Do not start changing CSS or map styling until the state/render path is understood.

## 3. Add a focused regression check

Prefer a cheap static/unit-style smoke assertion when the bug is about code paths:

- state reset functions exist
- event handlers are registered
- cache/version constants were bumped
- MapLibre adapter capabilities are present

Use browser verification when the bug is visual or interaction-based:

- controls visible
- zoom value changes
- marker counts change at zoom thresholds
- console has no errors
- page loads the expected asset version

## 4. Avoid stale browser state

Before browser verification after JS/CSS/service-worker changes:

- bump `assetVersion` in `public/assets/app.js`
- bump `CACHE_NAME` in `public/sw.js`
- update versioned script/style URLs in `public/index.html`
- update `public/assets/offline-map-assets.json`
- update tests that assert those versions

If a browser still behaves oddly, first verify the loaded script URL and service-worker cache version before debugging the feature again.

## 5. Run checks in this order

1. `npm test`
2. Start local server with `npm start`
3. Browser check on `http://localhost:3000/?mode=browse`
4. If relevant, `LONDONTOUR_LIVE_URL=http://localhost:3000 node --test tests/live-smoke.test.mjs`
5. Commit and push
6. Confirm production picked up the new version
7. `node --test tests/live-smoke.test.mjs`

## 6. Browser verification pattern

Use a fresh tab with a cache-busting query after versioned asset changes:

```text
http://localhost:3000/?mode=browse&cachecheck=<version>
```

Verify only the facts needed for the bug. Good checks are:

- current URL
- loaded asset version
- visible control count
- selected marker count/class
- map zoom text
- console errors
- rendered marker/line counts

Do not keep clicking around without a stated expected result.

## 7. Ship criteria

A change is ready to push when:

- the original failure has a specific fix
- `npm test` passes
- browser verification proves the changed interaction or visual state
- production live-smoke passes after deployment, unless explicitly skipped with a clear reason

