# Что сгенерировать сейчас

Файл создан скриптом `node art/art_todo.mjs` (03.11.2026, 20:50:46). Генерируй **только** картинки из этого списка — остальные уже готовы.

Стиль: hand-painted cartoon game art in the style of old Russian folk fairy-tale book illustrations, bold dark outlines, chunky readable silhouettes, warm earthy palette with saturated folk-ornament accents (red, gold, deep green, blue), soft cel shading, slightly cute proportions
Референс: References/style.png (сделать первым: богатырь Иван — hero/ivan.png — и утвердить стиль)
Правила: One asset per image. No text, watermark, frame or collage. Transparent except terrain. Smooth (Lanczos) resize to final size.

Готовую картинку сохраняй в `public/sprites/<файл>` точно указанного размера:
`python art/save_generated_asset.py <исходник> <файл> <ширина> <высота>` (для переделки добавь `--replace`).
Потом сожми тяжёлые картинки: `python art/compress_sprites.py` (оригиналы останутся в art/originals).
После этого снова запусти `node art/art_todo.mjs` — сделанное пропадёт из списка.

Осталось: **4**

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
