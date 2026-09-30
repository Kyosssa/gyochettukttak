import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ANALYTICS_ID, CONSENT_KEY, cleanPageLocation, isOfficialAnalyticsOrigin, loadAnalytics, startAnalyticsConsent } from '../public/analytics-consent.mjs';

const official = { protocol: 'https:', hostname: 'gyochettukttak.com', origin: 'https://gyochettukttak.com', pathname: '/search/', search: '?q=%EC%B9%AB%EC%86%94' };
const createRuntime = () => {
  const scripts = [];
  const windowObject = {};
  const documentObject = {
    title: '검색어를 포함하지 않는 제목',
    head: { append: (node) => scripts.push(node) },
    createElement: () => ({ dataset: {} })
  };
  return { scripts, windowObject, documentObject };
};

assert.equal(ANALYTICS_ID, 'G-5X5CFLGLYQ');
assert.equal(isOfficialAnalyticsOrigin(official), true);
for (const location of [
  { protocol: 'https:', hostname: 'gyochettukttak.pages.dev' },
  { protocol: 'https:', hostname: 'aa4e25d8.gyochettukttak.pages.dev' },
  { protocol: 'https:', hostname: 'preview.gyochettukttak.pages.dev' },
  { protocol: 'http:', hostname: 'localhost' },
  { protocol: 'http:', hostname: '127.0.0.1' }
]) assert.equal(isOfficialAnalyticsOrigin(location), false, `blocked origin: ${location.hostname}`);
assert.equal(cleanPageLocation(official), 'https://gyochettukttak.com/search/');

const allowed = createRuntime();
assert.equal(loadAnalytics({ ...allowed, locationObject: official }), true);
assert.equal(loadAnalytics({ ...allowed, locationObject: official }), false, 'duplicate initialization blocked');
assert.equal(allowed.scripts.length, 1, 'GA loader once');
assert.equal(allowed.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`);
const commands = allowed.windowObject.dataLayer.map((entry) => Array.from(entry));
const pageViews = commands.filter((entry) => entry[0] === 'event' && entry[1] === 'page_view');
assert.equal(pageViews.length, 1, 'page_view once');
assert.equal(pageViews[0][2].page_location, 'https://gyochettukttak.com/search/');
assert.equal(pageViews[0][2].page_location.includes('?'), false, 'no query string');
assert.deepEqual(Object.keys(pageViews[0][2]).sort(), ['page_location', 'page_path', 'page_title']);
assert.equal(JSON.stringify(commands).includes('칫솔'), false, 'no search input');
for (const forbidden of ['lastReplacedAt', 'usage', 'mileage', 'model', 'vehicle', 'gyochettukttak:home', 'gyochettukttak:today', 'user_id', 'email', 'file_name']) {
  assert.equal(JSON.stringify(commands).includes(forbidden), false, `no private payload: ${forbidden}`);
}

for (const locationObject of [
  { ...official, hostname: 'gyochettukttak.pages.dev', origin: 'https://gyochettukttak.pages.dev' },
  { ...official, hostname: 'aa4e25d8.gyochettukttak.pages.dev', origin: 'https://aa4e25d8.gyochettukttak.pages.dev' },
  { ...official, protocol: 'http:', hostname: 'localhost', origin: 'http://localhost' }
]) {
  const blocked = createRuntime();
  assert.equal(loadAnalytics({ ...blocked, locationObject }), false);
  assert.equal(blocked.scripts.length, 0);
  assert.equal(blocked.windowObject.dataLayer, undefined);
}

const consentRuntime = (stored = null) => {
  const listeners = {};
  const allow = { addEventListener: (_, fn) => { listeners.allow = fn; } };
  const deny = { addEventListener: (_, fn) => { listeners.deny = fn; } };
  const panel = { hidden: true, offsetHeight: 100, removed: false, remove() { this.removed = true; }, querySelector: (selector) => selector.includes('allow') ? allow : deny };
  const settings = { removed: false, remove() { this.removed = true; }, addEventListener: (_, fn) => { listeners.settings = fn; } };
  const values = new Map(stored ? [[CONSENT_KEY, stored]] : []);
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const body = { classList: { add() {}, remove() {} }, style: { setProperty() {}, removeProperty() {} } };
  const documentObject = { body, querySelector: (selector) => selector.includes('consent') ? panel : settings };
  const windowObject = { requestAnimationFrame: (fn) => fn() };
  let loads = 0;
  startAnalyticsConsent({ windowObject, documentObject, locationObject: official, storage, loadImpl: () => { loads += 1; }, disableImpl: () => {} });
  return { listeners, panel, settings, storage, get loads() { return loads; } };
};
const undecided = consentRuntime();
assert.equal(undecided.panel.hidden, false, 'first visit shows consent');
undecided.listeners.deny();
assert.equal(undecided.storage.getItem(CONSENT_KEY), 'denied');
assert.equal(undecided.loads, 0, 'deny sends no analytics');
const denied = consentRuntime('denied');
assert.equal(denied.panel.hidden, true, 'saved denial stays quiet');
assert.equal(denied.loads, 0, 'saved denial sends no analytics');
denied.listeners.settings();
assert.equal(denied.panel.hidden, false, 'settings reopens choice');
const granted = consentRuntime('granted');
assert.equal(granted.loads, 1, 'saved grant loads once');
const newGrant = consentRuntime();
newGrant.listeners.allow();
assert.equal(newGrant.storage.getItem(CONSENT_KEY), 'granted');
assert.equal(newGrant.loads, 1, 'allow starts analytics once');

const client = fs.readFileSync('public/analytics-consent.mjs', 'utf8');
const layout = fs.readFileSync('src/layouts/Base.astro', 'utf8');
const privacy = fs.readFileSync('src/pages/privacy.astro', 'utf8');
const styles = fs.readFileSync('public/analytics-consent.css', 'utf8');
assert.equal(client.includes('/api/today-visitors'), false, 'independent from TODAY');
assert.equal(client.includes('locationObject.search'), false, 'query not read');
assert.equal((layout.match(/data-analytics-allow/g) ?? []).length, 1);
assert.equal((layout.match(/data-analytics-deny/g) ?? []).length, 1);
assert.equal((layout.match(/data-analytics-settings/g) ?? []).length, 1);
assert.match(styles, /body\.analytics-consent-open\{padding-bottom/);
assert.match(styles, /@media\(max-width:520px\)/);
for (const phrase of ['사이트 이용 현황', '허용하기 전', 'query string', '검색어', '교체일', '사용량', '주행거리', '모델명', '차종', 'localStorage', 'TODAY sessionStorage', '사용자 ID', '이메일', '파일명', 'Google signals', '광고 개인화', '분석 설정', '철회']) assert.ok(privacy.includes(phrase), `privacy missing: ${phrase}`);
console.log('PASS GA4 consent, origin, payload, privacy, and responsive UI invariants');
