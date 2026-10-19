import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { BrowserMockup } from '@/components/browser-mockup'
import { TiltCard } from '@/components/tilt-card'
import { Badge } from '@/components/ui/badge'
import { projectDisplayUrl, type Project } from '@/data/projects'

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t } = useTranslation()

  return (
    <TiltCard className="glass group relative overflow-hidden rounded-3xl shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/10">
      <Link to={`/projets/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.name} />

      <div className={featured ? 'grid gap-0 sm:grid-cols-2' : ''}>
        <BrowserMockup url={projectDisplayUrl(project)} className="rounded-none border-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img
              src={project.coverImage}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
                {t('projects.viewCase')}
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>
        </BrowserMockup>

        <div className="flex flex-col gap-3 p-6">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">{project.shortDescription}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-[0.7rem]">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
