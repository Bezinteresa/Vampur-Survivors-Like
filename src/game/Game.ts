import { reactive } from 'vue'
import { ABILITIES, DEFAULT_LOADOUT, type AbilityDef } from './data/abilities'
import { CARD_TIER_MUL, UPGRADES } from './data/upgrades'
import { WAVE_COUNT, enemyScale, waveDef, type WaveDef } from './data/waves'
import { KIND_NAMES, WEAPONS, WEAPON_IDS, weaponDesc, weaponPrice } from './data/weapons'
import { Input } from './Input'
import { Renderer } from './Renderer'
import { BASE_STATS, STAT_LABELS, formatStat, isPercentStat, type Stats } from './stats'
import { HALF_H, HALF_W, World } from './World'

// Run flow: waves, timer, spawning, coins (= experience), level-up cards, shop. Owns the loop.

export type Screen = 'menu' | 'wave' | 'waveEnd' | 'levelup' | 'shop' | 'paused' | 'gameover' | 'victory'

export interface Card {
  stat: keyof Stats
  name: string
  tier: number
  amount: number
  text: string
  before: string
  after: string
}

export interface Offer {
  weaponId: string
  name: string
  tier: number
  price: number
  desc: string[]
  locked: boolean
  sold: boolean
}

interface AbilityState {
  def: AbilityDef
  cd: number
  active: number
}

const STEP = 1 / 60
const MAX_WEAPONS = 6
const MAX_TIER = 3
const WAVE_END_TIME = 1.4

export class Game {
  readonly world = new World()
  readonly input: Input
  private readonly renderer: Renderer
  private stats: Stats = { ...BASE_STATS }
  private wave: WaveDef = waveDef(1)
  private waveTime = 0
  private spawnTimer = 0
  private endTimer = 0
  private bannerTime = 0
  private victory = false
  private resumeTo: Screen = 'wave'
  private abilities: AbilityState[] = []
  private cardRerolls = 0
  private shopRerolls = 0
  private raf = 0
  private last = 0
  private acc = 0
  private time = 0
  private readonly resizeObserver: ResizeObserver

  readonly ui = reactive({
    screen: 'menu' as Screen,
    hp: 0,
    maxHp: 0,
    level: 1,
    xp: 0,
    xpNext: 1,
    coins: 0,
    pendingLevels: 0,
    wave: 0,
    waveCount: WAVE_COUNT,
    timeLeft: 0,
    bossWave: false,
    bossHp: 0,
    bossMaxHp: 1,
    banner: '',
    kills: 0,
    abilities: [] as { id: string; name: string; icon: string; cd: number; cdMax: number; active: boolean }[],
    cards: [] as Card[],
    cardRerollCost: 0,
    offers: [] as Offer[],
    shopRerollCost: 0,
    weapons: [] as { id: string; name: string; kind: string; tier: number; canMerge: boolean; sellPrice: number }[],
    stats: [] as { name: string; value: string }[],
  })

  constructor(host: HTMLElement) {
    this.renderer = new Renderer(host)
    this.input = new Input(host)
    this.input.onAbility = (i) => this.useAbility(i)
    this.input.onPause = () => (this.ui.screen === 'paused' ? this.resume() : this.pause())
    this.resizeObserver = new ResizeObserver(() => this.renderer.resize(host.clientWidth, host.clientHeight))
    this.resizeObserver.observe(host)
    this.renderer.resize(host.clientWidth, host.clientHeight)
    document.addEventListener('visibilitychange', this.onVisibility)
    this.raf = requestAnimationFrame(this.frame)
  }

  dispose(): void {
    cancelAnimationFrame(this.raf)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.resizeObserver.disconnect()
    this.input.dispose()
    this.renderer.dispose()
  }

  // ---------- run flow ----------

  startRun(): void {
    this.stats = { ...BASE_STATS }
    this.world.reset(this.stats)
    this.world.weapons.push({ def: WEAPONS.pistol, tier: 0, cd: 0.5 })
    this.abilities = DEFAULT_LOADOUT.map((id) => ({ def: ABILITIES[id], cd: 0, active: 0 }))
    this.ui.abilities = this.abilities.map((a) => ({ id: a.def.id, name: a.def.name, icon: a.def.icon, cd: 0, cdMax: a.def.cooldown, active: false }))
    this.ui.level = 1
    this.ui.xp = 0
    this.ui.coins = 0
    this.ui.pendingLevels = 0
    this.ui.offers = []
    this.victory = false
    this.syncWeapons()
    this.startWave(1)
  }

