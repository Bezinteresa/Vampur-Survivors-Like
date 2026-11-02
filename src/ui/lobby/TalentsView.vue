<script setup lang="ts">
import { formatStat } from '../../game/stats'
import { TALENTS, talentCost } from '../../meta/content'
import type { Meta } from '../../meta/Meta'
import Icon from '../Icon.vue'

const props = defineProps<{ meta: Meta }>()
const p = props.meta.p
</script>

<template>
  <div class="talents">
    <div class="sub">Таланты усиливают героя навсегда</div>
    <div class="talent-grid">
      <div v-for="t in TALENTS" :key="t.id" class="talent" :class="{ maxed: (p.talents[t.id] ?? 0) >= t.max }">
        <div class="talent-name">{{ t.name }}</div>
        <div class="talent-value">{{ formatStat(t.stat, t.perLevel * (p.talents[t.id] ?? 0)) }}</div>
        <div class="talent-level">{{ p.talents[t.id] ?? 0 }}/{{ t.max }}</div>
        <button
          class="btn btn-green small"
          :disabled="(p.talents[t.id] ?? 0) >= t.max || p.gold < talentCost(p.talents[t.id] ?? 0)"
          @click="meta.upgradeTalent(t.id)"
        >
          <template v-if="(p.talents[t.id] ?? 0) >= t.max">Макс.</template>
          <template v-else><Icon name="coin" :size="14" /> {{ talentCost(p.talents[t.id] ?? 0) }}</template>
        </button>
      </div>
    </div>
  </div>
</template>
