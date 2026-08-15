/**
 * Evidence — доказательства инженерной компетенции (ТЗ ч.1 §3.2, ТЗ ч.2 §32–38).
 *
 * Lifecycle: IDEA → DRAFT → WORKING → PUBLISHED → FEEDBACK → IMPROVED
 * Уровень (§38): 0 idea, 1 prototype, 2 working, 3 documented, 4 evaluated, 5 public evidence.
 */

export const EVIDENCE_STAGES = ['IDEA', 'DRAFT', 'WORKING', 'PUBLISHED', 'FEEDBACK', 'IMPROVED'];

export const EVIDENCE_STAGE_LABELS = {
  IDEA: { ru: 'Идея', en: 'Idea' },
  DRAFT: { ru: 'Черновик', en: 'Draft' },
  WORKING: { ru: 'Работает', en: 'Working' },
  PUBLISHED: { ru: 'Опубликован', en: 'Published' },
  FEEDBACK: { ru: 'Есть отклик', en: 'Feedback' },
  IMPROVED: { ru: 'Улучшен', en: 'Improved' }
};

export const ARTIFACTS = [
  {
    id: 'evidence-case-study',
    label: { ru: 'AI application case study', en: 'AI application case study' },
    summary: {
      ru: 'Разбор существующего сильного проекта: проблема, пользователь, архитектура, LLM-взаимодействие, надёжность, результат.',
      en: 'A breakdown of an existing strong project: problem, user, architecture, LLM interaction, reliability, result.'
    },
    startsOnDay: 1
  },
  {
    id: 'evidence-python-service',
    label: { ru: 'Python production service', en: 'Python production service' },
    summary: {
      ru: 'FastAPI-сервис с валидацией, тестами, логированием и Docker.',
      en: 'A FastAPI service with validation, tests, logging and Docker.'
    },
    startsOnDay: 8
  },
  {
    id: 'evidence-llm-endpoint',
    label: { ru: 'LLM endpoint', en: 'LLM endpoint' },
    summary: {
      ru: 'Production-style эндпоинт: structured output, tool calling, retries, streaming.',
      en: 'A production-style endpoint: structured output, tool calling, retries, streaming.'
    },
    startsOnDay: 15
  },
  {
    id: 'evidence-agent',
    label: { ru: 'Agent evaluation harness', en: 'Agent evaluation harness' },
    summary: {
      ru: 'Агент с инструментами плюс harness: тест-кейсы, метрики, регрессионный отчёт.',
      en: 'An agent with tools plus a harness: test cases, metrics, regression report.'
    },
    startsOnDay: 22
  },
  {
    id: 'evidence-rag',
    label: { ru: 'RAG vertical slice + benchmark', en: 'RAG vertical slice + benchmark' },
    summary: {
      ru: 'Ingestion → chunking → retrieval → reranking → цитаты, 30–50 тестовых запросов, baseline vs improved.',
      en: 'Ingestion → chunking → retrieval → reranking → citations, 30–50 test queries, baseline vs improved.'
    },
    startsOnDay: 29
  },
  {
    id: 'evidence-production-pack',
    label: { ru: 'Production readiness pack', en: 'Production readiness pack' },
    summary: {
      ru: 'Docker, healthcheck, структурные логи, request ID, retries, timeout, fallback, секреты, README.',
      en: 'Docker, healthcheck, structured logs, request ID, retries, timeout, fallback, secrets, README.'
    },
    startsOnDay: 36
  },
  {
    id: 'evidence-security',
    label: { ru: 'MCP / tool security', en: 'MCP / tool security' },
    summary: {
      ru: 'Prompt injection → права инструментов → валидация → подтверждение человеком → audit trail.',
      en: 'Prompt injection → tool permissions → validation → human approval → audit trail.'
    },
    startsOnDay: 43
  }
];

/** Цель кампании: 4–6 артефактов уровня не ниже 4 (ТЗ ч.2 §38). */
export const ARTIFACTS_TARGET = 6;
export const ARTIFACT_TARGET_STAGE = 'PUBLISHED';

export const getArtifact = (id) => ARTIFACTS.find((item) => item.id === id);

export const stageIndex = (stage) => Math.max(0, EVIDENCE_STAGES.indexOf(stage));
