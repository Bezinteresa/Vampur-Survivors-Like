import type { Ai, BossAttack, EnemyDef } from './data/bestiary'
import { think } from './enemyAi'
import type { RollPerk } from './data/heroes'
import type { StatusEffect, WeaponDef } from './data/weapons'
import type { OwnBonus } from './loadout'
import { SpatialGrid } from './SpatialGrid'
import { BASE_STATS, type Stats } from './stats'

// Combat simulation: positions, weapons, collisions, pickups. Knows nothing about waves, shop or UI.

export const ARENA_W = 1400
export const ARENA_H = 2000
export const HALF_W = ARENA_W / 2
export const HALF_H = ARENA_H / 2
const MAX_ENEMIES = 1000
const MAX_PICKUPS = 500
const PICKUP_SPEED = 700
const CHAIN_JUMP_RANGE = 170
const DRONE_ORBIT = 60
const MEDKIT_HEAL = 0.2 // share of max HP
export const CHEST_RADIUS = 70
const CHEST_OPEN_TIME = 2.5
const COLLECTOR_PERIOD = 5
const COLLECTOR_RADIUS = 450
const COIN_DROP_CHANCE = 0.55 // regular enemies drop coins only this often (balance: 2–3 purchases per wave)

export interface Enemy {
  id: number
  def: EnemyDef
  boss: boolean
  x: number
  y: number
  kx: number // knockback velocity
  ky: number
  r: number
  hp: number
  maxHp: number
  dmg: number
  speed: number
  flash: number
  state: 'move' | 'windup' | 'act' | 'recover'
  stateT: number
  cd: number // attack cooldown
  aimX: number // attack direction locked at windup
  aimY: number
  windupTime: number
  charge: number // 0..1 while charging, drives the colour shift
  side: number // ±1: which way a ranged enemy circles
  attack: BossAttack | null
  attackIdx: number
  invulnerable: boolean // Koschei while his egg is whole
  mortal: boolean // Koschei after the egg broke
  burnT: number
  burnDps: number
  burnSrc: WeaponSlot | null
  bleedT: number
  bleedDps: number
  bleedSrc: WeaponSlot | null
  freezeT: number
}

export interface Projectile {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  dmg: number
  pierce: number
  life: number
  hits: number[]
  src: WeaponSlot
}

export interface Pickup {
  x: number
  y: number
  value: number // coins; 0 for a medkit
  medkit: boolean
  magnet: boolean
  taken: boolean
}

export interface SpawnMarker {
  x: number
  y: number
  t: number
  defId: string
}

export interface Swing {
  x: number
  y: number
  angle: number
  range: number
  t: number
  full: boolean // shockwave: whole circle instead of an arc
}

export interface Bolt {
  pts: number[] // x0,y0,x1,y1 per segment
  t: number
}

export interface WeaponSlot {
  def: WeaponDef
  tier: number // 0..4
  cd: number
  orbit?: { x: number; y: number } // drone position
  dmgWave: number // damage dealt this wave
  dmgTotal: number // damage dealt this run
  own: OwnBonus | null // lobby perks that touch only this weapon
  aim: number // direction of the last attack, radians (the weapon picture turns to it)
}

export interface Turret {
  x: number
  y: number
  life: number
  cd: number
  slot: WeaponSlot
}

// Supply chest: stand next to it until the ring fills, then pick a free reward.
export interface Chest {
  x: number
  y: number
  progress: number // 0..1
}

// Enemy shot: pellet, or a homing rocket when `turn` > 0 (radians per second).
export interface Hostile {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  dmg: number
  life: number
  turn: number
}

// Enemy beam anchored where it was cast: thin warning line while charging, then a short hit window.
// `sweep` rotates it during the hit window (two beams closing like scissors).
export interface Beam {
  x: number
  y: number
  angle: number
  sweep: number
  len: number
  width: number
  dmg: number
  charge: number
  active: number
  t: number
  hit: boolean
}

// Poison (hurts the hero) or the hero's burning ground (hurts enemies).
export interface Puddle {
  x: number
  y: number
  r: number
  dps: number
  life: number
  fire?: boolean
}

export function beamAngle(b: Beam): number {
  const k = b.t <= b.charge ? 0 : Math.min(1, (b.t - b.charge) / b.active)
  return b.angle + b.sweep * k
}

export const SWING_LIFE = 0.18
export const BOLT_LIFE = 0.15

