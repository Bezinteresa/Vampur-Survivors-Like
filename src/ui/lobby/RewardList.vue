<script setup lang="ts">
import { RARITY_NAMES } from '../../meta/content'
import { rewardText } from '../../meta/format'
import type { Reward } from '../../meta/Meta'
import Icon from '../Icon.vue'

defineProps<{ rewards: Reward[] }>()
const ICON = { gold: 'coin', gems: 'gem', blueprint: 'scroll', item: 'chest', water: 'drop' }
</script>

<template>
  <div class="rewards">
    <div v-for="(r, i) in rewards" :key="i" class="reward" :class="r.item ? `rar-${r.item.rarity}` : ''">
      <Icon :name="ICON[r.kind]" :size="18" />
      <span>{{ rewardText(r) }}</span>
      <span v-if="r.item" class="reward-rarity">{{ RARITY_NAMES[r.item.rarity] }}</span>
    </div>
  </div>
</template>
