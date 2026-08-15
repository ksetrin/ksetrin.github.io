/**
 * Производные метрики (§69). Ничего из этого не хранится —
 * всё считается из tasks + events + topics + artifacts.
 */

import { CAMPAIGN, TARGETS, getDay, allTasksForDay } from '../content/campaign';
import { TOPICS } from '../content/topics';
import { QUESTIONS } from '../content/questions';
import { ARTIFACTS, stageIndex } from '../content/artifacts';
import { MILESTONES } from '../content/milestones';
import { FUNNEL_STAGES, EVENT_TYPES, isMarketSignal } from '../store/schema';
import { campaignDayNumber, dayToDate, todayISO, weekOfDay, daysOfWeek } from './date';

export const DAY_STATES = ['EMPTY', 'STARTED', 'ACTIVE', 'COMPLETE', 'GREAT'];

export const clampPercent = (value) => Math.max(0, Math.min(100, Math.round(value)));

export const ratio = (current, target) => (target > 0 ? clampPercent((current / target) * 100) : 0);

/** Текущий день кампании, ограниченный длительностью: после финала кампания не «ломается» (§28). */
export const currentDayNumber = (campaign, reference = todayISO()) => {
  const raw = campaignDayNumber(campaign.startDate, reference);
  return Math.max(1, Math.min(campaign.duration, raw));
};

export const rawDayNumber = (campaign, reference = todayISO()) =>
  campaignDayNumber(campaign.startDate, reference);

export const isCampaignComplete = (campaign, reference = todayISO()) =>
  rawDayNumber(campaign, reference) > campaign.duration;

export const isTaskDone = (state, taskId) => Boolean(state.tasks?.[taskId]?.doneAt);

export const doneTaskIdsForDay = (state, dayNumber) =>
  allTasksForDay(dayNumber)
    .filter((task) => isTaskDone(state, task.id))
    .map((task) => task.id);

export const eventsOnDate = (state, iso) => state.events.filter((event) => event.date === iso);

export const eventsOnDay = (state, campaign, dayNumber) =>
  eventsOnDate(state, dayToDate(campaign.startDate, dayNumber));

/**
 * Состояние дня (§10). MARKET SIGNAL — не отдельная ступень прогресса,
 * а флаг поверх состояния: день с внешним сигналом выделяется сильнее всего.
 */
export const dayProgress = (state, campaign, dayNumber) => {
  const content = getDay(dayNumber);
  const must = content?.must || [];
  const optional = [...(content?.should || []), ...(content?.bonus || [])];
  const doneMust = must.filter((task) => isTaskDone(state, task.id)).length;
  const doneOptional = optional.filter((task) => isTaskDone(state, task.id)).length;
  const events = eventsOnDay(state, campaign, dayNumber);
  const hasSignal = events.some((event) => isMarketSignal(event.type));
  const traces = doneMust + doneOptional + events.length;

  let dayState = 'EMPTY';
  if (must.length && doneMust >= must.length) {
    dayState = doneOptional > 0 ? 'GREAT' : 'COMPLETE';
  } else if (must.length && doneMust >= Math.ceil(must.length / 2)) {
    dayState = 'ACTIVE';
  } else if (traces > 0) {
    dayState = 'STARTED';
  }

  return {
    day: dayNumber,
    date: dayToDate(campaign.startDate, dayNumber),
    state: dayState,
    hasSignal,
    doneMust,
    totalMust: must.length,
    doneOptional,
    totalOptional: optional.length,
    events: events.length,
    /** День «жив», если оставил хотя бы один след (§12, ч.2 §4). */
    nonZero: traces > 0
  };
};

export const campaignDaysProgress = (state, campaign, upToDay) => {
  const limit = Math.min(campaign.duration, Math.max(1, upToDay));
  return Array.from({ length: campaign.duration }, (_, index) => {
    const dayNumber = index + 1;
    const progress = dayProgress(state, campaign, dayNumber);
    return { ...progress, isFuture: dayNumber > limit, isToday: dayNumber === limit };
  });
};

export const nonZeroDays = (state, campaign, upToDay) => {
  const days = campaignDaysProgress(state, campaign, upToDay).filter((entry) => !entry.isFuture);
  return { count: days.filter((entry) => entry.nonZero).length, elapsed: days.length };
};

export const funnel = (state) => {
  const counts = FUNNEL_STAGES.reduce((acc, stage) => ({ ...acc, [stage]: 0 }), {});
  state.events.forEach((event) => {
    const stage = EVENT_TYPES[event.type]?.funnel;
    if (stage) counts[stage] += 1;
  });
  return FUNNEL_STAGES.map((stage) => ({
    stage,
    count: counts[stage],
    target: TARGETS[stage] || 0
  }));
};

