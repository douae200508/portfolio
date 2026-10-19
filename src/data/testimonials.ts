// ============================================================
// Témoignages (§4.8, optionnel). Laissez le tableau vide ([]) pour
// masquer entièrement la section — <TestimonialsSection> ne
// s'affiche que si testimonials.length > 0.
// ============================================================

export interface Testimonial {
  name: string
  role: string
  quote: string
  avatarUrl?: string
}

export const testimonials: Testimonial[] = [
  // Exemple — remplacez par vos vraies recommandations ou videz le tableau :
  // { name: '[Nom]', role: '[Poste, Entreprise]', quote: '[Citation]' },
]
