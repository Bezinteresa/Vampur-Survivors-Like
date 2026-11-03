import { reactive } from 'vue'
import { sound } from '../audio/sound'
import { HERO_MAX_LEVEL, HEROES, heroDamage, heroDef, heroHp, heroUpgradeGold, heroUpgradeWater } from '../game/data/heroes'
import type { OwnBonus, RunLoadout, RunResult } from '../game/loadout'
import { BASE_STATS, type Stats } from '../game/stats'
import {
  ALL_SLOTS, CHESTS, DAMAGE_SLOTS, GEAR_SLOTS, ITEMS, ITEM_IDS, MAIN_COOLDOWN_PER_LEVEL, MAIN_DAMAGE_PER_LEVEL,
  MAIN_HP_PER_LEVEL, MAP_LEVELS, MAX_RARITY, RARITY_MAX_LEVEL, SET_PIECES_NEEDED, TALENTS, rollRarity, sellGold, spentOn,
  talentCost, upgradeBlueprints, upgradeGold, type GearSlot, type ItemDef, type SetId, type Slot,
} from './content'
import type { SaveStorage } from './storage'

// Lobby progress: currencies, items, equipment, talents, map. One reactive profile, saved after every change.

export interface OwnedItem {
  uid: number
  itemId: string
  rarity: number
  level: number
}

export interface Profile {
  version: 1
  gold: number
  gems: number
  blueprints: Record<Slot, number>
  items: OwnedItem[]
  equipped: Record<GearSlot, number | null>
  abilities: (number | null)[] // two ability slots
  talents: Record<string, number>
  best: number[] // best waves cleared per map level
  cleared: boolean[] // boss beaten per map level
  selectedLevel: number
  freeChestAt: number // ms timestamp when the free small chest is ready
  heroes: Record<string, number> // unlocked bogatyrs and their levels
  hero: string // chosen bogatyr
  water: number // living water: upgrades bogatyrs
  settings: { sound: boolean; music: number; sfx: number } // sound switch and volumes 0..1
  // Purchases for real money: permanent products owned, and the journal of granted transactions
  // ("product:transaction"), so a paid purchase is never granted twice.
  purchases: { owned: string[]; granted: string[] }
  nextUid: number
}

export interface Reward {
  kind: 'gold' | 'gems' | 'blueprint' | 'item' | 'water'
  amount: number
  slot?: Slot
  item?: OwnedItem
}

const SAVE_KEY = 'vampur.save'

function defaultProfile(): Profile {
  const p: Profile = {
    version: 1,
    gold: 500,
    settings: { sound: true, music: 0.5, sfx: 1 },
    purchases: { owned: [], granted: [] },
    gems: 100,
    blueprints: Object.fromEntries(ALL_SLOTS.map((s) => [s, 5])) as Record<Slot, number>,
    items: [],
    equipped: { weapon: null, hat: null, glasses: null, shirt: null, backpack: null, boots: null },
    abilities: [null, null],
    talents: {},
    best: MAP_LEVELS.map(() => 0),
    cleared: MAP_LEVELS.map(() => false),
    selectedLevel: 0,
    freeChestAt: 0,
    heroes: { ivan: 1 },
    hero: 'ivan',
    water: 5,
    nextUid: 1,
  }
  const give = (itemId: string) => {
    const it = { uid: p.nextUid++, itemId, rarity: 0, level: 1 }
    p.items.push(it)
    return it.uid
  }
  p.equipped.weapon = give('w_pistol')
  p.equipped.hat = give('hat_hunter')
  p.equipped.boots = give('boots_guard')
  p.abilities = [give('a_roll'), give('a_rapidFire')]
  return p
}

function applySound(s: Profile['settings']): void {
  sound.on = s.sound
  sound.music = s.music
  sound.sfx = s.sfx
}

export class Meta {
  readonly p: Profile = reactive(defaultProfile())
  private storage: SaveStorage | null = null
  private saveTimer = 0
  private writing: Promise<void> | null = null
  private dirty = false
  private failures = 0

