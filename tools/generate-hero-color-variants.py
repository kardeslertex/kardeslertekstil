from __future__ import annotations

import colorsys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
GALLERY = ROOT / "site" / "assets" / "products" / "gallery"
HERO = ROOT / "site" / "assets" / "products" / "hero"
TMP = ROOT / "tmp" / "hero-variants"

PRODUCTS = {
    "tshirt": {
        "kt-ts-040": GALLERY / "tshirt" / "kt-ts-040-petrol-siyah-v-yaka-teknik-is-tisortu.png",
        "kt-ts-037": GALLERY / "tshirt" / "kt-ts-037-lacivert-petrol-fermuar-cepli-polo-is-tisortu.png",
    },
    "sweat": {
        "kt-sw-034": GALLERY / "sweat" / "kt-sw-034-grafit-petrol-yarim-fermuarli-teknik-sweatshirt.png",
        "kt-sw-036": GALLERY / "sweat" / "kt-sw-036-tas-gri-antrasit-cepli-polo-sweatshirt.png",
    },
    "pantolon": {
        "kt-pt-001": GALLERY / "pantolon" / "01.webp",
        "kt-pt-029": GALLERY / "pantolon" / "kt-pt-029-grafit-petrol-panelli-teknik-is-pantolonu.webp",
    },
    "tulum": {
        "kt-tl-020": GALLERY / "tulum" / "kt-tl-020-antrasit-saks-panelli-bahcivan-tulumu.webp",
        "kt-tl-022": GALLERY / "tulum" / "kt-tl-022-petrol-antrasit-takviyeli-is-tulumu.png",
    },
    "montkaban": {
        "kt-mk-001": GALLERY / "montkaban" / "01.webp",
        "kt-mk-029": GALLERY / "montkaban" / "kt-mk-029-grafit-petrol-kapusonlu-teknik-is-montu.webp",
    },
    "polar": {
        "kt-pl-008": GALLERY / "polar" / "08.webp",
        "kt-pl-028": GALLERY / "polar" / "kt-pl-028-orman-yesili-siyah-takviyeli-polar-mont.png",
    },
    "yelek": {
        "kt-yl-005": GALLERY / "yelek" / "05.webp",
        "kt-yl-010": GALLERY / "yelek" / "10.webp",
    },
    "softshell": {
        "kt-ss-022": GALLERY / "softshell" / "kt-ss-022-haki-siyah-ic-dolgusuz-softshell-yelek.png",
        "kt-ss-020": GALLERY / "softshell" / "kt-ss-020-lacivert-saks-diz-takviyeli-softshell-pantolon.webp",
    },
}

COLORS = {
    "lacivert": "#18324a",
    "antrasit": "#454b52",
    "saks-mavisi": "#1769aa",
    "turuncu": "#e6662a",
    "siyah": "#17191c",
    "kirmizi": "#a92f2f",
    "bordo": "#682c3a",
    "haki": "#66704a",
    "bej": "#c2a77c",
    "beyaz": "#f4f1e9",
}


def hue_distance(a: float, b: float) -> float:
    return min(abs(a - b), 1.0 - abs(a - b))


def dominant_color(image: Image.Image) -> tuple[float, float, float]:
    small = image.copy()
    small.thumbnail((180, 180))
    candidates = []
    for r, g, b, a in small.getdata():
        if a < 220:
            continue
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        if 0.14 < v < 0.92:
            candidates.append((r, g, b))
    quantized = Image.new("RGB", (len(candidates), 1))
    quantized.putdata(candidates)
    palette = quantized.quantize(colors=10, method=Image.Quantize.MEDIANCUT)
    counts = sorted(palette.getcolors(), reverse=True)
    pal = palette.getpalette()
    ranked = []
    for count, index in counts:
        r, g, b = pal[index * 3:index * 3 + 3]
        h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
        score = count * (1.25 if s > 0.12 else 1.0) * (1.15 if v > 0.25 else 0.65)
        ranked.append((score, h, s, v))
    _, h, s, v = max(ranked)
    return h, s, v


