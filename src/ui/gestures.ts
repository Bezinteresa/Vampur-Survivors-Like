import type { Directive } from 'vue'

// Touch and mouse gestures for menus: swipe left/right (carousels, tabs) and drag-to-scroll with the mouse
// (fingers already scroll natively). A drag never ends in an accidental click.

const SWIPE_MIN = 50 // px
const DRAG_CLICK_GUARD = 6 // px of movement after which the release is not a click

export interface SwipeHandlers {
  left?: () => void
  right?: () => void
}

type SwipeEl = HTMLElement & { __swipe?: SwipeHandlers }

export const vSwipe: Directive<SwipeEl, SwipeHandlers> = {
  mounted(el, binding) {
    el.__swipe = binding.value
    let x0 = 0
    let y0 = 0
    let id: number | null = null
    el.addEventListener('pointerdown', (e) => {
      id = e.pointerId
      x0 = e.clientX
      y0 = e.clientY
    })
    el.addEventListener('pointerup', (e) => {
      if (e.pointerId !== id) return
      id = null
      const dx = e.clientX - x0
      const dy = e.clientY - y0
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.5) return
      // The innermost swiped element wins: a carousel inside a tab view does not also switch the tab.
      e.stopPropagation()
      suppressNextClick(el)
      if (dx < 0) el.__swipe?.left?.()
      else el.__swipe?.right?.()
    })
    el.addEventListener('pointercancel', () => (id = null))
  },
  updated(el, binding) {
    el.__swipe = binding.value
  },
}

type DragEl = HTMLElement & { __dragOff?: () => void }

export const vDragScroll: Directive<DragEl> = {
  mounted(el) {
    let id: number | null = null
    let lastY = 0
    let moved = 0
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      id = e.pointerId
      lastY = e.clientY
      moved = 0
    }
    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      const dy = e.clientY - lastY
      lastY = e.clientY
      moved += Math.abs(dy)
      el.scrollTop -= dy
    }
    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      id = null
      if (moved > DRAG_CLICK_GUARD) suppressNextClick(el)
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    el.__dragOff = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  },
  unmounted(el) {
    el.__dragOff?.()
  },
}

function suppressNextClick(el: HTMLElement): void {
  const stop = (ev: Event) => {
    ev.stopPropagation()
    ev.preventDefault()
  }
  el.addEventListener('click', stop, { capture: true, once: true })
  // If no click follows (finger lifted outside a button), drop the guard.
  setTimeout(() => el.removeEventListener('click', stop, { capture: true }), 50)
}
