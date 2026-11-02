import { reactive } from 'vue'
import { ABILITIES, type AbilityDef } from './data/abilities'
import { LOCATIONS, locationRoster } from './data/bestiary'
import { ITEMS, ITEM_IDS, type ItemDef } from './data/items'
import { CARD_TIER_MUL, UPGRADES } from './data/upgrades'
import { WAVE_COUNT, enemyScale, waveDef, type WaveDef } from './data/waves'
import { KIND_NAMES, MAX_TIER, WEAPONS, WEAPON_IDS, type WeaponDef, wavePriceMul, weaponDesc, weaponPrice } from './data/weapons'
import { Input } from './Input'
import { PLAIN_LOADOUT, type RunLoadout, type RunResult } from './loadout'
import { Renderer } from './Renderer'
import { viewForWave } from './view'
import { BASE_STATS, STAT_LABELS, formatStat, isPercentStat, type Stats } from './stats'
import { HALF_H, HALF_W, World, type WeaponSlot } from './World'

// Run flow: waves, timer, spawning, coins (= experience), level-up cards, shop, supply chest. Owns the loop.

export type Screen = 'menu' | 'wave' | 'waveEnd' | 'levelup' | 'shop' | 'chest' | 'paused' | 'gameover' | 'victory'

export interface Card {
  stat: keyof Stats
  name: string
  tier: number
  amount: number
  text: string
  before: string
  after: string
}

export interface DescLine {
  text: string
  bad?: boolean
}

// A shop or chest offer: either a weapon (tier) or a run item (rarity in `tier`).
export interface Offer {
  type: 'weapon' | 'item'
  id: string
  name: string
  tier: number
  price: number
  desc: DescLine[]
  locked: boolean
  sold: boolean
}

interface AbilityState {
  def: AbilityDef
  cd: number
  active: number
  cooldownMul: number
  durationMul: number
}

