import type { BossAttack } from './data/bestiary'
import type { Enemy, World } from './World'

// What each enemy does this tick. Returns its wanted velocity; attacks go through World's hazard methods.
// States: move → windup (stands still, colour shifts while charging) → act → recover → move.

const CHARGE: Record<string, number> = { roller: 0.6, shotgun: 0.9, beam: 1.1, twinBeam: 1.2, rocket: 0.7 }
const COOLDOWN: Record<string, number> = { roller: 3, shotgun: 2.8, beam: 3.8, twinBeam: 4.5, rocket: 7 }
const BEAM_CHARGE = 1.1

export function think(w: World, e: Enemy, dt: number, dx: number, dy: number, d: number): [number, number] {
  e.stateT -= dt
  e.cd -= dt
  switch (e.def.ai) {
    case 'chaser':
    case 'small':
    case 'poison':
    case 'splitter':
      return [dx * e.speed, dy * e.speed]
    case 'coin':
      // Runs away and vanishes if not caught in time.
      if (e.stateT <= 0) e.hp = 0
      return [-dx * e.speed, -dy * e.speed]
    case 'egg':
      return [0, 0]
    case 'roller':
      return roller(e, dx, dy, d)
    case 'boss':
      return boss(w, e, dx, dy)
    default:
      return ranged(w, e, dx, dy, d)
  }
}

function roller(e: Enemy, dx: number, dy: number, d: number): [number, number] {
  if (e.state === 'move') {
    if (e.cd <= 0 && d < 240) startWindup(e, CHARGE.roller, dx, dy)
    return [dx * e.speed, dy * e.speed]
  }
  if (e.state === 'windup') {
    e.charge = 1 - e.stateT / CHARGE.roller
    if (e.stateT <= 0) setState(e, 'act', 0.45)
    return [0, 0]
  }
  if (e.state === 'act') {
    if (e.stateT <= 0) finish(e, COOLDOWN.roller)
    return [e.aimX * 430, e.aimY * 430]
  }
  if (e.stateT <= 0) setState(e, 'move', 0)
  return [0, 0]
}

// Keeps its distance, charges, then fires: pellets, beam, two closing beams or a homing rocket.
function ranged(w: World, e: Enemy, dx: number, dy: number, d: number): [number, number] {
  const ai = e.def.ai
  if (e.state === 'move') {
    if (e.cd <= 0 && d < e.def.keep + 140) {
      startWindup(e, CHARGE[ai], dx, dy)
      const a = Math.atan2(dy, dx)
      if (ai === 'beam') w.addBeam(e.x, e.y, a, e.dmg * 1.2, CHARGE.beam, 0.35, 0)
      if (ai === 'twinBeam') {
        w.addBeam(e.x, e.y, a + 0.45, e.dmg, CHARGE.twinBeam, 0.5, -0.4)
        w.addBeam(e.x, e.y, a - 0.45, e.dmg, CHARGE.twinBeam, 0.5, 0.4)
      }
      return [0, 0]
    }
    const keep = e.def.keep
    if (d > keep + 40) return [dx * e.speed, dy * e.speed]
    if (d < keep - 60) return [-dx * e.speed * 0.8, -dy * e.speed * 0.8]
    return [-dy * e.speed * 0.4 * e.side, dx * e.speed * 0.4 * e.side] // circle around the hero
  }
  if (e.state === 'windup') {
    e.charge = 1 - e.stateT / CHARGE[ai]
    if (e.stateT <= 0) {
      const a = Math.atan2(e.aimY, e.aimX)
      if (ai === 'shotgun') {
        const n = w.shotgunPellets
        for (let k = 0; k < n; k++) w.fireHostile(e.x, e.y, a + (k - (n - 1) / 2) * 0.14, 230, e.dmg * 0.7)
      }
      if (ai === 'rocket') w.fireHostile(e.x, e.y, a, 170, e.dmg * 1.3, 9, 0.9, 6)
      setState(e, 'recover', ai === 'twinBeam' ? 0.6 : 0.45)
    }
    return [0, 0]
  }
  if (e.stateT <= 0) finish(e, COOLDOWN[ai] * (0.85 + Math.random() * 0.3))
  return [0, 0]
}

