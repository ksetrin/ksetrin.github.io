import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ArticlesService from '@/service/articlesService';

const ArticlesPage = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    ArticlesService.getAllArticles().then((loadedArticles) => {
      setArticles(loadedArticles)
      setLoading(false);
    }).catch((e) => {
      console.log('ERROR ArticlesService.getAllArticles FAILED', e)
    });
  }, []);

  const allTags = useMemo(() => (
      ['all', ...new Set(articles.flatMap(article => article.tags))]
  ), [articles]);

  const filteredArticles = useMemo(() => {
    const byTag = selectedTag === 'all'
        ? articles
        : articles.filter(article => article.tags.includes(selectedTag));

    if (!search.trim()) {
      return byTag;
    }

    const searchLower = search.trim().toLowerCase();
    return byTag.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [articles, selectedTag, search]);

  const getCategoryColor = (category) => {
    const colors = {
      'DevOps': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Architecture': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Tutorial': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Coding': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Career': 'bg-amber-50 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
      'Mobile': 'bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getTagColor = (tag) => {
    const colors = {
      'react-native': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'android': 'bg-green-50 text-green-700 border-green-200',
      'ios': 'bg-blue-50 text-blue-700 border-blue-200',
      'ci-cd': 'bg-orange-50 text-orange-700 border-orange-200',
      'github-actions': 'bg-gray-50 text-gray-700 border-gray-200',
      'fastlane': 'bg-red-50 text-red-700 border-red-200',
      'architecture': 'bg-purple-50 text-purple-700 border-purple-200',
      'best-practices': 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return colors[tag] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date(dateString));
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 animate-slide-down">
            {t('articles.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 animate-slide-up">
            {t('articles.subtitle')}
          </p>
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full pl-4 pr-1 py-1 shadow border border-gray-100 dark:border-gray-700">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('articles.searchPlaceholder')}
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-200 placeholder-gray-400 text-sm"
            />
            {search && (
                <button
                    className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 border-none"
                    onClick={() => setSearch('')}
                >
                  {t('articles.clear')}
                </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map((tag, index) => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 border-none ${
                        selectedTag === tag
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 hover:shadow-md'
                    }`}
                >
                  {tag === 'all' ? t('articles.allTags') : tag}
                </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
              <Link
                  key={article.slug}
                  to={`/articles/${article.slug}/`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <article className="h-full p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium transition-colors duration-200 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                      <span aria-hidden="true">•</span>
                      <span>{article.readTimeLabel}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h2>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 flex-1">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border transition-all duration-200 ${getTagColor(tag)}`}
                        >
                          #{tag}
                        </span>
                    ))}
                    {article.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-gray-500 border border-gray-200 transition-all duration-200">
                          +{article.tags.length - 3}
                        </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{article.lang?.toUpperCase()}</span>
                    <span className="inline-flex items-center font-medium transition-transform duration-200 group-hover:translate-x-1">
                      {t('articles.readMore')}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{t('articles.noArticles')}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('articles.tryOtherTag')}</p>
            </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('articles.totalArticles')}: <span className="font-medium">{articles.length}</span>
          </p>
        </div>
      </div>
  );
};

export default ArticlesPage;
