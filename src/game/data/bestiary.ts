// Old Russian fairy-tale setting: eight locations, each with its master (boss) and minions to match.
// A minion's behaviour comes from its archetype (`ai`); the location only gives it a name, a colour and a role.

export type Ai =
  | 'chaser' // walks up and bites
  | 'roller' // bigger; winds up and rolls forward
  | 'shotgun' // keeps distance, charges (changes colour), fires a spread of pellets
  | 'beam' // keeps distance, charges, fires a beam
  | 'twinBeam' // two beams that close in like scissors, so the hero cannot dodge sideways
  | 'splitter' // big; splits into small ones on death
  | 'small' // split-off small one: weak and quick
  | 'rocket' // rarely fires a slow homing rocket
  | 'poison' // leaves a poison puddle on death
  | 'coin' // harmless thief that runs away and drops a pile of coins
  | 'egg' // Koschei's egg: does not move, the boss dies when it breaks
  | 'boss'

export interface EnemyDef {
  id: string
  name: string
  ai: Ai
  hp: number
  dmg: number // contact damage; shots and beams scale from it
  speed: number
  radius: number
  color: number
  coin: number // coins (= experience) dropped
  medkit: number // chance to drop a medkit
  keep: number // preferred distance for ranged ones (0 = melee)
  boss?: BossDef
}

type Stats = Omit<EnemyDef, 'id' | 'name' | 'ai' | 'color' | 'boss'>

export const ARCHETYPES: Record<Exclude<Ai, 'boss'>, Stats> = {
  chaser: { hp: 14, dmg: 5, speed: 85, radius: 15, coin: 1, medkit: 0.012, keep: 0 },
  roller: { hp: 45, dmg: 9, speed: 55, radius: 23, coin: 3, medkit: 0.04, keep: 0 },
  shotgun: { hp: 18, dmg: 4, speed: 70, radius: 15, coin: 2, medkit: 0.015, keep: 260 },
  beam: { hp: 20, dmg: 9, speed: 60, radius: 16, coin: 2, medkit: 0.015, keep: 300 },
  twinBeam: { hp: 26, dmg: 8, speed: 60, radius: 17, coin: 3, medkit: 0.02, keep: 300 },
  splitter: { hp: 50, dmg: 8, speed: 55, radius: 24, coin: 2, medkit: 0.03, keep: 0 },
  small: { hp: 8, dmg: 3, speed: 115, radius: 10, coin: 0, medkit: 0, keep: 0 },
  rocket: { hp: 24, dmg: 12, speed: 55, radius: 17, coin: 3, medkit: 0.02, keep: 340 },
  poison: { hp: 16, dmg: 5, speed: 80, radius: 15, coin: 1, medkit: 0.012, keep: 0 },
  coin: { hp: 30, dmg: 0, speed: 125, radius: 13, coin: 14, medkit: 0, keep: 0 },
  egg: { hp: 150, dmg: 0, speed: 0, radius: 18, coin: 0, medkit: 0, keep: 0 },
}

// ---------- bosses ----------

export type BossAttack =
  | { kind: 'dash' }
  | { kind: 'fan'; count: number; spread: number } // pellets toward the hero
  | { kind: 'ring'; count: number } // bullets in every direction
  | { kind: 'beam' }
  | { kind: 'twinBeam' }
  | { kind: 'tripleBeam' }
  | { kind: 'rockets'; count: number }
  | { kind: 'summon'; ai: Ai; count: number }
  | { kind: 'puddles'; count: number }

export interface BossDef {
  name: string
  title: string // short line for the map card
  attacks: BossAttack[] // used in turn, with a chase between them
  immortal?: boolean // Koschei: below 30% health he cannot die until his egg is broken
}

// ---------- locations ----------

type Roster = Record<Exclude<Ai, 'boss' | 'egg'>, [string, number]> // name, colour

export interface LocationDef {
  id: string
  name: string
  enemyMul: number // health and damage of enemies (boss included)
  ground: string // flat colour of the battlefield
  roster: Roster
  boss: { name: string; color: number; radius: number; def: BossDef }
}

