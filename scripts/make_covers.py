"""Store covers for the platforms: takes the painted covers from public/sprites/cover/ (made by the art
pipeline, see art/ART_TODO.md), puts the game title on top and saves them in the exact Playgama sizes
to release/covers/ — square 800x800, portrait 1080x1920, landscape 1920x1080.

Run: python scripts/make_covers.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'public' / 'sprites' / 'cover'
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
    # Two lines on the tall cover, one line elsewhere; the text takes about 80% of the width.
    lines = TITLE.split() if h > w else [TITLE]
    size = int(w * 0.8 / max(len(s) for s in lines) * 1.6)
    f = font(size)
    while max(f.getlength(s) for s in lines) > w * 0.86:
        size -= 4
        f = font(size)
    top = int(h * 0.04)
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


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (w, h) in SIZES.items():
        src = SRC / f'{name}.png'
        if not src.exists():
            print(f'skip {name}: no {src.relative_to(ROOT)} yet')
            continue
        img = Image.open(src).convert('RGB')
        if img.size != (w, h):
            img = img.resize((w, h), Image.LANCZOS)
        out = OUT / f'{name}.png'
        title(img).convert('RGB').save(out, optimize=True)
        print(out.relative_to(ROOT), f'{w}x{h}', f'{out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
