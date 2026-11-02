export type EnemyBehavior = 'chase' | 'boss'

export interface EnemyDef {
  id: string
  hp: number
  dmg: number // contact damage
  speed: number
  radius: number
  color: number
  coin: number // coins (= experience) dropped
  medkit: number // chance to drop a medkit
  behavior: EnemyBehavior
}

export const ENEMIES: Record<string, EnemyDef> = {
  runner: { id: 'runner', hp: 14, dmg: 5, speed: 85, radius: 15, color: 0x7d93a8, coin: 1, medkit: 0.012, behavior: 'chase' },
  tank: { id: 'tank', hp: 45, dmg: 9, speed: 52, radius: 23, color: 0x8a6f9e, coin: 3, medkit: 0.04, behavior: 'chase' },
  fast: { id: 'fast', hp: 7, dmg: 4, speed: 150, radius: 11, color: 0xc77b5a, coin: 1, medkit: 0.012, behavior: 'chase' },
  boss: { id: 'boss', hp: 2600, dmg: 28, speed: 70, radius: 58, color: 0x9e3b4a, coin: 0, medkit: 0, behavior: 'boss' },
}
