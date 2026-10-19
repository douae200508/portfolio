// ============================================================
// Parcours — frise chronologique (§4.6). Mélange expériences et
// formations, triées du plus récent au plus ancien par `startYear`.
// ============================================================

export type ExperienceType = 'work' | 'education'

export interface ExperienceEntry {
  type: ExperienceType
  startYear: number
  endYear: number | 'present'
  title: string
  organization: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    type: 'education',
    startYear: 2026,
    endYear: 2027,
    title: "2ème année cycle d'ingénieur",
    organization: 'ENSI, Tanger',
    highlights: [],
  },
  {
    type: 'work',
    startYear: 2026,
    endYear: 2026,
    title: 'Formatrice en Développement Informatique',
    organization: 'Énergies Alternatives Maroc Sarl, Tanger',
    highlights: [
      "Formation et accompagnement des apprenants en développement informatique au sein d'un centre de formation international.",
    ],
  },
  {
    type: 'work',
    startYear: 2026,
    endYear: 2026,
    title: 'Stagiaire en Développement Full Stack',
    organization: 'InfiniBoost, Tanger',
    highlights: [
      "Conception et développement d'une plateforme web intelligente pour la gestion d'un restaurant, basée sur Laravel, Inertia.js et React.",
    ],
  },
  {
    type: 'work',
    startYear: 2025,
    endYear: 2025,
    title: 'Stagiaire en Développement Web',
    organization: 'Haut Définition SARL, Tanger',
    highlights: [
      "Conception et mise en place d'un site WordPress avec WooCommerce et Dokan pour la présentation des métiers de l'INDH.",
    ],
  },
  {
    type: 'education',
    startYear: 2023,
    endYear: 2025,
    title: 'Diplôme en Développement Digital – Option Full Stack',
    organization: 'OFPPT ISMONTIC, Tanger',
    highlights: [],
  },
  {
    type: 'education',
    startYear: 2023,
    endYear: 2025,
    title: 'Diplôme en Entrepreneuriat (PIE)',
    organization: 'OFPPT ISMONTIC, Tanger',
    highlights: [],
  },
]
