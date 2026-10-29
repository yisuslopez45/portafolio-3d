export type SectionId = 'projects' | 'lofi' | 'about' | 'experience'

export interface SectionConfig {
  id: SectionId
  /** Texto corto que aparece al pasar el mouse por el objeto. */
  label: string
  /** Título del panel de información. */
  title: string
  /** Dónde queda la cámara respecto al centro del objeto al hacer zoom (metros, ejes del mundo). */
  cameraOffset: [number, number, number]
  /** Cuánto se desplaza el objeto hacia la izquierda de la pantalla para dejar sitio al panel (0 = centrado). */
  sideShift: number
}

export const SECTIONS: Record<SectionId, SectionConfig> = {
  projects: {
    id: 'projects',
    label: 'Proyectos',
    title: 'Proyectos',
    cameraOffset: [0, 0.3, 0.45],
    sideShift: 0.45,
  },
  lofi: {
    id: 'lofi',
    label: 'Lofi',
    title: 'Lofi en YouTube',
    cameraOffset: [0, 0.2, 0.45],
    sideShift: 0.45,
  },
  about: {
    id: 'about',
    label: 'Acerca de mí',
    title: 'Acerca de mí',
    cameraOffset: [0, 0.1, 0.4],
    sideShift: 0.45,
  },
  experience: {
    id: 'experience',
    label: 'Experiencia laboral',
    title: 'Experiencia laboral',
    // El tablero está en la pared derecha mirando hacia -x, así que la cámara se coloca a su izquierda.
    cameraOffset: [-0.9, 0, 0],
    sideShift: 0.45,
  },
}

// TODO: reemplaza estos textos de ejemplo por tu información real.
export const CONTENT = {
  about: {
    name: 'Tu nombre — Desarrollador Full Stack',
    bio: 'Escribe aquí una breve presentación: quién eres, qué te apasiona y qué tipo de proyectos disfrutas construyendo.',
    skills: ['React', 'TypeScript', 'Three.js', 'Node.js'],
  },
  projects: [
    { name: 'Proyecto uno', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
    { name: 'Proyecto dos', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
    { name: 'Proyecto tres', description: 'Descripción corta del proyecto y la tecnología usada.', url: '#' },
  ],
  experience: [
    { role: 'Cargo actual', company: 'Empresa', period: '2024 — Actualidad', description: 'Qué haces y qué lograste.' },
    { role: 'Cargo anterior', company: 'Empresa', period: '2022 — 2024', description: 'Qué hacías y qué lograste.' },
  ],
  // ID del video o directo de YouTube (el de este ejemplo es el directo de Lofi Girl).
  lofiVideoId: 'https://www.youtube.com/watch?v=BYTxPFj44uo&list=RDBYTxPFj44uo&start_radio=1',
}
