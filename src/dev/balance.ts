// Development-only balance bench. In the dev build: `await __balance.series('P0', 0, 10)` in the browser console.
// A scripted bot plays whole runs (dodges shots and beams, rolls, shops, picks cards) with a lobby profile
// of a given progress level, and returns averages to compare against the targets in docs/GDD.md, section 13.

import type { Game, Offer } from '../game/Game'
import { HEROES } from '../game/data/heroes'
import type { RunLoadout } from '../game/loadout'
import { beamAngle } from '../game/World'
import { TALENTS } from '../meta/content'
import { Meta } from '../meta/Meta'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface RunStats {
  victory: boolean
  wave: number
  level: number
  kills: number
  coins: number // coins earned during the run
  bought: number // shop purchases
  bossTime: number // seconds on the boss wave (0 if not reached)
  damage: Record<string, number>
  gold: number // lobby gold the run pays
}

// Lobby progress snapshots: what a player roughly has after N runs.
export const PROFILES: Record<string, { about: string; build: (m: Meta) => void }> = {
  P0: { about: 'новый игрок', build: () => {} },
  P1: {
    about: '≈10 забегов: таланты 3, вещи 3–6 ур., обычные/необычные',
    build: (m) => {
      for (const t of TALENTS.slice(0, 6)) m.p.talents[t.id] = 3
      gear(m, [['w_pistol', 1, 6], ['hat_hunter', 0, 5], ['boots_guard', 0, 5], ['glasses_hunter', 0, 3], ['shirt_guard', 0, 3]])
    },
  },
  P2: {
    about: '≈25 забегов: таланты 6, редкие вещи 12 ур., комплект Дружинника, Добрыня 8',
    build: (m) => {
      for (const t of TALENTS) m.p.talents[t.id] = 6
      gear(m, [['w_smg', 2, 12], ['hat_guard', 2, 12], ['glasses_guard', 2, 12], ['shirt_guard', 2, 12], ['backpack_guard', 2, 12], ['boots_hunter', 1, 10]])
      hero(m, 'dobrynya', 8)
    },
  },
  P3: {
    about: '≈60 забегов: таланты 12, эпические вещи 25 ур., Илья 15',
    build: (m) => {
      for (const t of TALENTS) m.p.talents[t.id] = 12
      gear(m, [['w_crossbow', 3, 25], ['hat_hunter', 3, 25], ['glasses_hunter', 3, 25], ['shirt_hunter', 3, 25], ['backpack_hunter', 3, 25], ['boots_guard', 3, 22]])
      hero(m, 'ilya', 15)
    },
  },
}

function gear(m: Meta, list: [string, number, number][]): void {
  for (const [itemId, rarity, level] of list) {
    const it = { uid: m.p.nextUid++, itemId, rarity, level }
    m.p.items.push(it)
    m.equip(it.uid)
  }
}

function hero(m: Meta, id: string, level: number): void {
  m.p.heroes[id] = level
  m.p.hero = id
}

export function loadoutFor(profile: string, level: number): RunLoadout {
  const m = new Meta() // never loaded, so never saved
  PROFILES[profile].build(m)
  m.p.selectedLevel = level
  return m.loadout()
}

// ---------- the bot ----------

