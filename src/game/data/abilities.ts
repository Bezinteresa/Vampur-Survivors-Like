// Active abilities on the two buttons. In the lobby they are equipment items; the player picks which two to take.
export type AbilityEffect = 'roll' | 'rapidFire' | 'heal' | 'frostNova' | 'shockwave'

export interface AbilityDef {
  id: string
  name: string
  effect: AbilityEffect
  cooldown: number
  duration: number
  // roll: speed multiplier; rapidFire: added attack speed; heal: share of max HP;
  // frostNova: radius; shockwave: damage (radius is fixed)
  power: number
  icon: string
  text: string
}

export const ABILITIES: Record<string, AbilityDef> = {
  roll: { id: 'roll', name: 'Кувырок', effect: 'roll', cooldown: 8, duration: 0.28, power: 3.2, icon: 'roll', text: 'Рывок с неуязвимостью' },
  rapidFire: {
    id: 'rapidFire', name: 'Скорострельность', effect: 'rapidFire', cooldown: 35, duration: 6, power: 1, icon: 'bolt',
    text: 'Скорость атаки +100% на время действия',
  },
  heal: { id: 'heal', name: 'Перевязка', effect: 'heal', cooldown: 40, duration: 0, power: 0.3, icon: 'heart', text: 'Сразу лечит 30% здоровья' },
  frostNova: {
    id: 'frostNova', name: 'Ледяная волна', effect: 'frostNova', cooldown: 35, duration: 2.5, power: 420, icon: 'snow',
    text: 'Замораживает всех врагов вокруг',
  },
  shockwave: {
    id: 'shockwave', name: 'Ударная волна', effect: 'shockwave', cooldown: 25, duration: 0, power: 40, icon: 'wave',
    text: 'Отбрасывает врагов рядом и наносит урон',
  },
}

export const DEFAULT_LOADOUT = ['roll', 'rapidFire']
