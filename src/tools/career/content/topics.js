/**
 * Технические темы кампании (ТЗ ч.2, §12–23).
 * Это данные, а не UI: пак можно заменить целиком, не трогая компоненты.
 *
 * priority: P0 | P1 | P2 | P3 — приоритет изучения (§22).
 * introducedOnDay — день кампании, когда тема впервые появляется.
 */

export const DOMAINS = [
  { id: 'python', label: { ru: 'Python для production', en: 'Python for production' }, priority: 'P0' },
  { id: 'llm', label: { ru: 'LLM fundamentals', en: 'LLM fundamentals' }, priority: 'P0' },
  { id: 'prompting', label: { ru: 'Prompting', en: 'Prompting' }, priority: 'P0' },
  { id: 'agents', label: { ru: 'Агенты', en: 'Agents' }, priority: 'P0' },
  { id: 'rag', label: { ru: 'RAG', en: 'RAG' }, priority: 'P0' },
  { id: 'evaluation', label: { ru: 'Evaluation', en: 'Evaluation' }, priority: 'P1' },
  { id: 'production', label: { ru: 'Production', en: 'Production' }, priority: 'P1' },
  { id: 'mcp', label: { ru: 'MCP / Tool interfaces', en: 'MCP / tool interfaces' }, priority: 'P1' },
  { id: 'security', label: { ru: 'AI Security', en: 'AI security' }, priority: 'P1' },
  { id: 'architecture', label: { ru: 'Архитектура', en: 'Architecture' }, priority: 'P1' }
];

const topic = (id, domain, ru, en, introducedOnDay) => ({
  id,
  domain,
  label: { ru, en },
  introducedOnDay
});

