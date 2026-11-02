<script setup lang="ts">
import type { Game } from '../game/Game'
import Icon from './Icon.vue'

const props = defineProps<{ game: Game }>()
const ui = props.game.ui
const TIER_CLASS = ['tier-0', 'tier-1', 'tier-2']
</script>

<template>
  <div class="screen">
    <div class="ribbon">Уровень повышен</div>
    <div class="sub">Осталось выборов: {{ ui.pendingLevels }}</div>

    <div class="cards">
      <button v-for="(c, i) in ui.cards" :key="i + c.name" class="card" :class="TIER_CLASS[c.tier]" @click="game.pickCard(i)">
        <div class="card-name">{{ c.name }}</div>
        <div class="card-amount">{{ c.text }}</div>
        <div class="card-change">{{ c.before }} → {{ c.after }}</div>
      </button>
    </div>

    <button class="btn btn-blue" :disabled="ui.coins < ui.cardRerollCost" @click="game.rerollCards()">
      <Icon name="reroll" :size="18" /> Обновить · <Icon name="coin" :size="16" /> {{ ui.cardRerollCost }}
    </button>
    <div class="sub"><Icon name="coin" :size="14" /> {{ ui.coins }}</div>
  </div>
</template>
