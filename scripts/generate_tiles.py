#!/usr/bin/env python3
from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MANIFEST = json.loads((PUBLIC / "assets" / "tiles-manifest.json").read_text())
TILE_SIZE = 256
TILES = PUBLIC / "tiles"


def mercator_project(lat: float, lng: float, zoom: int) -> tuple[float, float]:
    scale = TILE_SIZE * (2 ** zoom)
    x = ((lng + 180.0) / 360.0) * scale
    lat_rad = math.radians(lat)
    y = (
        (1.0 - math.log(math.tan(lat_rad) + 1.0 / math.cos(lat_rad)) / math.pi)
        / 2.0
    ) * scale
    return x, y


def inverse_mercator(pixel_x: float, pixel_y: float, zoom: int) -> tuple[float, float]:
    scale = TILE_SIZE * (2 ** zoom)
    lng = (pixel_x / scale) * 360.0 - 180.0
    n = math.pi - (2.0 * math.pi * pixel_y) / scale
    lat = math.degrees(math.atan(math.sinh(n)))
    return lat, lng


def tile_bounds(z: int, x: int, y: int) -> dict[str, float]:
    nw_lat, nw_lng = inverse_mercator(x * TILE_SIZE, y * TILE_SIZE, z)
    se_lat, se_lng = inverse_mercator((x + 1) * TILE_SIZE, (y + 1) * TILE_SIZE, z)
    return {"west": nw_lng, "north": nw_lat, "east": se_lng, "south": se_lat}


def local_point(lat: float, lng: float, z: int, x: int, y: int) -> tuple[float, float]:
    gx, gy = mercator_project(lat, lng, z)
    return gx - x * TILE_SIZE, gy - y * TILE_SIZE


def path(points: list[tuple[float, float]], z: int, x: int, y: int) -> list[tuple[float, float]]:
    return [local_point(lat, lng, z, x, y) for lat, lng in points]


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for candidate in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


FONT_LABEL = font(12)
FONT_SMALL = font(10)
FONT_TINY = font(9)


