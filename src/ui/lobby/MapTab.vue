<script setup lang="ts">
import { t } from '../../i18n'
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
const level = computed(() => MAP_LEVELS[i.value])
const locked = computed(() => !props.meta.levelOpen(i.value))

function step(d: number) {
  const next = Math.max(0, Math.min(MAP_LEVELS.length - 1, i.value + d))
  i.value = next
  if (props.meta.levelOpen(next)) props.meta.selectLevel(next)
}
</script>

<template>
  <div class="map-tab">
    <div v-swipe="{ left: () => step(1), right: () => step(-1) }" class="level-carousel">
      <button class="round-nav" :disabled="i === 0" @click="step(-1)"><Icon name="left" /></button>
      <div class="level-card">
        <div class="island-wrap" :class="{ locked }">
          <SpriteIcon class="island-pic" :file="SPRITE.location(LOCATIONS[i].id)">
            <div class="level-island" :class="{ cleared: p.cleared[i] }">
              <Icon name="skull" :size="56" />
            </div>
          </SpriteIcon>
          <div v-if="locked" class="level-lock"><Icon name="lock" :size="64" /></div>
        </div>
        <div class="level-name">{{ i + 1 }}. {{ level.name }}</div>
        <div class="level-boss">{{ t('Хозяин:') }} <b>{{ level.boss }}</b> — {{ level.bossTitle }}</div>
        <div class="level-progress">
          <div class="fill" :style="{ width: `${(100 * p.best[i]) / WAVE_COUNT}%` }"></div>
          <span>{{ p.best[i] }}/{{ WAVE_COUNT }}</span>
        </div>
        <div class="hint">{{ level.enemyMul > 1 ? t('Враги сильнее ×{n}', { n: level.enemyMul }) : '' }}{{ p.cleared[i] ? t(' · босс побеждён') : '' }}</div>
      </div>
      <button class="round-nav" :disabled="i >= MAP_LEVELS.length - 1" @click="step(1)"><Icon name="right" /></button>
    </div>
    <div v-if="locked" class="hint">{{ t('Откроется, когда будет побеждён хозяин локации «{name}».', { name: MAP_LEVELS[i - 1].name }) }}</div>
    <div v-else-if="i < MAP_LEVELS.length - 1 && !meta.levelOpen(i + 1)" class="hint">{{ t('Победите босса, чтобы открыть следующую локацию.') }}</div>

    <div class="map-actions">
      <button class="btn" disabled :title="t('Откроется после прохождения всех локаций')">{{ t('Обычная') }}</button>
      <button class="btn btn-green big" :disabled="locked" @click="emit('start')"><Icon :name="locked ? 'lock' : 'play'" :size="24" /> {{ t('Старт') }}</button>
    </div>
    <div class="hint">{{ t('Сложности «Герой» и «Кошмар» откроются после прохождения всех локаций.') }}</div>
  </div>
</template>
