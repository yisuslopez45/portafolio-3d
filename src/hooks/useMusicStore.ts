import { create } from 'zustand'

interface MusicState {
  /** Si la música de fondo debe sonar (arranca en pausa: la enciende el usuario con la tecla del VHS). */
  playing: boolean
  /** Si el mouse está sobre la tecla de play del VHS (para mostrar su pista). */
  keyHovered: boolean
  toggle: () => void
  hoverKey: (hovered: boolean) => void
}

export const useMusicStore = create<MusicState>((set) => ({
  playing: false,
  keyHovered: false,
  toggle: () => set((s) => ({ playing: !s.playing })),
  hoverKey: (hovered) => set((s) => (s.keyHovered === hovered ? s : { keyHovered: hovered })),
}))
