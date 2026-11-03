// One place for pause, sound and the platform's game events.
//
// paused = the tab is hidden or unfocused, the platform paused the game, or a fullscreen ad is open.
//          The game freezes (simulation, timers, animations); in battle the pause screen is shown.
// muted  = the platform does not allow sound, or the game is paused. The sound module listens to it.
// game_ready is sent once, when the lobby is on screen and takes input.

import { reactive } from 'vue'
import { bridge } from './bridge'

export type PauseReason = 'hidden' | 'blur' | 'platform' | 'ad'

const reasons = new Set<PauseReason>()
const listeners = new Set<(paused: boolean) => void>()
let readySent = false

/** Reactive copy for the UI and the sound module. */
export const lifecycle = reactive({ paused: false, adOpen: false, platformMuted: false, muted: false })

export function isPaused(): boolean {
  return reasons.size > 0
}

/** Called with true when the game must freeze, false when it may go on. Returns unsubscribe. */
export function onPauseChange(fn: (paused: boolean) => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function setPauseReason(reason: PauseReason, on: boolean): void {
  const was = reasons.size > 0
  if (on) reasons.add(reason)
  else reasons.delete(reason)
  lifecycle.adOpen = reasons.has('ad')
  const now = reasons.size > 0
  lifecycle.paused = now
  lifecycle.muted = lifecycle.platformMuted || now
  if (now !== was) for (const fn of listeners) fn(now)
}

/** Lifecycle message to the platform; on the local mock it only goes to the dev console. */
export function sendMessage(message: string, data?: Record<string, string>): void {
  const b = bridge()
  if (!b) {
    if (import.meta.env.DEV) console.debug('[platform:none]', message, data ?? '')
    return
  }
  try {
    Promise.resolve(data ? b.platform.sendMessage(message as never, data as never) : b.platform.sendMessage(message as never)).catch((e) =>
      console.warn('[platform]', message, e),
    )
  } catch (e) {
    console.warn('[platform]', message, e)
  }
}

/** The first screen is shown and takes input: tell the platform loading is over (once). */
export function gameReady(): void {
  if (readySent) return
  readySent = true
  sendMessage('game_ready')
}

let started = false
/** Subscribes to the platform and the page once (boot). Reads the initial pause and sound state. */
export function startLifecycle(): void {
  if (started) return
  started = true
  const b = bridge()
  if (b) {
    lifecycle.platformMuted = !b.platform.isAudioEnabled
    if (b.platform.isPaused) reasons.add('platform')
    b.platform.on(b.EVENT_NAME.AUDIO_STATE_CHANGED, (enabled: boolean) => {
      lifecycle.platformMuted = !enabled
      lifecycle.muted = lifecycle.platformMuted || reasons.size > 0
    })
    b.platform.on(b.EVENT_NAME.PAUSE_STATE_CHANGED, (paused: boolean) => setPauseReason('platform', paused))
  }
  const visibility = () => setPauseReason('hidden', document.visibilityState === 'hidden')
  document.addEventListener('visibilitychange', visibility)
  window.addEventListener('pagehide', () => setPauseReason('hidden', true))
  window.addEventListener('pageshow', visibility)
  window.addEventListener('blur', () => setPauseReason('blur', true))
  window.addEventListener('focus', () => setPauseReason('blur', false))
  // A phone does not always give the focus back after an ad or another app: any touch or key inside
  // the game means the player is here.
  const back = () => {
    if (reasons.has('blur')) setPauseReason('blur', false)
  }
  window.addEventListener('pointerdown', back, true)
  window.addEventListener('keydown', back, true)
  if (document.visibilityState === 'hidden') reasons.add('hidden')
  lifecycle.paused = reasons.size > 0
  lifecycle.muted = lifecycle.platformMuted || lifecycle.paused
}
