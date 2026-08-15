/**
 * Единственный слой доступа к localStorage (§67, §68).
 * Компоненты никогда не обращаются к localStorage напрямую.
 */

import { STORAGE_KEY, CURRENT_VERSION, createInitialState, validateState, normalizeState } from './schema';
import { migrate, needsMigration } from './migrations';
import { todayISO } from '../utils/date';

const hasStorage = () => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
};

/**
 * @returns {{status: 'empty'|'ok'|'corrupted', state: object|null, error?: string}}
 * Повреждённое хранилище НЕ перезаписывается молча (§58) — решение принимает пользователь.
 */
export const loadCareerState = () => {
  if (!hasStorage()) {
    return { status: 'empty', state: null };
  }

  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return { status: 'corrupted', state: null, error: String(error) };
  }

  if (!raw) {
    return { status: 'empty', state: null };
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return { status: 'corrupted', state: null, error: String(error) };
  }

  const problems = validateState(parsed);
  if (problems.length) {
    return { status: 'corrupted', state: null, error: problems.join(', ') };
  }

  try {
    const state = needsMigration(parsed) ? migrate(parsed) : normalizeState(parsed);
    return { status: 'ok', state };
  } catch (error) {
    return { status: 'corrupted', state: null, error: String(error) };
  }
};

export const saveCareerState = (state) => {
  if (!hasStorage()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn('[career] could not persist state', error);
    return false;
  }
};

export const clearCareerState = () => {
  if (!hasStorage()) return false;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

export const startFreshState = (startDate = todayISO()) => createInitialState(startDate);

export const exportFileName = (date = todayISO()) => `career-control-center-${date}.json`;

export const serializeState = (state) =>
  JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);

/**
 * Разбирает и валидирует файл бэкапа. Существующие данные не трогаются,
 * пока результат не будет применён вызывающей стороной (§60).
 */
export const parseImportedState = (jsonText) => {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return { ok: false, reason: 'parse' };
  }

  const problems = validateState(parsed);
  if (problems.length) {
    return { ok: false, reason: problems.includes('versionTooNew') ? 'versionTooNew' : 'invalid', problems };
  }

  try {
    const state = needsMigration(parsed) ? migrate(parsed) : normalizeState(parsed);
    return { ok: true, state: { ...state, version: CURRENT_VERSION } };
  } catch {
    return { ok: false, reason: 'migration' };
  }
};
