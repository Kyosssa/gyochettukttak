import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(p,'utf8'),j=p=>JSON.parse(read(p));
const data=j('research/subkeyword-content-2026-10-03.json'),audit=j('research/subkeyword-audit-2026-10-03.json');
const before=p=>execFileSync('git',['show',`${data.baseline_commit}:${p}`],{encoding:'utf8'}).replaceAll('\r\n','\n');
for(const path of ['02-items.seed.json','04-source-registry.json','05-launch-content.seed.json','06-search-fixtures.json','research/practical-guides-2026-10-03.json','public/app.js','public/ads.txt','public/_headers','src/layouts/Base.astro','src/pages/privacy.astro','public/analytics-consent.js','public/analytics-consent.mjs','public/coupang-carousel.js','public/coupang-carousel.css','src/components/CoupangCarousel.astro','public/today.js','public/today-visitors.mjs','functions/api/today-visitors.js','wrangler.jsonc'])assert.equal(read(path).replaceAll('\r\n','\n'),before(path),'protected '+path);
assert.equal(audit.candidates.length,100);assert.equal(new Set(audit.candidates.map(x=>x.query)).size,100);
for(const row of audit.candidates){for(const key of ['query','discovery','question','gap','evidence_feasibility','classification','implementation','reason'])assert.ok(row[key],key);assert.ok(Object.hasOwn(row,'current_url'));assert.equal(row.volume,null);assert.ok(['A','B','C','D'].includes(row.classification));assert.ok(['related_search','official_faq_topic','idea'].includes(row.discovery));}
const items=j('02-items.seed.json').items;
assert.equal(items.length,57);assert.equal(items.filter(x=>x.verification_status==='verified').length,37);assert.equal(items.filter(x=>x.verification_status==='needs_research').length,20);
const original=j('research/practical-guides-2026-10-03.json').guides,all=[...original,...data.guides];
const sitemap=read('dist/sitemap.xml'),urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);assert.equal(urls.length,52);
const bodies=[];
for(const guide of data.guides){
 const url=`https://gyochettukttak.com/guide/${guide.slug}/`,html=read(`dist/guide/${guide.slug}/index.html`);
 assert.ok(urls.includes(url));assert.ok(html.includes(`rel="canonical" href="${url}"`));assert.equal(/name="robots"[^>]*noindex/.test(html),false);
 assert.equal(/data-coupang|data-exact-date|data-ics|PartnersCoupang/.test(html),false);
 assert.ok(guide.distinct_intent);assert.ok(guide.sections.length>=4);assert.ok(guide.audit_source_ids.length);
 for(const s of guide.audit_source_ids){const source=data.sources[s];assert.ok(source);assert.equal(source.checked_at,'2026-10-03');assert.ok(source.verified_claims.length&&source.not_supported.length&&source.scope);assert.ok(html.includes(source.url));}
 for(const s of guide.sections.flatMap(x=>x.audit_source_ids||[]))assert.ok(guide.audit_source_ids.includes(s));
 for(const slug of guide.items)assert.ok(items.some(x=>x.slug===slug&&x.verification_status==='verified'));
 for(const slug of guide.related_guides){assert.notEqual(slug,guide.slug);assert.ok(all.some(x=>x.slug===slug));}
 assert.equal(new Set(guide.related_guides).size,guide.related_guides.length);
 bodies.push({slug:guide.slug,text:guide.intro+guide.sections.map(x=>x.text).join('')});
}
for(const g of original)bodies.push({slug:g.slug,text:g.intro+g.sections.map(x=>x.text).join('')});
for(const item of j('05-launch-content.seed.json').items)bodies.push({slug:item.slug,text:item.answer_card.summary+(item.guidance_sections||[]).map(x=>x.text).join('')});
const grams=t=>new Set([...t.replace(/[^\p{L}\p{N}]/gu,'')].map((_,i,a)=>a.slice(i,i+4).join('')).filter(x=>x.length===4));
let maximum={score:0};for(let a=0;a<bodies.length;a++)for(let b=a+1;b<bodies.length;b++){const l=grams(bodies[a].text),r=grams(bodies[b].text),n=[...l].filter(x=>r.has(x)).length,score=n/(l.size+r.size-n);if(score>maximum.score)maximum={score,left:bodies[a].slug,right:bodies[b].slug};assert.ok(score<0.65,'repeated guide body');}
// Run the actual generated client script, not a second implementation of search.
const searchHtml=read('dist/search/index.html'),scripts=[...searchHtml.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
const script=scripts.find(x=>x.includes('function showGuides'));assert.ok(script);
const fixtureResults=[];
function element(){return {children:[],hidden:false,textContent:'',append(x){this.children.push(x)},replaceChildren(){this.children=[]}};}
for(const guide of data.guides)for(const query of [guide.title,...guide.keywords]){
 const nodes={'#q':{value:query},'#guide-results':element(),'#guide-heading':element(),'#search-results':element(),'#search-status':element(),'#search-form':{addEventListener(){}}};
 vm.runInNewContext(script,{document:{querySelector:s=>nodes[s],createElement:element},URLSearchParams,location:{search:'?q='+encodeURIComponent(query)}});
 assert.ok(nodes['#guide-results'].children.some(li=>li.children[0].href===`/guide/${guide.slug}/`),'actual guide search '+query);fixtureResults.push(query);
}
for(const query of ['', '<script>alert(1)</script>', '근거없는무작위검색']){
 const nodes={'#q':{value:query},'#guide-results':element(),'#guide-heading':element(),'#search-results':element(),'#search-status':element(),'#search-form':{addEventListener(){}}};
 vm.runInNewContext(script,{document:{querySelector:s=>nodes[s],createElement:element},URLSearchParams,location:{search:'?q='+encodeURIComponent(query)}});
 assert.equal(nodes['#guide-results'].children.length,0);assert.equal(nodes['#guide-heading'].hidden,true);
}
{
 let submit;
 const nodes={'#q':{value:'필터 리셋'},'#guide-results':element(),'#guide-heading':element(),'#search-results':element(),'#search-status':element(),'#search-form':{addEventListener(_,handler){submit=handler}}};
 vm.runInNewContext(script,{document:{querySelector:s=>nodes[s],createElement:element},URLSearchParams,location:{search:'?q=필터 리셋'}});
 assert.equal(nodes['#guide-results'].children.length,1);submit();assert.equal(nodes['#guide-results'].children.length,1,'no duplicate result on repeat submit');
 nodes['#q'].value='골프공';submit();assert.equal(nodes['#guide-results'].children.length,0,'stale guide results cleared');
 nodes['#search-results'].children=[element()];nodes['#search-status'].textContent='확인 중';nodes['#q'].value='렌즈';submit();assert.equal(nodes['#search-status'].textContent,'확인 중','held item status not overwritten');
}
console.log('PASS subkeywords: 100 candidates; 6 distinct guides; 3 scoped notes; protected data/runtime; actual generated guide search',fixtureResults.length+3,'cases; max body similarity',maximum);
