"""Add intrinsic width/height to local static HTML images.

Requires Pillow. Dynamic upload/lightbox images without src are intentionally skipped.
Run from the repository root: python site/scripts/add_image_dimensions.py
"""

from pathlib import Path
import re
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
SRC_RE = re.compile(r"\b(?:src|data-src)=[\"']([^\"']+)", re.I)
WIDTH_RE = re.compile(r"\bwidth\s*=", re.I)
HEIGHT_RE = re.compile(r"\bheight\s*=", re.I)


def enrich(tag: str, html_file: Path, stats: dict[str, int]) -> str:
    if WIDTH_RE.search(tag) and HEIGHT_RE.search(tag):
        return tag
    source_match = SRC_RE.search(tag)
    if not source_match:
        stats["dynamic"] += 1
        return tag
    source = source_match.group(1).split("?", 1)[0].split("#", 1)[0]
    if source.startswith(("http://", "https://", "data:", "//")):
        stats["external"] += 1
        return tag
    image_path = (SITE / source.lstrip("/")) if source.startswith("/") else (html_file.parent / source)
    image_path = image_path.resolve()
    try:
        image_path.relative_to(SITE)
        with Image.open(image_path) as image:
            width, height = image.size
    except (FileNotFoundError, OSError, ValueError):
        stats["unresolved"] += 1
        return tag
    attributes = []
    if not WIDTH_RE.search(tag):
        attributes.append(f'width="{width}"')
    if not HEIGHT_RE.search(tag):
        attributes.append(f'height="{height}"')
    stats["updated"] += 1
    return tag[:-1].rstrip() + " " + " ".join(attributes) + ">"


def main() -> None:
    stats = {"files": 0, "updated": 0, "dynamic": 0, "external": 0, "unresolved": 0}
    for html_file in SITE.rglob("*.html"):
        if "hero-archive" in html_file.parts:
            continue
        original = html_file.read_text(encoding="utf-8")
        revised = IMG_RE.sub(lambda match: enrich(match.group(0), html_file, stats), original)
        if revised != original:
            html_file.write_text(revised, encoding="utf-8", newline="")
            stats["files"] += 1
    print(stats)
    if stats["unresolved"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
