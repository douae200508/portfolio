import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ProjectCard } from '@/components/project-card'
import { SectionHeading } from '@/components/section-heading'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import { cn } from '@/lib/utils'

export function Projects() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow={t('projects.eyebrow')} title={t('projects.title')} />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={cn(
              'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              filter === cat.value ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {filter === cat.value && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative">{t(cat.labelKey)}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className={project.featured ? 'sm:col-span-2' : ''}
            >
              <ProjectCard project={project} featured={project.featured} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
