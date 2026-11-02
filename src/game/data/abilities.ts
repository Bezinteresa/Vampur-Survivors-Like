// Active abilities on the two buttons. The lobby will let the player pick which two to take.
export type AbilityEffect = 'roll' | 'rapidFire'

export interface AbilityDef {
  id: string
  name: string
  effect: AbilityEffect
  cooldown: number
  duration: number
  power: number // roll: speed multiplier; rapidFire: added attack speed
  icon: string
}

export const ABILITIES: Record<string, AbilityDef> = {
  roll: { id: 'roll', name: 'Кувырок', effect: 'roll', cooldown: 8, duration: 0.28, power: 3.2, icon: 'roll' },
  rapidFire: { id: 'rapidFire', name: 'Скорострельность', effect: 'rapidFire', cooldown: 35, duration: 6, power: 1, icon: 'bolt' },
}

export const DEFAULT_LOADOUT = ['roll', 'rapidFire']
