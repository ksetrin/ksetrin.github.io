import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { campaignSummary } from '../utils/metrics';
import { todayISO } from '../utils/date';
import { Panel } from './Primitives';

const ROWS = [
  'applications',
  'responses',
  'interviews',
  'offers',
  'topics',
  'artifacts',
  'questions',
  'mocks',
  'nonZeroDays',
  'signals'
];

/**
 * Финальный экран (ч.2 §150). Не «поздравляем», а сводка данных,
 * на которых строится следующий цикл (§151).
 */
const CampaignComplete = ({ onContinue }) => {
  const { t } = useTranslation();
  const { state, campaign, actions } = useCareer();

  const summary = campaignSummary(state, campaign);

  return (
    <Panel id="cc-complete" className="cc-panel--complete" title={t('career.complete.title')}>
      <p className="cc-complete__lead">{t('career.complete.lead', { days: campaign.duration })}</p>

      <dl className="cc-complete__grid">
        {ROWS.map((key) => (
          <div key={key}>
            <dt>{t(`career.complete.rows.${key}`)}</dt>
            <dd>{summary[key]}</dd>
          </div>
        ))}
      </dl>

      <div className="cc-start__actions">
        <button type="button" className="cc-btn" onClick={onContinue}>
          {t('career.complete.continue')}
        </button>
        <button
          type="button"
          className="cc-btn cc-btn--primary"
          onClick={() => {
            if (window.confirm(t('career.complete.confirmNew'))) {
              actions.startNewCampaign(todayISO(), campaign.duration);
            }
          }}
        >
          {t('career.complete.startNew')}
        </button>
      </div>

      <p className="cc-hint">{t('career.complete.note')}</p>
    </Panel>
  );
};

export default CampaignComplete;
