import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'
import type { MouseEvent } from 'react'

/**
 * Logo réel de la techno (cahier des charges §4.4 "grille de cartes avec
 * logos") — servi par le CDN public Simple Icons plutôt que d'empaqueter
 * la librairie complète (des milliers d'icônes) dans le bundle. `filter`
 * recolore le SVG monochrome en `currentColor` pour suivre le thème clair/
 * sombre sans dépendre d'une couleur de marque figée par le CDN. Le halo
 * "spotlight" qui suit le curseur reprend l'effet des cartes projet.
 */
export function SkillBadge({ name, icon }: { name: string; icon: string }) {
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(200px circle at ${spotX}% ${spotY}%, color-mix(in oklch, var(--color-primary), transparent 85%), transparent 70%)`

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    spotX.set(((e.clientX - rect.left) / rect.width) * 100)
    spotY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="glass group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl px-4 py-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <img
        src={`https://cdn.simpleicons.org/${icon}`}
        alt=""
        aria-hidden
        className="relative size-8 opacity-80 transition-opacity group-hover:opacity-100 dark:invert-[0.85]"
        loading="lazy"
        width={32}
        height={32}
      />
      <span className="relative text-center text-xs font-medium text-muted-foreground group-hover:text-foreground">
        {name}
      </span>
    </div>
  )
}
