import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { normalizeLang } from '../utils/content';
import { formatFullDate, relativeDays, todayISO } from '../utils/date';
import { Panel } from '../components/Primitives';

const THEMES = ['system', 'light', 'dark'];

const CareerSettings = () => {
  const { t, i18n } = useTranslation();
  const lang = normalizeLang(i18n.language);
  const { state, campaign, actions } = useCareer();

  const [startDate, setStartDate] = useState(campaign.startDate);
  const [duration, setDuration] = useState(campaign.duration);
  const [importMessage, setImportMessage] = useState(null);
  const fileRef = useRef(null);

  const lastBackup = state.settings.lastBackupAt;
  const backupAge = lastBackup ? relativeDays(lastBackup.slice(0, 10), todayISO()) : null;

  const onFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = actions.restoreFromBackup(text);
    setImportMessage(
      result.ok
        ? { tone: 'ok', text: t('career.settings.importOk') }
        : { tone: 'warning', text: t(`career.settings.importErrors.${result.reason}`, t('career.settings.importErrors.invalid')) }
    );
    event.target.value = '';
  };

  return (
    <>
      <Panel id="cc-settings-campaign" title={t('career.settings.campaign')}>
        <form
          className="cc-settings__form"
          onSubmit={(event) => {
            event.preventDefault();
            actions.updateCampaign({ startDate, duration: Number(duration) || campaign.duration });
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
            {t('career.actions.save')}
          </button>
        </form>
      </Panel>

      <Panel id="cc-settings-view" title={t('career.settings.appearance')}>
        <div className="cc-field cc-field--inline">
          <span className="cc-field__label">{t('career.settings.theme')}</span>
          <div className="cc-filter" role="radiogroup" aria-label={t('career.settings.theme')}>
            {THEMES.map((theme) => (
              <button
                key={theme}
                type="button"
                role="radio"
                aria-checked={state.settings.theme === theme}
                className={`cc-filter__btn ${state.settings.theme === theme ? 'cc-filter__btn--active' : ''}`}
                onClick={() => actions.updateSettings({ theme })}
              >
                {t(`career.settings.themes.${theme}`)}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <Panel id="cc-settings-data" title={t('career.settings.data')}>
        <p className="cc-hint">{t('career.settings.dataHint')}</p>

        <p className="cc-backup">
          {lastBackup
            ? t('career.settings.lastBackup', {
                date: formatFullDate(lastBackup.slice(0, 10), lang),
                days: backupAge
              })
            : t('career.settings.noBackup')}
        </p>

        <div className="cc-start__actions">
          <button type="button" className="cc-btn cc-btn--primary" onClick={actions.exportData}>
            {t('career.settings.export')}
          </button>
          <button type="button" className="cc-btn" onClick={() => fileRef.current?.click()}>
            {t('career.settings.import')}
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={onFile} hidden />
        </div>

        {importMessage && (
          <p className={`cc-alert cc-alert--${importMessage.tone}`} role="status">
            {importMessage.text}
          </p>
        )}
      </Panel>

      <Panel id="cc-settings-danger" className="cc-panel--danger" title={t('career.settings.danger')}>
        <div className="cc-start__actions">
          <button
            type="button"
            className="cc-btn cc-btn--warning"
            onClick={() => {
              if (window.confirm(t('career.settings.confirmReset'))) {
                actions.resetCampaign();
              }
            }}
          >
            {t('career.settings.reset')}
          </button>
          <button
            type="button"
            className="cc-btn cc-btn--warning"
            onClick={() => {
              if (window.confirm(t('career.settings.confirmDelete'))) {
                actions.deleteAllData();
              }
            }}
          >
            {t('career.settings.deleteAll')}
          </button>
        </div>
        <p className="cc-hint">{t('career.settings.dangerHint')}</p>
      </Panel>

      <Panel id="cc-settings-privacy" title={t('career.settings.privacy')}>
        <p className="cc-hint">{t('career.settings.privacyText')}</p>
      </Panel>
    </>
  );
};

export default CareerSettings;