// Chase for a while, then the next attack from the boss's list.
function boss(w: World, e: Enemy, dx: number, dy: number): [number, number] {
  const def = e.def.boss!
  if (e.state === 'move') {
    if (e.stateT <= 0) {
      const atk = def.attacks[e.attackIdx++ % def.attacks.length]
      e.attack = atk
      const charge = atk.kind === 'beam' || atk.kind === 'twinBeam' || atk.kind === 'tripleBeam' ? BEAM_CHARGE : atk.kind === 'dash' ? 0.8 : 0.7
      startWindup(e, charge, dx, dy)
      const a = Math.atan2(dy, dx)
      const dmg = e.dmg * 0.9
      if (atk.kind === 'beam') w.addBeam(e.x, e.y, a, dmg, charge, 0.45, 0, 900, 26)
      if (atk.kind === 'twinBeam') {
        w.addBeam(e.x, e.y, a + 0.5, dmg, charge, 0.55, -0.45, 900, 24)
        w.addBeam(e.x, e.y, a - 0.5, dmg, charge, 0.55, 0.45, 900, 24)
      }
      if (atk.kind === 'tripleBeam') for (const off of [-0.35, 0, 0.35]) w.addBeam(e.x, e.y, a + off, dmg, charge, 0.45, 0, 900, 24)
      return [0, 0]
    }
    return [dx * e.speed, dy * e.speed]
  }
  const atk = e.attack!
  if (e.state === 'windup') {
    e.charge = 1 - e.stateT / Math.max(0.1, e.windupTime)
    if (e.stateT <= 0) {
      bossAct(w, e, atk)
      setState(e, atk.kind === 'dash' ? 'act' : 'recover', atk.kind === 'dash' ? 0.55 : 0.6)
    }
    return [0, 0]
  }
  if (e.state === 'act') {
    if (e.stateT <= 0) setState(e, 'recover', 0.3)
    return [e.aimX * 520, e.aimY * 520]
  }
  if (e.stateT <= 0) {
    e.charge = 0
    setState(e, 'move', 1.8 + Math.random())
  }
  return [0, 0]
}

function bossAct(w: World, e: Enemy, atk: BossAttack): void {
  const a = Math.atan2(e.aimY, e.aimX)
  const dmg = e.dmg * 0.5
  switch (atk.kind) {
    case 'fan':
      for (let k = 0; k < atk.count; k++) w.fireHostile(e.x, e.y, a - atk.spread / 2 + (atk.spread * k) / Math.max(1, atk.count - 1), 220, dmg)
      break
    case 'ring':
      for (let k = 0; k < atk.count; k++) w.fireHostile(e.x, e.y, a + (k * Math.PI * 2) / atk.count, 190, dmg)
      break
    case 'rockets':
      for (let k = 0; k < atk.count; k++) w.fireHostile(e.x, e.y, a + (k - (atk.count - 1) / 2) * 0.7, 170, dmg * 1.6, 11, 1.1, 7)
      break
    case 'summon':
      w.summon(atk.ai, atk.count, e.x, e.y)
      break
    case 'puddles':
      w.puddlesAroundPlayer(atk.count, e.dmg * 0.4)
      break
    case 'dash':
    case 'beam':
    case 'twinBeam':
    case 'tripleBeam':
      break // dash moves in 'act'; beams were scheduled at windup
  }
}

function startWindup(e: Enemy, time: number, dx: number, dy: number): void {
  e.aimX = dx
  e.aimY = dy
  e.windupTime = time
  setState(e, 'windup', time)
}

function setState(e: Enemy, state: Enemy['state'], time: number): void {
  e.state = state
  e.stateT = time
}

function finish(e: Enemy, cooldown: number): void {
  e.charge = 0
  e.cd = cooldown
  setState(e, 'move', 0)
}
