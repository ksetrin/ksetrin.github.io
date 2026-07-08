import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import slugify from 'slugify';
import hljs from 'highlight.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'articles');
const DIST_DIR = path.join(ROOT, 'dist');
const ARTICLES_DIST = path.join(DIST_DIR, 'articles');
const SITE_URL = 'https://ksetrin.github.io';
const STATIC_ROUTES = [
  '/',
  '/projects/',
  '/projects/mebix/',
  '/projects/tapcar/',
  '/projects/znaj/',
  '/projects/carmix/',
  '/projects/chelyabinskgorgaz/',
  '/projects/preco/',
  '/about/'
];
const SITE_NAME = 'Пётр Евсиков';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/photo.jpeg`;
const RSS_ITEM_LIMIT = 50;
const DEFAULT_LANG = 'ru';

const loadLocale = (relativePath) => {
  const fullPath = path.join(ROOT, relativePath);
  const raw = fsSync.readFileSync(fullPath, 'utf-8');
  return JSON.parse(raw);
};

const enLocale = loadLocale('src/locales/en.json');
const ruLocale = loadLocale('src/locales/ru.json');

const ROOT_TRANSLATIONS = {
  en: enLocale,
  ru: ruLocale
};
const SEO_TRANSLATIONS = {
  en: enLocale.seo || {},
  ru: ruLocale.seo || {}
};
const ARTICLES_TRANSLATIONS = {
  en: enLocale.articles || {},
  ru: ruLocale.articles || {}
};

const getFromTree = (tree, lang, path, fallbackLang = DEFAULT_LANG) => {
  const value = path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), tree[lang]);
  if (value !== undefined) return value;
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), tree[fallbackLang]);
};

const interpolate = (template, params = {}) => {
  if (typeof template !== 'string') return template;
  return Object.entries(params).reduce(
    (acc, [key, val]) => acc.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), val),
    template
  );
};

const getSeoString = (lang, path, fallbackLang = DEFAULT_LANG) => {
  const raw = getFromTree(SEO_TRANSLATIONS, lang, path, fallbackLang);
  return typeof raw === 'string' ? raw : '';
};

const getSeoArray = (lang, path, fallbackLang = DEFAULT_LANG) => {
  const raw = getFromTree(SEO_TRANSLATIONS, lang, path, fallbackLang);
  return Array.isArray(raw) ? raw : [];
};

const getArticlesString = (lang, path, fallbackLang = DEFAULT_LANG) => {
  const raw = getFromTree(ARTICLES_TRANSLATIONS, lang, path, fallbackLang);
  return typeof raw === 'string' ? raw : '';
};

const getGeneralString = (lang, path, fallbackLang = DEFAULT_LANG) => {
  const raw = getFromTree(ROOT_TRANSLATIONS, lang, path, fallbackLang);
  return typeof raw === 'string' ? raw : '';
};

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

const ensureDir = (dirPath) => fs.mkdir(dirPath, { recursive: true });

const cleanDir = async (dirPath) => {
  await fs.rm(dirPath, { recursive: true, force: true });
  await ensureDir(dirPath);
};

const slugifyHeading = (text) => {
  const normalized = typeof text === 'string' ? text : (text ?? '').toString();
  const trimmed = normalized.trim();
  if (!trimmed) {
    return `section-${Date.now()}`;
  }
  return slugify(trimmed, { lower: true, strict: true }) || `section-${Date.now()}`;
};

const toIsoDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().split('T')[0];
};

const localeMap = { en: 'en-US', ru: 'ru-RU' };
const readableDate = (value, lang = DEFAULT_LANG) => {
  if (!value) return '';
  try {
    const locale = localeMap[lang] || localeMap[DEFAULT_LANG];
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const readingTimeLabel = (minutes, lang = DEFAULT_LANG) => {
  const safeMinutes = Math.max(1, minutes);
  const template = getGeneralString(lang, ['blog', 'readTime']) || getGeneralString(DEFAULT_LANG, ['blog', 'readTime']) || '{{count}} min';
  return template.replace('{{count}}', safeMinutes);
};

const trimDescription = (text) => {
  if (!text) return '';
  const clean = text
    .replace(/[#>*`]/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.length > 210 ? `${clean.slice(0, 207)}…` : clean;
};

