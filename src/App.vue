<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Game } from './game/Game'
import { JOY_RADIUS } from './game/Input'
import Hud from './ui/Hud.vue'
import Icon from './ui/Icon.vue'
import LevelUp from './ui/LevelUp.vue'
import Shop from './ui/Shop.vue'

const host = ref<HTMLElement>()
const game = shallowRef<Game>()

onMounted(() => {
  game.value = new Game(host.value!)
  if (import.meta.env.DEV) (window as unknown as { __game: Game }).__game = game.value
})
onBeforeUnmount(() => game.value?.dispose())

const screen = computed(() => game.value?.ui.screen)
const inBattle = computed(() => screen.value === 'wave' || screen.value === 'waveEnd' || screen.value === 'paused')

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

    <template v-if="game">
      <Hud v-if="inBattle" :game="game" />

      <template v-if="game.input.joy.active && screen === 'wave'">
        <div class="joy-base" :style="{ left: `${game.input.joy.ox}px`, top: `${game.input.joy.oy}px` }"></div>
        <div class="joy-knob" :style="knob"></div>
      </template>

      <div v-if="screen === 'menu'" class="screen menu">
        <div class="logo">Vampur<br />Survivors</div>
        <div class="sub">Прототип боя · графика-заглушки</div>
        <button class="btn btn-green big" @click="game.startRun()"><Icon name="play" :size="26" /> Играть</button>
        <div class="hint">
          Движение — WASD / стрелки или палец в любом месте экрана.<br />
          Пробел — кувырок, E — скорострельность, P — пауза.
        </div>
      </div>

      <LevelUp v-if="screen === 'levelup'" :game="game" />
      <Shop v-if="screen === 'shop'" :game="game" />

      <div v-if="screen === 'paused'" class="screen dim">
        <div class="ribbon">Пауза</div>
        <button class="btn btn-green big" @click="game.resume()"><Icon name="play" :size="24" /> Продолжить</button>
        <button class="btn btn-blue" @click="game.toMenu()">В меню</button>
      </div>

      <div v-if="screen === 'gameover' || screen === 'victory'" class="screen dim">
        <div class="ribbon" :class="{ red: screen === 'gameover' }">{{ screen === 'victory' ? 'Победа!' : 'Поражение' }}</div>
        <div class="result">
          <div>Волна: <b>{{ game.ui.wave }}/{{ game.ui.waveCount }}</b></div>
          <div>Уровень: <b>{{ game.ui.level }}</b></div>
          <div>Убито: <b>{{ game.ui.kills }}</b></div>
        </div>
        <button class="btn btn-green big" @click="game.startRun()">Ещё раз</button>
        <button class="btn btn-blue" @click="game.toMenu()">В меню</button>
      </div>
    </template>
  </div>
</template>
