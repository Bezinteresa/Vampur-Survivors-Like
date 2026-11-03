// Advertising through Bridge (JS Bridge 2.x: show* returns nothing, the result comes as state events).
//
// Rewarded: only from a button that shows the video icon and what it gives. The reward is given only after
// the confirmed 'rewarded' state, once, after the ad window has closed. Opened/closed without 'rewarded',
// failed, no SDK, an exception or a timeout give nothing.
// Placements: 'reroll_cards' and 'reroll_shop' (a free reroll, once per screen), 'double_gold' (after a run).
//
// Interstitial: asked for at natural breaks only — between waves (before the cards and the shop) and at the
// end of a run. How often one is really shown is Bridge's decision (required step 7, no timers of our own):
// initialInterstitialDelay and minimumDelayBetweenInterstitial in public/playgama-bridge-config.json.

import { reactive } from 'vue'
import { bridge, onRealPlatform } from './bridge'
import { setPauseReason } from './lifecycle'

const START_TIMEOUT = 15_000 // no 'opened' by then: the ad will not come
const OPEN_TIMEOUT = 5 * 60_000 // safety net: an ad window that never reports 'closed'

export type RewardedPlacement = 'reroll_cards' | 'reroll_shop' | 'double_gold'
export type InterstitialPlacement = 'wave_end' | 'run_end'

/** Bridge's local mock simulates ads: allowed in dev to see the flow, never in a release build off a platform. */
const adsAllowed = () => onRealPlatform() || import.meta.env.DEV

/** Reactive: buttons re-check while an ad starts or ends. */
export const adState = reactive({ busy: false })

/** Hooks set by the app: save before an ad; the bought "no ads". */
export const adHooks = { beforeAd: (): Promise<void> | void => undefined, noInterstitials: () => false }

/** Rewarded ads are supported here and now. Asked every time a button is drawn: in the QA Tool the
 *  capabilities arrive after initialize, so a check made once at start could hide the button for good. */
export function rewardedSupported(): boolean {
  const b = bridge()
  return !!b && adsAllowed() && b.advertisement.isRewardedSupported
}

/** Shows a rewarded ad; `grant` runs once, after a confirmed view and after the window has closed. */
export function showRewarded(placement: RewardedPlacement, grant: () => void): Promise<boolean> {
  const b = bridge()
  if (!b || adState.busy || !rewardedSupported()) return Promise.resolve(false)
  adState.busy = true
  const S = b.REWARDED_STATE
  return new Promise<boolean>((resolve) => {
    let rewarded = false
    let done = false
    let timer = setTimeout(() => finish(), START_TIMEOUT)
    const finish = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      b.advertisement.off(b.EVENT_NAME.REWARDED_STATE_CHANGED, onState)
      setPauseReason('ad', false)
      setPauseReason('blur', false) // the ad window took the focus; the game is in front again
      adState.busy = false
      if (rewarded) {
        try {
          grant()
        } catch (e) {
          console.error('[ads] reward', e)
        }
      }
      resolve(rewarded)
    }
    const onState = (state: string) => {
      if (state === S.OPENED) {
        setPauseReason('ad', true)
        clearTimeout(timer)
        timer = setTimeout(() => finish(), OPEN_TIMEOUT)
      } else if (state === S.REWARDED) rewarded = true // the reward waits for 'closed'
      else if (state === S.CLOSED || state === S.FAILED) finish()
    }
    b.advertisement.on(b.EVENT_NAME.REWARDED_STATE_CHANGED, onState) // subscribe before show
    void Promise.resolve(adHooks.beforeAd())
      .catch(() => undefined)
      .then(() => {
        try {
          b.advertisement.showRewarded(placement)
        } catch (e) {
          console.warn('[ads] rewarded', e)
          finish()
        }
      })
  })
}

/** Interstitial at a natural break. Resolves when the game may go on; never blocks when there is no ad. */
export function maybeInterstitial(placement: InterstitialPlacement): Promise<void> {
  const b = bridge()
  // "No ads" bought: interstitials are never shown (rewarded ads stay: the player chooses them).
  if (!b || !adsAllowed() || adState.busy || adHooks.noInterstitials() || !b.advertisement.isInterstitialSupported) return Promise.resolve()
  adState.busy = true
  const S = b.INTERSTITIAL_STATE
  return new Promise<void>((resolve) => {
    let done = false
    let timer = setTimeout(() => finish(), START_TIMEOUT)
    const finish = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      b.advertisement.off(b.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, onState)
      setPauseReason('ad', false)
      setPauseReason('blur', false)
      adState.busy = false
      resolve()
    }
    const onState = (state: string) => {
      if (state === S.OPENED) {
        setPauseReason('ad', true)
        clearTimeout(timer)
        timer = setTimeout(() => finish(), OPEN_TIMEOUT)
      } else if (state === S.CLOSED || state === S.FAILED) finish()
    }
    b.advertisement.on(b.EVENT_NAME.INTERSTITIAL_STATE_CHANGED, onState)
    void Promise.resolve(adHooks.beforeAd())
      .catch(() => undefined)
      .then(() => {
        try {
          b.advertisement.showInterstitial(placement)
          // Bridge may decide not to show one now (too early): then no state comes. Don't hold the game.
          if (b.advertisement.interstitialState !== S.LOADING && b.advertisement.interstitialState !== S.OPENED) setTimeout(() => {
            if (b.advertisement.interstitialState !== S.LOADING && b.advertisement.interstitialState !== S.OPENED) finish()
          }, 300)
        } catch (e) {
          console.warn('[ads] interstitial', e)
          finish()
        }
      })
  })
}
