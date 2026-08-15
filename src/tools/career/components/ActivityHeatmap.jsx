import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { activityHeatmap } from '../utils/metrics';
import { formatDate } from '../utils/date';
import { normalizeLang } from '../utils/content';
import { Panel } from './Primitives';

/**
 * Спокойная heatmap (§16): интенсивность — количество следов за день,
 * без крупных чисел и без соревнования.
 */
const ActivityHeatmap = () => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign } = useCareer();

  const cells = activityHeatmap(state, campaign);
  const weeks = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return (
    <Panel id="cc-heatmap" title={t('career.heatmap.title')}>
      <div className="cc-heatmap" role="img" aria-label={t('career.heatmap.aria')}>
        {weeks.map((week, index) => (
          <div className="cc-heatmap__col" key={index}>
            {week.map((cell) => (
              <span
                key={cell.day}
                className={`cc-heatmap__cell cc-heatmap__cell--${cell.level}${cell.hasSignal ? ' cc-heatmap__cell--signal' : ''}`}
                title={`${formatDate(cell.date, lang)} · ${t('career.heatmap.traces', { n: cell.traces })}`}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="cc-hint">{t('career.heatmap.hint')}</p>
    </Panel>
  );
};

export default ActivityHeatmap;
