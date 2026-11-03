"""Queue five requested sprites; save ImageGen results and record completed work."""
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ART = ROOT / 'art'

def specs():
    files = [ART / name for name in ('generation-prompts.json', 'generation-extra-prompts.json')]
    return [(p, json.loads(p.read_text(encoding='utf-8'))) for p in files if p.exists()]

if sys.argv[1] == 'queue':
    pending = []
    documents = specs()
    for _, document in documents:
        for asset in document['assets']:
            path = ROOT / asset['path'] if asset.get('path') else ROOT / 'public/sprites' / asset['file']
            needed = not path.exists() or bool(asset.get('redo'))
            if not needed:
                with Image.open(path) as im:
                    needed = (im.width < asset['w'] or im.height < asset['h']) if asset.get('minSize') else im.size != (asset['w'], asset['h'])
            if needed:
                pending.append(asset)
    print(json.dumps({'remaining': len(pending), 'style': documents[0][1]['style'], 'assets': pending[:5]}, ensure_ascii=True))
elif sys.argv[1] == 'save':
    batch = json.loads(Path(sys.argv[2]).read_text(encoding='utf-8'))
    completed = []
    for item in batch:
        asset = item['asset']
        target = ROOT / 'public/sprites' / asset['file']
        with Image.open(item['source']) as image:
            alpha = image.convert('RGBA').getchannel('A').getextrema()
            opaque = asset['file'].startswith(('terrain/', 'cover/'))
            if opaque and alpha != (255, 255):
                raise ValueError(f'Expected opaque background for {asset["file"]}: {alpha}')
            if not opaque and (alpha[0] != 0 or alpha[1] < 250):
                raise ValueError(f'Invalid transparency for {asset["file"]}: {alpha}')
        args = [sys.executable, str(ART / 'save_generated_asset.py'), item['source'], asset['file'], str(asset['w']), str(asset['h'])]
        if asset.get('guide'):
            reference = Path(asset['guide']).relative_to(Path('public/sprites')).as_posix()
            args.extend(['--align-to', reference])
        if target.exists():
            if not asset.get('redo'):
                raise ValueError(f'Unexpected existing target: {target}')
            args.append('--replace')
        subprocess.run(args, check=True, cwd=ROOT)
        with Image.open(target) as image:
            assert image.size == (asset['w'], asset['h'])
        record = {'time': datetime.now().astimezone().isoformat(), 'file': asset['file'], 'size': [asset['w'], asset['h']], 'source': item['source'], 'mode': 'built-in image_gen', 'prompt': item['prompt']}
        with (ART / 'GENERATION_LOG.jsonl').open('a', encoding='utf-8') as log:
            log.write(json.dumps(record, ensure_ascii=False) + '\n')
        with (ART / 'GENERATION_LOG.md').open('a', encoding='utf-8') as log:
            log.write(f"- {record['time']} — `{asset['file']}` — {asset['w']}×{asset['h']}, сохранено и проверено; встроенный ImageGen.\n")
        completed.append(asset['file'])
    for path, document in specs():
        changed = False
        for asset in document['assets']:
            generated = next((item['asset'] for item in batch if item['asset']['file'] == asset['file']), None)
            same_request = generated and all(asset.get(key) == generated.get(key) for key in ('subject', 'extra', 'w', 'h', 'redo'))
            if asset['file'] in completed and asset.get('redo') and same_request:
                del asset['redo']
                changed = True
        if changed:
            path.write_text(json.dumps(document, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    subprocess.run([sys.executable, str(ART / 'compress_sprites.py')], check=True, cwd=ROOT)
    subprocess.run(['node', str(ART / 'art_todo.mjs')], check=True, cwd=ROOT, stdout=subprocess.DEVNULL)
    print(json.dumps({'saved': completed}, ensure_ascii=False))
