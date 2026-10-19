import { Helmet } from 'react-helmet-async'

import { profile } from '@/data/profile'

interface SeoProps {
  title: string
  description: string
  /** Image Open Graph, chemin absolu depuis /public (ex. "/og/hero.jpg"). */
  image?: string
  /** Chemin de la page (ex. "/projets/mon-projet") pour l'URL canonique. */
  path?: string
  /** JSON-LD additionnel (ex. schema.org/CreativeWork pour une étude de cas). */
  jsonLd?: Record<string, unknown>
  noindex?: boolean
}

const SITE_URL = `https://${profile.domain.replace(/^\[|\]$/g, '')}`

/**
 * Un seul composant <Seo> posé en tête de chaque page — centralise title,
 * description, Open Graph, Twitter Card et JSON-LD (cahier des charges §5).
 * Le site restant une SPA (pas de pré-rendu statique, voir README pour ce
 * compromis), ces balises sont injectées côté client par react-helmet-async ;
 * un crawler qui exécute le JS (Google) les voit, un crawler purement HTML non.
 */
export function Seo({ title, description, image, path = '', jsonLd, noindex }: SeoProps) {
  const url = `${SITE_URL}${path}`
  const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/og/default.jpg`

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${profile.firstName} ${profile.lastName}`,
    url: SITE_URL,
    sameAs: profile.social.map((s) => s.url),
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd ?? personJsonLd)}</script>
    </Helmet>
  )
}
