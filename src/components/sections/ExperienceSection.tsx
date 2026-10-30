// TODO: reemplaza estos trabajos de ejemplo por tu experiencia real.
const EXPERIENCE = [
  { role: 'Cargo actual', company: 'Empresa', period: '2024 — Actualidad', description: 'Qué haces y qué lograste.' },
  { role: 'Cargo anterior', company: 'Empresa', period: '2022 — 2024', description: 'Qué hacías y qué lograste.' },
]

export function ExperienceSection() {
  return (
    <ul className="cards">
      {EXPERIENCE.map((job) => (
        <li key={job.role + job.period}>
          <strong>{job.role}</strong> · {job.company}
          <small>{job.period}</small>
          <p>{job.description}</p>
        </li>
      ))}
    </ul>
  )
}
