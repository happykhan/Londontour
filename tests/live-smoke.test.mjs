import assert from 'node:assert/strict';
import test from 'node:test';

const liveUrl = process.env.LONDONTOUR_LIVE_URL || 'https://londontour.vercel.app';

async function readText(url) {
  const response = await fetch(url, { cache: 'no-store' });
  assert.equal(response.status, 200, `${url} should return 200`);
  return await response.text();
}

test('production shell loads the app scripts', async () => {
  const html = await readText(liveUrl);
  assert.match(html, /assets\/vendor\/maplibre\/maplibre-gl\.js\?v=20260630-validation/);
  assert.match(html, /assets\/vendor\/pmtiles\/pmtiles\.js\?v=20260630-validation/);
  assert.match(html, /assets\/maplibre-leaflet-adapter\.js\?v=20260630-validation/);
  assert.match(html, /assets\/app\.js\?v=20260630-validation/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260630-validation'\)/);
  assert.doesNotMatch(html, /tile\.openstreetmap\.org/i);
  assert.doesNotMatch(html, /basemaps\.cartocdn\.com/i);
});

test('production serves the offline basemap manifest', async () => {
  const manifest = JSON.parse(await readText(`${liveUrl}/assets/offline-map-assets.json`));
  assert.equal(manifest.label, 'Local basemap');
  assert.ok(Array.isArray(manifest.tileManifests));
  assert.ok(manifest.tileManifests.some((entry) => entry.url === '/assets/tiles-manifest.json'));
  const pmtilesAsset = manifest.assets.find((entry) => entry.url === '/assets/basemaps/london-z14.pmtiles');
  assert.ok(pmtilesAsset, 'production manifest should include the London PMTiles proof archive');
  assert.equal(pmtilesAsset.bytes, 56439308);
});

test('production serves the MapLibre PMTiles proof page and archive', async () => {
  const html = await readText(`${liveUrl}/maplibre-poc.html`);
  assert.match(html, /London PMTiles/);
  assert.match(html, /assets\/vendor\/maplibre\/maplibre-gl\.js\?v=20260623-1220/);
  assert.match(html, /assets\/vendor\/pmtiles\/pmtiles\.js\?v=20260623-1220/);

  const response = await fetch(`${liveUrl}/assets/basemaps/london-z14.pmtiles`, {
    headers: { Range: 'bytes=0-6' },
    cache: 'no-store',
  });
  assert.ok([200, 206].includes(response.status), 'PMTiles archive should support a byte-range or full static response');
  const header = Buffer.from(await response.arrayBuffer()).subarray(0, 7).toString('utf8');
  assert.equal(header, 'PMTiles');
});

test('production serves generated OpenStreetMap layers', async () => {
  const catalog = JSON.parse(await readText(`${liveUrl}/assets/layers.json`));
  const tubeNetwork = JSON.parse(await readText(`${liveUrl}/assets/tube-network.json`));
  assert.deepEqual(catalog.bbox, { south: 51.38, west: -0.42, north: 51.66, east: 0.15 });
  assert.deepEqual(tubeNetwork.bbox, { south: 51.28, west: -0.52, north: 51.7, east: 0.34 });
  const counts = new Map(catalog.layers.map((layer) => [layer.id, layer.points.length]));
  assert.equal(counts.has('attractions'), false);
  assert.equal(counts.has('food'), false);
  assert.ok(counts.get('landmarks') >= 60);
  assert.ok(counts.get('museums') >= 300);
  assert.ok(counts.get('monuments') >= 400);
  assert.ok(counts.get('plaques') >= 300);
  assert.ok(counts.get('pubs') >= 500);
  assert.ok(counts.get('transport') >= 24);
  assert.ok(counts.get('bus-planning') >= 1500);
  assert.ok(counts.get('toilets') >= 300);
  assert.ok(counts.get('water') >= 300);
  assert.ok(counts.get('supermarkets') >= 400);

  const museums = catalog.layers.find((layer) => layer.id === 'museums');
  const landmarks = catalog.layers.find((layer) => layer.id === 'landmarks');
  const markets = catalog.layers.find((layer) => layer.id === 'markets');
  const monuments = catalog.layers.find((layer) => layer.id === 'monuments');
  const pubs = catalog.layers.find((layer) => layer.id === 'pubs');
  assert.equal(landmarks.minZoom, 11);
  assert.equal(museums.minZoom, 12);
  assert.equal(markets.minZoom, 12);
  assert.equal(monuments.minZoom, 14);
  assert.ok(museums.previewLimit > 0 && museums.fullZoom > museums.minZoom);
  assert.ok(pubs.previewLimit > 0 && pubs.fullZoom > pubs.minZoom);
  assert.ok(museums.points.every((point) => typeof point.priority === 'number'));
  assert.ok(museums.points.every((point) => /^https?:\/\//.test(point.url)));
  const transport = catalog.layers.find((layer) => layer.id === 'transport');
  const busPlanning = catalog.layers.find((layer) => layer.id === 'bus-planning');
  const water = catalog.layers.find((layer) => layer.id === 'water');
  assert.equal(transport.label, 'Tube and river links');
  assert.equal(transport.defaultVisible, true);
  assert.equal(transport.minZoom, 14);
  assert.equal(transport.fullZoom, 16);
  assert.ok(transport.points.every((point) => point.transportType === 'boat'));
  assert.ok(transport.points.every((point) => point.source.startsWith('TfL StopPoint')));
  assert.ok(transport.points.some((point) => point.name === 'Putney Pier'));
  assert.ok(transport.points.some((point) => point.name === 'Barking Riverside Pier'));
  assert.equal(water.label, 'Water refill points');
  assert.equal(water.minZoom, 14);
  assert.ok(water.points.every((point) => /Drinking water/.test(point.detail)));
  assert.equal(busPlanning.editorOnly, true);
  assert.ok(busPlanning.points.every((point) => point.transportType === 'bus'));
});

test('production serves generated tube network', async () => {
  const tubeNetwork = JSON.parse(await readText(`${liveUrl}/assets/tube-network.json`));
  assert.ok(tubeNetwork.lines.length >= 13);
  assert.ok(tubeNetwork.riverServices.length >= 3);
  assert.ok(tubeNetwork.stations.length >= 260);
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'central'));
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'dlr' && line.segments.length > 100));
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'elizabeth' && line.segments.length >= 10));
  assert.ok(tubeNetwork.riverServices.some((service) => service.label === 'RB1' && service.segments.length > 0));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Heathrow Terminal 5'));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Epping'));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Upminster'));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Canary Wharf' && station.lines.includes('dlr')));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Canary Wharf' && station.lines.includes('elizabeth')));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Abbey Wood' && station.lines.includes('elizabeth') && station.zone === '4'));
  assert.ok(tubeNetwork.stations.some((station) => station.name === 'Waterloo' && station.hasNationalRail));
});

test('production serves self-generated static PNG tiles', async () => {
  const response = await fetch(`${liveUrl}/tiles/14/8188/5447.png`, { cache: 'no-store' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  const body = Buffer.from(await response.arrayBuffer());
  assert.ok(body.length > 0, 'tile body should not be empty');
});
