import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

/** Accordéon "Services" (inspiré d'une référence visuelle fournie) — une
 * ligne ouverte à la fois, la première dépliée par défaut. Structure et
 * interaction reprises à l'identique, recolorées dans la palette du site. */
export function Services() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="services" className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} />

      <div className="space-y-3">
        {services.map((service, i) => {
          const isOpen = openIndex === i
          const Icon = service.icon

          return (
            <Reveal key={service.title} delay={i * 0.05}>
              <div
                className={cn(
                  'overflow-hidden rounded-2xl border transition-colors duration-300',
                  isOpen
                    ? 'border-primary/40 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent'
                    : 'glass',
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full',
                      i % 2 === 0 ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary',
                    )}
                  >
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span className="flex-1 font-semibold">{service.title}</span>
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300',
                      isOpen
                        ? 'rotate-45 border-primary bg-primary text-primary-foreground'
                        : 'border-border/60 text-muted-foreground',
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 ps-[4.75rem] text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
