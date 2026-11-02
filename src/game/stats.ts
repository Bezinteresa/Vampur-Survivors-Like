// Hero characteristics. Run upgrades (level-up cards) add to these values.
export interface Stats {
  maxHp: number
  regen: number // HP per second
  armor: number // damage × 15 / (15 + armor)
  dodge: number // chance 0..0.6
  damagePct: number
  meleeDmg: number
  rangedDmg: number
  elementDmg: number
  attackSpeed: number
  critChance: number
  critMult: number
  range: number
  knockback: number
  moveSpeed: number
  pickupRadius: number
  profit: number // chance of an extra coin per kill
  luck: number
  cooldownPct: number // ability cooldown reduction, capped at 60%
  bossDmg: number
}

export const BASE_STATS: Stats = {
  maxHp: 100,
  regen: 0,
  armor: 0,
  dodge: 0,
  damagePct: 0,
  meleeDmg: 0,
  rangedDmg: 0,
  elementDmg: 0,
  attackSpeed: 0,
  critChance: 0.05,
  critMult: 1.5,
  range: 0,
  knockback: 0,
  moveSpeed: 220,
  pickupRadius: 90,
  profit: 0,
  luck: 0,
  cooldownPct: 0,
  bossDmg: 0,
}

export const STAT_LABELS: Record<keyof Stats, string> = {
  maxHp: 'Здоровье',
  regen: 'Восстановление',
  armor: 'Броня',
  dodge: 'Уклонение',
  damagePct: 'Урон',
  meleeDmg: 'Ближний урон',
  rangedDmg: 'Дальний урон',
  elementDmg: 'Стихийный урон',
  attackSpeed: 'Скорость атаки',
  critChance: 'Крит. шанс',
  critMult: 'Сила крита',
  range: 'Дальность',
  knockback: 'Отталкивание',
  moveSpeed: 'Скорость',
  pickupRadius: 'Радиус сбора',
  profit: 'Прибыль',
  luck: 'Удача',
  cooldownPct: 'Перезарядка',
  bossDmg: 'Урон по боссам',
}

const PERCENT_STATS = new Set<keyof Stats>([
  'dodge', 'damagePct', 'attackSpeed', 'critChance', 'knockback', 'profit', 'luck', 'cooldownPct', 'bossDmg',
])

export function isPercentStat(key: keyof Stats): boolean {
  return PERCENT_STATS.has(key)
}

export function formatStat(key: keyof Stats, value: number): string {
  if (PERCENT_STATS.has(key)) return `${Math.round(value * 100)}%`
  if (key === 'critMult') return `×${value.toFixed(2)}`
  return `${Math.round(value * 10) / 10}`
}
