import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { marked } from 'marked';
import slugify from 'slugify';
import ArticlesService from '@/service/articlesService';
import usePageMetadata from '@/hooks/usePageMetadata';

marked.setOptions({ breaks: true, gfm: true, mangle: false, headerIds: true });

const ArticleViewer = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await ArticlesService.getArticleBySlugOrAlias(slug);
        if (data) {
          if (slug !== data.slug) {
            navigate(`/articles/${data.slug}/`, { replace: true });
            return;
          }
          setArticle(data);
          setError(null);
        } else {
          setError('not-found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchArticle();
  }, [slug, navigate]);

  const rendered = useMemo(() => {
    if (!article) return { html: '', toc: [] };
    const headingCounts = new Map();
    const makeId = (raw) => {
      const base = slugify(String(raw || '').trim(), { lower: true, strict: true }) || 'section';
      const count = headingCounts.get(base) || 0;
      headingCounts.set(base, count + 1);
      return count ? `${base}-${count}` : base;
    };
    const toc = [];
    const renderer = new marked.Renderer();
    renderer.heading = function heading(token) {
      const level = token?.depth || 1;
      const raw = token?.raw || token?.text || '';
      const id = makeId(raw);
      if (level >= 2 && level <= 4) toc.push({ id, text: token?.text || raw, level });
      const content = this.parser?.parseInline ? this.parser.parseInline(token.tokens || []) : (token?.text || raw);
      return `<h${level} id="${id}">${content}</h${level}>`;
    };
    return { html: marked(article.content, { renderer }), toc };
  }, [article]);

  usePageMetadata({
    title: article?.title || t('blog.title'),
    description: article?.description || t('blog.subtitle'),
    keywords: article?.tags || [],
    canonical: article ? `https://ksetrin.github.io/articles/${article.slug}/` : 'https://ksetrin.github.io/',
    type: article ? 'article' : 'website',
    lang: article?.lang || i18n.language,
    robots: error ? 'noindex,follow' : 'index,follow'
  });

  const formatDate = (value) => {
    if (!value) return '';
    try {
      return new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : 'ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date(value));
    } catch {
      return value;
    }
  };

  if (loading) {
    return (
      <div className="container article">
        <p className="loading">{t('blog.loading')}</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container article">
        <p className="empty">{t('article.notFound')}</p>
        <p><Link to="/" className="article__back">← {t('article.toBlog')}</Link></p>
      </div>
    );
  }

  return (
    <div className="container article">
      <Link to="/" className="article__back">← {t('article.toBlog')}</Link>

      <header className="article__head">
        <h1>{article.title}</h1>
        <div className="article__meta">
          {article.datePublished && <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>}
          {article.author && <span>· {article.author}</span>}
        </div>

      </header>

      {article.tldr?.length > 0 && (
        <section className="tldr">
          <h2>TL;DR</h2>
          <ul>
            {article.tldr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {rendered.toc.length > 0 && (
        <nav className="toc">
          <h2>{t('article.contents')}</h2>
          <ul>
            {rendered.toc.map((item) => (
              <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <article className="prose" dangerouslySetInnerHTML={{ __html: rendered.html }} />

      <footer className="article__foot">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {article.metadata?.wordCount && <span>{article.metadata.wordCount} {t('blog.words')}</span>}
          {article.tags.length > 0 && (
            <div className="tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <Link to="/" className="article__back">← {t('article.toBlog')}</Link>
      </footer>
    </div>
  );
};

export default ArticleViewer;
