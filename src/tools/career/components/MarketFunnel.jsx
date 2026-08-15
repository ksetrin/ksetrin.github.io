import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { funnel } from '../utils/metrics';
import { Panel } from './Primitives';

/**
 * Воронка рынка (§17). Ширина полосы — доля от первой ступени,
 * чтобы сразу было видно, где именно теряется движение.
 */
const MarketFunnel = ({ compact = false }) => {
  const { t } = useTranslation();
  const { state } = useCareer();

  const stages = funnel(state);
  const top = Math.max(...stages.map((stage) => stage.count), 1);
  const applications = stages[0].count;
  const responses = stages[1].count;

  return (
    <Panel id="cc-funnel" title={t('career.funnel.title')}>
      <div className="cc-funnel">
        {stages.map((stage) => (
          <div className="cc-funnel__row" key={stage.stage}>
            <span className="cc-funnel__label">{t(`career.funnel.stages.${stage.stage}`)}</span>
            <span className="cc-funnel__bar" aria-hidden="true">
              <span className="cc-funnel__fill" style={{ width: `${(stage.count / top) * 100}%` }} />
            </span>
            <span className="cc-funnel__count">{stage.count}</span>
          </div>
        ))}
      </div>

      {!compact && (
        <p className="cc-hint">
          {applications === 0
            ? t('career.funnel.hintEmpty')
            : responses === 0 && applications >= 8
              ? t('career.funnel.hintPositioning', { applications })
              : t('career.funnel.hintDiagnostic')}
        </p>
      )}
    </Panel>
  );
};

export default MarketFunnel;
