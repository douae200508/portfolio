import { useEffect, useState } from 'react'

/** true dès que la page a défilé de plus de `threshold` px — pilote la
 * réduction de la Navbar au scroll (§4.1). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
