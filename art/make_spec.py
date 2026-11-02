"""Writes art/generation-prompts.json: every picture the game uses (ids match the game data).
Run: python art/make_spec.py art/generation-prompts.json, then node art/art_todo.mjs."""
import json, sys
from pathlib import Path

out = Path(sys.argv[1])

CHAR = 'Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.'
BIG = 'Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.'
BOSS = 'Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.'
HERO = 'Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.'
ICON = 'One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.'
TILE = 'SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.'
DECOR = 'One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.'
BORDER = 'One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.'
ISLAND = 'A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.'

assets = []
def add(file, w, h, subject, extra):
    assets.append({'file': file, 'w': w, 'h': h, 'subject': subject, 'extra': extra})

# ---------- heroes ----------
heroes = {
    'ivan': 'Ivan the peasant son, young bogatyr in a simple linen shirt with red embroidery, bast shoes, cheerful and brave',
    'alyosha': 'Alyosha Popovich, young slim cunning bogatyr, light chainmail, pointed helmet, a sly grin',
    'dobrynya': 'Dobrynya Nikitich, strong dragon-slayer bogatyr, scale armour, red cloak, brown beard',
    'buslaev': 'Vasily Buslaev, rowdy Novgorod hero, red kaftan open at the chest, wide belt, broad grin',
    'mikula': 'Mikula Selyaninovich, mighty ploughman bogatyr, peasant clothes, enormous build, straw hat, calm smile',
    'volga': 'Volga Svyatoslavich, shapeshifter prince-bogatyr, falcon feathers on his cloak and helmet',
    'marya': 'Marya Morevna, warrior princess, ornate kokoshnik helmet, silver mail, long braid, proud look',
    'ilya': 'Ilya Muromets, the eldest and greatest bogatyr, grey beard, heavy chainmail, pointed helmet, calm and mighty',
}
for k, v in heroes.items():
    add(f'hero/{k}.png', 256, 256, v, HERO)