  private startWave(n: number): void {
    this.wave = waveDef(n)
    this.waveTime = this.wave.duration
    this.spawnTimer = 0.6
    const scale = enemyScale(n)
    this.world.hpMul = scale.hp
    this.world.dmgMul = scale.dmg
    this.world.clearWave()
    const p = this.world.player
    p.x = 0
    p.y = 0
    p.hp = this.stats.maxHp
    for (const a of this.abilities) a.active = 0
    this.world.attackBonus = 0
    if (this.wave.boss) this.world.queueSpawn('boss', 0, 380, 1.5)
    this.ui.wave = n
    this.ui.bossWave = this.wave.boss
    this.showBanner(this.wave.boss ? 'Босс!' : `Волна ${n}`)
    this.ui.screen = 'wave'
    this.acc = 0
  }

  private endWave(): void {
    this.ui.screen = 'waveEnd'
    this.endTimer = WAVE_END_TIME
    this.world.clearWave()
    this.world.magnetAll()
    this.showBanner(this.victory ? 'Босс повержен!' : 'Волна завершена!')
  }

  private afterWave(): void {
    for (const pk of this.world.pickups) this.world.collected += pk.value
    this.world.pickups = []
    this.drainCoins()
    if (this.victory) {
      this.ui.screen = 'victory'
      return
    }
    this.cardRerolls = 0
    this.shopRerolls = 0
    if (this.ui.pendingLevels > 0) this.openLevelUp()
    else this.openShop()
  }

  nextWave(): void {
    if (this.ui.screen !== 'shop') return
    this.startWave(this.wave.n + 1)
  }

  pause(): void {
    const s = this.ui.screen
    if (s !== 'wave' && s !== 'waveEnd') return
    this.resumeTo = s
    this.ui.screen = 'paused'
    this.input.clear()
  }

  resume(): void {
    if (this.ui.screen !== 'paused') return
    this.ui.screen = this.resumeTo
    this.acc = 0
  }

  toMenu(): void {
    this.world.reset({ ...BASE_STATS })
    this.ui.screen = 'menu'
  }

  useAbility(index: number): void {
    if (this.ui.screen !== 'wave') return
    const a = this.abilities[index]
    if (!a || a.cd > 0) return
    a.cd = a.def.cooldown * (1 - Math.min(0.6, this.stats.cooldownPct))
    a.active = a.def.duration
    if (a.def.effect === 'roll') {
      const mv = this.input.move()
      this.world.startRoll(a.def.power, a.def.duration, mv.x, mv.y)
    }
  }

  // ---------- level-up cards ----------

  private openLevelUp(): void {
    this.ui.cards = this.rollCards()
    this.ui.cardRerollCost = this.rerollCost(this.cardRerolls)
    this.syncStats()
    this.ui.screen = 'levelup'
  }

  pickCard(index: number): void {
    const card = this.ui.cards[index]
    if (this.ui.screen !== 'levelup' || !card) return
    this.stats[card.stat] += card.amount
    if (card.stat === 'maxHp') this.world.player.hp += card.amount
    this.ui.pendingLevels--
    if (this.ui.pendingLevels > 0) this.openLevelUp()
    else this.openShop()
  }

  rerollCards(): void {
    const cost = this.rerollCost(this.cardRerolls)
    if (this.ui.screen !== 'levelup' || this.ui.coins < cost) return
    this.ui.coins -= cost
    this.cardRerolls++
    this.ui.cards = this.rollCards()
    this.ui.cardRerollCost = this.rerollCost(this.cardRerolls)
  }

  private rollCards(): Card[] {
    const pool = shuffle([...UPGRADES]).slice(0, 3)
    const lvl = this.ui.level
    const epic = 0.03 + lvl * 0.008 + this.stats.luck * 0.1
    const rare = 0.15 + lvl * 0.015 + this.stats.luck * 0.2
    return pool.map((u) => {
      const r = Math.random()
      const tier = r < epic ? 2 : r < epic + rare ? 1 : 0
      const amount = u.amount * CARD_TIER_MUL[tier]
      const cur = this.stats[u.stat]
      return {
        stat: u.stat,
        name: STAT_LABELS[u.stat],
        tier,
        amount,
        text: isPercentStat(u.stat) ? `+${Math.round(amount * 100)}%` : `+${Math.round(amount * 10) / 10}`,
        before: formatStat(u.stat, cur),
        after: formatStat(u.stat, cur + amount),
      }
    })
  }

  // ---------- shop ----------

