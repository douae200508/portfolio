import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'

import { BrowserMockup } from '@/components/browser-mockup'
import { GalleryLightbox } from '@/components/gallery-lightbox'
import { Reveal } from '@/components/reveal'
import { Seo } from '@/components/seo'
import { Badge } from '@/components/ui/badge'
import { projectDisplayUrl, projects } from '@/data/projects'

export function ProjectDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/404" replace />

  const project = projects[index]
  const prevProject = projects[(index - 1 + projects.length) % projects.length]
  const nextProject = projects[(index + 1) % projects.length]
  const { caseStudy } = project

  return (
    <article className="mx-auto max-w-3xl px-6 py-28">
      <Seo
        title={`${project.name} — ${t('projects.viewCase')}`}
        description={project.shortDescription}
        image={project.coverImage}
        path={`/projets/${project.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.shortDescription,
          image: project.coverImage,
          keywords: project.stack.join(', '),
        }}
      />

      <Link
        to="/#projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {t('projects.backToProjects')}
      </Link>

      <Reveal>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="font-mono text-[0.7rem]">
              {tech}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{project.shortDescription}</p>
      </Reveal>

      <BrowserMockup
        url={projectDisplayUrl(project)}
        className="mt-10 rounded-2xl shadow-lg shadow-primary/5"
      >
        <img src={project.coverImage} alt={project.name} className="aspect-video w-full object-cover" />
      </BrowserMockup>

      <div className="mt-12 space-y-10">
        <Reveal>
          <h2 className="mb-2 text-xl font-semibold">{t('projects.caseStudy.context')}</h2>
          <p className="text-muted-foreground">{caseStudy.context}</p>
        </Reveal>

        <Reveal>
          <h2 className="mb-2 text-xl font-semibold">{t('projects.caseStudy.role')}</h2>
          <p className="text-muted-foreground">{caseStudy.role}</p>
        </Reveal>

        <Reveal>
          <h2 className="mb-2 text-xl font-semibold">{t('projects.caseStudy.solution')}</h2>
          <p className="text-muted-foreground">{caseStudy.solution}</p>
        </Reveal>

        <Reveal>
          <h2 className="mb-3 text-xl font-semibold">{t('projects.caseStudy.features')}</h2>
          <ul className="list-disc space-y-1.5 ps-5 text-muted-foreground">
            {caseStudy.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>

        {project.gallery.length > 0 && (
          <Reveal>
            <h2 className="mb-3 text-xl font-semibold">{t('projects.caseStudy.gallery')}</h2>
            <GalleryLightbox images={project.gallery} alt={project.name} />
          </Reveal>
        )}

        <Reveal>
          <h2 className="mb-2 text-xl font-semibold">{t('projects.caseStudy.challenges')}</h2>
          <p className="text-muted-foreground">{caseStudy.challenges}</p>
        </Reveal>

        <Reveal>
          <h2 className="mb-2 text-xl font-semibold">{t('projects.caseStudy.results')}</h2>
          <p className="text-muted-foreground">{caseStudy.results}</p>
        </Reveal>
      </div>

      <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-border/60 pt-8">
        <Link
          to={`/projets/${prevProject.slug}`}
          className="group flex flex-col gap-1 rounded-xl border border-border/60 p-4 transition-colors hover:border-primary/40"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <ArrowLeft className="size-3" /> {t('projects.prevProject')}
          </span>
          <span className="font-medium group-hover:text-primary">{prevProject.name}</span>
        </Link>
        <Link
          to={`/projets/${nextProject.slug}`}
          className="group flex flex-col items-end gap-1 rounded-xl border border-border/60 p-4 text-right transition-colors hover:border-primary/40"
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {t('projects.nextProject')} <ArrowRight className="size-3" />
          </span>
          <span className="font-medium group-hover:text-primary">{nextProject.name}</span>
        </Link>
      </nav>
    </article>
  )
}