export const countEvents = (state, type) => state.events.filter((event) => event.type === type).length;

export const marketSignals = (state) => state.events.filter((event) => isMarketSignal(event.type));

export const confirmedTopics = (state) =>
  TOPICS.filter((topic) => state.topics?.[topic.id]?.status === 'CONFIRMED');

export const studyingTopics = (state) =>
  TOPICS.filter((topic) => state.topics?.[topic.id]?.status === 'STUDYING');

export const reviewedQuestions = (state) =>
  QUESTIONS.filter((question) => (state.questions?.[question.id]?.reviews || 0) > 0);

export const artifactsProgress = (state) =>
  ARTIFACTS.map((artifact) => {
    const stored = state.artifacts?.[artifact.id];
    return {
      ...artifact,
      stage: stored?.stage || 'IDEA',
      level: stageIndex(stored?.stage || 'IDEA'),
      url: stored?.url || '',
      updatedAt: stored?.updatedAt || null
    };
  });

export const publishedArtifacts = (state) =>
  artifactsProgress(state).filter((artifact) => artifact.level >= stageIndex('PUBLISHED'));

/** Центральное табло (§7). */
export const scoreboard = (state, campaign, dayNumber) => {
  const stages = funnel(state);
  const byStage = Object.fromEntries(stages.map((entry) => [entry.stage, entry.count]));

  return [
    { key: 'day', current: Math.min(dayNumber, campaign.duration), target: campaign.duration },
    { key: 'applications', current: byStage.applications, target: TARGETS.applications },
    { key: 'responses', current: byStage.responses, target: TARGETS.responses },
    { key: 'interviews', current: byStage.interviews, target: TARGETS.interviews },
    { key: 'artifacts', current: publishedArtifacts(state).length, target: TARGETS.artifacts },
    { key: 'topics', current: confirmedTopics(state).length, target: TARGETS.topics },
    { key: 'mocks', current: countEvents(state, 'mock'), target: TARGETS.mocks }
  ].map((entry) => ({ ...entry, percent: ratio(entry.current, entry.target) }));
};

/**
 * Interview readiness (§20). Это не «вероятность пройти интервью»,
 * а объяснимая взвешенная сумма четырёх счётчиков.
 */
export const READINESS_WEIGHTS = [
  { key: 'knowledge', weight: 40 },
  { key: 'questions', weight: 30 },
  { key: 'projects', weight: 20 },
  { key: 'mocks', weight: 10 }
];

export const interviewReadiness = (state) => {
  const parts = {
    knowledge: ratio(confirmedTopics(state).length, TARGETS.topics),
    questions: ratio(reviewedQuestions(state).length, TARGETS.questions),
    projects: ratio(publishedArtifacts(state).length, TARGETS.artifacts),
    mocks: ratio(countEvents(state, 'mock'), TARGETS.mocks)
  };

  const total = READINESS_WEIGHTS.reduce((sum, item) => sum + (parts[item.key] * item.weight) / 100, 0);

  return {
    total: clampPercent(total),
    parts: READINESS_WEIGHTS.map((item) => ({ ...item, percent: parts[item.key] }))
  };
};

/** Непрерывность кампании вместо streak (§11). */
export const continuity = (state, campaign, dayNumber, length = 7) => {
  const first = Math.max(1, dayNumber - length + 1);
  return Array.from({ length: dayNumber - first + 1 }, (_, index) => {
    const progress = dayProgress(state, campaign, first + index);
    return {
      day: progress.day,
      level: progress.state === 'EMPTY' ? 'empty' : progress.state === 'COMPLETE' || progress.state === 'GREAT' ? 'full' : 'partial',
      hasSignal: progress.hasSignal
    };
  });
};

const WEEK_STREAMS = {
  market: ['market'],
  learn: ['learn'],
  recall: ['recall'],
  build: ['build', 'evidence'],
  interview: ['interview']
};

/** Недельный экран (§42, §43). */
export const weekSummary = (state, campaign, weekNumber) => {
  const days = daysOfWeek(weekNumber).filter((day) => day <= campaign.duration);
  const tasks = days.flatMap((day) => allTasksForDay(day));

  const streams = Object.entries(WEEK_STREAMS).map(([key, types]) => {
    const scoped = tasks.filter((task) => types.includes(task.type));
    return {
      key,
      done: scoped.filter((task) => isTaskDone(state, task.id)).length,
      total: scoped.length
    };
  });

  const events = days.flatMap((day) => eventsOnDay(state, campaign, day));
  const dayStates = days.map((day) => dayProgress(state, campaign, day));

  return {
    week: weekNumber,
    days,
    streams,
    events,
    signals: events.filter((event) => isMarketSignal(event.type)),
    nonZero: dayStates.filter((entry) => entry.nonZero).length,
    complete: dayStates.filter((entry) => entry.state === 'COMPLETE' || entry.state === 'GREAT').length
  };
};