  private openShop(): void {
    this.ui.offers = [...this.ui.offers.filter((o) => o.locked && !o.sold)]
    while (this.ui.offers.length < 3) this.ui.offers.push(this.makeOffer())
    this.ui.shopRerollCost = this.rerollCost(this.shopRerolls)
    this.syncStats()
    this.ui.screen = 'shop'
  }

  private makeOffer(): Offer {
    const def = WEAPONS[WEAPON_IDS[Math.floor(Math.random() * WEAPON_IDS.length)]]
    const n = this.wave.n
    const r = Math.random() - this.stats.luck * 0.2
    const tier = n >= 7 && r < 0.12 ? 2 : n >= 3 && r < 0.3 ? 1 : 0
    return { weaponId: def.id, name: def.name, tier, price: weaponPrice(def, tier, n), desc: weaponDesc(def, tier), locked: false, sold: false }
  }

  canBuy(o: Offer): boolean {
    if (o.sold || this.ui.coins < o.price) return false
    return this.ui.weapons.length < MAX_WEAPONS || this.ui.weapons.some((w) => w.id === o.weaponId && w.tier === o.tier && w.tier < MAX_TIER)
  }

  buy(index: number): void {
    const o = this.ui.offers[index]
    if (this.ui.screen !== 'shop' || !o || !this.canBuy(o)) return
    this.ui.coins -= o.price
    o.sold = true
    o.locked = false
    this.addWeapon(o.weaponId, o.tier)
  }

  toggleLock(index: number): void {
    const o = this.ui.offers[index]
    if (o && !o.sold) o.locked = !o.locked
  }

  rerollShop(): void {
    const cost = this.rerollCost(this.shopRerolls)
    if (this.ui.screen !== 'shop' || this.ui.coins < cost) return
    this.ui.coins -= cost
    this.shopRerolls++
    this.ui.offers = this.ui.offers.map((o) => (o.locked && !o.sold ? o : this.makeOffer()))
    this.ui.shopRerollCost = this.rerollCost(this.shopRerolls)
  }

  // A bought weapon takes a free slot. Only when all slots are full does a duplicate merge straight away.
  private addWeapon(id: string, tier: number): void {
    const list = this.world.weapons
    if (list.length < MAX_WEAPONS) {
      list.push({ def: WEAPONS[id], tier, cd: 0.3 })
    } else {
      const twin = list.find((w) => w.def.id === id && w.tier === tier && tier < MAX_TIER)
      if (twin) twin.tier++
    }
    this.syncWeapons()
  }

  // Two copies of the same weapon and tier → one copy of the next tier (kept in the tapped slot).
  mergeWeapon(index: number): void {
    const list = this.world.weapons
    const w = list[index]
    if (this.ui.screen !== 'shop' || !w || w.tier >= MAX_TIER) return
    const j = list.findIndex((o, k) => k !== index && o.def.id === w.def.id && o.tier === w.tier)
    if (j < 0) return
    list.splice(j, 1)
    w.tier++
    this.syncWeapons()
  }

  sellWeapon(index: number): void {
    const list = this.world.weapons
    if (this.ui.screen !== 'shop' || list.length <= 1 || !list[index]) return
    this.ui.coins += this.sellPrice(list[index].def.id, list[index].tier)
    list.splice(index, 1)
    this.syncWeapons()
  }

  private sellPrice(id: string, tier: number): number {
    return Math.floor(weaponPrice(WEAPONS[id], tier, this.wave.n) * 0.5)
  }

  private rerollCost(count: number): number {
    return 2 * this.wave.n * 2 ** count
  }

  // ---------- loop ----------

  // Dev/test only: run the simulation for `seconds` without waiting for animation frames.
  debugAdvance(seconds: number): void {
    for (let i = 0; i < Math.round(seconds / 0.1); i++) this.advance(0.1)
    this.syncHud()
    this.renderer.render(this.world, this.time)
  }

  private frame = (t: number): void => {
    this.raf = requestAnimationFrame(this.frame)
    const dt = this.last ? Math.min(0.1, (t - this.last) / 1000) : 0
    this.last = t
    this.advance(dt)
    this.syncHud()
    this.renderer.render(this.world, this.time)
  }

  private advance(dt: number): void {
    this.time += dt
    const s = this.ui.screen
    if (s === 'wave' || s === 'waveEnd') {
      this.acc += dt
      while (this.acc >= STEP) {
        this.acc -= STEP
        this.tick(STEP)
        if (this.ui.screen !== s) {
          this.acc = 0
          break
        }
      }
    }
  }

