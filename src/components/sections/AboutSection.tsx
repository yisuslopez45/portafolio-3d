// TODO: reemplaza estos textos de ejemplo por tu información real.
const ABOUT = {
  name: 'Tu nombre — Desarrollador Full Stack',
  bio: 'Escribe aquí una breve presentación: quién eres, qué te apasiona y qué tipo de proyectos disfrutas construyendo.',
  skills: ['React', 'TypeScript', 'Three.js', 'Node.js'],
}

export function AboutSection() {
  return (
    <>
      <h3>{ABOUT.name}</h3>
      <p>{ABOUT.bio}</p>
      <ul className="chips">
        {ABOUT.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </>
  )
}
