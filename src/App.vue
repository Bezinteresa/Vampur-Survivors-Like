<script setup lang="ts">
import { t } from './i18n'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { Game } from './game/Game'
import { JOY_RADIUS } from './game/Input'
import { Meta, type Reward } from './meta/Meta'
import { adHooks, adState, maybeInterstitial, rewardedSupported, showRewarded } from './platform/ads'
import { bootState, boot } from './platform/boot'
import { gameReady, lifecycle, onPauseChange, sendMessage } from './platform/lifecycle'
import ChestPick from './ui/ChestPick.vue'
import Hud from './ui/Hud.vue'
import Icon from './ui/Icon.vue'
import LevelUp from './ui/LevelUp.vue'
import Loadout from './ui/Loadout.vue'
import Lobby from './ui/lobby/Lobby.vue'
import RewardList from './ui/lobby/RewardList.vue'
import Shop from './ui/Shop.vue'
import ViewPanel from './ui/ViewPanel.vue'
import SoundSettings from './ui/SoundSettings.vue'
import { play, setMusic } from './audio/sound'
import { viewTuning } from './game/view'

const host = ref<HTMLElement>()
const showStats = ref(false)
const game = shallowRef<Game>()
const meta = new Meta()
const loaded = ref(false)
const rewards = ref<Reward[]>([])
const goldDoubled = ref(false)
const booting = ref(false)
let autoPaused = false

// Bridge first, then the game engine and the profile; game_ready once the lobby takes input.
async function start() {
  if (booting.value) return
  booting.value = true
  const storage = await boot()
  if (!storage) {
    booting.value = false
    return
  }
  try {
    await meta.load(storage)
  } catch (e) {
    // Unknown saved state: never start over it with a fresh profile.
    console.error('[save] could not read the profile', e)
    bootState.error = 'save'
    booting.value = false
    return
  }
  adHooks.beforeAd = () => meta.flush()
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') void meta.flush()
  })
  window.addEventListener('pagehide', () => void meta.flush())
  if (!game.value) {
    const g = new Game(host.value!)
    game.value = g
    g.onRunEnd = (result) => (rewards.value = meta.applyRun(result))
    if (import.meta.env.DEV) {
      Object.assign(window, { __game: g, __meta: meta })
      import('./dev/balance').then((b) => b.installBalance(g))
    }
    // Platform pause, hidden tab or an open ad: everything stands still; in battle the pause screen shows
    // (not over an ad), and goes away by itself when the pause was not the player's.
    onPauseChange((paused) => {
      g.frozen = paused
      const s = g.ui.screen
      if (paused && !lifecycle.adOpen && (s === 'wave' || s === 'waveEnd')) {
        g.pause()
        autoPaused = true
      } else if (!paused && autoPaused) {
        autoPaused = false
        g.resume()
      }
    })
    g.frozen = lifecycle.paused
  }
  loaded.value = true
  booting.value = false
  await nextTick()
  gameReady()
}

onMounted(start)
onBeforeUnmount(() => game.value?.dispose())

const screen = computed(() => game.value?.ui.screen)
const inBattle = computed(() => screen.value === 'wave' || screen.value === 'waveEnd' || screen.value === 'paused')

function startRun() {
  rewards.value = []
  goldDoubled.value = false
  game.value?.startRun(meta.loadout())
}

function doubleGold() {
  void showRewarded('double_gold', () => {
    if (goldDoubled.value) return
    goldDoubled.value = true
    meta.doubleRunGold(rewards.value)
  })
}

// Music by screen: the lobby theme, the battle theme through the whole run, the boss theme on wave 10.
watch(
  () => [screen.value, game.value?.ui.bossWave] as const,
  ([s, boss]) => {
    if (!s) return
    if (s === 'menu') setMusic('lobby')
    else if (s === 'gameover' || s === 'victory') setMusic(null)
    else setMusic(boss && s !== 'shop' && s !== 'levelup' ? 'boss' : 'battle')
  },
)

// Every button clicks.
function onPress(e: PointerEvent) {
  if ((e.target as HTMLElement).closest?.('button:not(:disabled)')) play('click')
}

