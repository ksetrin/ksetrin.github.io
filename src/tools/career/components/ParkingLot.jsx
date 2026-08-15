import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCareer } from '../store/CareerStore';
import { Empty, Panel } from './Primitives';

/**
 * Parking lot (§46). Контейнер для идей: попадание сюда не считается задачей
 * и не влияет ни на одну метрику — иначе он начал бы красть фокус.
 */
const ParkingLot = () => {
  const { t } = useTranslation();
  const { state, actions } = useCareer();
  const [draft, setDraft] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    actions.addParkingItem(text);
    setDraft('');
  };

  return (
    <Panel id="cc-parking" title={t('career.parking.title')}>
      <p className="cc-hint">{t('career.parking.hint')}</p>

      <form className="cc-inline-form" onSubmit={submit}>
        <label className="cc-visually-hidden" htmlFor="cc-parking-input">
          {t('career.parking.add')}
        </label>
        <input
          id="cc-parking-input"
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t('career.parking.placeholder')}
        />
        <button type="submit" className="cc-btn cc-btn--primary">
          {t('career.actions.add')}
        </button>
      </form>

      {state.parkingLot.length === 0 ? (
        <Empty>{t('career.parking.empty')}</Empty>
      ) : (
        <ul className="cc-parking">
          {state.parkingLot.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button
                type="button"
                className="cc-btn cc-btn--tiny"
                onClick={() => actions.removeParkingItem(item.id)}
                aria-label={t('career.actions.remove')}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
};

export default ParkingLot;
