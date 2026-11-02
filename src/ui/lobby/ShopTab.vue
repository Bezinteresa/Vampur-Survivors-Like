<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { CHESTS, RARITY_NAMES } from '../../meta/content'
import type { Meta, Reward } from '../../meta/Meta'
import Icon from '../Icon.vue'
import RewardList from './RewardList.vue'

const props = defineProps<{ meta: Meta }>()
const p = props.meta.p
const now = ref(Date.now())
const timer = window.setInterval(() => (now.value = Date.now()), 1000)
onBeforeUnmount(() => clearInterval(timer))
const opened = ref<Reward[] | null>(null)

function open(id: string, free = false) {
  opened.value = props.meta.openChest(id, free)
}

function left(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return `${h}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function odds(list: number[]): string {
  return list
    .map((o, r) => (o > 0 ? `${RARITY_NAMES[r]} ${Math.round(o * 100)}%` : ''))
    .filter(Boolean)
    .join(' · ')
}
</script>

<template>
  <div class="shop-tab">
    <div class="section-title">Сундуки</div>
    <div v-for="c in CHESTS" :key="c.id" class="chest-card">
      <div class="chest-art"><Icon name="chest" :size="40" /></div>
      <div class="chest-info">
        <div class="chest-name">{{ c.name }}</div>
        <div class="hint left">{{ c.count > 1 ? `${c.count} предметов` : '1 предмет' }}, чертежи ×{{ c.blueprints }}</div>
        <div class="hint left">{{ odds(c.odds) }}</div>
      </div>
      <div class="chest-buy">
        <button v-if="c.freeEveryHours" class="btn btn-green small" :disabled="now < p.freeChestAt" @click="open(c.id, true)">
          {{ now < p.freeChestAt ? left(p.freeChestAt - now) : 'Бесплатно' }}
        </button>
        <button v-if="c.gold" class="btn btn-blue small" :disabled="p.gold < c.gold" @click="open(c.id)"><Icon name="coin" :size="14" /> {{ c.gold }}</button>
        <button v-if="c.gems" class="btn btn-blue small" :disabled="p.gems < c.gems" @click="open(c.id)"><Icon name="gem" :size="14" /> {{ c.gems }}</button>
      </div>
    </div>
    <div class="hint">Покупки за деньги появятся вместе с подключением площадки. Всё в игре можно получить и без них.</div>

    <div v-if="opened" class="modal-back" @click.self="opened = null">
      <div class="modal">
        <div class="ribbon">Сундук открыт</div>
        <RewardList :rewards="opened" />
        <button class="btn btn-green" @click="opened = null">Забрать</button>
      </div>
    </div>
  </div>
</template>
