import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { todayISO } from '../utils/date';

/** Первый запуск (§38): аккаунт не нужен, всё остаётся локально. */
const StartScreen = () => {
  const { t } = useTranslation();
  const { content, actions } = useCareer();
  const [startDate, setStartDate] = useState(todayISO());
  const [duration, setDuration] = useState(content.duration);
  const [importError, setImportError] = useState(null);
  const fileRef = useRef(null);

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = actions.restoreFromBackup(text);
    if (!result.ok) {
      setImportError(t(`career.settings.importErrors.${result.reason}`, t('career.settings.importErrors.invalid')));
    }
    event.target.value = '';
  };

  return (
    <div className="cc-start">
      <h2>{t('career.start.title')}</h2>
      <p className="cc-start__lead">{t('career.start.lead')}</p>

      <form
        className="cc-start__form"
        onSubmit={(event) => {
          event.preventDefault();
          actions.beginCampaign(startDate, Number(duration) || content.duration);
        }}
      >
        <label className="cc-field">
          <span className="cc-field__label">{t('career.settings.startDate')}</span>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
        </label>
        <label className="cc-field">
          <span className="cc-field__label">{t('career.settings.duration')}</span>
          <input
            type="number"
            min="7"
            max="365"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            required
          />
        </label>
        <button type="submit" className="cc-btn cc-btn--primary">
          {t('career.start.create')}
        </button>
      </form>

      <div className="cc-start__restore">
        <p className="cc-hint">{t('career.start.restoreHint')}</p>
        <button type="button" className="cc-btn" onClick={() => fileRef.current?.click()}>
          {t('career.settings.import')}
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={onFile} hidden />
        {importError && <p className="cc-alert cc-alert--warning">{importError}</p>}
      </div>
    </div>
  );
};

export default StartScreen;
