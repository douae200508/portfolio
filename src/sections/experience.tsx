import { Briefcase, GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/data/experience'

export function Experience() {
  const { t } = useTranslation()
  const sorted = [...experience].sort((a, b) => b.startYear - a.startYear)

  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow={t('experience.eyebrow')} title={t('experience.title')} />

      <ol className="relative border-s border-border/60 ps-12">
        {sorted.map((entry, i) => {
          const Icon = entry.type === 'work' ? Briefcase : GraduationCap
          return (
            <Reveal key={`${entry.title}-${entry.startYear}`} delay={i * 0.06} className="relative mb-10 last:mb-0">
              <li className="relative">
                <span className="absolute -start-9 top-0 flex size-8 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_16px_-4px_var(--color-primary)]">
                  <Icon className="size-3.5 text-primary" />
                </span>
                <p className="font-mono text-xs text-muted-foreground">
                  {entry.startYear} – {entry.endYear === 'present' ? '' : entry.endYear}
                  {entry.endYear === 'present' && (
                    <span className="text-primary">{entry.endYear === 'present' ? '…' : ''}</span>
                  )}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
                <p className="text-sm text-muted-foreground">{entry.organization}</p>
                {entry.highlights.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 ps-4 text-sm text-muted-foreground">
                    {entry.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </li>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}
