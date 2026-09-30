import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),j=p=>JSON.parse(read(p));
const contract=j('research/expansion-contract.json'),seed=j('02-items.seed.json'),content=j('05-launch-content.seed.json'),registry=j('04-source-registry.json');
const old=p=>JSON.parse(execFileSync('git',['show',`${contract.baseline_commit}:${p}`],{encoding:'utf8'}));
for(const file of ['02-items.seed.json','05-launch-content.seed.json'])for(const slug of contract.baseline_slugs){assert.deepEqual(j(file).items.find(x=>x.slug===slug),old(file).items.find(x=>x.slug===slug),'unchanged original '+slug);}
for(const [id,source] of Object.entries(old('04-source-registry.json').sources))assert.deepEqual(registry.sources[id],source,'unchanged original source '+id);
for(const file of ['public/ads.txt','public/_headers','public/app.js','public/today.js','public/today-visitors.mjs','public/analytics-consent.js','public/analytics-consent.mjs','public/coupang-carousel.js','public/coupang-carousel.css','src/components/CoupangCarousel.astro','src/layouts/Base.astro','src/pages/privacy.astro','wrangler.jsonc','06-search-fixtures.json','19-e2e-acceptance.json'])assert.equal(read(file).replaceAll('\r\n','\n'),execFileSync('git',['show',`${contract.baseline_commit}:${file}`],{encoding:'utf8'}).replaceAll('\r\n','\n'),'protected file unchanged '+file);
const map=read('dist/sitemap.xml');assert.equal((map.match(/<loc>/g)||[]).length,31);
assert.equal(seed.verified_count,25);assert.equal(seed.launch_verified_count,25);assert.equal(seed.launch_candidate_count,25);
assert.equal(fs.readdirSync('dist/item').length,25);assert.equal(fs.readdirSync('dist/category').length,3);
for(const slug of contract.added_slugs){
 const item=seed.items.find(x=>x.slug===slug),page=content.items.find(x=>x.slug===slug),html=read(`dist/item/${slug}/index.html`);
 assert.equal(item.cycle,null);assert.equal(page.commerce.generic_cards_allowed,false);assert.notEqual(page.tool_type,'calendar_condition');assert.ok(page.scope_note);assert.equal(page.guidance_sections.length,2);assert.match(html,/data-evidence-scope/);assert.equal(html.includes('data-exact-date'),false);assert.equal(html.includes('data-coupang'),false);
 assert.equal(page.seo_validation.title_chars,page.title.length);assert.equal(page.seo_validation.description_chars,page.meta_description.length);assert.ok(page.meta_description.length<=100);
 assert.ok(map.includes(`https://gyochettukttak.com/item/${slug}/`));assert.match(read('dist/index.html'),new RegExp(`/item/${slug}/`));assert.match(read('dist/search/index.html'),new RegExp(slug));
 assert.ok(page.source_ids.every(id=>registry.sources[id].level==='A_DIRECT'));assert.equal(new Set(page.related_slugs).size,page.related_slugs.length);assert.ok(!page.related_slugs.includes(slug));
 if(page.tool_type.includes('model')||page.tool_type.includes('vehicle'))assert.match(html,/일반 상품을 추천하지 않습니다/);
}
for(const item of seed.items.filter(x=>x.verification_status==='needs_research'))assert.equal(fs.existsSync(`dist/item/${item.slug}`),false,'held item route absent '+item.slug);
assert.ok(j('research/2026-09-30-expansion.json').batches.every(x=>x.length<=5));
// Run the real shared handler: scoped examples must never become future deadlines.
for(const slug of contract.added_slugs){
 const handlers=new Map(),storage=new Map(),result={textContent:''},downloads=[];
 const nodes={'[data-item]':{dataset:{item:slug}},'[data-result]':result};
 for(const selector of ['[data-replace]','[data-ics]'])nodes[selector]={addEventListener:(_,fn)=>handlers.set(selector,fn)};
 const context={document:{querySelector:s=>nodes[s]||null,createElement:()=>({click(){downloads.push(this.download)}})},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Date,Blob,URL:{createObjectURL:b=>{context.file=b;return 'blob:test'},revokeObjectURL(){}},setTimeout:fn=>fn()};
 vm.runInNewContext(read('public/app.js'),context);
 handlers.get('[data-ics]')();assert.equal(downloads.length,0,'no fabricated ICS before recorded date '+slug);
 handlers.get('[data-replace]')();
 const saved=JSON.parse(storage.get('gyochettukttak:home'))[slug];
 assert.deepEqual(Object.keys(saved),['lastReplacedAt']);
 handlers.get('[data-ics]')();assert.equal(downloads.length,1);
 const ics=await context.file.text();assert.ok(ics.includes('DTSTART:'+saved.lastReplacedAt.replaceAll('-','')),'ICS records actual replacement, not source period '+slug);
 assert.equal((ics.match(/DTSTART:/g)||[]).length,1);
 assert.equal(/DUE:|RRULE:|DTEND:/.test(ics),false,'no calculated future schedule '+slug);
}
console.log('PASS expansion: 10 new pages; original 15/source data and protected runtimes unchanged; 23 held; 31 sitemap; 3 categories');
