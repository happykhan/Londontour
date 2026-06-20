const TILE_HOSTS = [
  'https://tile.openstreetmap.org',
  'https://a.tile.openstreetmap.org',
  'https://b.tile.openstreetmap.org',
  'https://c.tile.openstreetmap.org',
];

function isSafeSegment(value) {
  return /^[0-9]+$/.test(value);
}

async function fetchTile(host, z, x, y) {
  const response = await fetch(`${host}/${z}/${x}/${y}.png`, {
    headers: {
      'User-Agent': 'Londontour/1.0 (+https://londontour.vercel.app)',
    },
  });

  if (!response.ok) {
    throw new Error(`Tile fetch failed with ${response.status}`);
  }

  return response;
}

module.exports = async function handler(req, res) {
  const { z, x, y } = req.query;
  const normalisedY = typeof y === 'string' ? y.replace(/\.png$/i, '') : y;

  if (!isSafeSegment(z) || !isSafeSegment(x) || !isSafeSegment(normalisedY)) {
    res.status(400).send('Invalid tile coordinates');
    return;
  }

  let tileResponse;
  let lastError;

  for (const host of TILE_HOSTS) {
    try {
      tileResponse = await fetchTile(host, z, x, normalisedY);
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!tileResponse) {
    res.status(502).send(`Unable to load map tile: ${lastError?.message || 'unknown error'}`);
    return;
  }

  res.setHeader('Content-Type', tileResponse.headers.get('content-type') || 'image/png');
  res.setHeader(
    'Cache-Control',
    'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800, stale-if-error=604800'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const body = Buffer.from(await tileResponse.arrayBuffer());
  res.status(200).send(body);
}
