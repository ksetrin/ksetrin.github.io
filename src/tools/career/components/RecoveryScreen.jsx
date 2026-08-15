import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { todayISO } from '../utils/date';

/**
 * Повреждённое хранилище (§58). Данные НЕ перезаписываются молча:
 * пока пользователь не выбрал действие, сохранение отключено.
 */
const RecoveryScreen = () => {
  const { t } = useTranslation();
  const { loadError, actions } = useCareer();
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
    <div className="cc-start cc-start--recovery">
      <h2>{t('career.recovery.title')}</h2>
      <p className="cc-start__lead">{t('career.recovery.lead')}</p>
      {loadError && <p className="cc-code">{loadError}</p>}

      <div className="cc-start__actions">
        <button type="button" className="cc-btn cc-btn--primary" onClick={() => fileRef.current?.click()}>
          {t('career.recovery.restore')}
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={onFile} hidden />
        <button type="button" className="cc-btn" onClick={() => actions.beginCampaign(todayISO())}>
          {t('career.recovery.startNew')}
        </button>
      </div>

      {importError && <p className="cc-alert cc-alert--warning">{importError}</p>}
      <p className="cc-hint">{t('career.recovery.note')}</p>
    </div>
  );
};

export default RecoveryScreen;
