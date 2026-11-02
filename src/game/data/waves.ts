export const WAVE_COUNT = 10

export interface WaveDef {
  n: number
  boss: boolean
  duration: number // seconds; Infinity on the boss wave
  spawnInterval: number
  batch: number
  maxAlive: number
  mix: [string, number][] // enemy id, weight
}

export function waveDef(n: number): WaveDef {
  const boss = n === WAVE_COUNT
  const mix: [string, number][] = [['runner', 10]]
  if (n >= 2) mix.push(['tank', 2 + n])
  if (n >= 3) mix.push(['fast', 2 + n * 1.5])
  return {
    n,
    boss,
    duration: boss ? Infinity : Math.min(40 + 10 * (n - 1), 90),
    spawnInterval: Math.max(0.45, 1.3 - 0.09 * n) * (boss ? 1.6 : 1),
    batch: 1 + Math.floor(n * 0.8),
    maxAlive: boss ? 120 : 25 + n * 30,
    mix,
  }
}

// Regular enemies get stronger every wave; the boss keeps its own numbers.
export function enemyScale(n: number): { hp: number; dmg: number } {
  return { hp: 1 + 0.25 * (n - 1), dmg: 1 + 0.15 * (n - 1) }
}
