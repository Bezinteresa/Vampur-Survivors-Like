// Builds art/ART_TODO.md: only the pictures that still have to be generated.
// Source of truth: generation-prompts.json + generation-extra-prompts.json (every asset with file, w, h, subject).
// An asset is in the to-do list when its file is missing in public/sprites, has a different size,
// or has "redo": "<reason>" in its spec. Run: node art/art_todo.mjs
// Assets with "path" (repo-relative, e.g. store covers in art/covers/raw) are not game sprites: they are kept
// outside the build, saved as generated, and with "minSize" w/h are the smallest size accepted.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const sprites = path.join(root, 'public/sprites')
const specFiles = ['generation-prompts.json', 'generation-extra-prompts.json'].filter(f => fs.existsSync(path.join(here, f)))

const header = JSON.parse(fs.readFileSync(path.join(here, specFiles[0]), 'utf8'))
const assets = specFiles.flatMap(f => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8')).assets)

/** Width and height from a PNG header (no image library needed). */
function pngSize(file) {
  const b = fs.readFileSync(file)
  if (b.toString('ascii', 1, 4) !== 'PNG') return null
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
}

const todo = []
for (const a of assets) {
  const file = a.path ? path.join(root, a.path) : path.join(sprites, a.file)
  let reason = ''
  if (!fs.existsSync(file)) reason = 'новая картинка'
  else if (a.redo) reason = `переделать: ${a.redo}`
  else {
    const size = pngSize(file)
    const wrong = a.minSize ? size && (size.w < a.w || size.h < a.h) : size && (size.w !== a.w || size.h !== a.h)
    if (wrong) reason = `другой размер: сейчас ${size.w}×${size.h}, нужно ${a.minSize ? 'не меньше ' : ''}${a.w}×${a.h}`
  }
  if (reason) todo.push({ ...a, reason })
}

const lines = [
  '# Что сгенерировать сейчас',
  '',
  `Файл создан скриптом \`node art/art_todo.mjs\` (${new Date().toLocaleString('ru-RU')}). Генерируй **только** картинки из этого списка — остальные уже готовы.`,
  '',
  `Стиль: ${header.style}`,
  `Референс: ${header.reference}`,
  `Правила: ${header.constraints}`,
  '',
  'Готовую картинку сохраняй в `public/sprites/<файл>` точно указанного размера:',
  '`python art/save_generated_asset.py <исходник> <файл> <ширина> <высота>` (для переделки добавь `--replace`).',
  'Потом сожми тяжёлые картинки: `python art/compress_sprites.py` (оригиналы останутся в art/originals).',
  'После этого снова запусти `node art/art_todo.mjs` — сделанное пропадёт из списка.',
  '',
]
if (!todo.length) lines.push('**Всё готово — генерировать нечего.**')
else {
  lines.push(`Осталось: **${todo.length}**`, '')
  for (const a of todo) {
    if (a.path) lines.push(`## ${a.path} — ${a.minSize ? 'не меньше ' : ''}${a.w}×${a.h}`, '', `- Почему: ${a.reason}`, `- Куда: сохрани исходник как есть в \`${a.path}\` (не через save_generated_asset.py, без уменьшения и обрезки; в игру не попадает)`, `- Что: ${a.subject}`)
    else lines.push(`## ${a.file} — ${a.w}×${a.h}`, '', `- Почему: ${a.reason}`, `- Что: ${a.subject}`)
    if (a.extra) lines.push(`- Дополнительно: ${a.extra}`)
    const draft = a.guide ?? (fs.existsSync(path.join(here, 'drafts', a.file)) ? `art/drafts/${a.file}` : '')
    if (draft) lines.push(`- Черновик / разметка: ${draft}`)
    lines.push('')
  }
}
fs.writeFileSync(path.join(here, 'ART_TODO.md'), lines.join('\n'), 'utf8')
console.log(todo.length ? `To do: ${todo.length}\n` + todo.map(a => `  ${a.file} — ${a.reason}`).join('\n') : 'Nothing to generate.')
