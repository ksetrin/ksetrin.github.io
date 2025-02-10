import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ArticlesService from '@/service/articlesService';

const ArticlesPage = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    ArticlesService.getAllArticles().then((loadedArticles) => {
      setArticles(loadedArticles)
      setLoading(false);
    }).catch((e) => {
      console.log('ERROR ArticlesService.getAllArticles FAILED', e)
    });
  }, []);

  const allTags = ['all', ...new Set(articles.flatMap(article => article.tags))];

  const filteredArticles = selectedTag === 'all'
      ? articles
      : articles.filter(article => article.tags.includes(selectedTag));

  const getCategoryColor = (category) => {
    const colors = {
      'DevOps': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Architecture': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Tutorial': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
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

  if (loading) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {t('articles.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {t('articles.subtitle')}
          </p>

          {/* Tags Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedTag === tag
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                >
                  {tag === 'all' ? 'Все' : tag}
                </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
              <article
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                        <span
                            key={tag}
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${getTagColor(tag)}`}
                        >
                    {tag}
                  </span>
                    ))}
                    {article.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-gray-500 border border-gray-200">
                    +{article.tags.length - 3}
                  </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                      {article.lastModified}
                    </time>
                    <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                      {t('articles.readMore')}
                      <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Статьи не найдены</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Попробуйте выбрать другой тег.</p>
            </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Всего статей: <span className="font-medium">{articles.length}</span>
          </p>
        </div>
      </div>
  );
};

export default ArticlesPage;
