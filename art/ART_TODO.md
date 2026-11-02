# Что сгенерировать сейчас

Файл создан скриптом `node art/art_todo.mjs` (02.11.2026, 22:45:37). Генерируй **только** картинки из этого списка — остальные уже готовы.

Стиль: hand-painted cartoon game art in the style of old Russian folk fairy-tale book illustrations, bold dark outlines, chunky readable silhouettes, warm earthy palette with saturated folk-ornament accents (red, gold, deep green, blue), soft cel shading, slightly cute proportions
Референс: References/style.png (сделать первым: богатырь Иван — hero/ivan.png — и утвердить стиль)
Правила: One asset per image. No text, watermark, frame or collage. Transparent except terrain. Smooth (Lanczos) resize to final size.

Готовую картинку сохраняй в `public/sprites/<файл>` точно указанного размера:
`python art/save_generated_asset.py <исходник> <файл> <ширина> <высота>` (для переделки добавь `--replace`).
Потом сожми тяжёлые картинки: `python art/compress_sprites.py` (оригиналы останутся в art/originals).
После этого снова запусти `node art/art_todo.mjs` — сделанное пропадёт из списка.

Осталось: **367**

## mob/forest_shotgun.png — 256×256

- Почему: переделать: гоблин не из нашей сказки: нужен ёж-колючник, стреляющий веером иголок
- Что: angry forest hedgehog with its quills raised, shooting a fan of needles, minion of the location "Dark enchanted Russian forest"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/forest.png — 256×256

- Почему: переделать: слишком много деталей: нужен почти однородный цвет, мелочи и забор теперь отдельные картинки (decor/, border/)
- Что: calm mossy green forest floor
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## decor/forest_1.png — 128×128

- Почему: новая картинка
- Что: small mossy pebble, location "Dark enchanted Russian forest"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/forest_2.png — 128×128

- Почему: новая картинка
- Что: a few blue cornflowers, location "Dark enchanted Russian forest"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/forest_3.png — 128×128

- Почему: новая картинка
- Что: small fern sprout, location "Dark enchanted Russian forest"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/forest_1.png — 256×256

- Почему: новая картинка
- Что: tall dark fir tree, location "Dark enchanted Russian forest"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/forest_2.png — 256×256

- Почему: новая картинка
- Что: old gnarled oak tree, location "Dark enchanted Russian forest"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## terrain/swamp.png — 256×256

- Почему: переделать: слишком много деталей: нужен почти однородный цвет, мелочи и забор теперь отдельные картинки (decor/, border/)
- Что: calm murky olive-green bog ground
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## decor/swamp_1.png — 128×128

- Почему: новая картинка
- Что: small tuft of reeds, location "Deadly bog"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/swamp_2.png — 128×128

- Почему: новая картинка
- Что: white water lily flower, location "Deadly bog"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/swamp_3.png — 128×128

- Почему: новая картинка
- Что: small mossy stone, location "Deadly bog"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/swamp_1.png — 256×256

- Почему: новая картинка
- Что: dead twisted swamp tree with hanging moss, location "Deadly bog"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/swamp_2.png — 256×256

- Почему: новая картинка
- Что: tall clump of reeds and cattails, location "Deadly bog"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## decor/pool_1.png — 128×128

- Почему: новая картинка
- Что: few smooth river pebbles, location "Dark whirlpool by an old mill"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/pool_2.png — 128×128

- Почему: новая картинка
- Что: small river shell, location "Dark whirlpool by an old mill"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/pool_3.png — 128×128

- Почему: новая картинка
- Что: small tuft of sedge, location "Dark whirlpool by an old mill"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/pool_1.png — 256×256

- Почему: новая картинка
- Что: weeping willow tree, location "Dark whirlpool by an old mill"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/pool_2.png — 256×256

- Почему: новая картинка
- Что: tall reeds by the water, location "Dark whirlpool by an old mill"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/road_shotgun.png — 256×256

- Почему: новая картинка
- Что: robber with an old matchlock gun, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_beam.png — 256×256

- Почему: новая картинка
- Что: robber archer drawing a bow, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_twinBeam.png — 256×256

- Почему: новая картинка
- Что: robber whistler with two fingers in his mouth, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_splitter.png — 320×320

- Почему: новая картинка
- Что: fat robber ataman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_small.png — 192×192

- Почему: новая картинка
- Что: scrawny robber henchman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_rocket.png — 256×256

- Почему: новая картинка
- Что: hunting falcon diving, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_poison.png — 256×256

- Почему: новая картинка
- Что: tavern keeper with a jug of poison, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/road_coin.png — 256×256

- Почему: новая картинка
- Что: pickpocket in a cap running with a purse, minion of the location "Robbers' high road among old oaks"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## boss/road.png — 448×448

- Почему: новая картинка
- Что: Nightingale the Robber: a wild robber perched among nine oak branches, a huge lungful for his deadly whistle, feathers and rags
- Дополнительно: Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/road.png — 256×256

- Почему: новая картинка
- Что: calm dusty light-brown dirt
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## location/road.png — 512×384

- Почему: новая картинка
- Что: Robbers' high road among old oaks; Nightingale the Robber
- Дополнительно: A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.

## decor/road_1.png — 128×128

- Почему: новая картинка
- Что: small grey stone, location "Robbers' high road among old oaks"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/road_2.png — 128×128

- Почему: новая картинка
- Что: dry grass tuft, location "Robbers' high road among old oaks"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/road_3.png — 128×128

- Почему: новая картинка
- Что: lost rusty horseshoe, location "Robbers' high road among old oaks"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/road_1.png — 256×256

- Почему: новая картинка
- Что: big old oak tree, location "Robbers' high road among old oaks"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/road_2.png — 256×256

- Почему: новая картинка
- Что: wooden fence section with a cart wheel, location "Robbers' high road among old oaks"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/cave_chaser.png — 256×256

- Почему: новая картинка
- Что: cave bat, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_roller.png — 320×320

- Почему: новая картинка
- Что: rolling boulder creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_shotgun.png — 256×256

- Почему: новая картинка
- Что: big flint beetle spitting sharp stone shards, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_beam.png — 256×256

- Почему: новая картинка
- Что: many-eyed cave creature with one big glowing eye, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_twinBeam.png — 256×256

- Почему: новая картинка
- Что: evil-eye spirit with two glowing eyes, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_splitter.png — 320×320

- Почему: новая картинка
- Что: stone idol golem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_small.png — 192×192

- Почему: новая картинка
- Что: little pebble creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_rocket.png — 256×256

