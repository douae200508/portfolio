// ============================================================
// Projets — section prioritaire du site (cahier des charges §4.5).
// chaque entrée alimente à la fois la carte dans la grille ET sa
// page d'étude de cas (/projets/:slug).
//
// `categories` sert aux filtres animés (Tous / Web / Full-Stack / API /
// Mobile) — un projet peut apparaître dans plusieurs filtres à la fois
// (ex. une plateforme full-stack aussi pensée pour mobile).
// `featured: true` affiche le projet en grand format.
// ============================================================

export type ProjectCategory = 'web' | 'fullstack' | 'api' | 'mobile'

export interface Project {
  slug: string
  name: string
  shortDescription: string
  categories: ProjectCategory[]
  featured?: boolean
  coverImage: string
  gallery: string[]
  stack: string[]
  demoUrl?: string
  githubUrl?: string
  caseStudy: {
    context: string
    role: string
    solution: string
    features: string[]
    challenges: string
    results: string
  }
}

/** URL affichée dans la barre d'adresse du mockup navigateur (BrowserMockup)
 * — utilise `demoUrl` s'il est renseigné (pas un placeholder entre
 * crochets), sinon une URL de façade basée sur le slug. */
export function projectDisplayUrl(project: Project): string {
  if (project.demoUrl && !project.demoUrl.startsWith('[')) {
    return project.demoUrl.replace(/^https?:\/\//, '')
  }
  return `${project.slug}.ma`
}

export const projects: Project[] = [
  {
    slug: 'eventaura',
    name: 'EventAura',
    shortDescription:
      "Plateforme de gestion d'événements professionnels couvrant les grandes villes du Maroc, avec un système de recommandation propulsé par l'IA.",
    categories: ['fullstack'],
    featured: true,
    coverImage: '/projects/placeholder-1.jpg',
    gallery: ['/projects/placeholder-1.jpg'],
    stack: ['React', 'Laravel', 'API REST', 'IA'],
    demoUrl: '[https://demo.exemple.com]',
    githubUrl: '[https://github.com/douae200508/eventaura]',
    caseStudy: {
      context:
        "Les professionnels marocains manquent d'un outil centralisé pour organiser, promouvoir et gérer des événements à grande échelle dans les principales villes du pays — la plupart des solutions existantes sont fragmentées ou mal adaptées au marché local.",
      role: "Conception et développement full-stack de la plateforme, de la modélisation des données à l'intégration du système de recommandation IA.",
      solution:
        "Une plateforme pensée dès le départ pour couvrir plusieurs grandes villes du Maroc : un back-end Laravel expose une API REST consommée par un front-end React, enrichie par un module d'intelligence artificielle personnalisé qui recommande des événements et optimise leur organisation.",
      features: [
        "Création et gestion d'événements professionnels multi-villes",
        "Système de recommandation propulsé par IA (événements, créneaux, audience)",
        'API REST Laravel consommée par une interface React',
        "Tableau de bord organisateur avec suivi des inscriptions",
      ],
      challenges:
        "Concevoir une architecture capable de couvrir plusieurs grandes villes dès le lancement, tout en intégrant un système d'IA personnalisé sans complexifier l'expérience de l'organisateur.",
      results:
        '[Résultat concret à préciser une fois le projet lancé : nombre de villes couvertes, d\'événements créés, retours des premiers organisateurs...]',
    },
  },
  {
    slug: 'gestion-restaurant',
    name: 'Plateforme de gestion de restaurant',
    shortDescription:
      "Plateforme web intelligente pour la gestion d'un restaurant, avec menu digital, chatbot et lien vers les avis Google — pensée aussi pour mobile, l'usage le plus fréquent via le scan de QR code.",
    categories: ['fullstack', 'mobile'],
    coverImage: '/projects/placeholder-2.jpg',
    gallery: ['/projects/placeholder-2.jpg'],
    stack: ['Laravel', 'Inertia.js', 'React'],
    githubUrl: '[https://github.com/douae200508/gestion-restaurant]',
    caseStudy: {
      context:
        "Un restaurant avait besoin d'un outil numérique pour centraliser et simplifier la gestion de son activité au quotidien, tout en facilitant l'interaction avec ses clients directement depuis le site.",
      role: 'Stagiaire développeuse Full Stack — conception, développement et maintenance de la plateforme au sein de l\'équipe technique.',
      solution:
        "Une application construite avec Laravel et Inertia.js pour relier un back-end robuste à une interface React réactive, sans dupliquer la logique métier entre front et back. Côté client, un menu digital interactif — conçu mobile-first, car la grande majorité des clients y accèdent en scannant un QR code à table — est complété par un chatbot pour répondre aux questions courantes et un lien direct vers les avis Google.",
      features: [
        'Gestion des commandes et du menu',
        'Menu digital interactif côté client, conçu mobile-first',
        'Accès au menu via scan de QR code (usage le plus fréquent)',
        "Chatbot d'assistance pour les clients",
        'Intégration des avis Google',
        "Interface d'administration pour le suivi de l'activité",
      ],
      challenges:
        "Apprendre et appliquer rapidement Inertia.js pour faire cohabiter proprement Laravel et React sur un même projet, puis fiabiliser le chatbot et le lien vers les avis Google pour une expérience client fluide sur mobile.",
      results: '[Résultat concret à préciser : mise en production, retour du restaurant partenaire...]',
    },
  },
  {
    slug: 'esante',
    name: 'eSanté',
    shortDescription:
      'Plateforme de gestion hospitalière pour la prise de rendez-vous avec des médecins, avec des espaces dédiés patient et médecin.',
    categories: ['fullstack'],
    coverImage: '/projects/placeholder-4.jpg',
    gallery: ['/projects/placeholder-4.jpg'],
    stack: ['React', 'Laravel', 'API REST', 'MySQL'],
    demoUrl: '[https://demo.exemple.com]',
    githubUrl: '[https://github.com/douae200508/esante]',
    caseStudy: {
      context:
        "Les patients et les médecins manquent souvent d'un outil simple pour organiser et suivre les rendez-vous médicaux, avec des besoins très différents selon qu'on est patient ou médecin.",
      role: "Conception et développement full-stack de la plateforme, de la modélisation des données à la séparation des espaces patient et médecin.",
      solution:
        "Une plateforme avec deux espaces distincts : les patients peuvent rechercher un médecin, consulter ses disponibilités et prendre rendez-vous en ligne, tandis que les médecins disposent d'un espace dédié avec des fonctionnalités plus avancées pour gérer leur planning, leurs patients et leurs dossiers médicaux.",
      features: [
        'Prise de rendez-vous en ligne avec les médecins',
        'Espace patient : rendez-vous, historique, documents médicaux',
        'Espace médecin : gestion du planning et des dossiers patients',
        'Fonctionnalités avancées côté médecin (statistiques, ordonnances)',
      ],
      challenges:
        "Concevoir deux expériences utilisateur distinctes (patient et médecin) sur une base commune, sans complexifier l'architecture ni dupliquer la logique métier.",
      results: '[Résultat concret à préciser]',
    },
  },
  {
    slug: 'site-vitrine-metiers',
    name: 'Site vitrine de présentation de métiers',
    shortDescription:
      "Site WordPress pour la présentation de métiers et d'initiatives auprès du public, avec WooCommerce et Dokan.",
    categories: ['web'],
    coverImage: '/projects/placeholder-3.jpg',
    gallery: ['/projects/placeholder-3.jpg'],
    stack: ['WordPress', 'WooCommerce', 'Dokan'],
    caseStudy: {
      context:
        "Besoin d'une présence web structurée pour présenter différents métiers et initiatives auprès du grand public.",
      role: 'Stagiaire développeuse web — conception et mise en place du site.',
      solution:
        "Un site WordPress construit avec WooCommerce et l'extension marketplace Dokan pour structurer la présentation des métiers.",
      features: ['Présentation structurée des métiers', 'Intégration WooCommerce', 'Configuration Dokan (marketplace)'],
      challenges:
        "Prendre en main rapidement l'écosystème WordPress/WooCommerce/Dokan pour livrer un site fonctionnel dans le temps imparti du stage.",
      results: '[Résultat concret à préciser : mise en ligne, retours obtenus...]',
    },
  },
]

export const projectCategories: { value: 'all' | ProjectCategory; labelKey: string }[] = [
  { value: 'all', labelKey: 'projects.filters.all' },
  { value: 'web', labelKey: 'projects.filters.web' },
  { value: 'fullstack', labelKey: 'projects.filters.fullstack' },
  { value: 'api', labelKey: 'projects.filters.api' },
  { value: 'mobile', labelKey: 'projects.filters.mobile' },
]
