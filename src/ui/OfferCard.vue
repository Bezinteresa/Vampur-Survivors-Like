<script setup lang="ts">
import type { Offer } from '../game/Game'
import { TIER_NAMES } from '../game/data/weapons'
import { SPRITE } from '../sprites'
import Icon from './Icon.vue'
import SpriteIcon from './SpriteIcon.vue'

// One shop or chest card. Without `lockable` the button just says "Взять" (free chest pick).
defineProps<{ offer: Offer; enabled: boolean; lockable?: boolean }>()
defineEmits<{ take: []; lock: [] }>()
</script>

<template>
  <div class="offer" :class="[`tier-${offer.tier}`, { sold: offer.sold }]">
    <div class="offer-pic"><SpriteIcon :file="offer.type === 'weapon' ? SPRITE.weapon(offer.id) : SPRITE.item(offer.id)" /></div>
    <div class="offer-name">{{ offer.name }}</div>
    <div class="tier">{{ offer.type === 'weapon' ? `Оружие ${TIER_NAMES[offer.tier]}` : 'Предмет' }}</div>
    <div class="offer-desc">
      <div v-for="line in offer.desc" :key="line.text" :class="{ bad: line.bad }">{{ line.text }}</div>
    </div>
    <div class="offer-actions">
      <button class="btn btn-green small" :disabled="!enabled" @click="$emit('take')">
        <template v-if="offer.sold">Куплено</template>
        <template v-else-if="!lockable">Взять</template>
        <template v-else><Icon name="coin" :size="14" /> {{ offer.price }}</template>
      </button>
      <button v-if="lockable" class="btn small lock" :class="{ on: offer.locked }" :disabled="offer.sold" @click="$emit('lock')">
        <Icon :name="offer.locked ? 'lock' : 'unlock'" :size="16" />
      </button>
    </div>
  </div>
</template>
