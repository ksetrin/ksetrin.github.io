import React from 'react';
import { useTranslation } from 'react-i18next';

import { getDay } from '../content/campaign';
import { useCareer } from '../store/CareerStore';
import { pickLang, normalizeLang } from '../utils/content';
import { isTaskDone } from '../utils/metrics';
import { Panel } from './Primitives';

const TIERS = ['must', 'should', 'bonus'];

const TaskRow = ({ task, done, onToggle, lang, t }) => (
  <li className={`cc-task ${done ? 'cc-task--done' : ''}`}>
    <label className="cc-task__label">
      <input type="checkbox" checked={done} onChange={onToggle} />
      <span className="cc-task__check" aria-hidden="true" />
      <span className="cc-task__body">
        <span className="cc-task__type">{t(`career.taskTypes.${task.type}`)}</span>
        <span className="cc-task__title">{pickLang(task.title, lang)}</span>
      </span>
      {task.minutes ? (
        <span className="cc-task__minutes" title={t('career.today.estimateHint')}>
          ~{task.minutes}′
        </span>
      ) : null}
    </label>
  </li>
);

const TodayPanel = ({ dayNumber, compact = false }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, actions } = useCareer();

  const content = getDay(dayNumber);
  if (!content) return null;

  const must = content.must;
  const doneMust = must.filter((task) => isTaskDone(state, task.id)).length;
  const optional = [...content.should, ...content.bonus];
  const doneOptional = optional.filter((task) => isTaskDone(state, task.id)).length;

  return (
    <Panel
      id="cc-today"
      className="cc-panel--today"
      title={t('career.today.title')}
      aside={
        <span className="cc-count">
          {doneMust} / {must.length}
        </span>
      }
    >
      <p className="cc-today__focus">
        <span className="cc-today__day">{t('career.today.day', { day: dayNumber })}</span>
        <span className="cc-today__sep">·</span>
        {pickLang(content.focus, lang)}
      </p>

      {TIERS.map((tier) => {
        const tasks = content[tier];
        if (!tasks.length) return null;
        return (
          <div className="cc-tier" key={tier}>
            <h3 className="cc-tier__title">{t(`career.tiers.${tier}`)}</h3>
            <ul className="cc-task-list">
              {tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  lang={lang}
                  t={t}
                  done={isTaskDone(state, task.id)}
                  onToggle={() => actions.toggleTask(task.id, dayNumber)}
                />
              ))}
            </ul>
          </div>
        );
      })}

      {/* Система не наказывает: любой сделанный шаг оставляет день живым (§40). */}
      <p className="cc-today__note">
        {doneMust === 0 && doneOptional === 0
          ? t('career.today.noteZero')
          : doneMust >= must.length
            ? t('career.today.noteComplete')
            : t('career.today.notePartial', { done: doneMust + doneOptional })}
      </p>

      {/* Отдельно от текста — чтобы прогресс дня читался и без чтения фразы. */}
      <p className="cc-today__tally">
        {doneMust} / {must.length}
        {optional.length > 0 && (
          <span className="cc-today__tally-optional">
            {' '}
            + {doneOptional} / {optional.length}
          </span>
        )}
      </p>

      {!compact && content.milestone && (
        <p className="cc-today__milestone">{t('career.today.milestoneToday')}</p>
      )}
    </Panel>
  );
};

export default TodayPanel;