- Почему: новая картинка
- Что: wandering fireball spirit, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_poison.png — 256×256

- Почему: новая картинка
- Что: rotting ghoul, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/cave_coin.png — 256×256

- Почему: новая картинка
- Что: copper snake carrying a gem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## boss/cave.png — 448×448

- Почему: новая картинка
- Что: Likho One-Eyed: a towering gaunt cyclops crone with one huge eye in the middle of the forehead, rags, long grasping arms
- Дополнительно: Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/cave.png — 256×256

- Почему: новая картинка
- Что: calm grey cave floor stone
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## location/cave.png — 512×384

- Почему: новая картинка
- Что: Cave of One-Eyed Likho; Likho One-Eyed
- Дополнительно: A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.

## decor/cave_1.png — 128×128

- Почему: новая картинка
- Что: small sharp rock, location "Cave of One-Eyed Likho"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/cave_2.png — 128×128

- Почему: новая картинка
- Что: old bone, location "Cave of One-Eyed Likho"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/cave_3.png — 128×128

- Почему: новая картинка
- Что: small glowing crystal, location "Cave of One-Eyed Likho"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/cave_1.png — 256×256

- Почему: новая картинка
- Что: tall cave rock wall boulder, location "Cave of One-Eyed Likho"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/cave_2.png — 256×256

- Почему: новая картинка
- Что: tall stalagmite, location "Cave of One-Eyed Likho"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/hut_chaser.png — 256×256

- Почему: новая картинка
- Что: black cat with arched back, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_roller.png — 320×320

- Почему: новая картинка
- Что: giant chicken leg running, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_shotgun.png — 256×256

- Почему: новая картинка
- Что: cawing crow, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_beam.png — 256×256

- Почему: новая картинка
- Что: skull lantern on a fence stake with glowing eye sockets, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_twinBeam.png — 256×256

- Почему: новая картинка
- Что: two skulls on one stake, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_splitter.png — 320×320

- Почему: новая картинка
- Что: bubbling witch cauldron on legs, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_small.png — 192×192

- Почему: новая картинка
- Что: little green frog, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_rocket.png — 256×256

- Почему: новая картинка
- Что: flying witch broom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_poison.png — 256×256

- Почему: новая картинка
- Что: purple witch mushroom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/hut_coin.png — 256×256

- Почему: новая картинка
- Что: little treasure-keeper house spirit with a coin chest, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## boss/hut.png — 448×448

- Почему: новая картинка
- Что: Baba Yaga: a bony old witch with a hooked nose, flying in a wooden mortar with a pestle and broom, iron teeth, a skull lantern
- Дополнительно: Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/hut.png — 256×256

- Почему: новая картинка
- Что: calm dark brown forest earth
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## location/hut.png — 512×384

- Почему: новая картинка
- Что: Baba Yaga's hut on chicken legs; Baba Yaga
- Дополнительно: A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.

## decor/hut_1.png — 128×128

- Почему: новая картинка
- Что: small red mushroom, location "Baba Yaga's hut on chicken legs"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/hut_2.png — 128×128

- Почему: новая картинка
- Что: small bone, location "Baba Yaga's hut on chicken legs"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/hut_3.png — 128×128

- Почему: новая картинка
- Что: black crow feather, location "Baba Yaga's hut on chicken legs"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/hut_1.png — 256×256

- Почему: новая картинка
- Что: dark spruce tree, location "Baba Yaga's hut on chicken legs"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/hut_2.png — 256×256

- Почему: новая картинка
- Что: fence of wooden stakes with skulls on top, location "Baba Yaga's hut on chicken legs"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/bridge_chaser.png — 256×256

- Почему: новая картинка
- Что: fire lizard, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_roller.png — 320×320

- Почему: новая картинка
- Что: young dragon curled into a rolling ball, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_shotgun.png — 256×256

- Почему: новая картинка
- Что: fire-spitting salamander, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_beam.png — 256×256

- Почему: новая картинка
- Что: fire serpent with a glowing mouth, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_twinBeam.png — 256×256

- Почему: новая картинка
- Что: young two-headed dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_splitter.png — 320×320

- Почему: новая картинка
- Что: big dragon egg with cracks, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_small.png — 192×192

- Почему: новая картинка
- Что: tiny baby dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_rocket.png — 256×256

- Почему: новая картинка
- Что: living fire spark, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_poison.png — 256×256

- Почему: новая картинка
- Что: viper snake, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/bridge_coin.png — 256×256

- Почему: новая картинка
- Что: golden serpent with treasure, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## boss/bridge.png — 448×448

- Почему: новая картинка
- Что: Zmey Gorynych: a green three-headed dragon with bat wings, each head breathing fire, spiked tail
- Дополнительно: Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/bridge.png — 256×256

- Почему: новая картинка
- Что: calm scorched dark red-brown earth
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## location/bridge.png — 512×384

- Почему: новая картинка
- Что: Kalinov bridge over the fiery river Smorodina; Zmey Gorynych
- Дополнительно: A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.

## decor/bridge_1.png — 128×128

- Почему: новая картинка
- Что: small smouldering ember stone, location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/bridge_2.png — 128×128

- Почему: новая картинка
- Что: small pile of ash, location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/bridge_3.png — 128×128

- Почему: новая картинка
- Что: charred pebble, location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/bridge_1.png — 256×256

- Почему: новая картинка
- Что: jagged black lava rock, location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/bridge_2.png — 256×256

- Почему: новая картинка
- Что: burnt dead tree, location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/koschei_chaser.png — 256×256

- Почему: новая картинка
- Что: skeleton warrior with a rusty sword, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_roller.png — 320×320

- Почему: новая картинка
- Что: skeleton horse, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_shotgun.png — 256×256

- Почему: новая картинка
- Что: skeleton throwing bones, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_beam.png — 256×256

- Почему: новая картинка
- Что: undead sorcerer with a staff, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_twinBeam.png — 256×256

- Почему: новая картинка
- Что: black-robed dark sorcerer with two glowing hands, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_splitter.png — 320×320

- Почему: новая картинка
- Что: heap of bones creature, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_small.png — 192×192

- Почему: новая картинка
- Что: little crawling pile of bones with a tiny skull, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_rocket.png — 256×256

- Почему: новая картинка
- Что: Koschei's black raven, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_poison.png — 256×256

- Почему: новая картинка
- Что: pale vampire ghoul (upyr), minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## mob/koschei_coin.png — 256×256

- Почему: новая картинка
- Что: Koschei's treasurer, a skeletal miser with a coin chest, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## boss/koschei.png — 448×448

