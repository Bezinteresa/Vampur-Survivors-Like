import { t } from '../i18n'
import { STAT_LABELS, isPercentStat, type Stats } from '../game/stats'
import {
  DAMAGE_SLOTS, MAIN_COOLDOWN_PER_LEVEL, MAIN_DAMAGE_PER_LEVEL, MAIN_HP_PER_LEVEL, PERK_NAMES, SLOT_NAMES, type Perk,
} from './content'
import type { OwnedItem, Reward } from './Meta'
import { ITEMS } from './content'
import { SPRITE } from '../sprites'

// Text for lobby cards: perks, main bonus, rewards.

// Picture slot of a lobby item: weapons and abilities share their run pictures, clothing has its own.
export function itemSprite(itemId: string): string {
  const d = ITEMS[itemId]
  return d.runWeapon ? SPRITE.weapon(d.runWeapon) : d.ability ? SPRITE.ability(d.ability) : SPRITE.gear(itemId)
}

export function perkText(perk: Perk): string {
  const name = PERK_NAMES[perk.stat] ?? STAT_LABELS[perk.stat as keyof Stats]
  const percent = perk.stat in PERK_NAMES || isPercentStat(perk.stat as keyof Stats)
  const amount = percent ? `${Math.round(perk.value * 100)}%` : `${Math.round(perk.value * 10) / 10}`
  return `${name} ${perk.stat === 'abilityCooldown' ? '−' : '+'}${amount}`
}

export function mainBonusText(it: OwnedItem): string {
  const slot = ITEMS[it.itemId].slot
  if (slot === 'ability') return t('Перезарядка −{n}%', { n: Math.round(MAIN_COOLDOWN_PER_LEVEL * it.level * 100) })
  if (DAMAGE_SLOTS.includes(slot)) return t('Урон +{n}%', { n: Math.round(MAIN_DAMAGE_PER_LEVEL * it.level * 100) })
  return t('Здоровье +{n}', { n: MAIN_HP_PER_LEVEL * it.level })
}

export function rewardText(r: Reward): string {
  switch (r.kind) {
    case 'gold':
      return t('Золото +{n}', { n: r.amount })
    case 'gems':
      return t('Кристаллы +{n}', { n: r.amount })
    case 'blueprint':
      return t('Чертёж: {slot} ×{n}', { slot: SLOT_NAMES[r.slot!].toLowerCase(), n: r.amount })
    case 'item':
      return ITEMS[r.item!.itemId].name
    case 'water':
      return t('Живая вода +{n}', { n: r.amount })
  }
}
