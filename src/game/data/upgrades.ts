import type { Stats } from '../stats'

// Level-up cards offered after a wave. Amount is for the common tier; rarer tiers multiply it.
export interface UpgradeDef {
  id: string
  stat: keyof Stats
  amount: number
}

export const UPGRADES: UpgradeDef[] = [
  { id: 'hp', stat: 'maxHp', amount: 10 },
  { id: 'regen', stat: 'regen', amount: 0.6 },
  { id: 'armor', stat: 'armor', amount: 2 },
  { id: 'dmg', stat: 'damagePct', amount: 0.08 },
  { id: 'melee', stat: 'meleeDmg', amount: 2 },
  { id: 'ranged', stat: 'rangedDmg', amount: 2 },
  { id: 'element', stat: 'elementDmg', amount: 2 },
  { id: 'atkspd', stat: 'attackSpeed', amount: 0.08 },
  { id: 'crit', stat: 'critChance', amount: 0.04 },
  { id: 'range', stat: 'range', amount: 25 },
  { id: 'speed', stat: 'moveSpeed', amount: 12 },
  { id: 'pickup', stat: 'pickupRadius', amount: 25 },
  { id: 'profit', stat: 'profit', amount: 0.06 },
  { id: 'dodge', stat: 'dodge', amount: 0.03 },
  { id: 'cd', stat: 'cooldownPct', amount: 0.05 },
  { id: 'knock', stat: 'knockback', amount: 0.15 },
]

export const CARD_TIER_MUL = [1, 1.6, 2.4]
