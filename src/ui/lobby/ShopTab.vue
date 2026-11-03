<script setup lang="ts">
import { t } from '../../i18n'
import { onBeforeUnmount, ref } from 'vue'
import { CHESTS, RARITY_NAMES } from '../../meta/content'
import type { Meta, Reward } from '../../meta/Meta'
import { SPRITE } from '../../sprites'
import Icon from '../Icon.vue'
import SpriteIcon from '../SpriteIcon.vue'
import RewardList from './RewardList.vue'
import { PRODUCTS, buy, cachedCatalog, owns, paymentsAvailable, shopState, type CatalogItem } from '../../platform/payments'

const props = defineProps<{ meta: Meta }>()
const p = props.meta.p
const now = ref(Date.now())
const timer = window.setInterval(() => (now.value = Date.now()), 1000)
onBeforeUnmount(() => clearInterval(timer))

// Store for real money: shown only where the platform takes payments, with prices from its catalog.
// The support flag is asked again every second (the QA Tool sets it after start).
const catalog = ref<CatalogItem[]>([])
const canPay = ref(false)
function refreshStore() {
  canPay.value = paymentsAvailable()
  if (!canPay.value || catalog.value.length) return
  cachedCatalog()
    .then((m) => (catalog.value = Object.keys(PRODUCTS).flatMap((id) => (m.get(id) ? [m.get(id)!] : []))))
    .catch((e) => console.warn('[payments] catalog', e))
}
refreshStore()
const storeTimer = window.setInterval(refreshStore, 1000)
onBeforeUnmount(() => clearInterval(storeTimer))

function productLine(id: string): string {
  const g = PRODUCTS[id].gives
  if (g.noAds) return t('Без рекламы между волнами')
  return [g.gems ? t('Кристаллы +{n}', { n: g.gems }) : '', g.gold ? t('Золото +{n}', { n: g.gold }) : ''].filter(Boolean).join(' · ')
}
const PRODUCT_NAMES: Record<string, string> = {
  gems_small: 'Горсть кристаллов', gems_medium: 'Мешочек кристаллов', gems_big: 'Сундучок кристаллов',
  starter_pack: 'Набор новичка', no_ads: 'Без рекламы',
}
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
    <div class="section-title">{{ t('Сундуки') }}</div>
    <div v-for="c in CHESTS" :key="c.id" class="chest-card">
      <div class="chest-art"><SpriteIcon :file="SPRITE.chest(c.id)"><Icon name="chest" :size="40" /></SpriteIcon></div>
      <div class="chest-info">
        <div class="chest-name">{{ c.name }}</div>
        <div class="hint left">{{ c.count > 1 ? t('{n} предметов', { n: c.count }) : t('1 предмет') }}, {{ t('чертежи ×{n}', { n: c.blueprints }) }}</div>
        <div class="hint left">{{ odds(c.odds) }}</div>
      </div>
      <div class="chest-buy">
        <button v-if="c.freeEveryHours" class="btn btn-green small" :disabled="now < p.freeChestAt" @click="open(c.id, true)">
          {{ now < p.freeChestAt ? left(p.freeChestAt - now) : t('Бесплатно') }}
        </button>
        <button v-if="c.gold" class="btn btn-blue small" :disabled="p.gold < c.gold" @click="open(c.id)"><Icon name="coin" :size="14" /> {{ c.gold }}</button>
        <button v-if="c.gems" class="btn btn-blue small" :disabled="p.gems < c.gems" @click="open(c.id)"><Icon name="gem" :size="14" /> {{ c.gems }}</button>
      </div>
    </div>

    <template v-if="canPay && catalog.length">
      <div class="section-title">{{ t('Кристаллы') }}</div>
      <div v-for="c in catalog" :key="c.id" class="chest-card">
        <div class="chest-art"><Icon :name="PRODUCTS[c.id].gives.noAds ? 'video' : 'gem'" :size="36" /></div>
        <div class="chest-info">
          <div class="chest-name">{{ t(PRODUCT_NAMES[c.id]) }}</div>
          <div class="hint left">{{ productLine(c.id) }}</div>
        </div>
        <div class="chest-buy">
          <button v-if="!PRODUCTS[c.id].consumable && (shopState.tick, owns(c.id))" class="btn small" disabled>{{ t('Куплено') }}</button>
          <button v-else class="btn btn-green small" :disabled="shopState.busy" @click="buy(c.id)">
            <img v-if="c.icon" :src="c.icon" alt="" class="price-icon" /> {{ c.price }}
          </button>
        </div>
      </div>
      <div v-if="shopState.pending" class="hint">{{ t('Покупка ещё не выдана — попробуем снова при следующем запуске.') }}</div>
    </template>

    <div v-if="opened" class="modal-back" @click.self="opened = null">
      <div class="modal">
        <div class="ribbon">{{ t('Сундук открыт') }}</div>
        <RewardList :rewards="opened" />
        <button class="btn btn-green" @click="opened = null">{{ t('Забрать') }}</button>
      </div>
    </div>
  </div>
</template>
