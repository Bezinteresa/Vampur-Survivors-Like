<script setup lang="ts">
import { t } from '../../i18n'
import { bootState } from '../../platform/boot'
import { computed, ref } from 'vue'
import { WAVE_COUNT } from '../../game/data/waves'
import { MAP_LEVELS } from '../../meta/content'
import type { Meta } from '../../meta/Meta'
import { LOCATIONS } from '../../game/data/bestiary'
import { SPRITE } from '../../sprites'
import Icon from '../Icon.vue'
import SpriteIcon from '../SpriteIcon.vue'

const props = defineProps<{ meta: Meta }>()
const emit = defineEmits<{ start: [] }>()
const p = props.meta.p

// Every location can be looked at; a locked one shows a lock and cannot be started.
// Looking at an open location also selects it for the next run.
const i = ref(p.selectedLevel)
const locked = computed(() => !props.meta.levelOpen(i.value))
const last = MAP_LEVELS.length - 1

function go(next: number) {
  i.value = Math.max(0, Math.min(last, next))
  if (props.meta.levelOpen(i.value)) props.meta.selectLevel(i.value)
}

// The cards stand in a row; the row follows the finger and slides to the nearest card when let go.
const viewport = ref<HTMLElement>()
const drag = ref(0) // px the row is pulled by the finger
const dragging = ref(false)
let x0 = 0
let y0 = 0
let t0 = 0
let pointer: number | null = null
let horizontal: boolean | null = null
let swallowClick = false

function down(e: PointerEvent) {
  pointer = e.pointerId
  x0 = e.clientX
  y0 = e.clientY
  t0 = performance.now()
  horizontal = null
}

function move(e: PointerEvent) {
  if (e.pointerId !== pointer) return
  const dx = e.clientX - x0
  const dy = e.clientY - y0
  if (horizontal === null && Math.hypot(dx, dy) > 8) {
    horizontal = Math.abs(dx) > Math.abs(dy)
    if (horizontal) {
      dragging.value = true
      viewport.value?.setPointerCapture(e.pointerId)
    }
  }
  if (!horizontal) return
  // Past the first and the last card the row gives way only a little.
  const edge = (dx > 0 && i.value === 0) || (dx < 0 && i.value === last)
  drag.value = edge ? dx * 0.25 : dx
}

function up(e: PointerEvent) {
  if (e.pointerId !== pointer) return
  pointer = null
  if (!dragging.value) return
  // The lobby's own swipe (switching tabs) must not see this gesture, and it is not a tap.
  e.stopPropagation()
  swallowClick = true
  setTimeout(() => (swallowClick = false), 0)
  const width = viewport.value?.clientWidth ?? 300
  const dx = drag.value
  const fast = Math.abs(dx) / Math.max(1, performance.now() - t0) > 0.5
  dragging.value = false
  drag.value = 0
  if (Math.abs(dx) > width * 0.25 || (fast && Math.abs(dx) > 30)) go(i.value + (dx < 0 ? 1 : -1))
}

function cancel() {
  pointer = null
  dragging.value = false
  drag.value = 0
}

function click(e: MouseEvent) {
  if (swallowClick) e.stopPropagation()
}

const rowStyle = computed(() => ({
  transform: `translateX(calc(${-i.value * 100}% + ${drag.value}px))`,
  transition: dragging.value ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
}))
</script>

<template>
  <div class="map-tab">
    <div class="level-carousel">
      <div
        ref="viewport"
        class="level-viewport"
        @pointerdown="down"
        @pointermove="move"
        @pointerup="up"
        @pointercancel="cancel"
        @click.capture="click"
      >
        <div class="level-row" :style="rowStyle">
          <div v-for="(lv, k) in MAP_LEVELS" :key="k" class="level-card">
            <div class="island-wrap" :class="{ locked: !meta.levelOpen(k) }">
              <SpriteIcon class="island-pic" :file="SPRITE.location(LOCATIONS[k].id)">
                <div class="level-island" :class="{ cleared: p.cleared[k] }">
                  <Icon name="skull" :size="56" />
                </div>
              </SpriteIcon>
              <div v-if="!meta.levelOpen(k)" class="level-lock"><Icon name="lock" :size="64" /></div>
            </div>
            <div class="level-name">{{ k + 1 }}. {{ lv.name }}</div>
            <div class="level-boss">{{ t('Хозяин:') }} <b>{{ lv.boss }}</b> — {{ lv.bossTitle }}</div>
            <div class="level-progress">
              <div class="fill" :style="{ width: `${(100 * p.best[k]) / WAVE_COUNT}%` }"></div>
              <span>{{ p.best[k] }}/{{ WAVE_COUNT }}</span>
            </div>
            <div class="hint">{{ lv.enemyMul > 1 ? t('Враги сильнее ×{n}', { n: lv.enemyMul }) : '' }}{{ p.cleared[k] ? t(' · босс побеждён') : '' }}</div>
          </div>
        </div>
      </div>
      <button class="round-nav left" :disabled="i === 0" @click="go(i - 1)"><Icon name="left" /></button>
      <button class="round-nav right" :disabled="i >= last" @click="go(i + 1)"><Icon name="right" /></button>
    </div>
    <div class="level-dots">
      <span v-for="(_, k) in MAP_LEVELS" :key="k" :class="{ on: k === i, locked: !meta.levelOpen(k) }"></span>
    </div>
    <div v-if="locked" class="hint">{{ t('Откроется, когда будет побеждён хозяин локации «{name}».', { name: MAP_LEVELS[i - 1].name }) }}</div>
    <div v-else-if="i < last && !meta.levelOpen(i + 1)" class="hint">{{ t('Победите босса, чтобы открыть следующую локацию.') }}</div>

    <div class="map-actions">
      <button class="btn" disabled :title="t('Откроется после прохождения всех локаций')">{{ t('Обычная') }}</button>
      <!-- On our own site Start waits until Bridge has started (bootState.blocked). -->
      <button class="btn btn-green big" :disabled="locked || bootState.blocked" @click="emit('start')">
        <Icon :name="locked ? 'lock' : 'play'" :size="24" /> {{ bootState.blocked && !locked ? t('Загрузка…') : t('Старт') }}
      </button>
    </div>
    <div class="hint">{{ t('Сложности «Герой» и «Кошмар» откроются после прохождения всех локаций.') }}</div>
  </div>
</template>
