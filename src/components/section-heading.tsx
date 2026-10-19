import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-12', align === 'center' && 'text-center', className)}>
      <p className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="bg-gradient-to-r from-foreground to-foreground bg-clip-text text-3xl font-bold tracking-tight text-balance text-transparent sm:text-4xl dark:from-foreground dark:via-primary/90 dark:to-foreground">
        {title}
      </h2>
    </Reveal>
  )
}
