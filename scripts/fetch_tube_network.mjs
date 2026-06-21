import { writeFile } from 'node:fs/promises';

const BBOX = {
  south: 51.38,
  west: -0.42,
  north: 51.66,
  east: 0.15,
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

function isZoneOneToFour(station) {
  return stationZones(station).some((zone) => zone >= 1 && zone <= 4);
}

function bboxString() {
  return `${BBOX.south},${BBOX.west},${BBOX.north},${BBOX.east}`;
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

async function fetchTubeWays() {
  const bbox = bboxString();
  const query = `[out:json][timeout:25];(
  way[railway=subway][line](${bbox});
);out tags geom qt;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  return fetchJson(url);
}

async function fetchTubeStations() {
  const url = 'https://api.tfl.gov.uk/StopPoint/Mode/tube?stopTypes=NaptanMetroStation';
  return fetchJson(url);
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

function buildStations(stopPoints = []) {
  const seen = new Set();
  return stopPoints
    .filter((station) => {
      return (
        station.stopType === 'NaptanMetroStation' &&
        insideBbox(station.lat, station.lon) &&
        isZoneOneToFour(station) &&
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

const [tubeWays, tubeStations] = await Promise.all([fetchTubeWays(), fetchTubeStations()]);
const output = {
  generatedAt: new Date().toISOString(),
  source: 'OpenStreetMap subway ways via Overpass API and TfL StopPoint tube stations',
  bbox: BBOX,
  lines: buildLines(tubeWays.elements || []),
  stations: buildStations(tubeStations.stopPoints || []),
};

await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Tube lines: ${output.lines.length}`);
console.log(`Tube stations: ${output.stations.length}`);
for (const line of output.lines) {
  console.log(`${line.label}: ${line.segments.length} segments`);
}
