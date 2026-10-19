import { Component, lazy, Suspense, type ReactNode } from 'react'

const HeroScene = lazy(() => import('./hero-scene'))

/** Dégradé statique affiché pendant le chargement de Three.js, si WebGL est
 * indisponible, ou si l'utilisateur a demandé "réduire les animations" —
 * jamais d'écran vide pendant l'attente. */
function Fallback() {
  return (
    <div className="size-full bg-[radial-gradient(circle_at_50%_50%,var(--color-primary)_0%,transparent_70%)] opacity-30" />
  )
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: unknown) {
    // WebGL non supporté/désactivé par exemple — on ne casse jamais le Hero
    // pour autant, on retombe juste sur le dégradé statique.
    console.warn('Scène 3D indisponible, repli sur le dégradé statique.', error)
  }
  render() {
    return this.state.hasError ? <Fallback /> : this.props.children
  }
}

export function LazyHeroScene() {
  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return <Fallback />

  return (
    <SceneErrorBoundary>
      <Suspense fallback={<Fallback />}>
        <HeroScene />
      </Suspense>
    </SceneErrorBoundary>
  )
}