- Почему: новая картинка
- Что: Koschei the Deathless: a skeletal sorcerer king, tall and thin, black armour and crown, burning cold eyes, dark cape
- Дополнительно: Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.

## terrain/koschei.png — 256×256

- Почему: новая картинка
- Что: calm cold dark slate-grey stone
- Дополнительно: SEAMLESS TILEABLE ground texture, flat overhead orthographic view, all opposite edges must join invisibly. ALMOST UNIFORM single colour with only a very soft, low-contrast fine texture; NO objects, NO roots, NO plants, NO stones, NO pattern that repeats visibly; no shadows, no border, no perspective, opaque background. Calm and quiet so characters stay readable.

## location/koschei.png — 512×384

- Почему: новая картинка
- Что: Kingdom of Koschei the Deathless; Koschei the Deathless
- Дополнительно: A small floating island diorama seen from a 3/4 angle, the location in miniature with its master standing on it, transparent background around the island, no text.

## decor/koschei_1.png — 128×128

- Почему: новая картинка
- Что: small skull, location "Kingdom of Koschei the Deathless"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/koschei_2.png — 128×128

- Почему: новая картинка
- Что: scattered bones, location "Kingdom of Koschei the Deathless"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## decor/koschei_3.png — 128×128

- Почему: новая картинка
- Что: cracked stone, location "Kingdom of Koschei the Deathless"
- Дополнительно: One small ground decoration seen from a top-down 3/4 game camera, centered, small and simple, transparent background, no ground tile, no shadow plate, no text.

## border/koschei_1.png — 256×256

- Почему: новая картинка
- Что: black spiked rock spire, location "Kingdom of Koschei the Deathless"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## border/koschei_2.png — 256×256

- Почему: новая картинка
- Что: dead black tree, location "Kingdom of Koschei the Deathless"
- Дополнительно: One tall map border object seen from a top-down 3/4 game camera, base near the bottom of the frame with a small margin, fills most of the frame, transparent background, no ground tile or backdrop, no text. Used many times side by side as the wall around the arena.

## mob/egg.png — 192×192

- Почему: новая картинка
- Что: Koschei's egg: a white egg with a dark crack glowing, a needle visible inside, magical runes
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## weapon/pistol.png — 128×128

- Почему: новая картинка
- Что: old Russian hand cannon (ruchnitsa), short iron barrel on a wooden stock
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/smg.png — 128×128

- Почему: новая картинка
- Что: rapid-fire multi-barrel matchlock arquebus (pishchal)
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/shotgun.png — 128×128

- Почему: новая картинка
- Что: wide-mouthed scatter arquebus loaded with shot
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/crossbow.png — 128×128

- Почему: новая картинка
- Что: old Russian crossbow (samostrel)
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/sword.png — 128×128

- Почему: новая картинка
- Что: Kladenets, the magic sword of Russian tales, glowing blade
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/lightning.png — 128×128

- Почему: новая картинка
- Что: staff of Perun crackling with lightning
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/fireWand.png — 128×128

- Почему: новая картинка
- Что: feather of the Firebird, glowing golden-red
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/frostStaff.png — 128×128

- Почему: новая картинка
- Что: staff of Morozko, Father Frost, icy blue with frost crystals
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/drone.png — 128×128

- Почему: новая картинка
- Что: copper mechanical falcon automaton
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## weapon/turret.png — 128×128

- Почему: новая картинка
- Что: small wooden watchtower with a crossbow on top
- Дополнительно: One weapon alone, flat side view, lying horizontally with the business end pointing RIGHT and the handle on the left, centered, fills the width of the frame, no hand holding it, transparent background, no frame, no text.

## gear/hat_hunter.png — 128×128

- Почему: новая картинка
- Что: helmet, hunter set: leather, fur trim, green and brown
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/glasses_hunter.png — 128×128

- Почему: новая картинка
- Что: amulet charm on a cord, hunter set: leather, fur trim, green and brown
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/shirt_hunter.png — 128×128

- Почему: новая картинка
- Что: chainmail shirt, hunter set: leather, fur trim, green and brown
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/backpack_hunter.png — 128×128

- Почему: новая картинка
- Что: travel bag (kotomka), hunter set: leather, fur trim, green and brown
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/boots_hunter.png — 128×128

- Почему: новая картинка
- Что: pair of boots, hunter set: leather, fur trim, green and brown
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/hat_guard.png — 128×128

- Почему: новая картинка
- Что: helmet, druzhina guard set: steel and red cloth, sturdy
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/glasses_guard.png — 128×128

- Почему: новая картинка
- Что: amulet charm on a cord, druzhina guard set: steel and red cloth, sturdy
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/shirt_guard.png — 128×128

- Почему: новая картинка
- Что: chainmail shirt, druzhina guard set: steel and red cloth, sturdy
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/backpack_guard.png — 128×128

- Почему: новая картинка
- Что: travel bag (kotomka), druzhina guard set: steel and red cloth, sturdy
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/boots_guard.png — 128×128

- Почему: новая картинка
- Что: pair of boots, druzhina guard set: steel and red cloth, sturdy
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/hat_alchemist.png — 128×128

- Почему: новая картинка
- Что: helmet, volkhv sorcerer set: dark blue cloth, runes, silver
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/glasses_alchemist.png — 128×128

- Почему: новая картинка
- Что: amulet charm on a cord, volkhv sorcerer set: dark blue cloth, runes, silver
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/shirt_alchemist.png — 128×128

- Почему: новая картинка
- Что: chainmail shirt, volkhv sorcerer set: dark blue cloth, runes, silver
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/backpack_alchemist.png — 128×128

- Почему: новая картинка
- Что: travel bag (kotomka), volkhv sorcerer set: dark blue cloth, runes, silver
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/boots_alchemist.png — 128×128

- Почему: новая картинка
- Что: pair of boots, volkhv sorcerer set: dark blue cloth, runes, silver
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/hat_mechanic.png — 128×128

- Почему: новая картинка
- Что: helmet, blacksmith set: soot-darkened iron, brass rivets
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/glasses_mechanic.png — 128×128

- Почему: новая картинка
- Что: amulet charm on a cord, blacksmith set: soot-darkened iron, brass rivets
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/shirt_mechanic.png — 128×128

- Почему: новая картинка
- Что: chainmail shirt, blacksmith set: soot-darkened iron, brass rivets
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/backpack_mechanic.png — 128×128

- Почему: новая картинка
- Что: travel bag (kotomka), blacksmith set: soot-darkened iron, brass rivets
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/boots_mechanic.png — 128×128

