import { useTranslation } from 'react-i18next'

import { Seo } from '@/components/seo'
import { profile } from '@/data/profile'
import { About } from '@/sections/about'
import { Contact } from '@/sections/contact'
import { Experience } from '@/sections/experience'
import { Hero } from '@/sections/hero'
import { Projects } from '@/sections/projects'
import { Services } from '@/sections/services'
import { Skills } from '@/sections/skills'
import { Testimonials } from '@/sections/testimonials'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={`Portfolio — ${profile.titles[0]}`}
        description={t('hero.tagline').replace(/^\[|\]$/g, '')}
      />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  )
}
