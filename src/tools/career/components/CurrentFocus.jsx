import React from 'react';
import { useTranslation } from 'react-i18next';

import { getWeek } from '../content/campaign';
import { useCareer } from '../store/CareerStore';
import { weekOfDay } from '../utils/date';
import { normalizeLang, pickLang } from '../utils/content';

/**
 * Anti-drift indicator (§44, §45): при открытии инструмента человек
 * должен сразу вспомнить, чем он вообще сейчас занимается.
 */
const CurrentFocus = ({ dayNumber }) => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { content } = useCareer();

  const week = getWeek(weekOfDay(dayNumber));

  return (
    <section className="cc-focus" aria-label={t('career.focus.title')}>
      <p className="cc-focus__label">{t('career.focus.title')}</p>
      <h2 className="cc-focus__value">{pickLang(content.focus, lang)}</h2>
      {week && (
        <p className="cc-focus__week">
          {t('career.timeline.week', { week: week.week })}: {pickLang(week.focus, lang)}
        </p>
      )}
      <ul className="cc-focus__streams">
        {(content.streams[lang] || content.streams.ru).map((stream) => (
          <li key={stream}>{stream}</li>
        ))}
      </ul>
    </section>
  );
};

export default CurrentFocus;
