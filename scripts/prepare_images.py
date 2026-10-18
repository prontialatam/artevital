"""Create provisional web crops from the two client supplied concept images."""

from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
output = root / "site" / "public" / "images"
header = Image.open(root / "Header ArteVital.png")
overview = Image.open(next(root.glob("ArteVital_*.png")))

crops = {
    "hero-editorial.webp": (header, (1135, 107, 2154, 550)),
    "hairstyles-editorial.webp": (overview, (345, 380, 766, 601)),
    "makeup-editorial.webp": (overview, (1130, 380, 1536, 601)),
    "facials-editorial.webp": (overview, (345, 605, 766, 820)),
}

output.mkdir(parents=True, exist_ok=True)
for filename, (source, bounds) in crops.items():
    source.crop(bounds).save(output / filename, "WEBP", quality=86, method=6)
