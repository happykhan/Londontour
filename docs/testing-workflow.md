# Testing Workflow

Use this workflow for every Londontour map/UI change. The goal is a small reliable safety net plus deliberate human review, not a grab bag of browser attempts.

## Testing Split

Use automated tests only for objective failures:

- the app boots
- expected assets/data are served
- generated data has the expected shape and scale
- MapLibre creates the tube/river overlay layers
- the browser console has no runtime errors
- mobile panels are bounded and technically scrollable

Use manual testing for product feel:

- tube lines look visually right
- map labels, markers, and route lines are understandable
- popups feel well styled
- nearby/explore interactions feel usable on a phone
- the page feels fast enough while panning and zooming

Do not automate screenshots heavily right now. Screenshot tests are too brittle for this app while the map stack is still moving. If a screenshot helps explain a failure, capture one manually or as a one-off diagnostic, but do not make screenshots the default proof.

## Canonical Commands

Run these from the repo root:

```bash
npm run test:static
npm run test:map
```

`npm run test:static` runs the Node smoke tests against files and generated data.

`npm run test:map` is the objective browser runtime test. It uses the checked-in Playwright config, starts `public/` on `http://127.0.0.1:3000`, opens Chromium, and checks the real MapLibre runtime.

For a full local gate:

```bash
npm run test:all
```

For production after deploy:

```bash
npm run test:live
```

Run the production browser map test only when the deployed map itself is suspect:

```bash
LONDONTOUR_BROWSER_BASE_URL=https://londontour.vercel.app npm run test:map
```

If that production browser test is slow or flaky, stop after one diagnostic run. Check the loaded asset version and then use manual production review rather than looping.

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

This is the automated test to trust for “the tube layer exists in MapLibre” regressions. It does not prove that the tube map is aesthetically good. Visual quality still needs manual review.

## Manual Review Checklist

After meaningful UI/map changes, open production or the local server on desktop and mobile and check:

- At zoom 13, the default map shows useful content.
- Tube lines are visible, coloured, and distinct from tour route lines.
- Selecting a tube station highlights the relevant lines and clicking away clears the highlight.
- Tube station popups fit their contents; line chips do not clip.
- Generic POI popups show the category and source without noisy repeated text.
- Explore nearby uses familiar marker styling and the results list scrolls on mobile.
- Layer toggles do not reset the map position.
- The menu, layer panel, and route picker do not cover the important part of the map.

## Version And Cache Rule

After JS/CSS/service-worker changes, bump:

- `assetVersion` in `public/assets/app.js`
- `CACHE_NAME` in `public/sw.js`
- versioned asset URLs in `public/index.html`
- `public/assets/offline-map-assets.json`
- version assertions in `tests/smoke.test.mjs` and `tests/live-smoke.test.mjs`

Then run the objective local gate:

```bash
npm run test:all
```

## Debugging Rule

If a map visual bug is reported:

1. Reproduce with `npm run test:map` or add a focused assertion there.
2. If the automated test passes but the UI still looks wrong, switch to manual review immediately.
3. Inspect `window.__londontourMapDebug` from the browser test only when the failure is about whether layers/data exist.
4. Fix the implementation.
5. Rerun `npm run test:all`.
6. Manually review the affected interaction.

Do not spend time cycling between unrelated browser tools. The default automated path is Playwright through the repo scripts; the default visual path is human review in the browser.
