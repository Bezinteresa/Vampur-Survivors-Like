import { ENEMIES, type EnemyDef } from './data/enemies'
import type { WeaponDef } from './data/weapons'
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
  state: 'chase' | 'windup' | 'dash' // boss only
  stateT: number
  dx: number
  dy: number
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
}

export interface Pickup {
  x: number
  y: number
  value: number
  magnet: boolean
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
}

export interface Bolt {
  pts: number[] // x0,y0,x1,y1 per segment
  t: number
}

export interface WeaponSlot {
  def: WeaponDef
  tier: number // 0..3
  cd: number
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
  weapons: WeaponSlot[] = []
  stats: Stats = { ...BASE_STATS }
  hpMul = 1
  dmgMul = 1
  attackBonus = 0 // from abilities
  collected = 0 // coins picked up since the game last drained it
  kills = 0
  boss: Enemy | null = null
  bossKilled = false
  private readonly grid = new SpatialGrid(ARENA_W, ARENA_H, 80, MAX_ENEMIES)
  private nextId = 1

  reset(stats: Stats): void {
    this.stats = stats
    this.weapons = []
    this.pickups = []
    this.kills = 0
    this.collected = 0
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
    this.boss = null
    this.bossKilled = false
  }

  queueSpawn(defId: string, x: number, y: number, delay: number): void {
    this.markers.push({ x, y, t: delay, defId })
  }

  magnetAll(): void {
    for (const pk of this.pickups) pk.magnet = true
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
    this.rebuildGrid()
    this.updateWeapons(dt)
    this.updateProjectiles(dt)
    this.removeDead()
    this.updatePickups(dt)
    this.updateFx(dt)
  }

  private updatePlayer(dt: number, mx: number, my: number): void {
    const p = this.player
    let vx: number
    let vy: number
    if (p.rollT > 0) {
      p.rollT -= dt
      const s = this.stats.moveSpeed * p.rollSpeed
      vx = p.rollDx * s
      vy = p.rollDy * s
    } else {
      const len = Math.hypot(mx, my)
      if (len > 1) {
        mx /= len
        my /= len
      }
      if (len > 0.1) {
        p.fx = mx / Math.min(1, len)
        p.fy = my / Math.min(1, len)
      }
      vx = mx * this.stats.moveSpeed
      vy = my * this.stats.moveSpeed
    }
    p.x = clamp(p.x + vx * dt, -HALF_W + p.r, HALF_W - p.r)
    p.y = clamp(p.y + vy * dt, -HALF_H + p.r, HALF_H - p.r)
    p.iframes -= dt
    p.hurt -= dt
    if (p.hp > 0) p.hp = Math.min(this.stats.maxHp, p.hp + this.stats.regen * dt)
  }

  private updateMarkers(dt: number): void {
    for (const m of this.markers) {
      m.t -= dt
      if (m.t <= 0) this.spawnEnemy(ENEMIES[m.defId], m.x, m.y)
    }
    this.markers = this.markers.filter((m) => m.t > 0)
  }

  private spawnEnemy(def: EnemyDef, x: number, y: number): void {
    if (this.enemies.length >= MAX_ENEMIES) return
    const boss = def.behavior === 'boss'
    const hp = boss ? def.hp : def.hp * this.hpMul
    const e: Enemy = {
      id: this.nextId++, def, boss, x, y, kx: 0, ky: 0, r: def.radius,
      hp, maxHp: hp, dmg: boss ? def.dmg : def.dmg * this.dmgMul, speed: def.speed * (0.9 + Math.random() * 0.2),
      flash: 0, state: 'chase', stateT: 3, dx: 0, dy: 0,
    }
    this.enemies.push(e)
    if (boss) this.boss = e
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
      let dx = p.x - e.x
      let dy = p.y - e.y
      const d = Math.hypot(dx, dy) || 1
      dx /= d
      dy /= d
      let speed = e.speed
      if (e.boss) {
        e.stateT -= dt
        if (e.state === 'chase' && e.stateT <= 0) {
          e.state = 'windup'
          e.stateT = 0.8
          e.dx = dx
          e.dy = dy
        } else if (e.state === 'windup') {
          speed = 0
          e.dx = dx
          e.dy = dy
          if (e.stateT <= 0) {
            e.state = 'dash'
            e.stateT = 0.55
          }
        } else if (e.state === 'dash') {
          speed = 520
          dx = e.dx
          dy = e.dy
          if (e.stateT <= 0) {
            e.state = 'chase'
            e.stateT = 3 + Math.random() * 1.5
          }
        }
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
      e.x = clamp(e.x + (dx * speed + e.kx) * dt, -HALF_W + e.r, HALF_W - e.r)
      e.y = clamp(e.y + (dy * speed + e.ky) * dt, -HALF_H + e.r, HALF_H - e.r)
      e.kx *= decay
      e.ky *= decay
      e.flash -= dt
      if (d < e.r + p.r) this.hurtPlayer(e.dmg)
    }
  }

  private hurtPlayer(dmg: number): void {
    const p = this.player
    if (p.iframes > 0 || p.rollT > 0 || p.hp <= 0) return
    if (Math.random() < Math.min(0.6, this.stats.dodge)) {
      p.iframes = 0.25
      return
    }
    p.hp -= dmg * (15 / (15 + Math.max(0, this.stats.armor)))
    p.iframes = 0.6
    p.hurt = 0.2
  }