export class World {
  readonly player = { x: 0, y: 0, r: 16, hp: 100, fx: 0, fy: 1, iframes: 0, hurt: 0, rollT: 0, rollDx: 0, rollDy: 0, rollSpeed: 1 }
  enemies: Enemy[] = []
  projectiles: Projectile[] = []
  pickups: Pickup[] = []
  markers: SpawnMarker[] = []
  swings: Swing[] = []
  bolts: Bolt[] = []
  turrets: Turret[] = []
  hostiles: Hostile[] = []
  beams: Beam[] = []
  puddles: Puddle[] = []
  weapons: WeaponSlot[] = []
  roster: Record<string, EnemyDef> = {} // enemies of the current location, keyed by archetype
  heroPerk: RollPerk | null = null
  private buff: { kind: RollPerk['kind']; value: number; t: number } | null = null // after-roll bonus
  private trailT = 0
  chest: Chest | null = null
  chestOpened = false // set when the ring fills; the game shows the reward and clears it
  stats: Stats = { ...BASE_STATS }
  hpMul = 1
  dmgMul = 1
  bossMul = 1 // map level multiplier for the boss
  sets = new Set<string>() // active lobby set bonuses
  attackBonus = 0 // from abilities
  standHeal = 0 // number of "heal while standing" items
  collectors = 0 // number of coin-collector helpers
  collected = 0 // coins picked up since the game last drained it
  kills = 0
  damageTaken: Record<string, number> = {} // by source, for balancing
  boss: Enemy | null = null
  bossKilled = false
  private readonly grid = new SpatialGrid(ARENA_W, ARENA_H, 80, MAX_ENEMIES)
  private nextId = 1
  private orbitT = 0
  private collectorT = 0

  reset(stats: Stats): void {
    this.stats = stats
    this.weapons = []
    this.pickups = []
    this.kills = 0
    this.damageTaken = {}
    this.collected = 0
    this.standHeal = 0
    this.collectors = 0
    this.clearWave()
    const p = this.player
    p.x = 0
    p.y = 0
    p.hp = stats.maxHp
    p.iframes = p.hurt = p.rollT = 0
  }

  clearWave(): void {
    this.enemies = []
    this.projectiles = []
    this.markers = []
    this.swings = []
    this.bolts = []
    this.turrets = []
    this.hostiles = []
    this.beams = []
    this.puddles = []
    this.chest = null
    this.chestOpened = false
    this.boss = null
    this.bossKilled = false
  }

  queueSpawn(defId: string, x: number, y: number, delay: number): void {
    this.markers.push({ x, y, t: delay, defId })
  }

  placeChest(x: number, y: number): void {
    this.chest = { x, y, progress: 0 }
  }

  startRoll(speedMul: number, duration: number, mx: number, my: number): void {
    const p = this.player
    const len = Math.hypot(mx, my)
    p.rollDx = len > 0.1 ? mx / len : p.fx
    p.rollDy = len > 0.1 ? my / len : p.fy
    p.rollT = duration
    p.rollSpeed = speedMul
  }

  step(dt: number, mx: number, my: number): void {
    this.updatePlayer(dt, mx, my)
    this.updateMarkers(dt)
    this.rebuildGrid()
    this.updateEnemies(dt)
    this.updateHazards(dt)
    this.rebuildGrid()
    this.updateWeapons(dt)
    this.updateTurrets(dt)
    this.updateProjectiles(dt)
    this.removeDead()
    this.updatePickups(dt)
    this.updateChest(dt)
    this.updateFx(dt)
  }

