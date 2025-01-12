import React from 'react';
import { useTranslation } from 'react-i18next';

const ArticlesPage = () => {
  const { t } = useTranslation();
  
  const articles = [
    {
      title: 'Understanding React Hooks',
      description: 'A deep dive into React Hooks and how to use them effectively.',
      link: '#',
      date: '2025-07-28',
      readTime: '5 min',
    },
    {
      title: 'State Management in React',
      description: 'Comparing Redux, MobX, and Context API for state management.',
      link: '#',
      date: '2025-07-15',
      readTime: '8 min',
    },
    {
      title: 'Optimizing React Performance',
      description: 'Tips and tricks to make your React apps faster.',
      link: '#',
      date: '2025-07-01',
      readTime: '6 min',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t('articles.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t('articles.subtitle')}
        </p>
      </div>
      <div className="grid gap-8">
        {articles.map((article, index) => (
          <article 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:translate-y-[-4px]"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <time dateTime={article.date}>{article.date}</time>
                <span className="mx-2">•</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {article.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.description}
              </p>
              <a
                href={article.link}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                {t('articles.readMore')}
                <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
