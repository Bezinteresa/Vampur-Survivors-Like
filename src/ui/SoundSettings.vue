<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'
import type { Meta } from '../meta/Meta'
import Icon from './Icon.vue'

// Sound button (Playgama 3.3.3: the player can turn the sound off) with music and effects volumes.
// A slider is heard while it moves and stored once it is let go.
const props = defineProps<{ meta: Meta }>()
const s = props.meta.p.settings
const open = ref(false)

function volume(key: 'music' | 'sfx', e: Event, store: boolean) {
  props.meta.setSound({ [key]: +(e.target as HTMLInputElement).value / 100 }, store)
}
</script>

<template>
  <button class="round-btn sound-btn" :title="t('Звук')" @click="open = !open"><Icon :name="s.sound ? 'sound' : 'mute'" /></button>
  <div v-if="open" class="modal-back" @click.self="open = false">
    <div class="modal sound-panel">
      <div class="panel-title">{{ t('Звук') }}</div>
      <button class="btn" :class="s.sound ? 'btn-green' : 'btn-blue'" @click="meta.setSound({ sound: !s.sound })">
        <Icon :name="s.sound ? 'sound' : 'mute'" :size="18" /> {{ s.sound ? t('Звук включён') : t('Звук выключен') }}
      </button>
      <label class="view-row">
        <span>{{ t('Музыка') }}: <b>{{ Math.round(s.music * 100) }}%</b></span>
        <input type="range" min="0" max="100" step="5" :value="s.music * 100" :disabled="!s.sound" @input="volume('music', $event, false)" @change="volume('music', $event, true)" />
      </label>
      <label class="view-row">
        <span>{{ t('Звуки') }}: <b>{{ Math.round(s.sfx * 100) }}%</b></span>
        <input type="range" min="0" max="100" step="5" :value="s.sfx * 100" :disabled="!s.sound" @input="volume('sfx', $event, false)" @change="volume('sfx', $event, true)" />
      </label>
      <button class="btn btn-green" @click="open = false">{{ t('Закрыть') }}</button>
    </div>
  </div>
</template>
