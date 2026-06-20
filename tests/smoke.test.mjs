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
  assert.match(html, /id="offline-button"/);
  assert.match(html, /id="recenter-button"/);
  assert.match(html, /getRegistrations\(\)/);
  assert.match(html, /caches\.keys\(\)/);
  assert.match(html, /serviceWorker\.register\('\/sw\.js\?v=20260620-1718'\)/);
  assert.match(html, /assets\/vendor\/leaflet\.js\?v=20260620-1718/);
  assert.match(html, /assets\/vendor\/leaflet\.css\?v=20260620-1718/);
});

test('app uses local tiles and contains both routes', () => {
  const js = read('assets/app.js');
  assert.match(js, /id: 'london-tour'/);
  assert.match(js, /id: 'secret-ldn-sightseeing'/);
  assert.match(js, /\/tiles\/\{z\}\/\{x\}\/\{y\}\.png/);
  assert.doesNotMatch(js, /\/api\/tile/);
  assert.doesNotMatch(js, /maplibre/i);
  assert.match(js, /routeBounds\.extend\(\[stop\.lat, stop\.lng\]\)/);
  assert.doesNotMatch(js, /routeBounds\.extend\(\[stop\.lng, stop\.lat\]\)/);
  assert.match(js, /L\.map\('map'/);
  assert.match(js, /L\.tileLayer\('/);
  assert.match(js, /Download offline pack/);
});

test('public directory is the single deployable app tree', () => {
  for (const duplicate of ['index.html', 'sw.js', 'assets', 'tiles', 'api']) {
    assert.ok(!existsSync(join(projectRoot, duplicate)), `${duplicate} should not exist at the repo root`);
  }
});

test('service worker precaches the local tile pack', () => {
  const sw = read('sw.js');
  assert.match(sw, /londontour-offline-v7/);
  assert.match(sw, /\/assets\/tiles-manifest\.json/);
  assert.doesNotMatch(sw, /url\.pathname\.startsWith\('\/api\/'\)/);
  assert.match(sw, /\/assets\/vendor\/leaflet\.js/);
  assert.match(sw, /\/assets\/vendor\/leaflet\.css/);
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
  ]) {
    assert.match(generator, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('local tile bundle has enough coverage for the manifest', () => {
  const tileFiles = listFiles('tiles').filter((file) => file.endsWith('.png'));
  assert.ok(tileFiles.length >= 80, 'expected at least 80 local tiles');
});

test('no openstreetmap tiles remain in the app shell', () => {
  for (const file of ['assets/app.js', 'sw.js', 'index.html']) {
    const content = read(file);
    assert.doesNotMatch(content, /openstreetmap|tile\.openstreetmap|openstreetmap\.org/i, `${file} should not reference OSM`);
  }

  assert.doesNotMatch(readFileSync(join(projectRoot, 'README.md'), 'utf8'), /openstreetmap|tile\.openstreetmap|openstreetmap\.org/i);
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

test('vercel clears stale site data on the HTML entrypoints', () => {
  const vercel = JSON.parse(readFileSync(join(projectRoot, 'vercel.json'), 'utf8'));
  const root = vercel.headers.find((entry) => entry.source === '/');
  const index = vercel.headers.find((entry) => entry.source === '/index.html');
  for (const entry of [root, index]) {
    assert.ok(entry, 'HTML entrypoint should exist');
    const clearHeader = entry.headers.find((header) => header.key === 'Clear-Site-Data');
    assert.ok(clearHeader, 'Clear-Site-Data should be set');
    assert.match(clearHeader.value, /"cache"/);
    assert.match(clearHeader.value, /"storage"/);
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
