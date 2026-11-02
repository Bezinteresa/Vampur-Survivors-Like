<script setup lang="ts">
import { ref } from 'vue'
import type { Meta } from '../../meta/Meta'
import Icon from '../Icon.vue'
import EquipmentView from './EquipmentView.vue'
import MapTab from './MapTab.vue'
import ShopTab from './ShopTab.vue'
import TalentsView from './TalentsView.vue'

defineProps<{ meta: Meta }>()
const emit = defineEmits<{ start: [] }>()
type Tab = 'shop' | 'hero' | 'map' | 'modes' | 'rank'
const tab = ref<Tab>('map')
const heroTab = ref<'gear' | 'talents'>('gear')
const TABS: { id: Tab; icon: string; name: string; soon?: boolean }[] = [
  { id: 'shop', icon: 'shop', name: 'Магазин' },
  { id: 'hero', icon: 'hero', name: 'Герой' },
  { id: 'map', icon: 'map', name: 'Карта' },
  { id: 'modes', icon: 'swords', name: 'Режимы', soon: true },
  { id: 'rank', icon: 'trophy', name: 'Рейтинг', soon: true },
]
</script>

<template>
  <div class="lobby">
    <div class="lobby-top">
      <div class="logo-small">Vampur Survivors</div>
      <div class="chip"><Icon name="coin" :size="16" /> {{ meta.p.gold }}</div>
      <div class="chip gems"><Icon name="gem" :size="16" /> {{ meta.p.gems }}</div>
    </div>

    <div class="lobby-body">
      <MapTab v-if="tab === 'map'" :meta="meta" @start="emit('start')" />
      <template v-else-if="tab === 'hero'">
        <div class="subtabs">
          <button class="chip-btn" :class="{ on: heroTab === 'gear' }" @click="heroTab = 'gear'">Экипировка</button>
          <button class="chip-btn" :class="{ on: heroTab === 'talents' }" @click="heroTab = 'talents'">Таланты</button>
        </div>
        <EquipmentView v-if="heroTab === 'gear'" :meta="meta" />
        <TalentsView v-else :meta="meta" />
      </template>
      <ShopTab v-else-if="tab === 'shop'" :meta="meta" />
      <div v-else class="soon">
        <Icon :name="tab === 'modes' ? 'swords' : 'trophy'" :size="48" />
        <div>Скоро</div>
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
