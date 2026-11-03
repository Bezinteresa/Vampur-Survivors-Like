<script setup lang="ts">
import { t } from '../../i18n'
import { computed } from 'vue'
import { ABILITIES } from '../../game/data/abilities'
import { EFFECT_NAMES, KIND_NAMES, WEAPONS } from '../../game/data/weapons'
import { RARITY_NAMES, SETS, SET_PIECES_NEEDED, SLOT_NAMES, sellGold, upgradeBlueprints, upgradeGold } from '../../meta/content'
import { mainBonusText, perkText } from '../../meta/format'
import type { Meta } from '../../meta/Meta'
import { itemSprite } from '../../meta/format'
import Icon from '../Icon.vue'
import SpriteIcon from '../SpriteIcon.vue'

const props = defineProps<{ meta: Meta; uid: number }>()
const emit = defineEmits<{ close: [] }>()
const p = props.meta.p

const it = computed(() => props.meta.item(props.uid))
const def = computed(() => (it.value ? props.meta.def(it.value) : null))
const equipped = computed(() => props.meta.isEquipped(props.uid))
const weapon = computed(() => (def.value?.runWeapon ? WEAPONS[def.value.runWeapon] : null))
const ability = computed(() => (def.value?.ability ? ABILITIES[def.value.ability] : null))
const set = computed(() => (def.value?.set ? SETS[def.value.set] : null))
const atMax = computed(() => !!it.value && it.value.level >= props.meta.maxLevel(it.value))
const copies = computed(() => (it.value ? props.meta.copies(it.value).length : 0))

function sell() {
  props.meta.sell(props.uid)
  emit('close')
}

function merge() {
  props.meta.merge(props.uid)
  // The tapped copy may have been consumed; close when it is gone.
  if (!props.meta.item(props.uid)) emit('close')
}
</script>

<template>
  <div class="modal-back" @click.self="emit('close')">
    <div v-if="it && def" v-drag-scroll class="modal item-modal">
      <button class="modal-close" @click="emit('close')"><Icon name="close" /></button>
      <div class="item-head">
        <div class="item-icon" :class="`rar-${it.rarity}`"><SpriteIcon :file="itemSprite(it.itemId)">{{ SLOT_NAMES[def.slot] }}</SpriteIcon></div>
        <div>
          <div class="rarity-name" :class="`rar-text-${it.rarity}`">{{ RARITY_NAMES[it.rarity] }}</div>
          <div class="item-name">{{ def.name }}</div>
          <div class="item-level">{{ t('Ур. {n}', { n: `${it.level}/${meta.maxLevel(it)}` }) }}</div>
        </div>
      </div>

      <div class="item-row">
        <div class="chip main-bonus">{{ mainBonusText(it) }}</div>
        <button class="btn small" :disabled="it.level <= 1" :title="t('Разобрать: вернуть золото и чертежи')" @click="meta.dismantle(uid)">{{ t('Разобрать') }}</button>
        <button class="btn small" :disabled="equipped" @click="sell">{{ t('Продать') }} · {{ sellGold(it.rarity) }}</button>
      </div>

      <div class="panel">
        <div class="panel-title">{{ t('Привилегии') }}</div>
        <div v-for="(perk, i) in def.perks" :key="i" class="perk" :class="{ open: i < it.rarity }">
          <span class="perk-mark" :class="`rar-${i + 1}`"><Icon :name="i < it.rarity ? 'check' : 'lock'" :size="12" /></span>
          {{ perkText(perk) }}
        </div>
        <div class="hint">{{ t('Привилегия открывается на ранге своего цвета.') }}</div>
      </div>

      <div v-if="weapon" class="panel">
        <div class="panel-title">{{ t('Оружие в забеге') }}</div>
        <div class="panel-lines left">
          <span>{{ KIND_NAMES[weapon.kind] }}</span>
          <span>{{ t('Урон {n}', { n: weapon.damage[0] + (weapon.count > 1 ? ` ×${weapon.count}` : '') }) }}</span>
          <span>{{ t('Перезарядка {cd}с', { cd: weapon.cooldown }) }}</span>
          <span>{{ t('Дальность {n}', { n: weapon.range }) }}</span>
          <span v-if="weapon.effect">{{ EFFECT_NAMES[weapon.effect] }}</span>
        </div>
      </div>
      <div v-if="ability" class="panel">
        <div class="panel-title">{{ ability.text }}</div>
        <div class="panel-lines left">
          <span>{{ t('Перезарядка {cd}с', { cd: ability.cooldown }) }}</span>
          <span v-if="ability.duration >= 1">{{ t('Длительность {n}с', { n: ability.duration }) }}</span>
        </div>
      </div>
      <div v-if="set" class="panel">
        <div class="panel-title">{{ t('Комплект «{name}»: надето {n} из 5, бонус с {need}', { name: set.name, n: meta.setCount(set.id), need: SET_PIECES_NEEDED }) }}</div>
        <div class="perk" :class="{ open: meta.setCount(set.id) >= SET_PIECES_NEEDED }">
          <Icon :name="meta.setCount(set.id) >= SET_PIECES_NEEDED ? 'check' : 'lock'" :size="14" /> {{ set.bonus }}
        </div>
      </div>

      <div class="upgrade-row">
        <div class="chip"><Icon name="scroll" :size="16" /> {{ p.blueprints[def.slot] }}/{{ upgradeBlueprints(it.level) }}</div>
        <div v-if="atMax" class="hint">{{ t('Максимальный уровень для этого ранга') }}</div>
      </div>

      <div class="modal-actions">
        <button v-if="!equipped" class="btn btn-blue" @click="meta.equip(uid)">{{ t('Надеть') }}</button>
        <button v-else class="btn btn-blue" :disabled="def.slot === 'weapon'" @click="meta.unequip(uid)">{{ t('Снять') }}</button>
        <button class="btn btn-green" :disabled="!meta.canUpgrade(it)" @click="meta.upgrade(uid)">
          <Icon name="coin" :size="14" /> {{ upgradeGold(it.level) }}
        </button>
        <button class="btn btn-green" :disabled="!meta.canUpgrade(it)" @click="meta.maxUpgrade(uid)">{{ t('Макс.') }}</button>
      </div>
      <button class="btn" :disabled="!meta.canMerge(it)" @click="merge">
        <Icon name="up" :size="16" /> {{ t('Объединить ({n}/3)', { n: Math.min(copies, 3) }) }}
      </button>
    </div>
  </div>
</template>
