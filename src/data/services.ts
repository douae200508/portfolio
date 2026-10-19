// ============================================================
// Services — accordéon "Ce que je peux vous apporter". Contenu
// personnel (comme experience.ts/projects.ts), pas traduit : les
// clés i18n ne couvrent que l'eyebrow/titre de section.
// ============================================================

import { Code2, GraduationCap, Globe, LifeBuoy, Palette, type LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: Code2,
    title: 'Développement Full Stack',
    description:
      "Conception et développement d'applications web complètes, du back-end au front-end, avec une architecture propre et maintenable.",
  },
  {
    icon: Globe,
    title: 'Création de sites web',
    description:
      'Mise en place de sites web sur-mesure, pensés pour être simples à faire évoluer et adaptés à vos besoins.',
  },
  {
    icon: Palette,
    title: 'UI/UX & Design',
    description:
      'Maquettes et interfaces pensées pour une expérience claire, cohérente et agréable à utiliser.',
  },
  {
    icon: GraduationCap,
    title: 'Formation & Accompagnement',
    description:
      "Transmission de compétences en développement informatique, grâce à une expérience concrète de formatrice auprès d'apprenants.",
  },
  {
    icon: LifeBuoy,
    title: 'Conseil & Support',
    description:
      'Accompagnement technique sur vos projets web existants : diagnostic, améliorations et support pour faire évoluer votre plateforme.',
  },
]
