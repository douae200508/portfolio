import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeProviderState {
  theme: Theme
  /** Thème réellement appliqué à l'écran une fois "system" résolu. */
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'portfolio-theme'

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    // Clair par défaut — "sombre"/"système" restent disponibles via le
    // sélecteur, voir le script anti-flash dans index.html qui applique la
    // même règle avant le premier rendu React.
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'light'
  })
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  // Suit les changements de préférence système en direct (ex. l'utilisateur
  // bascule son OS en sombre à 20h) tant que "system" est sélectionné.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => setSystemTheme(media.matches ? 'dark' : 'light')
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  const setTheme = (next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme])

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme doit être utilisé à l\'intérieur de <ThemeProvider>')
  return context
}
