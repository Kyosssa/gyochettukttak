import assert from 'node:assert/strict';
import fs from 'node:fs';
import seed from '../02-items.seed.json' with { type: 'json' };

const read = (path) => fs.readFileSync(`dist/${path}`, 'utf8');
const count = (text, matcher) => (text.match(matcher) ?? []).length;
const launch = seed.items.filter((item) => item.launch_candidate && item.index_state === 'indexable');
const targets = ['index.html', ...launch.map((item) => `item/${item.slug}/index.html`), ...['hygiene-bathroom', 'kitchen-food', 'air-water-filters'].map((slug) => `category/${slug}/index.html`)];
const excluded = ['search/index.html', 'my-home/index.html', 'about/index.html', 'source-policy/index.html', 'privacy/index.html', 'affiliate-disclosure/index.html', '404.html'];

assert.equal(targets.length, 19, 'home + 15 verified items + 3 indexable categories');
for (const path of targets) {
  const html = read(path);
  assert.equal(count(html, /data-coupang-carousel/g), 1, `one Coupang slot: ${path}`);
  assert.equal(count(html, /coupang-carousel\.js\?v=20260930-coupang-carousel-v2/g), 1, `one loader asset: ${path}`);
  assert.equal(/광고 준비 중|상품 안내 준비 중/.test(html), false, `no placeholder in target: ${path}`);
  assert.match(html, /data-coupang-label>광고</, `visible ad label: ${path}`);
  assert.match(html, /쿠팡 파트너스 활동의 일환/, `clear disclosure: ${path}`);
  const mainStart = html.indexOf('<main>');
  const banner = html.indexOf('data-coupang-carousel');
  const footer = html.indexOf('<footer');
  assert.ok(mainStart < banner && banner < footer, `banner remains inside main before footer: ${path}`);
}
for (const path of excluded) {
  const html = read(path);
  assert.equal(/data-coupang-carousel|coupang-carousel\.js/.test(html), false, `no Coupang banner: ${path}`);
}

const client = fs.readFileSync('public/coupang-carousel.js', 'utf8');
assert.match(client, /id: 1032289/);
assert.match(client, /id: 1034259/);
assert.match(client, /trackingCode: 'AF4293553'/);
assert.match(client, /loader\.onerror/);
assert.match(client, /banner\.remove\(\)/);
assert.match(client, /observer\.observe\(document\.body/);
assert.match(client, /slot\.replaceChildren\(frame\)/);
assert.equal(/document\.cookie|localStorage|sessionStorage|navigator\.userAgent|location\.href/.test(client), false, 'carousel does not read browser or page data');
console.log(`PASS Coupang placement: ${targets.length} targets and ${excluded.length} exclusions`);
