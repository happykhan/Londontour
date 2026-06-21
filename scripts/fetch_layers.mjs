import { writeFile } from 'node:fs/promises';

const BBOX = {
  south: 51.495,
  west: -0.145,
  north: 51.523,
  east: -0.068,
};

const OUTPUT_FILE = new URL('../public/assets/layers.json', import.meta.url);
const USER_AGENT = 'Londontour data import (https://github.com/happykhan/Londontour)';

const layerDefinitions = [
  {
    id: 'attractions',
    label: 'Major attractions',
    defaultVisible: true,
    minZoom: 13,
    markerLabel: 'A',
    routeRadiusMeters: 650,
    maxItems: 90,
  },
  {
    id: 'food',
    label: 'Pubs and rest stops',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'P',
    routeRadiusMeters: 500,
    maxItems: 90,
  },
  {
    id: 'transport',
    label: 'Transport links',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'T',
    routeRadiusMeters: 500,
    maxItems: 120,
  },
  {
    id: 'toilets',
    label: 'Public toilets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'WC',
    routeRadiusMeters: 400,
    maxItems: 80,
  },
  {
    id: 'supermarkets',
    label: 'Supermarkets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'S',
    routeRadiusMeters: 450,
    maxItems: 80,
  },
];

function bboxString() {
  return `${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east}`;
}

function overpassQuery() {
  const bbox = bboxString();
  return `[out:json][timeout:25];(
  node[amenity~"^(pub|bar|cafe|restaurant)$"](${bbox});
  way[amenity~"^(pub|bar|cafe|restaurant)$"](${bbox});
  relation[amenity~"^(pub|bar|cafe|restaurant)$"](${bbox});
  node[amenity=toilets](${bbox});
  way[amenity=toilets](${bbox});
  relation[amenity=toilets](${bbox});
  node[shop~"^(supermarket|convenience)$"](${bbox});
  way[shop~"^(supermarket|convenience)$"](${bbox});
  relation[shop~"^(supermarket|convenience)$"](${bbox});
  node[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  way[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  relation[tourism~"^(attraction|museum|gallery|artwork|viewpoint)$"](${bbox});
  node[historic](${bbox});
  way[historic](${bbox});
  relation[historic](${bbox});
  node[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  way[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  relation[railway~"^(station|subway_entrance|tram_stop)$"](${bbox});
  node[public_transport~"^(platform|station|stop_position)$"](${bbox});
  way[public_transport~"^(platform|station|stop_position)$"](${bbox});
  relation[public_transport~"^(platform|station|stop_position)$"](${bbox});
  node[highway=bus_stop](${bbox});
  node[amenity=ferry_terminal](${bbox});
  way[amenity=ferry_terminal](${bbox});
  relation[amenity=ferry_terminal](${bbox});
);out center tags qt;`;
}

async function fetchOverpass() {
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery())}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Overpass request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function coordinateFor(element) {
  const lat = element.lat ?? element.center?.lat;
  const lng = element.lon ?? element.center?.lon;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat: Number(lat.toFixed(6)), lng: Number(lng.toFixed(6)) };
}

function classify(tags = {}) {
  if (/^(pub|bar|cafe|restaurant)$/.test(tags.amenity)) return 'food';
  if (tags.amenity === 'toilets') return 'toilets';
  if (/^(supermarket|convenience)$/.test(tags.shop)) return 'supermarkets';
  if (tags.tourism || tags.historic) return 'attractions';
  if (tags.railway || tags.public_transport || tags.highway === 'bus_stop' || tags.amenity === 'ferry_terminal') {
    return 'transport';
  }
  return null;
}

