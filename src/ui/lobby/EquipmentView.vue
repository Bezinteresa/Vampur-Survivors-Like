<script setup lang="ts">
import { computed, ref } from 'vue'
import { heroDef } from '../../game/data/heroes'
import { ITEMS, SETS, SLOT_NAMES, type GearSlot, type Slot } from '../../meta/content'
import type { Meta, OwnedItem } from '../../meta/Meta'
import Icon from '../Icon.vue'
import ItemModal from './ItemModal.vue'

const props = defineProps<{ meta: Meta }>()
const p = props.meta.p
const open = ref<number | null>(null)
const filter = ref<'all' | 'weapon' | 'gear' | 'ability'>('all')

const LEFT: GearSlot[] = ['weapon', 'hat', 'glasses']
const RIGHT: GearSlot[] = ['shirt', 'backpack', 'boots']

const summary = computed(() => props.meta.heroSummary())
const sets = computed(() => props.meta.activeSets())
const mergeable = computed(() => p.items.filter((it) => props.meta.canMerge(it)).length)

const inventory = computed(() => {
  const slotOf = (it: OwnedItem): Slot => ITEMS[it.itemId].slot
  return p.items
    .filter((it) => {
      const s = slotOf(it)
      if (filter.value === 'weapon') return s === 'weapon'
      if (filter.value === 'ability') return s === 'ability'
      if (filter.value === 'gear') return s !== 'weapon' && s !== 'ability'
      return true
    })
    .sort((a, b) => b.rarity - a.rarity || b.level - a.level || a.itemId.localeCompare(b.itemId))
})

function slotItem(slot: GearSlot) {
  return props.meta.item(p.equipped[slot])
}
</script>

<template>
  <div class="equipment">
    <div class="doll">
      <div class="doll-col">
        <button v-for="slot in LEFT" :key="slot" class="gear-slot" :class="slotItem(slot) ? `rar-${slotItem(slot)!.rarity}` : 'empty'" @click="slotItem(slot) && (open = slotItem(slot)!.uid)">
          <template v-if="slotItem(slot)">
            <span class="cell-name">{{ ITEMS[slotItem(slot)!.itemId].name }}</span>
            <span class="cell-level">Ур. {{ slotItem(slot)!.level }}</span>
          </template>
          <span v-else class="cell-name muted">{{ SLOT_NAMES[slot] }}</span>
        </button>
      </div>
      <div class="hero-figure">
        <div class="hero-body"></div>
        <div class="hero-name">{{ heroDef(p.hero).name }}</div>
        <div class="hero-stats">
          <span>Урон +{{ Math.round(summary.damagePct * 100) }}%</span>
          <span><Icon name="heart" :size="14" /> {{ Math.round(summary.maxHp) }}</span>
        </div>
        <div v-for="s in sets" :key="s" class="set-badge">Комплект «{{ SETS[s].name }}»</div>
      </div>
      <div class="doll-col">
        <button v-for="slot in RIGHT" :key="slot" class="gear-slot" :class="slotItem(slot) ? `rar-${slotItem(slot)!.rarity}` : 'empty'" @click="slotItem(slot) && (open = slotItem(slot)!.uid)">
          <template v-if="slotItem(slot)">
            <span class="cell-name">{{ ITEMS[slotItem(slot)!.itemId].name }}</span>
            <span class="cell-level">Ур. {{ slotItem(slot)!.level }}</span>
          </template>
          <span v-else class="cell-name muted">{{ SLOT_NAMES[slot] }}</span>
        </button>
      </div>
    </div>

    <div class="ability-row">
      <button
        v-for="(uid, i) in p.abilities"
        :key="i"
        class="gear-slot wide"
        :class="meta.item(uid) ? `rar-${meta.item(uid)!.rarity}` : 'empty'"
        @click="uid != null && (open = uid)"
      >
        <template v-if="meta.item(uid)">
          <span class="cell-name">{{ ITEMS[meta.item(uid)!.itemId].name }}</span>
          <span class="cell-level">Ур. {{ meta.item(uid)!.level }}</span>
        </template>
        <span v-else class="cell-name muted">Способность {{ i + 1 }}</span>
      </button>
    </div>

    <div class="inv-bar">
      <div class="filters">
        <button v-for="f in (['all', 'weapon', 'gear', 'ability'] as const)" :key="f" class="chip-btn" :class="{ on: filter === f }" @click="filter = f">
          {{ { all: 'Все', weapon: 'Оружие', gear: 'Одежда', ability: 'Навыки' }[f] }}
        </button>
      </div>
      <button class="btn small btn-green" :disabled="!mergeable" @click="meta.mergeAll()"><Icon name="up" :size="14" /> Объединить всё</button>
    </div>

    <div class="inventory">
      <button v-for="it in inventory" :key="it.uid" class="inv-cell" :class="`rar-${it.rarity}`" @click="open = it.uid">
        <span class="cell-name">{{ ITEMS[it.itemId].name }}</span>
        <span class="cell-level">Ур. {{ it.level }}</span>
        <span v-if="meta.isEquipped(it.uid)" class="cell-badge equipped"><Icon name="check" :size="10" /></span>
        <span v-else-if="meta.canMerge(it)" class="cell-badge merge"><Icon name="up" :size="10" /></span>
      </button>
    </div>

    <div class="blueprints">
      <span v-for="(n, slot) in p.blueprints" :key="slot" class="bp"><Icon name="scroll" :size="12" /> {{ SLOT_NAMES[slot] }} {{ n }}</span>
    </div>

    <ItemModal v-if="open != null" :meta="meta" :uid="open" @close="open = null" />
  </div>
</template>
