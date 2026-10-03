import fs from 'node:fs';
const edit=(p,changes)=>{let s=fs.readFileSync(p,'utf8');for(const [before,after] of changes){if(!s.includes(before))throw Error('Missing edit anchor '+p+': '+before);s=s.replace(before,after);}fs.writeFileSync(p,s);};
edit('src/pages/item/[slug].astro',[
 ["import contract from '../../../research/expansion-contract.json';","import contract from '../../../research/expansion-contract.json';\nimport PracticalGuides from '../../components/PracticalGuides.astro';"],
 ['<h2>내 상황 확인</h2>','<h2>내 상황 확인</h2>{item.tool_note&&<p class="notice">{item.tool_note}</p>}'],
 ["{vehicle?'현재 주행거리':'현재 사용횟수'}","{item.usage_label || (vehicle?'현재 주행거리':'현재 사용횟수')}"],
 ['<section><h2>근거 출처</h2>','{item.guide_slugs?.length>0&&<PracticalGuides slugs={item.guide_slugs} />}<section><h2>근거 출처</h2>']
]);
edit('src/pages/index.astro',[["import Base from '../layouts/Base.astro';","import Base from '../layouts/Base.astro'; import PracticalGuides from '../components/PracticalGuides.astro';"],['<section class="myhome-cta">','<PracticalGuides /><section class="myhome-cta">']]);
edit('src/pages/category/[slug].astro',[["import Base from '../../layouts/Base.astro';","import Base from '../../layouts/Base.astro'; import PracticalGuides from '../../components/PracticalGuides.astro';"],['</section></Base>','</section><PracticalGuides slugs={[slug===\'air-water-filters\'?\'filter-care-or-replace\':\'read-maintenance-manual\']} /></Base>']]);
edit('scripts/validate-data.mjs',[["...j('research/expansion-source-audit.json').sources","...j('research/expansion-source-audit.json').sources,...j('research/2026-10-03-source-audit.json').sources"],["size,48,'duplicate '","size,contract.expected.seed,'duplicate '"],["console.log('PASS data: 48 seed, 25 verified, 23 needs_research, 32 registry, 28 source use/audit');","console.log('PASS data:',contract.expected,'used/audited sources',ids.length);"]]);
edit('scripts/test-release.mjs',[["urls.length, 31, 'sitemap must contain 31 URLs'","urls.length, contract.expected.sitemap, 'sitemap count'"],["new Set(urls).size, 31","new Set(urls).size, contract.expected.sitemap"],["launch.length, 25","launch.length, contract.expected.verified"]]);
edit('scripts/test-static.mjs',[["import fs from 'node:fs';","import fs from 'node:fs';const contract=JSON.parse(fs.readFileSync('research/expansion-contract.json'));"],["length===31","length===contract.expected.sitemap"]]);
edit('scripts/test-today.mjs',[["length, 31)","length, JSON.parse(read('research/expansion-contract.json')).expected.sitemap)"]]);
edit('scripts/test-coupang.mjs',[["...contract.added_slugs.map(slug => `dist/item/${slug}/index.html`)","...contract.added_slugs.map(slug => `dist/item/${slug}/index.html`), ...contract.second_expansion.guide_slugs.map(slug=>`dist/guide/${slug}/index.html`)"]]);
edit('scripts/test-search.mjs',[["const expanded=j('research/expansion-contract.json').added_slugs;","const expanded=seed.items.map(x=>x.slug);"],["got.state!=='verified'","got.state!==item.verification_status"],["PASS expanded exact names/aliases","PASS all seed exact names/aliases"]]);
