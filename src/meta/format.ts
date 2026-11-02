import { STAT_LABELS, isPercentStat, type Stats } from '../game/stats'
import {
  DAMAGE_SLOTS, MAIN_COOLDOWN_PER_LEVEL, MAIN_DAMAGE_PER_LEVEL, MAIN_HP_PER_LEVEL, PERK_NAMES, SLOT_NAMES, type Perk,
} from './content'
import type { OwnedItem, Reward } from './Meta'
import { ITEMS } from './content'

// Text for lobby cards: perks, main bonus, rewards.

export function perkText(perk: Perk): string {
  const name = PERK_NAMES[perk.stat] ?? STAT_LABELS[perk.stat as keyof Stats]
  const percent = perk.stat in PERK_NAMES || isPercentStat(perk.stat as keyof Stats)
  const amount = percent ? `${Math.round(perk.value * 100)}%` : `${Math.round(perk.value * 10) / 10}`
  return `${name} ${perk.stat === 'abilityCooldown' ? '−' : '+'}${amount}`
}

export function mainBonusText(it: OwnedItem): string {
  const slot = ITEMS[it.itemId].slot
  if (slot === 'ability') return `Перезарядка −${Math.round(MAIN_COOLDOWN_PER_LEVEL * it.level * 100)}%`
  if (DAMAGE_SLOTS.includes(slot)) return `Урон +${Math.round(MAIN_DAMAGE_PER_LEVEL * it.level * 100)}%`
  return `Здоровье +${MAIN_HP_PER_LEVEL * it.level}`
}

export function rewardText(r: Reward): string {
  switch (r.kind) {
    case 'gold':
      return `Золото +${r.amount}`
    case 'gems':
      return `Кристаллы +${r.amount}`
    case 'blueprint':
      return `Чертёж: ${SLOT_NAMES[r.slot!].toLowerCase()} ×${r.amount}`
    case 'item':
      return ITEMS[r.item!.itemId].name
  }
}
