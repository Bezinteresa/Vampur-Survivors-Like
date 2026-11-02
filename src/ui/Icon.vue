<script setup lang="ts">
import { computed } from 'vue'
import { ICONS } from './icons'

const props = defineProps<{ name: string; size?: number }>()
const icon = computed(() => ICONS[props.name] ?? ICONS.coin)
</script>

<template>
  <svg
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
