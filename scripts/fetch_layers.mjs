import { writeFile } from 'node:fs/promises';

const BBOX = {
  south: 51.38,
  west: -0.42,
  north: 51.66,
  east: 0.15,
};

const OUTPUT_FILE = new URL('../public/assets/layers.json', import.meta.url);
const USER_AGENT = 'Londontour data import (https://github.com/happykhan/Londontour)';

const layerDefinitions = [
  {
    id: 'landmarks',
    label: 'Essential landmarks',
    defaultVisible: true,
    minZoom: 13,
    markerLabel: 'L',
    routeRadiusMeters: 700,
    maxItems: 160,
  },
  {
    id: 'museums',
    label: 'Museums',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'M',
    routeRadiusMeters: 650,
    maxItems: 320,
  },
  {
    id: 'monuments',
    label: 'Statues and monuments',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'Mon',
    routeRadiusMeters: 550,
    maxItems: 420,
  },
  {
    id: 'plaques',
    label: 'Plaques',
    defaultVisible: false,
    minZoom: 14,
    markerLabel: 'Plq',
    routeRadiusMeters: 350,
    maxItems: 320,
  },
  {
    id: 'pubs',
    label: 'Pubs',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'P',
    routeRadiusMeters: 500,
    maxItems: 520,
  },
  {
    id: 'transport',
    label: 'Tube and river links',
    defaultVisible: false,
    minZoom: 12,
    markerLabel: 'Boat',
    routeRadiusMeters: 500,
    maxItems: 90,
  },
  {
    id: 'bus-planning',
    label: 'Bus stops (route editor)',
    defaultVisible: false,
    editorOnly: true,
    minZoom: 15,
    markerLabel: 'Bus',
    routeRadiusMeters: 250,
    maxItems: 1600,
  },
  {
    id: 'toilets',
    label: 'Public toilets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'WC',
    routeRadiusMeters: 400,
    maxItems: 320,
  },
  {
    id: 'supermarkets',
    label: 'Supermarkets',
    defaultVisible: false,
    minZoom: 13,
    markerLabel: 'S',
    routeRadiusMeters: 450,
    maxItems: 420,
  },
];

function bboxString(bounds = BBOX) {
  return `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;
}

function overpassQuery(bounds = BBOX) {
  const bbox = bboxString(bounds);
  return `[out:json][timeout:25];(
  node[amenity~"^(pub|bar)$"](${bbox});
  way[amenity~"^(pub|bar)$"](${bbox});
  relation[amenity~"^(pub|bar)$"](${bbox});
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
  node[memorial](${bbox});
  way[memorial](${bbox});
  relation[memorial](${bbox});
  node["memorial:type"](${bbox});
  way["memorial:type"](${bbox});
  relation["memorial:type"](${bbox});
  node[artwork_type](${bbox});
  way[artwork_type](${bbox});
  relation[artwork_type](${bbox});
  node[amenity=place_of_worship](${bbox});
  way[amenity=place_of_worship](${bbox});
  relation[amenity=place_of_worship](${bbox});
  node[man_made=bridge](${bbox});
  way[man_made=bridge](${bbox});
  relation[man_made=bridge](${bbox});
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

function bboxChunks(rows = 4, cols = 4) {
  const chunks = [];
  const latStep = (BBOX.north - BBOX.south) / rows;
  const lngStep = (BBOX.east - BBOX.west) / cols;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      chunks.push({
        south: Number((BBOX.south + row * latStep).toFixed(6)),
        west: Number((BBOX.west + col * lngStep).toFixed(6)),
        north: Number((BBOX.south + (row + 1) * latStep).toFixed(6)),
        east: Number((BBOX.west + (col + 1) * lngStep).toFixed(6)),
      });
    }
  }

  return chunks;
}

