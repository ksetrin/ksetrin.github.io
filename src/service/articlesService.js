class ArticlesService {
    constructor() {
        this.githubUsername = 'ksetrin';
        this.repoName = 'ksetrin.github.io';
        this.articlesPath = 'articles';
        this.baseApiUrl = 'https://api.github.com';
    }

    async getArticlesList() {
        try {
            const response = await fetch(
                `${this.baseApiUrl}/repos/${this.githubUsername}/${this.repoName}/contents/${this.articlesPath}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch articles list');
            }

            const files = await response.json();

            const markdownFiles = files.filter(file =>
                file.name.endsWith('.md') && file.type === 'file'
            );

            return markdownFiles;
        } catch (error) {
            console.error('Error fetching articles list:', error);
            return [];
        }
    }

    async getArticleContent(filename) {
        try {
            const response = await fetch(
                `${this.baseApiUrl}/repos/${this.githubUsername}/${this.repoName}/contents/${this.articlesPath}/${filename}`
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch article: ${filename}`);
            }

            const data = await response.json();

            const base64Content = data.content.replace(/\n/g, '');
            const binaryString = atob(base64Content);
            const uint8Array = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i);
            }
            const content = new TextDecoder('utf-8').decode(uint8Array);

            return {
                content,
                sha: data.sha,
                size: data.size
            };
        } catch (error) {
            console.error(`Error fetching article ${filename}:`, error);
            return null;
        }
    }

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

        const metadata = {};
        frontmatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }

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

    async getArticleWithMetadata(filename) {
        const articleData = await this.getArticleContent(filename);

        if (!articleData) {
            return null;
        }

        const { metadata, content } = this.parseFrontmatter(articleData.content);

        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
            filename,
            title: metadata.title || this.generateTitleFromFilename(filename),
            description: metadata.description || this.generateDescriptionFromContent(content),
            tags: metadata.tags || [],
            category: metadata.category || 'General',
            readTime: `${readTime} мин`,
            content,
            metadata: {
                ...metadata,
                wordCount,
                size: articleData.size
            }
        };
    }

    async getAllArticles() {
        const filesList = await this.getArticlesList();

        const articles = await Promise.all(
            filesList.map(file => this.getArticleWithMetadata(file.name))
        );

        return articles
            .filter(article => article !== null)
            .sort((a, b) => a.title.localeCompare(b.title));
    }

    generateTitleFromFilename(filename) {
        return filename
            .replace('.md', '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    generateDescriptionFromContent(content) {
        const withoutHeaders = content.replace(/#{1,6}\s.*/g, '');
        return withoutHeaders.substring(0, 150).trim() + '...';
    }

    searchArticles(articles, query, selectedTag = 'all') {
        let filtered = articles;

        if (selectedTag !== 'all') {
            filtered = filtered.filter(article =>
                article.tags.includes(selectedTag)
            );
        }

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
