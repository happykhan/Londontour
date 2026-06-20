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
  assert.match(html, /assets\/vendor\/leaflet\.js\?v=20260620-1718/);
  assert.match(html, /assets\/app\.js\?v=20260620-1718/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260620-1718'\)/);
  assert.doesNotMatch(html, /openstreetmap|tile\.openstreetmap|openstreetmap\.org/i);
});

test('production tile endpoint serves self-generated PNG tiles', async () => {
  const response = await fetch(`${liveUrl}/api/tile?z=14&x=8188&y=5447`, { cache: 'no-store' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  const body = Buffer.from(await response.arrayBuffer());
  assert.ok(body.length > 0, 'tile body should not be empty');
});

test('production tiles path rewrites to the self-generated tile endpoint', async () => {
  const response = await fetch(`${liveUrl}/tiles/14/8188/5447.png`, { cache: 'no-store' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'image/png');
  const body = Buffer.from(await response.arrayBuffer());
  assert.ok(body.length > 0, 'rewritten tile body should not be empty');
});