function titleCase(value = '') {
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function fallbackName(layerId, tags) {
  if (layerId === 'toilets') return 'Public toilets';
  if (layerId === 'transport') return titleCase(tags.station || tags.railway || tags.public_transport || tags.highway || 'Transport stop');
  if (layerId === 'supermarkets') return titleCase(tags.shop || 'Supermarket');
  if (layerId === 'food') return titleCase(tags.amenity || 'Rest stop');
  return titleCase(tags.tourism || tags.historic || 'Attraction');
}

function detailFor(layerId, tags = {}) {
  if (layerId === 'food') {
    const bits = [titleCase(tags.amenity)];
    if (tags.cuisine) bits.push(titleCase(tags.cuisine));
    if (tags.outdoor_seating === 'yes') bits.push('outdoor seating');
    return `${bits.filter(Boolean).join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'toilets') {
    const bits = ['Public toilet'];
    if (tags.fee) bits.push(`fee: ${tags.fee}`);
    if (tags.wheelchair) bits.push(`wheelchair: ${tags.wheelchair}`);
    if (tags.access) bits.push(`access: ${tags.access}`);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'supermarkets') {
    const bits = [titleCase(tags.shop)];
    if (tags.brand) bits.push(tags.brand);
    return `${bits.filter(Boolean).join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'transport') {
    const type = tags.railway || tags.public_transport || tags.highway || tags.amenity || 'transport';
    const bits = [titleCase(type)];
    if (tags.operator) bits.push(tags.operator);
    if (tags.network) bits.push(tags.network);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  const bits = [titleCase(tags.tourism || tags.historic || 'Attraction')];
  if (tags.operator) bits.push(tags.operator);
  return `${bits.join(' · ')} from OpenStreetMap.`;
}

function scoreElement(layerId, tags = {}) {
  let score = 0;
  if (tags.name) score += 50;
  if (tags.wikidata || tags.wikipedia) score += 25;
  if (tags.tourism === 'museum' || tags.tourism === 'gallery' || tags.historic === 'monument') score += 18;
  if (tags.railway === 'station' || tags.public_transport === 'station' || tags.amenity === 'ferry_terminal') score += 24;
  if (tags.highway === 'bus_stop') score -= 8;
  if (tags.amenity === 'pub' || tags.amenity === 'cafe') score += 10;
  if (layerId === 'toilets' && tags.access === 'public') score += 12;
  if (layerId === 'supermarkets' && tags.brand) score += 12;
  if (tags.disused || tags.abandoned || tags.demolished) score -= 100;
  return score;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 48);
}

function cleanPoint(element) {
  const tags = element.tags || {};
  const layerId = classify(tags);
  const coordinate = coordinateFor(element);
  if (!layerId || !coordinate) return null;

  const name = (tags.name || tags['name:en'] || fallbackName(layerId, tags)).trim();
  if (!name) return null;

  return {
    layerId,
    point: {
      id: `${layerId}-${element.type}-${element.id}-${slugify(name)}`,
      name,
      lat: coordinate.lat,
      lng: coordinate.lng,
      detail: detailFor(layerId, tags),
      source: `OpenStreetMap ${element.type}/${element.id}`,
    },
    score: scoreElement(layerId, tags),
  };
}

function dedupe(points) {
  const byKey = new Map();
  for (const item of points) {
    const coordKey = `${item.point.name.toLowerCase()}-${item.point.lat.toFixed(4)}-${item.point.lng.toFixed(4)}`;
    const existing = byKey.get(coordKey);
    if (!existing || item.score > existing.score) {
      byKey.set(coordKey, item);
    }
  }
  return [...byKey.values()];
}

function buildLayers(elements) {
  const pointsByLayer = new Map(layerDefinitions.map((layer) => [layer.id, []]));
  elements.map(cleanPoint).filter(Boolean).forEach((item) => {
    pointsByLayer.get(item.layerId)?.push(item);
  });

  return layerDefinitions.map(({ maxItems, ...layer }) => {
    const points = dedupe(pointsByLayer.get(layer.id) || [])
      .sort((a, b) => b.score - a.score || a.point.name.localeCompare(b.point.name))
      .slice(0, maxItems)
      .map((item) => item.point)
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      ...layer,
      points,
    };
  });
}

const overpassData = await fetchOverpass();
const output = {
  generatedAt: new Date().toISOString(),
  source: 'OpenStreetMap via Overpass API',
  bbox: BBOX,
  layers: buildLayers(overpassData.elements || []),
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

for (const layer of output.layers) {
  console.log(`${layer.label}: ${layer.points.length}`);
}