/** Что сдвинулось за неделю относительно предыдущей (§43). */
export const weekMovement = (state, campaign, weekNumber) => {
  const categoryCount = (week) => {
    if (week < 1) return {};
    const summary = weekSummary(state, campaign, week);
    const byCategory = { market: 0, evidence: 0, knowledge: 0, interview: 0 };
    summary.events.forEach((event) => {
      const category = EVENT_TYPES[event.type]?.category;
      if (category === 'result') {
        byCategory.market += 1;
      } else if (byCategory[category] !== undefined) {
        byCategory[category] += 1;
      }
    });
    summary.streams.forEach((stream) => {
      if (stream.key === 'market') byCategory.market += stream.done;
      if (stream.key === 'learn' || stream.key === 'recall') byCategory.knowledge += stream.done;
      if (stream.key === 'build') byCategory.evidence += stream.done;
      if (stream.key === 'interview') byCategory.interview += stream.done;
    });
    return byCategory;
  };

  const current = categoryCount(weekNumber);
  const previous = categoryCount(weekNumber - 1);

  return ['market', 'evidence', 'knowledge', 'interview'].map((key) => {
    const now = current[key] || 0;
    const before = previous[key] || 0;
    let direction = 'flat';
    if (weekNumber === 1) {
      direction = now > 0 ? 'up' : 'flat';
    } else if (now > before) {
      direction = 'up';
    } else if (now < before) {
      direction = 'down';
    }
    return { key, direction, current: now, previous: before };
  });
};

/** Данные для спокойной heatmap (§16): интенсивность = количество следов, не часы. */
export const activityHeatmap = (state, campaign) => {
  const cells = campaignDaysProgress(state, campaign, campaign.duration).map((entry) => {
    const traces = entry.doneMust + entry.doneOptional + entry.events;
    let level = 0;
    if (traces >= 1) level = 1;
    if (traces >= 3) level = 2;
    if (traces >= 5) level = 3;
    return { ...entry, traces, level };
  });

  return cells;
};

export const groupedActivity = (state, campaign, limit = 60) => {
  const sorted = [...state.events].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, limit);
  const groups = new Map();
  sorted.forEach((event) => {
    if (!groups.has(event.date)) groups.set(event.date, []);
    groups.get(event.date).push(event);
  });
  return Array.from(groups.entries()).map(([date, events]) => ({
    date,
    day: events[0]?.day ?? null,
    events
  }));
};

/** Career changelog (§47): вехи плюс заметные события кампании. */
export const changelog = (state, campaign) => {
  const entries = [];

  MILESTONES.forEach((milestone) => {
    const stored = state.milestones?.[milestone.id];
    if (stored?.achievedAt) {
      entries.push({
        kind: 'milestone',
        id: milestone.id,
        day: stored.day ?? null,
        date: stored.achievedAt.slice(0, 10),
        milestone
      });
    }
  });

  state.events
    .filter((event) => ['artifact', 'mock', 'offer', 'technical', 'interview', 'screening'].includes(event.type))
    .forEach((event) => {
      entries.push({ kind: 'event', id: event.id, day: event.day, date: event.date, event });
    });

  return entries.sort((a, b) => (a.date === b.date ? (b.day || 0) - (a.day || 0) : a.date < b.date ? 1 : -1));
};

/** Итоговая сводка кампании (ч.2 §150). */
export const campaignSummary = (state, campaign) => {
  const stages = Object.fromEntries(funnel(state).map((entry) => [entry.stage, entry.count]));
  const nz = nonZeroDays(state, campaign, campaign.duration);
  return {
    duration: campaign.duration,
    applications: stages.applications,
    responses: stages.responses,
    interviews: stages.interviews,
    offers: stages.offers,
    topics: confirmedTopics(state).length,
    artifacts: publishedArtifacts(state).length,
    questions: reviewedQuestions(state).length,
    mocks: countEvents(state, 'mock'),
    nonZeroDays: nz.count,
    signals: marketSignals(state).length
  };
};

export const campaignMeta = () => CAMPAIGN;

export const weekOf = weekOfDay;
