import type { ComponentType } from 'react'
import type { SectionId } from '@/data/sections'
import { AboutSection } from './AboutSection'
import { DownloadSection } from './DownloadSection'
import { ExperienceSection } from './ExperienceSection'
import { LofiSection } from './LofiSection'
import { ProjectsSection } from './ProjectsSection'

/** Componente que se muestra en el panel de información para cada sección. */
export const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  about: AboutSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  lofi: LofiSection,
  downloads: DownloadSection,
}
