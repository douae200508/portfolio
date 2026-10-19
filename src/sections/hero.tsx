import { motion } from 'framer-motion'
import { ArrowDown, Braces, Code2, Download, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { LazyHeroScene } from '@/components/3d/lazy-hero-scene'
import { FloatingBadge } from '@/components/floating-badge'
import { SocialIcon } from '@/components/social-icon'
import { Typewriter } from '@/components/typewriter'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

export function Hero() {
  const { t } = useTranslation()

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pt-28 pb-20 lg:min-h-screen lg:py-24"
    >
      {/* .hero-grid (voir index.css) réordonne le contenu par breakpoint :
          mobile empile salutation/titre → photo → description, desktop
          revient à 2 colonnes (photo à gauche, texte regroupé à droite). */}
      <div className="hero-grid mx-auto max-w-3xl lg:max-w-6xl">
        <div className="hero-greeting flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-sm text-muted-foreground"
          >
            {t('hero.greeting', { name: `${profile.firstName} ${profile.lastName}` })}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-bold tracking-tight text-balance sm:text-6xl"
          >
            <Typewriter words={profile.titles} />
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hero-photo relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-md"
        >
          {/* Halo asymétrique en un seul ton d'or — volontairement PAS un
              anneau complet autour de la photo : une masse irrégulière en
              haut à gauche (forme "blob", pas un cercle) + un petit accent
              à droite pour équilibrer, purement décoratifs (aria-hidden,
              jamais au-dessus du contenu cliquable). */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -left-8 -z-10 size-36 rounded-[60%_40%_55%_45%/45%_55%_40%_60%] bg-primary/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/4 -right-8 -z-10 size-28 rounded-full bg-primary/45 blur-2xl"
          />

          {/* Scène 3D décalée vers le même coin que le blob CSS, pour ne
              jamais former un halo symétrique/circulaire complet autour de
              la photo (pointer-events désactivés). */}
          <div className="pointer-events-none absolute -top-[8%] -left-[8%] -z-10 size-[65%] opacity-80">
            <LazyHeroScene />
          </div>

          <div className="rounded-full bg-gradient-to-br from-primary/60 via-primary/25 to-primary/10 p-[6px] shadow-xl">
            <img
              src={profile.photoUrl}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="aspect-square w-full rounded-full border-4 border-background object-cover"
            />
          </div>

          {/* Badges flottants "vibe IT" (référence visuelle fournie). */}
          <FloatingBadge icon={Code2} className="-top-2 -right-4 sm:top-2 sm:right-0" duration={3.2} />
          <FloatingBadge icon={Terminal} className="top-1/2 -left-6 sm:-left-8" duration={4} delay={0.6} />
          <FloatingBadge icon={Braces} className="-bottom-2 right-6 sm:bottom-4 sm:right-10" duration={3.6} delay={1.2} />
        </motion.div>

        <div className="hero-description flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg text-muted-foreground text-balance"
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Button size="lg" className="h-11 gap-2 rounded-full px-6" onClick={scrollToProjects}>
              {t('hero.ctaProjects')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 gap-2 rounded-full px-6"
              render={<a href={profile.resumeUrl} download />}
              nativeButton={false}
            >
              <Download className="size-4" />
              {t('hero.ctaCv')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center gap-1"
          >
            {profile.social.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                render={<a href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} />}
                nativeButton={false}
              >
                <SocialIcon icon={link.icon} className="size-4" />
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 1.6, repeat: Infinity } }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-1.5 text-xs text-muted-foreground"
        aria-label={t('hero.scroll')}
      >
        {t('hero.scroll')}
        <ArrowDown className="size-4" />
      </motion.button>
    </section>
  )
}
