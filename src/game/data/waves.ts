import type { Ai } from './bestiary'

export const WAVE_COUNT = 10

export interface WaveDef {
  n: number
  boss: boolean
  duration: number // seconds; Infinity on the boss wave
  spawnInterval: number
  batch: number
  maxAlive: number
  mix: [Ai, number][] // archetype, weight
  coinThieves: number // harmless thieves that appear during the wave
}

// New behaviours join wave by wave, so each one gets a moment to be learned.
export function waveDef(n: number): WaveDef {
  const boss = n === WAVE_COUNT
  const mix: [Ai, number][] = [['chaser', 10]]
  if (n >= 3) mix.push(['roller', 2 + n * 0.5])
  if (n >= 4) mix.push(['shotgun', 1 + n * 0.35])
  if (n >= 5) mix.push(['poison', 2.5], ['splitter', 1.5])
  if (n >= 6) mix.push(['beam', 1.5 + n * 0.2])
  if (n >= 7) mix.push(['rocket', 1.2])
  if (n >= 8) mix.push(['twinBeam', 1.2])
  return {
    n,
    boss,
    duration: boss ? Infinity : Math.min(40 + 10 * (n - 1), 90),
    spawnInterval: Math.max(0.45, 1.3 - 0.09 * n) * (boss ? 1.6 : 1),
    batch: 1 + Math.floor((n - 1) * 0.6),
    maxAlive: boss ? 120 : 25 + n * 30,
    mix,
    coinThieves: n >= 2 && !boss ? (n >= 6 ? 2 : 1) : 0,
  }
}

// Regular enemies get stronger every wave; the boss keeps its own numbers.
export function enemyScale(n: number): { hp: number; dmg: number } {
  return { hp: 1 + 0.3 * (n - 1), dmg: 1 + 0.15 * (n - 1) }
}