  private tick(dt: number): void {
    const mv = this.input.move()
    if (this.bannerTime > 0 && (this.bannerTime -= dt) <= 0) this.ui.banner = ''

    if (this.ui.screen === 'waveEnd') {
      this.world.step(dt, mv.x, mv.y)
      this.drainCoins()
      if ((this.endTimer -= dt) <= 0) this.afterWave()
      return
    }

    let attackBonus = 0
    for (const a of this.abilities) {
      a.cd = Math.max(0, a.cd - dt)
      a.active = Math.max(0, a.active - dt)
      if (a.active > 0 && a.def.effect === 'rapidFire') attackBonus += a.def.power
    }
    this.world.attackBonus = attackBonus

    if (!this.wave.boss) this.waveTime -= dt
    this.spawnTimer -= dt
    if (this.spawnTimer <= 0) {
      this.spawnTimer = this.wave.spawnInterval
      if (this.world.enemies.length + this.world.markers.length < this.wave.maxAlive) this.spawnBatch()
    }

    this.world.step(dt, mv.x, mv.y)
    this.drainCoins()

    if (this.world.player.hp <= 0) {
      this.ui.screen = 'gameover'
      return
    }
    if (this.wave.boss && this.world.bossKilled) {
      this.victory = true
      this.endWave()
    } else if (this.waveTime <= 0) {
      this.endWave()
    }
  }

  private spawnBatch(): void {
    const p = this.world.player
    const total = this.wave.mix.reduce((s, [, w]) => s + w, 0)
    for (let i = 0; i < this.wave.batch; i++) {
      let r = Math.random() * total
      let id = this.wave.mix[0][0]
      for (const [mid, w] of this.wave.mix) {
        if ((r -= w) <= 0) {
          id = mid
          break
        }
      }
      // A ring around the hero, clamped into the arena; never right next to the hero.
      for (let tries = 0; tries < 8; tries++) {
        const a = Math.random() * Math.PI * 2
        const d = 280 + Math.random() * 380
        const x = Math.max(-HALF_W + 30, Math.min(HALF_W - 30, p.x + Math.cos(a) * d))
        const y = Math.max(-HALF_H + 30, Math.min(HALF_H - 30, p.y + Math.sin(a) * d))
        if (Math.hypot(x - p.x, y - p.y) < 220) continue
        this.world.queueSpawn(id, x, y, 0.8)
        break
      }
    }
  }

  // Coins are both money for the shop and experience; spending never lowers the level.
  private drainCoins(): void {
    const v = this.world.collected
    if (!v) return
    this.world.collected = 0
    this.ui.coins += v
    this.ui.xp += v
    while (this.ui.xp >= xpNext(this.ui.level)) {
      this.ui.xp -= xpNext(this.ui.level)
      this.ui.level++
      this.ui.pendingLevels++
    }
  }

  private showBanner(text: string): void {
    this.ui.banner = text
    this.bannerTime = 1.6
  }

  private syncHud(): void {
    const ui = this.ui
    ui.hp = Math.max(0, this.world.player.hp)
    ui.maxHp = this.stats.maxHp
    ui.xpNext = xpNext(ui.level)
    ui.timeLeft = Number.isFinite(this.waveTime) ? Math.max(0, Math.ceil(this.waveTime)) : 0
    ui.kills = this.world.kills
    const boss = this.world.boss
    ui.bossHp = boss ? Math.max(0, boss.hp) : 0
    ui.bossMaxHp = boss ? boss.maxHp : 1
    for (let i = 0; i < this.abilities.length; i++) {
      const a = this.abilities[i]
      const u = ui.abilities[i]
      u.cd = a.cd
      u.cdMax = a.def.cooldown * (1 - Math.min(0.6, this.stats.cooldownPct))
      u.active = a.active > 0
    }
  }

  private syncWeapons(): void {
    const list = this.world.weapons
    this.ui.weapons = list.map((w, i) => ({
      id: w.def.id,
      name: w.def.name,
      kind: KIND_NAMES[w.def.kind],
      tier: w.tier,
      canMerge: w.tier < MAX_TIER && list.some((o, k) => k !== i && o.def.id === w.def.id && o.tier === w.tier),
      sellPrice: this.sellPrice(w.def.id, w.tier),
    }))
  }

  private syncStats(): void {
    this.ui.stats = (Object.keys(STAT_LABELS) as (keyof Stats)[]).map((k) => ({ name: STAT_LABELS[k], value: formatStat(k, this.stats[k]) }))
  }

  private onVisibility = (): void => {
    if (document.hidden) this.pause()
  }
}

export function xpNext(level: number): number {
  return Math.round(6 + level * 4 + level * level * 0.6)
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
