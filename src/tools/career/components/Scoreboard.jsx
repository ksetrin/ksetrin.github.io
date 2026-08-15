import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { scoreboard, nonZeroDays } from '../utils/metrics';
import { Metric, Panel } from './Primitives';

const Scoreboard = ({ dayNumber }) => {
  const { t } = useTranslation();
  const { state, campaign } = useCareer();

  const rows = scoreboard(state, campaign, dayNumber);
  const nz = nonZeroDays(state, campaign, dayNumber);

  return (
    <Panel
      id="cc-score"
      title={t('career.scoreboard.title')}
      aside={
        <span className="cc-nonzero" title={t('career.scoreboard.nonZeroHint')}>
          {t('career.scoreboard.nonZero')} <b>{nz.count}</b> / {nz.elapsed}
        </span>
      }
    >
      <div className="cc-metrics">
        {rows.map((row) => (
          <Metric
            key={row.key}
            label={t(`career.scoreboard.metrics.${row.key}`)}
            current={row.current}
            target={row.target}
            percent={row.percent}
            tone={row.key === 'day' ? 'muted' : 'accent'}
          />
        ))}
      </div>
    </Panel>
  );
};

export default Scoreboard;
