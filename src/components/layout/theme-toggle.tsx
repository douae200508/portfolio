import { Laptop, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={t('theme.toggle')} />}>
        <Sun className="size-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute size-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')} data-active={theme === 'light'}>
          <Sun className="size-4" /> {t('theme.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} data-active={theme === 'dark'}>
          <Moon className="size-4" /> {t('theme.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} data-active={theme === 'system'}>
          <Laptop className="size-4" /> {t('theme.system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
