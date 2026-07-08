import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ArticlesService from '@/service/articlesService';
import usePageMetadata from '@/hooks/usePageMetadata';

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  usePageMetadata({
    title: t('blog.metaTitle'),
    description: t('blog.metaDescription'),
    canonical: 'https://ksetrin.github.io/',
    lang: i18n.language
  });

  useEffect(() => {
    ArticlesService.getAllArticles()
      .then((loaded) => {
        setArticles(loaded);
        setLoading(false);
      })
      .catch((error) => {
        console.error('BlogPage getAllArticles failed', error);
        setLoading(false);
      });
  }, []);

  const allTags = useMemo(
    () => ['all', ...new Set(articles.flatMap((article) => article.tags))],
    [articles]
  );

  const filtered = useMemo(
    () =>
      selectedTag === 'all'
        ? articles
        : articles.filter((article) => article.tags.includes(selectedTag)),
    [articles, selectedTag]
  );

  const formatDate = (value) => {
    if (!value) return '';
    try {
      return new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : 'ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(value));
    } catch {
      return value;
    }
  };

  return (
    <div className="container page">
      {allTags.length > 1 && (
        <div className="tag-filter" style={{ marginTop: 0, marginBottom: '2.5rem' }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={tag === selectedTag ? 'active' : ''}
              onClick={() => setSelectedTag(tag)}
            >
              {tag === 'all' ? t('blog.allTags') : `#${tag}`}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p className="loading">{t('blog.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="empty">{t('blog.empty')}</p>
      ) : (
        <ul className="post-list">
          {filtered.map((article) => (
            <li key={article.slug} className="post-item">
              <div className="post-item__meta">
                <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
              </div>
              <h2 className="post-item__title">
                <Link to={`/articles/${article.slug}/`}>{article.title}</Link>
              </h2>
              <p className="post-item__excerpt">{article.description}</p>
              {article.tags.length > 0 && (
                <div className="tags">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogPage;
