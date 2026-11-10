// TODO: reemplaza estos proyectos de ejemplo por los tuyos.
const PROJECTS = [
  { name: 'Proyecto uno', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
  { name: 'Proyecto dos', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
  { name: 'Proyecto tres', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
]

export function ProjectsSection() {
  return (
    <ul className="cards">
      {PROJECTS.map((p) => (
        <li key={p.name}>
          <a href={p.url} target="_blank" rel="noreferrer">
            {p.name}
          </a>
          <p>{p.description}</p>
        </li>
      ))}
    </ul>
  )
}
