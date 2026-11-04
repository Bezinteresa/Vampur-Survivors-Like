"""Store covers for the platforms: takes the painted covers from public/sprites/cover/ or art/drafts/cover/
(made by the art pipeline, see art/ART_TODO.md), fills any see-through spots, puts the game title on top and saves them in the exact Playgama sizes
to release/covers/ — square 800x800, portrait 1080x1920, landscape 1920x1080.

Run: python scripts/make_covers.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
# Finished covers first; the art pipeline's drafts (art/drafts/cover) when there are none yet.
SOURCES = [ROOT / 'public' / 'sprites' / 'cover', ROOT / 'art' / 'drafts' / 'cover']
OUT = ROOT / 'release' / 'covers'
TITLE = 'Bogatyr Survivors'
SIZES = {'square': (800, 800), 'portrait': (1080, 1920), 'landscape': (1920, 1080)}
FONTS = ['C:/Windows/Fonts/ariblk.ttf', 'C:/Windows/Fonts/impact.ttf', 'C:/Windows/Fonts/arialbd.ttf']


def font(size: int) -> ImageFont.FreeTypeFont:
    for f in FONTS:
        if Path(f).exists():
            return ImageFont.truetype(f, size)
    return ImageFont.load_default(size)


def title(img: Image.Image) -> Image.Image:
    w, h = img.size
    # One line, about 85% of the width, in the calm strip at the very top (two lines on the tall cover
    # would cover the boss's face).
    lines = [TITLE]
    size = int(w * 0.8 / max(len(s) for s in lines) * 1.6)
    f = font(size)
    while max(f.getlength(s) for s in lines) > w * 0.86:
        size -= 4
        f = font(size)
    top = int(h * 0.03)
    layer = Image.new('RGBA', img.size, (0, 0, 0, 0))
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    ds = ImageDraw.Draw(shadow)
    y = top
    for s in lines:
        x = (w - f.getlength(s)) / 2
        ds.text((x, y + size * 0.06), s, font=f, fill=(0, 0, 0, 200))
        d.text((x, y), s, font=f, fill=(246, 206, 92, 255), stroke_width=max(3, size // 14), stroke_fill=(58, 30, 16, 255))
        y += int(size * 1.08)
    shadow = shadow.filter(ImageFilter.GaussianBlur(size // 10))
    return Image.alpha_composite(Image.alpha_composite(img.convert('RGBA'), shadow), layer)


def opaque(src: Image.Image) -> Image.Image:
    """A cover must be fully opaque. Generated pictures sometimes come back see-through in places (a hole in
    the sky): those pixels are filled from the colours around them (a normalized blur of the solid pixels)."""
    rgba = src.convert('RGBA')
    solid = rgba.getchannel('A').point(lambda v: 255 if v >= 200 else 0)
    rgb = rgba.convert('RGB')
    fill = rgb.copy()
    for radius in (8, 24, 64, 160):
        black = Image.new('RGB', rgb.size)
        weighted = Image.composite(rgb, black, solid).filter(ImageFilter.GaussianBlur(radius))
        weight = solid.filter(ImageFilter.GaussianBlur(radius))
        # colour = blur(colour * mask) / blur(mask), where the mask has some weight; wider radii fill bigger holes
        px, wt, out = weighted.load(), weight.load(), fill.load()
        mask = solid.load()
        for y in range(rgb.height):
            for x in range(rgb.width):
                if mask[x, y] == 0 and wt[x, y] > 8:
                    k = 255 / wt[x, y]
                    r, g, b = px[x, y]
                    out[x, y] = (min(255, int(r * k)), min(255, int(g * k)), min(255, int(b * k)))
        solid = Image.composite(Image.new('L', rgb.size, 255), solid, weight.point(lambda v: 255 if v > 8 else 0))
        rgb = fill.copy()
    return fill


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (w, h) in SIZES.items():
        src = next((d / f'{name}.png' for d in SOURCES if (d / f'{name}.png').exists()), None)
        if not src:
            print(f'skip {name}: no cover/{name}.png yet')
            continue
        img = opaque(Image.open(src))
        if img.size != (w, h):
            # Fill the exact size without stretching: scale to cover it and trim the overflow evenly.
            img = ImageOps.fit(img, (w, h), Image.LANCZOS)
        out = OUT / f'{name}.png'
        title(img).convert('RGB').save(out, optimize=True)
        print(out.relative_to(ROOT), f'{w}x{h}', f'{out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
