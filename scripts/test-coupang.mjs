import assert from 'node:assert/strict';
import fs from 'node:fs';
import seed from '../02-items.seed.json' with { type: 'json' };

import contract from '../research/expansion-contract.json' with { type: 'json' };
const read = (path) => fs.readFileSync(path, 'utf8');
const count = (text, matcher) => (text.match(matcher) ?? []).length;
const launch = seed.items.filter((item) => item.launch_candidate && item.index_state === 'indexable');
const targets = launch.filter(item => contract.baseline_slugs.includes(item.slug)).map((item) => `dist/item/${item.slug}/index.html`);
const excluded = ['dist/index.html', ...['hygiene-bathroom', 'kitchen-food', 'air-water-filters'].map((slug) => `dist/category/${slug}/index.html`), 'dist/search/index.html', 'dist/my-home/index.html', 'dist/about/index.html', 'dist/source-policy/index.html', 'dist/privacy/index.html', 'dist/affiliate-disclosure/index.html', 'dist/404.html', ...contract.added_slugs.map(slug => `dist/item/${slug}/index.html`), ...contract.second_expansion.guide_slugs.map(slug=>`dist/guide/${slug}/index.html`)];

assert.equal(targets.length, 15, 'verified item pages only');
for (const path of targets) {
  const html = read(path);
  assert.equal(count(html, /data-coupang-carousel/g), 1, `one wrapper: ${path}`);
  assert.equal(count(html, /coupang-carousel\.js\?v=20261026-container-v2/g), 1, `one client: ${path}`);
  assert.match(html, /data-coupang-carousel data-coupang-state="pending"/, `reserved before iframe: ${path}`);
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
assert.match(client, /container: stage/);
assert.match(client, /IntersectionObserver/);
assert.match(client, /window\.__ttukttakCoupangLoader/);
assert.match(styles, /height:100px/);
assert.match(styles, /height:90px/);
assert.match(styles, /overflow:hidden/);
console.log(`PASS Coupang item-only placement: ${targets.length} targets and ${excluded.length} exclusions`);
