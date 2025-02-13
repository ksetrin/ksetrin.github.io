import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import ArticlesService from '@/service/articlesService';

const parseMarkdown = (content) => {
    return content
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">$1</h1>')

        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>')

        .replace(/^\d+\.\s(.*)$/gim, '<li class="mb-2">$1</li>')
        .replace(/^[-*]\s(.*)$/gim, '<li class="mb-2">$1</li>')

        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')

        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        .split('\n\n')
        .map(paragraph => {
            if (paragraph.trim().startsWith('<h') ||
                paragraph.trim().startsWith('<pre') ||
                paragraph.trim().startsWith('<li')) {
                return paragraph;
            }
            return paragraph.trim() ? `<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">${paragraph.trim()}</p>` : '';
        })
        .join('');
};

const ArticleViewer = () => {
    const { t } = useTranslation();
    const { filename } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const articleData = await ArticlesService.getArticleWithMetadata(filename);

                if (articleData) {
                    setArticle(articleData);
                } else {
                    setError('Article not found');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        if (filename) {
            fetchArticle();
        }
    }, [filename]);

    const handleBackClick = () => {
        navigate('/articles');
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center py-12 animate-fade-in">
                    <svg className="mx-auto h-12 w-12 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{t('articles.notFound')}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {error || t('articles.articleNotExists')}
                    </p>
                    <button
                        onClick={handleBackClick}
                        className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 border-none"
                    >
                        {t('articles.backToArticles')}
                    </button>
                </div>
            </div>
        );
    }

    const getCategoryColor = (category) => {
        const colors = {
            'DevOps': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'Architecture': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Tutorial': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
        };
        return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            <button
                onClick={handleBackClick}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6 transition-all duration-200 transform hover:translate-x-1 border-none"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('articles.backToArticles')}
            </button>

            <header className="mb-8 animate-slide-down">
                <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {article.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {article.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-all duration-200 hover:scale-105"
                        >
                  #{tag}
                </span>
                    ))}
                </div>
            </header>

            <article className="prose prose-lg dark:prose-invert max-w-none animate-slide-up">
                <div
                    dangerouslySetInnerHTML={{
                        __html: parseMarkdown(article.content)
                    }}
                />
            </article>

            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {article.metadata?.author && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {article.metadata.author}
                            </div>
                        )}
                        {article.metadata?.wordCount && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {article.metadata.wordCount} {t('articles.words')}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 border-none"
                    >
                        {t('articles.otherArticles')}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ArticleViewer;
