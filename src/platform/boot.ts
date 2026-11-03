// Start of the game, in this order (Bridge required steps):
// 1. Bridge initialize (platform detection);
// 2. language from the platform;
// 3. pause and sound with the platform's initial state;
// 4. save storage: bridge.storage on a platform, localStorage only in dev / outside platforms.
// Then App creates the game, reads the profile and sends game_ready once the lobby is on screen.

import { reactive } from 'vue'
import { bridge, initBridge, isStandalone, lateBridge, onRealPlatform, platformId } from './bridge'
import { attachPlatform, startLifecycle } from './lifecycle'
import { setLanguage } from '../i18n'
import { bridgeStorage, devStorage, type SaveStorage } from '../meta/storage'

// blocked: on our own site Bridge has not started (a slow server, or the network cuts off playgama.com —
// in some countries it is blocked). The game is fully playable there without it: no ads, no purchases,
// saves in the browser. If Bridge starts later, ads and purchases come on.
export const bootState = reactive({ error: '' as '' | 'bridge' | 'save', platform: 'none', language: 'en', blocked: false })

const isDevHost = () => import.meta.env.DEV || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)
// Without Bridge the game runs in dev (localhost) and on our own site (bootState.blocked); platforms need it.

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
      // Bridge may still finish starting (a slow server): then ads and purchases come on.
      if (bootState.blocked)
        void lateBridge()?.then(() => {
          bootState.platform = platformId()
          attachPlatform()
          bootState.blocked = false
          console.info('[platform] Bridge started late; ads and purchases are on.')
        })
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
  // Our own site always keeps the profile in the same place, whether Bridge started in time or not.
  const storage = b && onRealPlatform() && !isStandalone() ? bridgeStorage(b) : devStorage
  if (bootState.blocked) console.info('[platform] no Bridge on this site: the game runs without ads and purchases.')
  else if (!onRealPlatform()) console.info(`[platform] ${bootState.platform}: saves in localStorage, ads simulated by Bridge (dev only).`)
  return storage
}
