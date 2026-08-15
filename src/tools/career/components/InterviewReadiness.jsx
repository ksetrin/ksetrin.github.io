import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { interviewReadiness } from '../utils/metrics';
import { Bar, Panel } from './Primitives';

/**
 * Interview readiness (§20). Формула намеренно простая и объяснимая:
 * это индикатор подготовки, а не вероятность пройти интервью.
 */
const InterviewReadiness = ({ detailed = false }) => {
  const { t } = useTranslation();
  const { state } = useCareer();

  const readiness = interviewReadiness(state);

  return (
    <Panel
      id="cc-readiness"
      title={t('career.readiness.title')}
      aside={<span className="cc-count">{readiness.total}%</span>}
    >
      <Bar percent={readiness.total} tone="accent" label={t('career.readiness.aria', { percent: readiness.total })} />

      <ul className="cc-readiness">
        {readiness.parts.map((part) => (
          <li key={part.key}>
            <span className="cc-readiness__label">
              {t(`career.readiness.parts.${part.key}`)}
              <span className="cc-readiness__weight">{part.weight}%</span>
            </span>
            <span className="cc-readiness__value">{part.percent}%</span>
          </li>
        ))}
      </ul>

      {detailed && <p className="cc-hint">{t('career.readiness.disclaimer')}</p>}
    </Panel>
  );
};

export default InterviewReadiness;