def draw_label(draw: ImageDraw.ImageDraw, xy: tuple[float, float], text: str, fill: str = "#6f6a5e", size: int = 12) -> None:
    use_font = {12: FONT_LABEL, 10: FONT_SMALL, 9: FONT_TINY}.get(size, FONT_LABEL)
    bbox = draw.textbbox((0, 0), text, font=use_font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x, y = xy
    draw.text((x - w / 2, y - h / 2), text, fill=fill, font=use_font)


def text_box(draw: ImageDraw.ImageDraw, x: float, y: float, text: str, font_: ImageFont.ImageFont) -> tuple[float, float, float, float]:
    bbox = draw.textbbox((0, 0), text, font=font_)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    return (x - w / 2, y - h / 2, x + w / 2, y + h / 2)


def overlaps_tile(box: tuple[float, float, float, float]) -> bool:
    left, top, right, bottom = box
    return right >= 0 and left <= TILE_SIZE and bottom >= 0 and top <= TILE_SIZE


RIVER = [
    (51.4877, -0.199),
    (51.4921, -0.176),
    (51.4959, -0.156),
    (51.4986, -0.141),
    (51.5008, -0.128),
    (51.5029, -0.112),
    (51.5055, -0.097),
    (51.5075, -0.083),
    (51.5079, -0.071),
    (51.5062, -0.057),
]

PARKS = [
    [
        (51.5034, -0.1398),
        (51.5038, -0.1314),
        (51.5096, -0.1295),
        (51.5092, -0.141),
    ],
    [
        (51.5025, -0.161),
        (51.5025, -0.1435),
        (51.4966, -0.143),
        (51.4967, -0.161),
    ],
    [
        (51.5076, -0.1555),
        (51.5078, -0.1315),
        (51.5174, -0.1312),
        (51.5172, -0.1557),
    ],
    [
        (51.5039, -0.1449),
        (51.5044, -0.1307),
        (51.5108, -0.1313),
        (51.5102, -0.1455),
    ],
    [
        (51.5064, -0.1477),
        (51.5068, -0.1334),
        (51.5143, -0.1341),
        (51.5139, -0.1484),
    ],
]

ROADS = [
    [(51.5031, -0.1408), (51.503, -0.1262), (51.5039, -0.1138)],
    [(51.5078, -0.1287), (51.5115, -0.1165), (51.5139, -0.1031), (51.5139, -0.0895), (51.5104, -0.0789)],
    [(51.5007, -0.1249), (51.5052, -0.1248), (51.508, -0.1281)],
    [(51.5115, -0.117), (51.5119, -0.111), (51.5124, -0.1035), (51.5135, -0.0985)],
    [(51.5008, -0.1322), (51.5042, -0.1298), (51.5078, -0.1281)],
    [(51.5031, -0.118), (51.5057, -0.1105), (51.508, -0.1035), (51.5102, -0.0945), (51.513, -0.086)],
    [(51.5037, -0.1419), (51.5042, -0.136), (51.5049, -0.1292), (51.5052, -0.1228)],
    [(51.5079, -0.1379), (51.5086, -0.1302), (51.5099, -0.123), (51.5112, -0.1165)],
    [(51.5109, -0.1465), (51.5115, -0.1365), (51.5118, -0.1267), (51.5119, -0.1168)],
    [(51.5138, -0.1088), (51.5134, -0.1017), (51.5128, -0.0943), (51.5122, -0.0871), (51.5116, -0.0798)],
    [(51.5092, -0.1396), (51.5097, -0.1315), (51.5099, -0.1232), (51.5101, -0.1157)],
    [(51.507, -0.1226), (51.5082, -0.112), (51.509, -0.1034), (51.5097, -0.0955)],
]

LANDMARKS = [
    (51.5014, -0.1419, "Buckingham Palace", "#675b4b", 12),
    (51.5034, -0.1337, "The Mall", "#7a6b59", 10),
    (51.5031, -0.1379, "Green Park", "#4f7d3c", 11),
    (51.5025, -0.134, "St James’s Park", "#4f7d3c", 12),
    (51.5079, -0.1281, "Trafalgar Square", "#61594f", 12),
    (51.5091, -0.1342, "Piccadilly Circus", "#61594f", 11),
    (51.5115, -0.1319, "Leicester Square", "#61594f", 11),
    (51.5118, -0.123, "Covent Garden", "#61594f", 11),
    (51.5028, -0.1196, "London Eye", "#1f6f8b", 11),
    (51.5033, -0.1142, "South Bank", "#61594f", 11),
    (51.5077, -0.1142, "Southbank Centre", "#61594f", 11),
    (51.5076, -0.0994, "Tate Modern", "#61594f", 11),
    (51.5081, -0.0974, "Shakespeare’s Globe", "#61594f", 10),
    (51.5107, -0.0982, "Millennium Bridge", "#1f6f8b", 10),
    (51.5138, -0.0984, "St Paul’s Cathedral", "#61594f", 12),
    (51.5101, -0.0864, "Monument", "#61594f", 11),
    (51.5081, -0.0761, "Tower of London", "#61594f", 12),
    (51.5055, -0.0754, "Tower Bridge", "#1f6f8b", 12),
    (51.5076, -0.0756, "St Katharine Docks", "#61594f", 10),
    (51.5074, -0.1182, "Westminster", "#61594f", 11),
    (51.5071, -0.1278, "Charing Cross", "#61594f", 10),
    (51.5089, -0.1283, "National Gallery", "#61594f", 10),
    (51.5133, -0.0835, "Leadenhall Market", "#61594f", 10),
    (51.5127, -0.0758, "Tower Hill", "#61594f", 10),
    (51.5116, -0.0904, "Bank", "#61594f", 10),
    (51.5102, -0.0846, "London Bridge", "#61594f", 10),
    (51.5048, -0.1304, "Whitehall", "#61594f", 11),
    (51.506, -0.124, "Embankment", "#1f6f8b", 10),
    (51.5072, -0.1226, "Waterloo", "#61594f", 10),
    (51.5076, -0.0939, "Borough", "#61594f", 10),
]


def draw_svg_like_label(draw: ImageDraw.ImageDraw, x: float, y: float, text: str) -> None:
    # Tiny shadow for legibility.
    left, top, _, _ = text_box(draw, x, y, text, FONT_SMALL)
    draw.text((left + 1, top + 1), text, fill="#f8f6f0", font=FONT_SMALL)
    draw.text((left, top), text, fill="#6f6a5e", font=FONT_SMALL)


def draw_poi(draw: ImageDraw.ImageDraw, x: float, y: float, fill: str) -> None:
    r = 3
    draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline="#ffffff")