// Platform game events and interstitials at natural breaks, from the screen the game shows.
watch(screen, (now, before) => {
  const level = String((game.value?.loadout.level ?? 0) + 1)
  const data = { world: 'map', level }
  if (now === 'wave' && (before === 'menu' || before === 'gameover' || before === 'victory')) sendMessage('level_started', data)
  if (now === 'paused') sendMessage('level_paused', data)
  if (before === 'paused' && now !== 'paused') {
    autoPaused = false
    sendMessage('level_resumed', data)
  }
  if (now === 'victory') sendMessage('level_completed', data)
  if (now === 'gameover') sendMessage('level_failed', data)
  if ((now === 'levelup' || now === 'shop' || now === 'chest') && (before === 'wave' || before === 'waveEnd')) void maybeInterstitial('wave_end')
  if ((now === 'gameover' || now === 'victory') && before !== now) void maybeInterstitial('run_end')
})

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
  <div class="stage" :class="{ frozen: lifecycle.paused }" @contextmenu.prevent @pointerdown.capture="onPress">
    <div ref="host" class="canvas-host"></div>

    <div v-if="bootState.error" class="screen dim">
      <div class="ribbon red">{{ bootState.error === 'bridge' ? t('Нет связи с площадкой') : t('Не удалось загрузить сохранение') }}</div>
      <button class="btn btn-green big" :disabled="booting" @click="start">{{ t('Повторить') }}</button>
    </div>

    <template v-if="game && loaded">
      <Hud v-if="inBattle" :game="game" />
      <ViewPanel v-if="viewTuning && (screen === 'wave' || screen === 'waveEnd')" :game="game" />

      <template v-if="game.input.joy.active && screen === 'wave'">
        <div class="joy-base" :style="{ left: `${game.input.joy.ox}px`, top: `${game.input.joy.oy}px` }"></div>
        <div class="joy-knob" :style="knob"></div>
      </template>

      <Lobby v-if="screen === 'menu'" :meta="meta" @start="startRun" />

      <LevelUp v-if="screen === 'levelup'" :game="game" />
      <Shop v-if="screen === 'shop'" :game="game" />
      <ChestPick v-if="screen === 'chest'" :game="game" />

      <div v-if="screen === 'paused'" v-drag-scroll class="screen pause">
        <div class="ribbon">{{ t('Пауза') }}</div>
        <SoundSettings :meta="meta" />
        <Loadout :game="game" />
        <div v-if="showStats" class="stats-panel">
          <div v-for="s in game.ui.stats" :key="s.name" class="stat-row"><span>{{ s.name }}</span><b>{{ s.value }}</b></div>
        </div>
        <div class="shop-foot">
          <button class="btn btn-blue square" @click="showStats = !showStats"><Icon name="stats" /></button>
          <button class="btn btn-green wide" @click="game.resume()"><Icon name="play" :size="24" /> {{ t('Продолжить') }}</button>
        </div>
        <button class="btn" @click="game.surrender()">{{ t('Сдаться') }}</button>
      </div>

      <div v-if="screen === 'gameover' || screen === 'victory'" v-drag-scroll class="screen dim">
        <div class="ribbon" :class="{ red: screen === 'gameover' }">{{ screen === 'victory' ? t('Победа!') : t('Поражение') }}</div>
        <div class="result">
          <div>{{ t('Волна:') }} <b>{{ game.ui.wave }}/{{ game.ui.waveCount }}</b></div>
          <div>{{ t('Уровень:') }} <b>{{ game.ui.level }}</b></div>
          <div>{{ t('Убито:') }} <b>{{ game.ui.kills }}</b></div>
        </div>
        <div class="section-title">{{ t('Награды') }}</div>
        <RewardList :rewards="rewards" />
        <button
          v-if="!goldDoubled && rewards.some((r) => r.kind === 'gold') && rewardedSupported()"
          class="btn btn-green bonus-btn"
          :disabled="adState.busy"
          @click="doubleGold"
        >
          <Icon name="video" :size="20" /> {{ t('Золото ×2') }}
        </button>
        <button class="btn btn-green big" @click="startRun">{{ t('Ещё раз') }}</button>
        <button class="btn btn-blue" @click="game.toMenu()">{{ t('В лобби') }}</button>
      </div>
    </template>
  </div>
</template>
