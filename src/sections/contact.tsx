import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import { Check, Copy, Loader2, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/data/profile'
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema'

// Variables d'environnement (voir .env.example) — EmailJS permet d'envoyer
// un email directement depuis le navigateur, sans serveur à héberger
// (cahier des charges §2 "aucun serveur requis"). Tant qu'elles ne sont
// pas configurées, le formulaire reste utilisable mais affiche une erreur
// claire plutôt qu'un faux succès.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (data: ContactFormValues) => {
    // Le piège à bots est rempli : on fait semblant d'avoir réussi (un vrai
    // bot ne doit jamais apprendre que sa soumission a été repérée) sans
    // rien envoyer réellement.
    if (data.website) {
      setStatus('success')
      reset()
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        'EmailJS non configuré — renseignez VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY dans .env',
      )
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        { publicKey: PUBLIC_KEY },
      )
      setStatus('success')
      reset()
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    toast.success(t('contact.copied'))
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="mx-auto max-w-xl px-6 py-24">
      <SectionHeading eyebrow={t('contact.eyebrow')} title={t('contact.title')} />

      <Reveal>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Honeypot — hors-écran mais présent dans le DOM/tab order pour un
              bot naïf, ignoré par un humain qui ne le voit jamais. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t('contact.name')}</Label>
              <Input id="name" {...register('name')} aria-invalid={!!errors.name} />
              {errors.name && <p className="text-xs text-destructive">{t(errors.name.message!)}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('contact.email')}</Label>
              <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
              {errors.email && <p className="text-xs text-destructive">{t(errors.email.message!)}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject">{t('contact.subject')}</Label>
            <Input id="subject" {...register('subject')} aria-invalid={!!errors.subject} />
            {errors.subject && <p className="text-xs text-destructive">{t(errors.subject.message!)}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">{t('contact.message')}</Label>
            <Textarea id="message" rows={5} {...register('message')} aria-invalid={!!errors.message} />
            {errors.message && <p className="text-xs text-destructive">{t(errors.message.message!)}</p>}
          </div>

          <Button type="submit" className="w-full gap-2 rounded-full" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t('contact.sending')}
              </>
            ) : (
              <>
                <Send className="size-4" />
                {t('contact.send')}
              </>
            )}
          </Button>

          {status === 'success' && (
            <p className="text-center text-sm text-emerald-600 dark:text-emerald-400">
              {t('contact.success')}
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-destructive">{t('contact.error')}</p>
          )}
        </form>

        <div className="mt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>{profile.location}</p>
          <Button variant="outline" size="sm" onClick={copyEmail} className="gap-1.5 rounded-full">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {profile.email}
          </Button>
          {profile.phone && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full"
              render={<a href={`tel:${profile.phone.replace(/\s+/g, '')}`} />}
              nativeButton={false}
            >
              <Phone className="size-3.5" />
              {profile.phone}
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  )
}
