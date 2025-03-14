import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticlesService from '@/service/articlesService';

const FeaturedArticles = () => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    ArticlesService.getAllArticles()
      .then((all) => setArticles(all.slice(0, 3)))
      .catch((error) => {
        console.error('Failed to load featured articles', error);
      });
  }, []);

  if (!articles.length) {
    return null;
  }

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

  const formatReadTime = (minutes) => {
    if (!minutes) return '';
    const safeMinutes = Math.max(1, minutes);
    return i18n.language === 'en' ? `${safeMinutes} min read` : `${safeMinutes} мин чтения`;
  };

  return (
      <section className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('homepage.featuredArticles.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t('homepage.featuredArticles.subtitle')}</p>
          </div>
          <Link
              to="/articles"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            {t('homepage.featuredArticles.cta')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((article) => (
              <Link
                  key={article.slug}
                  to={`/articles/${article.slug}/`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                  <span>{formatDate(article.datePublished)}</span>
                  {article.readTimeMinutes && (
                      <>
                        <span aria-hidden="true">•</span>
                        <span>{formatReadTime(article.readTimeMinutes)}</span>
                      </>
                  )}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                      <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      >
                        #{tag}
                      </span>
                  ))}
                </div>
              </Link>
          ))}
        </div>
      </section>
  );
};

export default FeaturedArticles;