  private updatePlayer(dt: number, mx: number, my: number): void {
    const p = this.player
    let vx: number
    let vy: number
    const len = Math.hypot(mx, my)
    if (p.rollT > 0) {
      p.rollT -= dt
      this.duringRoll(dt)
      if (p.rollT <= 0) this.afterRoll()
      const s = this.stats.moveSpeed * p.rollSpeed
      vx = p.rollDx * s
      vy = p.rollDy * s
    } else {
      if (len > 1) {
        mx /= len
        my /= len
      }
      if (len > 0.1) {
        p.fx = mx / Math.min(1, len)
        p.fy = my / Math.min(1, len)
      }
      const speed = Math.max(60, this.stats.moveSpeed) * (1 + this.buffValue('speedAfter'))
      vx = mx * speed
      vy = my * speed
    }
    p.x = clamp(p.x + vx * dt, -HALF_W + p.r, HALF_W - p.r)
    p.y = clamp(p.y + vy * dt, -HALF_H + p.r, HALF_H - p.r)
    p.iframes -= dt
    p.hurt -= dt
    if (this.buff && (this.buff.t -= dt) <= 0) this.buff = null
    if (p.hp <= 0) return
    let regen = this.stats.regen
    // "Meditation": heals while standing, drains a little while moving (never kills).
    if (this.standHeal) regen += this.stats.maxHp * (len > 0.1 ? -0.005 : 0.02) * this.standHeal
    p.hp = Math.min(this.stats.maxHp, p.hp + regen * dt)
    if (p.hp < 1 && regen < 0) p.hp = 1
  }

  // ---------- bogatyr roll perks ----------

  private buffValue(kind: RollPerk['kind']): number {
    return this.buff?.kind === kind ? this.buff.value : 0
  }

  private duringRoll(dt: number): void {
    const perk = this.heroPerk
    const p = this.player
    if (perk?.kind === 'magnet') {
      const r2 = (this.stats.pickupRadius * perk.mul) ** 2
      for (const pk of this.pickups) if ((pk.x - p.x) ** 2 + (pk.y - p.y) ** 2 < r2) pk.magnet = true
    }
    if (perk?.kind === 'fireTrail' && (this.trailT -= dt) <= 0) {
      this.trailT = 0.05
      this.puddles.push({ x: p.x, y: p.y, r: 26, dps: perk.dps, life: 2.5, fire: true })
    }
  }

  private afterRoll(): void {
    const perk = this.heroPerk
    const p = this.player
    if (!perk) return
    switch (perk.kind) {
      case 'dodgeAfter':
      case 'speedAfter':
      case 'attackSpeedAfter':
        this.buff = { kind: perk.kind, value: perk.value, t: perk.time }
        break
      case 'bomb': {
        const x = p.x + p.fx * 130
        const y = p.y + p.fy * 130
        for (const e of this.enemies) {
          if (e.hp > 0 && Math.hypot(e.x - x, e.y - y) - e.r < perk.radius) {
            this.hitEnemy(e, perk.damage * (1 + this.stats.damagePct), 0, 0, null, 'burn')
          }
        }
        this.swings.push({ x, y, angle: 0, range: perk.radius, t: 0, full: true })
        break
      }
      case 'shockwave':
        this.shockwave(perk.damage, perk.radius)
        break
      case 'medkit':
        this.drop(p.x - p.fx * 30, p.y - p.fy * 30, 0, true)
        break
      case 'magnet':
      case 'fireTrail':
        break
    }
  }

  private updateMarkers(dt: number): void {
    for (const m of this.markers) {
      m.t -= dt
      if (m.t <= 0) this.spawnEnemy(this.roster[m.defId], m.x, m.y)
    }
    this.markers = this.markers.filter((m) => m.t > 0)
  }

  spawnEnemy(def: EnemyDef, x: number, y: number): Enemy | null {
    if (!def || this.enemies.length >= MAX_ENEMIES) return null
    const boss = def.ai === 'boss'
    const hp = boss ? def.hp * this.bossMul : def.hp * this.hpMul
    const e: Enemy = {
      id: this.nextId++, def, boss, x, y, kx: 0, ky: 0, r: def.radius,
      hp, maxHp: hp, dmg: boss ? def.dmg * Math.sqrt(this.bossMul) : def.dmg * this.dmgMul, speed: def.speed * (0.9 + Math.random() * 0.2),
      flash: 0, state: 'move', stateT: boss ? 2.5 : def.ai === 'coin' ? 14 : 0, cd: 1 + Math.random() * 1.5,
      aimX: 0, aimY: 1, windupTime: 1, charge: 0, side: Math.random() < 0.5 ? -1 : 1, attack: null, attackIdx: 0, invulnerable: false, mortal: false,
      burnT: 0, burnDps: 0, burnSrc: null, bleedT: 0, bleedDps: 0, bleedSrc: null, freezeT: 0,
    }
    this.enemies.push(e)
    if (boss) this.boss = e
    return e
  }

  // ---------- enemy attacks ----------

