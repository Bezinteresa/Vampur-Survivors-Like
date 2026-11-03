// Save storage behind one small async interface. On a platform the profile goes only to bridge.storage
// (Playgama 3.2.1; Bridge itself picks cloud saves or its own device copy). Browser localStorage is used
// only in dev and outside platforms (Bridge runs as its local mock there).

import type { PlaygamaBridge } from '@playgama/bridge'

export interface SaveStorage {
  /** Shown in the dev console. */
  readonly id: string
  /** Stored text, or null when there is none. Rejects when the storage could not be read. */
  load(key: string): Promise<string | null>
  /** Rejects when the write failed. */
  save(key: string, value: string): Promise<void>
}

export function bridgeStorage(b: PlaygamaBridge): SaveStorage {
  const name = (key: string) => key.replace(/\W/g, '_')
  return {
    id: `bridge:${b.platform.id}`,
    async load(key) {
      const values = (await b.storage.get([name(key)])) as unknown[]
      const v = values?.[0]
      return v == null || v === '' ? null : typeof v === 'string' ? v : JSON.stringify(v)
    },
    async save(key, value) {
      await b.storage.set([name(key)], [value])
    },
  }
}

export const devStorage: SaveStorage = {
  id: 'local',
  async load(key) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  async save(key, value) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Private mode or quota: the game keeps running, progress just is not kept.
    }
  },
}
