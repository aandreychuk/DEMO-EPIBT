export type Language = 'en' | 'ru';

const RU: Record<string, string> = {
  'Warehouse with orientations': 'Склад с ориентациями',
  'Warehouse map': 'Карта склада',
  'Warehouse map with oriented agents': 'Карта склада с ориентациями агентов',
  'Import JSON': 'Загрузить JSON',
  'Export JSON': 'Выгрузить JSON',
  'Pickup bay': 'Зона забора',
  'Delivery bay': 'Зона доставки',
  'Agent': 'Агент',
  'With cargo': 'С грузом',
  'Loading EPIBT…': 'Загрузка EPIBT…',
  'Completed deliveries': 'Доставок',
  'Planning, ms': 'Планирование, мс',
  'Heading': 'Ориентация',
  'Last action': 'Последнее действие',
  'Planning priority': 'Приоритет при планировании',
  'Previous agent': 'Предыдущий агент',
  'Next agent': 'Следующий агент',
  'Planning horizon': 'Горизонт планирования',
  'Changing the planning horizon…': 'Смена горизонта планирования…',
  'Could not change the planning horizon.': 'Не удалось изменить горизонт планирования.',
  'Cells travelled': 'Пройдено клеток',
  'Turns': 'Поворотов',
  'Wait ticks': 'Тактов ожидания',
  'Single step': 'Один шаг',
  'Forward': 'Вперёд',
  'Turn right': 'Поворот вправо',
  'Turn left': 'Поворот влево',
  'Delivery': 'Доставка',
  'East': 'восток',
  'South': 'юг',
  'West': 'запад',
  'North': 'север',
  'Running': 'В работе',
  'Paused': 'Пауза',
  'EPIBT stopped': 'EPIBT остановлен',
  'Could not start the EPIBT worker.': 'Не удалось запустить EPIBT.',
  'The JSON file is larger than 1 MB.': 'Файл JSON больше 1 МБ.',
  'The file does not contain valid JSON.': 'В файле некорректный JSON.',
  'Could not read the JSON file.': 'Не удалось прочитать файл JSON.',
  'Expected an EPIBT warehouse JSON file.': 'Выберите JSON-файл конфигурации склада с ориентациями.',
  'The map must have 2–40 rows.': 'На карте должно быть от 2 до 40 строк.',
  'The map must have 2–48 columns and use only #, ., S and D.': 'На карте должно быть от 2 до 48 столбцов. Допустимые символы — #, ., S и D.',
  'The warehouse must have 1–200 agents.': 'Укажите от 1 до 200 агентов.',
  'Place at least one pickup and one delivery bay.': 'Добавьте хотя бы одну зону забора и одну зону доставки.',
  'Connect all pickup and delivery bays by aisles.': 'Соедините все зоны забора и доставки проходами.',
  'There are too few reachable cells for this many agents.': 'Для такого числа агентов не хватает доступных клеток.',
  'Edit map': 'Редактировать карту',
  'Map editor': 'Редактор карты',
  '↶ Undo edit': '↶ Отменить правку',
  'Warehouse preset': 'Готовая конфигурация',
  'Custom layout': 'Своя карта',
  'Rack rows': 'Стеллажные ряды',
  'Central junction': 'Центральный перекрёсток',
  'Narrow aisles': 'Узкие проходы',
  'Staggered gates': 'Смещённые ворота',
  'Switchback lanes': 'Серпантин',
  'Nested loops': 'Кольцевые маршруты',
  'Paint cells': 'Тип клетки',
  'Obstacle': 'Препятствие',
  'Click or drag on the map to paint.': 'Нажмите на клетку или проведите по карте.',
  'Editable warehouse map. Use arrow keys and Space to paint.': 'Карта склада. Стрелки перемещают курсор, пробел меняет клетку.',
  'EPIBT is not ready.': 'EPIBT ещё не готов.',
  'EPIBT returned an invalid move.': 'EPIBT вернул недопустимый ход.',
  'QR links': 'QR-ссылки',
  'Demo links': 'Ссылки на демо',
  'Explore EPIBT': 'Подробнее об EPIBT',
  'Code': 'Код',
  'Live demo': 'Демо',
  'Paper': 'Статья',
  'Open the method implementation': 'Открыть реализацию метода',
  'Open the live demo': 'Открыть демо',
  'Open the paper': 'Открыть статью',
  'QR code for the EPIBT implementation': 'QR-код реализации EPIBT',
  'QR code for the live demo': 'QR-код демо',
  'QR code for the paper': 'QR-код статьи',
  'Pickup': 'Забор',
  'Position': 'Позиция',
  'Live telemetry': 'Телеметрия',
  'Throughput': 'Пропускная способность',
  'Tasks per step': 'задач/шаг',
  'Environment steps': 'Шаги среды',
  'Agents': 'Агенты',
  'Number of agents': 'Число агентов',
  'Aisle': 'Проход',
  'Cancel': 'Отмена',
  'Apply & restart': 'Применить и перезапустить',
  'Pause': 'Пауза',
  'Run': 'Продолжить',
  'Stop': 'Стоп',
  'Speed': 'Скорость',
  'Agent {id}': 'Агент {id}',
  'Wait': 'Ожидать',
};

