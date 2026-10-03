import fs from 'node:fs';
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const seed=j('02-items.seed.json'),contract=j('research/expansion-contract.json');
const content=j('05-launch-content.seed.json');
const reasons={
 'electric-shaver-head':'세척과 새 헤드 장착은 서로 다른 작업입니다.',
 'contact-lens-case':'케이스·렌즈·관리용액은 서로 다른 교체 대상을 갖습니다.',
 pacifier:'공갈용과 수유용 젖꼭지를 구분해야 적용 제품의 교체 안내를 읽을 수 있습니다.',
 'refrigerator-water-filter':'알림 초기화와 실제 급수 카트리지 교체를 구분하기 위해 기록합니다.',
 'robot-vacuum-brush':'롤러의 이물 제거와 새 부품 장착을 구분해 관리합니다.',
 'robot-mop-pad':'누적 세탁 횟수 기준은 청소 운행 횟수나 경과 날짜와 다릅니다.',
 'engine-air-filter':'엔진 흡기 필터는 실내 공조 필터와 다른 부품입니다.',
 'spark-plug':'내 엔진 정비표와 실제 정비 기록을 맞춰 교환 여부를 확인합니다.',
 'engine-coolant':'수위 점검·보충과 전체 냉각수 교환을 별도로 기록합니다.',
 'tumbler-gasket':'뚜껑 패킹 문제를 병 전체의 수명과 분리해 확인합니다.',
 'baby-bottle':'젖병 몸체와 젖꼭지의 손상·교체 기록을 구분합니다.',
 'brake-pad':'마모 경고와 정비 확인을 우선하며 주행거리만으로 안전 여부를 판단하지 않습니다.'
};
for(const item of seed.items)if(contract.second_expansion.added_slugs.includes(item.slug)){
 item.index_state='indexable';const page=content.items.find(x=>x.slug===item.slug);
 item.replacement_reason=page.replacement_reason=reasons[item.slug];
 if(page.tool_type.includes('vehicle'))item.care_actions=item.care_actions.filter(x=>x!=='model_memory').concat('vehicle_memory','mileage_update');
 else if(page.tool_type.includes('usage')&&!item.care_actions.includes('usage_update'))item.care_actions.push('usage_update');
 item.care_actions=[...new Set(item.care_actions)];
}
write('02-items.seed.json',seed);
write('05-launch-content.seed.json',content);
const fixtures=j('06-search-fixtures.json');
for(const c of fixtures.cases)if(contract.second_expansion.added_slugs.includes(c.expect))c.state='verified';
for(const slug of contract.second_expansion.added_slugs){const item=seed.items.find(x=>x.slug===slug);for(const q of [item.name,...item.aliases])if(!fixtures.cases.some(x=>x.q===q))fixtures.cases.push({q,expect:slug,state:'verified'});}
write('06-search-fixtures.json',fixtures);
