import { ABILITIES } from '../game/data/abilities'
import { LOCATIONS } from '../game/data/bestiary'
import { WEAPONS } from '../game/data/weapons'
import type { Stats } from '../game/stats'

// Lobby content: equipment items, sets, talents, map levels, chests. Our own names and numbers;
// only the structure follows the reference (see docs/GDD.md, sections 4.3 and 11).

export const RARITY_NAMES = ['Обычный', 'Необычный', 'Редкий', 'Эпический', 'Легендарный', 'Мифический']
export const RARITY_MAX_LEVEL = [10, 20, 30, 40, 50, 60]
export const MAX_RARITY = 5

export type GearSlot = 'weapon' | 'hat' | 'glasses' | 'shirt' | 'backpack' | 'boots'
export type Slot = GearSlot | 'ability'
export const GEAR_SLOTS: GearSlot[] = ['weapon', 'hat', 'glasses', 'shirt', 'backpack', 'boots']
export const ALL_SLOTS: Slot[] = [...GEAR_SLOTS, 'ability']
export const SLOT_NAMES: Record<Slot, string> = {
  weapon: 'Оружие',
  hat: 'Шлем',
  glasses: 'Оберег',
  shirt: 'Кольчуга',
  backpack: 'Котомка',
  boots: 'Сапоги',
  ability: 'Способность',
}

// Main bonus per level: weapon, hat and glasses add damage; shirt, backpack and boots add health;
// an ability item shortens its own cooldown.
export const DAMAGE_SLOTS: Slot[] = ['weapon', 'hat', 'glasses']
export const MAIN_DAMAGE_PER_LEVEL = 0.04
export const MAIN_HP_PER_LEVEL = 4
export const MAIN_COOLDOWN_PER_LEVEL = 0.01

// Perk stats: hero stats plus bonuses that only touch this item ("собственный").
export type PerkStat = keyof Stats | 'ownDamage' | 'ownAttackSpeed' | 'ownCrit' | 'abilityCooldown' | 'abilityDuration'

export interface Perk {
  stat: PerkStat
  value: number
}

export type SetId = 'hunter' | 'guard' | 'alchemist' | 'mechanic' | 'trader'

export interface SetDef {
  id: SetId
  name: string
  owner: string // genitive for item names: «Шлем охотника»
  bonus: string
  perks: Perk[] // pool, rotated per slot
}

export const SET_PIECES_NEEDED = 4

export const SETS: Record<SetId, SetDef> = {
  hunter: {
    id: 'hunter', name: 'Охотник', owner: 'охотника', bonus: 'Скорость атаки +20%, когда здоровья меньше 40%',
    perks: [{ stat: 'critChance', value: 0.03 }, { stat: 'bulletDmg', value: 2 }, { stat: 'attackSpeed', value: 0.05 }, { stat: 'critMult', value: 0.1 }, { stat: 'range', value: 20 }],
  },
  guard: {
    id: 'guard', name: 'Дружинник', owner: 'дружинника', bonus: '15% шанс заблокировать половину урона',
    perks: [{ stat: 'maxHp', value: 10 }, { stat: 'armor', value: 2 }, { stat: 'regen', value: 0.5 }, { stat: 'dodge', value: 0.03 }, { stat: 'medkitHeal', value: 0.1 }],
  },
  alchemist: {
    id: 'alchemist', name: 'Волхв', owner: 'волхва', bonus: 'Магическое оружие поджигает врагов',
    perks: [{ stat: 'magicDmg', value: 2 }, { stat: 'cooldownPct', value: 0.04 }, { stat: 'xpGain', value: 0.05 }, { stat: 'lifesteal', value: 0.01 }, { stat: 'damagePct', value: 0.05 }],
  },
  mechanic: {
    id: 'mechanic', name: 'Кузнец', owner: 'кузнеца', bonus: 'Механическое оружие наносит на 20% больше урона',
    perks: [{ stat: 'mechDmg', value: 2 }, { stat: 'attackSpeed', value: 0.04 }, { stat: 'range', value: 20 }, { stat: 'damagePct', value: 0.05 }, { stat: 'armor', value: 1 }],
  },
  trader: {
    id: 'trader', name: 'Купец', owner: 'купца', bonus: 'Скидка 10% в магазине забега',
    perks: [{ stat: 'profit', value: 0.05 }, { stat: 'pickupRadius', value: 20 }, { stat: 'luck', value: 0.05 }, { stat: 'moveSpeed', value: 8 }, { stat: 'xpGain', value: 0.05 }],
  },
}

export interface ItemDef {
  id: string
  name: string
  slot: Slot
  set?: SetId
  runWeapon?: string // weapon items: the run weapon it starts with
  ability?: string // ability items
  perks: Perk[] // 5; perk i opens at rarity i + 1
}

// Later perks are stronger: ×1, ×1.25 … ×2.
function scaled(perks: Perk[]): Perk[] {
  return perks.map((p, i) => ({ stat: p.stat, value: p.value * (1 + 0.25 * i) }))
}

function weaponItem(runWeapon: string): ItemDef {
  const def = WEAPONS[runWeapon]
  const flat = { melee: 'meleeDmg', bullet: 'bulletDmg', magic: 'magicDmg', mech: 'mechDmg' }[def.kind] as keyof Stats
  return {
    id: `w_${runWeapon}`, name: def.name, slot: 'weapon', runWeapon,
    perks: [{ stat: 'ownDamage', value: 0.1 }, { stat: 'ownAttackSpeed', value: 0.08 }, { stat: flat, value: 2 }, { stat: 'ownCrit', value: 0.08 }, { stat: 'damagePct', value: 0.08 }],
  }
}

