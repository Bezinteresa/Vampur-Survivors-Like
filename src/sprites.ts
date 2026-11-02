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

// Picture slots for game entities (names match art/generation-prompts.json).
export const SPRITE = {
  hero: (id: string) => `hero/${id}.png`,
  boss: (location: string) => `boss/${location}.png`,
  mob: (defId: string) => (defId === 'egg' ? 'mob/egg.png' : `mob/${defId}.png`),
  terrain: (location: string) => `terrain/${location}.png`,
  location: (location: string) => `location/${location}.png`,
  weapon: (id: string) => `weapon/${id}.png`,
  gear: (itemId: string) => `gear/${itemId}.png`,
  ability: (id: string) => `ability/${id}.png`,
  item: (id: string) => `item/${id}.png`,
  chest: (id: string) => `object/chest_${id}.png`,
  coin: 'pickup/coin.png',
  medkit: 'pickup/medkit.png',
  supplyChest: 'object/supply_chest.png',
}
