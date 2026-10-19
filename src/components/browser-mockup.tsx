import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface BrowserMockupProps {
  url: string
  children: ReactNode
  className?: string
}

/** Cadre "navigateur" (points façon macOS + barre d'adresse) autour d'une
 * capture de projet — un aplat de couleur a moins de présence qu'un vrai
 * produit affiché "dans" un navigateur (§ pass "plus moderne et créatif"). */
export function BrowserMockup({ url, children, className }: BrowserMockupProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border/50 bg-card', className)}>
      <div className="flex items-center gap-3 border-b border-border/50 bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-center font-mono text-[0.65rem] text-muted-foreground">
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}
