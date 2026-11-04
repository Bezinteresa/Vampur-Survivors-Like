# Что сгенерировать сейчас

Файл создан скриптом `node art/art_todo.mjs` (04.11.2026, 12:13:46). Генерируй **только** картинки из этого списка — остальные уже готовы.

Стиль: hand-painted cartoon game art in the style of old Russian folk fairy-tale book illustrations, bold dark outlines, chunky readable silhouettes, warm earthy palette with saturated folk-ornament accents (red, gold, deep green, blue), soft cel shading, slightly cute proportions
Референс: References/style.png (сделать первым: богатырь Иван — hero/ivan.png — и утвердить стиль)
Правила: One asset per image. No text, watermark, frame or collage. Transparent except terrain. Smooth (Lanczos) resize to final size.

Готовую картинку сохраняй в `public/sprites/<файл>` точно указанного размера:
`python art/save_generated_asset.py <исходник> <файл> <ширина> <высота>` (для переделки добавь `--replace`).
Потом сожми тяжёлые картинки: `python art/compress_sprites.py` (оригиналы останутся в art/originals).
После этого снова запусти `node art/art_todo.mjs` — сделанное пропадёт из списка.

**Всё готово — генерировать нечего.**