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
  assert.match(html, /assets\/vendor\/leaflet\.js\?v=20260621-0300/);
  assert.match(html, /assets\/app\.js\?v=20260621-0300/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260621-0300'\)/);
  assert.doesNotMatch(html, /tile\.openstreetmap\.org/i);
});

test('production serves generated OpenStreetMap layers', async () => {
  const catalog = JSON.parse(await readText(`${liveUrl}/assets/layers.json`));
  const counts = new Map(catalog.layers.map((layer) => [layer.id, layer.points.length]));
  assert.ok(counts.get('attractions') >= 80);
  assert.ok(counts.get('food') >= 80);
  assert.ok(counts.get('transport') >= 100);
  assert.ok(counts.get('toilets') >= 60);
  assert.ok(counts.get('supermarkets') >= 60);
});

test('production serves generated tube network', async () => {
  const tubeNetwork = JSON.parse(await readText(`${liveUrl}/assets/tube-network.json`));
  assert.ok(tubeNetwork.lines.length >= 10);
  assert.ok(tubeNetwork.stations.length >= 30);
  assert.ok(tubeNetwork.lines.some((line) => line.id === 'central'));
});

test('production serves self-generated static PNG tiles', async () => {
  const response = await fetch(`${liveUrl}/tiles/14/8188/5447.png`, { cache: 'no-store' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  const body = Buffer.from(await response.arrayBuffer());
  assert.ok(body.length > 0, 'tile body should not be empty');
});
