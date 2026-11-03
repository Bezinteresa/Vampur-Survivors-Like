// Sound effects and music: recorded files in public/audio (CC0, list in README, copied by
// scripts/prepare_audio.py). Playgama 3.3.2 does not accept sound synthesized in code.
// A sample that has not loaded yet is simply not played; the game never waits for it.
// Everything is silent while lifecycle.muted (the platform forbids sound, the game is paused, an ad is open).

import { reactive, watch } from 'vue'
import { lifecycle } from '../platform/lifecycle'

export type Sfx =
  | 'shot' | 'magic' | 'zap' | 'mech' | 'swing' | 'roll' | 'enemyShot' | 'beam' | 'boom' | 'boss' | 'ability'
  | 'hit' | 'kill' | 'hurt' | 'coin' | 'heal' | 'levelup' | 'wave' | 'waveClear' | 'buy' | 'reroll' | 'click'
  | 'chest' | 'win' | 'lose'

const FILES: Record<Sfx, string> = {
  shot: 'shot.ogg', magic: 'magic.ogg', zap: 'zap.ogg', mech: 'mech.ogg', swing: 'swing.wav', roll: 'roll.wav',
  enemyShot: 'enemy_shot.ogg', beam: 'beam.ogg', boom: 'boom.ogg', boss: 'boss.ogg', ability: 'ability.ogg',
  hit: 'hit.ogg', kill: 'kill.ogg', hurt: 'hurt.ogg', coin: 'coin.ogg', heal: 'heal.ogg', levelup: 'levelup.ogg',
  wave: 'wave.ogg', waveClear: 'wave_clear.ogg', buy: 'buy.ogg', reroll: 'reroll.ogg', click: 'click.ogg',
  chest: 'chest.ogg', win: 'win.ogg', lose: 'lose.ogg',
}
// Loudness and the base pitch of each recording (a pitched-up explosion is a musket crack).
const TUNE: Partial<Record<Sfx, { vol?: number; rate?: number }>> = {
  shot: { vol: 0.22, rate: 1.8 }, magic: { vol: 0.3, rate: 1.4 }, zap: { vol: 0.35 }, mech: { vol: 0.2, rate: 1.3 },
  swing: { vol: 0.5 }, roll: { vol: 0.5 }, enemyShot: { vol: 0.18, rate: 0.8 }, beam: { vol: 0.3 }, boom: { vol: 0.5 },
  hit: { vol: 0.3 }, kill: { vol: 0.35 }, hurt: { vol: 0.6 }, coin: { vol: 0.25, rate: 1.4 }, click: { vol: 0.5 },
  ability: { vol: 0.6 }, boss: { vol: 0.9 },
}
// Frequent sounds are spaced out, so a crowd of fifty dying wolves is not fifty sounds at once.
const MIN_GAP: Partial<Record<Sfx, number>> = {
  shot: 0.07, magic: 0.08, zap: 0.08, mech: 0.08, hit: 0.05, kill: 0.06, coin: 0.04, enemyShot: 0.1, swing: 0.08,
}

/** Player settings; stored in the profile (Meta) and given here at boot and on every change. */
export const sound = reactive({ on: true, music: 0.7, sfx: 1 })

const SFX_LEVEL = 0.7
const MUSIC_LEVEL = 0.35

let ctx: AudioContext | null = null
let master: GainNode | null = null
let musicGain: GainNode | null = null
const buffers = new Map<Sfx, AudioBuffer>()
const lastPlayed = new Map<Sfx, number>()
const url = (file: string) => `${import.meta.env.BASE_URL}audio/${file}`
const blocked = () => lifecycle.muted || !sound.on