  async load(storage: SaveStorage): Promise<void> {
    this.storage = storage
    const raw = await storage.load(SAVE_KEY)
    this.restore(raw)
    applySound(this.p.settings)
  }

  private restore(raw: string | null): void {
    if (!raw) return
    try {
      const data = JSON.parse(raw) as Partial<Profile>
      if (data.version !== 1) return
      const d = defaultProfile()
      Object.assign(this.p, {
        ...d,
        ...data,
        blueprints: { ...d.blueprints, ...data.blueprints },
        equipped: { ...d.equipped, ...data.equipped },
        heroes: { ...d.heroes, ...data.heroes },
        settings: { ...d.settings, ...data.settings },
        purchases: { ...d.purchases, ...data.purchases },
        best: MAP_LEVELS.map((_, i) => data.best?.[i] ?? 0),
        cleared: MAP_LEVELS.map((_, i) => data.cleared?.[i] ?? false),
        items: (data.items ?? []).filter((it) => ITEMS[it.itemId]),
      })
    } catch {
      // A broken save is kept on disk untouched; the session starts from defaults.
    }
  }

  // Changes are batched for a moment, then the whole profile is written. Writes go one at a time;
  // a change made while a write is in flight is written after it. A failed write is retried later.
  private save(): void {
    if (!this.storage) return
    this.dirty = true
    clearTimeout(this.saveTimer)
    this.saveTimer = window.setTimeout(() => void this.flush(), 300)
  }

  /** Writes pending changes now (before an ad, when the tab is hidden). */
  async flush(): Promise<void> {
    await this.flushConfirmed()
  }

  /** Like flush; resolves true only when the storage accepted everything (purchases wait for it). */
  async flushConfirmed(): Promise<boolean> {
    clearTimeout(this.saveTimer)
    while (this.writing) await this.writing
    if (!this.dirty) return true
    if (!this.storage) return false
    this.dirty = false
    const storage = this.storage
    let ok = false
    this.writing = storage
      .save(SAVE_KEY, JSON.stringify(this.p))
      .then(() => {
        this.failures = 0
        ok = true
      })
      .catch((e) => {
        console.warn('[save] write failed', e)
        this.dirty = true
        this.saveTimer = window.setTimeout(() => void this.flush(), [3000, 10000, 30000][Math.min(2, this.failures++)])
      })
      .finally(() => {
        this.writing = null
      })
    await this.writing
    return ok && !this.dirty
  }

  /** A paid product: what it gives goes into the profile together with its journal entry, in one change. */
  grantPurchase(key: string, gives: { gems?: number; gold?: number }, permanent: string | null): void {
    const pr = this.p.purchases
    if (pr.granted.includes(key) || (permanent && pr.owned.includes(permanent))) return
    this.p.gems += gives.gems ?? 0
    this.p.gold += gives.gold ?? 0
    if (permanent) pr.owned.push(permanent)
    pr.granted.push(key)
    if (pr.granted.length > 300) pr.granted.splice(0, pr.granted.length - 300)
    this.save()
  }

  owns(productId: string): boolean {
    return this.p.purchases.owned.includes(productId)
  }

  /** Sound switch and volumes; the sound module follows them, the profile keeps them. */
  setSound(change: Partial<Profile['settings']>, store = true): void {
    Object.assign(this.p.settings, change)
    applySound(this.p.settings)
    if (store) this.save()
  }

  // ---------- queries ----------

  item(uid: number | null): OwnedItem | undefined {
    return uid == null ? undefined : this.p.items.find((it) => it.uid === uid)
  }

  def(it: OwnedItem): ItemDef {
    return ITEMS[it.itemId]
  }

  maxLevel(it: OwnedItem): number {
    return RARITY_MAX_LEVEL[it.rarity]
  }

  isEquipped(uid: number): boolean {
    return Object.values(this.p.equipped).includes(uid) || this.p.abilities.includes(uid)
  }

  // Copies of the same item and rarity (including this one).
  copies(it: OwnedItem): OwnedItem[] {
    return this.p.items.filter((o) => o.itemId === it.itemId && o.rarity === it.rarity)
  }

  canMerge(it: OwnedItem): boolean {
    return it.rarity < MAX_RARITY && this.copies(it).length >= 3
  }

