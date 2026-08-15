/**
 * Content Pack: 56-дневная карьерная кампания (ТЗ ч.2).
 *
 * Здесь только данные. UI ничего не знает про конкретные задачи — он рендерит
 * то, что отдаёт этот файл. Заменив пак, можно получить другую программу
 * (другая профессия, другая длительность) без правки компонентов.
 *
 * Типы задач (§126): market | learn | recall | build | interview | evidence | review | rest
 * Уровни: must (обязательные) | should (желательные) | bonus (необязательные)
 * frequency (§41): daily | weekly | milestone | once
 */

import { MILESTONES } from './milestones';

const task = (type, ru, en, minutes, frequency = 'daily') => ({
  type,
  title: { ru, en },
  minutes,
  frequency
});

const day = (number, focusRu, focusEn, config) => ({
  day: number,
  focus: { ru: focusRu, en: focusEn },
  must: config.must || [],
  should: config.should || [],
  bonus: config.bonus || [],
  topics: config.topics || [],
  questions: config.questions || [],
  artifact: config.artifact || null
});

export const WEEKS = [
  { week: 1, focus: { ru: 'Позиционирование', en: 'Reposition' }, output: { ru: 'Обновлённый профиль', en: 'Updated profile' } },
  { week: 2, focus: { ru: 'Python для production', en: 'Python for production' }, output: { ru: 'Python-сервис', en: 'Python service' } },
  { week: 3, focus: { ru: 'LLM-приложения', en: 'LLM applications' }, output: { ru: 'LLM-приложение', en: 'LLM application' } },
  { week: 4, focus: { ru: 'Агенты', en: 'Agents' }, output: { ru: 'Агент с инструментами', en: 'Agent with tools' } },
  { week: 5, focus: { ru: 'RAG', en: 'RAG' }, output: { ru: 'RAG benchmark', en: 'RAG benchmark' } },
  { week: 6, focus: { ru: 'Evals + Production', en: 'Evals + production' }, output: { ru: 'Отчёт по оценке + production pack', en: 'Evaluation report + production pack' } },
  { week: 7, focus: { ru: 'MCP + Security', en: 'MCP + security' }, output: { ru: 'Threat model и политика прав', en: 'Threat model and permission policy' } },
  { week: 8, focus: { ru: 'Рынок + интервью', en: 'Market + interview' }, output: { ru: 'Портфолио, готовое к рынку', en: 'Market-ready portfolio' } }
];