function clothingItem(set: SetDef, slot: GearSlot, index: number): ItemDef {
  const rotated = set.perks.map((_, i) => set.perks[(i + index) % set.perks.length])
  return { id: `${slot}_${set.id}`, name: `${SLOT_NAMES[slot]} ${set.owner}`, slot, set: set.id, perks: scaled(rotated) }
}

function abilityItem(ability: string): ItemDef {
  return {
    id: `a_${ability}`, name: ABILITIES[ability].name, slot: 'ability', ability,
    perks: [{ stat: 'abilityCooldown', value: 0.05 }, { stat: 'abilityDuration', value: 0.1 }, { stat: 'abilityCooldown', value: 0.07 }, { stat: 'abilityDuration', value: 0.15 }, { stat: 'abilityCooldown', value: 0.1 }],
  }
}

const CLOTHING_SLOTS: GearSlot[] = ['hat', 'glasses', 'shirt', 'backpack', 'boots']

export const ITEMS: Record<string, ItemDef> = Object.fromEntries(
  [
    ...['pistol', 'smg', 'shotgun', 'crossbow', 'sword', 'lightning', 'fireWand', 'frostStaff', 'drone', 'turret'].map(weaponItem),
    ...Object.values(SETS).flatMap((set) => CLOTHING_SLOTS.map((slot, i) => clothingItem(set, slot, i))),
    ...Object.keys(ABILITIES).map(abilityItem),
  ].map((it) => [it.id, it]),
)

export const ITEM_IDS = Object.keys(ITEMS)

export const PERK_NAMES: Record<string, string> = {
  ownDamage: 'Собственный урон',
  ownAttackSpeed: 'Собственная скорость атаки',
  ownCrit: 'Собственный крит. шанс',
  abilityCooldown: 'Перезарядка способности',
  abilityDuration: 'Длительность способности',
}

// ---------- upgrade economy ----------

export function upgradeGold(level: number): number {
  return 250 * level
}

export function upgradeBlueprints(level: number): number {
  return Math.max(1, Math.round(level * 1.3))
}

// Gold and blueprints spent to raise an item from level 1 to `level` (refunded by dismantling or merging).
export function spentOn(level: number): { gold: number; blueprints: number } {
  let gold = 0
  let blueprints = 0
  for (let l = 1; l < level; l++) {
    gold += upgradeGold(l)
    blueprints += upgradeBlueprints(l)
  }
  return { gold, blueprints }
}

export function sellGold(rarity: number): number {
  return 50 * (rarity + 1) ** 2
}

// ---------- talents ----------

export interface TalentDef {
  id: string
  name: string
  stat: keyof Stats
  perLevel: number
  max: number
}

export const TALENTS: TalentDef[] = [
  { id: 'damage', name: 'Урон', stat: 'damagePct', perLevel: 0.03, max: 20 },
  { id: 'health', name: 'Здоровье', stat: 'maxHp', perLevel: 6, max: 20 },
  { id: 'armor', name: 'Броня', stat: 'armor', perLevel: 0.5, max: 20 },
  { id: 'attackSpeed', name: 'Скорость атаки', stat: 'attackSpeed', perLevel: 0.02, max: 20 },
  { id: 'crit', name: 'Крит. шанс', stat: 'critChance', perLevel: 0.005, max: 20 },
  { id: 'regen', name: 'Восстановление', stat: 'regen', perLevel: 0.2, max: 20 },
  { id: 'speed', name: 'Скорость', stat: 'moveSpeed', perLevel: 2, max: 20 },
  { id: 'pickup', name: 'Радиус сбора', stat: 'pickupRadius', perLevel: 4, max: 20 },
  { id: 'profit', name: 'Прибыль', stat: 'profit', perLevel: 0.01, max: 20 },
  { id: 'cooldown', name: 'Перезарядка', stat: 'cooldownPct', perLevel: 0.01, max: 20 },
  { id: 'boss', name: 'Урон по боссам', stat: 'bossDmg', perLevel: 0.02, max: 20 },
  { id: 'medkit', name: 'Лечение аптечкой', stat: 'medkitHeal', perLevel: 0.03, max: 20 },
]

export function talentCost(level: number): number {
  return 150 + 150 * level
}

// ---------- map levels ----------

export interface MapLevel {
  name: string
  enemyMul: number // enemy health and damage multiplier
  boss: string
  bossTitle: string
}

export const MAP_LEVELS: MapLevel[] = LOCATIONS.map((l) => ({ name: l.name, enemyMul: l.enemyMul, boss: l.boss.name, bossTitle: l.boss.def.title }))

// ---------- chests ----------

export interface ChestDef {
  id: string
  name: string
  count: number // items inside
  odds: number[] // chance per rarity 0..5
  blueprints: number
  gold?: number // price in gold
  gems?: number // price in gems
  freeEveryHours?: number
  water?: number // living water for bogatyrs
}

export const CHESTS: ChestDef[] = [
  { id: 'small', name: 'Малый сундук', count: 1, odds: [0.78, 0.2, 0.02], blueprints: 2, gold: 600, freeEveryHours: 4 },
  { id: 'medium', name: 'Средний сундук', count: 1, odds: [0, 0.6, 0.33, 0.07], blueprints: 5, water: 3, gems: 120 },
  { id: 'big', name: 'Большой сундук', count: 10, odds: [0.3, 0.45, 0.2, 0.05], blueprints: 30, water: 20, gems: 1000 },
]

export function rollRarity(odds: number[]): number {
  let r = Math.random()
  for (let i = 0; i < odds.length; i++) if ((r -= odds[i]) <= 0) return i
  return 0
}