# ---------- locations: minions, boss, ground, map island ----------
locs = {
    'forest': ('Dark enchanted Russian forest', 'calm mossy green forest floor', 'Leshy, the forest master: a tall wild man of bark and moss with antler-like branches, glowing green eyes, leaf beard'),
    'swamp': ('Deadly bog', 'calm murky olive-green bog ground', 'Kikimora of the bog: a gaunt swamp witch with tangled hair of weeds, long fingers, a spindle, frogs around her feet'),
    'pool': ('Dark whirlpool by an old mill', 'calm dark wet riverbank silt, blue-grey', 'Vodyanoy, the water grandfather: a fat old green-skinned water spirit with a long wet beard of weeds, fish tail feet, mill-wheel crown'),
    'road': ('Robbers\' high road among old oaks', 'calm dusty light-brown dirt', 'Nightingale the Robber: a wild robber perched among nine oak branches, a huge lungful for his deadly whistle, feathers and rags'),
    'cave': ('Cave of One-Eyed Likho', 'calm grey cave floor stone', 'Likho One-Eyed: a towering gaunt cyclops crone with one huge eye in the middle of the forehead, rags, long grasping arms'),
    'hut': ('Baba Yaga\'s hut on chicken legs', 'calm dark brown forest earth', 'Baba Yaga: a bony old witch with a hooked nose, flying in a wooden mortar with a pestle and broom, iron teeth, a skull lantern'),
    'bridge': ('Kalinov bridge over the fiery river Smorodina', 'calm scorched dark red-brown earth', 'Zmey Gorynych: a green three-headed dragon with bat wings, each head breathing fire, spiked tail'),
    'koschei': ('Kingdom of Koschei the Deathless', 'calm cold dark slate-grey stone', 'Koschei the Deathless: a skeletal sorcerer king, tall and thin, black armour and crown, burning cold eyes, dark cape'),
}
# Sparse details scattered over the calm ground (3 kinds) and the wall of the arena (2 kinds), per location.
decor = {
    'forest': ['small mossy pebble', 'a few blue cornflowers', 'small fern sprout'],
    'swamp': ['small tuft of reeds', 'white water lily flower', 'small mossy stone'],
    'pool': ['few smooth river pebbles', 'small river shell', 'small tuft of sedge'],
    'road': ['small grey stone', 'dry grass tuft', 'lost rusty horseshoe'],
    'cave': ['small sharp rock', 'old bone', 'small glowing crystal'],
    'hut': ['small red mushroom', 'small bone', 'black crow feather'],
    'bridge': ['small smouldering ember stone', 'small pile of ash', 'charred pebble'],
    'koschei': ['small skull', 'scattered bones', 'cracked stone'],
}
border = {
    'forest': ['tall dark fir tree', 'old gnarled oak tree'],
    'swamp': ['dead twisted swamp tree with hanging moss', 'tall clump of reeds and cattails'],
    'pool': ['weeping willow tree', 'tall reeds by the water'],
    'road': ['big old oak tree', 'wooden fence section with a cart wheel'],
    'cave': ['tall cave rock wall boulder', 'tall stalagmite'],
    'hut': ['dark spruce tree', 'fence of wooden stakes with skulls on top'],
    'bridge': ['jagged black lava rock', 'burnt dead tree'],
    'koschei': ['black spiked rock spire', 'dead black tree'],
}
minions = {
    'forest': {
        'chaser': 'grey forest wolf, snarling', 'roller': 'big wild boar with tusks, lowering its head to charge',
        'shotgun': 'angry forest hedgehog with its quills raised, shooting a fan of needles', 'beam': 'glowing rotten-wood firefly spirit with a single bright eye',
        'twinBeam': 'twisted root creature with two glowing knots', 'splitter': 'big rotten tree stump monster',
        'small': 'little angry honey mushroom', 'rocket': 'grey owl messenger diving', 'poison': 'fly agaric mushroom man, red cap with white spots',
        'coin': 'thief squirrel carrying a bag of coins',
    },
    'swamp': {
        'chaser': 'bog man made of mud and reeds', 'roller': 'crawling moss hummock creature', 'shotgun': 'fat spitting frog',
        'beam': 'will-o\'-the-wisp blue swamp light', 'twinBeam': 'twin wisps joined by a thread of light', 'splitter': 'big slimy duckweed monster',
        'small': 'leech', 'rocket': 'huge blood-sucking mosquito', 'poison': 'warty poison toad', 'coin': 'greedy bittern bird with a coin in its beak',
    },
    'pool': {
        'chaser': 'drowned man, pale and dripping, weeds in his hair', 'roller': 'giant whiskered catfish flopping forward',
        'shotgun': 'water maiden throwing splashes, long wet hair, modest dress', 'beam': 'pool spirit, a column of dark water with glowing eyes',
        'twinBeam': 'whirlpool spirit spinning', 'splitter': 'big river shell creature', 'small': 'little crayfish',
        'rocket': 'toothy pike leaping', 'poison': 'blob of green slime', 'coin': 'burbot fish carrying a treasure pouch',
    },
    'road': {
        'chaser': 'robber with a flail in a red shirt', 'roller': 'big lad rolling a barrel', 'shotgun': 'robber with an old matchlock gun',
        'beam': 'robber archer drawing a bow', 'twinBeam': 'robber whistler with two fingers in his mouth', 'splitter': 'fat robber ataman',
        'small': 'scrawny robber henchman', 'rocket': 'hunting falcon diving', 'poison': 'tavern keeper with a jug of poison',
        'coin': 'pickpocket in a cap running with a purse',
    },
    'cave': {
        'chaser': 'cave bat', 'roller': 'rolling boulder creature', 'shotgun': 'big flint beetle spitting sharp stone shards',
        'beam': 'many-eyed cave creature with one big glowing eye', 'twinBeam': 'evil-eye spirit with two glowing eyes',
        'splitter': 'stone idol golem', 'small': 'little pebble creature', 'rocket': 'wandering fireball spirit',
        'poison': 'rotting ghoul', 'coin': 'copper snake carrying a gem',
    },
    'hut': {
        'chaser': 'black cat with arched back', 'roller': 'giant chicken leg running', 'shotgun': 'cawing crow',
        'beam': 'skull lantern on a fence stake with glowing eye sockets', 'twinBeam': 'two skulls on one stake',
        'splitter': 'bubbling witch cauldron on legs', 'small': 'little green frog', 'rocket': 'flying witch broom',
        'poison': 'purple witch mushroom', 'coin': 'little treasure-keeper house spirit with a coin chest',
    },
    'bridge': {
        'chaser': 'fire lizard', 'roller': 'young dragon curled into a rolling ball', 'shotgun': 'fire-spitting salamander',
        'beam': 'fire serpent with a glowing mouth', 'twinBeam': 'young two-headed dragon', 'splitter': 'big dragon egg with cracks',
        'small': 'tiny baby dragon', 'rocket': 'living fire spark', 'poison': 'viper snake', 'coin': 'golden serpent with treasure',
    },
    'koschei': {
        'chaser': 'skeleton warrior with a rusty sword', 'roller': 'skeleton horse', 'shotgun': 'skeleton throwing bones',
        'beam': 'undead sorcerer with a staff', 'twinBeam': 'black-robed dark sorcerer with two glowing hands',
        'splitter': 'heap of bones creature', 'small': 'little crawling pile of bones with a tiny skull', 'rocket': 'Koschei\'s black raven',
        'poison': 'pale vampire ghoul (upyr)', 'coin': 'Koschei\'s treasurer, a skeletal miser with a coin chest',
    },
}
for loc, (place, ground, boss) in locs.items():
    for ai, what in minions[loc].items():
        size = 320 if ai in ('roller', 'splitter') else 192 if ai == 'small' else 256
        add(f'mob/{loc}_{ai}.png', size, size, f'{what}, minion of the location "{place}"', BIG if size == 320 else CHAR)
    add(f'boss/{loc}.png', 448, 448, boss, BOSS)
    # No ground tiles: the battlefield is a flat colour (src/game/data/bestiary.ts, `ground`).
    add(f'location/{loc}.png', 512, 384, f'{place}; {boss.split(":")[0]}', ISLAND)
    for i, what in enumerate(decor[loc], 1):
        add(f'decor/{loc}_{i}.png', 128, 128, f'{what}, location "{place}"', DECOR)
    for i, what in enumerate(border[loc], 1):
        add(f'border/{loc}_{i}.png', 256, 256, f'{what}, location "{place}"', BORDER)
