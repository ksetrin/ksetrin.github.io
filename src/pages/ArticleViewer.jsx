import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import ArticlesService from '@/service/articlesService';

marked.setOptions({
    breaks: true,
    gfm: true,
    mangle: false,
    headerIds: true
});

const ArticleViewer = () => {
    const { t } = useTranslation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const articleData = await ArticlesService.getArticleBySlugOrAlias(slug);

                if (articleData) {
                    if (slug !== articleData.slug) {
                        navigate(`/articles/${articleData.slug}/`, { replace: true });
                        return;
                    }
                    setArticle(articleData);
                    setError(null);
                } else {
                    setError('Article not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchArticle();
        }
    }, [slug, navigate]);

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(new Date(dateString));
        } catch (e) {
            return dateString;
        }
    };

    const renderedArticle = useMemo(() => {
        if (!article) {
            return { html: '', toc: [] };
        }
        const slugger = new marked.Slugger();
        const toc = [];
        const renderer = new marked.Renderer();
        renderer.heading = (text, level, raw) => {
            const id = slugger.slug(raw);
            if (level >= 2 && level <= 4) {
                toc.push({ id, text, level });
            }
            return `<h${level} id="${id}">${text}</h${level}>`;
        };

        return {
            html: marked(article.content, { renderer }),
            toc
        };
    }, [article]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            <button
                onClick={handleBackClick}
                className="inline-flex items-center px-4 py-2  rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 border-none"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                </svg>
                {t('articles.backToArticles')}
            </button>

            <header className="mt-8 animate-slide-down space-y-6">
                <div className="flex items-center gap-3 mb-4">
            <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    {article.datePublished && (
                        <time dateTime={article.datePublished}>
                            {formatDate(article.datePublished)}
                        </time>
                    )}
                    {article.readTimeLabel && (
                        <>
                            <span aria-hidden="true">•</span>
                            <span>{article.readTimeLabel}</span>
                        </>
                    )}
                    {article.author && (
                        <>
                            <span aria-hidden="true">•</span>
                            <span>{article.author}</span>
                        </>
                    )}
                </div>

                <p className="text-xl text-gray-600 dark:text-gray-400">
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

            {article.tldr?.length > 0 && (
                <section className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6 space-y-3">
                    <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-200">TL;DR</h2>
                    <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                        {article.tldr.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {renderedArticle.toc.length > 0 && (
                <nav className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Содержание</h2>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        {renderedArticle.toc.map((item) => (
                            <li
                                key={item.id}
                                className="leading-relaxed"
                                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}

            <article className="max-w-none animate-slide-up prose prose-lg dark:prose-invert
prose-headings:text-gray-900 dark:prose-headings:text-gray-200
prose-p:text-gray-700 dark:prose-p:text-gray-300
prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
prose-strong:text-gray-900 dark:prose-strong:text-gray-200
prose-code:text-sm prose-code:bg-gray-800 prose-code:text-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
dark:prose-code:bg-gray-600 dark:prose-code:text-gray-100
prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
dark:prose-pre:bg-gray-600 dark:prose-pre:text-gray-100">
                <div
                    dangerouslySetInnerHTML={{
                        __html: renderedArticle.html
                    }}
                />
            </article>

            <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {article.metadata?.author && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                                {article.metadata.author}
                            </div>
                        )}
                        {article.metadata?.wordCount && (
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ArticleViewer;
