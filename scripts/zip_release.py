"""Zips dist/ for the platforms: index.html at the root of the archive, store covers left out.
Run after `npm run build`: python scripts/zip_release.py  (version from package.json)
"""
import json
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
SKIP = ('sprites/cover/',)  # store covers: uploaded to the platform separately, not part of the game


def main() -> None:
    version = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))['version']
    out = ROOT / 'release' / f'bogatyr-survivors-{version}.zip'
    out.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for f in sorted(DIST.rglob('*')):
            name = f.relative_to(DIST).as_posix()
            if f.is_file() and not name.startswith(SKIP):
                z.write(f, name)
    print(out.relative_to(ROOT), f'{out.stat().st_size / 1e6:.1f} MB')


if __name__ == '__main__':
    main()