export const LOCATIONS: LocationDef[] = [
  {
    id: 'forest', name: 'Дремучий лес', enemyMul: 0.85, ground: '#6b7738',
    roster: {
      chaser: ['Серый волк', 0x8a929a], roller: ['Дикий вепрь', 0x7a5a44], shotgun: ['Ёж-колючник', 0x8d7a4a],
      beam: ['Гнилушка-светляк', 0x9fc46a], twinBeam: ['Корневик', 0x6e5a3e], splitter: ['Пень-трухляк', 0x6b4f35],
      small: ['Опёнок', 0xc9a46a], rocket: ['Филин-вестник', 0x9a8466], poison: ['Мухоморник', 0xc0403a], coin: ['Белка-воровка', 0xd08a3a],
    },
    boss: {
      name: 'Леший', color: 0x4f6b3a, radius: 58,
      def: { name: 'Леший', title: 'хозяин леса', attacks: [{ kind: 'summon', ai: 'chaser', count: 5 }, { kind: 'dash' }, { kind: 'twinBeam' }, { kind: 'fan', count: 7, spread: 0.9 }] },
    },
  },
  {
    id: 'swamp', name: 'Гиблое болото', enemyMul: 1.6, ground: '#5b6a44',
    roster: {
      chaser: ['Болотник', 0x6f8a6a], roller: ['Кочка-ползун', 0x5d6b3e], shotgun: ['Лягух-плевун', 0x7fa84a],
      beam: ['Блуждающий огонёк', 0xb8e0ff], twinBeam: ['Огоньки-близнецы', 0x9ad0f0], splitter: ['Тинник', 0x4f6a4a],
      small: ['Пиявка', 0x3a3a3a], rocket: ['Комар-кровопийца', 0x8a6a7a], poison: ['Жаба-ядовитка', 0x8fb83a], coin: ['Выпь-хапуга', 0xb09060],
    },
    boss: {
      name: 'Кикимора', color: 0x5a7a50, radius: 54,
      def: { name: 'Кикимора', title: 'болотная хозяйка', attacks: [{ kind: 'puddles', count: 4 }, { kind: 'fan', count: 9, spread: 1.1 }, { kind: 'summon', ai: 'poison', count: 4 }, { kind: 'dash' }] },
    },
  },
  {
    id: 'pool', name: 'Тёмный омут', enemyMul: 2.4, ground: '#4f6466',
    roster: {
      chaser: ['Утопленник', 0x7a9a9a], roller: ['Сом-усач', 0x5a6a70], shotgun: ['Водяница', 0x6ab0c0],
      beam: ['Омутник', 0x4a8ab0], twinBeam: ['Водоворот', 0x5aa0d0], splitter: ['Ракушник', 0x9a8a7a],
      small: ['Рачок', 0xc06a4a], rocket: ['Щука-зубатка', 0x6a7a5a], poison: ['Тинная слизь', 0x7aa04a], coin: ['Налим с кладом', 0xb0a070],
    },
    boss: {
      name: 'Водяной', color: 0x3f7a8a, radius: 60,
      def: { name: 'Водяной', title: 'дед омута', attacks: [{ kind: 'ring', count: 16 }, { kind: 'summon', ai: 'chaser', count: 6 }, { kind: 'beam' }, { kind: 'ring', count: 20 }, { kind: 'dash' }] },
    },
  },
  {
    id: 'road', name: 'Разбойничья дорога', enemyMul: 3.4, ground: '#86775a',
    roster: {
      chaser: ['Разбойник с кистенём', 0x8a6a5a], roller: ['Детина с бочкой', 0x7a5a3a], shotgun: ['Самопальщик', 0x6a6a5a],
      beam: ['Лучник', 0x8a7a5a], twinBeam: ['Свистун', 0x9a8a6a], splitter: ['Атаман-толстяк', 0x7a4a3a],
      small: ['Подручный', 0x9a7a6a], rocket: ['Ловчий сокол', 0x8a7a6a], poison: ['Корчмарь с отравой', 0x6a8a4a], coin: ['Карманник', 0xc0a050],
    },
    boss: {
      name: 'Соловей-Разбойник', color: 0x7a5a3a, radius: 56,
      def: { name: 'Соловей-Разбойник', title: 'свистит — деревья гнутся', attacks: [{ kind: 'fan', count: 13, spread: 1.6 }, { kind: 'twinBeam' }, { kind: 'dash' }, { kind: 'summon', ai: 'shotgun', count: 3 }] },
    },
  },
  {
    id: 'cave', name: 'Пещера Лиха', enemyMul: 4.6, ground: '#5d5d63',
    roster: {
      chaser: ['Нетопырь', 0x5a4a5a], roller: ['Камнекат', 0x7a7a7a], shotgun: ['Кремнемёт', 0x8a8070],
      beam: ['Глазастик', 0xd0d0a0], twinBeam: ['Сглазник', 0xa0a0d0], splitter: ['Каменный истукан', 0x6a6a6a],
      small: ['Камешник', 0x9a9a9a], rocket: ['Бродячий огонь', 0xe08a3a], poison: ['Гнилец', 0x7a8a4a], coin: ['Медянка с самоцветом', 0x4ab08a],
    },
    boss: {
      name: 'Лихо Одноглазое', color: 0x6a5a5a, radius: 64,
      def: { name: 'Лихо Одноглазое', title: 'не буди лихо', attacks: [{ kind: 'dash' }, { kind: 'rockets', count: 2 }, { kind: 'beam' }, { kind: 'ring', count: 14 }, { kind: 'dash' }] },
    },
  },
  {
    id: 'hut', name: 'Избушка на курьих ножках', enemyMul: 6, ground: '#594a3a',
    roster: {
      chaser: ['Чёрный кот', 0x3a3a44], roller: ['Курья ножка', 0xc0a070], shotgun: ['Ворона-каркуша', 0x4a4a5a],
      beam: ['Череп-фонарь', 0xe0d090], twinBeam: ['Два черепа', 0xd0c080], splitter: ['Котёл с варевом', 0x5a5a5a],
      small: ['Лягушонок', 0x7ab04a], rocket: ['Метла-самолётка', 0x9a7a4a], poison: ['Ведьмин гриб', 0xa04a9a], coin: ['Кладовик', 0xd0b050],
    },
    boss: {
      name: 'Баба Яга', color: 0x6a4a6a, radius: 56,
      def: { name: 'Баба Яга', title: 'костяная нога', attacks: [{ kind: 'dash' }, { kind: 'rockets', count: 3 }, { kind: 'summon', ai: 'chaser', count: 6 }, { kind: 'puddles', count: 3 }, { kind: 'twinBeam' }] },
    },
  },
  {
    id: 'bridge', name: 'Калинов мост', enemyMul: 7.8, ground: '#6a4838',
    roster: {
      chaser: ['Огненный ящер', 0xb05a3a], roller: ['Змеёныш-катун', 0x8a6a3a], shotgun: ['Огнеплюй', 0xd07a3a],
      beam: ['Жар-змейка', 0xf0a040], twinBeam: ['Двуглавый змеёныш', 0xc06a3a], splitter: ['Змеиное яйцо', 0xd0c0a0],
      small: ['Змеёныш', 0x9a7a3a], rocket: ['Огненная искра', 0xf0c040], poison: ['Гадюка', 0x6a8a3a], coin: ['Золотой полоз', 0xe0c040],
    },
    boss: {
      name: 'Змей Горыныч', color: 0x4a7a3a, radius: 70,
      def: { name: 'Змей Горыныч', title: 'три головы, три огня', attacks: [{ kind: 'tripleBeam' }, { kind: 'fan', count: 9, spread: 1 }, { kind: 'ring', count: 18 }, { kind: 'dash' }, { kind: 'tripleBeam' }] },
    },
  },
  {
    id: 'koschei', name: 'Царство Кощея', enemyMul: 10, ground: '#46465a',
    roster: {
      chaser: ['Костяной воин', 0xd8d4c4], roller: ['Костяной конь', 0xc8c4b4], shotgun: ['Костомёт', 0xb8b4a4],
      beam: ['Мертвяк-колдун', 0x8a9ab0], twinBeam: ['Чёрный колдун', 0x5a5a7a], splitter: ['Груда костей', 0xa8a494],
      small: ['Костяшка', 0xe8e4d4], rocket: ['Ворон Кощея', 0x3a3a4a], poison: ['Упырь', 0x7a5a6a], coin: ['Кощеев казначей', 0xd0b040],
    },
    boss: {
      name: 'Кощей Бессмертный', color: 0x2e2e3a, radius: 56,
      def: {
        name: 'Кощей Бессмертный', title: 'смерть его в игле, игла в яйце', immortal: true,
        attacks: [{ kind: 'summon', ai: 'chaser', count: 8 }, { kind: 'beam' }, { kind: 'ring', count: 16 }, { kind: 'twinBeam' }, { kind: 'rockets', count: 2 }],
      },
    },
  },
]

const BOSS_HP = 8000

// Enemy definitions for one location, keyed by archetype ('boss' and 'egg' included).
export function locationRoster(index: number): Record<string, EnemyDef> {
  const loc = LOCATIONS[index]
  const out: Record<string, EnemyDef> = {}
  for (const [ai, [name, color]] of Object.entries(loc.roster) as [Exclude<Ai, 'boss' | 'egg'>, [string, number]][]) {
    out[ai] = { id: `${loc.id}_${ai}`, name, ai, color, ...ARCHETYPES[ai] }
  }
  out.egg = { id: 'egg', name: 'Яйцо с иглой', ai: 'egg', color: 0xf0ead0, ...ARCHETYPES.egg }
  const b = loc.boss
  out.boss = {
    id: `${loc.id}_boss`, name: b.name, ai: 'boss', color: b.color, hp: BOSS_HP, dmg: 28, speed: 70, radius: b.radius,
    coin: 0, medkit: 0, keep: 0, boss: b.def,
  }
  return out
}
