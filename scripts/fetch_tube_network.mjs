import { writeFile } from 'node:fs/promises';

const BBOX = {
  south: 51.28,
  west: -0.52,
  north: 51.70,
  east: 0.34,
};

const OUTPUT_FILE = new URL('../public/assets/tube-network.json', import.meta.url);
const USER_AGENT = 'Londontour tube network import (https://github.com/happykhan/Londontour)';

const lineMeta = {
  bakerloo: { label: 'Bakerloo', color: '#B36305', osmNames: ['Bakerloo', 'Bakerloo Line'] },
  central: { label: 'Central', color: '#E32017', osmNames: ['Central'] },
  circle: { label: 'Circle', color: '#FFD300', osmNames: ['Circle'] },
  district: { label: 'District', color: '#00782A', osmNames: ['District'] },
  'hammersmith-city': { label: 'Hammersmith & City', color: '#F3A9BB', osmNames: ['Hammersmith & City'] },
  jubilee: { label: 'Jubilee', color: '#A0A5A9', osmNames: ['Jubilee'] },
  metropolitan: { label: 'Metropolitan', color: '#9B0056', osmNames: ['Metropolitan'] },
  northern: { label: 'Northern', color: '#000000', osmNames: ['Northern'] },
  piccadilly: { label: 'Piccadilly', color: '#003688', osmNames: ['Piccadilly'] },
  victoria: { label: 'Victoria', color: '#0098D4', osmNames: ['Victoria'] },
  'waterloo-city': { label: 'Waterloo & City', color: '#95CDBA', osmNames: ['Waterloo & City'] },
};

const osmNameToLineId = new Map(
  Object.entries(lineMeta).flatMap(([id, meta]) => meta.osmNames.map((name) => [name.toLowerCase(), id]))
);

const riverServiceMeta = {
  rb1: { label: 'RB1', color: '#0077b6' },
  'rb1x': { label: 'RB1X', color: '#005f99' },
  rb2: { label: 'RB2', color: '#0088cc' },
  rb6: { label: 'RB6', color: '#00a6d6' },
};

function insideBbox(lat, lng) {
  return lat >= BBOX.south && lat <= BBOX.north && lng >= BBOX.west && lng <= BBOX.east;
}

function propertyValue(station, key) {
  return station.additionalProperties?.find((property) => property.key === key)?.value;
}

function stationZones(station) {
  const zoneValue = propertyValue(station, 'Zone') || '';
  const zones = zoneValue
    .match(/\d+/g)
    ?.map(Number)
    .filter((zone) => Number.isFinite(zone)) || [];
  return zones;
}

function bboxString() {
  return `${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east}`;
}

function bboxChunks(rows = 3, cols = 4) {
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

function boundsString(bounds) {
  return `${bounds.south},${bounds.west},${bounds.north},${bounds.east}`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) throw new Error(`${url} failed: ${response.status} ${response.statusText}`);
  return response.json();
}

async function fetchOverpassChunk(query, label, index, total) {
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
      });
    } catch (error) {
      const waitSeconds = attempt * 6;
      console.log(`${label} chunk ${index}/${total} attempt ${attempt} failed: ${error.message}; waiting ${waitSeconds}s`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    if (response.ok) {
      const data = await response.json();
      console.log(`${label} chunk ${index}/${total}: ${data.elements?.length || 0} raw elements`);
      return data.elements || [];
    }

    if (response.status !== 429 && response.status < 500) {
      throw new Error(`${label} chunk ${index}/${total} failed: ${response.status} ${response.statusText}`);
    }

    const retryAfterSeconds = Number(response.headers.get('retry-after'));
    const waitSeconds = Math.max(Number.isFinite(retryAfterSeconds) ? retryAfterSeconds : attempt * 8, attempt * 5);
    console.log(`${label} chunk ${index}/${total} attempt ${attempt} returned ${response.status}; waiting ${waitSeconds}s`);
    await sleep(waitSeconds * 1000);
  }

  throw new Error(`${label} chunk ${index}/${total} failed after ${maxAttempts} attempts`);
}

async function fetchOverpassChunks(label, queryForBounds) {
  const chunks = bboxChunks();
  const elementByKey = new Map();

  for (const [index, chunk] of chunks.entries()) {
    const elements = await fetchOverpassChunk(queryForBounds(chunk), label, index + 1, chunks.length);
    for (const element of elements) {
      elementByKey.set(`${element.type}/${element.id}`, element);
    }
    await sleep(1500);
  }

  return { elements: [...elementByKey.values()] };
}

async function fetchTubeWays() {
  return fetchOverpassChunks('Tube ways', (bounds) => {
    const bbox = boundsString(bounds);
    return `[out:json][timeout:25];(
  way[railway=subway][line](${bbox});
);out tags geom qt;`;
  });
}

async function fetchRiverWays() {
  return fetchOverpassChunks('River ways', (bounds) => {
    const bbox = boundsString(bounds);
    return `[out:json][timeout:25];
relation[route=ferry](${bbox});
out body qt;
way(r);
out tags geom qt;`;
  });
}