async function fetchOverpassChunk(bounds, index, total) {
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery(bounds))}`;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`Overpass chunk ${index}/${total}: ${data.elements?.length || 0} raw elements`);
      return data.elements || [];
    }

    if (response.status !== 429 && response.status < 500) {
      throw new Error(`Overpass request ${index}/${total} failed: ${response.status} ${response.statusText}`);
    }

    const retryAfterSeconds = Number(response.headers.get('retry-after'));
    const waitSeconds = Math.max(Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : attempt * 8, attempt * 5);
    console.log(`Overpass chunk ${index}/${total} attempt ${attempt} returned ${response.status}; waiting ${waitSeconds}s`);
    await sleep(waitSeconds * 1000);
  }

  throw new Error(`Overpass request ${index}/${total} failed after ${maxAttempts} attempts`);
}

async function fetchOverpass() {
  const chunks = bboxChunks();
  const elementByKey = new Map();

  for (const [index, chunk] of chunks.entries()) {
    const elements = await fetchOverpassChunk(chunk, index + 1, chunks.length);
    for (const element of elements) {
      elementByKey.set(`${element.type}/${element.id}`, element);
    }
    await sleep(2000);
  }

  const elements = [...elementByKey.values()];
  if (!elements.length) throw new Error(`Overpass returned no layer data for ${bboxString(BBOX)}`);
  return { elements };
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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

const essentialLandmarkNames = new Set([
  '10 downing street',
  'bank of england',
  'big ben',
  'borough market',
  'buckingham palace',
  'charing cross',
  "cleopatra's needle",
  'covent garden',
  'globe theatre',
  'guildhall',
  'hms belfast',
  'leadenhall market',
  'london eye',
  'london bridge',
  'mansion house',
  'millennium bridge',
  'palace of westminster',
  'piccadilly circus',
  'royal courts of justice',
  'royal exchange',
  'royal festival hall',
  'royal opera house',
  'somerset house',
  'southbank centre',
  "st paul's cathedral",
  "st. paul's cathedral",
  "st james's palace",
  "st. james's palace",
  'southwark cathedral',
  'temple church',
  'the monument to the great fire of london',
  'the royal courts of justice',
  'tower bridge',
  'tower of london',
  'trafalgar square',
  'westminster abbey',
  'westminster bridge',
]);

function classify(tags = {}) {
  if (/^(pub|bar)$/.test(tags.amenity)) return 'pubs';
  if (tags.amenity === 'toilets') return 'toilets';
  if (/^(supermarket|convenience)$/.test(tags.shop)) return 'supermarkets';
  if (transportType(tags) === 'boat') return 'transport';
  if (transportType(tags) === 'bus') return 'bus-planning';
  if (isMuseum(tags)) return 'museums';
  if (isPlaque(tags)) return 'plaques';
  if (isEssentialLandmark(tags)) return 'landmarks';
  if (isMonument(tags)) return 'monuments';
  return null;
}

function normaliseTitle(value = '') {
  return value
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/[^\w\s'.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMuseum(tags = {}) {
  return tags.tourism === 'museum' || tags.tourism === 'gallery';
}

function isPlaque(tags = {}) {
  const values = [tags.memorial, tags['memorial:type'], tags.historic, tags.tourism, tags.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return values.includes('plaque') || values.includes('blue plaque');
}

function isEssentialLandmark(tags = {}) {
  if (isRailOrTubeTransport(tags)) return false;
  const name = normaliseTitle(tags.name || tags['name:en'] || '');
  if (essentialLandmarkNames.has(name)) return true;
  if (tags.man_made === 'bridge' && essentialLandmarkNames.has(name)) return true;
  if (tags.building === 'cathedral' || tags.building === 'church') return essentialLandmarkNames.has(name);
  return false;
}

function isMonument(tags = {}) {
  if (tags.historic === 'monument' || tags.historic === 'memorial') return true;
  if (tags.tourism === 'artwork') return true;
  if (tags.memorial && !isPlaque(tags)) return true;
  if (tags.artwork_type) return true;
  return false;
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
  if (layerId === 'transport') return 'River pier';
  if (layerId === 'bus-planning') return 'Bus stop';
  if (layerId === 'supermarkets') return titleCase(tags.shop || 'Supermarket');
  if (layerId === 'pubs') return titleCase(tags.amenity || 'Pub');
  if (layerId === 'museums') return titleCase(tags.tourism || 'Museum');
  if (layerId === 'monuments') return titleCase(tags.artwork_type || tags.memorial || tags.historic || 'Monument');
  if (layerId === 'plaques') return 'Plaque';
  return titleCase(tags.tourism || tags.historic || tags.amenity || 'Landmark');
}

function detailFor(layerId, tags = {}) {
  if (layerId === 'pubs') {
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
    const bits = ['River pier'];
    if (tags.ref) bits.push(`pier ${tags.ref}`);
    if (tags.operator) bits.push(tags.operator);
    if (tags.network) bits.push(tags.network);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'bus-planning') {
    const bits = ['Bus stop'];
    if (tags.local_ref) bits.push(`stop ${tags.local_ref}`);
    if (tags.operator) bits.push(tags.operator);
    if (tags.network) bits.push(tags.network);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'museums') {
    const bits = [tags.tourism === 'gallery' ? 'Gallery' : 'Museum'];
    if (tags.operator) bits.push(tags.operator);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'monuments') {
    const bits = [titleCase(tags.artwork_type || tags.memorial || tags.historic || tags.tourism || 'Monument')];
    if (tags.subject) bits.push(tags.subject);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  if (layerId === 'plaques') {
    const bits = ['Plaque'];
    if (tags.subject) bits.push(tags.subject);
    if (tags.operator) bits.push(tags.operator);
    return `${bits.join(' · ')} from OpenStreetMap.`;
  }

  const bits = [titleCase(tags.tourism || tags.historic || 'Attraction')];
  if (tags.operator) bits.push(tags.operator);
  return `${bits.join(' · ')} from OpenStreetMap.`;
}

function urlFromTags(tags = {}) {
  const directUrl = tags.website || tags['contact:website'] || tags.url;
  if (directUrl) {
    const normalised = /^https?:\/\//i.test(directUrl) ? directUrl : `https://${directUrl}`;
    try {
      const url = new URL(normalised);
      if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
    } catch (error) {
      // Fall through to public knowledge graph links.
    }
  }

  if (tags.wikipedia) {
    const [language, ...titleParts] = tags.wikipedia.split(':');
    const title = titleParts.join(':');
    if (language && title) {
      return `https://${language}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
    }
  }

  if (/^Q\d+$/i.test(tags.wikidata || '')) {
    return `https://www.wikidata.org/wiki/${tags.wikidata}`;
  }

  return undefined;
}

