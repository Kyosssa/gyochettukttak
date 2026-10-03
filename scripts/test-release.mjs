import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import seed from '../02-items.seed.json' with { type: 'json' };

import contract from '../research/expansion-contract.json' with { type: 'json' };
const origin = 'https://gyochettukttak.com';
const read = (file) => fs.readFileSync(file, 'utf8');
const sitemap = read('dist/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const launch = seed.items.filter((item) => item.launch_candidate && item.index_state === 'indexable');
const noindexPaths = ['/search/', '/my-home/', '/privacy/', '/affiliate-disclosure/'];
const forbidden = /광고 준비 중|상품 안내 준비 중|준비 예정|disabled(?:=|\s|>)/i;
const coupang = /data-coupang|PartnersCoupang|ads-partners\.coupang\.com|coupang-carousel/i;

const htmlFile = (pathname) => pathname === '/' ? 'dist/index.html' : `dist${pathname}index.html`;
const text = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[^;]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const meta = (html, name) => html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i'))?.[1];
const title = (html) => html.match(/<title>([^<]+)<\/title>/i)?.[1];
const h1 = (html) => html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, '').trim();
const canonical = (html) => html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
const toPath = (url) => new URL(url).pathname;

assert.equal(urls.length, contract.expected.sitemap, 'sitemap count');
assert.equal(new Set(urls).size, contract.expected.sitemap, 'sitemap URLs must be unique');
assert.ok(urls.every((url) => url.startsWith(`${origin}/`)), 'sitemap must use official origin');
assert.equal(launch.length, contract.expected.verified, 'verified launch item count');

const titles = new Set();
const descriptions = new Set();
const headings = new Set();
const canonicals = new Set();
const contentRows = [];
for (const url of urls) {
  const pathname = toPath(url);
  const file = htmlFile(pathname);
  assert.ok(fs.existsSync(file), `sitemap route exists: ${pathname}`);
  const html = read(file);
  const pageTitle = title(html);
  const description = meta(html, 'description');
  const pageH1 = h1(html);
  const pageCanonical = canonical(html);
  assert.ok(pageTitle, `title exists: ${pathname}`);
  assert.ok(description, `description exists: ${pathname}`);
  assert.ok(pageH1, `H1 exists: ${pathname}`);
  assert.equal(pageCanonical, url, `canonical matches sitemap: ${pathname}`);
  assert.equal(/<meta[^>]+name="robots"[^>]+noindex/i.test(html), false, `indexable route has no noindex: ${pathname}`);
  assert.equal(meta(html, 'google-adsense-account'), 'ca-pub-7564661082214740', `AdSense ownership meta: ${pathname}`);
  assert.equal(meta(html, 'og:title'), pageTitle, `OG title: ${pathname}`);
  assert.equal(meta(html, 'og:description'), description, `OG description: ${pathname}`);
  assert.equal(meta(html, 'og:url'), url, `OG URL: ${pathname}`);
  const jsonLdText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(jsonLdText, `JSON-LD exists: ${pathname}`);
  assert.doesNotThrow(() => JSON.parse(jsonLdText), `JSON-LD parses: ${pathname}`);
  assert.equal(forbidden.test(html), false, `no unfinished UI: ${pathname}`);
  assert.equal(coupang.test(html), contract.baseline_slugs.some(slug => pathname === `/item/${slug}/`), `Coupang only on item pages: ${pathname}`);
  assert.equal(titles.has(pageTitle), false, `unique title: ${pageTitle}`);
  assert.equal(descriptions.has(description), false, `unique description: ${pathname}`);
  assert.equal(headings.has(pageH1), false, `unique H1: ${pageH1}`);
  assert.equal(canonicals.has(pageCanonical), false, `unique canonical: ${pathname}`);
  titles.add(pageTitle); descriptions.add(description); headings.add(pageH1); canonicals.add(pageCanonical);
  const main = html.match(/<main>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  contentRows.push({ pathname, characters: text(main).length, normalized: text(main).replace(/[^\p{L}\p{N}]+/gu, '') });
  if (pathname.startsWith('/item/')) {
    assert.match(html, /근거 출처/, `source section: ${pathname}`);
    assert.match(html, /A_DIRECT|B_GENERAL/, `source level: ${pathname}`);
  }
}

for (const pathname of noindexPaths) {
  const html = read(htmlFile(pathname));
  assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex,follow"/i, `noindex retained: ${pathname}`);
}
assert.match(read('dist/404.html'), /noindex,follow/, '404 noindex');
assert.match(read('dist/robots.txt'), /Sitemap: https:\/\/gyochettukttak\.com\/sitemap\.xml/, 'robots sitemap URL');
assert.equal(read('dist/ads.txt').trim(), 'google.com, pub-7564661082214740, DIRECT, f08c47fec0942fa0', 'ads.txt exact');
const headers = read('dist/_headers');
assert.match(headers, /https:\/\/gyochettukttak\.pages\.dev\/\*/);
assert.match(headers, /https:\/\/:version\.gyochettukttak\.pages\.dev\/\*/);
assert.equal(headers.includes('https://gyochettukttak.com/*'), false, 'official origin has no global noindex');

const htmlFiles = fs.readdirSync('dist', { recursive: true }).filter((file) => file.endsWith('.html'));
for (const relative of htmlFiles) {
  const html = read(path.join('dist', relative));
  assert.equal(forbidden.test(html), false, `no unfinished UI: ${relative}`);
  const itemPage = contract.baseline_slugs.some(slug => relative.replaceAll('\\', '/') === `item/${slug}/index.html`);
  assert.equal(coupang.test(html), itemPage, `Coupang only on item pages: ${relative}`);
  const renderedMarkup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const match of renderedMarkup.matchAll(/href="(\/[^"]*)"/g)) {
    const pathname = new URL(match[1], origin).pathname;
    const target = pathname === '/' ? 'dist/index.html' : `dist${pathname}${path.extname(pathname) ? '' : 'index.html'}`;
    assert.ok(fs.existsSync(target), `internal link target exists: ${relative} -> ${pathname}`);
  }
}

for (let left = 0; left < contentRows.length; left += 1) for (let right = left + 1; right < contentRows.length; right += 1) {
  assert.notEqual(contentRows[left].normalized, contentRows[right].normalized, `duplicate main content: ${contentRows[left].pathname} / ${contentRows[right].pathname}`);
}
const thinnest = [...contentRows].sort((a, b) => a.characters - b.characters).slice(0, 5);
console.log(`PASS release audit: ${urls.length} indexable URLs, ${launch.length} verified items, ${htmlFiles.length} HTML files`);
console.log(`THINNESS REVIEW ${thinnest.map((row) => `${row.pathname}:${row.characters}`).join(', ')}`);