function steer(game: Game): { x: number; y: number } {
  const w = game.world
  const P = w.player
  const hpShare = P.hp / Math.max(1, game.ui.maxHp)
  let x = -P.x * 0.0004
  let y = -P.y * 0.0004
  const push = (dx: number, dy: number, k: number) => {
    x += dx * k
    y += dy * k
  }
  for (const e of w.enemies) {
    if (e.def.ai === 'egg' || e.def.ai === 'coin') continue
    const dx = P.x - e.x
    const dy = P.y - e.y
    const d2 = dx * dx + dy * dy + 1
    if (d2 < 320 * 320) push(dx / d2, dy / d2, e.boss ? 260 : 100)
  }
  for (const h of w.hostiles) {
    const dx = P.x - h.x
    const dy = P.y - h.y
    const d2 = dx * dx + dy * dy + 1
    if (d2 < 170 * 170) push(dx / d2, dy / d2, 80)
  }
  for (const pd of w.puddles) {
    if (pd.fire) continue
    const dx = P.x - pd.x
    const dy = P.y - pd.y
    const d = Math.hypot(dx, dy) + 1
    if (d < pd.r + 40) push(dx / d, dy / d, 2)
  }
  for (const b of w.beams) {
    const a = beamAngle(b)
    const ux = Math.cos(a)
    const uy = Math.sin(a)
    const along = (P.x - b.x) * ux + (P.y - b.y) * uy
    const across = -(P.x - b.x) * uy + (P.y - b.y) * ux
    if (along > 0 && along < b.len && Math.abs(across) < 70) {
      const s = across >= 0 ? 1 : -1
      push(-uy * s, ux * s, 3)
    }
  }
  const goal = (gx: number, gy: number, k: number) => {
    const dx = gx - P.x
    const dy = gy - P.y
    const d = Math.hypot(dx, dy) + 1
    push(dx / d, dy / d, k)
  }
  const egg = w.enemies.find((e) => e.def.ai === 'egg')
  if (egg) goal(egg.x, egg.y, 1)
  const thief = w.enemies.find((e) => e.def.ai === 'coin')
  if (thief) goal(thief.x, thief.y, 0.4)
  if (w.chest) goal(w.chest.x, w.chest.y, 0.6)
  if (hpShare < 0.5) {
    const kit = w.pickups.find((p) => p.medkit)
    if (kit) goal(kit.x, kit.y, 0.8)
  }
  // Collect coins like a player would: the nearest one, more eagerly when nothing is close.
  let coin: { x: number; y: number } | null = null
  let best = 450 * 450
  for (const pk of w.pickups) {
    if (pk.medkit) continue
    const d2 = (pk.x - P.x) ** 2 + (pk.y - P.y) ** 2
    if (d2 < best) {
      best = d2
      coin = pk
    }
  }
  const crowded = w.enemies.some((e) => e.dmg > 0 && Math.hypot(e.x - P.x, e.y - P.y) < 160)
  if (coin && !crowded) goal(coin.x, coin.y, 0.7)
  const l = Math.hypot(x, y)
  return l > 0.01 ? { x: x / l, y: y / l } : { x: 0, y: 0 }
}

// Roll when something is about to hit; use the other ability when crowded.
function useAbilities(game: Game): void {
  const w = game.world
  const P = w.player
  const danger =
    w.hostiles.some((h) => Math.hypot(h.x - P.x, h.y - P.y) < 70) ||
    w.beams.some((b) => b.t > b.charge - 0.25 && b.t < b.charge) ||
    w.enemies.some((e) => e.dmg > 0 && Math.hypot(e.x - P.x, e.y - P.y) < e.r + P.r + 25)
  game.ui.abilities.forEach((a, i) => {
    if (a.cd > 0) return
    if (a.id === 'roll' && danger) game.useAbility(i)
    else if (a.id === 'heal' && P.hp < game.ui.maxHp * 0.5) game.useAbility(i)
    else if (a.id !== 'roll' && a.id !== 'heal' && w.enemies.filter((e) => Math.hypot(e.x - P.x, e.y - P.y) < 260).length >= 6) game.useAbility(i)
  })
}

const CARD_WEIGHT: Record<string, number> = { damagePct: 5, attackSpeed: 5, maxHp: 4, armor: 3, regen: 3, critChance: 3, lifesteal: 3, dodge: 2 }

function pickCard(game: Game): void {
  let best = 0
  let bestScore = -1
  game.ui.cards.forEach((c, i) => {
    const score = ((CARD_WEIGHT[c.stat] ?? 1) + Math.random()) * (1 + c.tier)
    if (score > bestScore) {
      bestScore = score
      best = i
    }
  })
  game.pickCard(best)
}

function shop(game: Game, stats: RunStats): void {
  for (let k = 0; k < 6; k++) game.mergeWeapon(k)
  for (let round = 0; round < 3; round++) {
    const order = game.ui.offers
      .map((o: Offer, i: number) => ({ o, i }))
      .filter(({ o }: { o: Offer }) => game.canBuy(o))
      .sort((a: { o: Offer }, b: { o: Offer }) => Number(b.o.type === 'weapon') - Number(a.o.type === 'weapon') || b.o.tier - a.o.tier)
    for (const { i } of order) {
      if (game.canBuy(game.ui.offers[i])) {
        game.buy(i)
        stats.bought++
      }
    }
    for (let k = 0; k < 6; k++) game.mergeWeapon(k)
    if (game.ui.coins > game.ui.shopRerollCost * 4) game.rerollShop()
    else break
  }
  game.nextWave()
}

