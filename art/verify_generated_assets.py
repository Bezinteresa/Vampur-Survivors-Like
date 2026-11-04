"""Validate generated sprite slots and make review contact sheets."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
sprite_root = root / 'public/sprites'
assets = []
for filename in [f for f in ('generation-prompts.json', 'generation-extra-prompts.json') if (root / 'art' / f).exists()]:
    assets.extend(json.loads((root / 'art' / filename).read_text(encoding='utf-8'))['assets'])
errors = []
found = []
for spec in assets:
    path = sprite_root / spec['file']
    if not path.exists():
        errors.append(f'Missing: {spec["file"]}')
        continue
    with Image.open(path) as im:
        if im.size != (spec['w'], spec['h']):
            errors.append(f'Wrong dimensions: {spec["file"]}: {im.size}')
        alpha = im.convert('RGBA').getchannel('A').getextrema()
        opaque = spec['file'].startswith(('terrain/', 'cover/'))  # ground tiles and store covers have no transparency
        if opaque and alpha != (255, 255):
            errors.append(f'Unexpected transparency: {spec["file"]}')
        # Generated sprites can have near-opaque interiors (254) and valid alpha.
        if not opaque and (alpha[0] != 0 or alpha[1] < 250):
            errors.append(f'Invalid alpha: {spec["file"]}: {alpha}')
    found.append(spec)

previews = root / 'art/generated-previews'
previews.mkdir(exist_ok=True)
for group in dict.fromkeys(s['file'].split('/')[0] for s in found):
    items = [s for s in found if s['file'].startswith(group + '/')]
    columns = 4
    sheet = Image.new('RGB', (columns * 200, ((len(items) + columns - 1) // columns) * 210), '#303832')
    draw = ImageDraw.Draw(sheet)
    for i, spec in enumerate(items):
        with Image.open(sprite_root / spec['file']) as original:
            thumb = original.convert('RGBA')
            thumb.thumbnail((184, 180), Image.Resampling.LANCZOS)
            x = (i % columns) * 200 + (200 - thumb.width) // 2
            y = (i // columns) * 210 + (180 - thumb.height) // 2
            sheet.paste(thumb, (x, y), thumb)
        draw.text(((i % columns) * 200 + 5, (i // columns) * 210 + 185), Path(spec['file']).stem, fill='white')
    sheet.save(previews / f'{group}.jpg', quality=95)

report = {'expected': len(assets), 'found': len(found), 'errors': errors}
(root / 'art/generated-assets-report.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
