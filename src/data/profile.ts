// ============================================================
// Contenu central du profil — TOUT le texte personnel du site
// vit ici (et dans i18n/locales/*.json pour ce qui doit être
// traduit). Remplacez chaque valeur [entre crochets] par votre
// vrai contenu ; aucun composant n'a besoin d'être modifié.
// ============================================================

export interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'linkedin' | 'mail' | 'twitter'
}

export const profile = {
  firstName: 'Douae',
  lastName: 'Chakhtouna',
  /** Rotation affichée dans le Hero (effet machine à écrire). */
  titles: ['Développeuse Full-Stack', 'Développeuse Web', 'Formatrice en développement'],
  location: 'Tanger, Maroc',
  email: 'douaesnabi@gmail.com',
  phone: '06 23 18 51 04',
  /** Pas de nom de domaine réservé pour l'instant — à remplacer une fois le site déployé. */
  domain: '[douae-chakhtouna.dev]',
  /** Chemin vers la photo professionnelle, dans /public ou importée. */
  photoUrl: '/profile-photo.jpg',
  /** Chemin vers le CV, servi depuis /public (bouton "Télécharger mon CV") —
   * à remplacer par le vrai fichier (cv_dev.pdf fourni). */
  resumeUrl: '/cv.pdf',
  availableForWork: true,

  social: [
    { label: 'GitHub', url: 'https://github.com/douae200508', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/douae-chakhtouna-bbaa57292', icon: 'linkedin' },
    { label: 'E-mail', url: 'mailto:douaesnabi@gmail.com', icon: 'mail' },
  ] satisfies SocialLink[],

  /** Chiffres clés animés de la section "À propos" — dérivés du CV (2 stages
   * + 1 mission de formation depuis avril 2025, ~16 technologies listées). */
  stats: [
    { value: 1, suffix: '+', labelKey: 'about.stats.years' },
    { value: 2, suffix: '+', labelKey: 'about.stats.projects' },
    { value: 15, suffix: '+', labelKey: 'about.stats.technologies' },
    { value: 3, suffix: '+', labelKey: 'about.stats.internships' },
  ],
}
