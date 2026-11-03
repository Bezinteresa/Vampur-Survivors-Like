# Что сгенерировать сейчас

Файл создан скриптом `node art/art_todo.mjs` (03.11.2026, 19:06:38). Генерируй **только** картинки из этого списка — остальные уже готовы.

Стиль: hand-painted cartoon game art in the style of old Russian folk fairy-tale book illustrations, bold dark outlines, chunky readable silhouettes, warm earthy palette with saturated folk-ornament accents (red, gold, deep green, blue), soft cel shading, slightly cute proportions
Референс: References/style.png (сделать первым: богатырь Иван — hero/ivan.png — и утвердить стиль)
Правила: One asset per image. No text, watermark, frame or collage. Transparent except terrain. Smooth (Lanczos) resize to final size.

Готовую картинку сохраняй в `public/sprites/<файл>` точно указанного размера:
`python art/save_generated_asset.py <исходник> <файл> <ширина> <высота>` (для переделки добавь `--replace`).
Потом сожми тяжёлые картинки: `python art/compress_sprites.py` (оригиналы останутся в art/originals).
После этого снова запусти `node art/art_todo.mjs` — сделанное пропадёт из списка.

Осталось: **195**

## pickup/xp.png — 128×128

- Почему: новая картинка
- Что: small glowing GREEN crystal of experience, bright emerald with a light-green glow, reads as green even when tiny
- Дополнительно: One object as a game icon, centered, fills most of the frame, slight 3/4 angle, transparent background, no frame, no text.

## cover/square.png — 800×800

- Почему: новая картинка
- Что: the young bogatyr Ivan (peasant son in a cream linen shirt with red embroidery, bast shoes, bare hands) standing brave in the middle, a copper falcon drone and a glowing Firebird feather spinning around him as his weapons, a crowd of fairy-tale forest minions (grey wolves, a wild boar, a quill hedgehog, toadstool imps) charging at him, the forest spirit Leshy towering in the background among dark old trees, silver coins scattered on the ground, dynamic battle mood
- Дополнительно: Full-bleed key art for a game store page, opaque background filling the whole frame (not transparent), rich colours, strong contrast, the hero clearly readable even at small size. Square composition, hero centered, leave the top fifth calm and less detailed for the game title.
- Черновик / разметка: art/drafts/cover/square.png

## cover/portrait.png — 1080×1920

- Почему: новая картинка
- Что: the young bogatyr Ivan (peasant son in a cream linen shirt with red embroidery, bast shoes, bare hands) standing brave in the middle, a copper falcon drone and a glowing Firebird feather spinning around him as his weapons, a crowd of fairy-tale forest minions (grey wolves, a wild boar, a quill hedgehog, toadstool imps) charging at him, the forest spirit Leshy towering in the background among dark old trees, silver coins scattered on the ground, dynamic battle mood
- Дополнительно: Full-bleed key art for a game store page, opaque background filling the whole frame (not transparent), rich colours, strong contrast, the hero clearly readable even at small size. Tall portrait composition, hero in the lower middle, Leshy above, leave the top sixth calm and less detailed for the game title.
- Черновик / разметка: art/drafts/cover/portrait.png

## cover/landscape.png — 1920×1080

- Почему: новая картинка
- Что: the young bogatyr Ivan (peasant son in a cream linen shirt with red embroidery, bast shoes, bare hands) standing brave in the middle, a copper falcon drone and a glowing Firebird feather spinning around him as his weapons, a crowd of fairy-tale forest minions (grey wolves, a wild boar, a quill hedgehog, toadstool imps) charging at him, the forest spirit Leshy towering in the background among dark old trees, silver coins scattered on the ground, dynamic battle mood
- Дополнительно: Full-bleed key art for a game store page, opaque background filling the whole frame (not transparent), rich colours, strong contrast, the hero clearly readable even at small size. Wide landscape composition, hero left of center, minions coming from the right, leave the top fifth calm and less detailed for the game title.
- Черновик / разметка: art/drafts/cover/landscape.png

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
