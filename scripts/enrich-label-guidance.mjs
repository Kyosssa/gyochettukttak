import fs from 'node:fs';
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const content=j('05-launch-content.seed.json'),contract=j('research/expansion-contract.json');
const notes={
 toothpaste:'튜브·포장의 표시 사용기한을 직접 확인하세요. 현재 도구는 그 기한을 입력받거나 개봉 후 기간으로 변환하지 않습니다. 캘린더에는 실제 교체 기록만 담습니다.',
 mascara:'제품 표시와 건조 상태를 우선 확인하세요. 현재 도구는 구매일·개봉일로 FDA의 제품군 예시를 일괄 계산하지 않으며, 실제 교체 기록만 저장합니다.',
 sunscreen:'국내 제품 라벨의 사용기한·보관 안내가 우선입니다. 현재 도구는 해외의 미표시 제품 예시로 기한을 생성하거나 날짜만으로 보호 효과를 보장하지 않습니다.',
 'contact-lens-solution':'병에 표시된 사용기한·개봉 후 폐기 안내와 매회 잔여액 처리는 따로 확인하세요. 현재 도구는 개봉 후 기간과 표시기한을 합쳐 자동 계산하지 않습니다.'
};
for(const [slug,note] of Object.entries(notes)){const page=content.items.find(x=>x.slug===slug);page.tool_note=note;page.guide_slugs=['cosmetic-expiry-label'];}
contract.second_expansion.enriched_slugs=[...new Set([...contract.second_expansion.enriched_slugs,...Object.keys(notes)])];
write('05-launch-content.seed.json',content);write('research/expansion-contract.json',contract);
