import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

/** Effet d'inclinaison 3D au survol (§4.5 "effet tilt") — suit la position
 * de la souris dans la carte et incline en conséquence, avec un ressort
 * (spring) pour un mouvement fluide plutôt que linéaire. Ajoute aussi un
 * halo "spotlight" qui suit le curseur (pass "plus moderne et créatif").
 * Neutralisé si l'utilisateur préfère réduire les animations. */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(-py * 10)
    spotX.set((px + 0.5) * 100)
    spotY.set((py + 0.5) * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const transform = useMotionTemplate`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${spotX}% ${spotY}%, color-mix(in oklch, var(--color-primary), transparent 82%), transparent 70%)`

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: reducedMotion ? undefined : transform }}
      className={cn('group/tilt relative will-change-transform', className)}
    >
      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      {children}
    </motion.div>
  )
}