const DAYS = [
  // ─────────────── WEEK 1 — REPOSITION ───────────────
  day(1, 'Старт: кто я на рынке', 'Start: who I am on the market', {
    must: [
      task('market', 'Определить 5 целевых ролей и найти 5 вакансий', 'Define 5 target roles and find 5 vacancies', 40, 'once'),
      task('learn', 'Python baseline: типы, коллекции, функции', 'Python baseline: types, collections, functions', 45),
      task('recall', 'Ответить на 3 базовых Python-вопроса', 'Answer 3 basic Python questions', 15),
      task('interview', 'Рассказать вслух: «кто я как инженер»', 'Say out loud: "who am I as an engineer"', 15)
    ],
    should: [task('build', 'Создать Python workspace', 'Create a Python workspace', 30, 'once')],
    bonus: [task('evidence', 'Выбрать основной проект портфолио', 'Select the main portfolio project', 20, 'once')],
    topics: ['py-basics'],
    questions: ['py-1', 'py-2', 'py-5'],
    artifact: 'evidence-case-study'
  }),
  day(2, 'Структуры данных Python', 'Python data structures', {
    must: [
      task('market', 'Найти 5 вакансий, выбрать 1–2 для отклика', 'Find 5 vacancies, pick 1–2 to apply to', 30),
      task('learn', 'Списки, словари, множества, кортежи, comprehensions', 'Lists, dicts, sets, tuples, comprehensions', 45),
      task('recall', 'Вопросы дня 1', 'Day 1 questions', 15)
    ],
    should: [task('build', 'Небольшая Python CLI-задача', 'A small Python CLI task', 45)],
    bonus: [task('interview', '2 Python-вопроса вслух', '2 Python questions out loud', 15)],
    topics: ['py-collections'],
    questions: ['py-3', 'py-4']
  }),
  day(3, 'Функции и ошибки', 'Functions and errors', {
    must: [
      task('market', '1–2 качественных отклика', '1–2 quality applications', 40),
      task('learn', 'Аргументы, области видимости, исключения', 'Arguments, scopes, exceptions', 45),
      task('recall', 'Вопросы дней 1–2', 'Day 1–2 questions', 15)
    ],
    should: [task('build', 'Рефакторинг вчерашнего кода', 'Refactor yesterday\'s code', 40)],
    bonus: [task('interview', 'Объяснить обработку ошибок вслух', 'Explain error handling out loud', 10)],
    topics: ['py-functions'],
    questions: ['py-6']
  }),
  day(4, 'Классы и типы', 'Classes and typing', {
    must: [
      task('market', 'Сканировать вакансии + 1 отклик', 'Scan vacancies + 1 application', 30),
      task('learn', 'Классы, dataclasses, typing', 'Classes, dataclasses, typing', 50),
      task('recall', '3 вопроса из пройденного', '3 questions from covered topics', 15)
    ],
    should: [task('build', 'Описать доменную модель проекта', 'Describe the project domain model', 45)],
    bonus: [task('interview', 'Объяснить: class vs dataclass', 'Explain: class vs dataclass', 10)],
    topics: ['py-classes'],
    questions: ['py-7', 'py-8']
  }),
  day(5, 'Структура проекта', 'Project structure', {
    must: [
      task('market', '1–2 отклика', '1–2 applications', 40),
      task('learn', 'Модули, пакеты, импорты, окружения', 'Modules, packages, imports, environments', 40),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Организовать структуру проекта', 'Organise the project structure', 40)],
    bonus: [task('evidence', 'Черновик README проекта', 'Draft the project README', 30)],
    topics: ['py-modules'],
    questions: ['py-9']
  }),
  day(6, 'Лёгкий день', 'Light day', {
    must: [
      task('market', 'Сканировать вакансии, записать наблюдения', 'Scan vacancies, record observations', 20),
      task('recall', 'Повторить Python недели', 'Review the week\'s Python', 25)
    ],
    should: [task('evidence', 'Cleanup + README + журнал активности', 'Cleanup + README + activity log', 40)],
    bonus: [task('interview', 'Отрепетировать career story', 'Rehearse the career story', 15)],
    questions: ['py-2', 'py-7']
  }),
  day(7, 'Обзор недели 1', 'Week 1 review', {
    must: [
      task('review', 'Недельный обзор: отклики, темы, вопросы, коммиты, evidence', 'Weekly review: applications, topics, questions, commits, evidence', 30, 'weekly'),
      task('review', 'Ответить: что сдвинулось, что нет, что запутало', 'Answer: what moved, what did not, what confused me', 20, 'weekly')
    ],
    should: [task('market', 'Довести профиль и резюме до целевых ролей', 'Align profile and resume with target roles', 60, 'once')],
    bonus: [task('evidence', 'Первая запись в career changelog', 'First career changelog entry', 15, 'once')],
    questions: ['py-5', 'py-6']
  }),

  // ─────────────── WEEK 2 — PYTHON PRODUCTION ───────────────
  day(8, 'Async в Python', 'Async in Python', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'async/await, event loop, конкурентность', 'async/await, event loop, concurrency', 50),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'FastAPI hello-world сервис', 'FastAPI hello-world service', 45)],
    bonus: [task('interview', 'Объяснить event loop вслух', 'Explain the event loop out loud', 10)],
    topics: ['py-async'],
    questions: ['py-10', 'py-11', 'py-12'],
    artifact: 'evidence-python-service'
  }),
  day(9, 'Валидация данных', 'Data validation', {
    must: [
      task('market', '1–2 отклика', '1–2 applications', 40),
      task('learn', 'Pydantic, валидация request/response', 'Pydantic, request/response validation', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Добавить схемы в сервис', 'Add schemas to the service', 40)],
    topics: ['py-pydantic'],
    questions: ['py-13']
  }),
  day(10, 'FastAPI и DI', 'FastAPI and DI', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Роуты, dependency injection, тестирование', 'Routes, dependency injection, testing', 50),
      task('recall', '3 вопроса', '3 questions', 15),
      task('interview', '3 вопроса вслух', '3 questions out loud', 15)
    ],
    should: [task('build', 'Первые тесты сервиса', 'First service tests', 45)],
    topics: ['py-fastapi'],
    questions: ['py-14']
  }),
  day(11, 'Ошибки, логи, конфиг', 'Errors, logs, config', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Обработка ошибок, логирование, конфигурация', 'Error handling, logging, configuration', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Production-style эндпоинт', 'Production-style endpoint', 60)],
    topics: ['py-testing'],
    questions: ['py-15']
  }),
  day(12, 'Docker', 'Docker', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Docker: образ, слои, healthcheck', 'Docker: image, layers, healthcheck', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Контейнеризовать сервис', 'Containerise the service', 50)],
    topics: ['py-docker'],
    questions: ['prod-1']
  }),
  day(13, 'Документация сервиса', 'Service documentation', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('recall', '3 вопроса', '3 questions', 15),
      task('interview', 'Python + FastAPI вопросы вслух', 'Python + FastAPI questions out loud', 20)
    ],
    should: [task('evidence', 'README + схема архитектуры сервиса', 'README + service architecture diagram', 60)],
    bonus: [task('market', 'Анализ повторяющихся требований в вакансиях', 'Analyse recurring vacancy requirements', 30, 'weekly')],
    questions: ['py-14', 'py-10']
  }),
  day(14, 'Обзор недели 2', 'Week 2 review', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('recall', 'Повторение Python-блока', 'Review the Python block', 25)
    ],
    should: [task('evidence', 'Довести Python-сервис до состояния «работает и описан»', 'Bring the Python service to "works and documented"', 60)],
    bonus: [task('interview', 'Mock interview #1: Python + engineering', 'Mock interview #1: Python + engineering', 60, 'milestone')],
    questions: ['py-11', 'py-13']
  }),

  // ─────────────── WEEK 3 — LLM APPLICATIONS ───────────────
  day(15, 'Основы LLM API', 'LLM API basics', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Токены, контекст, сообщения, роли', 'Tokens, context, messages, roles', 50),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Простой LLM-сервис', 'A simple LLM service', 60)],
    topics: ['llm-basics'],
    questions: ['llm-1', 'llm-2', 'llm-3'],
    artifact: 'evidence-llm-endpoint'
  }),
  day(16, 'Structured output', 'Structured output', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'JSON schema, structured output, структура промпта', 'JSON schema, structured output, prompt structure', 50),
      task('recall', '5 вопросов', '5 questions', 20)
    ],
    should: [task('build', 'Описать схему ответа и провалидировать её', 'Define the response schema and validate it', 45)],
    topics: ['llm-structured', 'prompt-structure'],
    questions: ['llm-4', 'llm-5', 'prompt-1']
  }),
  day(17, 'Tool calling', 'Tool calling', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Tool calling: схема, вызов, результат', 'Tool calling: schema, call, result', 50),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Реализовать один инструмент', 'Implement one tool', 60)],
    topics: ['llm-tools'],
    questions: ['agent-1']
  }),
  day(18, 'Несколько инструментов', 'Multiple tools', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Валидация инструментов, версионирование промптов', 'Tool validation, prompt versioning', 45),
      task('recall', '3 вопроса', '3 questions', 15),
      task('interview', 'Объяснить архитектуру вслух', 'Explain the architecture out loud', 20)
    ],
    should: [task('build', 'Добавить второй инструмент и валидацию', 'Add a second tool and validation', 60)],
    topics: ['prompt-versioning'],
    questions: ['prompt-2', 'agent-2']
  }),
  day(19, 'Обработка отказов', 'Failure handling', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Retries, timeout, fallback', 'Retries, timeout, fallback', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Реализовать обработку сбоев', 'Implement failure handling', 60)],
    questions: ['prod-4', 'prod-5']
  }),
  day(20, 'Streaming и стоимость', 'Streaming and cost', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Streaming, латентность, стоимость токенов, выбор модели', 'Streaming, latency, token cost, model selection', 50),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Добавить streaming и измерить латентность', 'Add streaming and measure latency', 50)],
    topics: ['llm-streaming', 'llm-model-selection'],
    questions: ['llm-6', 'llm-7', 'llm-8']
  }),
  day(21, 'Обзор недели 3', 'Week 3 review', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('recall', 'Повторение LLM-блока', 'Review the LLM block', 25)
    ],
    should: [task('evidence', 'README + архитектура LLM-эндпоинта', 'README + LLM endpoint architecture', 60)],
    bonus: [task('evidence', 'Опубликовать разбор LLM-приложения', 'Publish the LLM application breakdown', 60, 'milestone')],
    questions: ['llm-4', 'llm-6']
  }),

  // ─────────────── WEEK 4 — AGENTS ───────────────
  day(22, 'Agent loop', 'Agent loop', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Agent loop: input → модель → решение → инструмент → результат', 'Agent loop: input → model → decision → tool → result', 50),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Каркас агента', 'Agent skeleton', 60)],
    topics: ['agent-loop'],
    questions: ['agent-1', 'agent-2'],
    artifact: 'evidence-agent'
  }),
  day(23, 'Состояние агента', 'Agent state', {
    must: [
      task('market', '1–2 отклика', '1–2 applications', 40),
      task('learn', 'Состояние, память, границы контекста', 'State, memory, context boundaries', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Stateful workflow', 'Stateful workflow', 60)],
    topics: ['agent-state'],
    questions: ['agent-3', 'agent-4']
  }),
  day(24, 'Роутинг инструментов', 'Tool routing', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Роутинг: моделью или кодом', 'Routing: by model or by code', 45),
      task('recall', '3 вопроса', '3 questions', 15),
      task('interview', 'Архитектура агента вслух', 'Agent architecture out loud', 20)
    ],
    should: [task('build', 'Два инструмента с роутингом', 'Two tools with routing', 60)],
    topics: ['agent-routing'],
    questions: ['agent-5', 'agent-10']
  }),
  day(25, 'Надёжность агента', 'Agent reliability', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Retries, timeout, fallback, идемпотентность', 'Retries, timeout, fallback, idempotency', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Разобрать реальные failure cases агента', 'Analyse real agent failure cases', 50)],
    topics: ['agent-reliability'],
    questions: ['agent-6', 'agent-7', 'agent-9']
  }),
  day(26, 'Человек в контуре', 'Human in the loop', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Эскалация, шаг подтверждения, границы автономии', 'Escalation, approval step, autonomy boundaries', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Спроектировать шаг подтверждения', 'Design the approval step', 45)],
    topics: ['agent-hitl'],
    questions: ['agent-8']
  }),
  day(27, 'Архитектурный разбор', 'Architecture breakdown', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Границы сервисов, sync vs async', 'Service boundaries, sync vs async', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('evidence', 'Схема: почему агент, где детерминированный код, где LLM', 'Diagram: why an agent, where deterministic code, where the LLM', 60)],
    topics: ['arch-boundaries'],
    questions: ['arch-1']
  }),
  day(28, 'Обзор недели 4', 'Week 4 review', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('recall', 'Повторение блока агентов', 'Review the agents block', 25)
    ],
    should: [task('evidence', 'Failure analysis агента в README', 'Agent failure analysis in the README', 50)],
    bonus: [task('interview', 'Mock interview #2: LLM + агенты', 'Mock interview #2: LLM + agents', 60, 'milestone')],
    questions: ['agent-5', 'agent-8']
  }),

  // ─────────────── WEEK 5 — RAG ───────────────
  day(29, 'Ingestion', 'Ingestion', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Загрузка и парсинг документов', 'Document loading and parsing', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Пайплайн ingestion', 'Ingestion pipeline', 60)],
    topics: ['rag-ingestion'],
    questions: ['rag-1'],
    artifact: 'evidence-rag'
  }),
  day(30, 'Chunking', 'Chunking', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Стратегии chunking и метаданные', 'Chunking strategies and metadata', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Сравнить две стратегии chunking', 'Compare two chunking strategies', 60)],
    topics: ['rag-chunking'],
    questions: ['rag-2', 'rag-3']
  }),
  day(31, 'Эмбеддинги', 'Embeddings', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Эмбеддинги и векторное хранилище', 'Embeddings and vector storage', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Подключить векторное хранилище', 'Wire up the vector store', 60)],
    topics: ['rag-embeddings'],
    questions: ['rag-4']
  }),
  day(32, 'Retrieval baseline', 'Retrieval baseline', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Векторный, keyword и гибридный поиск', 'Vector, keyword and hybrid search', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Собрать baseline retrieval и зафиксировать цифры', 'Build the retrieval baseline and record the numbers', 60)],
    topics: ['rag-retrieval'],
    questions: ['rag-5', 'rag-7']
  }),
  day(33, 'Reranking', 'Reranking', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Reranking и его цена', 'Reranking and its cost', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Сравнить baseline и improved', 'Compare baseline vs improved', 60)],
    topics: ['rag-reranking'],
    questions: ['rag-6']
  }),
  day(34, 'Цитаты и тест-сет', 'Citations and test set', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Цитирование, groundedness, свежесть данных', 'Citations, groundedness, data freshness', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Собрать 30–50 тестовых запросов', 'Assemble 30–50 test queries', 60)],
    topics: ['rag-citations'],
    questions: ['rag-8', 'rag-10']
  }),
  day(35, 'Benchmark', 'Benchmark', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('build', 'Прогнать benchmark и записать результаты', 'Run the benchmark and record the results', 60)
    ],
    should: [task('evidence', 'Описать trade-off выбранной стратегии', 'Describe the trade-off of the chosen strategy', 45)],
    bonus: [task('evidence', 'Опубликовать разбор RAG-benchmark', 'Publish the RAG benchmark breakdown', 60, 'milestone')],
    questions: ['rag-9', 'rag-2']
  }),

  // ─────────────── WEEK 6 — EVALS + PRODUCTION ───────────────
  day(36, 'Golden dataset', 'Golden dataset', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Golden dataset и тест-кейсы', 'Golden dataset and test cases', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Собрать golden dataset', 'Assemble the golden dataset', 60)],
    topics: ['eval-dataset'],
    questions: ['eval-1'],
    artifact: 'evidence-production-pack'
  }),
  day(37, 'Метрики', 'Metrics', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Correctness, groundedness, relevance, tool success', 'Correctness, groundedness, relevance, tool success', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Реализовать подсчёт метрик', 'Implement metric computation', 60)],
    topics: ['eval-metrics'],
    questions: ['eval-2', 'eval-3']
  }),
  day(38, 'Регрессия', 'Regression', {
    must: [
      task('market', '2 отклика', '2 applications', 45),
      task('learn', 'Регрессионные прогоны и их место в CI', 'Regression runs and their place in CI', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Автоматизировать регрессионный прогон', 'Automate the regression run', 60)],
    topics: ['eval-regression'],
    questions: ['eval-4', 'eval-5']
  }),
  day(39, 'Docker и healthcheck', 'Docker and healthcheck', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Healthcheck, конфигурация, секреты, хранилища', 'Healthcheck, configuration, secrets, storage', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Довести Docker-сборку до production-вида', 'Bring the Docker build to production shape', 60)],
    topics: ['prod-docker', 'arch-storage'],
    questions: ['prod-1', 'arch-3']
  }),
  day(40, 'Observability', 'Observability', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Структурные логи, trace ID, метрики', 'Structured logs, trace ID, metrics', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Добавить trace ID сквозь весь запрос', 'Add a trace ID through the whole request', 60)],
    topics: ['prod-observability'],
    questions: ['prod-2', 'prod-3']
  }),
  day(41, 'Устойчивость и стоимость', 'Resilience and cost', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Timeout, retry, fallback, rate limits, стоимость', 'Timeout, retry, fallback, rate limits, cost', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Посчитать стоимость запроса и добавить лимиты', 'Compute request cost and add limits', 50)],
    topics: ['prod-resilience'],
    questions: ['prod-4', 'arch-5']
  }),
  day(42, 'Отчёт по оценке', 'Evaluation report', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('evidence', 'Опубликовать отчёт по оценке', 'Publish the evaluation report', 60, 'milestone')
    ],
    should: [task('interview', 'System design вслух', 'System design out loud', 30)],
    bonus: [task('interview', 'Mock interview #3: RAG + evaluation', 'Mock interview #3: RAG + evaluation', 60, 'milestone')],
    questions: ['eval-2', 'prod-2']
  }),

  // ─────────────── WEEK 7 — MCP + SECURITY ───────────────
  day(43, 'MCP', 'MCP', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'MCP: сервер, клиент, ресурсы, discovery', 'MCP: server, client, resources, discovery', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Минимальный MCP-инструмент', 'A minimal MCP tool', 60)],
    topics: ['mcp-basics'],
    questions: ['mcp-1'],
    artifact: 'evidence-security'
  }),
  day(44, 'Схема инструмента', 'Tool schema', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'Схема, валидация входа и выхода', 'Schema, input and output validation', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Добавить строгую валидацию инструмента', 'Add strict tool validation', 50)],
    topics: ['mcp-schema'],
    questions: ['llm-4', 'agent-9']
  }),
  day(45, 'Права и опасные операции', 'Permissions and dangerous operations', {
    must: [
      task('market', '2–3 отклика', '2–3 applications', 60),
      task('learn', 'Разрешения, RBAC, опасные действия', 'Permissions, RBAC, dangerous actions', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Ограничить права инструментов', 'Restrict tool permissions', 50)],
    topics: ['mcp-permissions'],
    questions: ['mcp-2']
  }),
  day(46, 'Prompt injection', 'Prompt injection', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Прямая и косвенная prompt injection', 'Direct and indirect prompt injection', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Собрать примеры атак и защиты', 'Collect attack and defence examples', 60)],
    topics: ['sec-injection'],
    questions: ['sec-1']
  }),
  day(47, 'Данные и секреты', 'Data and secrets', {
    must: [
      task('market', '1 отклик', '1 application', 25),
      task('learn', 'PII, секреты, утечки, audit trail', 'PII, secrets, leakage, audit trail', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('build', 'Добавить audit trail к опасным действиям', 'Add an audit trail to dangerous actions', 50)],
    topics: ['sec-data'],
    questions: ['prod-3']
  }),
  day(48, 'Threat model', 'Threat model', {
    must: [
      task('market', 'Сканировать вакансии', 'Scan vacancies', 20),
      task('learn', 'Excessive agency и approval flow', 'Excessive agency and approval flow', 45),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('evidence', 'Описать threat model проекта', 'Write the project threat model', 60)],
    topics: ['sec-agency'],
    questions: ['sec-2']
  }),
  day(49, 'Security README', 'Security README', {
    must: [
      task('review', 'Недельный обзор', 'Weekly review', 30, 'weekly'),
      task('evidence', 'Опубликовать security README и политику прав', 'Publish the security README and permission policy', 60, 'milestone')
    ],
    should: [task('interview', 'Вопросы по безопасности вслух', 'Security questions out loud', 25)],
    questions: ['sec-1', 'sec-2', 'mcp-2']
  }),

  // ─────────────── WEEK 8 — MARKET + INTERVIEW ───────────────
  day(50, 'Отбор доказательств', 'Evidence selection', {
    must: [
      task('market', '2 целевых отклика', '2 targeted applications', 50),
      task('evidence', 'Пересмотреть портфолио, выбрать сильнейшее evidence', 'Review the portfolio, pick the strongest evidence', 60, 'once'),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('interview', 'Питч проекта: 30 секунд и 2 минуты', 'Project pitch: 30 seconds and 2 minutes', 30)],
    questions: ['agent-10', 'rag-9']
  }),
  day(51, 'Резюме', 'Resume', {
    must: [
      task('market', '2 целевых отклика', '2 targeted applications', 50),
      task('evidence', 'Финализировать резюме под целевые роли', 'Finalise the resume for target roles', 60, 'once'),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('interview', '4 technical stories по структуре STAR', '4 technical stories in STAR structure', 45)],
    questions: ['arch-4', 'eval-5']
  }),
  day(52, 'Профиль', 'Profile', {
    must: [
      task('market', '2 целевых отклика', '2 targeted applications', 50),
      task('evidence', 'Финализировать публичный профиль', 'Finalise the public profile', 50, 'once'),
      task('recall', '3 вопроса', '3 questions', 15)
    ],
    should: [task('interview', 'Питч проекта: 5 и 10 минут', 'Project pitch: 5 and 10 minutes', 40)],
    questions: ['llm-7', 'agent-2']
  }),
  day(53, 'Mock interview', 'Mock interview', {
    must: [
      task('market', '2 целевых отклика', '2 targeted applications', 50),
      task('interview', 'Mock interview #3', 'Mock interview #3', 60, 'milestone'),
      task('recall', 'Разбор: strong / weak / unknown', 'Debrief: strong / weak / unknown', 20)
    ],
    should: [task('learn', 'Закрыть пробел, найденный на mock interview', 'Close the gap found in the mock interview', 45)],
    questions: ['agent-10', 'prod-5']
  }),
  day(54, 'Марафон вопросов', 'Question marathon', {
    must: [
      task('market', 'Сканировать вакансии и follow-up по откликам', 'Scan vacancies and follow up on applications', 30),
      task('interview', '20 технических вопросов вслух', '20 technical questions out loud', 90),
      task('recall', 'Отметить слабые темы', 'Mark the weak topics', 20)
    ],
    should: [task('learn', 'Повторить две самые слабые темы', 'Review the two weakest topics', 45)],
    questions: ['py-12', 'rag-5', 'eval-3']
  }),
  day(55, 'System design', 'System design', {
    must: [
      task('market', '2 целевых отклика', '2 targeted applications', 50),
      task('interview', 'Mock interview #4: system design', 'Mock interview #4: system design', 75, 'milestone'),
      task('recall', 'Разбор ответов', 'Debrief the answers', 20)
    ],
    should: [task('learn', 'System design LLM-приложения', 'LLM application system design', 45)],
    topics: ['arch-system-design'],
    questions: ['arch-4', 'arch-5']
  }),
  day(56, 'Итоги кампании', 'Campaign results', {
    must: [
      task('review', 'Финальный обзор: рынок, знания, evidence, интервью', 'Final review: market, knowledge, evidence, interviews', 60, 'milestone'),
      task('review', 'Зафиксировать пробелы для следующего цикла', 'Record the gaps for the next cycle', 30, 'milestone')
    ],
    should: [task('evidence', 'Опубликовать career changelog за 56 дней', 'Publish the 56-day career changelog', 60, 'once')],
    bonus: [task('market', 'Спланировать следующую кампанию по данным этой', 'Plan the next campaign from this one\'s data', 40, 'once')],
    questions: ['arch-4']
  })
];