async function fetchTubeStations() {
  const url = 'https://api.tfl.gov.uk/StopPoint/Mode/tube?stopTypes=NaptanMetroStation';
  return fetchJson(url);
}

function riverServiceId(name = '') {
  const match = name.match(/\bRiver Bus\s+([A-Z0-9]+)\b/i);
  if (!match) return null;
  const id = `rb${match[1].toLowerCase()}`;
  return riverServiceMeta[id] ? id : null;
}

function idsFromOsmLineTag(value = '') {
  return value
    .split(';')
    .map((part) => osmNameToLineId.get(part.trim().toLowerCase()))
    .filter(Boolean);
}

function buildLines(elements = []) {
  const byLine = new Map(Object.keys(lineMeta).map((id) => [id, new Map()]));

  for (const way of elements) {
    if (!Array.isArray(way.geometry) || way.geometry.length < 2) continue;
    const lineIds = idsFromOsmLineTag(way.tags?.line || way.tags?.name || '');
    if (!lineIds.length) continue;

    const segment = way.geometry
      .map((coordinate) => [Number(coordinate.lat.toFixed(6)), Number(coordinate.lon.toFixed(6))]);
    if (segment.length < 2) continue;

    for (const lineId of lineIds) {
      byLine.get(lineId)?.set(way.id, segment);
    }
  }

  return [...byLine.entries()]
    .map(([id, segmentsByWay]) => ({
      id,
      label: lineMeta[id].label,
      color: lineMeta[id].color,
      segments: [...segmentsByWay.values()],
    }))
    .filter((line) => line.segments.length)
    .sort((a, b) => a.label.localeCompare(b.label));
}

function buildRiverServices(elements = []) {
  const wayById = new Map(elements.filter((item) => item.type === 'way').map((way) => [way.id, way]));
  const serviceWays = new Map(Object.keys(riverServiceMeta).map((id) => [id, new Map()]));

  for (const relation of elements.filter((item) => item.type === 'relation')) {
    const serviceId = riverServiceId(relation.tags?.name || '');
    if (!serviceId) continue;

    for (const member of relation.members || []) {
      if (member.type !== 'way') continue;
      const way = wayById.get(member.ref);
      if (!way || !Array.isArray(way.geometry) || way.geometry.length < 2) continue;

      const segment = way.geometry.map((coordinate) => [
        Number(coordinate.lat.toFixed(6)),
        Number(coordinate.lon.toFixed(6)),
      ]);
      serviceWays.get(serviceId)?.set(way.id, segment);
    }
  }

  return [...serviceWays.entries()]
    .map(([id, segmentsByWay]) => ({
      id,
      label: riverServiceMeta[id].label,
      color: riverServiceMeta[id].color,
      segments: [...segmentsByWay.values()],
    }))
    .filter((line) => line.segments.length)
    .sort((a, b) => a.label.localeCompare(b.label));
}

function buildStations(stopPoints = []) {
  const seen = new Set();
  return stopPoints
    .filter((station) => {
      return (
        station.stopType === 'NaptanMetroStation' &&
        insideBbox(station.lat, station.lon) &&
        !seen.has(station.naptanId)
      );
    })
    .map((station) => {
      seen.add(station.naptanId);
      const facilities = ['Toilets', 'Lifts', 'Escalators', 'Gates', 'Ticket Halls']
        .map((key) => {
          const value = propertyValue(station, key);
          return value ? `${key}: ${value}` : null;
        })
        .filter(Boolean);

      return {
        id: station.naptanId,
        name: station.commonName.replace(/\s+Underground Station$/i, ''),
        lat: Number(station.lat.toFixed(6)),
        lng: Number(station.lon.toFixed(6)),
        zone: stationZones(station).join('/') || undefined,
        lines: (station.lines || [])
          .map((line) => line.id)
          .filter((lineId) => lineMeta[lineId]),
        facilities,
        source: `TfL StopPoint ${station.naptanId}`,
      };
    })
    .filter((station) => station.lines.length)
    .sort((a, b) => a.name.localeCompare(b.name));
}

const [tubeWays, riverWays, tubeStations] = await Promise.all([fetchTubeWays(), fetchRiverWays(), fetchTubeStations()]);
const output = {
  generatedAt: new Date().toISOString(),
  source: 'OpenStreetMap subway and river ferry ways via Overpass API and TfL StopPoint tube stations within the app map bounds',
  bbox: BBOX,
  lines: buildLines(tubeWays.elements || []),
  riverServices: buildRiverServices(riverWays.elements || []),
  stations: buildStations(tubeStations.stopPoints || []),
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Tube lines: ${output.lines.length}`);
console.log(`River services: ${output.riverServices.length}`);
console.log(`Tube stations: ${output.stations.length}`);
for (const line of output.lines) {
  console.log(`${line.label}: ${line.segments.length} segments`);
}
for (const service of output.riverServices) {
  console.log(`${service.label}: ${service.segments.length} river segments`);
}
