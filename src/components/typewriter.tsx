import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
}

/** Effet machine à écrire alternant entre plusieurs titres (Hero, §4.2) —
 * tape, marque une pause, efface, passe au mot suivant, en boucle. Respecte
 * `prefers-reduced-motion` en affichant directement le premier mot, fixe. */
export function Typewriter({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseMs = 1800,
  className,
}: TypewriterProps) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(reducedMotion ? words[0] : '')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    if (reducedMotion) return

    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), pauseMs)
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, phase, wordIndex, words, reducedMotion])

  return (
    <span className={className}>
      {text}
      {!reducedMotion && <span className="animate-pulse text-primary">|</span>}
    </span>
  )
}
