import React from 'react';
import { useTranslation } from 'react-i18next';

import { MILESTONES } from '../content/milestones';
import { useCareer } from '../store/CareerStore';
import { normalizeLang, pickLang } from '../utils/content';
import { Panel } from './Primitives';

/** Вехи кампании (§21). Начисляются автоматически, отмечать вручную не нужно. */
const MilestoneTrack = () => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state } = useCareer();

  return (
    <Panel id="cc-milestones" title={t('career.milestones.title')}>
      <ol className="cc-milestones">
        {MILESTONES.map((milestone) => {
          const achieved = Boolean(state.milestones?.[milestone.id]?.achievedAt);
          return (
            <li key={milestone.id} className={`cc-milestones__item ${achieved ? 'cc-milestones__item--achieved' : ''}`}>
              <span className="cc-milestones__marker" aria-hidden="true" />
              <div>
                <p className="cc-milestones__label">
                  {pickLang(milestone.label, lang)}
                  <span className="cc-milestones__meta">
                    {milestone.trigger === 'day'
                      ? t('career.timeline.dayTitle', { day: milestone.day })
                      : t('career.milestones.bySignal')}
                  </span>
                </p>
                <p className="cc-milestones__desc">{pickLang(milestone.description, lang)}</p>
                <p className="cc-milestones__status">
                  {achieved ? t('career.milestones.achieved') : t('career.milestones.pending')}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
};

export default MilestoneTrack;
