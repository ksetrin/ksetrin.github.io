import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ru from './locales/ru.json';

const projectLocales = import.meta.glob('./locales/projects/*/*.json', { eager: true, import: 'default' });
const toolLocales = import.meta.glob('./locales/tools/*.json', { eager: true, import: 'default' });

const mergeByLang = (modules, lang) =>
  Object.entries(modules)
    .filter(([filePath]) => filePath.endsWith(`/${lang}.json`))
    .reduce((acc, [, data]) => ({ ...acc, ...data }), {});

const mergeProjects = (lang) => mergeByLang(projectLocales, lang);
const mergeTools = (lang) => mergeByLang(toolLocales, lang);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { ...en, ...mergeProjects('en'), ...mergeTools('en') } },
      ru: { translation: { ...ru, ...mergeProjects('ru'), ...mergeTools('ru') } }
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
