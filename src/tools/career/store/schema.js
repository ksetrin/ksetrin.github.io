/**
 * Схема локального состояния Career Control Center.
 *
 * Хранятся только первичные данные (§69): задачи, события, дни, темы, артефакты.
 * Всё производное — проценты, воронка, readiness — вычисляется в utils/metrics.js.
 */

import { CAMPAIGN } from '../content/campaign';
import { todayISO } from '../utils/date';

export const STORAGE_KEY = 'career-control-center:v1';
export const CURRENT_VERSION = 1;

/**
 * Категории потоков (§3): market | evidence | knowledge | interview | result.
 * Тип события определяет, в какой поток оно попадает и участвует ли в воронке.
 */
export const EVENT_TYPES = {
  task: { category: 'knowledge', signal: false },
  study: { category: 'knowledge', signal: false },
  recall: { category: 'knowledge', signal: false },
  artifact: { category: 'evidence', signal: false },
  mock: { category: 'interview', signal: false },
  question: { category: 'interview', signal: false },
  note: { category: 'knowledge', signal: false },
  observation: { category: 'market', signal: false },
  application: { category: 'market', signal: false, funnel: 'applications' },
  response: { category: 'result', signal: true, funnel: 'responses' },
  screening: { category: 'result', signal: true, funnel: 'screenings' },
  interview: { category: 'result', signal: true, funnel: 'interviews' },
  technical: { category: 'result', signal: true, funnel: 'technical' },
  test_task: { category: 'result', signal: true },
  feedback: { category: 'result', signal: true },
  rejection: { category: 'result', signal: true },
  offer: { category: 'result', signal: true, funnel: 'offers' },
  milestone: { category: 'result', signal: false }
};

export const FUNNEL_STAGES = ['applications', 'responses', 'screenings', 'interviews', 'technical', 'offers'];

export const isMarketSignal = (type) => Boolean(EVENT_TYPES[type]?.signal);

export const categoryOf = (type) => EVENT_TYPES[type]?.category || 'knowledge';

export const createInitialState = (startDate = todayISO()) => ({
  version: CURRENT_VERSION,
  settings: {
    theme: 'system',
    mode: 'personal',
    lastBackupAt: null
  },
  campaign: {
    id: CAMPAIGN.id,
    startDate,
    duration: CAMPAIGN.duration,
    createdAt: new Date().toISOString(),
    completedAt: null
  },
  tasks: {},
  events: [],
  days: {},
  topics: {},
  questions: {},
  artifacts: {},
  milestones: {},
  parkingLot: [],
  history: []
});

const isPlainObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

/**
 * Проверка импортируемого файла (§60). Возвращает список проблем;
 * пустой список означает, что файл можно применять.
 */
export const validateState = (candidate) => {
  const problems = [];

  if (!isPlainObject(candidate)) {
    return ['root'];
  }
  if (typeof candidate.version !== 'number' || candidate.version < 1) {
    problems.push('version');
  }
  if (candidate.version > CURRENT_VERSION) {
    problems.push('versionTooNew');
  }
  if (!isPlainObject(candidate.campaign)) {
    problems.push('campaign');
  } else {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(candidate.campaign.startDate || ''))) {
      problems.push('campaign.startDate');
    }
    if (!Number.isFinite(candidate.campaign.duration) || candidate.campaign.duration < 1) {
      problems.push('campaign.duration');
    }
  }
  if (!Array.isArray(candidate.events)) {
    problems.push('events');
  } else if (candidate.events.some((event) => !isPlainObject(event) || !event.id || !event.type)) {
    problems.push('events.shape');
  }
  ['tasks', 'days', 'topics', 'questions', 'artifacts', 'milestones', 'settings'].forEach((key) => {
    if (candidate[key] !== undefined && !isPlainObject(candidate[key])) {
      problems.push(key);
    }
  });
  if (candidate.parkingLot !== undefined && !Array.isArray(candidate.parkingLot)) {
    problems.push('parkingLot');
  }
  if (candidate.history !== undefined && !Array.isArray(candidate.history)) {
    problems.push('history');
  }

  return problems;
};

/** Достраивает отсутствующие ветки, чтобы старые бэкапы не роняли UI. */
export const normalizeState = (candidate) => {
  const base = createInitialState(candidate?.campaign?.startDate);
  return {
    ...base,
    ...candidate,
    version: CURRENT_VERSION,
    settings: { ...base.settings, ...(candidate.settings || {}) },
    campaign: { ...base.campaign, ...(candidate.campaign || {}) },
    tasks: candidate.tasks || {},
    events: Array.isArray(candidate.events) ? candidate.events : [],
    days: candidate.days || {},
    topics: candidate.topics || {},
    questions: candidate.questions || {},
    artifacts: candidate.artifacts || {},
    milestones: candidate.milestones || {},
    parkingLot: Array.isArray(candidate.parkingLot) ? candidate.parkingLot : [],
    history: Array.isArray(candidate.history) ? candidate.history : []
  };
};
