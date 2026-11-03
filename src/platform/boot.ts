// Start of the game, in this order (Bridge required steps):
// 1. Bridge initialize (platform detection);
// 2. language from the platform;
// 3. pause and sound with the platform's initial state;
// 4. save storage: bridge.storage on a platform, localStorage only in dev / outside platforms.
// Then App creates the game, reads the profile and sends game_ready once the lobby is on screen.

import { reactive } from 'vue'
import { bridge, initBridge, isStandalone, onRealPlatform, platformId } from './bridge'
import { startLifecycle } from './lifecycle'
import { setLanguage } from '../i18n'
import { bridgeStorage, devStorage, type SaveStorage } from '../meta/storage'

// blocked: on our own site Bridge did not start — most often an ad blocker cut off the site's ad script.
// The lobby still opens there, but no battle starts: the game asks to turn the blocker off.
export const bootState = reactive({ error: '' as '' | 'bridge' | 'save', platform: 'none', language: 'en', blocked: false })

const isDevHost = () => import.meta.env.DEV || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)
// Without Bridge the game runs only in dev (localhost); on our own site only the lobby opens (bootState.blocked).

let tried = false

/** Never throws: on a failure bootState.error is set and the app shows it with a retry button. */
export async function boot(): Promise<SaveStorage | null> {
  bootState.error = ''
  if (!tried || (!bridge() && !isDevHost())) {
    tried = true
    try {
      await initBridge()
    } catch (e) {
      console.warn('[platform] Bridge did not start (its scripts were blocked or the network cut them off)', e)
      // Bridge's own loading picture stays up when it did not start; the lobby goes in front instead.
      if (isStandalone()) document.getElementById('loading-overlay')?.remove()
      bootState.blocked = isStandalone() && !isDevHost()
      if (!isDevHost() && !isStandalone()) {
        bootState.error = 'bridge'
        return null
      }
    }
    if (!bridge() && !isDevHost() && !bootState.blocked) {
      bootState.error = 'bridge'
      return null
    }
    bootState.platform = platformId()
    // Dev only: ?lang=en / ?lang=ru to check a translation without a platform.
    const devLang = import.meta.env.DEV ? new URLSearchParams(location.search).get('lang') : null
    // Blocked on our own site there is no platform language; the browser's is the only guess there.
    bootState.language = setLanguage(devLang || bridge()?.platform.language || (bootState.blocked ? navigator.language : null))
    startLifecycle()
  }
  const b = bridge()
  const storage = b && onRealPlatform() ? bridgeStorage(b) : devStorage
  if (bootState.blocked) console.info('[platform] no Bridge on this site: the lobby opens, battles wait for Bridge.')
  else if (!onRealPlatform()) console.info(`[platform] ${bootState.platform}: saves in localStorage, ads simulated by Bridge (dev only).`)
  return storage
}
