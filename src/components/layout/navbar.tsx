import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { LanguageToggle } from '@/components/layout/language-toggle'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/hooks/use-active-section'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'

const NAV_SECTIONS = ['home', 'about', 'skills', 'services', 'projects', 'experience', 'contact'] as const

export function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrolled()
  const activeId = useActiveSection([...NAV_SECTIONS])
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const goToSection = (id: string) => {
    setMobileOpen(false)
    if (!isHome) {
      navigate('/')
      requestAnimationFrame(() =>
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80),
      )
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <div
        className={cn(
          'flex w-[min(100%-2rem,72rem)] items-center justify-between rounded-full border px-4 transition-all duration-300',
          'border-border/60 bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50',
          scrolled ? 'h-12 shadow-sm' : 'h-14',
        )}
      >
        <Link
          to="/"
          className="font-mono text-sm font-bold tracking-tight whitespace-nowrap"
          onClick={() => setMobileOpen(false)}
        >
          {profile.firstName} {profile.lastName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => goToSection(id)}
              className={cn(
                'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                isHome && activeId === id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isHome && activeId === id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{t(`nav.${id}`)}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileOpen ? <X className="size-[1.1rem]" /> : <Menu className="size-[1.1rem]" />}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+0.5rem)] w-[min(100%-2rem,72rem)] rounded-2xl border border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur-lg lg:hidden"
          >
            {NAV_SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => goToSection(id)}
                className={cn(
                  'block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium',
                  isHome && activeId === id ? 'bg-accent text-foreground' : 'text-muted-foreground',
                )}
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
