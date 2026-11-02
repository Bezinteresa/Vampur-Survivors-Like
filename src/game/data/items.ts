import type { Stats } from '../stats'

// Run items: bought in the shop between waves, stack up to `max`, gone after the run.
// Many trade a plus for a minus. `special` items have behaviour the stats cannot express.
export type ItemSpecial = 'standHeal' | 'collector'

export interface ItemDef {
  id: string
  name: string
  rarity: number // 0..3, same colours as weapons
  price: number // wave 1
  max: number
  mods: Partial<Record<keyof Stats, number>>
  special?: ItemSpecial
  text?: string // description for specials
}

export const ITEMS: Record<string, ItemDef> = {
  lightBoots: { id: 'lightBoots', name: 'Сапоги-скороходы', rarity: 0, price: 12, max: 5, mods: { moveSpeed: 20, armor: -1 } },
  ironSkin: { id: 'ironSkin', name: 'Медвежья шкура', rarity: 0, price: 14, max: 5, mods: { armor: 3, moveSpeed: -8 } },
  rawMeat: { id: 'rawMeat', name: 'Каравай', rarity: 0, price: 12, max: 5, mods: { maxHp: 15, regen: -0.3 } },
  whetstone: { id: 'whetstone', name: 'Точильный камень', rarity: 0, price: 14, max: 5, mods: { meleeDmg: 3 } },
  gunpowder: { id: 'gunpowder', name: 'Порох', rarity: 0, price: 14, max: 5, mods: { bulletDmg: 3 } },
  runeScroll: { id: 'runeScroll', name: 'Берестяная грамота', rarity: 0, price: 14, max: 5, mods: { magicDmg: 3 } },
  gear: { id: 'gear', name: 'Кузнечный молот', rarity: 0, price: 14, max: 5, mods: { mechDmg: 3 } },
  magnet: { id: 'magnet', name: 'Притягательный камень', rarity: 0, price: 10, max: 3, mods: { pickupRadius: 40 } },
  fang: { id: 'fang', name: 'Волчий клык', rarity: 1, price: 20, max: 3, mods: { lifesteal: 0.03, maxHp: -5 } },
  monocle: { id: 'monocle', name: 'Соколиный глаз', rarity: 1, price: 20, max: 3, mods: { critChance: 0.06, attackSpeed: -0.04 } },
  hourglass: { id: 'hourglass', name: 'Песочные часы', rarity: 1, price: 22, max: 3, mods: { cooldownPct: 0.1 } },
  piggyBank: { id: 'piggyBank', name: 'Кошель', rarity: 1, price: 18, max: 3, mods: { profit: 0.12, damagePct: -0.04 } },
  bandage: { id: 'bandage', name: 'Подорожник', rarity: 0, price: 12, max: 3, mods: { medkitHeal: 0.25 } },
  textbook: { id: 'textbook', name: 'Книга мудрости', rarity: 1, price: 18, max: 3, mods: { xpGain: 0.12, luck: -0.03 } },
  cloverCoin: { id: 'cloverCoin', name: 'Счастливая монета', rarity: 1, price: 20, max: 3, mods: { luck: 0.08, profit: 0.03 } },
  meditation: {
    id: 'meditation', name: 'Дрёма-трава', rarity: 2, price: 30, max: 1, mods: {}, special: 'standHeal',
    text: 'Стоя на месте: +2% здоровья/с. В движении: −0,5%/с',
  },
  magpie: {
    id: 'magpie', name: 'Сорока-сборщица', rarity: 2, price: 34, max: 1, mods: {}, special: 'collector',
    text: 'Каждые 5 с притягивает монеты в большом радиусе',
  },
  berserkerMask: { id: 'berserkerMask', name: 'Ярость богатыря', rarity: 3, price: 45, max: 1, mods: { damagePct: 0.2, armor: -3 } },
}

export const ITEM_IDS = Object.keys(ITEMS)
