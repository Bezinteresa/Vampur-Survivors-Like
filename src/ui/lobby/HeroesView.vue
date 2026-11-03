<script setup lang="ts">
import { t } from '../../i18n'
import { computed, ref } from 'vue'
import { HERO_MAX_LEVEL, HEROES, heroDamage, heroHp, heroUpgradeGold, heroUpgradeWater } from '../../game/data/heroes'
import { RARITY_NAMES } from '../../meta/content'
import type { Meta } from '../../meta/Meta'
import { SPRITE } from '../../sprites'
import Icon from '../Icon.vue'
import SpriteIcon from '../SpriteIcon.vue'

const props = defineProps<{ meta: Meta }>()
const p = props.meta.p
const viewed = ref(p.hero)
const hero = computed(() => HEROES.find((h) => h.id === viewed.value) ?? HEROES[0])
const level = computed(() => p.heroes[hero.value.id])
const owned = computed(() => level.value != null)
const shown = computed(() => level.value ?? 1)
</script>

<template>
  <div class="heroes">
    <div class="hero-card" :class="`rar-${hero.rarity}`">
      <div class="hero-portrait"><SpriteIcon :file="SPRITE.hero(hero.id)"><div class="hero-body"></div></SpriteIcon></div>
      <div class="hero-info">
        <div class="item-name">{{ hero.name }}</div>
        <div class="hint left">{{ hero.title }} · <span :class="`rar-text-${hero.rarity}`">{{ RARITY_NAMES[hero.rarity] }}</span></div>
        <div class="level-progress wide">
          <div class="fill" :style="{ width: `${(100 * shown) / HERO_MAX_LEVEL}%` }"></div>
          <span>{{ shown }}/{{ HERO_MAX_LEVEL }}</span>
        </div>
        <div class="hero-line">{{ t('Урон +{n}%', { n: Math.round(heroDamage(hero, shown) * 100) }) }} <span class="plus">(+{{ Math.round(hero.damagePerLevel * 100) }}%)</span></div>
        <div class="hero-line"><Icon name="heart" :size="14" /> {{ heroHp(hero, shown) }} <span class="plus">(+{{ hero.hpPerLevel }})</span></div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-title">{{ t('Особенность') }}</div>
      <div class="perk open">{{ hero.perkText }}</div>
      <div class="hint left">{{ t('Срабатывает от способности «Кувырок».') }}</div>
    </div>

    <div class="modal-actions">
      <template v-if="owned">
        <button class="btn btn-blue" :disabled="p.hero === hero.id" @click="meta.selectHero(hero.id)">{{ p.hero === hero.id ? t('Выбран') : t('Выбрать') }}</button>
        <button class="btn btn-green" :disabled="!meta.canUpgradeHero(hero.id)" @click="meta.upgradeHero(hero.id)">
          <template v-if="(level ?? 0) >= HERO_MAX_LEVEL">{{ t('Макс.') }}</template>
          <template v-else><Icon name="coin" :size="14" /> {{ heroUpgradeGold(level!) }} · <Icon name="drop" :size="14" /> {{ heroUpgradeWater(level!) }}</template>
        </button>
      </template>
      <button v-else class="btn btn-green" :disabled="p.gems < hero.gems" @click="meta.unlockHero(hero.id)">
        {{ t('Открыть') }} · <Icon name="gem" :size="14" /> {{ hero.gems }}
      </button>
    </div>
    <div class="hint">{{ t('Живая вода: {n} — даётся за забеги и в сундуках', { n: p.water }) }}</div>

    <div class="hero-grid">
      <button
        v-for="h in HEROES"
        :key="h.id"
        class="inv-cell hero-cell"
        :class="[`rar-${h.rarity}`, { selected: viewed === h.id, locked: p.heroes[h.id] == null }]"
        @click="viewed = h.id"
      >
        <SpriteIcon :file="SPRITE.hero(h.id)"><span class="cell-name">{{ h.name }}</span></SpriteIcon>
        <span class="cell-level">{{ p.heroes[h.id] != null ? `${p.heroes[h.id]}/${HERO_MAX_LEVEL}` : '' }}</span>
        <span v-if="p.hero === h.id" class="cell-badge equipped"><Icon name="check" :size="10" /></span>
        <span v-else-if="p.heroes[h.id] == null" class="cell-badge lock-badge"><Icon name="lock" :size="10" /></span>
      </button>
    </div>
  </div>
</template>
