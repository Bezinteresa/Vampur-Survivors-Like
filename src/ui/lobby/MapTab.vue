<script setup lang="ts">
import { computed } from 'vue'
import { WAVE_COUNT } from '../../game/data/waves'
import { MAP_LEVELS } from '../../meta/content'
import type { Meta } from '../../meta/Meta'
import Icon from '../Icon.vue'

const props = defineProps<{ meta: Meta }>()
const emit = defineEmits<{ start: [] }>()
const p = props.meta.p
const i = computed(() => p.selectedLevel)
const level = computed(() => MAP_LEVELS[i.value])

function step(d: number) {
  props.meta.selectLevel(i.value + d)
}
</script>

<template>
  <div class="map-tab">
    <div class="level-carousel">
      <button class="round-nav" :disabled="i === 0" @click="step(-1)"><Icon name="left" /></button>
      <div class="level-card">
        <div class="level-island" :class="{ cleared: p.cleared[i] }">
          <Icon name="skull" :size="56" />
        </div>
        <div class="level-name">{{ i + 1 }}. {{ level.name }}</div>
        <div class="level-boss">Хозяин: <b>{{ level.boss }}</b> — {{ level.bossTitle }}</div>
        <div class="level-progress">
          <div class="fill" :style="{ width: `${(100 * p.best[i]) / WAVE_COUNT}%` }"></div>
          <span>{{ p.best[i] }}/{{ WAVE_COUNT }}</span>
        </div>
        <div class="hint">Враги сильнее ×{{ level.enemyMul }}{{ p.cleared[i] ? ' · босс побеждён' : '' }}</div>
      </div>
      <button class="round-nav" :disabled="i >= MAP_LEVELS.length - 1 || !meta.levelOpen(i + 1)" @click="step(1)"><Icon name="right" /></button>
    </div>
    <div v-if="i < MAP_LEVELS.length - 1 && !meta.levelOpen(i + 1)" class="hint">Победите босса, чтобы открыть следующую локацию.</div>

    <div class="map-actions">
      <button class="btn" disabled title="Откроется после прохождения всех локаций">Обычная</button>
      <button class="btn btn-green big" @click="emit('start')"><Icon name="play" :size="24" /> Старт</button>
    </div>
    <div class="hint">Сложности «Герой» и «Кошмар» откроются после прохождения всех локаций.</div>
  </div>
</template>
