# Basemap Replacement Plan

## Goal

Replace the current CARTO raster basemap with a commercial-safe, self-hosted map stack while keeping the app on Vercel for now.

The target stack is:

- OpenMapTiles-compatible vector tiles for the base map data.
- OpenMapTiles styles as the starting point for light and, if viable, dark map styles.
- MapLibre GL JS as the map renderer.
- PMTiles as the preferred static tile archive format.
- Vercel hosting for the app and initial London tile archive.

This avoids CARTO's commercial basemap licence requirement and avoids using OpenStreetMap's public tile servers.

## Licence Position

OpenMapTiles styles and schema can be used in commercial products with attribution. The hosted MapTiler/OpenMapTiles API free tier must not be used for commercial production because the free hosted service is non-commercial/R&D only.

The commercially safer path is to generate or obtain the London vector tiles ourselves, host them ourselves, and display attribution in the map UI and a data/licences screen.

Required visible attribution:

```text
© OpenMapTiles © OpenStreetMap contributors
```

The app also needs to keep TfL attribution for TfL-derived tube and river stop data.

## Hosting

Keep the website on Vercel for now.

For the first implementation, store the London PMTiles file in `public/` if the generated archive is small enough for practical Vercel deploys. If the archive becomes too large, keep the app on Vercel and move only the tile archive to Cloudflare R2 or another commercial-safe object store/CDN.

Before commercial launch, the Vercel account should be on a commercial-compatible plan rather than Hobby.

## Offline Behaviour

The app already has an explicit offline download flow. Reuse that.

Do not silently cache the full PMTiles basemap on first visit. The London basemap file may be large enough to waste mobile data and storage if downloaded automatically.

Initial behaviour:

- Stream the PMTiles basemap online as the user browses.
- Keep the existing download button as the explicit offline control.
- When the user taps download, cache the app shell, route data, selected layer data, and the London PMTiles archive or the selected offline map subset, depending on final file size.

Decision after proof of concept:

- If the London PMTiles file is modest, the download button can cache the whole London basemap.
- If it is large, the download button should clearly show the download size and cache either a route-focused subset or a lower-zoom fallback pack.

## Implementation Phases

### Phase 1: Basemap Proof Of Concept

- Add MapLibre GL JS.
- Add PMTiles support.
- Generate or obtain a London-only OpenMapTiles-compatible PMTiles archive.
- Render the basemap from the self-hosted PMTiles file.
- Apply one OpenMapTiles light style.
- Verify London labels, roads, parks, and the Thames render correctly at mobile and desktop sizes.
- Keep the rest of the app untouched as much as possible.

Current proof status:

- A separate `/maplibre-poc` page renders a self-hosted London PMTiles archive with MapLibre GL JS.
- The proof archive is `public/assets/basemaps/london-z14.pmtiles`.
- It covers the app's Greater London bounds `-0.52,51.28,0.34,51.70` to zoom 14.
- File size is 56,439,308 bytes, so it is suitable for a first Vercel/static-hosting proof but still too large to silently precache.
- The archive is derived from Protomaps Basemap/OpenStreetMap data, not CARTO tiles.
- The existing offline download button now reads `public/assets/offline-map-assets.json`, which includes both the current raster fallback tiles and the PMTiles proof archive.
- The proof page now renders existing `route-geometry.json` lines as MapLibre GeoJSON layers and can switch between the London tour and secret route.
- This is not yet the production basemap swap. The live app still uses Leaflet/CARTO until Phase 2 migrates overlays and the final vector style is selected.
- A Leaflet/MapLibre bridge was tested and backed out because it froze both the in-app browser and standalone Chrome before PMTiles range requests were made. Do not use that bridge as the migration path. Continue with a pure MapLibre map surface and port overlays in slices.

### Phase 2: Overlay Migration

Move the existing Leaflet overlays to MapLibre sources/layers:

- Tour route lines.
- Route step markers.
- POI layer markers.
- Tube and river lines.
- Tube station highlighting and popups.
- Search result selection.
- Explore-nearby radius circle and result highlighting.
- User location marker.

Route lines should remain visually distinct from tube and river services.

### Phase 3: UI And Offline Integration

- Wire the existing offline download button to the new basemap assets.
- Show download size before caching large basemap files.
- Add a Data & licences entry in the hamburger menu.
- Keep permanent map attribution visible without covering controls.
- Confirm layer toggles, route selection, and browse mode do not reset the map view.

### Phase 4: Production Hardening

- Remove CARTO basemap URLs.
- Add third-party notices for OpenMapTiles, OpenStreetMap, TfL, MapLibre, PMTiles, Leaflet if still present, and build tooling.
- Add smoke tests that fail if CARTO or public OSM tile URLs return.
- Add browser checks for zooming, labels, selected tube stations, route overlays, attribution, and mobile layout.
- Deploy to Vercel and verify production renders from self-hosted tiles.

## Test Plan

Automated checks:

- No `basemaps.cartocdn.com` references.
- No `tile.openstreetmap.org` references.
- Self-hosted PMTiles asset exists and is served.
- Required attribution text appears in the app.
- Existing layer and route smoke tests still pass.

Browser checks:

- Start at zoom 13 and confirm recognisable central London map detail.
- Zoom in and out around Westminster, City of London, Whitechapel, Greenwich, Camden, and the Thames.
- Confirm labels are not clipped or jumbled.
- Toggle each layer without changing the current map center/zoom.
- Select a tube stop and confirm popup plus multiple served lines.
- Use the offline download button and reload offline if a local test setup supports it.

## Open Questions

- Exact London coverage boundary for the PMTiles file: Greater London, Zone 4, or Zone 4 plus landmark buffer.
- Maximum acceptable offline download size for mobile users.
- Whether dark mode should use a true dark vector style immediately or stay light-only until the dark style is proven readable.
- Whether to keep Leaflet temporarily for overlays during migration, or switch the whole map surface to MapLibre in one pass.
