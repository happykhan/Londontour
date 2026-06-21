import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const projectRoot = resolve(new URL('..', import.meta.url).pathname);
const publicRoot = join(projectRoot, 'public');

function read(file) {
  return readFileSync(join(publicRoot, file), 'utf8');
}

function listFiles(dir) {
  return readdirSync(join(publicRoot, dir), { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return listFiles(fullPath);
      }
      return [fullPath];
    });
}

test('critical assets are present', () => {
  for (const file of [
    'index.html',
    'assets/app.js',
    'assets/styles.css',
    'assets/layers.json',
    'assets/tube-network.json',
    'assets/route-geometry.json',
    'assets/tiles-manifest.json',
    'sw.js',
    'assets/vendor/leaflet.js',
    'assets/vendor/leaflet.css',
  ]) {
    assert.ok(existsSync(join(publicRoot, file)), `${file} should exist`);
  }

  assert.ok(existsSync(join(projectRoot, 'vercel.json')), 'vercel.json should exist');
});

test('index renders the route picker and offline controls', () => {
  const html = read('index.html');
  assert.match(html, /id="route-picker"/);
  assert.match(html, /id="route-highlights"/);
  assert.match(html, /id="layer-list"/);
  assert.match(html, /id="layers-all-button"/);
  assert.match(html, /id="layers-none-button"/);
  assert.match(html, /id="editor-panel"/);
  assert.match(html, /id="editor-output"/);
  assert.match(html, /id="offline-button"/);
  assert.match(html, /id="browse-picker-button"/);
  assert.match(html, /id="browse-map-button"/);
  assert.match(html, /name="offline-route"/);
  assert.match(html, /name="offline-tiles"/);
  assert.match(html, /name="offline-layers"/);
  assert.match(html, /id="recenter-button"/);
  assert.match(html, /id="theme-button"/);
  assert.match(html, /id="share-button"/);
  assert.doesNotMatch(html, /getRegistrations\(\)/);
  assert.doesNotMatch(html, /caches\.keys\(\)/);
  assert.match(html, /aria-controls="layers-panel"/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260621-0908'\)/);
  assert.match(html, /assets\/vendor\/leaflet\.js\?v=20260621-0908/);
  assert.match(html, /assets\/vendor\/leaflet\.css\?v=20260621-0908/);
});

test('app uses a real online basemap, local offline fallback, layer registry hooks, and both routes', () => {
  const js = read('assets/app.js');
  assert.match(js, /id: 'london-tour'/);
  assert.match(js, /id: 'secret-ldn-sightseeing'/);
  assert.match(js, /const editorMode = initialSearchParams\.get\('editor'\) === '1'/);
  assert.match(js, /const initialBrowseMode = editorMode \|\| initialSearchParams\.get\('mode'\) === 'browse'/);
  assert.match(js, /const initialRoute = initialBrowseMode \? undefined : routes\.find/);
  assert.match(js, /document\.body\.classList\.add\('route-view'\)/);
  assert.match(js, /const fallbackLayerCatalog = \[/);
  assert.match(js, /async function loadLayerCatalog/);
  assert.match(js, /\/assets\/layers\.json/);
  assert.match(js, /id: 'supermarkets'/);
  assert.match(js, /id: 'landmarks'/);
  assert.match(js, /id: 'museums'/);
  assert.match(js, /id: 'monuments'/);
  assert.match(js, /id: 'plaques'/);
  assert.match(js, /id: 'pubs'/);
  assert.match(js, /id: 'bus-planning'/);
  assert.match(js, /function visibleLayerCatalog/);
  assert.match(js, /function loadEditorDraft/);
  assert.match(js, /function renderEditorDraftOverlays/);
  assert.match(js, /mustShowPointIds/);
  assert.match(js, /mustHidePointIds/);
  assert.match(js, /function activeLayerPoints/);
  assert.match(js, /function visibleRouteStops/);
  assert.match(js, /function fitSelectedRouteBounds/);
  assert.match(js, /function enterBrowseMode/);
  assert.match(js, /function toggleBrowseLayers/);
  assert.match(js, /function applyLayerSelection/);
  assert.match(js, /browse-layers-open/);
  assert.match(js, /function clearRouteOverlays/);
  assert.match(js, /mode', 'browse'/);
  assert.match(js, /selectedRouteBounds = routeBounds/);
  assert.match(js, /pointMatchesRoute/);
  assert.match(js, /function routeDistanceMeters/);
  assert.match(js, /function pointToSegmentDistanceMeters/);
  assert.match(js, /function loadTubeNetwork/);
  assert.match(js, /async function renderTubeNetwork/);
  assert.match(js, /const assetVersion = '20260621-0908'/);
  assert.match(js, /function assetUrl/);
  assert.match(js, /assetUrl\('\/assets\/layers\.json'\)/);
  assert.match(js, /function safeExternalUrl/);
  assert.match(js, /function popupTitle/);
  assert.match(js, /target="_blank"/);
  assert.match(js, /transportType/);
  assert.match(js, /layer-marker-transport-/);
  assert.match(js, /const majorTubeStationMinZoom = 12/);
  assert.match(js, /const tubeStationMinZoom = 13/);
  assert.match(js, /function isMajorTubeStation/);
  assert.match(js, /showMajorStations/);
  assert.match(js, /Major interchange/);
  assert.match(js, /is-major/);
  assert.match(js, /\/assets\/tube-network\.json/);
  assert.match(js, /riverServiceLayers/);
  assert.match(js, /riverServices/);
  assert.match(js, /tubeNetworkRenderer = L\.svg/);
  assert.match(js, /basemapRepairLabels/);
  assert.match(js, /Whitechapel/);
  assert.match(js, /dashArray: '8 8'/);
  assert.match(js, /river service/);
  assert.doesNotMatch(js, /pois: \[/);
  assert.match(js, /basemaps\.cartocdn\.com\/light_nolabels/);
  assert.match(js, /basemaps\.cartocdn\.com\/light_only_labels/);
  assert.match(js, /createPane\('basemapLabels'\)/);
  assert.match(js, /OpenStreetMap contributors/);
  assert.match(js, /function routeStrokeStyle/);
  assert.match(js, /useOfflineTiles/);
  assert.match(js, /\/tiles\/\{z\}\/\{x\}\/\{y\}\.png/);
  assert.doesNotMatch(js, /\/api\/tile/);
  assert.doesNotMatch(js, /maplibre/i);
  assert.match(js, /routeCoordinates\.forEach/);
  assert.match(js, /fitSelectedRouteBounds\(\{ animate: false \}\)/);
  assert.doesNotMatch(js, /routeBounds\.extend\(\[stop\.lng, stop\.lat\]\)/);
  assert.match(js, /L\.map\('map'/);
  assert.match(js, /L\.tileLayer\('/);
  assert.match(js, /Download offline pack/);
  assert.match(js, /navigator\.share/);
  assert.match(js, /localStorage\.setItem\(themeStateKey/);
});

test('dark mode has explicit mobile surfaces and controls', () => {
  const css = read('assets/styles.css');
  assert.match(css, /body\[data-theme="dark"\] \.secondary-button/);
  assert.match(css, /body\[data-theme="dark"\] \.route-card/);
  assert.match(css, /body\[data-theme="dark"\]:not\(\.route-view\) \.tour-panel/);
  assert.match(css, /body\[data-theme="dark"\]\.route-view \.tour-panel/);
  assert.match(css, /\.layer-marker-landmarks/);
  assert.match(css, /\.layer-marker-museums/);
  assert.match(css, /\.layer-marker-monuments/);
  assert.match(css, /\.layer-marker-plaques/);
  assert.match(css, /\.layer-marker-pubs/);
  assert.match(css, /\.layer-marker-bus-planning/);
  assert.match(css, /\.layer-marker\.is-editor-must-show/);
  assert.match(css, /\.editor-output/);
  assert.match(css, /\.layer-marker-transport-boat/);
  assert.match(css, /\.tube-station-marker\.is-major/);
  assert.match(css, /\.basemap-repair-label/);
});

test('public directory is the single deployable app tree', () => {
  for (const duplicate of ['index.html', 'sw.js', 'assets', 'tiles', 'api']) {
    assert.ok(!existsSync(join(projectRoot, duplicate)), `${duplicate} should not exist at the repo root`);
  }
});

test('service worker precaches the local tile pack', () => {
  const sw = read('sw.js');
  assert.match(sw, /londontour-offline-v34/);
  assert.match(sw, /isAppShell/);
  assert.match(sw, /clients\.matchAll/);
  assert.match(sw, /client\.navigate\(client\.url\)/);
  assert.match(sw, /isJsonAsset/);
  assert.match(sw, /\/assets\/layers\.json/);
  assert.match(sw, /\/assets\/tube-network\.json/);
  assert.match(sw, /\/assets\/tiles-manifest\.json/);
  assert.doesNotMatch(sw, /url\.pathname\.startsWith\('\/api\/'\)/);
  assert.match(sw, /\/assets\/vendor\/leaflet\.js/);
  assert.match(sw, /\/assets\/vendor\/leaflet\.css/);
});

test('generated layer catalog imports substantial external OpenStreetMap data', () => {
  const catalog = JSON.parse(read('assets/layers.json'));
  assert.equal(catalog.source, 'OpenStreetMap via Overpass API');
  assert.ok(catalog.generatedAt, 'generatedAt should be recorded');

  const counts = new Map(catalog.layers.map((layer) => [layer.id, layer.points.length]));
  assert.equal(counts.has('attractions'), false, 'legacy attractions layer should be split out');
  assert.equal(counts.has('food'), false, 'legacy food layer should be renamed to pubs');
  assert.ok(counts.get('landmarks') >= 20, 'essential landmarks should come from the generated external dataset');
  assert.ok(counts.get('museums') >= 80, 'museums should come from the generated external dataset');
  assert.ok(counts.get('monuments') >= 100, 'statues and monuments should come from the generated external dataset');
  assert.ok(counts.get('plaques') >= 80, 'plaques should come from the generated external dataset');
  assert.ok(counts.get('pubs') >= 80, 'pubs should come from the generated external dataset');
  assert.ok(counts.get('transport') >= 8, 'public transport links should include river piers');
  assert.ok(counts.get('bus-planning') >= 100, 'bus stops should remain available for route editing');
  assert.ok(counts.get('toilets') >= 60, 'public toilets should come from the generated external dataset');
  assert.ok(counts.get('supermarkets') >= 60, 'supermarkets should come from the generated external dataset');

  const museums = catalog.layers.find((layer) => layer.id === 'museums');
  assert.ok(museums, 'museums layer should exist');
  for (const point of museums.points) {
    assert.match(point.url, /^https?:\/\//, `${point.name} should expose a museum URL for the popup title`);
  }

  const publicTransport = catalog.layers.find((layer) => layer.id === 'transport');
  const busPlanning = catalog.layers.find((layer) => layer.id === 'bus-planning');
  assert.equal(publicTransport.label, 'Tube and river links');
  assert.equal(busPlanning.editorOnly, true, 'bus stops should be hidden from normal browse controls');

  for (const layer of catalog.layers) {
    assert.equal(typeof layer.routeRadiusMeters, 'number', `${layer.id} should define a metre detour radius`);
    for (const point of layer.points) {
      assert.ok(point.source?.startsWith('OpenStreetMap'), `${point.name} should retain its OSM source`);
      assert.equal(typeof point.lat, 'number');
      assert.equal(typeof point.lng, 'number');
    }
  }
});

test('generated tube network imports TfL stations and OSM line geometry', () => {
  const tubeNetwork = JSON.parse(read('assets/tube-network.json'));
  const catalog = JSON.parse(read('assets/layers.json'));
  assert.match(tubeNetwork.source, /OpenStreetMap/);
  assert.match(tubeNetwork.source, /TfL/);
  assert.match(tubeNetwork.source, /river ferry/);
  assert.ok(tubeNetwork.lines.length >= 10, 'Zone 1-4 tube network should include major Underground lines');
  assert.ok(tubeNetwork.riverServices.length >= 3, 'river bus network should include public river service geometry');
  assert.ok(tubeNetwork.stations.length >= 180, 'Zone 1-4 tube network should include TfL tube stations');
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'central'), 'Central line should be present');
  assert.ok(tubeNetwork.riverServices.some((service) => service.label === 'RB1'), 'RB1 river service should be present');
  assert.ok(tubeNetwork.riverServices.some((service) => service.label === 'RB6'), 'RB6 river service should be present');
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Bank'), 'Bank station should be present');
  assert.ok(tubeNetwork.stations.every((station) => station.zone), 'Tube stations should include fare zone data');

  for (const line of tubeNetwork.lines) {
    assert.ok(line.color, `${line.id} should have a line colour`);
    assert.ok(line.segments.length > 0, `${line.id} should have line geometry`);
  }

  for (const service of tubeNetwork.riverServices) {
    assert.ok(service.color, `${service.id} should have a service colour`);
    assert.ok(service.segments.length > 0, `${service.id} should have river geometry`);
  }

  const tubeStationNames = new Set(tubeNetwork.stations.map((station) => station.name.toLowerCase()));
  const transportLayer = catalog.layers.find((layer) => layer.id === 'transport');
  assert.ok(transportLayer, 'transport layer should exist');
  const transportCounts = new Map();
  for (const point of transportLayer.points) {
    transportCounts.set(point.transportType, (transportCounts.get(point.transportType) || 0) + 1);
    assert.equal(point.transportType, 'boat', `${point.name} should be a public river pier`);
    assert.equal(point.markerLabel, 'Boat', `${point.name} should have a boat marker label`);
    assert.doesNotMatch(`${point.name} ${point.detail}`, /underground|tube|subway|railway|stop position/i);
    const transportName = point.name.replace(/\s+Station$/i, '').toLowerCase();
    assert.ok(!tubeStationNames.has(transportName), `${point.name} should not duplicate a tube station marker`);
    assert.doesNotMatch(point.name, /^\d+[A-Z]?$/);
    assert.doesNotMatch(point.name, /platforms?/i);
  }
  assert.ok(transportCounts.get('boat') >= 8, 'transport layer should include river piers');

  const busPlanningLayer = catalog.layers.find((layer) => layer.id === 'bus-planning');
  assert.ok(busPlanningLayer, 'bus-planning layer should exist for route editing');
  assert.equal(busPlanningLayer.editorOnly, true, 'bus stops should be editor-only');
  for (const point of busPlanningLayer.points) {
    assert.equal(point.transportType, 'bus', `${point.name} should be typed as a bus stop`);
    assert.equal(point.markerLabel, 'Bus', `${point.name} should have a bus marker label`);
    assert.doesNotMatch(`${point.name} ${point.detail}`, /underground|tube|subway|railway|stop position/i);
  }
  assert.ok(busPlanningLayer.points.length >= 100, 'editor bus layer should keep bus stop planning data');
});

test('route geometry file is valid and complete', () => {
  const routeGeometry = JSON.parse(read('assets/route-geometry.json'));
  for (const key of ['london-tour', 'secret-ldn-sightseeing']) {
    assert.ok(routeGeometry[key], `${key} geometry should exist`);
    for (const segment of Object.keys(routeGeometry[key])) {
      const coordinates = routeGeometry[key][segment];
      assert.ok(Array.isArray(coordinates), `${key}.${segment} should be an array`);
      assert.ok(coordinates.length >= 2, `${key}.${segment} should have route points`);
      for (const coordinate of coordinates) {
        assert.ok(Array.isArray(coordinate) && coordinate.length === 2, 'coordinates should be [lng, lat]');
      }
    }
  }
});

test('tile manifest maps to real files', () => {
  const manifest = JSON.parse(read('assets/tiles-manifest.json'));
  assert.ok(Array.isArray(manifest) && manifest.length > 0, 'tile manifest should not be empty');

  for (const tilePath of manifest) {
    assert.match(tilePath, /^\/tiles\/\d+\/\d+\/\d+\.png$/);
    assert.ok(existsSync(join(publicRoot, tilePath)), `missing tile file ${tilePath}`);
    const stats = statSync(join(publicRoot, tilePath));
    assert.ok(stats.size > 0, `tile file ${tilePath} should not be empty`);
  }
});

test('tile renderer includes central London landmarks', () => {
  const generator = readFileSync(join(projectRoot, 'scripts/generate_tiles.py'), 'utf8');
  for (const label of [
    'Piccadilly Circus',
    'Covent Garden',
    'London Eye',
    'St Paul’s Cathedral',
    'Tower Bridge',
    'Trafalgar Square',
    'Whitechapel',
  ]) {
    assert.match(generator, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('local tile bundle has enough coverage for the manifest', () => {
  const tileFiles = listFiles('tiles').filter((file) => file.endsWith('.png'));
  assert.ok(tileFiles.length >= 170, 'expected at least 170 local tiles');
});

test('the app avoids direct openstreetmap tile server usage', () => {
  for (const file of ['assets/app.js', 'sw.js', 'index.html']) {
    const content = read(file);
    assert.doesNotMatch(content, /tile\.openstreetmap\.org/i, `${file} should not use the direct OSM tile server`);
  }
});

test('vercel serves the app shell with no-store caching', () => {
  const vercel = JSON.parse(readFileSync(join(projectRoot, 'vercel.json'), 'utf8'));
  const headerTargets = new Map(
    vercel.headers.map((entry) => [entry.source, entry.headers?.find((header) => header.key === 'Cache-Control')?.value || ''])
  );

  for (const source of ['/', '/index.html', '/sw.js', '/assets/(.*)']) {
    assert.ok(headerTargets.has(source), `${source} should have a cache-control header`);
    assert.match(headerTargets.get(source), /no-store/);
  }
});

test('vercel does not clear browser storage on every HTML entrypoint load', () => {
  const vercel = JSON.parse(readFileSync(join(projectRoot, 'vercel.json'), 'utf8'));
  const root = vercel.headers.find((entry) => entry.source === '/');
  const index = vercel.headers.find((entry) => entry.source === '/index.html');
  for (const entry of [root, index]) {
    assert.ok(entry, 'HTML entrypoint should exist');
    const clearHeader = entry.headers.find((header) => header.key === 'Clear-Site-Data');
    assert.equal(clearHeader, undefined, 'Clear-Site-Data should not be sent on normal page loads');
  }
});

test('vercel serves the static tile bundle directly', () => {
  const vercel = JSON.parse(readFileSync(join(projectRoot, 'vercel.json'), 'utf8'));
  assert.ok(!vercel.rewrites, 'static tiles should not be routed through an API rewrite');

  const tileHeader = vercel.headers.find((entry) => entry.source === '/tiles/(.*)');
  assert.ok(tileHeader, 'tiles should have a cache-control header');
  assert.match(
    tileHeader.headers.find((header) => header.key === 'Cache-Control')?.value || '',
    /immutable/
  );
});
