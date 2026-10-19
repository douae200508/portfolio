import { Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SkillBadge } from '@/components/skill-badge'
import { certifications } from '@/data/certifications'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading eyebrow={t('skills.eyebrow')} title={t('skills.title')} />

      <div className="space-y-10">
        {skillCategories.map((category, i) => (
          <Reveal key={category.titleKey} delay={i * 0.05}>
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              {t(category.titleKey)}
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {category.skills.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          </Reveal>
        ))}

        {certifications.length > 0 && (
          <Reveal delay={skillCategories.length * 0.05}>
            <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
              {t('skills.certifications')}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="glass flex items-start gap-3 rounded-2xl px-4 py-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Award className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cert.issuer} · {cert.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