- Почему: новая картинка
- Что: pair of boots, blacksmith set: soot-darkened iron, brass rivets
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/hat_trader.png — 128×128

- Почему: новая картинка
- Что: helmet, merchant set: rich embroidered cloth, gold buttons, fur
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/glasses_trader.png — 128×128

- Почему: новая картинка
- Что: amulet charm on a cord, merchant set: rich embroidered cloth, gold buttons, fur
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/shirt_trader.png — 128×128

- Почему: новая картинка
- Что: chainmail shirt, merchant set: rich embroidered cloth, gold buttons, fur
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/backpack_trader.png — 128×128

- Почему: новая картинка
- Что: travel bag (kotomka), merchant set: rich embroidered cloth, gold buttons, fur
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## gear/boots_trader.png — 128×128

- Почему: новая картинка
- Что: pair of boots, merchant set: rich embroidered cloth, gold buttons, fur
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ability/roll.png — 128×128

- Почему: новая картинка
- Что: dust swirl of a quick roll with motion lines
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ability/rapidFire.png — 128×128

- Почему: новая картинка
- Что: glowing arrows flying in a fast volley
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ability/heal.png — 128×128

- Почему: новая картинка
- Что: linen bandage and a sprig of plantain
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ability/frostNova.png — 128×128

- Почему: новая картинка
- Что: burst of ice crystals
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ability/shockwave.png — 128×128

- Почему: новая картинка
- Что: ring of shockwave cracking the ground
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/lightBoots.png — 128×128

- Почему: новая картинка
- Что: magic seven-league boots with small wings
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/ironSkin.png — 128×128

- Почему: новая картинка
- Что: bear skin cloak
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/rawMeat.png — 128×128

- Почему: новая картинка
- Что: round Russian karavai bread loaf
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/whetstone.png — 128×128

- Почему: новая картинка
- Что: whetstone
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/gunpowder.png — 128×128

- Почему: новая картинка
- Что: leather pouch of gunpowder
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/runeScroll.png — 128×128

- Почему: новая картинка
- Что: birch bark letter with runes
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/gear.png — 128×128

- Почему: новая картинка
- Что: blacksmith hammer
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/magnet.png — 128×128

- Почему: новая картинка
- Что: magnetic lodestone
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/fang.png — 128×128

- Почему: новая картинка
- Что: wolf fang on a cord
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/monocle.png — 128×128

- Почему: новая картинка
- Что: falcon eye charm
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/hourglass.png — 128×128

- Почему: новая картинка
- Что: hourglass
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/piggyBank.png — 128×128

- Почему: новая картинка
- Что: leather coin purse
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/bandage.png — 128×128

- Почему: новая картинка
- Что: plantain leaves
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/textbook.png — 128×128

- Почему: новая картинка
- Что: old book of wisdom
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/cloverCoin.png — 128×128

- Почему: новая картинка
- Что: lucky old coin
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/meditation.png — 128×128

- Почему: новая картинка
- Что: bundle of sleepy dream herbs
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/magpie.png — 128×128

- Почему: новая картинка
- Что: magpie bird holding a coin
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## item/berserkerMask.png — 128×128

- Почему: новая картинка
- Что: bogatyr's fury: a glowing red war helmet
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## pickup/coin.png — 128×128

- Почему: новая картинка
- Что: old Russian silver coin (denga)
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## pickup/medkit.png — 128×128

- Почему: новая картинка
- Что: small flask of living water, glowing blue
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## object/supply_chest.png — 256×256

- Почему: новая картинка
- Что: wooden supply chest with iron bands, closed
- Дополнительно: One isolated map object, top-down 3/4 view, centered horizontally, base near bottom with small margin, transparent background, no terrain tile or backdrop.

## object/chest_small.png — 256×256

- Почему: новая картинка
- Что: small wooden chest, closed
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## object/chest_medium.png — 256×256

- Почему: новая картинка
- Что: medium chest with silver bands, closed
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## object/chest_big.png — 256×256

- Почему: новая картинка
- Что: big ornate golden chest overflowing glow, closed
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ui/gold.png — 128×128

- Почему: новая картинка
- Что: pile of gold coins
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ui/gems.png — 128×128

- Почему: новая картинка
- Что: blue gem crystal
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ui/water.png — 128×128

- Почему: новая картинка
- Что: flask of living water
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## ui/blueprint.png — 128×128

- Почему: новая картинка
- Что: rolled birch bark blueprint
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## hero/ivan_2.png — 256×256

- Почему: новая картинка
- Что: Ivan the peasant son, young bogatyr in a simple linen shirt with red embroidery, bast shoes, cheerful and brave
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/ivan.png

## hero/ivan_3.png — 256×256

- Почему: новая картинка
- Что: Ivan the peasant son, young bogatyr in a simple linen shirt with red embroidery, bast shoes, cheerful and brave
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/ivan.png

## hero/alyosha_2.png — 256×256

- Почему: новая картинка
- Что: Alyosha Popovich, young slim cunning bogatyr, light chainmail, pointed helmet, a sly grin
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/alyosha.png

## hero/alyosha_3.png — 256×256

- Почему: новая картинка
- Что: Alyosha Popovich, young slim cunning bogatyr, light chainmail, pointed helmet, a sly grin
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/alyosha.png

## hero/dobrynya_2.png — 256×256

- Почему: новая картинка
- Что: Dobrynya Nikitich, strong dragon-slayer bogatyr, scale armour, red cloak, brown beard
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/dobrynya.png

## hero/dobrynya_3.png — 256×256

- Почему: новая картинка
- Что: Dobrynya Nikitich, strong dragon-slayer bogatyr, scale armour, red cloak, brown beard
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/dobrynya.png

## hero/buslaev_2.png — 256×256

- Почему: новая картинка
- Что: Vasily Buslaev, rowdy Novgorod hero, red kaftan open at the chest, wide belt, broad grin
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/buslaev.png

## hero/buslaev_3.png — 256×256

- Почему: новая картинка
- Что: Vasily Buslaev, rowdy Novgorod hero, red kaftan open at the chest, wide belt, broad grin
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/buslaev.png

## hero/mikula_2.png — 256×256

- Почему: новая картинка
- Что: Mikula Selyaninovich, mighty ploughman bogatyr, peasant clothes, enormous build, straw hat, calm smile
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/mikula.png

## hero/mikula_3.png — 256×256

- Почему: новая картинка
- Что: Mikula Selyaninovich, mighty ploughman bogatyr, peasant clothes, enormous build, straw hat, calm smile
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/mikula.png

