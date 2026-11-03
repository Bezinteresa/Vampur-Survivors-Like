<script setup lang="ts">
import { t } from '../../i18n'
import SoundSettings from '../SoundSettings.vue'
import { ref } from 'vue'
import type { Meta } from '../../meta/Meta'
import Icon from '../Icon.vue'
import EquipmentView from './EquipmentView.vue'
import HeroesView from './HeroesView.vue'
import MapTab from './MapTab.vue'
import ShopTab from './ShopTab.vue'
import TalentsView from './TalentsView.vue'

defineProps<{ meta: Meta }>()
const emit = defineEmits<{ start: [] }>()
type Tab = 'shop' | 'hero' | 'map' | 'modes' | 'rank'
const tab = ref<Tab>('map')
const heroTab = ref<'gear' | 'heroes' | 'talents'>('gear')
// Swiping the lobby moves to the neighbouring bottom tab.
function switchTab(d: number) {
  const i = TABS.findIndex((t) => t.id === tab.value)
  tab.value = TABS[Math.max(0, Math.min(TABS.length - 1, i + d))].id
}
const TABS: { id: Tab; icon: string; name: string; soon?: boolean }[] = [
  { id: 'shop', icon: 'shop', name: t('Магазин') },
  { id: 'hero', icon: 'hero', name: t('Герой') },
  { id: 'map', icon: 'map', name: t('Карта') },
  { id: 'modes', icon: 'swords', name: t('Режимы'), soon: true },
  { id: 'rank', icon: 'trophy', name: t('Рейтинг'), soon: true },
]
</script>

<template>
  <div class="lobby">
    <div class="lobby-top">
      <div class="logo-small">Bogatyr Survivors</div>
      <div class="chip"><Icon name="coin" :size="16" /> {{ meta.p.gold }}</div>
      <div class="chip gems"><Icon name="gem" :size="16" /> {{ meta.p.gems }}</div>
      <SoundSettings :meta="meta" />
    </div>

    <div v-swipe="{ left: () => switchTab(1), right: () => switchTab(-1) }" v-drag-scroll class="lobby-body">
      <MapTab v-if="tab === 'map'" :meta="meta" @start="emit('start')" />
      <template v-else-if="tab === 'hero'">
        <div class="subtabs">
          <button class="chip-btn" :class="{ on: heroTab === 'gear' }" @click="heroTab = 'gear'">{{ t('Экипировка') }}</button>
          <button class="chip-btn" :class="{ on: heroTab === 'heroes' }" @click="heroTab = 'heroes'">{{ t('Богатыри') }}</button>
          <button class="chip-btn" :class="{ on: heroTab === 'talents' }" @click="heroTab = 'talents'">{{ t('Таланты') }}</button>
        </div>
        <EquipmentView v-if="heroTab === 'gear'" :meta="meta" />
        <HeroesView v-else-if="heroTab === 'heroes'" :meta="meta" />
        <TalentsView v-else :meta="meta" />
      </template>
      <ShopTab v-else-if="tab === 'shop'" :meta="meta" />
      <div v-else class="soon">
        <Icon :name="tab === 'modes' ? 'swords' : 'trophy'" :size="48" />
        <div>{{ t('Скоро') }}</div>
      </div>
    </div>

    <nav class="lobby-nav">
      <button v-for="t in TABS" :key="t.id" class="nav-btn" :class="{ on: tab === t.id, center: t.id === 'map', soon: t.soon }" @click="tab = t.id">
        <Icon :name="t.icon" :size="t.id === 'map' ? 28 : 22" />
        <span>{{ t.name }}</span>
      </button>
    </nav>
  </div>
</template>
