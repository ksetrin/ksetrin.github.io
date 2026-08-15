import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { Panel } from './Primitives';

/**
 * Быстрые действия (§26): событие добавляется за пару секунд,
 * без обязательной формы. Комментарий не требуется.
 */
const ACTIONS = [
  { type: 'application', tone: 'accent' },
  { type: 'response', tone: 'signal' },
  { type: 'screening', tone: 'signal' },
  { type: 'interview', tone: 'signal' },
  { type: 'technical', tone: 'signal' },
  { type: 'rejection', tone: 'muted' },
  { type: 'offer', tone: 'signal' },
  { type: 'study', tone: 'accent' },
  { type: 'recall', tone: 'accent' },
  { type: 'mock', tone: 'accent' },
  { type: 'artifact', tone: 'accent' },
  { type: 'observation', tone: 'muted' }
];

const QuickActions = ({ dayNumber }) => {
  const { t } = useTranslation();
  const { actions } = useCareer();
  const [pending, setPending] = useState(null);
  const [note, setNote] = useState('');
  const [flash, setFlash] = useState(null);

  const record = (type, metadata = {}) => {
    actions.addEvent({ eventType: type, day: dayNumber, metadata });
    setFlash(type);
    window.setTimeout(() => setFlash((current) => (current === type ? null : current)), 1600);
  };

  const submitDetail = (event) => {
    event.preventDefault();
    if (!pending) return;
    const trimmed = note.trim();
    record(pending, trimmed ? { note: trimmed } : {});
    setPending(null);
    setNote('');
  };

  return (
    <Panel id="cc-quick" className="cc-panel--quick" title={t('career.quick.title')}>
      <p className="cc-hint">{t('career.quick.hint')}</p>
      <div className="cc-quick__grid">
        {ACTIONS.map((action) => (
          <button
            key={action.type}
            type="button"
            className={`cc-chip cc-chip--${action.tone} ${flash === action.type ? 'cc-chip--flash' : ''}`}
            onClick={() => record(action.type)}
            onContextMenu={(event) => {
              event.preventDefault();
              setPending(action.type);
            }}
          >
            + {t(`career.eventTypes.${action.type}`)}
          </button>
        ))}
      </div>

      <div className="cc-quick__detail">
        {pending ? (
          <form onSubmit={submitDetail} className="cc-inline-form">
            <label htmlFor="cc-quick-note" className="cc-inline-form__label">
              {t('career.quick.noteFor', { type: t(`career.eventTypes.${pending}`) })}
            </label>
            <select
              value={pending}
              onChange={(event) => setPending(event.target.value)}
              aria-label={t('career.quick.typeLabel')}
              className="cc-inline-form__select"
            >
              {ACTIONS.map((action) => (
                <option key={action.type} value={action.type}>
                  {t(`career.eventTypes.${action.type}`)}
                </option>
              ))}
            </select>
            <input
              id="cc-quick-note"
              type="text"
              value={note}
              autoFocus
              onChange={(event) => setNote(event.target.value)}
              placeholder={t('career.quick.notePlaceholder')}
            />
            <button type="submit" className="cc-btn cc-btn--primary">
              {t('career.actions.add')}
            </button>
            <button
              type="button"
              className="cc-btn"
              onClick={() => {
                setPending(null);
                setNote('');
              }}
            >
              {t('career.actions.cancel')}
            </button>
          </form>
        ) : (
          <button type="button" className="cc-btn cc-btn--ghost" onClick={() => setPending('application')}>
            {t('career.quick.withNote')}
          </button>
        )}
      </div>
    </Panel>
  );
};

export default QuickActions;
