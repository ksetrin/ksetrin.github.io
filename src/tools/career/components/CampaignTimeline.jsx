import React from 'react';
import { useTranslation } from 'react-i18next';

import { getMilestone } from '../content/milestones';
import { getDay } from '../content/campaign';
import { useCareer } from '../store/CareerStore';
import { campaignDaysProgress, continuity } from '../utils/metrics';
import { formatDate } from '../utils/date';
import { normalizeLang, pickLang } from '../utils/content';
import { Panel } from './Primitives';

const CONTINUITY_GLYPH = { full: '●', partial: '◐', empty: '○' };

/**
 * Лента дней (§9): не Gantt, а сетка состояний.
 * Каждый день — кнопка: открывает журнал дня.
 */
const CampaignTimeline = ({ dayNumber, onOpenDay }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign } = useCareer();

  const days = campaignDaysProgress(state, campaign, dayNumber);
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  const recent = continuity(state, campaign, dayNumber, 7);

  return (
    <Panel
      id="cc-timeline"
      title={t('career.timeline.title')}
      aside={
        <span className="cc-continuity" aria-label={t('career.timeline.continuityLabel')}>
          <span className="cc-continuity__caption">{t('career.timeline.last7')}</span>
          {recent.map((entry) => (
            <span
              key={entry.day}
              className={`cc-continuity__dot cc-continuity__dot--${entry.level}${entry.hasSignal ? ' cc-continuity__dot--signal' : ''}`}
              title={t('career.timeline.dayTitle', { day: entry.day })}
            >
              {CONTINUITY_GLYPH[entry.level]}
            </span>
          ))}
        </span>
      }
    >
      <div className="cc-timeline" role="list">
        {weeks.map((week, index) => (
          <div className="cc-timeline__week" key={index} role="listitem">
            <span className="cc-timeline__week-label">{t('career.timeline.week', { week: index + 1 })}</span>
            <div className="cc-timeline__days">
              {week.map((entry) => {
                const milestoneId = getDay(entry.day)?.milestone;
                const milestone = milestoneId ? getMilestone(milestoneId) : null;
                const achieved = milestoneId ? Boolean(state.milestones?.[milestoneId]?.achievedAt) : false;
                const label = [
                  t('career.timeline.dayTitle', { day: entry.day }),
                  formatDate(entry.date, lang),
                  t(`career.dayStates.${entry.state}`),
                  entry.hasSignal ? t('career.dayStates.MARKET_SIGNAL') : null,
                  milestone ? pickLang(milestone.label, lang) : null
                ]
                  .filter(Boolean)
                  .join(' · ');

                return (
                  <button
                    key={entry.day}
                    type="button"
                    className={[
                      'cc-day',
                      `cc-day--${entry.state.toLowerCase()}`,
                      entry.isFuture ? 'cc-day--future' : '',
                      entry.isToday ? 'cc-day--today' : '',
                      entry.hasSignal ? 'cc-day--signal' : '',
                      milestone ? 'cc-day--milestone' : '',
                      achieved ? 'cc-day--achieved' : ''
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => onOpenDay(entry.day)}
                    aria-label={label}
                    title={label}
                  >
                    <span className="cc-day__number">{String(entry.day).padStart(2, '0')}</span>
                    <span className="cc-day__mark" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ul className="cc-legend">
        {['EMPTY', 'STARTED', 'ACTIVE', 'COMPLETE', 'GREAT'].map((key) => (
          <li key={key}>
            <span className={`cc-legend__swatch cc-day--${key.toLowerCase()}`} aria-hidden="true" />
            {t(`career.dayStates.${key}`)}
          </li>
        ))}
        <li>
          <span className="cc-legend__swatch cc-legend__swatch--signal" aria-hidden="true" />
          {t('career.dayStates.MARKET_SIGNAL')}
        </li>
        <li>
          <span className="cc-legend__swatch cc-legend__swatch--milestone" aria-hidden="true" />
          {t('career.timeline.milestone')}
        </li>
      </ul>
    </Panel>
  );
};

export default CampaignTimeline;
