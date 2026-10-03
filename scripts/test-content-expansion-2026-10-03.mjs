import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(p,'utf8'),j=p=>JSON.parse(read(p));
const seed=j('02-items.seed.json'),pages=j('05-launch-content.seed.json').items,contract=j('research/expansion-contract.json'),guides=j('research/practical-guides-2026-10-03.json').guides;
const baseline=p=>JSON.parse(execFileSync('git',['show',`${contract.second_expansion.baseline_commit}:${p}`],{encoding:'utf8'}));
const schema=j('03-item.schema.json');
for(const item of seed.items){
 for(const key of schema.required)assert.ok(Object.hasOwn(item,key),key+' '+item.slug);
 for(const [key,rules] of Object.entries(schema.properties)){
  if(!Object.hasOwn(item,key))continue;const value=item[key];
  if(rules.enum)assert.ok(rules.enum.includes(value),key+' enum '+item.slug);
  if(rules.pattern)assert.match(value,new RegExp(rules.pattern));
  if(rules.minItems)assert.ok(value.length>=rules.minItems);
  if(rules.items?.enum)assert.ok(value.every(x=>rules.items.enum.includes(x)));
 }
 if(item.index_state==='indexable'){assert.equal(item.verification_status,'verified');assert.ok(item.sources.length&&item.answer_summary&&item.replacement_reason);}
}
const decision=j('research/2026-10-03-candidate-decisions.json');assert.equal(Object.keys(decision.existing).length+decision.new.length,50);
for(const slug of contract.second_expansion.enriched_slugs){
 const beforeSeed=baseline('02-items.seed.json').items.find(x=>x.slug===slug),afterSeed=seed.items.find(x=>x.slug===slug);
 const beforePage=baseline('05-launch-content.seed.json').items.find(x=>x.slug===slug),afterPage=pages.find(x=>x.slug===slug);
 assert.ok(beforeSeed.aliases.every(x=>afterSeed.aliases.includes(x)));assert.ok(beforeSeed.sources.every(x=>afterSeed.sources.some(y=>y.source_id===x.source_id)));
 assert.ok(beforePage.source_ids.every(x=>afterPage.source_ids.includes(x)));
 assert.deepEqual((afterPage.guidance_sections||[]).slice(0,beforePage.guidance_sections?.length||0),beforePage.guidance_sections||[],'prior paragraphs preserved '+slug);
 for(const key of ['status','level','public_badge','claim_scope'])assert.equal(afterSeed.evidence[key],beforeSeed.evidence[key]);
}
const map=read('dist/sitemap.xml'),urls=[...map.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
const graph=new Map();
for(const url of urls){const path=new URL(url).pathname,file=path==='/'?'dist/index.html':'dist'+path+'index.html';const html=read(file);graph.set(path,[...html.matchAll(/href="(\/[^"?#]*)/g)].map(x=>x[1]));}
const visited=new Set(['/']),queue=['/'];while(queue.length){for(const path of graph.get(queue.shift())||[])if(graph.has(path)&&!visited.has(path)){visited.add(path);queue.push(path);}}
assert.equal(visited.size,urls.length,'all sitemap routes reachable from home');
const specificBodies=[];
for(const slug of contract.second_expansion.added_slugs){const item=seed.items.find(x=>x.slug===slug),page=pages.find(x=>x.slug===slug),html=read(`dist/item/${slug}/index.html`);
 assert.equal(item.cycle,null);assert.equal(item.calculator.enabled,false);assert.equal(item.affiliate.enabled,false);assert.equal(page.commerce.generic_cards_allowed,false);
 assert.equal(html.includes('data-exact-date'),false);assert.equal(html.includes('data-coupang'),false);
 assert.equal(html.includes('data-maintain'),item.care_actions.includes('maintain'));
 assert.deepEqual(item.evidence.source_ids,page.source_ids);assert.equal(item.evidence.claim_scope,page.scope_note);
 assert.ok(html.includes('캘린더 파일에는 직접 기록한 교체일'));
 assert.ok(page.guidance_sections.every(x=>x.text!==page.replacement_reason),'no duplicated paragraph '+slug);
 specificBodies.push({slug,text:page.answer_card.summary+page.guidance_sections.map(x=>x.text).join('')});
}
for(const guide of guides){assert.ok(guide.sections.length>=4);assert.ok(guide.items.every(slug=>pages.some(x=>x.slug===slug)));assert.ok(guide.source_ids.every(id=>j('04-source-registry.json').sources[id]));assert.ok(map.includes(`/guide/${guide.slug}/`));specificBodies.push({slug:guide.slug,text:guide.intro+guide.sections.map(x=>x.text).join('')});}
const grams=text=>new Set([...text.replace(/[^\p{L}\p{N}]/gu,'')].map((_,i,a)=>a.slice(i,i+4).join('')).filter(x=>x.length===4));
let maxSimilarity={score:0};for(let a=0;a<specificBodies.length;a++)for(let b=a+1;b<specificBodies.length;b++){const left=grams(specificBodies[a].text),right=grams(specificBodies[b].text),same=[...left].filter(x=>right.has(x)).length,score=same/(left.size+right.size-same);if(score>maxSimilarity.score)maxSimilarity={score,left:specificBodies[a].slug,right:specificBodies[b].slug};assert.ok(score<0.7,'substantially repeated editorial body');}
// Execute the unchanged actual handlers with disposable in-memory storage.
const handlers=new Map(),storage=new Map([['gyochettukttak:home',JSON.stringify({'robot-mop-pad':{lastReplacedAt:'2026-09-20',usage:'12',model:'QA i5',saved:true}})]]),result={textContent:''},usage={value:'-1',checkValidity(){return Number(this.value)>=0},reportValidity(){}},nodes={'[data-item]':{dataset:{item:'robot-mop-pad'}},'[data-result]':result,'[data-usage]':usage};
for(const selector of ['[data-maintain]','[data-save-usage]','[data-save-home]'])nodes[selector]={addEventListener:(_,fn)=>handlers.set(selector,fn)};
vm.runInNewContext(read('public/app.js'),{document:{querySelector:s=>nodes[s]||null},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Date});
handlers.get('[data-save-usage]')();assert.equal(JSON.parse(storage.get('gyochettukttak:home'))['robot-mop-pad'].usage,'12');
handlers.get('[data-maintain]')();const record=JSON.parse(storage.get('gyochettukttak:home'))['robot-mop-pad'];assert.equal(record.lastReplacedAt,'2026-09-20');assert.equal(record.usage,'12');assert.ok(record.lastMaintainedAt);assert.equal(record.model,'QA i5');
usage.value='14';handlers.get('[data-save-usage]')();assert.equal(JSON.parse(storage.get('gyochettukttak:home'))['robot-mop-pad'].usage,'14');
console.log('PASS second expansion: 50 comparisons; schema-field checks; scoped tools; preservation; all 46 routes reachable; care/usage behavior; max editorial 4-gram Jaccard',maxSimilarity);
