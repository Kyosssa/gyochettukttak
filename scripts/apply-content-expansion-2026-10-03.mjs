// Reviewed content manifest -> deterministic, mechanical JSON updates. No runtime or infrastructure writes.
import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const plan=read('research/content-expansion-2026-10-03.json'),seed=read('02-items.seed.json'),content=read('05-launch-content.seed.json'),registry=read('04-source-registry.json'),contract=read('research/expansion-contract.json');
const rows=plan.batches.flat(),taxonomy=read('07-category-taxonomy.json').categories;
if(content.items.length!==25)throw new Error('Run once from the reviewed 25-item baseline; do not overwrite an already expanded dataset.');
const audit=[];
for(const [id,s] of Object.entries(plan.sources)){
 registry.sources[id]={name:s.name,authority:s.authority,type:id.startsWith('cdc')||id.startsWith('fda')?'public_agency':'manufacturer',url:s.url,level:'A_DIRECT',checked_at:plan.date,usage:'second_expansion',claims:s.claims.map(text=>({type:'scoped_guidance',text,scope:s.scope}))};
 audit.push({source_id:id,url:s.url,authority:s.authority,health_status:'body_verified',claim_check:s.scope,checked_at:plan.date});
}
for(const row of rows){
 let item=seed.items.find(x=>x.slug===row.slug);
 if(!item){item=structuredClone(seed.items.find(x=>x.slug==='refrigerator-deodorizer'));item.id='item-'+String(Math.max(...seed.items.map(x=>Number(x.id.slice(5))))+1).padStart(3,'0');seed.items.push(item);}
 const vehicle=row.tool.includes('vehicle'),model=row.tool.includes('model'),scope=row.source_ids.map(id=>plan.sources[id].scope).join(' / ');
 Object.assign(item,{slug:row.slug,name:row.name,aliases:row.aliases,category:taxonomy.find(x=>x.slug===row.category).label,category_slug:row.category,ui_category_label:taxonomy.find(x=>x.slug===row.category).label,replacement_modes:[vehicle?'vehicle':model?'model':'condition'],launch_candidate:true,seo_priority:'A',affiliate_priority:'C',search_intent:'informational',seo:{primary_keyword:row.name+' 교체주기',secondary_keywords:[row.name+' 교체시기',...row.aliases],brand_model_expansion:model||vehicle},cycle:null,cycle_text:row.headline,check_signs:row.signs,adjustment_factors:row.factors,replacement_reason:row.sections[1][1],calculator:{enabled:false,type:'dynamic_by_mode'},model_specific:model||vehicle,verification_status:'verified',source_level:'A_DIRECT',sources:row.source_ids.map(source_id=>({source_id})),affiliate:{enabled:false,keyword:null,query_mode:'server_allowlist_by_item_id'},beorim:{link_candidate:false,item_name:row.name,slug:null,mapping_status:'needs_mapping'},notes:['2026-10-03 공식 적용 범위 확인 후 승격. 공통 자동 교체일 계산·상품 추천 없음.'],answer_type:vehicle?'vehicle_required':model?'model_required':'condition',my_home:{enabled:true,mode:vehicle?'vehicle_required':model?'model_required':'condition',one_tap_replace:true},quick_date_input:{enabled:false,allow_approximate:false},evidence:{status:'verified',level:'A_DIRECT',public_badge:'공식 직접 근거 · 적용 범위 확인',claim_scope:scope,source_ids:row.source_ids},purchase_guard:{model_check_required:model||vehicle,part_code_check_required:model||vehicle,show_price_as_live:false},answer_summary:row.summary,verified_at:plan.date,next_review_at:'2026-11-03',care_actions:['inspect','replace',...(row.maintain?['maintain']:[]),...(model||vehicle?['model_memory']:[])]});
 const page={slug:row.slug,name:row.name,h1:row.name+' 교체주기',title:row.name+' 교체주기 | 확인 기준 - 교체뚝딱',meta_description:row.headline+' '+scope,primary_keyword:item.seo.primary_keyword,secondary_keywords:item.seo.secondary_keywords,evidence_badge:item.evidence.public_badge,answer_card:{headline:row.headline,summary:row.summary},tool_type:row.tool,check_signs:row.signs,adjustment_factors:row.factors,replacement_reason:item.replacement_reason,source_ids:row.source_ids,related_slugs:row.related.filter(s=>s!=='plastic-food-container'),commerce:{strategy:vehicle?'vehicle_required':model?'model_required':'condition',generic_cards_allowed:false,keyword:null,pre_purchase_guard:scope},beorim:{status:'unverified',url:null,cta:null},page_modules:['answer_card','tool','check_signs','adjustment_factors','replacement_reason','sources','related_items'],scope_note:scope,guidance_sections:row.sections.map(([heading,text])=>({heading,text})),tool_note:'이 도구는 실제 교체·관리 기록만 저장합니다. 출처의 제품 예시를 공통 기한으로 계산하지 않으며 캘린더 파일에는 직접 기록한 교체일만 들어갑니다.',...(row.usage_label?{usage_label:row.usage_label}:{}),guide_slugs:[vehicle?'read-maintenance-manual':row.slug==='contact-lens-case'?'read-maintenance-manual':row.category==='air-water-filters'||row.category==='cleaning-appliances'?'filter-care-or-replace':'read-maintenance-manual']};
 if(page.meta_description.length>100)page.meta_description=row.headline+' 제품·모델별 적용 범위와 관리·교체 기록의 차이를 확인하세요.';
 page.seo_validation={title_chars:page.title.length,description_chars:page.meta_description.length,title_target_max:40,description_target_max:100};
 const at=content.items.findIndex(x=>x.slug===row.slug);if(at<0)content.items.push(page);else content.items[at]=page;
}
const additions={
 toothbrush:{sources:['oralb_sg_head_care'],aliases:['전동칫솔모','전동 칫솔 헤드'],sections:[['전동칫솔모의 호환 범위','Oral-B 싱가포르 FAQ의 3개월 또는 마모 시 교체 안내는 해당 칫솔모 안내입니다. iO용과 다른 전동칫솔모의 호환 범위가 다르므로 손잡이 모델을 확인하세요. 전동칫솔 전체를 같은 시기에 교체한다는 뜻은 아닙니다.'],['사용 뒤 세척과 보관','ADA는 칫솔을 사용 뒤 헹구고 세워 자연 건조하도록 안내합니다. Oral-B는 헤드를 분리해 헤드와 손잡이를 헹구고 말리도록 합니다. 세척한 날은 새 칫솔모를 장착한 날과 구분하세요.']]},
 'razor-blade':{related:['electric-shaver-head'],sections:[['일회용 날과 전기면도기 구분','AAD의 5~7회 안내는 단일 날 면도기에 관한 안내입니다. 전기면도기의 날·망은 제조사 지침을 확인해야 하며 면도 횟수를 전기면도기 헤드 수명으로 변환하지 않습니다.']]},
 'frying-pan':{sections:[['코팅 관리와 교체는 다른 작업','식품의약품안전처 안내는 코팅이 손상된 팬의 교체와 부드러운 조리도구·스펀지 사용을 구분합니다. 빈 팬을 가열하지 않는 관리가 손상된 코팅을 복구한다는 뜻은 아닙니다.']]},
 'air-conditioner-filter':{sections:[['물 세척 가능한 필터만 세척','LG 벽걸이 에어컨 안내는 극세 필터와 탈취·TVF 등 추가 필터를 구분합니다. 물 세척이 가능한 극세 필터의 관리법을 추가 필터에 적용하지 말고 제품 설명서의 필터명을 확인하세요.']]},
 'air-purifier-filter':{sections:[['모델 라벨과 필터 구조부터 확인','LG는 제품 뒷면·하단의 모델명 확인을 안내합니다. 몽블랑·퓨리케어 미니·360 제품의 필터 구성과 관리법이 다르므로 한 모델의 세척 가능 여부나 교체 예시를 다른 모델에 적용하지 않습니다.']]},
 'humidifier-filter':{sections:[['물을 머금는 필터와 공기 필터 구분','LG 하이드로에센셜 안내의 수분 필터는 세척 관리 대상이지만 공기·가습 필터는 물 세척하지 않습니다. 같은 가습기 안에서도 부품별 지침이 다르며 세척일을 교체일로 바꾸지 않습니다.']]},
 'vacuum-filter':{sources:['irobot_combo_mop'],aliases:['로봇청소기 필터','로봇 청소기 필터'],related:['robot-vacuum-brush','robot-mop-pad'],sections:[['로봇청소기 필터는 별도 모델 분기','Roomba Combo i5/i5+·j5/j5+ 안내는 필터 청소와 교체를 구분하고 물 세척을 금지합니다. 이 모델의 교체 예시를 Dyson 또는 다른 로봇청소기 필터에 적용하지 않습니다.'],['세척 가능한 Dyson 필터의 건조','Dyson의 해당 무선청소기 필터 관리는 찬물 세척 뒤 최소 24시간 완전히 건조하도록 안내합니다. 세제를 쓰지 않으며 세척 가능한 필터인지 확인한 경우에만 이 방법을 따르세요.']]},
 'engine-oil':{related:['engine-air-filter','spark-plug'],sections:[['오일 필터 작업도 정비 명세서에서 확인','기존 근거인 현대 LX2 2025 미국판 정비표는 엔진오일과 오일 필터를 같은 정비 항목으로 표시합니다. 실제 차량의 정비표와 명세서에서 각각 작업했는지 확인하며 흡기·공조 필터의 기준을 가져오지 않습니다.']]}
};
for(const [slug,a] of Object.entries(additions)){
 const item=seed.items.find(x=>x.slug===slug),page=content.items.find(x=>x.slug===slug);
 for(const id of a.sources||[]){if(!page.source_ids.includes(id)){page.source_ids.push(id);item.sources.push({source_id:id});item.evidence.source_ids.push(id);}}
 item.aliases=[...new Set([...item.aliases,...a.aliases||[]])];
 page.guidance_sections=[...page.guidance_sections||[],...a.sections.map(([heading,text])=>({heading,text}))];
 page.related_slugs=[...new Set([...page.related_slugs,...a.related||[]])];
 page.guide_slugs=[slug.includes('filter')?'filter-care-or-replace':'read-maintenance-manual'];
}
contract.second_expansion={baseline_commit:plan.baseline_commit,added_slugs:rows.map(x=>x.slug),enriched_slugs:Object.keys(additions),guide_slugs:['filter-care-or-replace','cosmetic-expiry-label','read-maintenance-manual']};
contract.added_slugs=[...new Set([...contract.added_slugs,...rows.map(x=>x.slug)])];
Object.assign(contract.expected,{seed:seed.items.length,verified:content.items.length,needs_research:seed.items.filter(x=>x.verification_status==='needs_research').length,registry:Object.keys(registry.sources).length,sitemap:content.items.length+6+3});
Object.assign(seed,{item_count:seed.items.length,launch_candidate_count:content.items.length,verified_count:content.items.length,launch_verified_count:content.items.length});
write('02-items.seed.json',seed);write('05-launch-content.seed.json',content);write('04-source-registry.json',registry);write('research/expansion-contract.json',contract);write('research/2026-10-03-source-audit.json',{checked_at:plan.date,sources:audit});
const paths=['/','/about/','/source-policy/',...content.items.map(x=>`/item/${x.slug}/`),...['hygiene-bathroom','kitchen-food','air-water-filters'].map(x=>`/category/${x}/`),...contract.second_expansion.guide_slugs.map(x=>`/guide/${x}/`)];
fs.writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(x=>`<url><loc>https://gyochettukttak.com${x}</loc></url>`).join('')+'</urlset>\n');
