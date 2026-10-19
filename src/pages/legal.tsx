import { useTranslation } from 'react-i18next'

import { Seo } from '@/components/seo'

export function LegalPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-2xl px-6 py-28">
      <Seo title={t('legal.title')} description={t('legal.title')} path="/mentions-legales" noindex />
      <h1 className="text-3xl font-bold tracking-tight">{t('legal.title')}</h1>
      <p className="mt-6 whitespace-pre-line text-muted-foreground">{t('legal.intro')}</p>
    </div>
  )
}
