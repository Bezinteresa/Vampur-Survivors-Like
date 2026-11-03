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
// Our own site opens the game with ?platform_id=standalone; there the page's host script may be blocked
// (an ad blocker, the network) or just slow. The game opens its lobby after this wait and keeps waiting
// for Bridge in the background (lateBridge).
const STANDALONE_TIMEOUT = 8000

/** Opened as a standalone page (our own site), not on a game platform. */
export function isStandalone(): boolean {
  return typeof location !== 'undefined' && new URLSearchParams(location.search).get('platform_id')?.toLowerCase() === 'standalone'
}

/** Initializes Bridge. Resolves null when the runtime is not on the page; rejects when it failed to start. */
export async function initBridge(): Promise<PlaygamaBridge | null> {
  const b = typeof window === 'undefined' ? undefined : window.bridge
  if (!b) return null
  if (!b.isInitialized) {
    let timer: ReturnType<typeof setTimeout> | undefined
    pending = b.initialize().then(() => b)
    await Promise.race([
      pending,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Bridge initialize timeout')), isStandalone() ? STANDALONE_TIMEOUT : INIT_TIMEOUT) }),
    ]).finally(() => clearTimeout(timer))
  }
  instance = b
  return b
}

let pending: Promise<PlaygamaBridge> | null = null

/** After a timed-out start: resolves when Bridge finishes starting after all, and from then on bridge() returns it. */
export function lateBridge(): Promise<PlaygamaBridge> | null {
  return pending?.then((b) => (instance = b)) ?? null
}
