import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ru from './locales/ru.json';

import enMebix from './locales/projects/mebix/en.json';
import ruMebix from './locales/projects/mebix/ru.json';

import enTapcar from './locales/projects/tapcar/en.json';
import ruTapcar from './locales/projects/tapcar/ru.json';

import enZnaj from './locales/projects/znaj/en.json';
import ruZnaj from './locales/projects/znaj/ru.json';

import enCarmix from './locales/projects/carmix/en.json';
import ruCarmix from './locales/projects/carmix/ru.json';

import enChelyabinskgorgaz from './locales/projects/chelyabinskgorgaz/en.json';
import ruChelyabinskgorgaz from './locales/projects/chelyabinskgorgaz/ru.json';

import enPreco from './locales/projects/preco/en.json';
import ruPreco from './locales/projects/preco/ru.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: { ...en, ...enTapcar, ...enMebix, ...enZnaj, ...enCarmix, ...enChelyabinskgorgaz, ...enPreco}
        },
        ru: {
          translation: { ...ru, ...ruTapcar, ...ruMebix, ...ruZnaj, ...ruCarmix, ...ruChelyabinskgorgaz, ...ruPreco}
        },
      },
      fallbackLng: 'en',
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
      },
      interpolation: {
        escapeValue: false,
      },
    });

export default i18n;