  canUpgrade(it: OwnedItem): boolean {
    const slot = this.def(it).slot
    return it.level < this.maxLevel(it) && this.p.gold >= upgradeGold(it.level) && this.p.blueprints[slot] >= upgradeBlueprints(it.level)
  }

  activeSets(): SetId[] {
    const count: Partial<Record<SetId, number>> = {}
    for (const slot of GEAR_SLOTS) {
      const set = this.item(this.p.equipped[slot]) && ITEMS[this.item(this.p.equipped[slot])!.itemId].set
      if (set) count[set] = (count[set] ?? 0) + 1
    }
    return (Object.keys(count) as SetId[]).filter((s) => (count[s] ?? 0) >= SET_PIECES_NEEDED)
  }

  setCount(set: SetId): number {
    return GEAR_SLOTS.filter((slot) => {
      const it = this.item(this.p.equipped[slot])
      return it && ITEMS[it.itemId].set === set
    }).length
  }

  // Everything the equipped gear and talents give, in the form a run takes.
  loadout(): RunLoadout {
    const stats: Partial<Stats> = {}
    const add = (k: keyof Stats, v: number) => (stats[k] = (stats[k] ?? 0) + v)
    for (const t of TALENTS) add(t.stat, t.perLevel * (this.p.talents[t.id] ?? 0))

    const own: Record<string, OwnBonus> = {}
    let startWeapon = 'pistol'
    for (const slot of GEAR_SLOTS) {
      const it = this.item(this.p.equipped[slot])
      if (!it) continue
      const def = this.def(it)
      if (DAMAGE_SLOTS.includes(slot)) add('damagePct', MAIN_DAMAGE_PER_LEVEL * it.level)
      else add('maxHp', MAIN_HP_PER_LEVEL * it.level)
      if (def.runWeapon) startWeapon = def.runWeapon
      def.perks.slice(0, it.rarity).forEach((perk) => {
        if (perk.stat === 'ownDamage' || perk.stat === 'ownAttackSpeed' || perk.stat === 'ownCrit') {
          const o = (own[def.runWeapon!] ??= { damage: 0, attackSpeed: 0, crit: 0 })
          if (perk.stat === 'ownDamage') o.damage += perk.value
          else if (perk.stat === 'ownAttackSpeed') o.attackSpeed += perk.value
          else o.crit += perk.value
        } else if (perk.stat !== 'abilityCooldown' && perk.stat !== 'abilityDuration') {
          add(perk.stat, perk.value)
        }
      })
    }

    const abilities = this.p.abilities
      .map((uid) => this.item(uid))
      .filter((it): it is OwnedItem => !!it)
      .map((it) => {
        const def = this.def(it)
        let cooldownMul = 1 - MAIN_COOLDOWN_PER_LEVEL * it.level
        let durationMul = 1
        for (const perk of def.perks.slice(0, it.rarity)) {
          if (perk.stat === 'abilityCooldown') cooldownMul *= 1 - perk.value
          if (perk.stat === 'abilityDuration') durationMul += perk.value
        }
        return { id: def.ability!, cooldownMul: Math.max(0.3, cooldownMul), durationMul }
      })

    const hero = heroDef(this.p.hero)
    const heroLevel = this.p.heroes[hero.id] ?? 1
    add('damagePct', heroDamage(hero, heroLevel))
    add('maxHp', heroHp(hero, heroLevel))

    const level = this.p.selectedLevel
    return { level, enemyMul: MAP_LEVELS[level].enemyMul, stats, startWeapon, own, abilities, sets: this.activeSets(), heroPerk: hero.perk, heroId: hero.id }
  }

  heroSummary(): { damagePct: number; maxHp: number } {
    const s = this.loadout().stats
    return { damagePct: s.damagePct ?? 0, maxHp: BASE_STATS.maxHp + (s.maxHp ?? 0) }
  }

  // ---------- equipment actions ----------

