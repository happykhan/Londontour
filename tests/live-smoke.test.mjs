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
  assert.match(html, /assets\/vendor\/leaflet\.js\?v=20260621-0908/);
  assert.match(html, /assets\/app\.js\?v=20260621-0908/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260621-0908'\)/);
  assert.doesNotMatch(html, /tile\.openstreetmap\.org/i);
});

test('production serves generated OpenStreetMap layers', async () => {
  const catalog = JSON.parse(await readText(`${liveUrl}/assets/layers.json`));
  const counts = new Map(catalog.layers.map((layer) => [layer.id, layer.points.length]));
  assert.equal(counts.has('attractions'), false);
  assert.equal(counts.has('food'), false);
  assert.ok(counts.get('landmarks') >= 20);
  assert.ok(counts.get('museums') >= 80);
  assert.ok(counts.get('monuments') >= 100);
  assert.ok(counts.get('plaques') >= 80);
  assert.ok(counts.get('pubs') >= 80);
  assert.ok(counts.get('transport') >= 8);
  assert.ok(counts.get('bus-planning') >= 100);
  assert.ok(counts.get('toilets') >= 60);
  assert.ok(counts.get('supermarkets') >= 60);

  const museums = catalog.layers.find((layer) => layer.id === 'museums');
  assert.ok(museums.points.every((point) => /^https?:\/\//.test(point.url)));
  const transport = catalog.layers.find((layer) => layer.id === 'transport');
  const busPlanning = catalog.layers.find((layer) => layer.id === 'bus-planning');
  assert.equal(transport.label, 'Tube and river links');
  assert.ok(transport.points.every((point) => point.transportType === 'boat'));
  assert.equal(busPlanning.editorOnly, true);
  assert.ok(busPlanning.points.every((point) => point.transportType === 'bus'));
});

test('production serves generated tube network', async () => {
  const tubeNetwork = JSON.parse(await readText(`${liveUrl}/assets/tube-network.json`));
  assert.ok(tubeNetwork.lines.length >= 10);
  assert.ok(tubeNetwork.riverServices.length >= 3);
  assert.ok(tubeNetwork.stations.length >= 180);
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'central'));
  assert.ok(tubeNetwork.riverServices.some((service) => service.label === 'RB1' && service.segments.length > 0));
});

test('production serves self-generated static PNG tiles', async () => {
  const response = await fetch(`${liveUrl}/tiles/14/8188/5447.png`, { cache: 'no-store' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  const body = Buffer.from(await response.arrayBuffer());
  assert.ok(body.length > 0, 'tile body should not be empty');
});
