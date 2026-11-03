<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Game } from '../game/Game'
import { t } from '../i18n'
import type { Meta } from '../meta/Meta'
import Icon from './Icon.vue'

// First-run tips, each shown once (Playgama 3.1.3: the game teaches its controls and goal):
// the first battle — moving, automatic shooting, ability buttons and where to change them;
// the first level-up — what the cards are for; the first shop — what is bought and how.
// While a battle tip is open the field stands still (game.hold).
const props = defineProps<{ game: Game; meta: Meta }>()

type Topic = 'battle' | 'levelup' | 'shop'
interface Step {
  icon: string
  title: string
  text: string
}

const STEPS: Record<Topic, Step[]> = {
  battle: [
    { icon: 'hero', title: 'Движение', text: 'Ведите пальцем по экрану — богатырь пойдёт туда. На компьютере — клавиши WASD или стрелки.' },
    { icon: 'swords', title: 'Стрельба сама', text: 'Оружие стреляет само по ближайшему врагу. Ваше дело — двигаться, уворачиваться и собирать монеты.' },
    {
      icon: 'roll',
      title: 'Способности',
      text: 'Кнопки слева внизу — кувырок и скорострельность (на компьютере Пробел и E). Набор способностей меняется в лобби: Герой → Экипировка.',
    },
  ],
  levelup: [
    {
      icon: 'up',
      title: 'Новый уровень',
      text: 'Монеты — это и опыт. За каждый новый уровень выберите одно пассивное улучшение: оно действует до конца забега.',
    },
  ],
  shop: [
    {
      icon: 'shop',
      title: 'Лавка между волнами',
      text: 'Карточки оружия и предметов покупаются за монеты забега. «Обновить» меняет карточки, замок оставляет карточку до следующей волны. Два одинаковых оружия одного тира объединяются в более сильное.',
    },
  ],
}

const topic = ref<Topic | null>(null)
const step = ref(0)
const current = computed(() => (topic.value ? STEPS[topic.value][step.value] : null))
const last = computed(() => !!topic.value && step.value >= STEPS[topic.value].length - 1)

function show(next: Topic) {
  if (topic.value || props.meta.p.tutorial[next]) return
  topic.value = next
  step.value = 0
  props.game.hold = next === 'battle'
}

function advance() {
  if (!topic.value) return
  if (!last.value) {
    step.value++
    return
  }
  props.meta.tutorialDone(topic.value)
  // The camera's start-of-battle pull-back plays after the tips, not hidden behind them.
  if (topic.value === 'battle') props.game.previewIntro()
  props.game.hold = false
  topic.value = null
}

watch(
  () => props.game.ui.screen,
  (s) => {
    if (s === 'wave' && props.game.ui.wave === 1) show('battle')
    else if (s === 'levelup') show('levelup')
    else if (s === 'shop') show('shop')
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="current" class="tutorial-back">
    <div class="modal tutorial-card">
      <div class="tutorial-icon"><Icon :name="current.icon" :size="40" /></div>
      <div class="panel-title">{{ t(current.title) }}</div>
      <div class="hint">{{ t(current.text) }}</div>
      <button class="btn btn-green" @click="advance">{{ last ? t('Понятно') : t('Дальше') }}</button>
    </div>
  </div>
</template>
