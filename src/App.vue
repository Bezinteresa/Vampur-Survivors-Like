<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Game } from './game/Game'
import { JOY_RADIUS } from './game/Input'
import { Meta, type Reward } from './meta/Meta'
import { devStorage } from './meta/storage'
import ChestPick from './ui/ChestPick.vue'
import Hud from './ui/Hud.vue'
import Icon from './ui/Icon.vue'
import LevelUp from './ui/LevelUp.vue'
import Loadout from './ui/Loadout.vue'
import Lobby from './ui/lobby/Lobby.vue'
import RewardList from './ui/lobby/RewardList.vue'
import Shop from './ui/Shop.vue'

const host = ref<HTMLElement>()
const showStats = ref(false)
const game = shallowRef<Game>()
const meta = new Meta()
const loaded = ref(false)
const rewards = ref<Reward[]>([])

onMounted(async () => {
  game.value = new Game(host.value!)
  game.value.onRunEnd = (result) => (rewards.value = meta.applyRun(result))
  if (import.meta.env.DEV) {
    Object.assign(window, { __game: game.value, __meta: meta })
    const g = game.value
    import('./dev/balance').then((b) => b.installBalance(g))
  }
  await meta.load(devStorage)
  loaded.value = true
})
onBeforeUnmount(() => game.value?.dispose())

const screen = computed(() => game.value?.ui.screen)
const inBattle = computed(() => screen.value === 'wave' || screen.value === 'waveEnd' || screen.value === 'paused')

function startRun() {
  rewards.value = []
  game.value?.startRun(meta.loadout())
}

const knob = computed(() => {
  const j = game.value!.input.joy
  const dx = j.kx - j.ox
  const dy = j.ky - j.oy
  const d = Math.hypot(dx, dy)
  const k = d > JOY_RADIUS ? JOY_RADIUS / d : 1
  return { left: `${j.ox + dx * k}px`, top: `${j.oy + dy * k}px` }
})
</script>

<template>
  <div class="stage" @contextmenu.prevent>
    <div ref="host" class="canvas-host"></div>

    <template v-if="game && loaded">
      <Hud v-if="inBattle" :game="game" />

      <template v-if="game.input.joy.active && screen === 'wave'">
        <div class="joy-base" :style="{ left: `${game.input.joy.ox}px`, top: `${game.input.joy.oy}px` }"></div>
        <div class="joy-knob" :style="knob"></div>
      </template>

      <Lobby v-if="screen === 'menu'" :meta="meta" @start="startRun" />

      <LevelUp v-if="screen === 'levelup'" :game="game" />
      <Shop v-if="screen === 'shop'" :game="game" />
      <ChestPick v-if="screen === 'chest'" :game="game" />

      <div v-if="screen === 'paused'" v-drag-scroll class="screen pause">
        <div class="ribbon">Пауза</div>
        <Loadout :game="game" />
        <div v-if="showStats" class="stats-panel">
          <div v-for="s in game.ui.stats" :key="s.name" class="stat-row"><span>{{ s.name }}</span><b>{{ s.value }}</b></div>
        </div>
        <div class="shop-foot">
          <button class="btn btn-blue square" @click="showStats = !showStats"><Icon name="stats" /></button>
          <button class="btn btn-green wide" @click="game.resume()"><Icon name="play" :size="24" /> Продолжить</button>
        </div>
        <button class="btn" @click="game.surrender()">Сдаться</button>
      </div>

      <div v-if="screen === 'gameover' || screen === 'victory'" v-drag-scroll class="screen dim">
        <div class="ribbon" :class="{ red: screen === 'gameover' }">{{ screen === 'victory' ? 'Победа!' : 'Поражение' }}</div>
        <div class="result">
          <div>Волна: <b>{{ game.ui.wave }}/{{ game.ui.waveCount }}</b></div>
          <div>Уровень: <b>{{ game.ui.level }}</b></div>
          <div>Убито: <b>{{ game.ui.kills }}</b></div>
        </div>
        <div class="section-title">Награды</div>
        <RewardList :rewards="rewards" />
        <button class="btn btn-green big" @click="startRun">Ещё раз</button>
        <button class="btn btn-blue" @click="game.toMenu()">В лобби</button>
      </div>
    </template>
  </div>
</template>
