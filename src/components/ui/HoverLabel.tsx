import { SECTIONS } from '@/data/sections'
import { useFocusStore } from '@/hooks/useFocusStore'

// Pista que aparece abajo al pasar el mouse por un objeto interactivo.
export function HoverLabel() {
  const hovered = useFocusStore((s) => s.hovered)
  return (
    <div className={`hover-label${hovered ? ' visible' : ''}`}>
      {hovered && `${SECTIONS[hovered].label} · clic para ver`}
    </div>
  )
}
