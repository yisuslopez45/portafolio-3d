import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import { MathUtils } from 'three'
import type { Group } from 'three'
import type { JSX } from 'react/jsx-runtime'
import type { SectionId } from '@/data/sections'
import { useInteractive } from '@/hooks/useInteractive'

const HOVER_SCALE = 1.06

type InteractiveProps = JSX.IntrinsicElements['group'] & { section: SectionId }

// Envuelve un modelo para que reaccione al mouse (hover: escala + borde azul) y al click (zoom + panel).
// La posición, rotación y escala van aquí; el modelo de dentro se deja sin transformar.
export function Interactive({ section, children, ...props }: InteractiveProps) {
  const { ref, handlers, hovered } = useInteractive(section)
  const inner = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!inner.current) return
    const s = MathUtils.damp(inner.current.scale.x, hovered ? HOVER_SCALE : 1, 10, delta)
    inner.current.scale.setScalar(s)
  })

  return (
    <group ref={ref} {...props} {...handlers}>
      <group ref={inner}>
        <Select enabled={hovered}>{children}</Select>
      </group>
    </group>
  )
}
