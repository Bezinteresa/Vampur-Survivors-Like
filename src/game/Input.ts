import { reactive } from 'vue'

// Keyboard (WASD/arrows, Space, E, P) and a floating touch joystick. Esc is never used (Playgama 1.5.2).

export const JOY_RADIUS = 55

const UP = new Set(['KeyW', 'ArrowUp'])
const DOWN = new Set(['KeyS', 'ArrowDown'])
const LEFT = new Set(['KeyA', 'ArrowLeft'])
const RIGHT = new Set(['KeyD', 'ArrowRight'])

export class Input {
  // Screen coordinates relative to the surface: origin (o) and knob (k).
  readonly joy = reactive({ active: false, ox: 0, oy: 0, kx: 0, ky: 0 })
  onAbility: (index: number) => void = () => {}
  onPause: () => void = () => {}
  private readonly keys = new Set<string>()
  private pointerId: number | null = null

  constructor(private readonly surface: HTMLElement) {
    window.addEventListener('keydown', this.keyDown)
    window.addEventListener('keyup', this.keyUp)
    window.addEventListener('blur', this.clear)
    surface.addEventListener('pointerdown', this.pointerDown)
    window.addEventListener('pointermove', this.pointerMove)
    window.addEventListener('pointerup', this.pointerUp)
    window.addEventListener('pointercancel', this.pointerUp)
  }

  dispose(): void {
    window.removeEventListener('keydown', this.keyDown)
    window.removeEventListener('keyup', this.keyUp)
    window.removeEventListener('blur', this.clear)
    this.surface.removeEventListener('pointerdown', this.pointerDown)
    window.removeEventListener('pointermove', this.pointerMove)
    window.removeEventListener('pointerup', this.pointerUp)
    window.removeEventListener('pointercancel', this.pointerUp)
  }

  // World-space direction (y up), length ≤ 1.
  move(): { x: number; y: number } {
    if (this.joy.active) {
      const x = (this.joy.kx - this.joy.ox) / JOY_RADIUS
      const y = -(this.joy.ky - this.joy.oy) / JOY_RADIUS
      const len = Math.hypot(x, y)
      return len > 1 ? { x: x / len, y: y / len } : len < 0.15 ? { x: 0, y: 0 } : { x, y }
    }
    const x = (this.has(RIGHT) ? 1 : 0) - (this.has(LEFT) ? 1 : 0)
    const y = (this.has(UP) ? 1 : 0) - (this.has(DOWN) ? 1 : 0)
    const len = Math.hypot(x, y) || 1
    return { x: x / len, y: y / len }
  }

  clear = (): void => {
    this.keys.clear()
    this.pointerId = null
    this.joy.active = false
  }

  private has(set: Set<string>): boolean {
    for (const k of set) if (this.keys.has(k)) return true
    return false
  }

  private keyDown = (e: KeyboardEvent): void => {
    if (UP.has(e.code) || DOWN.has(e.code) || LEFT.has(e.code) || RIGHT.has(e.code)) {
      this.keys.add(e.code)
      e.preventDefault()
    }
    if (e.code === 'Space') e.preventDefault()
    if (e.repeat) return
    if (e.code === 'Space') this.onAbility(0)
    else if (e.code === 'KeyE') this.onAbility(1)
    else if (e.code === 'KeyP') this.onPause()
  }

  private keyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code)
  }

  private pointerDown = (e: PointerEvent): void => {
    if (this.pointerId !== null) return
    const r = this.surface.getBoundingClientRect()
    this.pointerId = e.pointerId
    this.joy.ox = this.joy.kx = e.clientX - r.left
    this.joy.oy = this.joy.ky = e.clientY - r.top
    this.joy.active = true
  }

  private pointerMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return
    const r = this.surface.getBoundingClientRect()
    const kx = e.clientX - r.left
    const ky = e.clientY - r.top
    // Floating stick: when the finger goes past the rim, the base follows it.
    const dx = kx - this.joy.ox
    const dy = ky - this.joy.oy
    const d = Math.hypot(dx, dy)
    if (d > JOY_RADIUS) {
      this.joy.ox = kx - (dx / d) * JOY_RADIUS
      this.joy.oy = ky - (dy / d) * JOY_RADIUS
    }
    this.joy.kx = kx
    this.joy.ky = ky
  }

  private pointerUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return
    this.pointerId = null
    this.joy.active = false
  }
}
