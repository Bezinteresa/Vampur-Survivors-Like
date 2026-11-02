// Save storage behind one small async interface, so the platform backend can be swapped in.
// TEMPORARY: browser localStorage, for development only. Playgama forbids localStorage (3.2.1):
// replace with bridge.storage.get/set when the Bridge SDK is integrated (stage 6 in docs/GDD.md).

export interface SaveStorage {
  load(key: string): Promise<string | null>
  save(key: string, value: string): Promise<void>
}

export const devStorage: SaveStorage = {
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
