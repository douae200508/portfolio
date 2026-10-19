import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'

// Français par défaut (cahier des charges §1) — l'anglais n'est proposé que
// si la langue détectée du navigateur commence par "en" ; sinon on reste en
// français, jamais une troisième langue non supportée.
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-lang',
    },
    interpolation: { escapeValue: false },
  })

export default i18n