/** Стабильный id задачи: не зависит от порядка внутри уровня при чтении сохранённого состояния. */
const withIds = (dayNumber, tier, items) =>
  items.map((item, index) => ({
    ...item,
    id: `d${dayNumber}-${tier}${index + 1}`,
    tier,
    required: tier === 'must'
  }));

const milestoneByDay = MILESTONES.reduce((acc, item) => {
  if (item.trigger === 'day') acc[item.day] = item.id;
  return acc;
}, {});

export const CAMPAIGN = {
  id: 'ai-engineering-2026',
  name: { ru: 'AI Engineering Career Campaign', en: 'AI Engineering Career Campaign' },
  focus: { ru: 'Applied AI / LLM Engineer', en: 'Applied AI / LLM Engineer' },
  streams: {
    ru: ['Рынок', 'Доказательства', 'Знания', 'Интервью'],
    en: ['Market', 'Evidence', 'Knowledge', 'Interview']
  },
  duration: 56,
  weeks: WEEKS,
  days: DAYS.map((entry) => ({
    ...entry,
    week: Math.floor((entry.day - 1) / 7) + 1,
    must: withIds(entry.day, 'must', entry.must),
    should: withIds(entry.day, 'should', entry.should),
    bonus: withIds(entry.day, 'bonus', entry.bonus),
    milestone: milestoneByDay[entry.day] || null
  }))
};

/** Целевые значения воронки и метрик (ТЗ ч.2 §10, §124). */
export const TARGETS = {
  applications: 20,
  responses: 10,
  screenings: 6,
  interviews: 8,
  technical: 4,
  offers: 1,
  artifacts: 6,
  topics: 12,
  mocks: 4,
  questions: 60,
  nonZeroDays: 40
};

export const getDay = (dayNumber) => CAMPAIGN.days.find((entry) => entry.day === dayNumber) || null;

export const allTasksForDay = (dayNumber) => {
  const entry = getDay(dayNumber);
  if (!entry) return [];
  return [...entry.must, ...entry.should, ...entry.bonus];
};

export const getWeek = (weekNumber) => WEEKS.find((entry) => entry.week === weekNumber) || null;