## hero/volga_2.png — 256×256

- Почему: новая картинка
- Что: Volga Svyatoslavich, shapeshifter prince-bogatyr, falcon feathers on his cloak and helmet
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/volga.png

## hero/volga_3.png — 256×256

- Почему: новая картинка
- Что: Volga Svyatoslavich, shapeshifter prince-bogatyr, falcon feathers on his cloak and helmet
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/volga.png

## hero/marya_2.png — 256×256

- Почему: новая картинка
- Что: Marya Morevna, warrior princess, ornate kokoshnik helmet, silver mail, long braid, proud look
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/marya.png

## hero/marya_3.png — 256×256

- Почему: новая картинка
- Что: Marya Morevna, warrior princess, ornate kokoshnik helmet, silver mail, long braid, proud look
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/marya.png

## hero/ilya_2.png — 256×256

- Почему: новая картинка
- Что: Ilya Muromets, the eldest and greatest bogatyr, grey beard, heavy chainmail, pointed helmet, calm and mighty
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/ilya.png

## hero/ilya_3.png — 256×256

- Почему: новая картинка
- Что: Ilya Muromets, the eldest and greatest bogatyr, grey beard, heavy chainmail, pointed helmet, calm and mighty
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single hero, full body, top-down 3/4 game camera, facing RIGHT, centered, entire silhouette visible, transparent background, no ground or shadow plate. EMPTY HANDS: holding nothing, no weapon, no shield, no tool in the hands or on the back; the game draws weapons separately over the hero.
- Черновик / разметка: public/sprites/hero/ilya.png

## mob/forest_chaser_2.png — 256×256

- Почему: новая картинка
- Что: grey forest wolf, snarling, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_chaser.png

## mob/forest_chaser_3.png — 256×256

- Почему: новая картинка
- Что: grey forest wolf, snarling, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_chaser.png

## mob/forest_roller_2.png — 320×320

- Почему: новая картинка
- Что: big wild boar with tusks, lowering its head to charge, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_roller.png

## mob/forest_roller_3.png — 320×320

- Почему: новая картинка
- Что: big wild boar with tusks, lowering its head to charge, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_roller.png

## mob/forest_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: angry forest hedgehog with its quills raised, shooting a fan of needles, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_shotgun.png

## mob/forest_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: angry forest hedgehog with its quills raised, shooting a fan of needles, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_shotgun.png

## mob/forest_beam_2.png — 256×256

- Почему: новая картинка
- Что: glowing rotten-wood firefly spirit with a single bright eye, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_beam.png

## mob/forest_beam_3.png — 256×256

- Почему: новая картинка
- Что: glowing rotten-wood firefly spirit with a single bright eye, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_beam.png

## mob/forest_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: twisted root creature with two glowing knots, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_twinBeam.png

## mob/forest_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: twisted root creature with two glowing knots, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_twinBeam.png

## mob/forest_splitter_2.png — 320×320

- Почему: новая картинка
- Что: big rotten tree stump monster, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_splitter.png

## mob/forest_splitter_3.png — 320×320

- Почему: новая картинка
- Что: big rotten tree stump monster, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_splitter.png

## mob/forest_small_2.png — 192×192

- Почему: новая картинка
- Что: little angry honey mushroom, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_small.png

## mob/forest_small_3.png — 192×192

- Почему: новая картинка
- Что: little angry honey mushroom, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_small.png

## mob/forest_rocket_2.png — 256×256

- Почему: новая картинка
- Что: grey owl messenger diving, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_rocket.png

## mob/forest_rocket_3.png — 256×256

- Почему: новая картинка
- Что: grey owl messenger diving, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_rocket.png

## mob/forest_poison_2.png — 256×256

- Почему: новая картинка
- Что: fly agaric mushroom man, red cap with white spots, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_poison.png

## mob/forest_poison_3.png — 256×256

- Почему: новая картинка
- Что: fly agaric mushroom man, red cap with white spots, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_poison.png

## mob/forest_coin_2.png — 256×256

- Почему: новая картинка
- Что: thief squirrel carrying a bag of coins, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_coin.png

## mob/forest_coin_3.png — 256×256

- Почему: новая картинка
- Что: thief squirrel carrying a bag of coins, minion of the location "Dark enchanted Russian forest"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/forest_coin.png

## boss/forest_2.png — 448×448

- Почему: новая картинка
- Что: Leshy, the forest master: a tall wild man of bark and moss with antler-like branches, glowing green eyes, leaf beard
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/forest.png

## boss/forest_3.png — 448×448

- Почему: новая картинка
- Что: Leshy, the forest master: a tall wild man of bark and moss with antler-like branches, glowing green eyes, leaf beard
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/forest.png

## mob/swamp_chaser_2.png — 256×256

- Почему: новая картинка
- Что: bog man made of mud and reeds, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_chaser.png

## mob/swamp_chaser_3.png — 256×256

- Почему: новая картинка
- Что: bog man made of mud and reeds, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_chaser.png

## mob/swamp_roller_2.png — 320×320

- Почему: новая картинка
- Что: crawling moss hummock creature, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_roller.png

## mob/swamp_roller_3.png — 320×320

- Почему: новая картинка
- Что: crawling moss hummock creature, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_roller.png

## mob/swamp_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: fat spitting frog, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_shotgun.png

## mob/swamp_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: fat spitting frog, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_shotgun.png

## mob/swamp_beam_2.png — 256×256

- Почему: новая картинка
- Что: will-o'-the-wisp blue swamp light, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_beam.png

## mob/swamp_beam_3.png — 256×256

- Почему: новая картинка
- Что: will-o'-the-wisp blue swamp light, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_beam.png

## mob/swamp_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: twin wisps joined by a thread of light, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_twinBeam.png

## mob/swamp_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: twin wisps joined by a thread of light, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_twinBeam.png

## mob/swamp_splitter_2.png — 320×320

- Почему: новая картинка
- Что: big slimy duckweed monster, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_splitter.png

## mob/swamp_splitter_3.png — 320×320

- Почему: новая картинка
- Что: big slimy duckweed monster, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_splitter.png

## mob/swamp_small_2.png — 192×192

- Почему: новая картинка
- Что: leech, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_small.png

## mob/swamp_small_3.png — 192×192

- Почему: новая картинка
- Что: leech, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_small.png

## mob/swamp_rocket_2.png — 256×256

- Почему: новая картинка
- Что: huge blood-sucking mosquito, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_rocket.png

## mob/swamp_rocket_3.png — 256×256