export const TOPICS = [
  // DOMAIN A — Python for production
  topic('py-basics', 'python', 'Типы, коллекции, функции', 'Types, collections, functions', 1),
  topic('py-collections', 'python', 'Списки, словари, множества, comprehensions', 'Lists, dicts, sets, comprehensions', 2),
  topic('py-functions', 'python', 'Аргументы, области видимости, исключения', 'Arguments, scopes, exceptions', 3),
  topic('py-classes', 'python', 'Классы, dataclasses, typing', 'Classes, dataclasses, typing', 4),
  topic('py-modules', 'python', 'Модули, пакеты, окружения', 'Modules, packages, environments', 5),
  topic('py-async', 'python', 'async/await и конкурентность', 'async/await and concurrency', 8),
  topic('py-pydantic', 'python', 'Pydantic и валидация данных', 'Pydantic and data validation', 9),
  topic('py-fastapi', 'python', 'FastAPI, роуты, DI', 'FastAPI, routes, DI', 10),
  topic('py-testing', 'python', 'Тестирование и логирование', 'Testing and logging', 11),
  topic('py-docker', 'python', 'Docker и упаковка сервиса', 'Docker and service packaging', 12),

  // DOMAIN B — LLM fundamentals
  topic('llm-basics', 'llm', 'Токены, контекст, сообщения', 'Tokens, context, messages', 15),
  topic('llm-structured', 'llm', 'Structured output и JSON schema', 'Structured output and JSON schema', 16),
  topic('llm-tools', 'llm', 'Tool calling', 'Tool calling', 17),
  topic('llm-streaming', 'llm', 'Streaming, latency, стоимость токенов', 'Streaming, latency, token cost', 20),
  topic('llm-model-selection', 'llm', 'Выбор модели и её лимиты', 'Model selection and limits', 20),

  // DOMAIN C — Prompting
  topic('prompt-structure', 'prompting', 'Инструкция, контекст, примеры, ограничения', 'Instruction, context, examples, constraints', 16),
  topic('prompt-versioning', 'prompting', 'Версионирование промптов', 'Prompt versioning', 18),

  // DOMAIN D — Agents
  topic('agent-loop', 'agents', 'Agent loop', 'Agent loop', 22),
  topic('agent-state', 'agents', 'Состояние и память агента', 'Agent state and memory', 23),
  topic('agent-routing', 'agents', 'Роутинг инструментов', 'Tool routing', 24),
  topic('agent-reliability', 'agents', 'Retries, timeout, fallback', 'Retries, timeout, fallback', 25),
  topic('agent-hitl', 'agents', 'Human-in-the-loop и эскалация', 'Human-in-the-loop and escalation', 26),

  // DOMAIN E — RAG
  topic('rag-ingestion', 'rag', 'Ingestion и парсинг документов', 'Ingestion and document parsing', 29),
  topic('rag-chunking', 'rag', 'Chunking и метаданные', 'Chunking and metadata', 30),
  topic('rag-embeddings', 'rag', 'Эмбеддинги и векторное хранилище', 'Embeddings and vector storage', 31),
  topic('rag-retrieval', 'rag', 'Retrieval, hybrid search', 'Retrieval, hybrid search', 32),
  topic('rag-reranking', 'rag', 'Reranking', 'Reranking', 33),
  topic('rag-citations', 'rag', 'Цитирование и groundedness', 'Citations and groundedness', 34),

  // DOMAIN F — Evaluation
  topic('eval-dataset', 'evaluation', 'Golden dataset и тест-кейсы', 'Golden dataset and test cases', 36),
  topic('eval-metrics', 'evaluation', 'Метрики качества', 'Quality metrics', 37),
  topic('eval-regression', 'evaluation', 'Регрессионные прогоны', 'Regression runs', 38),

  // DOMAIN G — Production
  topic('prod-docker', 'production', 'Docker, healthcheck, конфигурация', 'Docker, healthcheck, configuration', 39),
  topic('prod-observability', 'production', 'Логи, trace ID, observability', 'Logs, trace ID, observability', 40),
  topic('prod-resilience', 'production', 'Timeout, retry, fallback, стоимость', 'Timeout, retry, fallback, cost', 41),

  // DOMAIN H — MCP
  topic('mcp-basics', 'mcp', 'MCP: сервер, клиент, ресурсы', 'MCP: server, client, resources', 43),
  topic('mcp-schema', 'mcp', 'Схема инструмента и валидация', 'Tool schema and validation', 44),
  topic('mcp-permissions', 'mcp', 'Разрешения и опасные операции', 'Permissions and dangerous operations', 45),

  // DOMAIN I — Security
  topic('sec-injection', 'security', 'Prompt injection, прямой и косвенный', 'Prompt injection, direct and indirect', 46),
  topic('sec-data', 'security', 'PII, секреты, утечки данных', 'PII, secrets, data leakage', 47),
  topic('sec-agency', 'security', 'Excessive agency и approval flow', 'Excessive agency and approval flow', 48),

  // DOMAIN J — Architecture
  topic('arch-boundaries', 'architecture', 'Границы сервисов, sync vs async', 'Service boundaries, sync vs async', 27),
  topic('arch-storage', 'architecture', 'Кэш, очередь, БД, векторное хранилище', 'Cache, queue, DB, vector storage', 39),
  topic('arch-system-design', 'architecture', 'System design LLM-приложения', 'LLM application system design', 55)
];

export const TOPIC_STATUSES = ['NEW', 'STUDYING', 'CONFIRMED'];

/** Интервалы активного повторения (ТЗ ч.2, §26). */
export const REVIEW_INTERVALS = [1, 3, 7, 14, 30];

export const getTopic = (id) => TOPICS.find((item) => item.id === id);

export const topicsByDomain = () =>
  DOMAINS.map((domain) => ({
    ...domain,
    topics: TOPICS.filter((item) => item.domain === domain.id)
  }));

/** Целевое количество подтверждённых тем к концу кампании (ТЗ ч.2, §124). */
export const CONFIRMED_TOPICS_TARGET = 12;