const deriveTldr = (content, provided) => {
  if (Array.isArray(provided) && provided.length) {
    return provided;
  }
  const sentences = content
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);
  return sentences.map((sentence) => sentence.replace(/[*_#>-]/g, '')).filter(Boolean);
};

const enhanceImages = (html, lang = DEFAULT_LANG) => html.replace(/<img([^>]+?)>/g, (match, attrs) => {
  const hasLoading = /loading=/.test(attrs);
  const hasAlt = /alt=/.test(attrs);
  const attrWithLoading = hasLoading ? attrs : ` loading="lazy" decoding="async"${attrs}`;
  const fallbackAlt = getSeoString(lang, ['articles', 'fallbackAlt']) || getSeoString(DEFAULT_LANG, ['articles', 'fallbackAlt']);
  const safeAlt = escapeHtml(fallbackAlt || 'Article illustration');
  const attrFinal = hasAlt ? attrWithLoading : `${attrWithLoading} alt="${safeAlt}"`;
  return `<img${attrFinal}>`;
});

const extractFaq = (markdown) => {
  const faqHeading = markdown.match(/(^|\n)##\s+faq\s*(\n|$)/i);
  if (!faqHeading) return [];

  const startIndex = faqHeading.index + faqHeading[0].length;
  const rest = markdown.slice(startIndex);
  const nextSectionIndex = rest.search(/\n##\s+/);
  const faqBlock = nextSectionIndex === -1 ? rest : rest.slice(0, nextSectionIndex);
  const entries = faqBlock.split(/\n###\s+/).slice(1);

  return entries
    .map((entry) => {
      const [questionLine, ...answerLines] = entry.split('\n');
      const question = questionLine?.trim();
      const answerMarkdown = answerLines.join('\n').trim();
      const answerText = answerMarkdown.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
      return question && answerText
        ? {
            question,
            answerHtml: marked.parse(answerMarkdown),
            answerText
          }
        : null;
    })
    .filter(Boolean);
};

const renderMarkdown = (content, lang = 'ru') => {
  const toc = [];
  const headingCounts = new Map();

  const getHeadingId = (raw) => {
    const base = slugifyHeading(raw);
    const count = headingCounts.get(base) || 0;
    headingCounts.set(base, count + 1);
    return count ? `${base}-${count}` : base;
  };

  const renderer = new marked.Renderer();

  renderer.heading = function({ text, depth, raw }) {
    const id = getHeadingId(raw);
    if (depth >= 2 && depth <= 4) {
      toc.push({ id, text, level: depth });
    }
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  const html = marked.parse(content, { renderer });
  return {
    html: enhanceImages(html, lang),
    toc
  };
};

const readManifestAssets = async () => {
  const manifestPath = path.join(DIST_DIR, 'manifest.json');
  let manifestRaw;
  try {
    manifestRaw = await fs.readFile(manifestPath, 'utf-8');
  } catch (error) {
    throw new Error(`Cannot read build manifest at ${manifestPath}. Make sure you ran "vite build" before postbuild.`);
  }

  const manifest = JSON.parse(manifestRaw);
  const entry = manifest['src/main.jsx'] || Object.values(manifest).find((item) => item.isEntry);

  if (!entry) {
    return { css: [], js: [] };
  }

  const css = (entry.css || []).map((file) => `/${file}`);
  const js = entry.file ? [`/${entry.file}`] : [];
  return { css, js };
};

const loadHighlightStyles = async () => {
  const cssPath = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github-dark.css');
  try {
    return await fs.readFile(cssPath, 'utf-8');
  } catch {
    return '';
  }
};

const loadAppShell = async () => {
  const indexPath = path.join(DIST_DIR, 'index.html');
  try {
    return await fs.readFile(indexPath, 'utf-8');
  } catch (error) {
    throw new Error(`Cannot read built app shell at ${indexPath}. Make sure "vite build" ran successfully.`);
  }
};

const getOgLocale = (lang) => {
  const locales = { en: 'en_US', ru: 'ru_RU' };
  return locales[lang] || locales.ru;
};

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const replaceTitle = (html, newTitle) =>
  html.replace(/<title>.*?<\/title>/i, `<title>${newTitle}</title>`);

const injectIntoHead = (html, addition) =>
  html.replace('</head>', `${addition}\n</head>`);

const setHtmlLang = (html, lang) =>
  html.replace(/<html([^>]*?)lang=".*?"/i, `<html$1lang="${lang}"`);

const injectNoscript = (html, fallbackBody) =>
  html.replace('</body>', `<noscript>${fallbackBody}</noscript>\n</body>`);

const extractBody = (html) => {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1].trim() : '';
};

const navHtml = (lang, current) => {
  const items = [
    { href: '/', label: getGeneralString(lang, ['header', 'blog']) || 'Blog', id: 'blog' },
    { href: '/projects/', label: getGeneralString(lang, ['header', 'projects']) || 'Projects', id: 'projects' },
    { href: '/about/', label: getGeneralString(lang, ['header', 'about']) || 'About', id: 'about' }
  ];
  const brand = getGeneralString(lang, ['header', 'brand']) || SITE_NAME;
  const links = items
    .map((item) => `<a href="${item.href}"${item.id === current ? ' class="active"' : ''}>${escapeHtml(item.label)}</a>`)
    .join('\n          ');
  return `<header class="site-header">
      <div class="site-header__inner">
        <a href="/" class="brand">${escapeHtml(brand)}</a>
        <nav class="site-nav">
          ${links}
        </nav>
      </div>
    </header>`;
};

const footerHtml = () =>
  `<footer class="site-footer">
      <div class="site-footer__inner"><span>© ${new Date().getFullYear()} ${SITE_NAME}</span></div>
    </footer>`;

const buildArticleTemplate = (article, assets, highlightStyles) => {
  const lang = article.lang || DEFAULT_LANG;
  const cssLinks = assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n');
  const safeTitle = escapeHtml(article.title);
  const safeDescription = escapeHtml(article.description);
  const safeCategory = escapeHtml(article.category);
  const safeAuthor = article.author ? escapeHtml(article.author) : '';
  const canonical = `${SITE_URL}/articles/${article.slug}/`;
  const ogImage = article.image || DEFAULT_OG_IMAGE;
  const backLabel = getGeneralString(lang, ['article', 'toBlog']) || 'Blog';
  const contentsLabel = getGeneralString(lang, ['article', 'contents']) || 'Contents';

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: [ogImage],
    author: { '@type': 'Person', name: article.author || SITE_NAME },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    description: article.description,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    wordCount: article.wordCount
  };

  const tldrSection = article.tldr.length
    ? `<section class="tldr">
          <h2>TL;DR</h2>
          <ul>${article.tldr.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </section>`
    : '';

  const tocSection = article.toc.length
    ? `<nav class="toc">
          <h2>${escapeHtml(contentsLabel)}</h2>
          <ul>${article.toc
            .map((item) => `<li style="padding-left:${(item.level - 2) * 12}px"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`)
            .join('')}</ul>
        </nav>`
    : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${safeTitle} | ${SITE_NAME}</title>
    <meta name="description" content="${safeDescription}">
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="index,follow">
    ${cssLinks}
    <style>${highlightStyles}</style>
    <meta property="og:type" content="article">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:locale" content="${getOgLocale(lang)}">
    <meta property="article:published_time" content="${article.datePublished}">
    <meta property="article:modified_time" content="${article.dateModified || article.datePublished}">
    ${article.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n')}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} feed" href="${SITE_URL}/feed.xml">
    <script type="application/ld+json">${JSON.stringify(blogPostingJsonLd)}</script>
  </head>
  <body>
    ${navHtml(lang, 'blog')}
    <main>
      <div class="container article">
        <a href="/" class="article__back">← ${escapeHtml(backLabel)}</a>
        <header class="article__head">
          <h1>${safeTitle}</h1>
          <div class="article__meta">
            <time datetime="${article.datePublished}">${readableDate(article.datePublished, lang)}</time>
            ${safeAuthor ? `<span>· ${safeAuthor}</span>` : ''}
          </div>
        </header>
        ${tldrSection}
        ${tocSection}
        <article class="prose">${article.html}</article>
        <footer class="article__foot">
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span>${article.wordCount} ${getGeneralString(lang, ['blog', 'words']) || 'слов'}</span>
            ${article.tags.length > 0 ? `<div class="tags">${article.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
          </div>
          <a href="/" class="article__back">← ${escapeHtml(backLabel)}</a>
        </footer>
      </div>
    </main>
    ${footerHtml()}
  </body>
</html>`;
};

const buildAliasTemplate = (alias, article) => {
  const canonical = `${SITE_URL}/articles/${article.slug}/`;
  return `<!DOCTYPE html>
<html lang="${article.lang}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=${canonical}">
    <meta name="robots" content="noindex,follow">
    <link rel="canonical" href="${canonical}">
    <title>${escapeHtml(article.title)} | ${SITE_NAME}</title>
    <script>
      window.location.href = "${canonical}";
    </script>
  </head>
  <body>
    <p>Перенаправляем на обновлённую версию статьи. Если перенаправление не произошло автоматически, пройдите по <a href="${canonical}">ссылке</a>.</p>
  </body>
</html>`;
};

const buildArticlesIndex = (articles, assets, highlightStyles, lang = DEFAULT_LANG, meta = {}) => {
  const cssLinks = assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n');
  const eyebrow = getGeneralString(lang, ['blog', 'eyebrow']) || '';
  const headingTitle = getGeneralString(lang, ['blog', 'title']) || 'Blog';
  const headingSubtitle = getGeneralString(lang, ['blog', 'subtitle']) || '';
  const listItems = articles
    .map(
      (article) => `
        <li class="post-item">
          <div class="post-item__meta">
            <time datetime="${article.datePublished}">${readableDate(article.datePublished, article.lang)}</time>
          </div>
          <h2 class="post-item__title"><a href="/articles/${article.slug}/">${escapeHtml(article.title)}</a></h2>
          <p class="post-item__excerpt">${escapeHtml(article.description)}</p>
          <div class="tags">${article.tags.slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
        </li>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(meta.title || headingTitle)}</title>
    <meta name="description" content="${escapeHtml(meta.description || headingSubtitle)}">
    ${meta.keywords ? `<meta name="keywords" content="${escapeHtml(meta.keywords)}">` : ''}
    ${meta.canonical ? `<link rel="canonical" href="${meta.canonical}">` : ''}
    ${cssLinks}
    <style>${highlightStyles}</style>
    <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} feed" href="${SITE_URL}/feed.xml">
  </head>
  <body>
    ${navHtml(lang, 'blog')}
    <main>
      <div class="container page">
        <div class="page-head">
          ${eyebrow ? `<p class="eyebrow">${escapeHtml(eyebrow)}</p>` : ''}
          <h1>${escapeHtml(headingTitle)}</h1>
          <p>${escapeHtml(headingSubtitle)}</p>
        </div>
        <ul class="post-list">
        ${listItems}
        </ul>
      </div>
    </main>
    ${footerHtml()}
  </body>
</html>`;
};

const generateSitemap = async (articles) => {
  const normalizePath = (route) => route.startsWith('/') ? route : `/${route}`;
  const latestArticleDate = articles[0]?.dateModified || articles[0]?.datePublished;
  const today = new Date().toISOString().split('T')[0];
  const staticLastmod = latestArticleDate || today;

  const urls = [
    ...STATIC_ROUTES.map((route) => ({
      loc: `${SITE_URL}${normalizePath(route)}`,
      lastmod: staticLastmod
    })),
    ...articles.map((article) => ({
      loc: `${SITE_URL}/articles/${article.slug}/`,
      lastmod: article.dateModified || article.datePublished || staticLastmod
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `<url>
  <loc>${entry.loc}</loc>
  <lastmod>${entry.lastmod}</lastmod>
</url>`
  )
  .join('\n')}
</urlset>`;

  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
};

const generateRobots = async () => {
  const robots = `User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /
Disallow: /scripts/
Disallow: /node_modules/

Sitemap: ${SITE_URL}/sitemap.xml
`;
  await fs.writeFile(path.join(DIST_DIR, 'robots.txt'), robots, 'utf-8');
};

const generateFeed = async (articles) => {
  const latestArticles = articles.slice(0, RSS_ITEM_LIMIT);
  const items = latestArticles
    .map(
      (article) => `
  <entry>
    <id>${SITE_URL}/articles/${article.slug}/</id>
    <title>${escapeXml(article.title)}</title>
    <link href="${SITE_URL}/articles/${article.slug}/"/>
    <updated>${new Date(article.dateModified || article.datePublished).toISOString()}</updated>
    <summary>${escapeXml(article.description)}</summary>
    <author>
      <name>${escapeXml(article.author || SITE_NAME)}</name>
    </author>
    <content type="html"><![CDATA[${article.html}]]></content>
  </entry>`
    )
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME} — статьи</title>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}/"/>
  <id>${SITE_URL}/</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${SITE_NAME}</name>
  </author>
  ${items}
</feed>`;

  await fs.writeFile(path.join(DIST_DIR, 'feed.xml'), feed, 'utf-8');
};

const computeRelated = (article, allArticles) => {
  const tagsSet = new Set(article.tags);
  return allArticles
    .filter((other) => other.slug !== article.slug)
    .map((candidate) => {
      const overlap = candidate.tags.filter((tag) => tagsSet.has(tag)).length;
      return { candidate, score: overlap };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.candidate.datePublished) - new Date(a.candidate.datePublished);
    })
    .slice(0, 3)
    .map(({ candidate }) => candidate);
};

const loadArticles = async () => {
  const entries = await fs.readdir(ARTICLES_DIR, { withFileTypes: true });
  const markdownFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.md'));
  const articles = [];

  for (const file of markdownFiles) {
    const filepath = path.join(ARTICLES_DIR, file.name);
    const raw = await fs.readFile(filepath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = (data.slug || file.name.replace(/\.md$/, '')).trim();
    const lang = data.lang || 'ru';
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const description = trimDescription(data.description || content);
    const providedTldr = Array.isArray(data.tldr) ? data.tldr : data.tldr ? [data.tldr] : [];
    const providedAliases = Array.isArray(data.aliases) ? data.aliases : data.aliases ? [data.aliases] : [];
    const tldr = deriveTldr(content, providedTldr);
    const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
    const aliases = Array.from(
      new Set(
        providedAliases
          .map((alias) => alias && alias.toString().trim())
          .filter(Boolean)
          .map((alias) => alias.replace(/^\/+|\/+$/g, ''))
      )
    ).filter((alias) => alias !== slug);
    const datePublished = toIsoDate(data.datePublished) || new Date().toISOString().split('T')[0];
    const dateModified = toIsoDate(data.dateModified) || datePublished;
    const { html, toc } = renderMarkdown(content, lang);
    const faq = extractFaq(content);

    articles.push({
      slug,
      lang,
      title: data.title || slug,
      category: data.category || 'Article',
      description,
      tags,
      datePublished,
      dateModified,
      author: data.author || SITE_NAME,
      tldr,
      readingTimeMinutes,
      readingTimeLabel: readingTimeLabel(readingTimeMinutes, lang),
      html,
      toc,
      faq,
      wordCount,
      image: data.image,
      content,
      aliases,
      hideDescription: data.hideDescription === true || data.hideDescription === 'true'
    });
  }

  const sorted = articles.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
  return sorted.map((article, index, arr) => {
    const previous = arr[index + 1] || null;
    const next = arr[index - 1] || null;
    const related = computeRelated(article, arr);
    return {
      ...article,
      related,
      navigation: { previous, next }
    };
  });
};

const run = async () => {
  const [articles, assets, highlightStyles, appShell] = await Promise.all([
    loadArticles(),
    readManifestAssets(),
    loadHighlightStyles(),
    loadAppShell()
  ]);

  await fs.writeFile(path.join(DIST_DIR, '404.html'), appShell, 'utf-8');
  await generateRobots();

  if (!articles.length) {
    await generateSitemap([]);
    console.warn('No articles found. Wrote 404.html, sitemap, robots.');
    return;
  }

  await cleanDir(ARTICLES_DIST);

  const articlesIndexMeta = {
    title: interpolate(getSeoString(DEFAULT_LANG, ['articles', 'indexTitle']) || `Статьи | ${SITE_NAME}`, { site: SITE_NAME }),
    description: interpolate(getSeoString(DEFAULT_LANG, ['articles', 'indexDescription']) || '', { site: SITE_NAME }),
    canonical: `${SITE_URL}/articles/`,
    lang: DEFAULT_LANG,
    robots: 'index,follow',
    image: DEFAULT_OG_IMAGE,
    keywords: getSeoArray(DEFAULT_LANG, ['articles', 'indexKeywords'])
  };
  const articlesIndexHtml = buildArticlesIndex(
    articles,
    assets,
    highlightStyles,
    DEFAULT_LANG,
    {
      ...articlesIndexMeta,
      keywords: Array.isArray(articlesIndexMeta.keywords) ? articlesIndexMeta.keywords.join(', ') : articlesIndexMeta.keywords
    }
  );
  const articlesIndexFallback = extractBody(articlesIndexHtml);

  const buildHeadMeta = ({ title, description, canonical, robots, image, lang, keywords }) => {
    const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : (keywords || '');
    const tags = [
      `<meta name="description" content="${escapeHtml(description || '')}">`,
      keywordsContent ? `<meta name="keywords" content="${escapeHtml(keywordsContent)}">` : '',
      canonical ? `<link rel="canonical" href="${canonical}">` : '',
      `<meta name="robots" content="${robots || 'index,follow'}">`,
      `<meta property="og:type" content="article">`,
      `<meta property="og:title" content="${escapeHtml(title || SITE_NAME)}">`,
      `<meta property="og:description" content="${escapeHtml(description || '')}">`,
      canonical ? `<meta property="og:url" content="${canonical}">` : '',
      `<meta property="og:image" content="${image || DEFAULT_OG_IMAGE}">`,
      `<meta property="og:site_name" content="${SITE_NAME}">`,
      `<meta property="og:locale" content="${getOgLocale(lang)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${escapeHtml(title || SITE_NAME)}">`,
      `<meta name="twitter:description" content="${escapeHtml(description || '')}">`,
      `<meta name="twitter:image" content="${image || DEFAULT_OG_IMAGE}">`
    ]
      .filter(Boolean)
      .join('\n');
    return tags;
  };

  for (const article of articles) {
    const outDir = path.join(ARTICLES_DIST, article.slug);
    await ensureDir(outDir);
    const staticArticleHtml = buildArticleTemplate(article, assets, highlightStyles, article.navigation || {});
    const fallbackBody = extractBody(staticArticleHtml);
    const metaTags = buildHeadMeta({
      title: `${article.title} | ${SITE_NAME}`,
      description: article.description,
      canonical: `${SITE_URL}/articles/${article.slug}/`,
      robots: 'index,follow',
      image: article.image || DEFAULT_OG_IMAGE,
      lang: article.lang,
      keywords: article.tags.join(', ')
    });
    const articleShellWithLang = setHtmlLang(appShell, article.lang || 'ru');
    const articleShellWithTitle = replaceTitle(articleShellWithLang, `${article.title} | ${SITE_NAME}`);
    const articleShellWithMeta = injectIntoHead(articleShellWithTitle, metaTags);
    const html = injectNoscript(articleShellWithMeta, fallbackBody);
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8');

    if (article.aliases?.length) {
      for (const alias of article.aliases) {
        if (!alias || alias === article.slug) continue;
        const aliasDir = path.join(ARTICLES_DIST, alias);
        await ensureDir(aliasDir);
        const aliasHtml = buildAliasTemplate(alias, article);
        await fs.writeFile(path.join(aliasDir, 'index.html'), aliasHtml, 'utf-8');
      }
    }
  }

  const indexHeadTags = buildHeadMeta({
    title: articlesIndexMeta.title,
    description: articlesIndexMeta.description,
    canonical: articlesIndexMeta.canonical,
    robots: articlesIndexMeta.robots,
    image: articlesIndexMeta.image,
    lang: articlesIndexMeta.lang,
    keywords: articlesIndexMeta.keywords
  });
  const indexShellWithLang = setHtmlLang(appShell, articlesIndexMeta.lang || DEFAULT_LANG);
  const indexShellWithTitle = replaceTitle(indexShellWithLang, articlesIndexMeta.title);
  const indexShellWithMeta = injectIntoHead(indexShellWithTitle, indexHeadTags);
  const indexHtml = injectNoscript(indexShellWithMeta, articlesIndexFallback);
  await fs.writeFile(path.join(ARTICLES_DIST, 'index.html'), indexHtml, 'utf-8');
  await fs.writeFile(path.join(DIST_DIR, '404.html'), appShell, 'utf-8');

  await generateSitemap(articles);
  await generateRobots();
  await generateFeed(articles);

  console.log(`Built static HTML for ${articles.length} articles, sitemap, robots, feed, and fallback.`);
};

run().catch((error) => {
  console.error('Failed to build static articles', error);
  process.exit(1);
});
