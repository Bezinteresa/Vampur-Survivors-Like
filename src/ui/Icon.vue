<script setup lang="ts">
import { computed } from 'vue'
import { hasSprite, spriteUrl } from '../sprites'
import { ICONS } from './icons'

// Currencies have painted pictures (public/sprites/ui); every other icon is a line drawing from icons.ts.
const PICTURES: Record<string, string> = { coin: 'ui/gold.png', gem: 'ui/gems.png', drop: 'ui/water.png', scroll: 'ui/blueprint.png' }

const props = defineProps<{ name: string; size?: number }>()
const icon = computed(() => ICONS[props.name] ?? ICONS.coin)
const picture = computed(() => (PICTURES[props.name] && hasSprite(PICTURES[props.name]) ? spriteUrl(PICTURES[props.name]) : ''))
</script>

<template>
  <img v-if="picture" class="icon icon-pic" :src="picture" :width="(size ?? 22) * 1.15" :height="(size ?? 22) * 1.15" alt="" draggable="false" />
  <svg
    v-else
    class="icon"
    :width="size ?? 22"
    :height="size ?? 22"
    viewBox="0 0 24 24"
    :fill="icon.fill ? 'currentColor' : 'none'"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="icon.d" />
  </svg>
</template>
