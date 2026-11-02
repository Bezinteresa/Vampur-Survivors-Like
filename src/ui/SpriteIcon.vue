<script setup lang="ts">
import { hasSprite, spriteUrl } from '../sprites'

// A picture from public/sprites when it exists, otherwise whatever placeholder is passed in the slot.
// Classes given to the component go to the picture only.
defineOptions({ inheritAttrs: false })
defineProps<{ file: string }>()
</script>

<template>
  <img v-if="hasSprite(file)" v-bind="$attrs" class="sprite-icon" :src="spriteUrl(file)" alt="" draggable="false" />
  <slot v-else />
</template>
