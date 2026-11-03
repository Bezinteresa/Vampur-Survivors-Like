// Start of the game, in this order (Bridge required steps):
// 1. Bridge initialize (platform detection);
// 2. language from the platform;
// 3. pause and sound with the platform's initial state;
// 4. save storage: bridge.storage on a platform, localStorage only in dev / outside platforms.
// Then App creates the game, reads the profile and sends game_ready once the lobby is on screen.

import { reactive } from 'vue'
import { bridge, initBridge, onRealPlatform, platformId } from './bridge'
import { startLifecycle } from './lifecycle'
import { bridgeStorage, devStorage, type SaveStorage } from '../meta/storage'

export const bootState = reactive({ error: '' as '' | 'bridge' | 'save', platform: 'none', language: 'en' })

const isDevHost = () => import.meta.env.DEV || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)

let tried = false

/** Never throws: on a failure bootState.error is set and the app shows it with a retry button. */
export async function boot(): Promise<SaveStorage | null> {
  bootState.error = ''
  if (!tried || (!bridge() && !isDevHost())) {
    tried = true
    try {
      await initBridge()
    } catch (e) {
      console.error('[platform] Bridge failed to start', e)
      if (!isDevHost()) {
        bootState.error = 'bridge'
        return null
      }
    }
    if (!bridge() && !isDevHost()) {
      bootState.error = 'bridge'
      return null
    }
    bootState.platform = platformId()
    bootState.language = bridge()?.platform.language || 'en'
    startLifecycle()
  }
  const b = bridge()
  const storage = b && onRealPlatform() ? bridgeStorage(b) : devStorage
  if (!onRealPlatform()) console.info(`[platform] ${bootState.platform}: saves in localStorage, ads simulated by Bridge (dev only).`)
  return storage
}
