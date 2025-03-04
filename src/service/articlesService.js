const articleModules = import.meta.glob('../../articles/*.md', { as: 'raw', eager: true });

class ArticlesService {
    constructor() {
        this.defaultAuthor = 'Пётр Евсиков';
        this.defaultLang = 'ru';
        this.articleMap = new Map(
            Object.entries(articleModules).map(([path, content]) => {
                const filename = path.split('/').pop();
                return [filename, { path, content }];
            })
        );
    }

    async getArticlesList() {
        return Array.from(this.articleMap.keys()).map(name => ({
            name,
            path: this.articleMap.get(name).path
        }));
    }

    getFilename(identifier) {
        if (!identifier) {
            throw new Error('Article identifier is required');
        }
        return identifier.endsWith('.md') ? identifier : `${identifier}.md`;
    }

    async getArticleContent(identifier) {
        const normalizedIdentifier = this.sanitizeIdentifier(identifier);
        const filename = this.getFilename(normalizedIdentifier);
        const entry = this.articleMap.get(filename);

        if (!entry) {
            console.error(`Article ${filename} not found locally`);
            return null;
        }

        return {
            content: entry.content,
            sha: null,
            size: entry.content.length,
            filename
        };
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

    parseArrayValue(value) {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === 'string') {
            return value.split(',').map(item => item.trim()).filter(Boolean);
        }
        return [];
    }

    normalizeSlug(slugFromMeta, filename) {
        if (slugFromMeta) {
            return slugFromMeta.trim().replace(/\/+$/, '');
        }
        return filename.replace(/\.md$/, '');
    }

    sanitizeIdentifier(identifier) {
        if (!identifier) return '';
        return identifier.replace(/^\/+|\/+$/g, '').trim();
    }

    normalizeDate(value) {
        if (!value) {
            return null;
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return null;
        }
        return parsed.toISOString().split('T')[0];
    }

    async getArticleWithMetadata(identifier) {
        const articleData = await this.getArticleContent(identifier);

        if (!articleData) {
            return null;
        }

        const { metadata, content } = this.parseFrontmatter(articleData.content);
        const slug = this.normalizeSlug(metadata.slug, articleData.filename);
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        const datePublished = this.normalizeDate(metadata.datePublished);
        const dateModified = this.normalizeDate(metadata.dateModified) || datePublished;
        const tags = Array.isArray(metadata.tags) ? metadata.tags : this.parseArrayValue(metadata.tags);
        const tldr = Array.isArray(metadata.tldr) ? metadata.tldr : this.parseArrayValue(metadata.tldr);
        const aliases = this.parseArrayValue(metadata.aliases);

        return {
            slug,
            filename: articleData.filename,
            title: metadata.title || this.generateTitleFromFilename(articleData.filename),
            description: metadata.description || this.generateDescriptionFromContent(content),
            tags,
            category: metadata.category || 'General',
            readTimeMinutes: readTime,
            readTimeLabel: `${readTime} мин`,
            tldr,
            lang: metadata.lang || this.defaultLang,
            datePublished,
            dateModified,
            author: metadata.author || this.defaultAuthor,
            content,
            aliases,
            metadata: {
                ...metadata,
                wordCount,
                size: articleData.size,
                slug,
                datePublished,
                dateModified,
                aliases
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
            .sort((a, b) => {
                const dateA = new Date(a.datePublished || 0).getTime();
                const dateB = new Date(b.datePublished || 0).getTime();
                if (dateA === dateB) {
                    return a.title.localeCompare(b.title);
                }
                return dateB - dateA;
            });
    }

    async getArticleBySlugOrAlias(identifier) {
        const normalized = this.sanitizeIdentifier(identifier);
        if (!normalized) {
            return null;
        }

        const directArticle = await this.getArticleWithMetadata(normalized);
        if (directArticle) {
            return directArticle;
        }

        const allArticles = await this.getAllArticles();
        const matched = allArticles.find(article =>
            article.slug === normalized ||
            (article.aliases && article.aliases.includes(normalized))
        );

        return matched || null;
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