  equip(uid: number): void {
    const it = this.item(uid)
    if (!it) return
    const slot = this.def(it).slot
    if (slot === 'ability') {
      if (this.p.abilities.includes(uid)) return
      // The same ability cannot sit in both slots.
      const twin = this.p.abilities.findIndex((u) => this.item(u)?.itemId === it.itemId)
      const free = this.p.abilities.indexOf(null)
      this.p.abilities[twin >= 0 ? twin : free >= 0 ? free : 1] = uid
    } else {
      this.p.equipped[slot] = uid
    }
    this.save()
  }

  unequip(uid: number): void {
    for (const slot of GEAR_SLOTS) if (this.p.equipped[slot] === uid && slot !== 'weapon') this.p.equipped[slot] = null
    this.p.abilities = this.p.abilities.map((u) => (u === uid ? null : u))
    this.save()
  }

  upgrade(uid: number): boolean {
    const it = this.item(uid)
    if (!it || !this.canUpgrade(it)) return false
    this.p.gold -= upgradeGold(it.level)
    this.p.blueprints[this.def(it).slot] -= upgradeBlueprints(it.level)
    it.level++
    this.save()
    return true
  }

  maxUpgrade(uid: number): void {
    while (this.upgrade(uid)) {
      // upgrade() stops when resources or the level cap run out
    }
  }

  // Back to level 1, everything spent on upgrades is returned.
  dismantle(uid: number): void {
    const it = this.item(uid)
    if (!it || it.level <= 1) return
    this.refund(it)
    it.level = 1
    this.save()
  }

  sell(uid: number): void {
    const it = this.item(uid)
    if (!it || this.isEquipped(uid)) return
    this.refund(it)
    this.p.gold += sellGold(it.rarity)
    this.p.items = this.p.items.filter((o) => o.uid !== uid)
    this.save()
  }

  private refund(it: OwnedItem): void {
    const back = spentOn(it.level)
    this.p.gold += back.gold
    this.p.blueprints[this.def(it).slot] += back.blueprints
  }

  // Three copies of the same item and rarity → that item one rarity higher. The equipped (or highest-level)
  // copy survives and keeps its level; upgrades spent on the other two are refunded.
  merge(uid: number): OwnedItem | null {
    const it = this.item(uid)
    if (!it || !this.canMerge(it)) return null
    const copies = this.copies(it).sort((a, b) => Number(this.isEquipped(b.uid)) - Number(this.isEquipped(a.uid)) || b.level - a.level)
    const [keep, ...rest] = copies.slice(0, 3)
    for (const o of rest) {
      this.refund(o)
      this.unequip(o.uid)
    }
    const removed = new Set(rest.map((o) => o.uid))
    this.p.items = this.p.items.filter((o) => !removed.has(o.uid))
    keep.rarity++
    this.save()
    return keep
  }

  mergeAll(): number {
    let merged = 0
    for (;;) {
      const it = this.p.items.find((o) => this.canMerge(o))
      if (!it) return merged
      this.merge(it.uid)
      merged++
    }
  }

  // ---------- bogatyrs ----------

  selectHero(id: string): void {
    if (this.p.heroes[id] == null) return
    this.p.hero = id
    this.save()
  }

  unlockHero(id: string): void {
    const h = HEROES.find((x) => x.id === id)
    if (!h || this.p.heroes[id] != null || this.p.gems < h.gems) return
    this.p.gems -= h.gems
    this.p.heroes[id] = 1
    this.p.hero = id
    this.save()
  }

  canUpgradeHero(id: string): boolean {
    const lvl = this.p.heroes[id]
    return lvl != null && lvl < HERO_MAX_LEVEL && this.p.gold >= heroUpgradeGold(lvl) && this.p.water >= heroUpgradeWater(lvl)
  }

  upgradeHero(id: string): void {
    if (!this.canUpgradeHero(id)) return
    const lvl = this.p.heroes[id]
    this.p.gold -= heroUpgradeGold(lvl)
    this.p.water -= heroUpgradeWater(lvl)
    this.p.heroes[id] = lvl + 1
    this.save()
  }

  // ---------- talents ----------

