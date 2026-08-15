/**
 * Крупные вехи кампании (ТЗ ч.1 §21, ТЗ ч.2 §61–123).
 *
 * trigger: 'day'    — веха привязана к дню кампании, засчитывается при закрытии дня;
 *          'signal' — веха засчитывается автоматически по событию (первый рыночный сигнал и т.п.).
 */

export const MILESTONES = [
  {
    id: 'campaign-start',
    day: 1,
    trigger: 'day',
    label: { ru: 'Старт кампании', en: 'Campaign start' },
    description: { ru: 'Определены целевые роли, создан трекер вакансий.', en: 'Target roles defined, vacancy tracker created.' }
  },
  {
    id: 'week-1-complete',
    day: 7,
    trigger: 'day',
    label: { ru: 'Позиционирование обновлено', en: 'Positioning updated' },
    description: { ru: 'Профиль, резюме и целевые роли приведены к Applied AI / LLM Engineer.', en: 'Profile, resume and target roles aligned to Applied AI / LLM Engineer.' }
  },
  {
    id: 'first-market-signal',
    trigger: 'signal',
    signal: 'response',
    label: { ru: 'Первый рыночный сигнал', en: 'First market signal' },
    description: { ru: 'Получен первый внешний ответ от рынка.', en: 'First external response received from the market.' }
  },
  {
    id: 'python-production-baseline',
    day: 14,
    trigger: 'day',
    label: { ru: 'Python production baseline', en: 'Python production baseline' },
    description: { ru: 'Собран Python-сервис с валидацией, тестами и Docker.', en: 'A Python service with validation, tests and Docker is in place.' }
  },
  {
    id: 'first-ai-artifact',
    day: 21,
    trigger: 'day',
    label: { ru: 'Первый AI-артефакт', en: 'First AI artifact' },
    description: { ru: 'LLM-эндпоинт с structured output, tool calling и обработкой отказов.', en: 'An LLM endpoint with structured output, tool calling and failure handling.' }
  },
  {
    id: 'agent-architecture-ready',
    day: 28,
    trigger: 'day',
    label: { ru: 'Архитектура агента готова', en: 'Agent architecture ready' },
    description: { ru: 'Agent loop, состояние, роутинг инструментов и эскалация описаны и работают.', en: 'Agent loop, state, tool routing and escalation described and working.' }
  },
  {
    id: 'rag-vertical-slice',
    day: 35,
    trigger: 'day',
    label: { ru: 'RAG vertical slice', en: 'RAG vertical slice' },
    description: { ru: 'Полный путь от документа до ответа с цитатами и замеренным baseline.', en: 'Full path from document to cited answer with a measured baseline.' }
  },
  {
    id: 'eval-production-ready',
    day: 42,
    trigger: 'day',
    label: { ru: 'Evals + production', en: 'Evals + production' },
    description: { ru: 'Golden dataset, регрессионные прогоны, Docker, логи и trace ID.', en: 'Golden dataset, regression runs, Docker, logs and trace ID.' }
  },
  {
    id: 'ai-security-evidence',
    day: 49,
    trigger: 'day',
    label: { ru: 'AI security evidence', en: 'AI security evidence' },
    description: { ru: 'Threat model, политика разрешений и примеры атак задокументированы.', en: 'Threat model, permission policy and attack examples documented.' }
  },
  {
    id: 'first-technical-interview',
    trigger: 'signal',
    signal: 'interview',
    label: { ru: 'Первое техническое интервью', en: 'First technical interview' },
    description: { ru: 'Внешняя проверка компетенций состоялась.', en: 'External competence check has happened.' }
  },
  {
    id: 'campaign-complete',
    day: 56,
    trigger: 'day',
    label: { ru: 'Кампания завершена', en: 'Campaign complete' },
    description: { ru: 'Итоги 56 дней собраны, данные готовы для следующего цикла.', en: '56 days summarised, data ready for the next cycle.' }
  }
];

export const getMilestone = (id) => MILESTONES.find((item) => item.id === id);

export const milestoneForDay = (day) => MILESTONES.find((item) => item.trigger === 'day' && item.day === day);
