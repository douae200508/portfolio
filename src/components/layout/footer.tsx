import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { SocialIcon } from '@/components/social-icon'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/profile'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 text-center">
        <div className="flex items-center gap-2">
          {profile.social.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              size="icon"
              render={<a href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} />}
              nativeButton={false}
            >
              <SocialIcon icon={link.icon} className="size-4" />
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="gap-1.5 rounded-full"
        >
          <ArrowUp className="size-3.5" />
          {t('footer.backToTop')}
        </Button>

        <div className="flex flex-col items-center gap-1.5 text-xs text-muted-foreground">
          <p>
            © {year} {profile.firstName} {profile.lastName} — {t('footer.rights')}
          </p>
          <p className="flex items-center gap-3">
            <Link to="/mentions-legales" className="underline-offset-4 hover:underline">
              {t('footer.legal')}
            </Link>
            <span aria-hidden>·</span>
            <span>{t('footer.builtWith', { name: `${profile.firstName} ${profile.lastName}` })}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