def render_tile(z: int, x: int, y: int) -> Image.Image:
    bounds = tile_bounds(z, x, y)
    img = Image.new("RGBA", (TILE_SIZE, TILE_SIZE), "#f4efe6")
    draw = ImageDraw.Draw(img)

    lat_step = 0.0022 if z >= 14 else 0.004
    lng_step = 0.0024 if z >= 14 else 0.0042

    lat = math.floor(bounds["south"] / lat_step) * lat_step
    while lat <= bounds["north"] + lat_step:
        p1 = local_point(lat, bounds["west"] - 0.02, z, x, y)
        p2 = local_point(lat, bounds["east"] + 0.02, z, x, y)
        major = round(lat / lat_step) % 4 == 0
        draw.line((p1, p2), fill="#d2c8ba" if major else "#ddd5c9", width=2 if major else 1)
        lat += lat_step

    lng = math.floor(bounds["west"] / lng_step) * lng_step
    while lng <= bounds["east"] + lng_step:
        p1 = local_point(bounds["south"] - 0.02, lng, z, x, y)
        p2 = local_point(bounds["north"] + 0.02, lng, z, x, y)
        major = round(lng / lng_step) % 4 == 0
        draw.line((p1, p2), fill="#d2c8ba" if major else "#ddd5c9", width=2 if major else 1)
        lng += lng_step

    river_points = path(RIVER, z, x, y)
    draw.line(river_points, fill="#b8dff0", width=20, joint="curve")
    draw.line(river_points, fill="#90c7e2", width=10, joint="curve")

    for park in PARKS:
        park_points = path(park, z, x, y)
        draw.polygon(park_points, fill="#d6ead1", outline="#c1d9bc")

    for road in ROADS:
        road_points = path(road, z, x, y)
        draw.line(road_points, fill="#fdfbf8", width=7, joint="curve")
        draw.line(road_points, fill="#b9aea0", width=1, joint="curve")

    for lat_, lng_, text, fill, size in LANDMARKS:
        px, py = local_point(lat_, lng_, z, x, y)
        if 0 <= px <= TILE_SIZE and 0 <= py <= TILE_SIZE:
            draw_poi(draw, px, py, fill)
            use_font = {12: FONT_LABEL, 10: FONT_SMALL, 9: FONT_TINY}.get(size, FONT_SMALL)
            bbox = draw.textbbox((0, 0), text, font=use_font)
            w = bbox[2] - bbox[0]
            h = bbox[3] - bbox[1]
            draw.text((px + 7, py - h / 2), text, fill=fill, font=use_font)

    district_labels = [
        (51.5094, -0.1292, "West End"),
        (51.5108, -0.0997, "City of London"),
        (51.5037, -0.118, "Westminster"),
        (51.5072, -0.1062, "South Bank"),
        (51.5069, -0.1405, "St James’s"),
        (51.5067, -0.0798, "Tower Hill"),
        (51.5132, -0.1502, "Mayfair"),
        (51.5153, -0.0618, "Whitechapel"),
    ]
    for lat_, lng_, text in district_labels:
        px, py = local_point(lat_, lng_, z, x, y)
        if overlaps_tile(text_box(draw, px, py, text, FONT_SMALL)):
            draw_svg_like_label(draw, px, py, text)

    return img


def ensure_target(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def main() -> None:
    ensure_target(TILES)

    for tile_path in MANIFEST:
        _, z, x, y_file = tile_path.lstrip("/").split("/")
        y = y_file.removesuffix(".png")
        image = render_tile(int(z), int(x), int(y))
        out = TILES / z / x / f"{y}.png"
        out.parent.mkdir(parents=True, exist_ok=True)
        image.save(out, format="PNG")


if __name__ == "__main__":
    main()
