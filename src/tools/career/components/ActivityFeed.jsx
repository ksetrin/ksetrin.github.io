import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { groupedActivity } from '../utils/metrics';
import { isMarketSignal } from '../store/schema';
import { normalizeLang, pickLang } from '../utils/content';
import { formatFullDate, todayISO, addDays } from '../utils/date';
import { Empty, Panel } from './Primitives';

/**
 * Экран истории (§15). Отвечает на вопрос «что я вообще сделал за две недели»,
 * поэтому события сгруппированы по дням и подписаны человеческими датами.
 */
const ActivityFeed = ({ limit = 40, removable = false }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign, actions } = useCareer();

  const groups = groupedActivity(state, campaign, limit);
  const today = todayISO();
  const yesterday = addDays(today, -1);

  const heading = (date, day) => {
    if (date === today) return t('career.activity.today');
    if (date === yesterday) return t('career.activity.yesterday');
    return `${formatFullDate(date, lang)}${day ? ` · ${t('career.timeline.dayTitle', { day })}` : ''}`;
  };

  return (
    <Panel id="cc-activity" title={t('career.activity.title')}>
      {groups.length === 0 ? (
        <Empty>{t('career.activity.empty')}</Empty>
      ) : (
        <div className="cc-activity">
          {groups.map((group) => (
            <div className="cc-activity__group" key={group.date}>
              <h3 className="cc-activity__date">{heading(group.date, group.day)}</h3>
              <ul className="cc-event-list">
                {group.events.map((event) => (
                  <li key={event.id} className={isMarketSignal(event.type) ? 'cc-event--signal' : ''}>
                    <span className="cc-event__tick" aria-hidden="true">
                      ✓
                    </span>
                    <span className="cc-event__type">{t(`career.eventTypes.${event.type}`)}</span>
                    <span className="cc-event__title">
                      {event.title ? pickLang(event.title, lang) : event.metadata?.note || ''}
                    </span>
                    {removable && (
                      <button
                        type="button"
                        className="cc-btn cc-btn--tiny"
                        onClick={() => actions.removeEvent(event.id)}
                        aria-label={t('career.actions.remove')}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
};

export default ActivityFeed;
