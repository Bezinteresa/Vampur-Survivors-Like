<script setup lang="ts">
import type { Game } from '../game/Game'
import OfferCard from './OfferCard.vue'

const props = defineProps<{ game: Game }>()
const ui = props.game.ui
</script>

<template>
  <div class="screen">
    <div class="ribbon">Сундук снабжения</div>
    <div class="sub">Выберите одно оружие бесплатно</div>
    <div class="offers">
      <OfferCard
        v-for="(o, i) in ui.chestOffers"
        :key="i"
        :offer="o"
        :enabled="game.canTakeChest(o)"
        @take="game.pickChest(i)"
      />
    </div>
    <div v-if="ui.chestOffers.every((o) => !game.canTakeChest(o))" class="hint">Все слоты оружия заняты, а пар для объединения нет.</div>
    <button class="btn btn-blue" @click="game.closeChest()">Пропустить</button>
  </div>
</template>
