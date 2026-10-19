import { motion, type Variants } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  /** 'up' (défaut) fait apparaître le contenu en glissant depuis le bas. */
  direction?: 'up' | 'none'
}

const variants: Record<'up' | 'none', Variants> = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

/** Apparition au scroll (cahier des charges §2 "animations... apparitions au
 * scroll") — déclenchée une seule fois, dès que 20% de l'élément est visible. */
export function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[direction]}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