  upgradeTalent(id: string): void {
    const t = TALENTS.find((x) => x.id === id)
    const lvl = this.p.talents[id] ?? 0
    if (!t || lvl >= t.max || this.p.gold < talentCost(lvl)) return
    this.p.gold -= talentCost(lvl)
    this.p.talents[id] = lvl + 1
    this.save()
  }

  // ---------- chests ----------

  freeChestReady(now = Date.now()): boolean {
    return now >= this.p.freeChestAt
  }

  openChest(id: string, free = false): Reward[] | null {
    const chest = CHESTS.find((c) => c.id === id)
    if (!chest) return null
    if (free) {
      if (!chest.freeEveryHours || !this.freeChestReady()) return null
      this.p.freeChestAt = Date.now() + chest.freeEveryHours * 3600_000
    } else if (chest.gold != null) {
      if (this.p.gold < chest.gold) return null
      this.p.gold -= chest.gold
    } else if (chest.gems != null) {
      if (this.p.gems < chest.gems) return null
      this.p.gems -= chest.gems
    }
    const rewards: Reward[] = []
    for (let i = 0; i < chest.count; i++) rewards.push(this.giveItem(rollRarity(chest.odds)))
    rewards.push(...this.giveBlueprints(chest.blueprints))
    if (chest.water) rewards.push(this.giveWater(chest.water))
    this.save()
    return rewards
  }

  private giveItem(rarity: number): Reward {
    const itemId = ITEM_IDS[Math.floor(Math.random() * ITEM_IDS.length)]
    const item = { uid: this.p.nextUid++, itemId, rarity, level: 1 }
    this.p.items.push(item)
    return { kind: 'item', amount: 1, item }
  }

  private giveWater(amount: number): Reward {
    this.p.water += amount
    return { kind: 'water', amount }
  }

  private giveBlueprints(count: number): Reward[] {
    const by: Partial<Record<Slot, number>> = {}
    for (let i = 0; i < count; i++) {
      const slot = ALL_SLOTS[Math.floor(Math.random() * ALL_SLOTS.length)]
      by[slot] = (by[slot] ?? 0) + 1
    }
    return (Object.entries(by) as [Slot, number][]).map(([slot, amount]) => {
      this.p.blueprints[slot] += amount
      return { kind: 'blueprint', amount, slot }
    })
  }

  // ---------- map and run results ----------

  selectLevel(i: number): void {
    if (i < 0 || i >= MAP_LEVELS.length || !this.levelOpen(i)) return
    this.p.selectedLevel = i
    this.save()
  }

  levelOpen(i: number): boolean {
    return i === 0 || this.p.cleared[i - 1]
  }

  // Rewarded video after a run: the run's gold once more.
  doubleRunGold(rewards: Reward[]): void {
    const r = rewards.find((x) => x.kind === 'gold')
    if (!r) return
    this.p.gold += r.amount
    r.amount *= 2
    this.save()
  }

  applyRun(r: RunResult): Reward[] {
    const lvl = r.level
    const levelMul = 1 + 0.3 * lvl
    const rewards: Reward[] = []
    const gold = Math.round((150 + 120 * r.wavesCleared) * levelMul) + (r.victory ? 900 * (lvl + 1) : 0)
    this.p.gold += gold
    rewards.push({ kind: 'gold', amount: gold })
    if (r.victory) {
      const gems = this.p.cleared[lvl] ? 10 : 50
      this.p.gems += gems
      rewards.push({ kind: 'gems', amount: gems })
      this.p.cleared[lvl] = true
    }
    this.p.best[lvl] = Math.max(this.p.best[lvl], r.wavesCleared)
    const items = r.victory ? 2 : r.wavesCleared >= 5 ? 1 : 0
    const odds = [0.75 - 0.05 * lvl, 0.2 + 0.03 * lvl, 0.05 + 0.02 * lvl]
    for (let i = 0; i < items; i++) rewards.push(this.giveItem(rollRarity(odds)))
    rewards.push(...this.giveBlueprints(2 * r.wavesCleared + (r.victory ? 6 : 0)))
    const water = Math.floor(r.wavesCleared / 3) + (r.victory ? 3 : 0)
    if (water > 0) rewards.push(this.giveWater(water))
    this.save()
    return rewards
  }
}
