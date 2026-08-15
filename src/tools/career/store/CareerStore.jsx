import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { CAMPAIGN, getDay, allTasksForDay } from '../content/campaign';
import { MILESTONES } from '../content/milestones';
import { REVIEW_INTERVALS } from '../content/topics';
import { categoryOf, isMarketSignal } from './schema';
import {
  loadCareerState,
  saveCareerState,
  clearCareerState,
  startFreshState,
  parseImportedState,
  serializeState,
  exportFileName
} from './storage';
import { addDays, todayISO } from '../utils/date';
import { currentDayNumber, rawDayNumber } from '../utils/metrics';

const CareerContext = createContext(null);

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

const dayNumberFor = (campaign, iso) => {
  const raw = rawDayNumber(campaign, iso);
  return Math.max(1, Math.min(campaign.duration, raw));
};

/**
 * Вехи начисляются автоматически из первичных данных (§21, §70):
 * дневные — когда закрыты все обязательные задачи дня,
 * сигнальные — когда впервые появилось событие нужного типа.
 */
const applyMilestones = (state) => {
  const achieved = { ...state.milestones };
  let changed = false;

  MILESTONES.forEach((milestone) => {
    if (achieved[milestone.id]?.achievedAt) return;

    if (milestone.trigger === 'day') {
      const content = getDay(milestone.day);
      const must = content?.must || [];
      const done = must.length > 0 && must.every((task) => state.tasks?.[task.id]?.doneAt);
      if (done) {
        achieved[milestone.id] = { achievedAt: new Date().toISOString(), day: milestone.day };
        changed = true;
      }
      return;
    }

    const match = state.events.find((event) =>
      milestone.signal === 'response'
        ? isMarketSignal(event.type) && event.type !== 'rejection'
        : event.type === milestone.signal
    );
    if (match) {
      achieved[milestone.id] = { achievedAt: new Date().toISOString(), day: match.day ?? null };
      changed = true;
    }
  });

  return changed ? { ...state, milestones: achieved } : state;
};

/** Расписание активного повторения темы (ч.2 §26). */
const scheduleReviews = (fromISO) => REVIEW_INTERVALS.map((offset) => addDays(fromISO, offset));

