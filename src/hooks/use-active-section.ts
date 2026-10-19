import { useEffect, useState } from 'react'

/**
 * Détecte quelle section (par id) occupe le plus l'écran, pour surligner le
 * bon lien dans la Navbar pendant le défilement fluide (cahier des charges
 * §4.1 "mise en évidence de la section active").
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