function loadSamples(a: AudioContext): void {
  for (const [name, file] of Object.entries(FILES) as [Sfx, string][]) {
    fetch(url(file))
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${file}`)
        return r.arrayBuffer()
      })
      .then((data) => a.decodeAudioData(data))
      .then((buffer) => buffers.set(name, buffer))
      .catch((e) => console.warn('[sound]', e))
  }
}

function audio(): AudioContext | null {
  if (blocked()) return null
  try {
    if (!ctx) {
      ctx = new AudioContext()
      master = ctx.createGain()
      master.connect(ctx.destination)
      musicGain = ctx.createGain()
      musicGain.connect(ctx.destination)
      applyVolumes()
      loadSamples(ctx)
    }
    if (ctx.state === 'suspended') void ctx.resume().catch(() => undefined)
    return ctx
  } catch {
    return null
  }
}

/** Plays a sound; `pitch` multiplies the recording's own pitch (a little random spread is added). */
export function play(name: Sfx, pitch = 1): void {
  const a = audio()
  const buffer = buffers.get(name)
  if (!a || !master || !buffer) return
  const gap = MIN_GAP[name]
  if (gap) {
    const last = lastPlayed.get(name) ?? -1
    if (a.currentTime - last < gap) return
    lastPlayed.set(name, a.currentTime)
  }
  const tune = TUNE[name]
  const src = a.createBufferSource()
  src.buffer = buffer
  src.playbackRate.value = (tune?.rate ?? 1) * pitch * (0.93 + Math.random() * 0.14)
  const g = a.createGain()
  g.gain.value = tune?.vol ?? 1
  src.connect(g).connect(master)
  src.start()
}

// ---------- music: one looping track per screen ----------

export type Track = 'lobby' | 'battle' | 'boss'
const MUSIC: Record<Track, string> = { lobby: 'music_lobby.mp3', battle: 'music_battle.mp3', boss: 'music_boss.mp3' }
let wanted: Track | null = null
let current: HTMLAudioElement | null = null
const players = new Map<Track, HTMLAudioElement>()
const routed = new WeakSet<HTMLAudioElement>()

/** The screen's track (null: silence). */
export function setMusic(track: Track | null): void {
  wanted = track
  syncMusic()
}

function applyVolumes(): void {
  if (master) master.gain.value = blocked() ? 0 : SFX_LEVEL * sound.sfx
  if (musicGain) musicGain.gain.value = MUSIC_LEVEL * sound.music
  for (const el of players.values()) if (!routed.has(el)) el.volume = MUSIC_LEVEL * sound.music
}

function syncMusic(): void {
  if (typeof Audio === 'undefined') return
  const on = !!wanted && sound.music > 0 && !blocked()
  if (on) audio() // music goes through its gain node (iOS ignores an <audio> element's volume)
  const next = on && wanted ? (players.get(wanted) ?? newPlayer(wanted)) : null
  if (current && current !== next) current.pause()
  current = next
  if (!current) return
  // Browsers refuse to start sound before the first tap; the next tap tries again.
  current.play().catch(() => window.addEventListener('pointerdown', syncMusic, { once: true, capture: true }))
}

function newPlayer(track: Track): HTMLAudioElement {
  const el = new Audio(url(MUSIC[track]))
  el.loop = true
  el.volume = MUSIC_LEVEL * sound.music
  if (ctx && musicGain) {
    try {
      ctx.createMediaElementSource(el).connect(musicGain)
      el.volume = 1
      routed.add(el)
    } catch {
      // plays with its own volume
    }
  }
  players.set(track, el)
  return el
}

// Pause, ad, platform mute or the player's switch: silence at once, and back when allowed.
watch(
  () => [lifecycle.muted, sound.on, sound.music, sound.sfx],
  () => {
    applyVolumes()
    syncMusic()
    if (!ctx) return
    if (blocked() && ctx.state === 'running') void ctx.suspend().catch(() => undefined)
    else if (!blocked() && ctx.state === 'suspended') void ctx.resume().catch(() => undefined)
  },
)

/** Dev console and tests: what is playing now. */
export function audioState(): { context: string; track: Track | null; musicPlaying: boolean; loaded: number } {
  return { context: ctx?.state ?? 'none', track: wanted, musicPlaying: !!current && !current.paused, loaded: buffers.size }
}
