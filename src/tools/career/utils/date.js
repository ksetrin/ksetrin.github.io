const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Локальная дата в формате YYYY-MM-DD (без сдвига по UTC). */
export const toISODate = (date = new Date()) => {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const todayISO = () => toISODate(new Date());

/** Полночь локального дня — база для всех вычислений разницы в днях. */
const startOfDay = (iso) => {
  const [year, month, day] = String(iso).split('-').map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
};

export const isValidISODate = (value) =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(startOfDay(value).getTime());

export const diffInDays = (fromISO, toISO) =>
  Math.round((startOfDay(toISO) - startOfDay(fromISO)) / MS_PER_DAY);

export const addDays = (iso, amount) => {
  const date = startOfDay(iso);
  date.setDate(date.getDate() + amount);
  return toISODate(date);
};

/** Номер дня кампании: 1 в день старта. Может выйти за duration — это допустимо. */
export const campaignDayNumber = (startDate, referenceISO = todayISO()) => {
  if (!isValidISODate(startDate)) return 1;
  return diffInDays(startDate, referenceISO) + 1;
};

export const dayToDate = (startDate, dayNumber) => addDays(startDate, dayNumber - 1);

export const weekOfDay = (dayNumber) => Math.floor((dayNumber - 1) / 7) + 1;

export const daysOfWeek = (weekNumber) => {
  const first = (weekNumber - 1) * 7 + 1;
  return Array.from({ length: 7 }, (_, index) => first + index);
};

const LOCALES = { ru: 'ru-RU', en: 'en-US' };

export const formatDate = (iso, lang = 'ru', options = { day: 'numeric', month: 'short' }) => {
  if (!isValidISODate(iso)) return '';
  return startOfDay(iso).toLocaleDateString(LOCALES[lang] || LOCALES.ru, options);
};

export const formatFullDate = (iso, lang = 'ru') =>
  formatDate(iso, lang, { day: 'numeric', month: 'long', year: 'numeric' });

export const relativeDays = (iso, referenceISO = todayISO()) => diffInDays(iso, referenceISO);
