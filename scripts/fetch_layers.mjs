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
    markerLabel: 'Bus',
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

async function fetchTubeStations() {
  const response = await fetch('https://api.tfl.gov.uk/StopPoint/Mode/tube?stopTypes=NaptanMetroStation', {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!response.ok) return [];
  const data = await response.json();
  return (data.stopPoints || [])
    .filter((station) => station.stopType === 'NaptanMetroStation' && station.lat && station.lon)
    .map((station) => ({
      name: station.commonName.replace(/\s+Underground Station$/i, ''),
      lat: station.lat,
      lng: station.lon,
    }));
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
  if (transportType(tags)) return 'transport';
  return null;
}

function transportType(tags = {}) {
  if (tags.amenity === 'ferry_terminal' || tags.ferry === 'yes' || /river services/i.test(tags.network || '')) return 'boat';
  if (tags.highway === 'bus_stop' || tags.bus === 'yes' || tags.amenity === 'bus_station') return 'bus';
  return null;
}

function isRailOrTubeTransport(tags = {}) {
  const values = [
    tags.network,
    tags.operator,
    tags.line,
    tags.station,
    tags.railway,
    tags.public_transport,
    tags.subway,
    tags.name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return (
    values.includes('london underground') ||
    values.includes('national rail') ||
    values.includes('elizabeth line') ||
    values.includes('docklands light railway') ||
    values.includes('london overground') ||
    values.includes('tube') ||
    tags.train === 'yes' ||
    tags.light_rail === 'yes' ||
    tags.railway === 'subway_entrance' ||
    tags.railway === 'subway' ||
    tags.railway === 'station' ||
    tags.railway === 'stop' ||
    tags.railway === 'platform' ||
    tags.station === 'subway' ||
    tags.subway === 'yes'
  );
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
  if (layerId === 'transport') return transportType(tags) === 'boat' ? 'River pier' : 'Bus stop';
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
    const type = transportType(tags);
    const bits = [type === 'boat' ? 'River pier' : 'Bus stop'];
    if (tags.local_ref) bits.push(`stop ${tags.local_ref}`);
    if (tags.ref && type === 'boat') bits.push(`pier ${tags.ref}`);
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
  if (tags.amenity === 'ferry_terminal' || tags.ferry === 'yes') score += 45;
  if (tags.highway === 'bus_stop') score += 12;
  if (tags.public_transport === 'stop_position') score -= 45;
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
  const pointTransportType = layerId === 'transport' ? transportType(tags) : null;
  if (layerId === 'transport' && (!pointTransportType || isRailOrTubeTransport(tags))) return null;
  if (layerId === 'transport' && tags.public_transport === 'stop_position') return null;

  const name = (tags.name || tags['name:en'] || fallbackName(layerId, tags)).trim();
  if (!name) return null;
  if (layerId === 'transport' && /^\d+[A-Z]?$/.test(name)) return null;

  return {
    layerId,
    point: {
      id: `${layerId}-${element.type}-${element.id}-${slugify(name)}`,
      name,
      lat: coordinate.lat,
      lng: coordinate.lng,
      detail: detailFor(layerId, tags),
      source: `OpenStreetMap ${element.type}/${element.id}`,
      ...(pointTransportType
        ? {
            transportType: pointTransportType,
            markerLabel: pointTransportType === 'boat' ? 'Boat' : 'Bus',
          }
        : {}),
    },
    score: scoreElement(layerId, tags),
  };
}

function distanceMeters(a, b) {
  const originLat = ((a.lat + b.lat) / 2) * Math.PI / 180;
  const latMeters = 110540;
  const lngMeters = 111320 * Math.cos(originLat);
  return Math.hypot((a.lng - b.lng) * lngMeters, (a.lat - b.lat) * latMeters);
}

function normaliseName(value = '') {
  return value
    .toLowerCase()
    .replace(/\bunderground station\b/g, '')
    .replace(/\bstation\b/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isDuplicateTubeTransport(point, tubeStations) {
  if (point.layerId !== 'transport') return false;
  const name = normaliseName(point.point.name);
  return tubeStations.some((station) => {
    const stationName = normaliseName(station.name);
    if (name === stationName) return true;
    if (distanceMeters(point.point, station) > 250) return false;
    return name === `${stationName} platform` || /\bplatforms?\b/.test(name);
  });
}

function dedupe(points) {
  const kept = [];
  const sorted = [...points].sort((a, b) => b.score - a.score);
  for (const item of sorted) {
    const duplicate = kept.find((existing) => {
      if (existing.point.transportType !== item.point.transportType) return false;
      if (normaliseName(existing.point.name) !== normaliseName(item.point.name)) return false;
      const threshold = item.layerId === 'transport' ? 180 : 35;
      return distanceMeters(existing.point, item.point) <= threshold;
    });

    if (!duplicate) {
      kept.push(item);
    }
  }
  return kept;
}

function buildLayers(elements, tubeStations) {
  const pointsByLayer = new Map(layerDefinitions.map((layer) => [layer.id, []]));
  elements.map(cleanPoint).filter(Boolean).forEach((item) => {
    if (isDuplicateTubeTransport(item, tubeStations)) return;
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

const [overpassData, tubeStations] = await Promise.all([fetchOverpass(), fetchTubeStations()]);
const output = {
  generatedAt: new Date().toISOString(),
  source: 'OpenStreetMap via Overpass API',
  bbox: BBOX,
  layers: buildLayers(overpassData.elements || [], tubeStations),
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

for (const layer of output.layers) {
  console.log(`${layer.label}: ${layer.points.length}`);
}
