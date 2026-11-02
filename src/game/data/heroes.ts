// Playable bogatyrs. Each adds damage % and health that grow with the hero's level (up to 25)
// and has one perk tied to the roll ability (after, during or at the end of a roll).

export type RollPerk =
  | { kind: 'dodgeAfter'; value: number; time: number }
  | { kind: 'speedAfter'; value: number; time: number }
  | { kind: 'attackSpeedAfter'; value: number; time: number }
  | { kind: 'bomb'; damage: number; radius: number } // thrown ahead when the roll ends
  | { kind: 'shockwave'; damage: number; radius: number } // around the hero when the roll ends
  | { kind: 'magnet'; mul: number } // pickup radius during the roll
  | { kind: 'medkit' } // drops a medkit when the roll ends
  | { kind: 'fireTrail'; dps: number } // burning ground left behind while rolling

export interface HeroDef {
  id: string
  name: string
  title: string
  rarity: number // 0 common, 2 rare (same colours as items)
  damage: number // damage % at level 1
  damagePerLevel: number
  hp: number // health at level 1
  hpPerLevel: number
  gems: number // unlock price; 0 = free from the start
  perk: RollPerk
  perkText: string
}

export const HERO_MAX_LEVEL = 25

export const HEROES: HeroDef[] = [
  {
    id: 'ivan', name: 'Иван', title: 'крестьянский сын', rarity: 0, damage: 0, damagePerLevel: 0.02, hp: 10, hpPerLevel: 2, gems: 0,
    perk: { kind: 'dodgeAfter', value: 0.1, time: 2 }, perkText: 'Уклонение +10% на 2 с после кувырка',
  },
  {
    id: 'alyosha', name: 'Алёша Попович', title: 'хитёр да ловок', rarity: 0, damage: 0.1, damagePerLevel: 0.03, hp: 25, hpPerLevel: 3, gems: 750,
    perk: { kind: 'speedAfter', value: 0.25, time: 1.5 }, perkText: 'Скорость бега +25% на 1,5 с после кувырка',
  },
  {
    id: 'dobrynya', name: 'Добрыня Никитич', title: 'змееборец', rarity: 0, damage: 0.2, damagePerLevel: 0.03, hp: 40, hpPerLevel: 4, gems: 3000,
    perk: { kind: 'attackSpeedAfter', value: 0.3, time: 2 }, perkText: 'Скорость атаки +30% на 2 с после кувырка',
  },
  {
    id: 'buslaev', name: 'Василий Буслаев', title: 'буян новгородский', rarity: 0, damage: 0.2, damagePerLevel: 0.03, hp: 40, hpPerLevel: 4, gems: 3000,
    perk: { kind: 'bomb', damage: 40, radius: 90 }, perkText: 'Бросает горшок с огненным зельем после кувырка',
  },
  {
    id: 'mikula', name: 'Микула Селянинович', title: 'пахарь-силач', rarity: 0, damage: 0.2, damagePerLevel: 0.03, hp: 40, hpPerLevel: 4, gems: 3000,
    perk: { kind: 'shockwave', damage: 30, radius: 150 }, perkText: 'Ударная волна вокруг после кувырка',
  },
  {
    id: 'volga', name: 'Вольга Святославич', title: 'оборотень-сокол', rarity: 0, damage: 0.2, damagePerLevel: 0.03, hp: 40, hpPerLevel: 4, gems: 3000,
    perk: { kind: 'magnet', mul: 3 }, perkText: 'Радиус сбора +200% во время кувырка',
  },
  {
    id: 'marya', name: 'Марья Моревна', title: 'королевна-воительница', rarity: 0, damage: 0.2, damagePerLevel: 0.03, hp: 40, hpPerLevel: 4, gems: 3000,
    perk: { kind: 'medkit' }, perkText: 'Оставляет флягу живой воды в конце кувырка',
  },
  {
    id: 'ilya', name: 'Илья Муромец', title: 'старший богатырь', rarity: 2, damage: 0.3, damagePerLevel: 0.04, hp: 50, hpPerLevel: 5, gems: 4500,
    perk: { kind: 'fireTrail', dps: 25 }, perkText: 'Земля горит там, где он прокатился',
  },
]

export function heroDef(id: string): HeroDef {
  return HEROES.find((h) => h.id === id) ?? HEROES[0]
}

export function heroDamage(h: HeroDef, level: number): number {
  return h.damage + h.damagePerLevel * (level - 1)
}

export function heroHp(h: HeroDef, level: number): number {
  return h.hp + h.hpPerLevel * (level - 1)
}

// Upgrading a hero costs gold and "живая вода" (living water).
export function heroUpgradeGold(level: number): number {
  return 300 * level
}

export function heroUpgradeWater(level: number): number {
  return level
}
