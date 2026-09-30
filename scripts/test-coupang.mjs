import assert from 'node:assert/strict';
import fs from 'node:fs';
import seed from '../02-items.seed.json' with { type: 'json' };

import contract from '../research/expansion-contract.json' with { type: 'json' };
const read = (path) => fs.readFileSync(path, 'utf8');
const count = (text, matcher) => (text.match(matcher) ?? []).length;
const launch = seed.items.filter((item) => item.launch_candidate && item.index_state === 'indexable');
const targets = launch.filter(item => contract.baseline_slugs.includes(item.slug)).map((item) => `dist/item/${item.slug}/index.html`);
const excluded = ['dist/index.html', ...['hygiene-bathroom', 'kitchen-food', 'air-water-filters'].map((slug) => `dist/category/${slug}/index.html`), 'dist/search/index.html', 'dist/my-home/index.html', 'dist/about/index.html', 'dist/source-policy/index.html', 'dist/privacy/index.html', 'dist/affiliate-disclosure/index.html', 'dist/404.html', ...contract.added_slugs.map(slug => `dist/item/${slug}/index.html`)];

assert.equal(targets.length, 15, 'verified item pages only');
for (const path of targets) {
  const html = read(path);
  assert.equal(count(html, /data-coupang-carousel/g), 1, `one wrapper: ${path}`);
  assert.equal(count(html, /coupang-carousel\.js\?v=20260930-item-only-v1/g), 1, `one client: ${path}`);
  assert.match(html, /data-coupang-carousel hidden/, `hidden before iframe: ${path}`);
  const answer = html.indexOf('class="answer"');
  const tool = html.indexOf('class="tool"');
  const caution = html.indexOf('교체 신호', tool);
  const sources = html.indexOf('근거 출처', caution);
  const banner = html.indexOf('data-coupang-carousel');
  const footer = html.indexOf('<footer');
  assert.ok(answer < tool && tool < caution && caution < sources && sources < banner && banner < footer, `after core content and before footer: ${path}`);
}
for (const path of excluded) {
  const html = read(path);
  assert.equal(/data-coupang-carousel|coupang-carousel\.js|ads-partners\.coupang/.test(html), false, `no banner: ${path}`);
}

const client = read('public/coupang-carousel.js');
const styles = read('public/coupang-carousel.css');
assert.match(client, /id: 1032289/);
assert.match(client, /id: 1034259/);
assert.match(client, /trackingCode: 'AF4293553'/);
assert.match(client, /loader\.onerror = cleanup/);
assert.match(client, /window\.setTimeout\(cleanup, 5000\)/);
assert.match(client, /slot\.replaceChildren\(frame\)/);
assert.match(client, /frame\.remove\(\)/);
assert.match(client, /link\.rel = 'sponsored noopener noreferrer'/);
assert.equal(/document\.cookie|localStorage|sessionStorage|navigator\.userAgent/.test(client), false, 'does not read private browser data');
assert.match(styles, /max-width:728px/);
assert.match(styles, /@media\(max-width:720px\)/);
assert.match(styles, /max-width:320px/);
assert.match(styles, /overflow:hidden/);
console.log(`PASS Coupang item-only placement: ${targets.length} targets and ${excluded.length} exclusions`);