function scoreElement(layerId, tags = {}) {
  let score = 0;
  if (tags.name) score += 50;
  if (tags.wikidata || tags.wikipedia) score += 25;
  if (layerId === 'landmarks' && essentialLandmarkNames.has(normaliseTitle(tags.name || tags['name:en'] || ''))) score += 80;
  if (layerId === 'museums' && urlFromTags(tags)) score += 18;
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
  const pointTransportType = layerId === 'transport' || layerId === 'bus-planning' ? transportType(tags) : null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && (!pointTransportType || isRailOrTubeTransport(tags))) return null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && tags.public_transport === 'stop_position') return null;
  const pointUrl = layerId === 'museums' ? urlFromTags(tags) : undefined;
  if (layerId === 'museums' && !pointUrl) return null;

  const name = (tags.name || tags['name:en'] || fallbackName(layerId, tags)).trim();
  if (!name) return null;
  if ((layerId === 'transport' || layerId === 'bus-planning') && /^\d+[A-Z]?$/.test(name)) return null;

  return {
    layerId,
    point: {
      id: `${layerId}-${element.type}-${element.id}-${slugify(name)}`,
      name,
      lat: coordinate.lat,
      lng: coordinate.lng,
      detail: detailFor(layerId, tags),
      source: `OpenStreetMap ${element.type}/${element.id}`,
      ...(pointUrl ? { url: pointUrl } : {}),
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
  if (point.layerId !== 'transport' && point.layerId !== 'bus-planning') return false;
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
      if (item.layerId === 'landmarks') return true;
      const threshold = item.layerId === 'transport' || item.layerId === 'bus-planning' ? 180 : 35;
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
