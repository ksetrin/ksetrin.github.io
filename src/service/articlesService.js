class ArticlesService {
    constructor() {
        this.githubUsername = 'ksetrin'; // ваш GitHub username
        this.repoName = 'ksetrin.github.io'; // название репозитория
        this.articlesPath = 'articles'; // папка со статьями
        this.baseApiUrl = 'https://api.github.com';
    }

    /**
     * Получает список всех .md файлов из папки articles
     */
    async getArticlesList() {
        try {
            const response = await fetch(
                `${this.baseApiUrl}/repos/${this.githubUsername}/${this.repoName}/contents/${this.articlesPath}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch articles list');
            }

            const files = await response.json();

            // Фильтруем только .md файлы
            const markdownFiles = files.filter(file =>
                file.name.endsWith('.md') && file.type === 'file'
            );

            return markdownFiles;
        } catch (error) {
            console.error('Error fetching articles list:', error);
            return [];
        }
    }

    /**
     * Получает содержимое конкретной статьи
     */
    async getArticleContent(filename) {
        try {
            const response = await fetch(
                `${this.baseApiUrl}/repos/${this.githubUsername}/${this.repoName}/contents/${this.articlesPath}/${filename}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch article: ${filename}`);
            }

            const data = await response.json();

            // GitHub возвращает содержимое в base64, декодируем
            const content = atob(data.content.replace(/\n/g, ''));

            return {
                content,
                sha: data.sha,
                lastModified: data.last_modified || new Date().toISOString(),
                size: data.size
            };
        } catch (error) {
            console.error(`Error fetching article ${filename}:`, error);
            return null;
        }
    }

    /**
     * Парсит метаданные из frontmatter статьи
     */
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (!match) {
            return {
                metadata: {},
                content: content
            };
        }

        const frontmatter = match[1];
        const articleContent = match[2];

        // Простой парсер YAML (для базовых случаев)
        const metadata = {};
        frontmatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                // Убираем кавычки если есть
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }

                // Парсим массивы
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
                }

                metadata[key] = value;
            }
        });

        return {
            metadata,
            content: articleContent
        };
    }

    /**
     * Получает полную информацию о статье с метаданными
     */
    async getArticleWithMetadata(filename) {
        const articleData = await this.getArticleContent(filename);

        if (!articleData) {
            return null;
        }

        const { metadata, content } = this.parseFrontmatter(articleData.content);

        // Вычисляем время чтения (примерно 200 слов в минуту)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
            filename,
            title: metadata.title || this.generateTitleFromFilename(filename),
            description: metadata.description || this.generateDescriptionFromContent(content),
            tags: metadata.tags || [],
            category: metadata.category || 'General',
            readTime: `${readTime} мин`,
            lastModified: metadata.date || articleData.lastModified,
            content,
            metadata: {
                ...metadata,
                wordCount,
                size: articleData.size
            }
        };
    }

    /**
     * Получает все статьи с метаданными
     */
    async getAllArticles() {
        const filesList = await this.getArticlesList();

        const articles = await Promise.all(
            filesList.map(file => this.getArticleWithMetadata(file.name))
        );

        // Фильтруем null значения и сортируем по дате
        return articles
            .filter(article => article !== null)
            .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    }

    /**
     * Вспомогательные методы
     */
    generateTitleFromFilename(filename) {
        return filename
            .replace('.md', '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    generateDescriptionFromContent(content) {
        // Берем первые 150 символов после заголовков
        const withoutHeaders = content.replace(/#{1,6}\s.*/g, '');
        return withoutHeaders.substring(0, 150).trim() + '...';
    }

    /**
     * Поиск статей
     */
    searchArticles(articles, query, selectedTag = 'all') {
        let filtered = articles;

        // Фильтр по тегу
        if (selectedTag !== 'all') {
            filtered = filtered.filter(article =>
                article.tags.includes(selectedTag)
            );
        }

        // Поиск по запросу
        if (query) {
            const searchLower = query.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchLower) ||
                article.description.toLowerCase().includes(searchLower) ||
                article.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        return filtered;
    }
}

export default new ArticlesService();
