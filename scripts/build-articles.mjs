import fs from 'fs/promises';
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
const SITE_NAME = 'Пётр Евсиков';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/photo.jpeg`;
const RSS_ITEM_LIMIT = 50;

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

const readableDate = (value, lang = 'ru') => {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const readingTimeLabel = (minutes, lang = 'ru') => {
  const safeMinutes = Math.max(1, minutes);
  return lang === 'en' ? `${safeMinutes} min read` : `${safeMinutes} мин чтения`;
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

const enhanceImages = (html) => html.replace(/<img([^>]+?)>/g, (match, attrs) => {
  const hasLoading = /loading=/.test(attrs);
  const hasAlt = /alt=/.test(attrs);
  const attrWithLoading = hasLoading ? attrs : ` loading="lazy" decoding="async"${attrs}`;
  const attrFinal = hasAlt ? attrWithLoading : `${attrWithLoading} alt=""`;
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

const renderMarkdown = (content) => {
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
    html: enhanceImages(html),
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

const getOgLocale = (lang) => {
  if (lang === 'en') return 'en_US';
  if (lang === 'ru') return 'ru_RU';
  return 'en_US';
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

const buildArticleTemplate = (article, assets, highlightStyles, navigation) => {
  const cssLinks = assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n');
  const safeTitle = escapeHtml(article.title);
  const safeDescription = escapeHtml(article.description);
  const safeCategory = escapeHtml(article.category);
  const safeAuthor = article.author ? escapeHtml(article.author) : '';
  const canonical = `${SITE_URL}/articles/${article.slug}/`;
  const ogImage = article.image || DEFAULT_OG_IMAGE;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    image: [ogImage],
    author: {
      '@type': 'Person',
      name: article.author || SITE_NAME
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    description: article.description,
    articleSection: article.category,
    keywords: article.tags.join(', '),
    wordCount: article.wordCount
  };

  const faqJsonLd = article.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answerText
          }
        }))
      }
    : null;

  const relatedSection = article.related.length
    ? `<section class="mt-12">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Похожие материалы</h2>
        <div class="grid gap-4 md:grid-cols-3">
          ${article.related
            .map((related) => `
              <a href="/articles/${related.slug}/" class="block p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                <p class="text-xs text-gray-500">${readableDate(related.datePublished, related.lang)}</p>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-2 mb-1">${escapeHtml(related.title)}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">${escapeHtml(related.description)}</p>
              </a>
            `)
            .join('')}
        </div>
      </section>`
    : '';

  const tocSection = article.toc.length
    ? `<nav class="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Содержание</h2>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          ${article.toc
            .map(
              (item) => `
            <li class="leading-relaxed" style="padding-left: ${(item.level - 2) * 12}px">
              <a href="#${item.id}" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">${escapeHtml(item.text)}</a>
            </li>`
            )
            .join('')}
        </ul>
      </nav>`
    : '';

  const prevLink = navigation.previous
    ? `<a href="/articles/${navigation.previous.slug}/" class="flex-1 text-left">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Предыдущая</p>
        <p class="text-base font-semibold text-blue-600 dark:text-blue-400">${escapeHtml(navigation.previous.title)}</p>
      </a>`
    : '';

  const nextLink = navigation.next
    ? `<a href="/articles/${navigation.next.slug}/" class="flex-1 text-right">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Следующая</p>
        <p class="text-base font-semibold text-blue-600 dark:text-blue-400">${escapeHtml(navigation.next.title)}</p>
      </a>`
    : '';

  const prevNextSection = prevLink || nextLink
    ? `<section class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row gap-6">
        ${prevLink}
        ${nextLink}
      </section>`
    : '';

  const faqSection = article.faq.length
    ? `<section class="mt-12 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-900 rounded-2xl p-8">
        <h2 class="text-3xl font-bold text-purple-900 dark:text-purple-200 mb-6">FAQ</h2>
        <div class="space-y-6">
          ${article.faq
            .map(
              (item) => `
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-purple-100 dark:border-purple-800">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">${escapeHtml(item.question)}</h3>
              <div class="prose prose-sm dark:prose-invert text-gray-700 dark:text-gray-300">
                ${item.answerHtml}
              </div>
            </div>`
            )
            .join('')}
        </div>
      </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="${article.lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${safeTitle} | ${SITE_NAME}</title>
    <meta name="description" content="${safeDescription}">
    <link rel="canonical" href="${canonical}">
    <meta name="robots" content="index,follow">
    ${cssLinks}
    <style>
      ${highlightStyles}
      body { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
    <meta property="og:type" content="article">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:locale" content="${getOgLocale(article.lang)}">
    <meta property="article:published_time" content="${article.datePublished}">
    <meta property="article:modified_time" content="${article.dateModified || article.datePublished}">
    ${article.tags.map((tag) => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n')}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDescription}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} feed" href="${SITE_URL}/feed.xml">
    <script type="application/ld+json">${JSON.stringify(blogPostingJsonLd)}</script>
    ${faqJsonLd ? `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>` : ''}
  </head>
  <body class="bg-gray-100 text-gray-900">
    <header class="bg-white/90 dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-lg font-semibold text-gray-900 dark:text-white">${SITE_NAME}</a>
        <nav class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <a href="/" class="hover:text-blue-600">Главная</a>
          <a href="/projects/" class="hover:text-blue-600">Проекты</a>
          <a href="/articles/" class="text-blue-600 font-semibold">Статьи</a>
        </nav>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-4 py-10">
      <article class="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 space-y-8">
        <div class="space-y-4">
          <p class="text-sm text-gray-500 uppercase tracking-wide">${safeCategory}</p>
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white">${safeTitle}</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">${safeDescription}</p>
          <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time datetime="${article.datePublished}">${readableDate(article.datePublished, article.lang)}</time>
            <span aria-hidden="true">•</span>
            <span>${article.readingTimeLabel}</span>
            ${safeAuthor ? `<span aria-hidden="true">•</span><span>${safeAuthor}</span>` : ''}
          </div>
          <div class="flex flex-wrap gap-2">
            ${article.tags
              .map((tag) => `<span class="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">#${escapeHtml(tag)}</span>`)
              .join('')}
          </div>
        </div>
        ${article.tldr.length
          ? `<section class="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900 rounded-2xl p-6 space-y-3">
              <h2 class="text-2xl font-semibold text-blue-900 dark:text-blue-200">TL;DR</h2>
              <ul class="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
                ${article.tldr.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
              </ul>
            </section>`
          : ''}
        ${tocSection}
        <div class="prose prose-lg dark:prose-invert max-w-none">
          ${article.html}
        </div>
        ${faqSection}
        ${relatedSection}
        ${prevNextSection}
      </article>
    </main>
    <footer class="text-center py-6 text-sm text-gray-500">
      © ${new Date().getFullYear()} ${SITE_NAME}. Все права защищены.
    </footer>
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

const buildArticlesIndex = (articles, assets, highlightStyles) => {
  const cssLinks = assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n');
  const listItems = articles
    .map(
      (article) => `
    <a href="/articles/${article.slug}/" class="block p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex flex-col gap-3">
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span>${escapeHtml(article.category)}</span>
        <div class="flex items-center gap-2">
          <time datetime="${article.datePublished}">${readableDate(article.datePublished, article.lang)}</time>
          <span aria-hidden="true">•</span>
          <span>${article.readingTimeLabel}</span>
        </div>
      </div>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">${escapeHtml(article.title)}</h2>
      <p class="text-sm text-gray-600 dark:text-gray-300 flex-1">${escapeHtml(article.description)}</p>
      <div class="flex flex-wrap gap-2 text-xs text-gray-500">
        ${article.tags.slice(0, 4).map((tag) => `<span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">#${escapeHtml(tag)}</span>`).join('')}
      </div>
    </a>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Статьи | ${SITE_NAME}</title>
    <meta name="description" content="Архив статей от ${SITE_NAME}: React Native, DevOps и архитектура.">
    <link rel="canonical" href="${SITE_URL}/articles/">
    ${cssLinks}
    <style>${highlightStyles}</style>
    <link rel="alternate" type="application/rss+xml" title="${SITE_NAME} feed" href="${SITE_URL}/feed.xml">
  </head>
  <body class="bg-gray-100 text-gray-900">
    <header class="bg-white/90 dark:bg-gray-900/90 border-b border-gray-100 dark:border-gray-800">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" class="text-lg font-semibold text-gray-900 dark:text-white">${SITE_NAME}</a>
        <nav class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <a href="/" class="hover:text-blue-600">Главная</a>
          <a href="/projects/" class="hover:text-blue-600">Проекты</a>
          <a href="/articles/" class="text-blue-600 font-semibold">Статьи</a>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <div class="space-y-2">
        <p class="text-sm text-gray-500 uppercase tracking-wide">Блог</p>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">Архив статей</h1>
        <p class="text-gray-600 dark:text-gray-300">Публикации о React Native, архитектуре и DevOps.</p>
      </div>
      <div class="grid gap-6">
        ${listItems}
      </div>
    </main>
    <footer class="text-center py-6 text-sm text-gray-500">
      © ${new Date().getFullYear()} ${SITE_NAME}.
    </footer>
  </body>
</html>`;
};

const generateSitemap = async (articles) => {
  const latestArticleDate = articles[0]?.dateModified || articles[0]?.datePublished || '2024-01-01';
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: latestArticleDate },
    { loc: `${SITE_URL}/articles/`, lastmod: latestArticleDate },
    ...articles.map((article) => ({
      loc: `${SITE_URL}/articles/${article.slug}/`,
      lastmod: article.dateModified || article.datePublished
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
    const { html, toc } = renderMarkdown(content);
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
      aliases
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
  const [articles, assets, highlightStyles] = await Promise.all([
    loadArticles(),
    readManifestAssets(),
    loadHighlightStyles()
  ]);

  if (!articles.length) {
    console.warn('No articles found for static generation.');
    return;
  }

  await cleanDir(ARTICLES_DIST);

  for (const article of articles) {
    const html = buildArticleTemplate(article, assets, highlightStyles, article.navigation);
    const outDir = path.join(ARTICLES_DIST, article.slug);
    await ensureDir(outDir);
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

  const indexHtml = buildArticlesIndex(articles, assets, highlightStyles);
  await fs.writeFile(path.join(ARTICLES_DIST, 'index.html'), indexHtml, 'utf-8');

  await generateSitemap(articles);
  await generateRobots();
  await generateFeed(articles);

  console.log(`Generated ${articles.length} static article pages, sitemap, robots, and feed.`);
};

run().catch((error) => {
  console.error('Failed to build static articles', error);
  process.exit(1);
});
