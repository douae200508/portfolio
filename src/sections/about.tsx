import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedCounter } from '@/components/animated-counter'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { profile } from '@/data/profile'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

      <Reveal>
        {profile.availableForWork && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted-foreground">{t('about.available')}</span>
          </div>
        )}

        <p className="text-lg text-muted-foreground">{t('about.text')}</p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="font-mono text-3xl font-bold text-primary">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t(stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
