import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin='http://127.0.0.1:4322';
const urls=[...fs.readFileSync('dist/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
for(const url of urls){const response=await fetch(origin+new URL(url).pathname),html=await response.text();assert.equal(response.status,200,url);assert.equal(/name="robots"[^>]*noindex/.test(html),false,url);assert.ok(html.includes(`href="${url}"`),url);}
for(const route of ['/search/','/my-home/','/privacy/','/affiliate-disclosure/']){const response=await fetch(origin+route);assert.equal(response.status,200);assert.match(await response.text(),/noindex,follow/);}
const missing=await fetch(origin+'/item/qa-does-not-exist/');assert.equal(missing.status,404);assert.match(await missing.text(),/noindex,follow/);
for(const route of ['/sitemap.xml','/robots.txt'])assert.equal((await fetch(origin+route)).status,200);
console.log('PASS local HTTP:',urls.length,'indexable URLs 200; canonical; noindex utility pages; unknown item 404 + noindex; sitemap/robots 200. Cloudflare response headers not tested by Astro preview.');
