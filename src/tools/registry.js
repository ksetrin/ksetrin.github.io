/**
 * Реестр раздела Tools. Каждый инструмент — самостоятельное приложение
 * внутри сайта: собственный роут, собственное состояние, никакого бэкенда.
 *
 * Строки берутся из i18n по ключу `tools.items.<key>.*`.
 */
export const tools = [
  {
    key: 'career',
    path: '/tools/career',
    status: 'live',
    year: '2026',
    tags: ['localStorage', 'React', 'CSS/SVG']
  }
];

export const getTool = (key) => tools.find((tool) => tool.key === key);
