# Portfolio

Site vitrine personnel — React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js.

## Installation

```bash
npm install
cp .env.example .env
```

Renseignez dans `.env` vos identifiants [EmailJS](https://www.emailjs.com/) (nécessaires pour que le formulaire de contact envoie réellement des e-mails) :

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

## Lancement (développement)

```bash
npm run dev
```

Le site est servi sur `http://localhost:5173`.

Autres commandes utiles :

```bash
npm run lint      # ESLint
npm run format    # Prettier (écrit les corrections)
```

## Build de production

```bash
npm run build     # vérifie les types (tsc) puis génère dist/
npm run preview   # sert dist/ localement pour vérifier le build
```

## Déploiement

Le site est une SPA (pas de pré-rendu statique) : n'importe quel hébergeur de fichiers statiques convient (Vercel, Netlify, GitHub Pages, OVH...), à condition de rediriger toutes les routes inconnues vers `index.html` (mode "SPA fallback" / `rewrite` 200). Sans cette règle, recharger la page sur une URL comme `/projets/eventaura` renverra une 404 côté serveur.

Avant de déployer :
1. Mettre à jour `profile.domain` dans `src/data/profile.ts` avec le vrai nom de domaine (utilisé pour les balises SEO/Open Graph).
2. Mettre à jour `public/robots.txt` et `public/sitemap.xml` avec ce même domaine.
3. Remplacer les images placeholder (voir ci-dessous).

## Ajout / remplacement de contenu

Tout le contenu personnalisable vit dans `src/data/` et `src/i18n/locales/` — aucun composant n'a besoin d'être modifié.

| Quoi | Où |
|---|---|
| Identité, titres, stats, réseaux sociaux | `src/data/profile.ts` |
| Compétences | `src/data/skills.ts` |
| Projets (cartes + pages d'étude de cas) | `src/data/projects.ts` |
| Parcours (expériences, formations) | `src/data/experience.ts` |
| Témoignages (laisser `[]` masque la section) | `src/data/testimonials.ts` |
| Textes d'interface (FR/EN) | `src/i18n/locales/fr.json`, `en.json` |

### Images et fichiers statiques

À remplacer dans `public/` (des placeholders y sont déjà présents pour éviter les erreurs 404) :

- `profile-photo.jpg` — photo de profil
- `cv.pdf` — CV téléchargeable
- `projects/placeholder-1.jpg` à `placeholder-4.jpg` — visuels de projets (ajoutez-en d'autres librement, référencés depuis `src/data/projects.ts`)
- `og/default.jpg` — image par défaut pour les partages (Open Graph / Twitter Card)

### Couleurs et polices

La palette (or/terracotta, OKLCH) et les polices (Inter, JetBrains Mono, auto-hébergées) sont définies dans `src/index.css` (tokens `:root` / `.dark` + bloc `@theme inline`).
