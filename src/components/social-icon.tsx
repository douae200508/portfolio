import { Mail } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * lucide-react a retiré les icônes de marques (GitHub...) et Simple Icons a
 * carrément retiré LinkedIn de son catalogue (vérifié : absent du paquet
 * `simple-icons`, 404 sur le CDN) — probablement une demande de retrait liée
 * à la marque. On sert GitHub via le CDN Simple Icons, LinkedIn via un SVG
 * minimal gardé en dur ici (le tracé officiel du logo "in", usage standard
 * pour un simple lien vers son propre profil), et Mail via lucide-react
 * (icône générique, pas une marque).
 */
export function SocialIcon({ icon, className }: { icon: 'github' | 'linkedin' | 'mail' | 'twitter'; className?: string }) {
  if (icon === 'mail' || icon === 'twitter') {
    return <Mail className={className} />
  }

  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    )
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}`}
      alt=""
      aria-hidden
      className={cn('dark:invert', className)}
      loading="lazy"
    />
  )
}
