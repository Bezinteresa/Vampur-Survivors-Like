<script setup lang="ts">
import { t } from '../i18n'
import { computed } from 'vue'
import type { Game } from '../game/Game'
import Icon from './Icon.vue'

const props = defineProps<{ game: Game }>()
const ui = props.game.ui

const hpPct = computed(() => `${(100 * ui.hp) / Math.max(1, ui.maxHp)}%`)
const xpPct = computed(() => `${(100 * ui.xp) / Math.max(1, ui.xpNext)}%`)
const bossPct = computed(() => `${(100 * ui.bossHp) / Math.max(1, ui.bossMaxHp)}%`)
const time = computed(() => {
  const t = ui.timeLeft
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
})

function cdStyle(cd: number, max: number) {
  const pct = max > 0 ? (100 * cd) / max : 0
  return { background: `conic-gradient(rgba(10,14,20,0.72) ${pct}%, transparent 0)` }
}
</script>

<template>
  <div class="hud">
    <div class="hud-top">
      <button class="round-btn" @click="game.pause()"><Icon name="pause" /></button>
      <div class="bars">
        <div class="bar bar-hp">
          <div class="fill" :style="{ width: hpPct }"></div>
          <span>{{ Math.ceil(ui.hp) }} / {{ Math.round(ui.maxHp) }}</span>
        </div>
        <div class="bar bar-xp">
          <div class="fill" :style="{ width: xpPct }"></div>
          <span>{{ t('Ур. {n}', { n: ui.level }) }}</span>
        </div>
      </div>
    </div>

    <div class="hud-row">
      <div class="money">
        <div class="chip"><Icon name="coin" :size="16" /> {{ ui.coins }}</div>
        <div v-if="ui.bank > 0" class="chip bank" :title="t('Копилка: каждая поднятая монета даёт ещё +1 отсюда')"><Icon name="jar" :size="16" /> {{ ui.bank }}</div>
      </div>
      <div class="wave-box">
        <div class="wave-label">{{ t('Волна {n}/{total}', { n: ui.wave, total: ui.waveCount }) }}</div>
        <div v-if="!ui.bossWave" class="wave-time">{{ time }}</div>
      </div>
      <div class="chip levels" :class="{ hidden: !ui.pendingLevels }"><Icon name="up" :size="16" /> {{ ui.pendingLevels }}</div>
    </div>

    <div v-if="ui.bossWave && ui.bossHp > 0" class="boss-bar">
      <div class="fill" :style="{ width: bossPct }"></div>
      <span>{{ ui.bossName }}{{ ui.bossShield ? t(' — бессмертен, разбейте яйцо!') : '' }}</span>
    </div>

    <div v-if="ui.banner" :key="ui.banner" class="banner">{{ ui.banner }}</div>

    <div class="abilities">
      <button
        v-for="(a, i) in ui.abilities"
        :key="a.id"
        class="ability"
        :class="{ ready: a.cd <= 0, active: a.active }"
        :title="a.name"
        @pointerdown.prevent="game.useAbility(i)"
      >
        <Icon :name="a.icon" :size="28" />
        <div v-if="a.cd > 0" class="cd" :style="cdStyle(a.cd, a.cdMax)">{{ Math.ceil(a.cd) }}</div>
      </button>
    </div>
  </div>
</template>
