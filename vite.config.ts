import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import playgamaBridge from '@playgama/bridge/vite'

const spritesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'sprites')

function listSprites(dir: string, prefix = ''): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listSprites(path.join(dir, e.name), `${prefix}${e.name}/`) : /\.(png|webp)$/i.test(e.name) ? [`${prefix}${e.name}`] : [],
  )
}

// `virtual:sprite-list`: every picture in public/sprites, so the game knows which placeholders to replace.
// In dev a new or removed picture reloads the page.
function spriteList(): Plugin {
  const id = 'virtual:sprite-list'
  const resolved = '\0' + id
  return {
    name: 'sprite-list',
    resolveId: (source) => (source === id ? resolved : undefined),
    load: (moduleId) => (moduleId === resolved ? `export default ${JSON.stringify(listSprites(spritesDir))}` : undefined),
    configureServer(server) {
      server.watcher.add(spritesDir)
      const refresh = (file: string) => {
        if (!path.resolve(file).startsWith(spritesDir)) return
        const mod = server.moduleGraph.getModuleById(resolved)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  base: './',
  // Bridge runtime from the npm package next to index.html (no CDN: no CSP trouble on Yandex).
  // playgama-bridge-config.json lives in public/ and is copied into dist.
  plugins: [vue(), spriteList(), playgamaBridge({ mode: 'local' })],
  server: { port: 5190 },
  build: { chunkSizeWarningLimit: 1200 },
})
