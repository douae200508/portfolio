import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

/** FR/EN uniquement (cahier des charges §1) — un simple bouton qui bascule,
 * pas de menu déroulant pour seulement deux langues. */
export function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const next = i18n.language.startsWith('fr') ? 'en' : 'fr'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t('language.toggle')}
      onClick={() => i18n.changeLanguage(next)}
      className="font-mono text-xs font-semibold uppercase"
    >
      {next}
    </Button>
  )
}
