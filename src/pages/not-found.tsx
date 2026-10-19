import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Seo } from '@/components/seo'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Seo title={t('notFound.title')} description={t('notFound.message')} noindex />

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
        className="font-mono text-8xl font-bold text-primary/20 select-none sm:text-9xl"
      >
        404
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="-mt-6"
      >
        <h1 className="text-2xl font-bold">{t('notFound.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('notFound.message')}</p>
        <Button className="mt-6 gap-2 rounded-full" render={<Link to="/" />} nativeButton={false}>
          <Home className="size-4" />
          {t('notFound.backHome')}
        </Button>
      </motion.div>
    </div>
  )
}
