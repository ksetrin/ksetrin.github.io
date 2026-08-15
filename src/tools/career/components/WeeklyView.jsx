import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getWeek } from '../content/campaign';
import { useCareer } from '../store/CareerStore';
import { weekSummary, weekMovement } from '../utils/metrics';
import { weekOfDay } from '../utils/date';
import { normalizeLang, pickLang } from '../utils/content';
import { Panel } from './Primitives';

const ARROWS = { up: '↑', down: '↓', flat: '→' };

/** Недельный экран и ретроспектива (§42, §43). */
const WeeklyView = ({ dayNumber }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign } = useCareer();

  const currentWeek = weekOfDay(dayNumber);
  const [week, setWeek] = useState(currentWeek);
  const totalWeeks = Math.ceil(campaign.duration / 7);

  const summary = weekSummary(state, campaign, week);
  const movement = weekMovement(state, campaign, week);
  const meta = getWeek(week);

  const outcomes = summary.events.filter((event) =>
    ['application', 'artifact', 'mock', 'study', 'recall'].includes(event.type)
  );

  return (
    <Panel
      id="cc-week"
      title={t('career.week.title', { week })}
      aside={
        <span className="cc-week__nav">
          <button
            type="button"
            className="cc-btn cc-btn--tiny"
            onClick={() => setWeek((value) => Math.max(1, value - 1))}
            disabled={week <= 1}
            aria-label={t('career.week.previous')}
          >
            ←
          </button>
          <button
            type="button"
            className="cc-btn cc-btn--tiny"
            onClick={() => setWeek((value) => Math.min(totalWeeks, value + 1))}
            disabled={week >= totalWeeks}
            aria-label={t('career.week.next')}
          >
            →
          </button>
        </span>
      }
    >
      {meta && (
        <p className="cc-week__focus">
          {pickLang(meta.focus, lang)}
          <span className="cc-modal__sep">·</span>
          {t('career.week.output')}: {pickLang(meta.output, lang)}
        </p>
      )}

      <ul className="cc-week__streams">
        {summary.streams.map((stream) => (
          <li key={stream.key}>
            <span className="cc-week__stream-label">{t(`career.week.streams.${stream.key}`)}</span>
            <span className="cc-week__stream-value">
              {stream.done} / {stream.total}
            </span>
          </li>
        ))}
      </ul>

      <div className="cc-week__split">
        <div>
          <h3 className="cc-modal__section">{t('career.week.outcome')}</h3>
          {outcomes.length ? (
            <ul className="cc-week__outcome">
              {outcomes.slice(0, 8).map((event) => (
                <li key={event.id}>
                  ✓ {t(`career.eventTypes.${event.type}`)}
                  {event.title ? ` — ${pickLang(event.title, lang)}` : ''}
                </li>
              ))}
            </ul>
          ) : (
            <p className="cc-empty">{t('career.week.noOutcome')}</p>
          )}

          {summary.signals.length > 0 && (
            <p className="cc-week__signal">
              {t('career.week.signal')}:{' '}
              {summary.signals.map((event) => t(`career.eventTypes.${event.type}`)).join(', ')}
            </p>
          )}
        </div>

        <div>
          <h3 className="cc-modal__section">{t('career.week.moved')}</h3>
          <ul className="cc-week__movement">
            {movement.map((item) => (
              <li key={item.key}>
                <span>{t(`career.streams.${item.key}`)}</span>
                <span className={`cc-arrow cc-arrow--${item.direction}`} aria-label={t(`career.week.directions.${item.direction}`)}>
                  {ARROWS[item.direction]}
                </span>
              </li>
            ))}
          </ul>
          <p className="cc-hint">
            {t('career.week.nonZero', { n: summary.nonZero, total: summary.days.length })}
          </p>
        </div>
      </div>
    </Panel>
  );
};

export default WeeklyView;
