export const TODAY_STORAGE_KEY = 'gyochettukttak:today-counted';

export function seoulDate(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(now).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export async function loadTodayVisitors({ element, storage, fetchImpl = fetch, now = new Date() }) {
  if (!element) return;
  const day = seoulDate(now);
  let method = 'GET';
  try { if (storage?.getItem(TODAY_STORAGE_KEY) !== day) method = 'POST'; } catch { /* storage unavailable */ }
  try {
    const response = await fetchImpl('/api/today-visitors', { method, headers: { accept: 'application/json' }, cache: 'no-store', credentials: 'omit' });
    if (!response.ok) return;
    const result = await response.json();
    if (!/^\d{4}-\d\d-\d\d$/.test(result.date) || !Number.isSafeInteger(result.count)) return;
    element.textContent = `TODAY ${result.count.toLocaleString('en-US')}`;
    if (method === 'POST') try { storage?.setItem(TODAY_STORAGE_KEY, day); } catch { /* no-op */ }
  } catch { /* Keep the initial TODAY — fallback without affecting the page. */ }
}

let initialization;
export function startTodayVisitors(options = {}) {
  if (initialization) return initialization;
  const element = options.element ?? document.querySelector('#today-visitors');
  initialization = loadTodayVisitors({ element, storage: options.storage ?? sessionStorage, fetchImpl: options.fetchImpl ?? fetch, now: options.now ?? new Date() });
  return initialization;
}
