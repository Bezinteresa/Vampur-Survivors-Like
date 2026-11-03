<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { Game } from '../game/Game'
import { VIEW, resetView, saveView } from '../game/view'
import Icon from './Icon.vue'

// Tuning panel for the battle camera and the bogatyr size. While it is open the game stands still
// (camera changes still play, so the start-of-battle pull-back can be replayed).
const props = defineProps<{ game: Game }>()
const open = ref(false)
let savedScale = 1

type Key = 'start' | 'final' | 'delay' | 'zoomTime' | 'heroSize'
const SLIDERS: { key: Key; name: string; min: number; max: number; step: number; show: 'intro' | 'final' | null }[] = [
  { key: 'start', name: 'Камера в начале боя (близко)', min: 160, max: 800, step: 10, show: 'intro' },
  { key: 'final', name: 'Камера после отъезда', min: 160, max: 800, step: 10, show: 'final' },
  { key: 'delay', name: 'Через сколько начинает отъезжать, с', min: 0, max: 5, step: 0.1, show: 'intro' },
  { key: 'zoomTime', name: 'Сколько длится отъезд, с', min: 0.2, max: 5, step: 0.1, show: 'intro' },
  { key: 'heroSize', name: 'Размер богатыря', min: 30, max: 120, step: 2, show: null },
]

const values = computed(() => `start: ${VIEW.start}, final: ${VIEW.final}, delay: ${VIEW.delay}, zoomTime: ${VIEW.zoomTime}, heroSize: ${VIEW.heroSize}`)
const settledAt = computed(() => Math.round((VIEW.delay + VIEW.zoomTime) * 10) / 10)

function toggle() {
  open.value = !open.value
  if (open.value) {
    savedScale = props.game.timeScale
    props.game.timeScale = 0
  } else {
    props.game.timeScale = savedScale || 1
  }
}

function change(key: Key, value: number, show: 'intro' | 'final' | null) {
  VIEW[key] = value
  saveView()
  if (show === 'final') props.game.previewFinal()
}

// Sliders that shape the pull-back replay it when released, so the result is visible right away.
function release(show: 'intro' | 'final' | null) {
  if (show === 'intro') props.game.previewIntro()
}

// If the panel disappears while open (the game paused itself), never leave the game frozen.
onBeforeUnmount(() => {
  if (open.value) props.game.timeScale = savedScale || 1
})

function reset() {
  resetView()
  props.game.previewIntro()
}
</script>

<template>
  <button class="round-btn view-btn" title="Настройка камеры" @click="toggle"><Icon name="gear" /></button>
  <div v-if="open" v-drag-scroll class="view-panel">
    <div class="panel-title">Камера и размер богатыря</div>
    <div class="hint left">Меньше число — камера ближе. Камера встаёт на место через {{ settledAt }} с после начала боя. Игра стоит, пока панель открыта.</div>
    <label v-for="s in SLIDERS" :key="s.key" class="view-row">
      <span>{{ s.name }}: <b>{{ VIEW[s.key] }}</b></span>
      <input
        type="range"
        :min="s.min"
        :max="s.max"
        :step="s.step"
        :value="VIEW[s.key]"
        @input="change(s.key, +($event.target as HTMLInputElement).value, s.show)"
        @change="release(s.show)"
      />
    </label>
    <div class="view-actions">
      <button class="btn small btn-blue" @click="game.previewIntro()">Начало боя</button>
      <button class="btn small btn-blue" @click="game.previewFinal()">После отъезда</button>
      <button class="btn small" @click="reset">Сбросить</button>
    </div>
    <div class="view-values">{{ values }}</div>
    <div class="hint left">Пришлите эту строку — внесу значения в игру.</div>
    <button class="btn btn-green" @click="toggle">Закрыть</button>
  </div>
</template>
