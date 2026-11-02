<script setup lang="ts">
import { ref } from 'vue'
import type { Game } from '../game/Game'
import { TIER_NAMES } from '../game/data/weapons'
import Icon from './Icon.vue'

const props = defineProps<{ game: Game }>()
const ui = props.game.ui
const showStats = ref(false)
</script>

<template>
  <div class="screen shop">
    <div class="shop-head">
      <div class="chip"><Icon name="coin" :size="16" /> {{ ui.coins }}</div>
      <div class="title">Приготовьтесь к волне {{ ui.wave + 1 }}</div>
    </div>

    <div class="offers">
      <div v-for="(o, i) in ui.offers" :key="i" class="offer" :class="[`tier-${o.tier}`, { sold: o.sold }]">
        <div class="offer-name">{{ o.name }} <span class="tier">{{ TIER_NAMES[o.tier] }}</span></div>
        <div class="offer-desc">
          <div v-for="line in o.desc" :key="line">{{ line }}</div>
        </div>
        <div class="offer-actions">
          <button class="btn btn-green small" :disabled="!game.canBuy(o)" @click="game.buy(i)">
            <template v-if="o.sold">Куплено</template>
            <template v-else><Icon name="coin" :size="14" /> {{ o.price }}</template>
          </button>
          <button class="btn small lock" :class="{ on: o.locked }" :disabled="o.sold" @click="game.toggleLock(i)">
            <Icon :name="o.locked ? 'lock' : 'unlock'" :size="16" />
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn-blue" :disabled="ui.coins < ui.shopRerollCost" @click="game.rerollShop()">
      <Icon name="reroll" :size="18" /> Обновить · <Icon name="coin" :size="16" /> {{ ui.shopRerollCost }}
    </button>

    <div class="section-title">Оружие</div>
    <div class="slots">
      <div v-for="n in 6" :key="n" class="slot" :class="ui.weapons[n - 1] ? `tier-${ui.weapons[n - 1].tier}` : 'empty'">
        <template v-if="ui.weapons[n - 1]">
          <div class="slot-name">{{ ui.weapons[n - 1].name }}</div>
          <div class="tier">{{ TIER_NAMES[ui.weapons[n - 1].tier] }}</div>
        </template>
      </div>
    </div>
    <div class="hint">Два одинаковых оружия одного тира сливаются в следующий тир.</div>

    <div v-if="showStats" class="stats-panel">
      <div v-for="s in ui.stats" :key="s.name" class="stat-row"><span>{{ s.name }}</span><b>{{ s.value }}</b></div>
    </div>

    <div class="shop-foot">
      <button class="btn btn-blue square" @click="showStats = !showStats"><Icon name="stats" /></button>
      <button class="btn btn-green wide" @click="game.nextWave()"><Icon name="play" :size="26" /></button>
    </div>
  </div>
</template>
