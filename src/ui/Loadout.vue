<script setup lang="ts">
import { t } from '../i18n'
import { computed, ref } from 'vue'
import type { Game } from '../game/Game'
import { TIER_NAMES } from '../game/data/weapons'
import { SPRITE } from '../sprites'
import Icon from './Icon.vue'
import SpriteIcon from './SpriteIcon.vue'

// Weapon slots and the run-item shelf. In the shop (`editable`) a tapped weapon can be merged or sold.
const props = defineProps<{ game: Game; editable?: boolean }>()
const ui = props.game.ui
const selected = ref(-1)
const selectedItem = ref('')
const current = computed(() => ui.weapons[selected.value])
const currentItem = computed(() => ui.items.find((it) => it.id === selectedItem.value))

function pickWeapon(i: number) {
  selected.value = selected.value === i ? -1 : i
  selectedItem.value = ''
}

function pickItem(id: string) {
  selectedItem.value = selectedItem.value === id ? '' : id
  selected.value = -1
}

function sell() {
  props.game.sellWeapon(selected.value)
  selected.value = -1
}
</script>

<template>
  <div class="loadout">
    <div class="section-title">{{ t('Оружие') }}</div>
    <div class="slots">
      <button
        v-for="n in 6"
        :key="n"
        class="slot"
        :class="[ui.weapons[n - 1] ? `tier-${ui.weapons[n - 1].tier}` : 'empty', { selected: selected === n - 1 }]"
        :disabled="!ui.weapons[n - 1]"
        @click="pickWeapon(n - 1)"
      >
        <template v-if="ui.weapons[n - 1]">
          <SpriteIcon :file="SPRITE.weapon(ui.weapons[n - 1].id)"><div class="slot-name">{{ ui.weapons[n - 1].name }}</div></SpriteIcon>
          <div class="tier">{{ TIER_NAMES[ui.weapons[n - 1].tier] }}</div>
          <div v-if="editable && ui.weapons[n - 1].canMerge" class="merge-badge"><Icon name="up" :size="12" /></div>
        </template>
      </button>
    </div>

    <div v-if="current" class="weapon-panel">
      <div class="weapon-title">{{ current.name }} {{ TIER_NAMES[current.tier] }}</div>
      <div class="panel-lines">
        <span v-for="line in current.desc" :key="line.text">{{ line.text }}</span>
        <span>{{ t('Урон за волну: {n}', { n: current.dmgWave }) }}</span>
        <span>{{ t('Урон за забег: {n}', { n: current.dmgTotal }) }}</span>
      </div>
      <div v-if="editable" class="weapon-actions">
        <button class="btn btn-green small" :disabled="!current.canMerge" @click="game.mergeWeapon(selected)">
          <Icon name="up" :size="16" /> {{ t('Объединить') }}
        </button>
        <button class="btn btn-blue small" :disabled="ui.weapons.length <= 1" @click="sell">
          {{ t('Продать') }} · <Icon name="coin" :size="14" /> {{ current.sellPrice }}
        </button>
      </div>
      <div v-if="editable && !current.canMerge" class="hint">{{ t('Для объединения нужно второе такое же оружие того же тира.') }}</div>
    </div>
    <div v-else-if="editable && !currentItem" class="hint">{{ t('Нажмите на оружие: два одинаковых одного тира объединяются в следующий тир.') }}</div>

    <template v-if="ui.items.length">
      <div class="section-title">{{ t('Предметы') }}</div>
      <div class="shelf">
        <button
          v-for="it in ui.items"
          :key="it.id"
          class="shelf-item"
          :class="[`tier-${it.tier}`, { selected: selectedItem === it.id }]"
          @click="pickItem(it.id)"
        >
          <SpriteIcon :file="SPRITE.item(it.id)"><span class="slot-name">{{ it.name }}</span></SpriteIcon>
          <span class="stack">{{ it.count >= it.max ? t('Макс') : `×${it.count}` }}</span>
        </button>
      </div>
      <div v-if="currentItem" class="weapon-panel">
        <div class="weapon-title">{{ currentItem.name }} · {{ currentItem.count }}/{{ currentItem.max }}</div>
        <div class="panel-lines">
          <span v-for="line in currentItem.desc" :key="line.text" :class="{ bad: line.bad }">{{ line.text }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
