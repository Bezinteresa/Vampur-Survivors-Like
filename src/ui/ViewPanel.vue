<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import type { Game } from '../game/Game'
import { VIEW, resetView, saveView } from '../game/view'
import Icon from './Icon.vue'

// Tuning panel for the battle camera and the bogatyr size. While it is open the game stands still.
const props = defineProps<{ game: Game }>()
const open = ref(false)
let savedScale = 1

const SLIDERS: { key: 'wave1' | 'wave2' | 'final' | 'zoomTime' | 'heroSize'; name: string; min: number; max: number; step: number; preview?: number }[] = [
  { key: 'wave1', name: 'Камера: волна 1 (близко)', min: 160, max: 800, step: 10, preview: 1 },
  { key: 'wave2', name: 'Камера: волна 2', min: 160, max: 800, step: 10, preview: 2 },
  { key: 'final', name: 'Камера: с 3-й волны (финал)', min: 160, max: 800, step: 10, preview: 3 },
  { key: 'zoomTime', name: 'Время перехода камеры, с', min: 0.2, max: 4, step: 0.1 },
  { key: 'heroSize', name: 'Размер богатыря', min: 30, max: 120, step: 2 },
]

const values = computed(() => `wave1: ${VIEW.wave1}, wave2: ${VIEW.wave2}, final: ${VIEW.final}, zoomTime: ${VIEW.zoomTime}, heroSize: ${VIEW.heroSize}`)

function toggle() {
  open.value = !open.value
  if (open.value) {
    savedScale = props.game.timeScale
    props.game.timeScale = 0
  } else {
    props.game.timeScale = savedScale || 1
  }
}

function change(key: (typeof SLIDERS)[number]['key'], value: number, preview?: number) {
  VIEW[key] = value
  saveView()
  if (preview) props.game.previewZoom(preview)
}

// If the panel disappears while open (the game paused itself), never leave the game frozen.
onBeforeUnmount(() => {
  if (open.value) props.game.timeScale = savedScale || 1
})

function reset() {
  resetView()
  props.game.previewZoom(props.game.ui.wave)
}
</script>

<template>
  <button class="round-btn view-btn" title="Настройка камеры" @click="toggle"><Icon name="gear" /></button>
  <div v-if="open" v-drag-scroll class="view-panel">
    <div class="panel-title">Камера и размер богатыря</div>
    <div class="hint left">Меньше число — камера ближе. Игра стоит, пока панель открыта.</div>
    <label v-for="s in SLIDERS" :key="s.key" class="view-row">
      <span>{{ s.name }}: <b>{{ VIEW[s.key] }}</b></span>
      <input
        type="range"
        :min="s.min"
        :max="s.max"
        :step="s.step"
        :value="VIEW[s.key]"
        @input="change(s.key, +($event.target as HTMLInputElement).value, s.preview)"
      />
    </label>
    <div class="view-actions">
      <button class="btn small btn-blue" @click="game.previewZoom(1)">Волна 1</button>
      <button class="btn small btn-blue" @click="game.previewZoom(2)">Волна 2</button>
      <button class="btn small btn-blue" @click="game.previewZoom(3)">Финал</button>
      <button class="btn small" @click="reset">Сбросить</button>
    </div>
    <div class="view-values">{{ values }}</div>
    <div class="hint left">Пришлите эту строку — внесу значения в игру.</div>
    <button class="btn btn-green" @click="toggle">Закрыть</button>
  </div>
</template>