export function runOnce(game: Game, loadout: RunLoadout): RunStats {
  const stats: RunStats = { victory: false, wave: 0, level: 0, kills: 0, coins: 0, bought: 0, bossTime: 0, damage: {}, gold: 0 }
  game.input.move = () => steer(game)
  game.startRun(loadout)
  let lastCoins = 0
  for (let step = 0; step < 60000; step++) {
    const s = game.ui.screen
    if (s === 'wave' || s === 'waveEnd') {
      game.debugAdvance(0.1)
      useAbilities(game)
      if (game.ui.bossWave && s === 'wave') stats.bossTime += 0.1
    } else if (s === 'levelup') pickCard(game)
    else if (s === 'chest') {
      const i = game.ui.chestOffers.findIndex((o) => game.canTakeChest(o))
      if (i >= 0) game.pickChest(i)
      else game.closeChest()
    } else if (s === 'shop') {
      stats.coins += game.ui.coins - lastCoins
      shop(game, stats)
      lastCoins = game.ui.coins
    } else break
  }
  stats.victory = game.ui.screen === 'victory'
  stats.wave = stats.victory ? 10 : game.ui.wave
  stats.level = game.ui.level
  stats.kills = game.ui.kills
  stats.damage = { ...game.world.damageTaken }
  const reward = new Meta().applyRun({ level: loadout.level, wavesCleared: stats.victory ? 10 : stats.wave - 1, victory: stats.victory, kills: stats.kills })
  stats.gold = reward.find((r) => r.kind === 'gold')?.amount ?? 0
  delete (game.input as any).move
  game.toMenu()
  return stats
}

export function series(game: Game, profile: string, level: number, runs: number) {
  const saved = game.onRunEnd
  game.onRunEnd = () => {} // balance runs never touch the real save
  const all: RunStats[] = []
  try {
    for (let i = 0; i < runs; i++) all.push(runOnce(game, loadoutFor(profile, level)))
  } finally {
    game.onRunEnd = saved
  }
  const waves = all.map((r) => r.wave).sort((a, b) => a - b)
  const dmg: Record<string, number> = {}
  for (const r of all) for (const [k, v] of Object.entries(r.damage)) dmg[k] = (dmg[k] ?? 0) + v
  const total = Object.values(dmg).reduce((a, b) => a + b, 0) || 1
  const bossRuns = all.filter((r) => r.bossTime > 0)
  return {
    profile,
    level: level + 1,
    runs,
    winRate: Math.round((100 * all.filter((r) => r.victory).length) / runs) + '%',
    medianWave: waves[Math.floor(runs / 2)],
    waves: waves.join(','),
    coinsPerWave: Math.round(all.reduce((s, r) => s + r.coins / Math.max(1, r.wave - 1), 0) / runs),
    buysPerWave: +(all.reduce((s, r) => s + r.bought / Math.max(1, r.wave - 1), 0) / runs).toFixed(1),
    bossSeconds: bossRuns.length ? Math.round(bossRuns.reduce((s, r) => s + r.bossTime, 0) / bossRuns.length) : '-',
    goldPerRun: Math.round(all.reduce((s, r) => s + r.gold, 0) / runs),
    damageShare: Object.fromEntries(Object.entries(dmg).map(([k, v]) => [k, Math.round((100 * v) / total) + '%'])),
  }
}

// Watch the bot play in real time, sped up: __balance.watch('P0', 0, 10). Stops at the end of the run.
export function watch(game: Game, profile: string, level: number, speed: number): void {
  const stats: RunStats = { victory: false, wave: 0, level: 0, kills: 0, coins: 0, bought: 0, bossTime: 0, damage: {}, gold: 0 }
  game.input.move = () => steer(game)
  game.timeScale = speed
  game.startRun(loadoutFor(profile, level))
  const log: string[] = []
  game.onFrame = () => {
    const s = game.ui.screen
    if (s === 'wave') useAbilities(game)
    else if (s === 'levelup') pickCard(game)
    else if (s === 'chest') {
      const i = game.ui.chestOffers.findIndex((o) => game.canTakeChest(o))
      if (i >= 0) game.pickChest(i)
      else game.closeChest()
    } else if (s === 'shop') {
      log.push(`волна ${game.ui.wave} пройдена, уровень ${game.ui.level}, монет ${game.ui.coins}`)
      shop(game, stats)
    } else if (s !== 'waveEnd' && s !== 'paused') {
      console.info([`[bot] конец: ${s}, волна ${game.ui.wave}`, ...log].join('; '))
      game.onFrame = null
      game.timeScale = 1
      delete (game.input as any).move
    }
  }
}

export function installBalance(game: Game): void {
  Object.assign(window, {
    __balance: {
      profiles: Object.fromEntries(Object.entries(PROFILES).map(([k, v]) => [k, v.about])),
      heroes: HEROES.map((h) => h.id),
      series: (profile: string, level: number, runs = 10) => series(game, profile, level, runs),
      runOnce: (profile: string, level: number) => runOnce(game, loadoutFor(profile, level)),
      watch: (profile = 'P0', level = 0, speed = 10) => watch(game, profile, level, speed),
    },
  })
}
