import { SECTIONS } from '@/data/sections'
import { useFocusStore } from '@/hooks/useFocusStore'
import { useMusicStore } from '@/hooks/useMusicStore'

// Pista que aparece abajo al pasar el mouse por un objeto interactivo.
export function HoverLabel() {
  const hovered = useFocusStore((s) => s.hovered)
  const keyHovered = useMusicStore((s) => s.keyHovered)
  const playing = useMusicStore((s) => s.playing)

  // La tecla de play del VHS tiene prioridad sobre el VHS que la contiene.
  const text = keyHovered
    ? `Música · clic para ${playing ? 'pausar' : 'reproducir'}`
    : hovered && `${SECTIONS[hovered].label} · clic para ver`

  return <div className={`hover-label${text ? ' visible' : ''}`}>{text}</div>
}
