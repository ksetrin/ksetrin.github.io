import React, { useState, useEffect } from 'react';

// Простой markdown парсер для основных элементов
const parseMarkdown = (content) => {
  return content
      // Заголовки
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8">$1</h1>')

      // Код блоки
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>')

      // Списки
      .replace(/^\d+\.\s(.*)$/gim, '<li class="mb-2">$1</li>')
      .replace(/^[-*]\s(.*)$/gim, '<li class="mb-2">$1</li>')

      // Ссылки
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')

      // Жирный текст
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

      // Курсив
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Параграфы
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

const ArticleViewer = ({ filename = 'github_actions_android.md', onBack }) => {

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        // Здесь должен быть вызов ArticlesService
        // const article = await ArticlesService.getArticleWithMetadata(filename);

        // Временная заглушка
        const mockArticle = {
          filename: 'github_actions_android.md',
          title: 'GitHub Actions для Android React Native',
          description: 'Пошаговое руководство по настройке автоматической сборки и деплоя Android приложений',
          tags: ['react-native', 'android', 'ci-cd', 'github-actions'],
          category: 'DevOps',
          readTime: '8 мин',
          lastModified: '2025-01-15',
          content: `# GitHub Actions для Android React Native

## Введение

В этой статье я расскажу, как настроить автоматическую сборку и деплой Android приложения на React Native с помощью **GitHub Actions**. Это поможет автоматизировать процесс релиза и сэкономить время разработки.

## Предварительные требования

Перед началом убедитесь, что у вас есть:
- Аккаунт Google Play Developer (платный)
- Проект React Native  
- Репозиторий на GitHub

## Шаг 1: Настройка Google Play Console

### Регистрация в Google Play Developer

1. Зарегистрируйтесь и оплатите Google Play Developer аккаунт
2. В Google Play Console создайте новое приложение
3. Заполните минимальную информацию

### Настройка тестирования

1. Пригласите пользователей-тестировщиков
2. Настройте список тестировщиков в разделе "Тестировщики"
3. Создайте первый релиз вручную

## Полезные команды

Для работы с keystore используйте:

\`\`\`bash
keytool -genkey -v -keystore my-upload-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
\`\`\`

Проверка подписи:

\`\`\`bash
jarsigner -verify -verbose -certs app-release.apk
\`\`\`

## Заключение

Теперь при каждом пуше в main ветку будет автоматически собираться новая версия приложения.

*Подробности настройки можно найти в [официальной документации](https://docs.github.com/en/actions).*`,
          metadata: {
            author: 'Peter Evsikov',
            wordCount: 150
          }
        };

        setTimeout(() => {
          setArticle(mockArticle);
          setLoading(false);
        }, 500);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [filename]);

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
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Статья не найдена</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {error || 'Запрашиваемая статья не существует'}
            </p>
            <button
                onClick={onBack}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Вернуться к статьям
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
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
            onClick={onBack}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-6 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к статьям
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(article.lastModified).toLocaleDateString('ru-RU')}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {article.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
                <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
              #{tag}
            </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(article.content)
              }}
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
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
                    {article.metadata.wordCount} слов
                  </div>
              )}
            </div>

            <button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Другие статьи
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
