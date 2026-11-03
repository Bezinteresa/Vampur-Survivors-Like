// Two languages: English (default and fallback) and Russian. The language comes only from the platform
// (bridge.platform.language, Playgama 3.4); Russian also for the neighbouring languages whose players
// usually read it. The Russian text is the key (src/i18n/en.ts has the English one).
// Set once at boot, before the game and the UI are created, so nothing here needs to be reactive.

import { ABILITIES } from '../game/data/abilities'
import { LOCATIONS } from '../game/data/bestiary'
import { HEROES } from '../game/data/heroes'
import { ITEMS as RUN_ITEMS } from '../game/data/items'
import { EFFECT_NAMES, KIND_NAMES, WEAPONS } from '../game/data/weapons'
import { STAT_LABELS } from '../game/stats'
import { CHESTS, ITEMS, MAP_LEVELS, PERK_NAMES, RARITY_NAMES, SETS, SLOT_NAMES, TALENTS } from '../meta/content'
import { EN } from './en'

export type Lang = 'en' | 'ru'

const RU_READERS = ['ru', 'uk', 'be', 'kk', 'uz', 'ky', 'tg', 'hy', 'az', 'tt']

export let lang: Lang = 'en'

/** Text in the current language. `ru` is the Russian source; {name} parts are filled from `params`. */
export function t(ru: string, params?: Record<string, string | number>): string {
  let s = lang === 'en' ? (EN[ru] ?? ru) : ru
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v))
  return s
}

// Replaces every Russian string in the game tables with its English text (in place, once).
function translateDeep(v: unknown, seen: Set<object>): unknown {
  if (typeof v === 'string') return EN[v] ?? v
  if (!v || typeof v !== 'object' || seen.has(v)) return v
  seen.add(v)
  const o = v as Record<string, unknown>
  for (const k of Object.keys(o)) {
    const x = o[k]
    if (typeof x === 'string') o[k] = EN[x] ?? x
    else translateDeep(x, seen)
  }
  return v
}

export function setLanguage(code: string | undefined | null): Lang {
  const base = (code ?? '').toLowerCase().split(/[-_]/)[0]
  lang = RU_READERS.includes(base) ? 'ru' : 'en'
  document.documentElement.lang = lang
  if (lang === 'en') {
    const seen = new Set<object>()
    for (const table of [ABILITIES, LOCATIONS, HEROES, RUN_ITEMS, WEAPONS, KIND_NAMES, EFFECT_NAMES, STAT_LABELS, CHESTS, ITEMS, MAP_LEVELS, PERK_NAMES, RARITY_NAMES, SETS, SLOT_NAMES, TALENTS])
      translateDeep(table, seen)
  }
  return lang
}
