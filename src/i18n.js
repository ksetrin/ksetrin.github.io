import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ru from './locales/ru.json';

const projectLocales = import.meta.glob('./locales/projects/*/*.json', { eager: true, import: 'default' });

const mergeProjects = (lang) =>
  Object.entries(projectLocales)
    .filter(([filePath]) => filePath.endsWith(`/${lang}.json`))
    .reduce((acc, [, data]) => ({ ...acc, ...data }), {});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, ...mergeProjects('en') } },
      ru: { translation: { ...ru, ...mergeProjects('ru') } }
    },
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
