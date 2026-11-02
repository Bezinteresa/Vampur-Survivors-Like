// Own SVG icons (24×24 grid, 2px stroke, round caps). No emoji in UI (Playgama 4.3.2).
export const ICONS: Record<string, { d: string; fill?: boolean }> = {
  pause: { d: 'M8 5v14M16 5v14' },
  play: { d: 'M7 4.5v15l12.5-7.5z', fill: true },
  roll: { d: 'M20 12a8 8 0 1 1-2.6-5.9M20 4v5h-5' },
  bolt: { d: 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z', fill: true },
  coin: { d: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 1 0 0-9' },
  reroll: { d: 'M4 12a8 8 0 0 1 13.7-5.6L20 9M20 4v5h-5M20 12a8 8 0 0 1-13.7 5.6L4 15M4 20v-5h5' },
  lock: { d: 'M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11' },
  unlock: { d: 'M6 11h12v10H6zM8.5 11V7.5a3.5 3.5 0 0 1 6.8-1.2' },
  up: { d: 'M12 19V5M6 11l6-6 6 6' },
  stats: { d: 'M5 20V11M12 20V4M19 20v-7' },
  heart: { d: 'M12 20.5s-8-5-8-10.5a4.5 4.5 0 0 1 8-2.8 4.5 4.5 0 0 1 8 2.8c0 5.5-8 10.5-8 10.5z', fill: true },
}
