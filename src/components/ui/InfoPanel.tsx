import { useState } from 'react'
import { CONTENT, SECTIONS } from '@/data/sections'
import type { SectionId } from '@/data/sections'
import { useFocusStore } from '@/hooks/useFocusStore'
import { useEscapeKey } from '@/hooks/useEscapeKey'

function SectionContent({ section }: { section: SectionId }) {
  switch (section) {
    case 'about':
      return (
        <>
          <h3>{CONTENT.about.name}</h3>
          <p>{CONTENT.about.bio}</p>
          <ul className="chips">
            {CONTENT.about.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </>
      )
    case 'projects':
      return (
        <ul className="cards">
          {CONTENT.projects.map((p) => (
            <li key={p.name}>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.name}
              </a>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      )
    case 'experience':
      return (
        <ul className="cards">
          {CONTENT.experience.map((job) => (
            <li key={job.role + job.period}>
              <strong>{job.role}</strong> · {job.company}
              <small>{job.period}</small>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      )
    case 'lofi':
      return (
        <div className="video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${CONTENT.lofiVideoId}?autoplay=1`}
            title="Lofi en YouTube"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
  }
}

export function InfoPanel() {
  const active = useFocusStore((s) => s.active)
  // Se conserva la última sección para que el contenido no desaparezca mientras el panel se desliza hacia afuera.
  const [last, setLast] = useState<SectionId | null>(null)
  if (active && active !== last) setLast(active)

  const close = useFocusStore((s) => s.blur)
  useEscapeKey(close, active !== null)

  return (
    <aside className={`info-panel${active ? ' open' : ''}`} aria-hidden={!active}>
      {last && (
        <>
          <header>
            <h2>{SECTIONS[last].title}</h2>
            <button type="button" onClick={close} aria-label="Cerrar">
              ×
            </button>
          </header>
          <div className="body">{active && <SectionContent section={last} />}</div>
        </>
      )}
    </aside>
  )
}
