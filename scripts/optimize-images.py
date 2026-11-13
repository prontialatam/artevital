"""Prepare responsive WebP derivatives; originals remain untouched."""
import json, sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
images = root / 'public/images'
jina = Path(sys.argv[1])
portraits = [jina / 'Principal.png', jina / 'Jina.JPG'] + sorted(p for p in jina.glob('*.JPG') if p.name != 'Jina.JPG')
for index, source in enumerate(portraits):
    im = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    im.save(images / f'jina-{index+1:02}.webp', 'WEBP', quality=89, method=6)
(images / 'jina-morales-enhanced.webp').unlink(missing_ok=True)
manifest = {}
for source in sorted(images.iterdir()):
    if source.suffix not in {'.webp', '.png'} or '-w' in source.stem:
        continue
    im = ImageOps.exif_transpose(Image.open(source))
    w, h = im.size
    variants = []
    widths = [320, 600] if 'logo' in source.stem or 'signature' in source.stem else [480, 800, 1200]
    for width in widths:
        if width >= w:
            continue
        resized = im.resize((width, round(h * width / w)), Image.Resampling.LANCZOS)
        filename = f'{source.stem}-w{width}.webp'
        resized.save(images / filename, 'WEBP', quality=89, method=6)
        variants.append(f'/images/{filename} {width}w')
    variants.append(f'/images/{source.name} {w}w')
    manifest[f'/images/{source.name}'] = {'srcset': ', '.join(variants), 'width': w, 'height': h}
(root / 'src/content/images.ts').write_text('export const imageSources: Record<string, { srcset: string; width: number; height: number }> = ' + json.dumps(manifest, ensure_ascii=False, indent=2) + ';\n')
print(f'{len(portraits)} Jina photographs; responsive variants for {len(manifest)} images.')