  private updateWeapons(dt: number): void {
    const speed = 1 + this.stats.attackSpeed + this.attackBonus
    for (const w of this.weapons) {
      w.cd -= dt * speed
      if (w.cd > 0) continue
      w.cd = this.fire(w) ? w.def.cooldown : 0
    }
  }

  private fire(w: WeaponSlot): boolean {
    const p = this.player
    const def = w.def
    const range = def.range + this.stats.range
    switch (def.behavior) {
      case 'shot': {
        const t = this.nearest(p.x, p.y, range)
        if (!t) return false
        const angle = Math.atan2(t.y - p.y, t.x - p.x)
        for (let k = 0; k < def.count; k++) {
          const a = angle + (k - (def.count - 1) / 2) * def.spread + (Math.random() - 0.5) * (def.count > 1 ? 0.05 : def.spread)
          this.projectiles.push({
            x: p.x, y: p.y, vx: Math.cos(a) * def.projSpeed, vy: Math.sin(a) * def.projSpeed,
            r: 5, dmg: this.damage(w), pierce: def.pierce, life: range / def.projSpeed, hits: [],
          })
        }
        return true
      }
      case 'swing': {
        const t = this.nearest(p.x, p.y, range + 30)
        if (!t) return false
        const angle = Math.atan2(t.y - p.y, t.x - p.x)
        const dmg = this.damage(w)
        this.grid.forEachNear(p.x, p.y, range + 70, (i) => {
          const e = this.enemies[i]
          const ex = e.x - p.x
          const ey = e.y - p.y
          const d = Math.hypot(ex, ey)
          if (d - e.r > range) return
          if (Math.abs(angleDiff(Math.atan2(ey, ex), angle)) > def.arc / 2 && d > e.r) return
          this.hitEnemy(e, dmg, (ex / (d || 1)) * 260, (ey / (d || 1)) * 260)
        })
        this.swings.push({ x: p.x, y: p.y, angle, range, t: 0 })
        return true
      }
      case 'chain': {
        const first = this.nearest(p.x, p.y, range)
        if (!first) return false
        const dmg = this.damage(w)
        const hit = [first.id]
        const pts = [p.x, p.y, first.x, first.y]
        this.hitEnemy(first, dmg, 0, 0)
        let cur = first
        for (let j = 0; j < def.jumps + w.tier; j++) {
          const next = this.nearest(cur.x, cur.y, CHAIN_JUMP_RANGE, hit)
          if (!next) break
          hit.push(next.id)
          pts.push(cur.x, cur.y, next.x, next.y)
          this.hitEnemy(next, dmg, 0, 0)
          cur = next
        }
        this.bolts.push({ pts, t: 0 })
        return true
      }
    }
  }

  private damage(w: WeaponSlot): number {
    const s = this.stats
    const flat = w.def.kind === 'melee' ? s.meleeDmg : w.def.kind === 'ranged' ? s.rangedDmg : s.elementDmg
    let dmg = (w.def.damage[w.tier] + flat) * (1 + s.damagePct)
    if (Math.random() < s.critChance) dmg *= s.critMult
    return Math.max(1, dmg)
  }

  private nearest(x: number, y: number, range: number, exclude?: number[]): Enemy | null {
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
        this.hitEnemy(e, pr.dmg, pr.vx * 0.25, pr.vy * 0.25)
        if (pr.pierce-- <= 0) pr.life = 0
      })
    }
    this.projectiles = this.projectiles.filter((pr) => pr.life > 0)
  }

  private hitEnemy(e: Enemy, dmg: number, kx: number, ky: number): void {
    if (e.hp <= 0) return
    if (e.boss) dmg *= 1 + this.stats.bossDmg
    e.hp -= dmg
    e.flash = 0.08
    if (!e.boss) {
      const k = 1 + this.stats.knockback
      e.kx += kx * k
      e.ky += ky * k
    }
    if (e.hp > 0) return
    this.kills++
    if (e.boss) {
      this.bossKilled = true
      for (let i = 0; i < 30; i++) this.dropCoin(e.x + (Math.random() - 0.5) * 120, e.y + (Math.random() - 0.5) * 120, 2)
      return
    }
    let value = e.def.coin
    if (Math.random() < this.stats.profit) value++
    this.dropCoin(e.x, e.y, value)
  }

  private dropCoin(x: number, y: number, value: number): void {
    if (this.pickups.length >= MAX_PICKUPS) {
      this.pickups[Math.floor(Math.random() * this.pickups.length)].value += value
      return
    }
    this.pickups.push({ x, y, value, magnet: false })
  }

  private removeDead(): void {
    if (this.boss && this.boss.hp <= 0) this.boss = null
    this.enemies = this.enemies.filter((e) => e.hp > 0)
  }

  private updatePickups(dt: number): void {
    const p = this.player
    const radius2 = this.stats.pickupRadius ** 2
    for (const pk of this.pickups) {
      const dx = p.x - pk.x
      const dy = p.y - pk.y
      const d2 = dx * dx + dy * dy
      if (!pk.magnet && d2 < radius2) pk.magnet = true
      if (!pk.magnet) continue
      const d = Math.sqrt(d2)
      if (d < p.r + 8) {
        this.collected += pk.value
        pk.value = 0
        continue
      }
      const step = Math.min(d, PICKUP_SPEED * dt)
      pk.x += (dx / d) * step
      pk.y += (dy / d) * step
    }
    this.pickups = this.pickups.filter((pk) => pk.value > 0)
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