- Почему: новая картинка
- Что: huge blood-sucking mosquito, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_rocket.png

## mob/swamp_poison_2.png — 256×256

- Почему: новая картинка
- Что: warty poison toad, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_poison.png

## mob/swamp_poison_3.png — 256×256

- Почему: новая картинка
- Что: warty poison toad, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_poison.png

## mob/swamp_coin_2.png — 256×256

- Почему: новая картинка
- Что: greedy bittern bird with a coin in its beak, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_coin.png

## mob/swamp_coin_3.png — 256×256

- Почему: новая картинка
- Что: greedy bittern bird with a coin in its beak, minion of the location "Deadly bog"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/swamp_coin.png

## boss/swamp_2.png — 448×448

- Почему: новая картинка
- Что: Kikimora of the bog: a gaunt swamp witch with tangled hair of weeds, long fingers, a spindle, frogs around her feet
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/swamp.png

## boss/swamp_3.png — 448×448

- Почему: новая картинка
- Что: Kikimora of the bog: a gaunt swamp witch with tangled hair of weeds, long fingers, a spindle, frogs around her feet
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/swamp.png

## mob/pool_chaser_2.png — 256×256

- Почему: новая картинка
- Что: drowned man, pale and dripping, weeds in his hair, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_chaser.png

## mob/pool_chaser_3.png — 256×256

- Почему: новая картинка
- Что: drowned man, pale and dripping, weeds in his hair, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_chaser.png

## mob/pool_roller_2.png — 320×320

- Почему: новая картинка
- Что: giant whiskered catfish flopping forward, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_roller.png

## mob/pool_roller_3.png — 320×320

- Почему: новая картинка
- Что: giant whiskered catfish flopping forward, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_roller.png

## mob/pool_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: water maiden throwing splashes, long wet hair, modest dress, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_shotgun.png

## mob/pool_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: water maiden throwing splashes, long wet hair, modest dress, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_shotgun.png

## mob/pool_beam_2.png — 256×256

- Почему: новая картинка
- Что: pool spirit, a column of dark water with glowing eyes, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_beam.png

## mob/pool_beam_3.png — 256×256

- Почему: новая картинка
- Что: pool spirit, a column of dark water with glowing eyes, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_beam.png

## mob/pool_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: whirlpool spirit spinning, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_twinBeam.png

## mob/pool_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: whirlpool spirit spinning, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_twinBeam.png

## mob/pool_splitter_2.png — 320×320

- Почему: новая картинка
- Что: big river shell creature, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_splitter.png

## mob/pool_splitter_3.png — 320×320

- Почему: новая картинка
- Что: big river shell creature, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_splitter.png

## mob/pool_small_2.png — 192×192

- Почему: новая картинка
- Что: little crayfish, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_small.png

## mob/pool_small_3.png — 192×192

- Почему: новая картинка
- Что: little crayfish, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_small.png

## mob/pool_rocket_2.png — 256×256

- Почему: новая картинка
- Что: toothy pike leaping, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_rocket.png

## mob/pool_rocket_3.png — 256×256

- Почему: новая картинка
- Что: toothy pike leaping, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_rocket.png

## mob/pool_poison_2.png — 256×256

- Почему: новая картинка
- Что: blob of green slime, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_poison.png

## mob/pool_poison_3.png — 256×256

- Почему: новая картинка
- Что: blob of green slime, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_poison.png

## mob/pool_coin_2.png — 256×256

- Почему: новая картинка
- Что: burbot fish carrying a treasure pouch, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_coin.png

## mob/pool_coin_3.png — 256×256

- Почему: новая картинка
- Что: burbot fish carrying a treasure pouch, minion of the location "Dark whirlpool by an old mill"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/pool_coin.png

## boss/pool_2.png — 448×448

- Почему: новая картинка
- Что: Vodyanoy, the water grandfather: a fat old green-skinned water spirit with a long wet beard of weeds, fish tail feet, mill-wheel crown
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/pool.png

## boss/pool_3.png — 448×448

- Почему: новая картинка
- Что: Vodyanoy, the water grandfather: a fat old green-skinned water spirit with a long wet beard of weeds, fish tail feet, mill-wheel crown
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/pool.png

## mob/road_chaser_2.png — 256×256

- Почему: новая картинка
- Что: robber with a flail in a red shirt, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_chaser.png

## mob/road_chaser_3.png — 256×256

- Почему: новая картинка
- Что: robber with a flail in a red shirt, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_chaser.png

## mob/road_roller_2.png — 320×320

- Почему: новая картинка
- Что: big lad rolling a barrel, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_roller.png

## mob/road_roller_3.png — 320×320

- Почему: новая картинка
- Что: big lad rolling a barrel, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_roller.png

## mob/road_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: robber with an old matchlock gun, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_shotgun.png

## mob/road_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: robber with an old matchlock gun, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_shotgun.png

## mob/road_beam_2.png — 256×256

- Почему: новая картинка
- Что: robber archer drawing a bow, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_beam.png

## mob/road_beam_3.png — 256×256

- Почему: новая картинка
- Что: robber archer drawing a bow, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_beam.png

## mob/road_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: robber whistler with two fingers in his mouth, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_twinBeam.png

## mob/road_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: robber whistler with two fingers in his mouth, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_twinBeam.png

## mob/road_splitter_2.png — 320×320

- Почему: новая картинка
- Что: fat robber ataman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_splitter.png

## mob/road_splitter_3.png — 320×320

- Почему: новая картинка
- Что: fat robber ataman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_splitter.png

## mob/road_small_2.png — 192×192

- Почему: новая картинка
- Что: scrawny robber henchman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_small.png

## mob/road_small_3.png — 192×192

- Почему: новая картинка
- Что: scrawny robber henchman, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_small.png

## mob/road_rocket_2.png — 256×256

- Почему: новая картинка
- Что: hunting falcon diving, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_rocket.png

## mob/road_rocket_3.png — 256×256

- Почему: новая картинка
- Что: hunting falcon diving, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_rocket.png

## mob/road_poison_2.png — 256×256

- Почему: новая картинка
- Что: tavern keeper with a jug of poison, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_poison.png

## mob/road_poison_3.png — 256×256

- Почему: новая картинка
- Что: tavern keeper with a jug of poison, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_poison.png

## mob/road_coin_2.png — 256×256

- Почему: новая картинка
- Что: pickpocket in a cap running with a purse, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_coin.png

## mob/road_coin_3.png — 256×256

- Почему: новая картинка
- Что: pickpocket in a cap running with a purse, minion of the location "Robbers' high road among old oaks"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/road_coin.png

