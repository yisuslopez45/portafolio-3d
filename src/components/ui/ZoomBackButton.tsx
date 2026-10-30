import { SECTIONS } from '@/data/sections'
import { useFocusStore } from '@/hooks/useFocusStore'

// Botón para salir del zoom en las secciones sin panel (que no tienen la × del panel). Esc también sale.
export function ZoomBackButton() {
  const visible = useFocusStore((s) => s.active !== null && !SECTIONS[s.active].title)
  const close = useFocusStore((s) => s.blur)

  return (
    <button
      type="button"
      className={`zoom-back${visible ? ' visible' : ''}`}
      onClick={close}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      ← Volver
    </button>
  )
}
