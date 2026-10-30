import { useState } from 'react'
import { SECTIONS } from '@/data/sections'
import type { SectionId } from '@/data/sections'
import { SECTION_COMPONENTS } from '@/components/sections'
import { useFocusStore } from '@/hooks/useFocusStore'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export function InfoPanel() {
  const active = useFocusStore((s) => s.active)
  // Se conserva la última sección para que el contenido no desaparezca mientras el panel se desliza hacia afuera.
  const [last, setLast] = useState<SectionId | null>(null)
  if (active && active !== last) setLast(active)

  const close = useFocusStore((s) => s.blur)
  const Content = last ? SECTION_COMPONENTS[last] : null
  useEscapeKey(close, active !== null)

  return (
    <aside className={`info-panel${active ? ' open' : ''}`} data-section={last ?? undefined} aria-hidden={!active}>
      {last && (
        <>
          <header>
            <h2>{SECTIONS[last].title}</h2>
            <button type="button" onClick={close} aria-label="Cerrar">
              ×
            </button>
          </header>
          <div className="body">{active && Content && <Content />}</div>
        </>
      )}
    </aside>
  )
}