def build_mask(image: Image.Image, dominant: tuple[float, float, float]) -> Image.Image:
    dh, ds, dv = dominant
    hsv = np.asarray(image.convert("HSV"), dtype=np.float32) / 255.0
    alpha = np.asarray(image.getchannel("A"), dtype=np.float32) / 255.0
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    if ds >= 0.16:
        hd = np.minimum(np.abs(h - dh), 1.0 - np.abs(h - dh))
        hue_weight = np.clip(1.0 - hd / 0.16, 0.0, 1.0)
        sat_weight = np.clip(s / 0.18, 0.0, 1.0)
        value_weight = np.clip((v - 0.10) / 0.20, 0.0, 1.0)
        weight = hue_weight * sat_weight * value_weight
    else:
        neutral_weight = np.clip(1.0 - s / 0.25, 0.0, 1.0)
        value_weight = np.clip(1.0 - np.abs(v - dv) / 0.42, 0.0, 1.0)
        dark_guard = np.clip((v - 0.13) / 0.16, 0.0, 1.0)
        weight = neutral_weight * value_weight * dark_guard
    mask = Image.fromarray(np.round(255 * weight * alpha).astype(np.uint8), "L")
    return mask.filter(ImageFilter.GaussianBlur(1.1))


def recolor(image: Image.Image, mask: Image.Image, hex_color: str) -> Image.Image:
    tr, tg, tb = (int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5))
    th, ts, tv = colorsys.rgb_to_hsv(tr, tg, tb)
    rgba = np.asarray(image, dtype=np.float32) / 255.0
    rgb = rgba[..., :3]
    shade = rgb.max(axis=2)
    if ts < 0.08:  # white/neutral keeps fabric shading without clipping highlights
        new_v = 0.58 + 0.40 * shade
        new_s = np.full_like(shade, ts)
    elif tv < 0.16:  # black remains readable instead of becoming a flat silhouette
        new_v = 0.035 + 0.20 * shade
        new_s = np.full_like(shade, ts)
    else:
        new_v = np.clip(tv * (0.42 + 0.78 * shade), 0.045, 0.98)
        new_s = np.clip(ts * (0.82 + 0.18 * shade), 0.0, 1.0)
    pure_hue = np.array(colorsys.hsv_to_rgb(th, 1.0, 1.0), dtype=np.float32)
    recolored = new_v[..., None] * (1.0 - new_s[..., None] + new_s[..., None] * pure_hue)
    blend = (np.asarray(mask, dtype=np.float32) / 255.0)[..., None]
    out = rgba.copy()
    out[..., :3] = rgb * (1.0 - blend) + recolored * blend
    return Image.fromarray(np.clip(out * 255, 0, 255).astype(np.uint8), "RGBA")


def extract(source: Path, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    rgb = Image.open(source).convert("RGB")
    pixels = np.asarray(rgb)
    # Only remove near-white pixels connected to the canvas edge. This keeps
    # white/reflective garment details while eliminating studio-background bands.
    candidate = Image.fromarray(
        np.where(pixels.min(axis=2) > 222, 255, 127).astype(np.uint8), "L"
    ).copy()
    for corner in ((0, 0), (candidate.width - 1, 0), (0, candidate.height - 1),
                   (candidate.width - 1, candidate.height - 1)):
        if candidate.getpixel(corner) == 255:
            ImageDraw.floodfill(candidate, corner, 0)
    connected = np.asarray(candidate)
    alpha = Image.fromarray(
        np.where(connected == 0, 0, 255).astype(np.uint8), "L"
    ).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.55))
    result = rgb.convert("RGBA")
    result.putalpha(alpha)
    result.save(output)


def main() -> None:
    TMP.mkdir(parents=True, exist_ok=True)
    created = 0
    for category, products in PRODUCTS.items():
        destination = HERO / category
        destination.mkdir(parents=True, exist_ok=True)
        for code, source in products.items():
            base = TMP / f"{code}.png"
            extract(source, base)
            image = Image.open(base).convert("RGBA")
            mask = build_mask(image, dominant_color(image))
            for slug, color in COLORS.items():
                output = destination / f"{code}-{slug}.webp"
                recolor(image, mask, color).save(output, "WEBP", quality=90, method=0)
                created += 1
                print(output.relative_to(ROOT))
    print(f"Created {created} hero variants")


if __name__ == "__main__":
    main()
