import type { Stats } from './stats'

// What the lobby hands to a run, and what a run hands back. The game never reads the save directly.

export interface OwnBonus {
  damage: number
  attackSpeed: number
  crit: number
}

export interface AbilitySetup {
  id: string
  cooldownMul: number
  durationMul: number
}

export interface RunLoadout {
  level: number // map level index
  enemyMul: number
  stats: Partial<Stats> // added to the base stats
  startWeapon: string
  own: Record<string, OwnBonus> // "собственные" bonuses by run weapon id
  abilities: AbilitySetup[]
  sets: string[] // active set bonuses
}

export interface RunResult {
  level: number
  wavesCleared: number
  victory: boolean
  kills: number
}

export const PLAIN_LOADOUT: RunLoadout = {
  level: 0,
  enemyMul: 1,
  stats: {},
  startWeapon: 'pistol',
  own: {},
  abilities: [
    { id: 'roll', cooldownMul: 1, durationMul: 1 },
    { id: 'rapidFire', cooldownMul: 1, durationMul: 1 },
  ],
  sets: [],
}
