export type WeaponKind = 'melee' | 'ranged' | 'element'
export type WeaponBehavior = 'shot' | 'swing' | 'chain'

export interface WeaponDef {
  id: string
  name: string
  kind: WeaponKind
  behavior: WeaponBehavior
  damage: [number, number, number, number] // per tier I..IV
  cooldown: number // seconds between attacks
  range: number
  projSpeed: number
  pierce: number
  count: number // projectiles per shot
  spread: number // radians, random
  arc: number // swing arc, radians
  jumps: number // chain jumps at tier I (+1 per tier)
  price: number // tier I, wave 1
}

const base = { projSpeed: 0, pierce: 0, count: 1, spread: 0, arc: 0, jumps: 0 }

export const WEAPONS: Record<string, WeaponDef> = {
  pistol: {
    ...base, id: 'pistol', name: 'Пистолет', kind: 'ranged', behavior: 'shot',
    damage: [12, 18, 28, 44], cooldown: 0.6, range: 380, projSpeed: 720, spread: 0.04, price: 14,
  },
  smg: {
    ...base, id: 'smg', name: 'Пистолет-пулемёт', kind: 'ranged', behavior: 'shot',
    damage: [4, 6, 10, 16], cooldown: 0.22, range: 300, projSpeed: 760, spread: 0.22, price: 20,
  },
  shotgun: {
    ...base, id: 'shotgun', name: 'Дробовик', kind: 'ranged', behavior: 'shot',
    damage: [6, 9, 14, 22], cooldown: 1.1, range: 230, projSpeed: 680, count: 4, spread: 0.12, price: 22,
  },
  crossbow: {
    ...base, id: 'crossbow', name: 'Арбалет', kind: 'ranged', behavior: 'shot',
    damage: [16, 26, 40, 64], cooldown: 1.3, range: 460, projSpeed: 820, pierce: 2, price: 24,
  },
  sword: {
    ...base, id: 'sword', name: 'Меч', kind: 'melee', behavior: 'swing',
    damage: [14, 22, 36, 58], cooldown: 1.0, range: 105, arc: 2.1, price: 16,
  },
  lightning: {
    ...base, id: 'lightning', name: 'Цепная молния', kind: 'element', behavior: 'chain',
    damage: [9, 14, 22, 36], cooldown: 1.4, range: 320, jumps: 2, price: 28,
  },
}

export const WEAPON_IDS = Object.keys(WEAPONS)
export const TIER_NAMES = ['I', 'II', 'III', 'IV']
const TIER_PRICE = [1, 2.1, 4.3, 8.8]

export function weaponPrice(def: WeaponDef, tier: number, wave: number): number {
  return Math.round(def.price * TIER_PRICE[tier] * (1 + 0.12 * (wave - 1)))
}

export function weaponDesc(def: WeaponDef, tier: number): string[] {
  const lines = [`Урон ${def.damage[tier]}${def.count > 1 ? ` ×${def.count}` : ''}`, `Перезарядка ${def.cooldown}с`]
  if (def.behavior === 'chain') lines.push(`Прыжков ${def.jumps + tier}`)
  if (def.pierce > 0) lines.push(`Пробитие ${def.pierce}`)
  lines.push(`Дальность ${def.range}`)
  return lines
}
