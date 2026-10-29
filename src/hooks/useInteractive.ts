import { useEffect, useRef } from 'react'
import { Box3, Vector3 } from 'three'
import type { Group } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import type { SectionId } from '@/data/sections'
import { useFocusStore } from './useFocusStore'

// Hover y click de un objeto 3D asociado a una sección. Devuelve el ref del grupo a medir y los handlers a pegarle.
export function useInteractive(section: SectionId) {
  const ref = useRef<Group>(null)
  const hovered = useFocusStore((s) => s.hovered === section)
  // Mientras hay zoom, el resto de objetos deja de responder.
  const locked = useFocusStore((s) => s.active !== null)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  const handlers = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      const { active, hover } = useFocusStore.getState()
      if (!active) hover(section)
    },
    onPointerOut: () => {
      const { hovered, hover } = useFocusStore.getState()
      if (hovered === section) hover(null)
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      const { active, focus } = useFocusStore.getState()
      if (active || !ref.current) return
      const center = new Box3().setFromObject(ref.current).getCenter(new Vector3())
      focus(section, center)
    },
  }

  return { ref, handlers, hovered: hovered && !locked }
}
