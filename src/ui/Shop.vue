<script setup lang="ts">
import { t } from '../i18n'
import { ref } from 'vue'
import type { Game } from '../game/Game'
import { adState, rewardedSupported, showRewarded } from '../platform/ads'
import Icon from './Icon.vue'
import Loadout from './Loadout.vue'
import OfferCard from './OfferCard.vue'

const props = defineProps<{ game: Game }>()
const ui = props.game.ui
const showStats = ref(false)
</script>

<template>
  <div v-drag-scroll class="screen shop">
    <div class="shop-head">
      <div class="chip"><Icon name="coin" :size="16" /> {{ ui.coins }}</div>
      <div class="title">{{ t('Приготовьтесь к волне {n}', { n: ui.wave + 1 }) }}</div>
    </div>

    <div class="offers">
      <OfferCard
        v-for="(o, i) in ui.offers"
        :key="i"
        :offer="o"
        :enabled="game.canBuy(o)"
        lockable
        @take="game.buy(i)"
        @lock="game.toggleLock(i)"
      />
    </div>

    <button class="btn btn-blue" :disabled="ui.coins < ui.shopRerollCost" @click="game.rerollShop()">
      <Icon name="reroll" :size="18" /> {{ t('Обновить') }} · <Icon name="coin" :size="16" /> {{ ui.shopRerollCost }}
    </button>
    <button
      v-if="ui.freeShopReroll && rewardedSupported()"
      class="btn btn-green bonus-btn"
      :disabled="adState.busy"
      @click="showRewarded('reroll_shop', () => game.rerollShop(true))"
    >
      <Icon name="video" :size="18" /> {{ t('Обновить бесплатно') }}
    </button>

    <Loadout :game="game" editable />

    <div v-if="showStats" class="stats-panel">
      <div v-for="s in ui.stats" :key="s.name" class="stat-row"><span>{{ s.name }}</span><b>{{ s.value }}</b></div>
    </div>

    <div class="shop-foot">
      <button class="btn btn-blue square" @click="showStats = !showStats"><Icon name="stats" /></button>
      <button class="btn btn-green wide" @click="game.nextWave()"><Icon name="play" :size="26" /></button>
    </div>
  </div>
</template>