const STEP = 1 / 60
const MAX_WEAPONS = 6
const WAVE_END_TIME = 1.4
const ITEM_MIN_WAVE = [1, 2, 4, 6] // first wave an item of this rarity may appear in the shop
const CHEST_FIRST_WAVE = 4
const CHEST_CHANCE = 0.4 // per wave, from CHEST_FIRST_WAVE on

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
  private chestSpawned = false
  private thiefTimes: number[] = [] // wave-time marks when a coin thief appears
  private resumeTo: Screen = 'wave'
  private abilities: AbilityState[] = []
  private loadout: RunLoadout = PLAIN_LOADOUT
  private runEnded = false
  // Called once when a run ends (death, victory or surrender); the lobby turns it into rewards.
  onRunEnd: (result: RunResult) => void = () => {}
  private items = new Map<string, number>()
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
    bank: 0, // coins left on the field at the end of a wave, paid out later
    pendingLevels: 0,
    wave: 0,
    waveCount: WAVE_COUNT,
    timeLeft: 0,
    bossWave: false,
    bossHp: 0,
    bossMaxHp: 1,
    bossName: '',
    bossShield: false, // Koschei waiting for his egg to break
    location: '',
    banner: '',
    kills: 0,
    abilities: [] as { id: string; name: string; icon: string; cd: number; cdMax: number; active: boolean }[],
    cards: [] as Card[],
    cardRerollCost: 0,
    offers: [] as Offer[],
    shopRerollCost: 0,
    chestOffers: [] as Offer[],
    weapons: [] as {
      id: string; name: string; kind: string; tier: number; canMerge: boolean; sellPrice: number
      desc: DescLine[]; dmgWave: number; dmgTotal: number
    }[],
    items: [] as { id: string; name: string; tier: number; count: number; max: number; desc: DescLine[] }[],
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

  startRun(loadout: RunLoadout = this.loadout): void {
    this.loadout = loadout
    this.runEnded = false
    this.stats = { ...BASE_STATS }
    for (const [k, v] of Object.entries(loadout.stats) as [keyof Stats, number][]) this.stats[k] += v
    this.world.reset(this.stats)
    this.world.sets = new Set(loadout.sets)
    this.world.bossMul = loadout.enemyMul
    this.world.heroPerk = loadout.heroPerk
    this.world.roster = locationRoster(loadout.level)
    this.ui.location = LOCATIONS[loadout.level]?.name ?? ''
    const loc = LOCATIONS[loadout.level] ?? LOCATIONS[0]
    this.renderer.setLocation(loc.id, loc.ground)
    this.renderer.setHero(loadout.heroId)
    this.renderer.setZoom(viewForWave(1), true)
    this.world.weapons.push(this.newSlot(WEAPONS[loadout.startWeapon] ?? WEAPONS.pistol, 0))
    this.items = new Map()
    this.abilities = loadout.abilities.map((a) => ({ def: ABILITIES[a.id], cd: 0, active: 0, cooldownMul: a.cooldownMul, durationMul: a.durationMul }))
    this.ui.abilities = this.abilities.map((a) => ({ id: a.def.id, name: a.def.name, icon: a.def.icon, cd: 0, cdMax: a.def.cooldown, active: false }))
    this.ui.level = 1
    this.ui.xp = 0
    this.ui.coins = 0
    this.ui.pendingLevels = 0
    this.ui.bank = 0
    this.ui.offers = []
    this.victory = false
    this.syncWeapons()
    this.syncItems()
    this.startWave(1)
  }

  private startWave(n: number): void {
    this.wave = waveDef(n)
    this.waveTime = this.wave.duration
    this.spawnTimer = 0.6
    // Not every wave has a supply chest: only from wave 4, and only sometimes.
    this.chestSpawned = n < CHEST_FIRST_WAVE || Math.random() >= CHEST_CHANCE
    this.thiefTimes = Array.from({ length: this.wave.coinThieves }, () => this.wave.duration * (0.25 + Math.random() * 0.5))
    const scale = enemyScale(n)
    this.world.hpMul = scale.hp * this.loadout.enemyMul
    this.world.dmgMul = scale.dmg * Math.sqrt(this.loadout.enemyMul)
    this.world.clearWave()
    for (const w of this.world.weapons) w.dmgWave = 0
    const p = this.world.player
    p.x = 0
    p.y = 0
    p.hp = this.stats.maxHp
    for (const a of this.abilities) a.active = 0
    this.world.attackBonus = 0
    if (this.wave.boss) this.world.queueSpawn('boss', 0, 380, 1.5)
    this.ui.wave = n
    this.ui.bossWave = this.wave.boss
    if (n > 1) this.renderer.setZoom(viewForWave(n))
    this.showBanner(this.wave.boss ? this.world.roster.boss.name : `Волна ${n}`)
    this.ui.screen = 'wave'
    this.acc = 0
  }

  private endWave(): void {
    this.ui.screen = 'waveEnd'
    this.endTimer = WAVE_END_TIME
    this.world.clearWave()
    // Coins nobody picked up go to the bank (medkits are lost).
    for (const pk of this.world.pickups) this.ui.bank += pk.value
    this.world.pickups = []
    this.showBanner(this.victory ? 'Босс повержен!' : 'Волна завершена!')
  }

  private afterWave(): void {
    this.drainCoins()
    if (this.victory) {
      this.finishRun('victory')
      return
    }
    this.cardRerolls = 0
    this.shopRerolls = 0
    this.syncWeapons()
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
    this.syncWeapons()
    this.syncStats()
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

  // Leave the run from the pause screen: counts as a loss with the waves cleared so far.
  surrender(): void {
    if (this.ui.screen !== 'paused') return
    this.finishRun('gameover')
  }

  private finishRun(screen: 'gameover' | 'victory'): void {
    this.ui.screen = screen
    if (this.runEnded) return
    this.runEnded = true
    const victory = screen === 'victory'
    this.onRunEnd({ level: this.loadout.level, wavesCleared: victory ? WAVE_COUNT : this.wave.n - 1, victory, kills: this.world.kills })
  }

  useAbility(index: number): void {
    if (this.ui.screen !== 'wave') return
    const a = this.abilities[index]
    if (!a || a.cd > 0) return
    a.cd = this.abilityCooldown(a)
    a.active = a.def.duration * a.durationMul
    switch (a.def.effect) {
      case 'roll': {
        const mv = this.input.move()
        this.world.startRoll(a.def.power, a.active, mv.x, mv.y)
        break
      }
      case 'heal':
        this.world.healPlayer(a.def.power * a.durationMul)
        break
      case 'frostNova':
        this.world.freezeAround(a.def.power, a.active)
        break
      case 'shockwave':
        this.world.shockwave(a.def.power * a.durationMul, 190)
        break
      case 'rapidFire':
        break
    }
  }

  private abilityCooldown(a: AbilityState): number {
    return a.def.cooldown * a.cooldownMul * (1 - Math.min(0.6, this.stats.cooldownPct))
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
    const luck = this.stats.luck
    const chances = [0.01 + lvl * 0.003 + luck * 0.05, 0.04 + lvl * 0.008 + luck * 0.1, 0.15 + lvl * 0.015 + luck * 0.2] // purple, blue, green
    return pool.map((u) => {
      const r = Math.random()
      const tier = r < chances[0] ? 3 : r < chances[0] + chances[1] ? 2 : r < chances[0] + chances[1] + chances[2] ? 1 : 0
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
    // Early on the hero needs firepower more than trinkets.
    const n = this.world.weapons.length
    const weaponChance = n < 3 ? 0.75 : n < MAX_WEAPONS ? 0.5 : 0.35
    return Math.random() < weaponChance ? this.weaponOffer() : this.itemOffer()
  }

  private weaponOffer(free = false): Offer {
    const def = WEAPONS[WEAPON_IDS[Math.floor(Math.random() * WEAPON_IDS.length)]]
    const n = this.wave.n
    const r = Math.random() - this.stats.luck * 0.2
    const tier = n >= 8 && r < 0.06 ? 3 : n >= 6 && r < 0.15 ? 2 : n >= 3 && r < 0.35 ? 1 : 0
    return {
      type: 'weapon', id: def.id, name: def.name, tier, price: free ? 0 : this.discount(weaponPrice(def, tier, n)),
      desc: this.weaponLines(def, tier), locked: false, sold: false,
    }
  }

  private itemOffer(): Offer {
    const n = this.wave.n
    const pool = ITEM_IDS.map((id) => ITEMS[id]).filter((it) => n >= ITEM_MIN_WAVE[it.rarity] && (this.items.get(it.id) ?? 0) < it.max)
    if (!pool.length) return this.weaponOffer()
    // Rarer items show up less often.
    const weights = pool.map((it) => [8, 4, 2, 1][it.rarity])
    let r = Math.random() * weights.reduce((a, b) => a + b, 0)
    let def = pool[0]
    for (let i = 0; i < pool.length; i++) if ((r -= weights[i]) <= 0) {
      def = pool[i]
      break
    }
    return {
      type: 'item', id: def.id, name: def.name, tier: def.rarity, price: this.discount(Math.round(def.price * wavePriceMul(n))),
      desc: itemLines(def), locked: false, sold: false,
    }
  }

  private discount(price: number): number {
    return this.world.sets.has('trader') ? Math.round(price * 0.9) : price
  }

  canBuy(o: Offer): boolean {
    if (o.sold || this.ui.coins < o.price) return false
    return this.canTake(o)
  }

  private canTake(o: Offer): boolean {
    if (o.type === 'item') return (this.items.get(o.id) ?? 0) < ITEMS[o.id].max
    return this.world.weapons.length < MAX_WEAPONS || this.world.weapons.some((w) => w.def.id === o.id && w.tier === o.tier && w.tier < MAX_TIER)
  }

  buy(index: number): void {
    const o = this.ui.offers[index]
    if (this.ui.screen !== 'shop' || !o || !this.canBuy(o)) return
    this.ui.coins -= o.price
    o.sold = true
    o.locked = false
    this.take(o)
  }

  private take(o: Offer): void {
    if (o.type === 'weapon') this.addWeapon(o.id, o.tier)
    else this.addItem(o.id)
    this.syncStats()
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
      list.push(this.newSlot(WEAPONS[id], tier))
    } else {
      const twin = list.find((w) => w.def.id === id && w.tier === tier && tier < MAX_TIER)
      if (twin) twin.tier++
    }
    this.syncWeapons()
  }

  private addItem(id: string): void {
    const def = ITEMS[id]
    this.items.set(id, (this.items.get(id) ?? 0) + 1)
    for (const [k, v] of Object.entries(def.mods) as [keyof Stats, number][]) {
      this.stats[k] += v
      if (k === 'maxHp') this.world.player.hp = Math.max(1, this.world.player.hp + v)
    }
    if (def.special === 'standHeal') this.world.standHeal++
    if (def.special === 'collector') this.world.collectors++
    this.syncItems()
  }

  // Two copies of the same weapon and tier → one copy of the next tier (kept in the tapped slot).
  mergeWeapon(index: number): void {
    const list = this.world.weapons
    const w = list[index]
    if (this.ui.screen !== 'shop' || !w || w.tier >= MAX_TIER) return
    const j = list.findIndex((o, k) => k !== index && o.def.id === w.def.id && o.tier === w.tier)
    if (j < 0) return
    w.dmgTotal += list[j].dmgTotal
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
    return Math.floor(weaponPrice(WEAPONS[id], tier, this.wave.n) * 0.4)
  }

  // As in the reference: 2 × finished wave (at least 4), doubling with each reroll in the same break.
  private rerollCost(count: number): number {
    return Math.max(4, 2 * this.wave.n) * 2 ** count
  }

  // ---------- supply chest ----------

  // Mid-wave (from wave 4, by chance): a chest appears near the hero; standing in its ring opens a free pick of three weapons.
  private maybePlaceChest(): void {
    if (this.chestSpawned || this.wave.boss || this.waveTime > this.wave.duration * 0.6) return
    this.chestSpawned = true
    const p = this.world.player
    for (let tries = 0; tries < 10; tries++) {
      const a = Math.random() * Math.PI * 2
      const d = 200 + Math.random() * 180
      const x = Math.max(-HALF_W + 80, Math.min(HALF_W - 80, p.x + Math.cos(a) * d))
      const y = Math.max(-HALF_H + 80, Math.min(HALF_H - 80, p.y + Math.sin(a) * d))
      if (Math.hypot(x - p.x, y - p.y) < 150) continue
      this.world.placeChest(x, y)
      this.showBanner('Сундук снабжения!')
      return
    }
  }

  private openChest(): void {
    this.world.chestOpened = false
    const offers: Offer[] = []
    for (let tries = 0; offers.length < 3 && tries < 30; tries++) {
      const o = this.weaponOffer(true)
      if (!offers.some((x) => x.id === o.id)) offers.push(o)
    }
    this.ui.chestOffers = offers
    this.input.clear()
    this.ui.screen = 'chest'
  }

  canTakeChest(o: Offer): boolean {
    return this.canTake(o)
  }

  pickChest(index: number): void {
    const o = this.ui.chestOffers[index]
    if (this.ui.screen !== 'chest' || !o || !this.canTake(o)) return
    this.take(o)
    this.closeChest()
  }

  closeChest(): void {
    if (this.ui.screen !== 'chest') return
    this.ui.chestOffers = []
    this.ui.screen = 'wave'
    this.acc = 0
  }

  // ---------- loop ----------

  // Dev/test only: run the simulation for `seconds` without waiting for animation frames.
  debugAdvance(seconds: number): void {
    for (let i = 0; i < Math.round(seconds / 0.1); i++) this.advance(0.1)
    this.syncHud()
    this.renderer.render(this.world, this.time)
  }

  // Dev: speed of game time (10 = ten times faster) and a per-frame hook for the watching bot.
  timeScale = 1

  // View panel: preview the camera of a given wave (1, 2, or 3 for the final distance).
  previewZoom(wave: number): void {
    this.renderer.setZoom(viewForWave(wave))
  }
  onFrame: (() => void) | null = null

  private frame = (t: number): void => {
    this.raf = requestAnimationFrame(this.frame)
    const dt = (this.last ? Math.min(0.1, (t - this.last) / 1000) : 0) * this.timeScale
    this.onFrame?.()
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
    this.maybePlaceChest()
    this.maybeSpawnThief()

    this.world.step(dt, mv.x, mv.y)
    this.drainCoins()

    if (this.world.player.hp <= 0) {
      this.finishRun('gameover')
      return
    }
    if (this.wave.boss && this.world.bossKilled) {
      this.victory = true
      this.endWave()
    } else if (this.waveTime <= 0) {
      this.endWave()
    } else if (this.world.chestOpened) {
      this.openChest()
    }
  }

  // A harmless thief runs across the field; catching it pays a pile of coins.
  private maybeSpawnThief(): void {
    const i = this.thiefTimes.findIndex((t) => this.waveTime <= t)
    if (i < 0) return
    this.thiefTimes.splice(i, 1)
    const p = this.world.player
    const a = Math.random() * Math.PI * 2
    const x = Math.max(-HALF_W + 40, Math.min(HALF_W - 40, p.x + Math.cos(a) * 260))
    const y = Math.max(-HALF_H + 40, Math.min(HALF_H - 40, p.y + Math.sin(a) * 260))
    this.world.queueSpawn('coin', x, y, 0.5)
    this.showBanner('Воришка с монетами!')
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
  // Every coin picked up also pays one coin from the bank, until the bank is empty.
  private drainCoins(): void {
    let v = this.world.collected
    if (!v) return
    this.world.collected = 0
    const fromBank = Math.min(this.ui.bank, v)
    this.ui.bank -= fromBank
    v += fromBank
    this.ui.coins += v
    this.ui.xp += v * (1 + this.stats.xpGain)
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

  private newSlot(def: WeaponDef, tier: number): WeaponSlot {
    return { def, tier, cd: 0.3, dmgWave: 0, dmgTotal: 0, own: this.loadout.own[def.id] ?? null, aim: 0 }
  }

  private weaponLines(def: WeaponDef, tier: number): DescLine[] {
    return weaponDesc(def, tier, this.world.baseDamage(def, tier)).map((text) => ({ text }))
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
    ui.bossName = boss ? boss.def.name : ''
    ui.bossShield = !!boss?.invulnerable
    for (let i = 0; i < this.abilities.length; i++) {
      const a = this.abilities[i]
      const u = ui.abilities[i]
      u.cd = a.cd
      u.cdMax = this.abilityCooldown(a)
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
      desc: this.weaponLines(w.def, w.tier),
      dmgWave: Math.round(w.dmgWave),
      dmgTotal: Math.round(w.dmgTotal),
    }))
  }

  private syncItems(): void {
    this.ui.items = [...this.items].map(([id, count]) => {
      const def = ITEMS[id]
      return { id, name: def.name, tier: def.rarity, count, max: def.max, desc: itemLines(def) }
    })
  }

  private syncStats(): void {
    this.ui.stats = (Object.keys(STAT_LABELS) as (keyof Stats)[]).map((k) => ({ name: STAT_LABELS[k], value: formatStat(k, this.stats[k]) }))
  }

  private onVisibility = (): void => {
    if (document.hidden) this.pause()
  }
}


// "+3 Броня", "−8 Скорость"; minuses are flagged so the UI can colour them red.
function itemLines(def: ItemDef): DescLine[] {
  const lines: DescLine[] = (Object.entries(def.mods) as [keyof Stats, number][]).map(([k, v]) => {
    const amount = isPercentStat(k) ? `${Math.round(Math.abs(v) * 100)}%` : `${Math.abs(v)}`
    return { text: `${v < 0 ? '−' : '+'}${amount} ${STAT_LABELS[k]}`, bad: v < 0 }
  })
  if (def.text) lines.push({ text: def.text })
  return lines
}

// Matches COIN_DROP_CHANCE in World: coins are experience, so fewer coins means a lower bar per level.
export function xpNext(level: number): number {
  return Math.round((6 + level * 4 + level * level * 0.6) * 0.8)
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