## boss/road_2.png — 448×448

- Почему: новая картинка
- Что: Nightingale the Robber: a wild robber perched among nine oak branches, a huge lungful for his deadly whistle, feathers and rags
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/road.png

## boss/road_3.png — 448×448

- Почему: новая картинка
- Что: Nightingale the Robber: a wild robber perched among nine oak branches, a huge lungful for his deadly whistle, feathers and rags
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/road.png

## mob/cave_chaser_2.png — 256×256

- Почему: новая картинка
- Что: cave bat, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_chaser.png

## mob/cave_chaser_3.png — 256×256

- Почему: новая картинка
- Что: cave bat, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_chaser.png

## mob/cave_roller_2.png — 320×320

- Почему: новая картинка
- Что: rolling boulder creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_roller.png

## mob/cave_roller_3.png — 320×320

- Почему: новая картинка
- Что: rolling boulder creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_roller.png

## mob/cave_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: big flint beetle spitting sharp stone shards, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_shotgun.png

## mob/cave_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: big flint beetle spitting sharp stone shards, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_shotgun.png

## mob/cave_beam_2.png — 256×256

- Почему: новая картинка
- Что: many-eyed cave creature with one big glowing eye, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_beam.png

## mob/cave_beam_3.png — 256×256

- Почему: новая картинка
- Что: many-eyed cave creature with one big glowing eye, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_beam.png

## mob/cave_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: evil-eye spirit with two glowing eyes, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_twinBeam.png

## mob/cave_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: evil-eye spirit with two glowing eyes, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_twinBeam.png

## mob/cave_splitter_2.png — 320×320

- Почему: новая картинка
- Что: stone idol golem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_splitter.png

## mob/cave_splitter_3.png — 320×320

- Почему: новая картинка
- Что: stone idol golem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_splitter.png

## mob/cave_small_2.png — 192×192

- Почему: новая картинка
- Что: little pebble creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_small.png

## mob/cave_small_3.png — 192×192

- Почему: новая картинка
- Что: little pebble creature, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_small.png

## mob/cave_rocket_2.png — 256×256

- Почему: новая картинка
- Что: wandering fireball spirit, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_rocket.png

## mob/cave_rocket_3.png — 256×256

- Почему: новая картинка
- Что: wandering fireball spirit, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_rocket.png

## mob/cave_poison_2.png — 256×256

- Почему: новая картинка
- Что: rotting ghoul, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_poison.png

## mob/cave_poison_3.png — 256×256

- Почему: новая картинка
- Что: rotting ghoul, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_poison.png

## mob/cave_coin_2.png — 256×256

- Почему: новая картинка
- Что: copper snake carrying a gem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_coin.png

## mob/cave_coin_3.png — 256×256

- Почему: новая картинка
- Что: copper snake carrying a gem, minion of the location "Cave of One-Eyed Likho"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/cave_coin.png

## boss/cave_2.png — 448×448

- Почему: новая картинка
- Что: Likho One-Eyed: a towering gaunt cyclops crone with one huge eye in the middle of the forehead, rags, long grasping arms
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/cave.png

## boss/cave_3.png — 448×448

- Почему: новая картинка
- Что: Likho One-Eyed: a towering gaunt cyclops crone with one huge eye in the middle of the forehead, rags, long grasping arms
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/cave.png

## mob/hut_chaser_2.png — 256×256

- Почему: новая картинка
- Что: black cat with arched back, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_chaser.png

## mob/hut_chaser_3.png — 256×256

- Почему: новая картинка
- Что: black cat with arched back, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_chaser.png

## mob/hut_roller_2.png — 320×320

- Почему: новая картинка
- Что: giant chicken leg running, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_roller.png

## mob/hut_roller_3.png — 320×320

- Почему: новая картинка
- Что: giant chicken leg running, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_roller.png

## mob/hut_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: cawing crow, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_shotgun.png

## mob/hut_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: cawing crow, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_shotgun.png

## mob/hut_beam_2.png — 256×256

- Почему: новая картинка
- Что: skull lantern on a fence stake with glowing eye sockets, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_beam.png

## mob/hut_beam_3.png — 256×256

- Почему: новая картинка
- Что: skull lantern on a fence stake with glowing eye sockets, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_beam.png

## mob/hut_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: two skulls on one stake, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_twinBeam.png

## mob/hut_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: two skulls on one stake, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_twinBeam.png

## mob/hut_splitter_2.png — 320×320

- Почему: новая картинка
- Что: bubbling witch cauldron on legs, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_splitter.png

## mob/hut_splitter_3.png — 320×320

- Почему: новая картинка
- Что: bubbling witch cauldron on legs, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_splitter.png

## mob/hut_small_2.png — 192×192

- Почему: новая картинка
- Что: little green frog, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_small.png

## mob/hut_small_3.png — 192×192

- Почему: новая картинка
- Что: little green frog, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_small.png

## mob/hut_rocket_2.png — 256×256

- Почему: новая картинка
- Что: flying witch broom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_rocket.png

## mob/hut_rocket_3.png — 256×256

- Почему: новая картинка
- Что: flying witch broom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_rocket.png

## mob/hut_poison_2.png — 256×256

- Почему: новая картинка
- Что: purple witch mushroom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_poison.png

## mob/hut_poison_3.png — 256×256

- Почему: новая картинка
- Что: purple witch mushroom, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_poison.png

## mob/hut_coin_2.png — 256×256

- Почему: новая картинка
- Что: little treasure-keeper house spirit with a coin chest, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_coin.png

## mob/hut_coin_3.png — 256×256

- Почему: новая картинка
- Что: little treasure-keeper house spirit with a coin chest, minion of the location "Baba Yaga's hut on chicken legs"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/hut_coin.png

## boss/hut_2.png — 448×448

- Почему: новая картинка
- Что: Baba Yaga: a bony old witch with a hooked nose, flying in a wooden mortar with a pestle and broom, iron teeth, a skull lantern
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/hut.png

## boss/hut_3.png — 448×448

- Почему: новая картинка
- Что: Baba Yaga: a bony old witch with a hooked nose, flying in a wooden mortar with a pestle and broom, iron teeth, a skull lantern
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/hut.png

## mob/bridge_chaser_2.png — 256×256

- Почему: новая картинка
- Что: fire lizard, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_chaser.png

## mob/bridge_chaser_3.png — 256×256

- Почему: новая картинка
- Что: fire lizard, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_chaser.png

## mob/bridge_roller_2.png — 320×320

- Почему: новая картинка
- Что: young dragon curled into a rolling ball, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_roller.png