/** Экспортируется отдельно от провайдера: вся логика переходов проверяема без DOM. */
export const careerReducer = (state, action) => {
  switch (action.type) {
    case 'replace':
      return action.state;

    case 'toggleTask': {
      const { taskId, dayNumber } = action;
      const tasks = { ...state.tasks };
      const events = [...state.events];
      const topics = { ...state.topics };
      const questions = { ...state.questions };
      const content = getDay(dayNumber);
      const task = allTasksForDay(dayNumber).find((item) => item.id === taskId);
      const date = todayISO();

      if (tasks[taskId]?.doneAt) {
        delete tasks[taskId];
        const next = events.filter((event) => event.taskId !== taskId);
        return applyMilestones({ ...state, tasks, events: next });
      }

      tasks[taskId] = { doneAt: new Date().toISOString(), day: dayNumber };

      events.unshift({
        id: createId(),
        taskId,
        date,
        day: dayNumber,
        type: 'task',
        category: categoryOf('task'),
        title: task?.title || { ru: 'Задача', en: 'Task' },
        status: 'done',
        metadata: { taskType: task?.type || 'task', tier: task?.tier || 'must' },
        createdAt: new Date().toISOString()
      });

      // Изучение темы поднимает её статус NEW → STUDYING и заводит расписание повторений.
      if (task?.type === 'learn') {
        (content?.topics || []).forEach((topicId) => {
          const existing = topics[topicId];
          if (!existing || existing.status === 'NEW') {
            topics[topicId] = {
              status: 'STUDYING',
              startedAt: date,
              lastReviewAt: date,
              reviews: 1,
              schedule: scheduleReviews(date)
            };
          }
        });
      }

      // Закрепление засчитывает вопросы дня и продвигает повторение тем.
      if (task?.type === 'recall') {
        (content?.questions || []).forEach((questionId) => {
          const existing = questions[questionId] || { reviews: 0 };
          questions[questionId] = {
            reviews: existing.reviews + 1,
            lastReviewAt: date
          };
        });
        (content?.topics || []).forEach((topicId) => {
          if (topics[topicId]) {
            topics[topicId] = {
              ...topics[topicId],
              lastReviewAt: date,
              reviews: (topics[topicId].reviews || 0) + 1
            };
          }
        });
      }

      if (task?.type === 'interview' && /mock/i.test(String(task?.title?.en || ''))) {
        events.unshift({
          id: createId(),
          date,
          day: dayNumber,
          type: 'mock',
          category: categoryOf('mock'),
          title: task.title,
          status: 'done',
          metadata: { fromTask: taskId },
          createdAt: new Date().toISOString()
        });
      }

      return applyMilestones({ ...state, tasks, events, topics, questions });
    }

    case 'addEvent': {
      const date = action.date || todayISO();
      const event = {
        id: createId(),
        date,
        day: action.day ?? dayNumberFor(state.campaign, date),
        type: action.eventType,
        category: categoryOf(action.eventType),
        title: action.title || null,
        status: action.status || 'done',
        metadata: action.metadata || {},
        createdAt: new Date().toISOString()
      };
      return applyMilestones({ ...state, events: [event, ...state.events] });
    }

    case 'removeEvent':
      return { ...state, events: state.events.filter((event) => event.id !== action.id) };

    case 'setDayLog': {
      const days = { ...state.days, [action.day]: { ...(state.days[action.day] || {}), ...action.patch } };
      return { ...state, days };
    }

    case 'setTopicStatus': {
      const date = todayISO();
      const existing = state.topics[action.topicId] || { reviews: 0 };
      const topics = {
        ...state.topics,
        [action.topicId]: {
          ...existing,
          status: action.status,
          lastReviewAt: date,
          reviews: (existing.reviews || 0) + (action.countsAsReview ? 1 : 0),
          schedule: existing.schedule || scheduleReviews(date)
        }
      };
      return applyMilestones({ ...state, topics });
    }

    case 'markQuestionReviewed': {
      const existing = state.questions[action.questionId] || { reviews: 0 };
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.questionId]: { reviews: existing.reviews + 1, lastReviewAt: todayISO() }
        }
      };
    }

    case 'setArtifact': {
      const artifacts = {
        ...state.artifacts,
        [action.artifactId]: {
          ...(state.artifacts[action.artifactId] || {}),
          ...action.patch,
          updatedAt: new Date().toISOString()
        }
      };
      const next = { ...state, artifacts };
      if (action.patch.stage) {
        const date = todayISO();
        next.events = [
          {
            id: createId(),
            date,
            day: dayNumberFor(state.campaign, date),
            type: 'artifact',
            category: categoryOf('artifact'),
            title: action.label || null,
            status: action.patch.stage,
            metadata: { artifactId: action.artifactId, stage: action.patch.stage },
            createdAt: new Date().toISOString()
          },
          ...state.events
        ];
      }
      return applyMilestones(next);
    }

    case 'addParkingItem':
      return {
        ...state,
        parkingLot: [{ id: createId(), text: action.text, createdAt: new Date().toISOString() }, ...state.parkingLot]
      };

    case 'removeParkingItem':
      return { ...state, parkingLot: state.parkingLot.filter((item) => item.id !== action.id) };

    case 'updateSettings':
      return { ...state, settings: { ...state.settings, ...action.patch } };

    case 'updateCampaign':
      return { ...state, campaign: { ...state.campaign, ...action.patch } };

    case 'startNewCampaign': {
      const fresh = startFreshState(action.startDate || todayISO());
      return {
        ...fresh,
        settings: state.settings,
        parkingLot: state.parkingLot,
        campaign: { ...fresh.campaign, duration: action.duration || state.campaign.duration },
        history: [
          ...state.history,
          {
            campaign: { ...state.campaign, completedAt: new Date().toISOString() },
            tasks: state.tasks,
            events: state.events,
            days: state.days,
            topics: state.topics,
            questions: state.questions,
            artifacts: state.artifacts,
            milestones: state.milestones
          }
        ]
      };
    }

    case 'resetCampaign': {
      const fresh = startFreshState(state.campaign.startDate);
      return {
        ...fresh,
        settings: state.settings,
        campaign: state.campaign,
        history: state.history
      };
    }

    default:
      return state;
  }
};

