import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { getDay } from '../content/campaign';
import { getMilestone } from '../content/milestones';
import { useCareer } from '../store/CareerStore';
import { dayProgress, isTaskDone } from '../utils/metrics';
import { dayToDate, formatFullDate } from '../utils/date';
import { normalizeLang, pickLang } from '../utils/content';

const SIGNAL_OPTIONS = ['', 'response', 'screening', 'interview', 'technical', 'test_task', 'feedback', 'rejection', 'offer'];

const REFLECTION_FIELDS = ['worked', 'didNotWork', 'clearer'];

/** Журнал дня (§13). Заметки необязательны — инструмент не заставляет вести дневник. */
const DayLogModal = ({ day, onClose }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign, actions } = useCareer();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  const content = getDay(day);
  const log = state.days?.[day] || {};
  const progress = dayProgress(state, campaign, day);
  const events = state.events.filter((event) => event.day === day);
  const milestone = content?.milestone ? getMilestone(content.milestone) : null;

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  if (!content) return null;

  const allTasks = [...content.must, ...content.should, ...content.bonus];

  return (
    <div className="cc-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="cc-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cc-day-title"
        ref={dialogRef}
      >
        <header className="cc-modal__head">
          <div>
            <h2 id="cc-day-title">{t('career.day.title', { day })}</h2>
            <p className="cc-modal__meta">
              {formatFullDate(dayToDate(campaign.startDate, day), lang)}
              <span className="cc-modal__sep">·</span>
              {pickLang(content.focus, lang)}
              <span className="cc-modal__sep">·</span>
              {t(`career.dayStates.${progress.state}`)}
            </p>
          </div>
          <button type="button" className="cc-btn cc-btn--icon" onClick={onClose} ref={closeRef} aria-label={t('career.actions.close')}>
            ✕
          </button>
        </header>

        <div className="cc-modal__body">
          {milestone && (
            <div className={`cc-milestone ${state.milestones?.[milestone.id]?.achievedAt ? 'cc-milestone--achieved' : ''}`}>
              <span className="cc-milestone__label">{t('career.timeline.milestone')}</span>
              <strong>{pickLang(milestone.label, lang)}</strong>
              <p>{pickLang(milestone.description, lang)}</p>
            </div>
          )}

          <section>
            <h3 className="cc-modal__section">{t('career.day.goals')}</h3>
            <ul className="cc-task-list">
              {allTasks.map((task) => (
                <li key={task.id} className={`cc-task ${isTaskDone(state, task.id) ? 'cc-task--done' : ''}`}>
                  <label className="cc-task__label">
                    <input
                      type="checkbox"
                      checked={isTaskDone(state, task.id)}
                      onChange={() => actions.toggleTask(task.id, day)}
                    />
                    <span className="cc-task__check" aria-hidden="true" />
                    <span className="cc-task__body">
                      <span className="cc-task__type">
                        {t(`career.taskTypes.${task.type}`)} · {t(`career.tiers.${task.tier}`)}
                      </span>
                      <span className="cc-task__title">{pickLang(task.title, lang)}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="cc-modal__section">{t('career.day.done')}</h3>
            {events.length ? (
              <ul className="cc-event-list">
                {events.map((event) => (
                  <li key={event.id}>
                    <span className="cc-event__type">{t(`career.eventTypes.${event.type}`)}</span>
                    <span className="cc-event__title">
                      {event.title ? pickLang(event.title, lang) : event.metadata?.note || ''}
                    </span>
                    <button
                      type="button"
                      className="cc-btn cc-btn--tiny"
                      onClick={() => actions.removeEvent(event.id)}
                      aria-label={t('career.actions.remove')}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cc-empty">{t('career.day.noEvents')}</p>
            )}
          </section>

          <section>
            <h3 className="cc-modal__section">{t('career.day.marketSignal')}</h3>
            <label className="cc-field">
              <span className="cc-field__label">{t('career.day.marketSignalHint')}</span>
              <select
                value=""
                onChange={(event) => {
                  if (!event.target.value) return;
                  actions.addEvent({
                    eventType: event.target.value,
                    day,
                    date: dayToDate(campaign.startDate, day)
                  });
                }}
              >
                {SIGNAL_OPTIONS.map((option) => (
                  <option key={option || 'none'} value={option}>
                    {option ? t(`career.eventTypes.${option}`) : t('career.day.selectSignal')}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section>
            <h3 className="cc-modal__section">{t('career.day.notes')}</h3>
            <textarea
              className="cc-textarea"
              rows={3}
              value={log.notes || ''}
              placeholder={t('career.day.notesPlaceholder')}
              onChange={(event) => actions.setDayLog(day, { notes: event.target.value })}
            />
          </section>

          <section>
            <h3 className="cc-modal__section">{t('career.day.reflection')}</h3>
            {REFLECTION_FIELDS.map((field) => (
              <label className="cc-field" key={field}>
                <span className="cc-field__label">{t(`career.day.reflectionFields.${field}`)}</span>
                <input
                  type="text"
                  value={log[field] || ''}
                  onChange={(event) => actions.setDayLog(day, { [field]: event.target.value })}
                />
              </label>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DayLogModal;
