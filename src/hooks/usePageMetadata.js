import { useEffect } from 'react';

const SITE_NAME = 'Пётр Евсиков — React Native инженер';
const SITE_URL = 'https://ksetrin.github.io';
const DEFAULT_DESCRIPTION =
  'React Native разработчик и технический лидер: архитектура мобильных приложений, публикации в сторах, DevOps и оптимизация процессов.';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/photo.jpeg`;

const ensureElement = (selector, create) => {
  const existing = document.head.querySelector(selector);
  if (existing) {
    return existing;
  }
  const element = create();
  document.head.appendChild(element);
  return element;
};

const setMeta = (name, content) => {
  if (!content) return;
  const tag = ensureElement(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    return meta;
  });
  tag.setAttribute('content', content);
};

const setPropertyMeta = (property, content) => {
  if (!content) return;
  const tag = ensureElement(`meta[property="${property}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute('property', property);
    return meta;
  });
  tag.setAttribute('content', content);
};

const setCanonical = (href) => {
  if (!href) return;
  const link = ensureElement('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  });
  link.setAttribute('href', href);
};

export const usePageMetadata = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  lang = 'ru',
  robots = 'index,follow'
}) => {
  useEffect(() => {
    const normalizedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = canonical || `${SITE_URL}${window.location.pathname}`;
    const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords || '';
    const ogLocales = { en: 'en_US', ru: 'ru_RU' };
    const ogLocale = ogLocales[lang] || ogLocales.ru;

    document.title = normalizedTitle;
    document.documentElement.lang = lang;

    setMeta('description', description);
    if (keywordsContent) {
      setMeta('keywords', keywordsContent);
    }
    setMeta('robots', robots);
    setCanonical(canonicalUrl);

    setPropertyMeta('og:type', type);
    setPropertyMeta('og:title', normalizedTitle);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:url', canonicalUrl);
    setPropertyMeta('og:image', image);
    setPropertyMeta('og:site_name', SITE_NAME);
    setPropertyMeta('og:locale', ogLocale);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', normalizedTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);
  }, [title, description, keywords, canonical, image, type, lang, robots]);
};

export default usePageMetadata;
