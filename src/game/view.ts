import { reactive } from 'vue'

// How close the battle camera is. Distances are world units visible across the screen width: smaller = closer.
// A run starts close to the bogatyr; after `delay` seconds the camera eases out to `final` over `zoomTime`
// (by default it settles 5 seconds into the battle) and stays there.
// Tuned with the in-game view panel (gear button in battle, dev build or ?tune in the address).

export const VIEW_DEFAULTS = {
  start: 300,
  final: 480,
  delay: 1.5, // seconds before the camera starts to pull back
  zoomTime: 3.5, // seconds the pull-back takes
  heroSize: 60, // bogatyr picture size, world units
}

const KEY = 'vampur.dev.view'

export const viewTuning = import.meta.env.DEV || new URLSearchParams(window.location.search).has('tune')

export const VIEW = reactive({ ...VIEW_DEFAULTS, ...load() })

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
  if (!viewTuning) return {}
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) ?? '{}') as Record<string, number>
    // Keep only keys that still exist (older tuning sessions had per-wave values).
    return Object.fromEntries(Object.entries(saved).filter(([k]) => k in VIEW_DEFAULTS))
  } catch {
    return {}
  }
}
