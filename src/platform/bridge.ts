// Access to Playgama Bridge. The runtime (playgama-bridge.js) is put into index.html by the
// @playgama/bridge Vite plugin in local mode; the npm import is a thin proxy over window.bridge.
// Without the runtime (tests, an editor build without the plugin) every caller gets null.

import type { PlaygamaBridge } from '@playgama/bridge'

let instance: PlaygamaBridge | null = null

/** The initialized Bridge, or null when the game runs without it. */
export function bridge(): PlaygamaBridge | null { return instance }

/** Bridge platform id ('yandex', 'playgama', 'mock', ...), or 'none' without Bridge. */
export function platformId(): string { return instance?.platform.id ?? 'none' }

/** A real platform, not Bridge's local stand-in. */
export function onRealPlatform(): boolean {
  const id = platformId()
  return id !== 'none' && id !== 'mock'
}

const INIT_TIMEOUT = 20000

/** Initializes Bridge. Resolves null when the runtime is not on the page; rejects when it failed to start. */
export async function initBridge(): Promise<PlaygamaBridge | null> {
  const b = typeof window === 'undefined' ? undefined : window.bridge
  if (!b) return null
  if (!b.isInitialized) {
    let timer: ReturnType<typeof setTimeout> | undefined
    await Promise.race([
      b.initialize(),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Bridge initialize timeout')), INIT_TIMEOUT) }),
    ]).finally(() => clearTimeout(timer))
  }
  instance = b
  return b
}
