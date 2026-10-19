import { animate, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

/** Chiffre qui compte de 0 jusqu'à `value` une fois visible à l'écran (§4.3
 * "chiffres clés animés"). Se fige directement sur la valeur finale si
 * l'utilisateur préfère réduire les animations. */
export function AnimatedCounter({ value, suffix = '', duration = 1.6 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toString())
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    const unsubscribe = rounded.on('change', setDisplay)
    return unsubscribe
  }, [rounded])

  useEffect(() => {
    if (!inView) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      count.set(value)
      return
    }
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    return controls.stop
  }, [inView, value, duration, count])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
