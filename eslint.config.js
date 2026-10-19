import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      // Désactive toute règle de style qui entrerait en conflit avec
      // Prettier — ESLint ne juge que la qualité du code, Prettier la forme.
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // shadcn/ui exporte volontairement un composant ET ses variantes cva
      // (ex. buttonVariants) depuis le même fichier ; pareil pour nos
      // Provider+hook co-localisés (ex. theme-provider.tsx). Casser ce
      // fichier en deux juste pour Fast Refresh n'apporterait rien ici.
      'react-refresh/only-export-components': 'warn',
      // Règle issue du jeu de règles "React Compiler" (très récent, encore
      // expérimental) — trop strict pour un pattern légitime de machine à
      // états piloté par setTimeout (ex. l'effet machine à écrire du Hero).
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
