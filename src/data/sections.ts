export type SectionId = 'projects' | 'lofi' | 'about' | 'experience' | 'downloads' | 'lamp' | 'solder'

export interface SectionConfig {
  id: SectionId
  /** Texto corto que aparece al pasar el mouse por el objeto. */
  label: string
  /** Título del panel de información. Sin título la sección es solo zoom: no abre panel. */
  title?: string
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
  downloads: {
    id: 'downloads',
    label: 'Descargas',
    title: 'Descargas',
    // El libro está en el nicho de la pared izquierda mirando hacia +x, así que la cámara se coloca a su derecha.
    cameraOffset: [0.9, 0.1, 0],
    sideShift: 0.45,
  },
  // Solo zoom (sin panel): el objeto queda centrado.
  lamp: {
    id: 'lamp',
    label: 'Lámpara',
    cameraOffset: [0, 0.15, 0.5],
    sideShift: 0,
  },
  solder: {
    id: 'solder',
    label: 'Estación de soldadura',
    cameraOffset: [0, 0.25, 0.4],
    sideShift: 0,
  },
}

// El contenido de cada sección vive en su propio componente: ver src/components/sections/.
