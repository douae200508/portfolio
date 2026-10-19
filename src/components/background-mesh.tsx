/** Halo ambiant fixe (or/terracotta, très flouté) derrière tout le site —
 * donne de la profondeur aux cartes en glassmorphism (§ pass "plus moderne et
 * créatif"). Purement décoratif : `aria-hidden`, jamais interactif. */
export function BackgroundMesh() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute -top-40 -left-40 size-[32rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 size-[28rem] rounded-full bg-secondary/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-primary/10 blur-[120px]" />
      {/* Grain discret pour un rendu moins "plat" — mix-blend-overlay le
          rend quasi invisible mais casse les aplats de couleur unis. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
