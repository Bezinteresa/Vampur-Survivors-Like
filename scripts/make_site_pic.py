"""Picture for the game list on our own site (dom18games.ru: games/<Name>/pic.png, 800x800), put together
from the game's own art: Leshy behind, the bogatyr with his weapons, forest minions running at him, the title.
A painted cover (public/sprites/cover/square.png) is better once it exists: then use scripts/make_covers.py.

Run: python scripts/make_site_pic.py  ->  release/site/pic.png
"""
import importlib.util
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SPR = ROOT / 'public' / 'sprites'
OUT = ROOT / 'release' / 'site' / 'pic.png'
S = 800

spec = importlib.util.spec_from_file_location('make_covers', ROOT / 'scripts' / 'make_covers.py')
covers = importlib.util.module_from_spec(spec)
spec.loader.exec_module(covers)


def sprite(name: str, size: int, flip: bool = False) -> Image.Image:
    im = Image.open(SPR / name).convert('RGBA').resize((size, size), Image.LANCZOS)
    return im.transpose(Image.FLIP_LEFT_RIGHT) if flip else im


def put(bg: Image.Image, im: Image.Image, cx: int, bottom: int, shadow: bool = True) -> None:
    x, y = cx - im.width // 2, bottom - im.height
    if shadow:
        sh = Image.new('RGBA', bg.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).ellipse((cx - im.width * 0.3, bottom - im.height * 0.07, cx + im.width * 0.3, bottom + im.height * 0.03), fill=(0, 0, 0, 110))
        bg.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8)))
    bg.alpha_composite(im, (x, y))


def main() -> None:
    # Flat field colour of the forest with a soft light in the middle, as in the battle.
    bg = Image.new('RGBA', (S, S), (60, 72, 38, 255))
    glow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((90, 160, 710, 780), fill=(150, 165, 90, 120))
    bg.alpha_composite(glow.filter(ImageFilter.GaussianBlur(90)))

    put(bg, sprite('boss/forest.png', 470), 430, 560, shadow=False)  # Leshy behind
    dark = Image.new('RGBA', (S, S), (20, 28, 14, 70))  # pushes Leshy back
    bg.alpha_composite(dark)
    put(bg, sprite('mob/forest_roller.png', 230), 640, 700)  # minions from the right, facing the hero
    put(bg, sprite('mob/forest_chaser.png', 200, flip=True), 690, 790)
    put(bg, sprite('mob/forest_shotgun.png', 170), 560, 790)
    put(bg, sprite('hero/ivan.png', 330), 270, 770)
    bg.alpha_composite(sprite('weapon/sword.png', 120), (360, 520))
    bg.alpha_composite(sprite('weapon/fireWand.png', 110), (110, 470))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    covers.title(bg).convert('RGB').save(OUT, optimize=True)
    print(OUT.relative_to(ROOT), f'{OUT.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