add('mob/egg.png', 192, 192, 'Koschei\'s egg: a white egg with a dark crack glowing, a needle visible inside, magical runes', ICON)

# ---------- run weapons ----------
weapons = {
    'pistol': 'old Russian hand cannon (ruchnitsa), short iron barrel on a wooden stock',
    'smg': 'rapid-fire multi-barrel matchlock arquebus (pishchal)', 'shotgun': 'wide-mouthed scatter arquebus loaded with shot',
    'crossbow': 'old Russian crossbow (samostrel)', 'sword': 'Kladenets, the magic sword of Russian tales, glowing blade',
    'lightning': 'staff of Perun crackling with lightning', 'fireWand': 'feather of the Firebird, glowing golden-red',
    'frostStaff': 'staff of Morozko, Father Frost, icy blue with frost crystals', 'drone': 'copper mechanical falcon automaton',
    'turret': 'small wooden watchtower with a crossbow on top',
}
# Weapons hover around the hero in battle and turn toward their targets, and the same picture is the UI icon.
WEAPON = 'One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.'
for k, v in weapons.items():
    add(f'weapon/{k}.png', 128, 128, v, WEAPON)

# ---------- lobby gear (slot x set) ----------
slots = {'hat': 'helmet', 'glasses': 'amulet charm on a cord', 'shirt': 'chainmail shirt', 'backpack': 'travel bag (kotomka)', 'boots': 'pair of boots'}
sets = {
    'hunter': 'hunter set: leather, fur trim, green and brown', 'guard': 'druzhina guard set: steel and red cloth, sturdy',
    'alchemist': 'volkhv sorcerer set: dark blue cloth, runes, silver', 'mechanic': 'blacksmith set: soot-darkened iron, brass rivets',
    'trader': 'merchant set: rich embroidered cloth, gold buttons, fur',
}
for s, sd in sets.items():
    for slot, noun in slots.items():
        add(f'gear/{slot}_{s}.png', 128, 128, f'{noun}, {sd}', ICON)

