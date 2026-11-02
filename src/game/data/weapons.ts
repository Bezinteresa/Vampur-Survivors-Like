// Damage type decides which flat bonus stat applies: meleeDmg, bulletDmg, magicDmg, mechDmg.
export type WeaponKind = 'melee' | 'bullet' | 'magic' | 'mech'
export type WeaponBehavior = 'shot' | 'swing' | 'chain' | 'drone' | 'turret'

export const KIND_NAMES: Record<WeaponKind, string> = {
  melee: 'Ближний бой',
  bullet: 'Пули',
  magic: 'Магия',
  mech: 'Механика',
}

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
  // turret: `cooldown` is the deploy interval, the turret lives `duration` and shoots every `fireRate`
  duration: number
  fireRate: number
  price: number // tier I, wave 1
}

const base = { projSpeed: 0, pierce: 0, count: 1, spread: 0, arc: 0, jumps: 0, duration: 0, fireRate: 0 }

export const WEAPONS: Record<string, WeaponDef> = {
  pistol: {
    ...base, id: 'pistol', name: 'Пистолет', kind: 'bullet', behavior: 'shot',
    damage: [12, 18, 28, 44], cooldown: 0.6, range: 380, projSpeed: 720, spread: 0.04, price: 14,
  },
  smg: {
    ...base, id: 'smg', name: 'Пистолет-пулемёт', kind: 'bullet', behavior: 'shot',
    damage: [4, 6, 10, 16], cooldown: 0.22, range: 300, projSpeed: 760, spread: 0.22, price: 20,
  },
  shotgun: {
    ...base, id: 'shotgun', name: 'Дробовик', kind: 'bullet', behavior: 'shot',
    damage: [6, 9, 14, 22], cooldown: 1.1, range: 230, projSpeed: 680, count: 4, spread: 0.12, price: 22,
  },
  crossbow: {
    ...base, id: 'crossbow', name: 'Арбалет', kind: 'bullet', behavior: 'shot',
    damage: [16, 26, 40, 64], cooldown: 1.3, range: 460, projSpeed: 820, pierce: 2, price: 24,
  },
  sword: {
    ...base, id: 'sword', name: 'Меч', kind: 'melee', behavior: 'swing',
    damage: [14, 22, 36, 58], cooldown: 1.0, range: 105, arc: 2.1, price: 16,
  },
  lightning: {
    ...base, id: 'lightning', name: 'Цепная молния', kind: 'magic', behavior: 'chain',
    damage: [9, 14, 22, 36], cooldown: 1.4, range: 320, jumps: 2, price: 28,
  },
  drone: {
    ...base, id: 'drone', name: 'Дрон', kind: 'mech', behavior: 'drone',
    damage: [6, 9, 15, 24], cooldown: 0.7, range: 300, projSpeed: 650, price: 22,
  },
  turret: {
    ...base, id: 'turret', name: 'Турель', kind: 'mech', behavior: 'turret',
    damage: [8, 12, 19, 30], cooldown: 7, range: 340, projSpeed: 700, duration: 8, fireRate: 0.5, price: 26,
  },
}

export const WEAPON_IDS = Object.keys(WEAPONS)
export const TIER_NAMES = ['I', 'II', 'III', 'IV']
const TIER_PRICE = [1, 2.1, 4.3, 8.8]

export function weaponPrice(def: WeaponDef, tier: number, wave: number): number {
  return Math.round(def.price * TIER_PRICE[tier] * (1 + 0.12 * (wave - 1)))
}

export function weaponDesc(def: WeaponDef, tier: number): string[] {
  const lines = [KIND_NAMES[def.kind], `Урон ${def.damage[tier]}${def.count > 1 ? ` ×${def.count}` : ''}`]
  if (def.behavior === 'turret') lines.push(`Ставится раз в ${def.cooldown}с на ${def.duration}с`)
  else lines.push(`Перезарядка ${def.cooldown}с`)
  if (def.behavior === 'chain') lines.push(`Прыжков ${def.jumps + tier}`)
  if (def.pierce > 0) lines.push(`Пробитие ${def.pierce}`)
  lines.push(`Дальность ${def.range}`)
  return lines
}
