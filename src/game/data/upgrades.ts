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
  { id: 'dmg', stat: 'damagePct', amount: 0.06 },
  { id: 'melee', stat: 'meleeDmg', amount: 2 },
  { id: 'bullet', stat: 'bulletDmg', amount: 2 },
  { id: 'magic', stat: 'magicDmg', amount: 2 },
  { id: 'mech', stat: 'mechDmg', amount: 2 },
  { id: 'atkspd', stat: 'attackSpeed', amount: 0.06 },
  { id: 'crit', stat: 'critChance', amount: 0.03 },
  { id: 'critMult', stat: 'critMult', amount: 0.1 },
  { id: 'range', stat: 'range', amount: 20 },
  { id: 'speed', stat: 'moveSpeed', amount: 10 },
  { id: 'pickup', stat: 'pickupRadius', amount: 20 },
  { id: 'profit', stat: 'profit', amount: 0.05 },
  { id: 'dodge', stat: 'dodge', amount: 0.03 },
  { id: 'cd', stat: 'cooldownPct', amount: 0.04 },
  { id: 'knock', stat: 'knockback', amount: 0.15 },
  { id: 'lifesteal', stat: 'lifesteal', amount: 0.01 },
  { id: 'xp', stat: 'xpGain', amount: 0.04 },
  { id: 'medkit', stat: 'medkitHeal', amount: 0.1 },
]

// Grey, green, blue, purple — roughly ×1 / ×2 / ×3 / ×4 like the reference.
export const CARD_TIER_MUL = [1, 1.8, 2.8, 4]
