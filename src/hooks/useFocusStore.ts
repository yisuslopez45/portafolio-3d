import { create } from 'zustand'
import { Vector3 } from 'three'
import type { SectionId } from '@/data/sections'

interface FocusState {
  /** Sección bajo el mouse (null si ninguna). */
  hovered: SectionId | null
  /** Sección en la que se hizo zoom (null si la cámara está en reposo). */
  active: SectionId | null
  /** Centro del objeto activo en coordenadas del mundo. */
  center: Vector3
  hover: (id: SectionId | null) => void
  focus: (id: SectionId, center: Vector3) => void
  blur: () => void
}

// En componentes React: useFocusStore((s) => s.active).
// Fuera de React (useFrame, handlers): useFocusStore.getState().
export const useFocusStore = create<FocusState>((set) => ({
  hovered: null,
  active: null,
  center: new Vector3(),
  hover: (id) => set((s) => (s.hovered === id ? s : { hovered: id })),
  focus: (id, center) => set({ active: id, hovered: null, center: center.clone() }),
  blur: () => set((s) => (s.active === null ? s : { active: null })),
}))