const resolveTheme = (preference) => {
  if (preference === 'light' || preference === 'dark') return preference;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const CareerProvider = ({ children }) => {
  const initial = useRef(null);
  if (initial.current === null) {
    initial.current = loadCareerState();
  }

  const [status, setStatus] = useState(initial.current.status);
  const [loadError] = useState(initial.current.error || null);
  const [state, dispatch] = useReducer(careerReducer, initial.current.state || startFreshState());
  const [today, setToday] = useState(todayISO());
  const [systemTheme, setSystemTheme] = useState(() => resolveTheme('system'));

  // Пишем только когда состояние действительно принадлежит пользователю:
  // повреждённое хранилище не перезаписывается, пока он не выбрал действие (§58).
  useEffect(() => {
    if (status === 'ok') {
      saveCareerState(state);
    }
  }, [state, status]);

  // Дата может смениться, пока вкладка открыта — день кампании должен догнать её сам.
  useEffect(() => {
    const tick = () => setToday(todayISO());
    const timer = window.setInterval(tick, 60 * 1000);
    window.addEventListener('focus', tick);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', tick);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(query.matches ? 'dark' : 'light');
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const theme = state.settings.theme === 'system' ? systemTheme : state.settings.theme;

  const beginCampaign = useCallback((startDate, duration) => {
    const fresh = startFreshState(startDate || todayISO());
    if (duration) fresh.campaign.duration = duration;
    dispatch({ type: 'replace', state: fresh });
    setStatus('ok');
  }, []);

  const restoreFromBackup = useCallback((jsonText) => {
    const result = parseImportedState(jsonText);
    if (!result.ok) return result;
    dispatch({ type: 'replace', state: result.state });
    setStatus('ok');
    return result;
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([serializeState(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    dispatch({ type: 'updateSettings', patch: { lastBackupAt: new Date().toISOString() } });
  }, [state]);

  const deleteAllData = useCallback(() => {
    clearCareerState();
    const fresh = startFreshState();
    dispatch({ type: 'replace', state: fresh });
    setStatus('empty');
  }, []);

  const dayNumber = useMemo(() => currentDayNumber(state.campaign, today), [state.campaign, today]);
  const rawDay = useMemo(() => rawDayNumber(state.campaign, today), [state.campaign, today]);

  const value = useMemo(
    () => ({
      status,
      loadError,
      state,
      campaign: state.campaign,
      content: CAMPAIGN,
      today,
      dayNumber,
      rawDay,
      isComplete: rawDay > state.campaign.duration,
      theme,
      actions: {
        toggleTask: (taskId, day) => dispatch({ type: 'toggleTask', taskId, dayNumber: day }),
        addEvent: (payload) => dispatch({ type: 'addEvent', ...payload }),
        removeEvent: (id) => dispatch({ type: 'removeEvent', id }),
        setDayLog: (day, patch) => dispatch({ type: 'setDayLog', day, patch }),
        setTopicStatus: (topicId, statusValue, countsAsReview) =>
          dispatch({ type: 'setTopicStatus', topicId, status: statusValue, countsAsReview }),
        markQuestionReviewed: (questionId) => dispatch({ type: 'markQuestionReviewed', questionId }),
        setArtifact: (artifactId, patch, label) => dispatch({ type: 'setArtifact', artifactId, patch, label }),
        addParkingItem: (text) => dispatch({ type: 'addParkingItem', text }),
        removeParkingItem: (id) => dispatch({ type: 'removeParkingItem', id }),
        updateSettings: (patch) => dispatch({ type: 'updateSettings', patch }),
        updateCampaign: (patch) => dispatch({ type: 'updateCampaign', patch }),
        startNewCampaign: (startDate, duration) => dispatch({ type: 'startNewCampaign', startDate, duration }),
        resetCampaign: () => dispatch({ type: 'resetCampaign' }),
        beginCampaign,
        restoreFromBackup,
        exportData,
        deleteAllData
      }
    }),
    [status, loadError, state, today, dayNumber, rawDay, theme, beginCampaign, restoreFromBackup, exportData, deleteAllData]
  );

  return <CareerContext.Provider value={value}>{children}</CareerContext.Provider>;
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used inside CareerProvider');
  }
  return context;
};
