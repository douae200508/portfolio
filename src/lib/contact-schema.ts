import { z } from 'zod'

// Schéma partagé par le formulaire (react-hook-form) — les messages
// d'erreur sont des clés i18n, traduites au moment de l'affichage
// (voir contact.tsx), jamais du texte figé ici.
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'contact.errors.required'),
  email: z.string().trim().min(1, 'contact.errors.required').email('contact.errors.email'),
  subject: z.string().trim().min(1, 'contact.errors.required'),
  message: z.string().trim().min(10, 'contact.errors.minLength'),
  // Honeypot anti-spam (§4.10) : champ invisible pour un humain (masqué en
  // CSS, jamais en display:none seul — un bot un peu sérieux ignore
  // display:none mais remplit quand même un champ "caché" autrement :
  // on utilise une classe utilitaire hors-écran, voir contact.tsx).
  // Doit rester vide ; sinon on traite silencieusement comme du spam.
  website: z.string().max(0, 'contact.errors.honeypot').optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
