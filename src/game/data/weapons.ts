// Damage type decides which flat bonus stat applies: meleeDmg, bulletDmg, magicDmg, mechDmg.
export type WeaponKind = 'melee' | 'bullet' | 'magic' | 'mech'
export type WeaponBehavior = 'shot' | 'swing' | 'chain' | 'drone' | 'turret'
export type StatusEffect = 'burn' | 'bleed' | 'freeze'

export const KIND_NAMES: Record<WeaponKind, string> = {
  melee: 'Ближний бой',
  bullet: 'Пули',
  magic: 'Магия',
  mech: 'Механика',
}

export const EFFECT_NAMES: Record<StatusEffect, string> = {
  burn: 'Горение',
  bleed: 'Кровотечение',
  freeze: 'Заморозка',
}

export interface WeaponDef {
  id: string
  name: string
  kind: WeaponKind
  behavior: WeaponBehavior
  damage: number[] // per tier I..V
  cooldown: number // seconds between attacks
  range: number
  projSpeed: number
  pierce: number
  count: number // projectiles per shot
  spread: number // radians, random
  arc: number // swing arc, radians
  jumps: number // chain jumps at tier I (+1 per tier)
  // turret: `cooldown` is the deploy interval, the turret lives `duration` and shoots every `fireRate`
  duration: number
  fireRate: number
  effect: StatusEffect | null
  price: number // tier I, wave 1
}

const base = { projSpeed: 0, pierce: 0, count: 1, spread: 0, arc: 0, jumps: 0, duration: 0, fireRate: 0, effect: null }

export const WEAPONS: Record<string, WeaponDef> = {
  pistol: {
    ...base, id: 'pistol', name: 'Ручница', kind: 'bullet', behavior: 'shot',
    damage: [15, 22, 34, 52, 80], cooldown: 0.6, range: 380, projSpeed: 720, spread: 0.04, price: 14,
  },
  smg: {
    ...base, id: 'smg', name: 'Скорострельная пищаль', kind: 'bullet', behavior: 'shot',
    damage: [4, 6, 10, 16, 25], cooldown: 0.22, range: 300, projSpeed: 760, spread: 0.22, price: 20,
  },
  shotgun: {
    ...base, id: 'shotgun', name: 'Дробовая пищаль', kind: 'bullet', behavior: 'shot',
    damage: [6, 9, 14, 22, 35], cooldown: 1.1, range: 230, projSpeed: 680, count: 4, spread: 0.12, price: 22,
  },
  crossbow: {
    ...base, id: 'crossbow', name: 'Самострел', kind: 'bullet', behavior: 'shot',
    damage: [16, 26, 40, 64, 100], cooldown: 1.3, range: 460, projSpeed: 820, pierce: 2, effect: 'bleed', price: 24,
  },
  sword: {
    ...base, id: 'sword', name: 'Меч-кладенец', kind: 'melee', behavior: 'swing',
    damage: [14, 22, 36, 58, 90], cooldown: 1.0, range: 105, arc: 2.1, price: 16,
  },
  lightning: {
    ...base, id: 'lightning', name: 'Посох Перуна', kind: 'magic', behavior: 'chain',
    damage: [9, 14, 22, 36, 56], cooldown: 1.4, range: 320, jumps: 2, price: 28,
  },
  fireWand: {
    ...base, id: 'fireWand', name: 'Перо Жар-птицы', kind: 'magic', behavior: 'shot',
    damage: [10, 15, 24, 38, 60], cooldown: 1.2, range: 360, projSpeed: 520, effect: 'burn', price: 22,
  },
  frostStaff: {
    ...base, id: 'frostStaff', name: 'Посох Морозко', kind: 'magic', behavior: 'shot',
    damage: [9, 14, 22, 35, 55], cooldown: 1.6, range: 360, projSpeed: 480, pierce: 1, effect: 'freeze', price: 24,
  },
  drone: {
    ...base, id: 'drone', name: 'Медный сокол', kind: 'mech', behavior: 'drone',
    damage: [6, 9, 15, 24, 38], cooldown: 0.7, range: 300, projSpeed: 650, price: 22,
  },
  turret: {
    ...base, id: 'turret', name: 'Сторожевая башенка', kind: 'mech', behavior: 'turret',
    damage: [8, 12, 19, 30, 48], cooldown: 7, range: 340, projSpeed: 700, duration: 8, fireRate: 0.5, price: 26,
  },
}

export const WEAPON_IDS = Object.keys(WEAPONS)
export const MAX_TIER = 4
export const TIER_NAMES = ['I', 'II', 'III', 'IV', 'V']
const TIER_PRICE = [1, 2.1, 4.3, 8.8, 18]

// Shop prices climb with the wave (balance bench: 2–3 purchases per wave).
export function wavePriceMul(wave: number): number {
  return 1 + 0.5 * (wave - 1)
}

export function weaponPrice(def: WeaponDef, tier: number, wave: number): number {
  return Math.round(def.price * TIER_PRICE[tier] * wavePriceMul(wave))
}

// `damage` is the effective number with the hero's bonuses, so offers look stronger as the run grows.
export function weaponDesc(def: WeaponDef, tier: number, damage: number): string[] {
  const lines = [KIND_NAMES[def.kind], `Урон ${Math.round(damage)}${def.count > 1 ? ` ×${def.count}` : ''}`]
  if (def.behavior === 'turret') lines.push(`Ставится раз в ${def.cooldown}с на ${def.duration}с`)
  else lines.push(`Перезарядка ${def.cooldown}с`)
  if (def.behavior === 'chain') lines.push(`Прыжков ${def.jumps + tier}`)
  if (def.pierce > 0) lines.push(`Пробитие ${def.pierce}`)
  if (def.effect) lines.push(EFFECT_NAMES[def.effect])
  lines.push(`Дальность ${def.range}`)
  return lines
}