  fireHostile(x: number, y: number, angle: number, speed: number, dmg: number, r = 6, turn = 0, life = 4): void {
    this.hostiles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r, dmg, life, turn })
  }

  addBeam(x: number, y: number, angle: number, dmg: number, charge: number, active: number, sweep: number, len = 650, width = 14): void {
    this.beams.push({ x, y, angle, sweep, len, width, dmg, charge, active, t: 0, hit: false })
  }

  summon(ai: Ai, count: number, x: number, y: number): void {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      this.queueSpawn(ai, clamp(x + Math.cos(a) * 110, -HALF_W + 30, HALF_W - 30), clamp(y + Math.sin(a) * 110, -HALF_H + 30, HALF_H - 30), 0.6)
    }
  }

  puddlesAroundPlayer(count: number, dps: number): void {
    const p = this.player
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const d = i === 0 ? 0 : 70 + Math.random() * 90
      this.puddles.push({ x: p.x + Math.cos(a) * d, y: p.y + Math.sin(a) * d, r: 55, dps, life: 6 })
    }
  }

  private updateHazards(dt: number): void {
    const p = this.player
    for (const h of this.hostiles) {
      if (h.turn > 0) {
        // Homing rocket: turns slowly toward the hero, easy to sidestep.
        const want = Math.atan2(p.y - h.y, p.x - h.x)
        const cur = Math.atan2(h.vy, h.vx)
        const turn = clamp(angleDiff(want, cur), -h.turn * dt, h.turn * dt)
        const speed = Math.hypot(h.vx, h.vy)
        h.vx = Math.cos(cur + turn) * speed
        h.vy = Math.sin(cur + turn) * speed
      }
      h.x += h.vx * dt
      h.y += h.vy * dt
      h.life -= dt
      if (Math.abs(h.x) > HALF_W + 50 || Math.abs(h.y) > HALF_H + 50) h.life = 0
      if (h.life > 0 && Math.hypot(p.x - h.x, p.y - h.y) < h.r + p.r) {
        this.hurtPlayer(h.dmg, h.turn > 0 ? 'rocket' : 'shot')
        h.life = 0
      }
    }
    this.hostiles = this.hostiles.filter((h) => h.life > 0)

    for (const b of this.beams) {
      b.t += dt
      if (b.hit || b.t <= b.charge) continue
      const a = beamAngle(b)
      const ux = Math.cos(a)
      const uy = Math.sin(a)
      const along = (p.x - b.x) * ux + (p.y - b.y) * uy
      const across = Math.abs(-(p.x - b.x) * uy + (p.y - b.y) * ux)
      if (along > 0 && along < b.len && across < b.width / 2 + p.r) {
        this.hurtPlayer(b.dmg, 'beam')
        b.hit = true
      }
    }
    this.beams = this.beams.filter((b) => b.t < b.charge + b.active)

    const armor = 15 / (15 + Math.max(0, this.stats.armor))
    for (const pd of this.puddles) {
      pd.life -= dt
      if (pd.fire) {
        this.grid.forEachNear(pd.x, pd.y, pd.r + 30, (i) => {
          const e = this.enemies[i]
          if (e.hp > 0 && Math.hypot(e.x - pd.x, e.y - pd.y) < pd.r + e.r) this.hitEnemy(e, pd.dps * (1 + this.stats.damagePct) * dt, 0, 0, null, null, true)
        })
        continue
      }
      if (p.hp > 0 && Math.hypot(p.x - pd.x, p.y - pd.y) < pd.r) {
        p.hp -= pd.dps * armor * dt
        this.damageTaken.puddle = (this.damageTaken.puddle ?? 0) + pd.dps * armor * dt
        p.hurt = 0.1
      }
    }
    this.puddles = this.puddles.filter((pd) => pd.life > 0)
  }

  private rebuildGrid(): void {
    this.grid.clear()
    const list = this.enemies
    for (let i = 0; i < list.length; i++) if (list[i].hp > 0) this.grid.insert(i, list[i].x, list[i].y)
  }

  private updateEnemies(dt: number): void {
    const p = this.player
    const list = this.enemies
    const decay = Math.exp(-8 * dt)
    for (const e of list) {
      if (e.hp <= 0) continue
      this.tickStatus(e, dt)
      if (e.hp <= 0) continue
      const dx0 = p.x - e.x
      const dy0 = p.y - e.y
      const d = Math.hypot(dx0, dy0) || 1
      let [vx, vy] = think(this, e, dt, dx0 / d, dy0 / d, d)
      if (e.hp <= 0) continue // a thief that got away
      if (e.freezeT > 0) {
        vx *= e.boss ? 0.7 : 0.3
        vy *= e.boss ? 0.7 : 0.3
      }
      // Push apart from neighbours so the crowd does not collapse into one point.
      this.grid.forEachNear(e.x, e.y, e.r * 2, (j) => {
        const o = list[j]
        if (o === e) return
        const ox = e.x - o.x
        const oy = e.y - o.y
        const rr = e.r + o.r
        const d2 = ox * ox + oy * oy
        if (d2 >= rr * rr || d2 === 0) return
        const od = Math.sqrt(d2)
        const push = ((rr - od) / od) * (e.boss ? 0.05 : 0.3)
        e.x += ox * push
        e.y += oy * push
      })
      e.x = clamp(e.x + (vx + e.kx) * dt, -HALF_W + e.r, HALF_W - e.r)
      e.y = clamp(e.y + (vy + e.ky) * dt, -HALF_H + e.r, HALF_H - e.r)
      e.kx *= decay
      e.ky *= decay
      e.flash -= dt
      if (e.dmg > 0 && d < e.r + p.r) this.hurtPlayer(e.dmg, e.boss ? 'boss' : 'contact')
    }
  }

  private tickStatus(e: Enemy, dt: number): void {
    if (e.freezeT > 0) e.freezeT -= dt
    if (e.burnT > 0) {
      e.burnT -= dt
      this.hitEnemy(e, e.burnDps * dt, 0, 0, e.burnSrc, null, true)
    }
    if (e.bleedT > 0) {
      e.bleedT -= dt
      this.hitEnemy(e, e.bleedDps * dt, 0, 0, e.bleedSrc, null, true)
    }
  }

  private applyStatus(e: Enemy, effect: StatusEffect, dmg: number, src: WeaponSlot | null): void {
    switch (effect) {
      case 'burn':
        e.burnT = 3
        e.burnDps = Math.max(e.burnDps, dmg * 0.35)
        e.burnSrc = src
        break
      case 'bleed':
        e.bleedT = 4
        e.bleedDps = Math.max(e.bleedDps, dmg * 0.25)
        e.bleedSrc = src
        break
      case 'freeze':
        e.freezeT = e.boss ? 0.6 : 1.5
        break
    }
  }

  private hurtPlayer(dmg: number, source: string): void {
    const p = this.player
    if (p.iframes > 0 || p.rollT > 0 || p.hp <= 0) return
    if (Math.random() < Math.min(0.6, this.stats.dodge + this.buffValue('dodgeAfter'))) {
      p.iframes = 0.25
      return
    }
    if (this.sets.has('guard') && Math.random() < 0.15) dmg *= 0.5
    const taken = dmg * (15 / (15 + Math.max(0, this.stats.armor)))
    p.hp -= taken
    this.damageTaken[source] = (this.damageTaken[source] ?? 0) + taken
    p.iframes = 0.6
    p.hurt = 0.2
  }

  private attackSpeed(w: WeaponSlot): number {
    const p = this.player
    const rage = this.sets.has('hunter') && p.hp < this.stats.maxHp * 0.4 ? 0.2 : 0
    return Math.max(0.2, 1 + this.stats.attackSpeed + this.attackBonus + rage + (w.own?.attackSpeed ?? 0) + this.buffValue('attackSpeedAfter'))
  }

  private updateWeapons(dt: number): void {
    // Drones circle the hero, spread evenly.
    const drones = this.weapons.filter((w) => w.def.behavior === 'drone')
    this.orbitT += dt * 1.8
    drones.forEach((w, k) => {
      const a = this.orbitT + (k * Math.PI * 2) / drones.length
      w.orbit = { x: this.player.x + Math.cos(a) * DRONE_ORBIT, y: this.player.y + Math.sin(a) * DRONE_ORBIT }
    })
    for (const w of this.weapons) {
      w.cd -= dt * this.attackSpeed(w)
      if (w.cd > 0) continue
      w.cd = this.fire(w) ? w.def.cooldown : 0
    }
  }

  private fire(w: WeaponSlot): boolean {
    const p = this.player
    const def = w.def
    const range = def.range + this.stats.range
    switch (def.behavior) {
      case 'shot':
        return this.shoot(w, p.x, p.y, range)
      case 'drone':
        return !!w.orbit && this.shoot(w, w.orbit.x, w.orbit.y, range)
      case 'turret':
        this.turrets.push({ x: p.x, y: p.y, life: def.duration, cd: 0.3, slot: w })
        return true
      case 'swing': {
        const t = this.nearest(p.x, p.y, range + 30)
        if (!t) return false
        const angle = Math.atan2(t.y - p.y, t.x - p.x)
        w.aim = angle
        const dmg = this.damage(w)
        this.grid.forEachNear(p.x, p.y, range + 70, (i) => {
          const e = this.enemies[i]
          const ex = e.x - p.x
          const ey = e.y - p.y
          const d = Math.hypot(ex, ey)
          if (d - e.r > range) return
          if (Math.abs(angleDiff(Math.atan2(ey, ex), angle)) > def.arc / 2 && d > e.r) return
          this.hitEnemy(e, dmg, (ex / (d || 1)) * 260, (ey / (d || 1)) * 260, w, this.effectOf(w))
        })
        this.swings.push({ x: p.x, y: p.y, angle, range, t: 0, full: false })
        return true
      }
      case 'chain': {
        const first = this.nearest(p.x, p.y, range)
        if (!first) return false
        w.aim = Math.atan2(first.y - p.y, first.x - p.x)
        const dmg = this.damage(w)
        const hit = [first.id]
        const pts = [p.x, p.y, first.x, first.y]
        this.hitEnemy(first, dmg, 0, 0, w, this.effectOf(w))
        let cur = first
        for (let j = 0; j < def.jumps + w.tier; j++) {
          const next = this.nearest(cur.x, cur.y, CHAIN_JUMP_RANGE, hit)
          if (!next) break
          hit.push(next.id)
          pts.push(cur.x, cur.y, next.x, next.y)
          this.hitEnemy(next, dmg, 0, 0, w, this.effectOf(w))
          cur = next
        }
        this.bolts.push({ pts, t: 0 })
        return true
      }
    }
  }

  private shoot(w: WeaponSlot, x: number, y: number, range: number): boolean {
    const def = w.def
    const t = this.nearest(x, y, range)
    if (!t) return false
    const angle = Math.atan2(t.y - y, t.x - x)
    w.aim = angle
    for (let k = 0; k < def.count; k++) {
      const a = angle + (k - (def.count - 1) / 2) * def.spread + (Math.random() - 0.5) * (def.count > 1 ? 0.05 : def.spread)
      this.projectiles.push({
        x, y, vx: Math.cos(a) * def.projSpeed, vy: Math.sin(a) * def.projSpeed,
        r: 5, dmg: this.damage(w), pierce: def.pierce, life: range / def.projSpeed, hits: [], src: w,
      })
    }
    return true
  }

  private updateTurrets(dt: number): void {
    for (const t of this.turrets) {
      t.life -= dt
      t.cd -= dt * this.attackSpeed(t.slot)
      if (t.cd > 0) continue
      t.cd = this.shoot(t.slot, t.x, t.y, t.slot.def.range + this.stats.range) ? t.slot.def.fireRate : 0
    }
    this.turrets = this.turrets.filter((t) => t.life > 0)
  }

  // Damage before crit, with the hero's flat and percent bonuses (also shown in the shop).
  baseDamage(def: WeaponDef, tier: number): number {
    const s = this.stats
    const flat = { melee: s.meleeDmg, bullet: s.bulletDmg, magic: s.magicDmg, mech: s.mechDmg }[def.kind]
    return Math.max(1, (def.damage[tier] + flat) * (1 + s.damagePct))
  }

  private damage(w: WeaponSlot): number {
    let dmg = this.baseDamage(w.def, w.tier) * (1 + (w.own?.damage ?? 0))
    if (w.def.kind === 'mech' && this.sets.has('mechanic')) dmg *= 1.2
    if (Math.random() < this.stats.critChance + (w.own?.crit ?? 0)) dmg *= this.stats.critMult
    return dmg
  }

  // Status a weapon applies; the alchemist set makes every magic weapon burn.
  private effectOf(w: WeaponSlot): StatusEffect | null {
    return w.def.effect ?? (w.def.kind === 'magic' && this.sets.has('alchemist') ? 'burn' : null)
  }

  // ---------- active abilities ----------

  healPlayer(share: number): void {
    const p = this.player
    if (p.hp > 0) p.hp = Math.min(this.stats.maxHp, p.hp + this.stats.maxHp * share)
  }

  freezeAround(radius: number, time: number): void {
    const p = this.player
    for (const e of this.enemies) {
      if (e.hp > 0 && Math.hypot(e.x - p.x, e.y - p.y) < radius) e.freezeT = Math.max(e.freezeT, e.boss ? time * 0.4 : time)
    }
  }

  shockwave(damage: number, radius: number): void {
    const p = this.player
    for (const e of this.enemies) {
      const dx = e.x - p.x
      const dy = e.y - p.y
      const d = Math.hypot(dx, dy) || 1
      if (e.hp <= 0 || d - e.r > radius) continue
      this.hitEnemy(e, damage * (1 + this.stats.damagePct), (dx / d) * 900, (dy / d) * 900, null, null)
    }
    this.swings.push({ x: p.x, y: p.y, angle: 0, range: radius, t: 0, full: true })
  }

  private nearest(x: number, y: number, range: number, exclude?: number[]): Enemy | null {
    // Koschei's egg is the target that matters: weapons aim at it whenever it is in reach.
    const egg = this.boss?.invulnerable ? this.enemies.find((e) => e.def.ai === 'egg' && e.hp > 0) : undefined
    if (egg && !exclude?.includes(egg.id) && (egg.x - x) ** 2 + (egg.y - y) ** 2 < range * range) return egg
    let best: Enemy | null = null
    let bestD = range * range
    this.grid.forEachNear(x, y, range, (i) => {
      const e = this.enemies[i]
      if (e.hp <= 0 || exclude?.includes(e.id)) return
      const d = (e.x - x) ** 2 + (e.y - y) ** 2
      if (d < bestD) {
        bestD = d
        best = e
      }
    })
    return best
  }

  private updateProjectiles(dt: number): void {
    for (const pr of this.projectiles) {
      pr.x += pr.vx * dt
      pr.y += pr.vy * dt
      pr.life -= dt
      if (pr.life <= 0) continue
      this.grid.forEachNear(pr.x, pr.y, pr.r + 60, (i) => {
        if (pr.life <= 0) return
        const e = this.enemies[i]
        if (e.hp <= 0 || pr.hits.includes(e.id)) return
        const rr = pr.r + e.r
        if ((e.x - pr.x) ** 2 + (e.y - pr.y) ** 2 > rr * rr) return
        pr.hits.push(e.id)
        this.hitEnemy(e, pr.dmg, pr.vx * 0.25, pr.vy * 0.25, pr.src, this.effectOf(pr.src))
        if (pr.pierce-- <= 0) pr.life = 0
      })
    }
    this.projectiles = this.projectiles.filter((pr) => pr.life > 0)
  }

  private hitEnemy(e: Enemy, dmg: number, kx: number, ky: number, src: WeaponSlot | null, effect: StatusEffect | null, dot = false): void {
    if (e.hp <= 0) return
    if (e.invulnerable) {
      e.flash = 0.04
      return
    }
    if (e.boss) dmg *= 1 + this.stats.bossDmg
    // Koschei: at 30% health he stops taking damage and his egg appears somewhere on the field.
    if (e.boss && e.def.boss?.immortal && !e.mortal && e.hp - dmg < e.maxHp * 0.3) {
      dmg = Math.max(0, e.hp - e.maxHp * 0.3)
      e.invulnerable = true
      const a = Math.random() * Math.PI * 2
      this.spawnEnemy(this.roster.egg, clamp(this.player.x + Math.cos(a) * 380, -HALF_W + 60, HALF_W - 60), clamp(this.player.y + Math.sin(a) * 380, -HALF_H + 60, HALF_H - 60))
    }
    const dealt = Math.min(dmg, e.hp)
    e.hp -= dmg
    if (src) {
      src.dmgWave += dealt
      src.dmgTotal += dealt
    }
    const p = this.player
    if (this.stats.lifesteal > 0 && p.hp > 0) p.hp = Math.min(this.stats.maxHp, p.hp + dealt * this.stats.lifesteal)
    if (!dot) {
      e.flash = 0.08
      if (effect) this.applyStatus(e, effect, dmg, src)
      if (!e.boss) {
        const k = 1 + this.stats.knockback
        e.kx += kx * k
        e.ky += ky * k
      }
    }
    if (e.hp > 0) return
    this.kills++
    if (e.boss) {
      this.bossKilled = true
      for (let i = 0; i < 30; i++) this.drop(e.x + (Math.random() - 0.5) * 120, e.y + (Math.random() - 0.5) * 120, 2, false)
      return
    }
    this.onDeath(e)
    let value = e.def.ai === 'coin' || Math.random() < COIN_DROP_CHANCE ? e.def.coin : 0
    if (Math.random() < this.stats.profit) value++
    if (e.def.ai === 'coin') {
      for (let i = 0; i < value; i++) this.drop(e.x + (Math.random() - 0.5) * 70, e.y + (Math.random() - 0.5) * 70, 1, false)
    } else if (value > 0) {
      this.drop(e.x, e.y, value, false)
    }
    if (Math.random() < e.def.medkit) this.drop(e.x + 10, e.y, 0, true)
  }

  private onDeath(e: Enemy): void {
    switch (e.def.ai) {
      case 'splitter':
        for (let i = 0; i < 3; i++) {
          const a = (i / 3) * Math.PI * 2
          this.spawnEnemy(this.roster.small, e.x + Math.cos(a) * 18, e.y + Math.sin(a) * 18)
        }
        break
      case 'poison':
        this.puddles.push({ x: e.x, y: e.y, r: 40, dps: e.dmg * 0.8, life: 5 })
        break
      case 'egg':
        // The needle breaks: Koschei falls.
        if (this.boss && this.boss.hp > 0) {
          this.boss.invulnerable = false
          this.boss.mortal = true
          this.hitEnemy(this.boss, this.boss.hp + 1, 0, 0, null, null)
        }
        break
    }
  }

  private drop(x: number, y: number, value: number, medkit: boolean): void {
    if (!medkit && this.pickups.length >= MAX_PICKUPS) {
      this.pickups[Math.floor(Math.random() * this.pickups.length)].value += value
      return
    }
    this.pickups.push({ x, y, value, medkit, magnet: false, taken: false })
  }

  private removeDead(): void {
    if (this.boss && this.boss.hp <= 0) this.boss = null
    this.enemies = this.enemies.filter((e) => e.hp > 0)
  }

  private updatePickups(dt: number): void {
    const p = this.player
    const radius2 = this.stats.pickupRadius ** 2
    if (this.collectors > 0 && (this.collectorT += dt) >= COLLECTOR_PERIOD) {
      this.collectorT = 0
      const r2 = (COLLECTOR_RADIUS * this.collectors) ** 2
      for (const pk of this.pickups) if (!pk.medkit && (p.x - pk.x) ** 2 + (p.y - pk.y) ** 2 < r2) pk.magnet = true
    }
    for (const pk of this.pickups) {
      const dx = p.x - pk.x
      const dy = p.y - pk.y
      const d2 = dx * dx + dy * dy
      if (!pk.magnet && d2 < radius2) pk.magnet = true
      if (!pk.magnet) continue
      const d = Math.sqrt(d2)
      if (d < p.r + 8) {
        pk.taken = true
        if (pk.medkit) p.hp = Math.min(this.stats.maxHp, p.hp + this.stats.maxHp * MEDKIT_HEAL * (1 + this.stats.medkitHeal))
        else this.collected += pk.value
        continue
      }
      const step = Math.min(d, PICKUP_SPEED * dt)
      pk.x += (dx / d) * step
      pk.y += (dy / d) * step
    }
    this.pickups = this.pickups.filter((pk) => !pk.taken)
  }

  private updateChest(dt: number): void {
    const c = this.chest
    if (!c) return
    const inside = Math.hypot(this.player.x - c.x, this.player.y - c.y) < CHEST_RADIUS
    c.progress = inside ? c.progress + dt / CHEST_OPEN_TIME : Math.max(0, c.progress - dt / (CHEST_OPEN_TIME * 2))
    if (c.progress >= 1) {
      this.chest = null
      this.chestOpened = true
    }
  }

  private updateFx(dt: number): void {
    for (const s of this.swings) s.t += dt
    for (const b of this.bolts) b.t += dt
    this.swings = this.swings.filter((s) => s.t < SWING_LIFE)
    this.bolts = this.bolts.filter((b) => b.t < BOLT_LIFE)
  }
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}

function angleDiff(a: number, b: number): number {
  let d = a - b
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return d
}
