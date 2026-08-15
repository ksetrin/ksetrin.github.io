import React from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { changelog } from '../utils/metrics';
import { normalizeLang, pickLang } from '../utils/content';
import { formatFullDate } from '../utils/date';
import { Empty, Panel } from './Primitives';

/**
 * Career changelog (§47, ч.2 §142). Читаемая история продвижения:
 * вехи выделены сильнее, но без геймификации — ценность остаётся инженерной (§48).
 */
const Changelog = () => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign } = useCareer();

  const entries = changelog(state, campaign);

  return (
    <Panel id="cc-changelog" title={t('career.changelog.title')}>
      {entries.length === 0 ? (
        <Empty>{t('career.changelog.empty')}</Empty>
      ) : (
        <ol className="cc-changelog">
          {entries.map((entry) =>
            entry.kind === 'milestone' ? (
              <li key={entry.id} className="cc-changelog__item cc-changelog__item--milestone">
                <span className="cc-changelog__day">
                  {entry.day ? t('career.timeline.dayTitle', { day: entry.day }) : formatFullDate(entry.date, lang)}
                </span>
                <span className="cc-changelog__label">{t('career.timeline.milestone')}</span>
                <strong>{pickLang(entry.milestone.label, lang)}</strong>
                <p>{pickLang(entry.milestone.description, lang)}</p>
              </li>
            ) : (
              <li key={entry.id} className="cc-changelog__item">
                <span className="cc-changelog__day">
                  {entry.day ? t('career.timeline.dayTitle', { day: entry.day }) : formatFullDate(entry.date, lang)}
                </span>
                <span className="cc-changelog__type">{t(`career.eventTypes.${entry.event.type}`)}</span>
                <span>
                  {entry.event.title ? pickLang(entry.event.title, lang) : entry.event.metadata?.note || ''}
                </span>
              </li>
            )
          )}
        </ol>
      )}
    </Panel>
  );
};

export default Changelog;
