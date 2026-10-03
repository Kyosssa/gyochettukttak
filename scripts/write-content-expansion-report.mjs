// Mechanical report tables derived from reviewed manifests; manual audit text above the marker is preserved.
import fs from 'node:fs';import {execFileSync} from 'node:child_process';
const j=p=>JSON.parse(fs.readFileSync(p,'utf8')),file='docs/CONTENT-EXPANSION-2026-10-03.md',marker='<!-- GENERATED-DETAILS -->';
const seed=j('02-items.seed.json'),plan=j('research/content-expansion-2026-10-03.json'),decisions=j('research/2026-10-03-candidate-decisions.json'),registry=j('04-source-registry.json').sources;
const link=id=>id?`[${registry[id].authority} — ${registry[id].name}](${registry[id].url})`:'승격 판단에 충분한 직접 원문 미확보';
let body='\n### 후보 50개 비교\n\n|후보 / 검색 의도|결정·이유|공식 원문 / 범위|\n|---|---|---|\n';
for(const [slug,reason] of Object.entries(decisions.existing)){const item=seed.items.find(x=>x.slug===slug),row=plan.batches.flat().find(x=>x.slug===slug);body+=`|${item.name} 교체시기|${reason}|${row?row.source_ids.map(link).join(' / '):'이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌'}|\n`;}
for(const [name,decision,reason,id] of decisions.new)body+=`|${name} 교체·관리 기준|${decision}: ${reason}|${link(id)}|\n`;
body+='\n### 신규·승격 상세별 적용 범위와 고유 내용\n\n|품목 / route|공식 근거와 적용 대상|직접 지원 내용 / 일반화하지 않는 내용|\n|---|---|---|\n';
for(const row of plan.batches.flat())body+=`|${row.name} · /item/${row.slug}/|${row.source_ids.map(id=>link(id)+' — '+plan.sources[id].scope).join(' / ')}|${row.summary}|\n`;
body+='\n### 출처 제목·URL·확인일·claim 범위\n\n신규 출처 모두 2026-10-03 본문 확인. 숫자를 인용하는 제품은 해당 모델의 직접 예시에만 사용. Registry의 각 claim에 scope 저장.\n\n';
for(const [id,s] of Object.entries(plan.sources))body+=`- **${id}**: ${link(id)}. 적용: ${s.scope}. 직접 지원: ${s.claims.join(' ')} 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.\n`;
body+='\n### 변경 파일 (미stage)\n\n```text\n'+execFileSync('git',['status','--short','--untracked-files=all'],{encoding:'utf8'})+'```\n';
fs.writeFileSync(file,fs.readFileSync(file,'utf8').split(marker)[0]+marker+'\n'+body);
