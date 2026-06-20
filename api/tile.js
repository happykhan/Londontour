import { readFile } from 'node:fs/promises';
import path from 'node:path';

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const z = url.searchParams.get('z');
  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');

  if (!z || !x || !y) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Missing tile coordinates.');
    return;
  }

  const tilePath = path.join(process.cwd(), 'tiles', z, x, `${y}.png`);

  try {
    const image = await readFile(tilePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.end(image);
  } catch (error) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Tile not found.');
  }
}
