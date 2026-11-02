import { reactive } from 'vue'

// How close the battle camera is. Numbers are world units visible across the screen width:
// smaller = closer. The camera starts close on wave 1, pulls back on wave 2 and settles from wave 3.
// Tuned with the in-game view panel (gear button in battle, dev build or ?tune in the address).

export const VIEW_DEFAULTS = {
  wave1: 300,
  wave2: 400,
  final: 520,
  zoomTime: 1.5, // seconds for a camera change
  heroSize: 52, // bogatyr picture size, world units
}

const KEY = 'vampur.dev.view'

export const VIEW = reactive({ ...VIEW_DEFAULTS, ...load() })

export const viewTuning = import.meta.env.DEV || new URLSearchParams(window.location.search).has('tune')

export function viewForWave(wave: number): number {
  return wave <= 1 ? VIEW.wave1 : wave === 2 ? VIEW.wave2 : VIEW.final
}

// Tuned values are kept only while tuning (they never touch the player's save).
export function saveView(): void {
  if (!viewTuning) return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(VIEW))
  } catch {
    // tuning only
  }
}

export function resetView(): void {
  Object.assign(VIEW, VIEW_DEFAULTS)
  saveView()
}

function load(): Partial<typeof VIEW_DEFAULTS> {
  if (!(import.meta.env.DEV || new URLSearchParams(window.location.search).has('tune'))) return {}
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}