## mob/bridge_roller_3.png — 320×320

- Почему: новая картинка
- Что: young dragon curled into a rolling ball, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_roller.png

## mob/bridge_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: fire-spitting salamander, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_shotgun.png

## mob/bridge_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: fire-spitting salamander, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_shotgun.png

## mob/bridge_beam_2.png — 256×256

- Почему: новая картинка
- Что: fire serpent with a glowing mouth, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_beam.png

## mob/bridge_beam_3.png — 256×256

- Почему: новая картинка
- Что: fire serpent with a glowing mouth, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_beam.png

## mob/bridge_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: young two-headed dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_twinBeam.png

## mob/bridge_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: young two-headed dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_twinBeam.png

## mob/bridge_splitter_2.png — 320×320

- Почему: новая картинка
- Что: big dragon egg with cracks, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_splitter.png

## mob/bridge_splitter_3.png — 320×320

- Почему: новая картинка
- Что: big dragon egg with cracks, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_splitter.png

## mob/bridge_small_2.png — 192×192

- Почему: новая картинка
- Что: tiny baby dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_small.png

## mob/bridge_small_3.png — 192×192

- Почему: новая картинка
- Что: tiny baby dragon, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_small.png

## mob/bridge_rocket_2.png — 256×256

- Почему: новая картинка
- Что: living fire spark, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_rocket.png

## mob/bridge_rocket_3.png — 256×256

- Почему: новая картинка
- Что: living fire spark, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_rocket.png

## mob/bridge_poison_2.png — 256×256

- Почему: новая картинка
- Что: viper snake, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_poison.png

## mob/bridge_poison_3.png — 256×256

- Почему: новая картинка
- Что: viper snake, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_poison.png

## mob/bridge_coin_2.png — 256×256

- Почему: новая картинка
- Что: golden serpent with treasure, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_coin.png

## mob/bridge_coin_3.png — 256×256

- Почему: новая картинка
- Что: golden serpent with treasure, minion of the location "Kalinov bridge over the fiery river Smorodina"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/bridge_coin.png

## boss/bridge_2.png — 448×448

- Почему: новая картинка
- Что: Zmey Gorynych: a green three-headed dragon with bat wings, each head breathing fire, spiked tail
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/bridge.png

## boss/bridge_3.png — 448×448

- Почему: новая картинка
- Что: Zmey Gorynych: a green three-headed dragon with bat wings, each head breathing fire, spiked tail
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/bridge.png

## mob/koschei_chaser_2.png — 256×256

- Почему: новая картинка
- Что: skeleton warrior with a rusty sword, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_chaser.png

## mob/koschei_chaser_3.png — 256×256

- Почему: новая картинка
- Что: skeleton warrior with a rusty sword, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_chaser.png

## mob/koschei_roller_2.png — 320×320

- Почему: новая картинка
- Что: skeleton horse, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_roller.png

## mob/koschei_roller_3.png — 320×320

- Почему: новая картинка
- Что: skeleton horse, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_roller.png

## mob/koschei_shotgun_2.png — 256×256

- Почему: новая картинка
- Что: skeleton throwing bones, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_shotgun.png

## mob/koschei_shotgun_3.png — 256×256

- Почему: новая картинка
- Что: skeleton throwing bones, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_shotgun.png

## mob/koschei_beam_2.png — 256×256

- Почему: новая картинка
- Что: undead sorcerer with a staff, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_beam.png

## mob/koschei_beam_3.png — 256×256

- Почему: новая картинка
- Что: undead sorcerer with a staff, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_beam.png

## mob/koschei_twinBeam_2.png — 256×256

- Почему: новая картинка
- Что: black-robed dark sorcerer with two glowing hands, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_twinBeam.png

## mob/koschei_twinBeam_3.png — 256×256

- Почему: новая картинка
- Что: black-robed dark sorcerer with two glowing hands, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_twinBeam.png

## mob/koschei_splitter_2.png — 320×320

- Почему: новая картинка
- Что: heap of bones creature, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_splitter.png

## mob/koschei_splitter_3.png — 320×320

- Почему: новая картинка
- Что: heap of bones creature, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single large creature, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_splitter.png

## mob/koschei_small_2.png — 192×192

- Почему: новая картинка
- Что: little crawling pile of bones with a tiny skull, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_small.png

## mob/koschei_small_3.png — 192×192

- Почему: новая картинка
- Что: little crawling pile of bones with a tiny skull, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_small.png

## mob/koschei_rocket_2.png — 256×256

- Почему: новая картинка
- Что: Koschei's black raven, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_rocket.png

## mob/koschei_rocket_3.png — 256×256

- Почему: новая картинка
- Что: Koschei's black raven, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_rocket.png

## mob/koschei_poison_2.png — 256×256

- Почему: новая картинка
- Что: pale vampire ghoul (upyr), minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_poison.png

## mob/koschei_poison_3.png — 256×256

- Почему: новая картинка
- Что: pale vampire ghoul (upyr), minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_poison.png

## mob/koschei_coin_2.png — 256×256

- Почему: новая картинка
- Что: Koschei's treasurer, a skeletal miser with a coin chest, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_coin.png

## mob/koschei_coin_3.png — 256×256

- Почему: новая картинка
- Что: Koschei's treasurer, a skeletal miser with a coin chest, minion of the location "Kingdom of Koschei the Deathless"
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Single character, full body, seen from a top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/mob/koschei_coin.png

## boss/koschei_2.png — 448×448

- Почему: новая картинка
- Что: Koschei the Deathless: a skeletal sorcerer king, tall and thin, black armour and crown, burning cold eyes, dark cape
- Дополнительно: WALK FRAME 2 of 3: the same character mid-stride, LEFT leg stepping forward and RIGHT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/koschei.png

## boss/koschei_3.png — 448×448

- Почему: новая картинка
- Что: Koschei the Deathless: a skeletal sorcerer king, tall and thin, black armour and crown, burning cold eyes, dark cape
- Дополнительно: WALK FRAME 3 of 3: the same character mid-stride, RIGHT leg stepping forward and LEFT leg back, arms swinging opposite to the legs, body slightly lower. Use the frame 1 picture as the exact reference: identical character, colours, outline, size, facing and framing; only the limbs (legs, arms, wings, tail) move. Creatures without legs sway, flap or squash instead. Location boss, one large imposing figure, full body, top-down 3/4 game camera, facing LEFT, centered, entire silhouette visible, transparent background, no ground or shadow plate.
- Черновик / разметка: public/sprites/boss/koschei.png