# ---------- abilities ----------
abilities = {
    'roll': 'dust swirl of a quick roll with motion lines', 'rapidFire': 'glowing arrows flying in a fast volley',
    'heal': 'linen bandage and a sprig of plantain', 'frostNova': 'burst of ice crystals', 'shockwave': 'ring of shockwave cracking the ground',
}
for k, v in abilities.items():
    add(f'ability/{k}.png', 128, 128, v, ICON)

# ---------- run items ----------
items = {
    'lightBoots': 'magic seven-league boots with small wings', 'ironSkin': 'bear skin cloak', 'rawMeat': 'round Russian karavai bread loaf',
    'whetstone': 'whetstone', 'gunpowder': 'leather pouch of gunpowder', 'runeScroll': 'birch bark letter with runes',
    'gear': 'blacksmith hammer', 'magnet': 'magnetic lodestone', 'fang': 'wolf fang on a cord', 'monocle': 'falcon eye charm',
    'hourglass': 'hourglass', 'piggyBank': 'leather coin purse', 'bandage': 'plantain leaves', 'textbook': 'old book of wisdom',
    'cloverCoin': 'lucky old coin', 'meditation': 'bundle of sleepy dream herbs', 'magpie': 'magpie bird holding a coin',
    'berserkerMask': 'bogatyr\'s fury: a glowing red war helmet',
}
for k, v in items.items():
    add(f'item/{k}.png', 128, 128, v, ICON)

# ---------- pickups, chests, currencies ----------
add('pickup/coin.png', 128, 128, 'old Russian silver coin (denga)', ICON)
add('pickup/medkit.png', 128, 128, 'small flask of living water, glowing blue', ICON)
add('object/supply_chest.png', 256, 256, 'wooden supply chest with iron bands, closed', 'One isolated map object, top-down 3/4 view, centered horizontally, base near bottom with small margin, transparent background, no terrain tile or backdrop.')
for k, v in {'small': 'small wooden chest', 'medium': 'medium chest with silver bands', 'big': 'big ornate golden chest overflowing glow'}.items():
    add(f'object/chest_{k}.png', 256, 256, f'{v}, closed', ICON)
for k, v in {'gold': 'pile of gold coins', 'gems': 'blue gem crystal', 'water': 'flask of living water', 'blueprint': 'rolled birch bark blueprint'}.items():
    add(f'ui/{k}.png', 128, 128, v, ICON)

# ---------- pictures to redo ----------
for a in assets:
    if a['file'] == 'mob/forest_shotgun.png':
        a['redo'] = 'гоблин не из нашей сказки: нужен ёж-колючник, стреляющий веером иголок'

# ---------- walk frames ----------
# Frame 1 is the base picture above (standing). Frames 2 and 3 are the two strides of the walk cycle;
# the game plays 1 -> 2 -> 1 -> 3. Each is drawn from frame 1 as the exact reference.
FRAME = {
    2: 'WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. ',
    3: 'WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. ',
}
SAME = 'Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. '
walkers = [a for a in assets if a['file'].split('/')[0] in ('hero', 'mob', 'boss') and a['file'] != 'mob/egg.png']
for a in walkers:
    for n in (2, 3):
        stem = a['file'][:-4]
        assets.append({'file': f'{stem}_{n}.png', 'w': a['w'], 'h': a['h'], 'subject': a['subject'], 'extra': FRAME[n] + SAME + a['extra'], 'guide': f"public/sprites/{a['file']}"})

spec = {
    'mode': 'built-in image_gen',
    'reference': 'References/style.png (сделать первым: богатырь Иван — hero/ivan.png — и утвердить стиль)',
    'style': 'hand-painted cartoon game art in the style of old Russian folk fairy-tale book illustrations, bold dark outlines, chunky readable silhouettes, warm earthy palette with saturated folk-ornament accents (red, gold, deep green, blue), soft cel shading, slightly cute proportions',
    'constraints': 'One asset per image. No text, watermark, frame or collage. Transparent except terrain. Smooth (Lanczos) resize to final size.',
    'assets': assets,
}
out.write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding='utf-8')
print(len(assets), 'assets')
