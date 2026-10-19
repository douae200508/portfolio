import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface FloatingBadgeProps {
  icon: LucideIcon
  className?: string
  duration?: number
  delay?: number
}

/** Badge flottant (icône "dev" dans un cadre glass) autour de la photo du
 * Hero — donne une "vibe IT" (référence visuelle fournie), chaque badge
 * flotte à son propre rythme pour un mouvement organique plutôt que
 * synchronisé. Neutralisé si l'utilisateur préfère réduire les animations. */
export function FloatingBadge({ icon: Icon, className, duration = 3.5, delay = 0 }: FloatingBadgeProps) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.div
      aria-hidden
      animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass pointer-events-none absolute flex size-11 items-center justify-center rounded-2xl shadow-lg sm:size-12 ${className ?? ''}`}
    >
      <Icon className="size-5 text-primary sm:size-[1.4rem]" />
    </motion.div>
  )
}
