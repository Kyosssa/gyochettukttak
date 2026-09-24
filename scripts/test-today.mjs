import assert from 'node:assert/strict';
import fs from 'node:fs';
import { onRequest } from '../functions/api/today-visitors.js';
import { TODAY_STORAGE_KEY, loadTodayVisitors, seoulDate } from '../public/today-visitors.mjs';

const read = (file) => fs.readFileSync(file, 'utf8');
const kstDate = seoulDate();

function dbMock({ selectRow = null, postRow = { count: 7 }, throws = false } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      calls.push({ type: 'prepare', sql });
      return {
        bind(...values) {
          calls.push({ type: 'bind', values });
          return {
            async first() {
              if (throws) throw new Error('private SQL failure');
              return sql.startsWith('SELECT') ? selectRow : postRow;
            }
          };
        }
      };
    }
  };
}

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), values };
}

async function json(response) { return response.json(); }

// GET reads only, returns an empty count, and never performs an increment.
{
  const DB = dbMock();
  const response = await onRequest({ request: new Request('https://example.test/api/today-visitors'), env: { DB } });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await json(response), { date: kstDate, count: 0 });
  assert.equal(DB.calls.filter((call) => call.type === 'prepare').length, 1);
  assert.match(DB.calls[0].sql, /^SELECT /);
  assert.equal(DB.calls.some((call) => /INSERT|UPDATE|ON CONFLICT/.test(call.sql ?? '')), false);
}

// POST increments exactly once; the request body has no influence on the server date or bound values.
{
  const DB = dbMock({ postRow: { count: 11 } });
  const request = new Request('https://example.test/api/today-visitors?query=private', {
    method: 'POST', body: JSON.stringify({ date: '1900-01-01', query: 'secret-search', model: 'secret-model', vehicle: 'secret-car' })
  });
  const response = await onRequest({ request, env: { DB } });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await json(response), { date: kstDate, count: 11 });
  assert.equal(DB.calls.filter((call) => call.type === 'prepare').length, 1);
  assert.match(DB.calls[0].sql, /^INSERT /);
  const bound = DB.calls.find((call) => call.type === 'bind').values.join('|');
  assert.equal(/1900-01-01|secret-search|secret-model|secret-car/.test(bound), false);
}

// Unsupported methods must not touch D1.
{
  const DB = dbMock();
  const response = await onRequest({ request: new Request('https://example.test/api/today-visitors', { method: 'PUT' }), env: { DB } });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, POST');
  assert.equal(DB.calls.length, 0);
}

// D1 errors are safe and reveal neither SQL nor private values.
{
  const response = await onRequest({ request: new Request('https://example.test/api/today-visitors'), env: { DB: dbMock({ throws: true }) } });
  assert.equal(response.status, 503);
  const body = await response.text();
  assert.equal(/SQL|private/i.test(body), false);
}

// Client behavior: POST once per tab/day, then only GET; next day is eligible again.
{
  const element = { textContent: 'TODAY —' };
  const saved = storage();
  const methods = [];
  const fetchImpl = async (_url, options) => { methods.push(options.method); return new Response(JSON.stringify({ date: kstDate, count: 3 })); };
  await loadTodayVisitors({ element, storage: saved, fetchImpl });
  await loadTodayVisitors({ element, storage: saved, fetchImpl });
  assert.deepEqual(methods, ['POST', 'GET']);
  assert.equal(saved.values.get(TODAY_STORAGE_KEY), kstDate);
  const tomorrow = new Date(Date.now() + 36 * 60 * 60 * 1000);
  const tomorrowDate = seoulDate(tomorrow);
  await loadTodayVisitors({ element, storage: saved, fetchImpl: async (_url, options) => { methods.push(options.method); return new Response(JSON.stringify({ date: tomorrowDate, count: 4 })); }, now: tomorrow });
  assert.equal(methods.at(-1), 'POST');
}

// Disabled storage performs only a safe GET; API failure leaves the explicit fallback in place.
{
  const element = { textContent: 'TODAY —' };
  const unavailable = { getItem() { throw new Error('disabled'); }, setItem() { throw new Error('disabled'); } };
  let method = '';
  await loadTodayVisitors({ element, storage: unavailable, fetchImpl: async (_url, options) => { method = options.method; throw new Error('offline'); } });
  assert.equal(method, 'GET');
  assert.equal(element.textContent, 'TODAY —');
}

const privacy = read('src/pages/privacy.astro');
for (const phrase of ['고유 사용자 수가 아닌', '한국 날짜 기준', '익명 브라우저 탭 세션', 'sessionStorage', '날짜, 누적 횟수, 마지막 갱신 시각', 'IP 주소', 'User-Agent', '쿠키', 'fingerprint', '검색어', '페이지 URL', '모델명', '차종', 'My Home', 'TODAY —']) assert.ok(privacy.includes(phrase), `privacy missing: ${phrase}`);

const config = read('wrangler.jsonc');
assert.ok(config.includes('gyochettukttak-visitors-preview'));
assert.ok(config.includes('gyochettukttak-visitors-prod'));
assert.ok(config.includes('138bb09d-d1d9-4a8f-bbcf-65d1be985598'));
assert.ok(config.includes('5f797c22-a34c-42ee-a0b2-419ff2cfeb11'));
assert.notEqual('138bb09d-d1d9-4a8f-bbcf-65d1be985598', '5f797c22-a34c-42ee-a0b2-419ff2cfeb11');

const htmlFiles = fs.readdirSync('dist', { recursive: true }).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = read(`dist/${file}`);
  assert.equal((html.match(/id="today-visitors"/g) ?? []).length, 1, `TODAY footer count: ${file}`);
  assert.equal((html.match(/src="\/today\.js"/g) ?? []).length, 1, `TODAY script count: ${file}`);
}
assert.equal((read('dist/sitemap.xml').match(/<loc>/g) ?? []).length, 21);
const headerRules = read('public/_headers');
assert.ok(headerRules.includes('https://gyochettukttak.pages.dev/*'));
assert.ok(headerRules.includes('https://:version.gyochettukttak.pages.dev/*'));
assert.equal(headerRules.includes('https://gyochettukttak.com/*'), false);

console.log('PASS TODAY handler, client, privacy, and D1 environment tests');
