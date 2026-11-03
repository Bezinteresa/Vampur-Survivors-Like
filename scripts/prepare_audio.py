"""Copies the game's sounds into public/audio from the shared CC0 packs in H:/Html AI/resources/audio
(list and licences in resources/README.md). Music: the 128 kbit/s MP3 copies already made for
"Победа над чудовищем" (рпг три в ряд/web/public/audio) from the same OpenGameArt originals.

Run: python scripts/prepare_audio.py [resources dir]
"""
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RES = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'resources'
OUT = ROOT / 'public' / 'audio'

KENNEY = RES / 'audio' / 'kenney'
SWISH = RES / 'audio' / 'opengameart' / 'artisticdude_swishes-sound-pack.zip'
MUSIC_SRC = ROOT.parent / 'рпг три в ряд' / 'web' / 'public' / 'audio'

# game name -> (archive, file inside it)
SFX = {
    'shot.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/explosionCrunch_000.ogg'),
    'magic.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/forceField_000.ogg'),
    'zap.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/laserSmall_001.ogg'),
    'mech.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/laserRetro_000.ogg'),
    'enemy_shot.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/laserSmall_000.ogg'),
    'beam.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/laserLarge_000.ogg'),
    'boom.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/explosionCrunch_001.ogg'),
    'boss.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/lowFrequency_explosion_000.ogg'),
    'ability.ogg': ('kenney_sci-fi-sounds.zip', 'Audio/forceField_003.ogg'),
    'hit.ogg': ('kenney_impact-sounds.zip', 'Audio/impactSoft_medium_000.ogg'),
    'kill.ogg': ('kenney_impact-sounds.zip', 'Audio/impactPunch_medium_000.ogg'),
    'hurt.ogg': ('kenney_impact-sounds.zip', 'Audio/impactPlate_heavy_000.ogg'),
    'coin.ogg': ('kenney_interface-sounds.zip', 'Audio/glass_002.ogg'),
    'heal.ogg': ('kenney_interface-sounds.zip', 'Audio/maximize_002.ogg'),
    'levelup.ogg': ('kenney_interface-sounds.zip', 'Audio/maximize_006.ogg'),
    'wave.ogg': ('kenney_interface-sounds.zip', 'Audio/bong_001.ogg'),
    'wave_clear.ogg': ('kenney_interface-sounds.zip', 'Audio/confirmation_002.ogg'),
    'buy.ogg': ('kenney_interface-sounds.zip', 'Audio/drop_002.ogg'),
    'reroll.ogg': ('kenney_interface-sounds.zip', 'Audio/switch_002.ogg'),
    'click.ogg': ('kenney_interface-sounds.zip', 'Audio/click_002.ogg'),
    'chest.ogg': ('kenney_interface-sounds.zip', 'Audio/open_002.ogg'),
    'win.ogg': ('kenney_interface-sounds.zip', 'Audio/confirmation_004.ogg'),
    'lose.ogg': ('kenney_interface-sounds.zip', 'Audio/error_008.ogg'),
}
SWISHES = {'swing.wav': 'swishes/swish-1.wav', 'roll.wav': 'swishes/swish-6.wav'}
MUSIC = {'music_lobby.mp3': 'music_map.mp3', 'music_battle.mp3': 'music_battle.mp3', 'music_boss.mp3': 'music_boss.mp3'}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, (archive, inner) in SFX.items():
        with zipfile.ZipFile(KENNEY / archive) as z:
            (OUT / name).write_bytes(z.read(inner))
    with zipfile.ZipFile(SWISH) as z:
        for name, inner in SWISHES.items():
            (OUT / name).write_bytes(z.read(inner))
    for name, src in MUSIC.items():
        shutil.copyfile(MUSIC_SRC / src, OUT / name)
    total = sum(f.stat().st_size for f in OUT.iterdir())
    print(f'{len(list(OUT.iterdir()))} files, {total / 1e6:.1f} MB in {OUT}')


if __name__ == '__main__':
    main()