const COUNT_FORMS = {
  agents: {
    en: ['agent', 'agents'],
    ru: ['агент', 'агента', 'агентов'],
  },
  stepsPerSecond: {
    en: ['step/s', 'steps/s'],
    ru: ['шаг/с', 'шага/с', 'шагов/с'],
  },
} as const;

export type CountLabel = keyof typeof COUNT_FORMS;
const russianPluralRules = new Intl.PluralRules('ru-RU');

function storedLanguage(): Language {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'ru' || fromUrl === 'en') return fromUrl;
  try { return localStorage.getItem('demo-epibt-language') === 'ru' ? 'ru' : 'en'; }
  catch { return 'en'; }
}

let language = storedLanguage();
let initialized = false;
let englishTitle = '';
const textBindings: Array<{ node: Text; english: string }> = [];
const attributeBindings: Array<{ node: Element; name: string; english: string }> = [];

export function tr(english: string): string { return language === 'ru' ? RU[english] ?? english : english; }
export function formatNumber(value: number): string { return value.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US'); }
export function countLabel(count: number, label: CountLabel): string {
  const forms = COUNT_FORMS[label];
  if (language === 'en') return forms.en[count === 1 ? 0 : 1];
  const category = russianPluralRules.select(count);
  return forms.ru[category === 'one' ? 0 : category === 'few' ? 1 : 2];
}
export function formatCount(count: number, label: CountLabel): string {
  return `${formatNumber(count)} ${countLabel(count, label)}`;
}
export function formatFixed(value: number, digits: number): string {
  return value.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
export function fmt(english: string, values: Record<string, string | number>): string {
  return tr(english).replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return typeof value === 'number' ? formatNumber(value) : String(value ?? '');
  });
}

function applyLanguage(): void {
  document.documentElement.lang = language;
  document.title = tr(englishTitle);
  for (const { node, english } of textBindings) {
    if (!node.isConnected) continue;
    const trimmed = english.trim();
    node.data = trimmed ? english.replace(trimmed, tr(trimmed)) : english;
  }
  for (const { node, name, english } of attributeBindings) if (node.isConnected) node.setAttribute(name, tr(english));
  for (const button of document.querySelectorAll<HTMLButtonElement>('.lang-toggle')) {
    button.textContent = language === 'ru' ? 'EN' : 'RU';
    button.title = language === 'ru' ? 'Переключить на английский' : 'Переключить на русский';
    button.setAttribute('aria-label', button.title);
  }
}

export function setLanguage(next: Language): void {
  if (next === language) return;
  language = next;
  try { localStorage.setItem('demo-epibt-language', language); } catch { /* Private browsing may disable storage. */ }
  const url = new URL(location.href);
  if (language === 'ru') url.searchParams.set('lang', 'ru');
  else url.searchParams.delete('lang');
  history.replaceState(history.state, '', url);
  applyLanguage();
  window.dispatchEvent(new Event('demo:languagechange'));
}

export function initI18n(): void {
  if (initialized) return;
  initialized = true;
  try { localStorage.setItem('demo-epibt-language', language); } catch { /* Private browsing may disable storage. */ }
  englishTitle = document.title;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.parentElement?.closest('script, style')) continue;
    if (RU[node.data.trim()]) textBindings.push({ node, english: node.data });
  }
  for (const node of document.querySelectorAll('*')) {
    for (const name of ['aria-label', 'title', 'alt', 'placeholder']) {
      const english = node.getAttribute(name);
      if (english && RU[english]) attributeBindings.push({ node, name, english });
    }
  }
  for (const button of document.querySelectorAll<HTMLButtonElement>('.lang-toggle')) {
    button.addEventListener('click', () => setLanguage(language === 'ru' ? 'en' : 'ru'));
  }
  applyLanguage();
}
