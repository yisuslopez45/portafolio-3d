import type { ComponentType } from 'react'
import type { SectionId } from '@/data/sections'
import { AboutSection } from './AboutSection'
import { DownloadSection } from './DownloadSection'
import { ExperienceSection } from './ExperienceSection'
import { LofiSection } from './LofiSection'
import { ProjectsSection } from './ProjectsSection'

/** Componente que se muestra en el panel de información para cada sección (las de solo zoom no tienen). */
export const SECTION_COMPONENTS: Partial<Record<SectionId, ComponentType>> = {
  about: AboutSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  lofi: LofiSection,
  downloads: DownloadSection,
}
