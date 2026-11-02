import * as THREE from 'three'
import list from 'virtual:sprite-list'

// Pictures from the art pipeline (public/sprites/<category>/<id>.png). A file that exists replaces its
// placeholder; a missing one keeps the placeholder. Textures load lazily, once.

const available = new Set<string>(list)
const base = `${import.meta.env.BASE_URL}sprites/`
const textures = new Map<string, THREE.Texture>()

export function hasSprite(file: string): boolean {
  return available.has(file)
}

export function spriteUrl(file: string): string {
  return base + file
}

export function spriteTexture(file: string): THREE.Texture | null {
  if (!available.has(file)) return null
  let t = textures.get(file)
  if (!t) {
    t = new THREE.TextureLoader().load(spriteUrl(file))
    t.colorSpace = THREE.SRGBColorSpace
    textures.set(file, t)
  }
  return t
}

// Walk cycle: frame 1 is the base picture, frames 2 and 3 are "<name>_2.png" and "<name>_3.png".
// Played 1 -> 2 -> 1 -> 3. Without both stride frames the picture stays still.
const WALK_ORDER = [0, 1, 0, 2]
const frameSets = new Map<string, string[]>()

export function walkFrames(base: string): string[] {
  let frames = frameSets.get(base)
  if (!frames) {
    const stem = base.slice(0, -4)
    const f2 = `${stem}_2.png`
    const f3 = `${stem}_3.png`
    frames = hasSprite(f2) && hasSprite(f3) ? [base, f2, f3] : [base]
    frameSets.set(base, frames)
  }
  return frames
}

// The frame to show at time `t` (seconds); `phase` keeps a crowd from stepping in unison.
export function walkFrame(base: string, t: number, moving: boolean, phase = 0, fps = 8): string {
  const frames = walkFrames(base)
  if (!moving || frames.length < 3) return base
  return frames[WALK_ORDER[Math.floor(t * fps + phase) % WALK_ORDER.length]]
}

// Picture slots for game entities (names match art/generation-prompts.json).
export const SPRITE = {
  hero: (id: string) => `hero/${id}.png`,
  boss: (location: string) => `boss/${location}.png`,
  mob: (defId: string) => (defId === 'egg' ? 'mob/egg.png' : `mob/${defId}.png`),
  terrain: (location: string) => `terrain/${location}.png`,
  location: (location: string) => `location/${location}.png`,
  decor: (location: string, n: number) => `decor/${location}_${n}.png`,
  border: (location: string, n: number) => `border/${location}_${n}.png`,
  weapon: (id: string) => `weapon/${id}.png`,
  gear: (itemId: string) => `gear/${itemId}.png`,
  ability: (id: string) => `ability/${id}.png`,
  item: (id: string) => `item/${id}.png`,
  chest: (id: string) => `object/chest_${id}.png`,
  coin: 'pickup/coin.png',
  medkit: 'pickup/medkit.png',
  supplyChest: 'object/supply_chest.png',
}
