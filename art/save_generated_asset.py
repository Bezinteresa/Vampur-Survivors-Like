"""Copy an ImageGen output into its game slot at the requested pixel size."""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source, relative, width, height = sys.argv[1:5]
replace = '--replace' in sys.argv[5:]  # redo an existing picture (listed in ART_TODO.md)
destination = root / 'public' / 'sprites' / relative
destination.parent.mkdir(parents=True, exist_ok=True)
if destination.exists() and not replace:
    raise SystemExit(f'Refusing to replace existing asset: {destination} (add --replace to redo it)')
with Image.open(source) as original:
    result = original.convert('RGBA').resize((int(width), int(height)), Image.Resampling.LANCZOS)
    if relative.replace('\\', '/').startswith('weapon/'):
        # Side-view weapons keep their long silhouette inside the required square slot.
        fitted = ImageOps.contain(original.convert('RGBA'), (int(width), int(height)), Image.Resampling.LANCZOS)
        result = Image.new('RGBA', (int(width), int(height)))
        result.paste(fitted, ((result.width - fitted.width) // 2, (result.height - fitted.height) // 2))
    if '--align-to' in sys.argv[5:]:
        reference_name = sys.argv[sys.argv.index('--align-to') + 1]
        with Image.open(root / 'public' / 'sprites' / reference_name) as reference:
            reference_box = reference.convert('RGBA').getchannel('A').point(lambda a: 255 if a > 128 else 0).getbbox()
        visible_box = result.getchannel('A').point(lambda a: 255 if a > 128 else 0).getbbox()
        if not reference_box or not visible_box:
            raise SystemExit('Cannot align an empty sprite')
        # Normalize framing only: preserve pixels, aspect ratio and alpha.
        target_height = reference_box[3] - reference_box[1]
        scale = target_height / (visible_box[3] - visible_box[1])
        character = result.crop(visible_box)
        character = character.resize((round(character.width * scale), target_height), Image.Resampling.LANCZOS)
        result = Image.new('RGBA', (int(width), int(height)))
        left = round((reference_box[0] + reference_box[2] - character.width) / 2)
        result.paste(character, (left, reference_box[3] - target_height))
    alpha = result.getchannel('A').getextrema()
    if '--colors' in sys.argv[5:]:
        colors = int(sys.argv[sys.argv.index('--colors') + 1])
        if alpha != (255, 255):
            raise SystemExit('Palette reduction requires an opaque image')
        result = result.convert('RGB').quantize(colors=colors)
    if destination.suffix.lower() == '.webp':
        # Battle backgrounds: smooth downscale from the source, compact lossy WebP (about 100 KB at 800x450).
        result = original.convert('RGB').resize((int(width), int(height)), Image.Resampling.LANCZOS)
        result.save(destination, 'WEBP', quality=75, method=6)
    else:
        result.save(destination, optimize=True)
print(json.dumps({'file': relative, 'size': result.size, 'alpha_range': alpha}))
