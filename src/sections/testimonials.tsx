import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionHeading } from '@/components/section-heading'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  // Défilement automatique toutes les 7s, mis en pause tant qu'il n'y a
  // qu'un seul témoignage (rien à faire défiler).
  useEffect(() => {
    if (testimonials.length <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [])

  // Section entièrement masquée si aucun témoignage n'est fourni (data/testimonials.ts).
  if (testimonials.length === 0) return null

  const current = testimonials[index]
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  return (
    <section id="testimonials" className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />

      <div className="glass relative rounded-3xl p-8 text-center shadow-sm sm:p-12">
        <Quote className="mx-auto mb-4 size-8 text-primary/40" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg text-balance italic">“{current.quote}”</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Avatar>
                <AvatarImage src={current.avatarUrl} alt="" />
                <AvatarFallback>{current.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold">{current.name}</p>
                <p className="text-xs text-muted-foreground">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prev} aria-label="Précédent">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={next} aria-label="Suivant">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
