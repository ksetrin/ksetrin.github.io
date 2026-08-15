/** Достаёт строку контент-пака на нужном языке. Контент двуязычный, UI — через i18next. */
export const pickLang = (value, lang = 'ru') => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.ru || value.en || '';
};

export const normalizeLang = (language) => (String(language || 'ru').startsWith('en') ? 'en' : 'ru');
