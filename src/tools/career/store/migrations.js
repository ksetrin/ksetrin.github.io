/**
 * Миграции состояния (§30, §61).
 *
 * Каждая миграция принимает состояние версии N и возвращает состояние версии N+1.
 * Инструмент живёт месяцами — механизм должен существовать с первой версии,
 * даже когда мигрировать ещё нечего.
 */

import { CURRENT_VERSION, normalizeState } from './schema';

const MIGRATIONS = {
  // 1: (state) => ({ ...state, version: 2, ... })
};

export const needsMigration = (state) => Number(state?.version || 0) < CURRENT_VERSION;

export const migrate = (state) => {
  let current = state;
  let guard = 0;

  while (Number(current.version || 0) < CURRENT_VERSION) {
    const from = Number(current.version || 0);
    const step = MIGRATIONS[from];
    if (!step) {
      // Неизвестная старая версия: нормализуем и помечаем текущей.
      current = { ...current, version: CURRENT_VERSION };
      break;
    }
    current = step(current);
    if (++guard > 50) {
      throw new Error('Migration loop detected');
    }
  }

  return normalizeState(current);
};
