# 교체뚝딱 — 서브 키워드 기반 콘텐츠 확장 (로컬)

확인일: 2026-10-03. 상태: 로컬 구현·검증 완료, stage/commit/push/배포 전. 현재 운영 사이트는 변경하지 않았다.

## 시작 기준과 보호 범위

- main / HEAD `a1a0bda05c6266b719a256ab04abb0a261086610`, 시작 작업 트리 깨끗함.
- 시작: verified 37 / needs_research 20 / Seed 57 / 카테고리 3 / 가이드 3 / sitemap 46.
- 구현 계약 27, 출처 연구 13, SEO 12, QA 18, 최신 확장 보고·계약·Seed·Registry를 확인했다. v1.9의 역사적 수치는 수정하지 않는다.
- 원래 품목 Seed·상세 데이터·Registry·검색 fixture, 공개 URL/canonical, 계산·My Home·ICS 런타임은 그대로 보존한다.
- AdSense meta·ads.txt, 브랜드/CSS, GA 동의, 쿠팡 설정·기존 15개 광고 대상, TODAY/API/D1 설정·DNS는 변경하지 않았다. Production D1/API와 계정 비공개 검색 데이터에 접근하지 않았다.

## 조사 방법과 확인 수준

후보 100개는 100개의 실제 사용자 검색을 확보했다는 뜻이 아니다. 검색량·인기도·급상승 수치는 없다.

- `related_search` 8개: Google에서 ‘필터 세척’을 실제 검색한 화면의 연관 검색 링크를 그대로 관찰.
- `official_faq_topic` 31개: 공식 FAQ/관리 본문에서 확인한 질문·주제를 한국어로 정규화했다. 실제 사용자 쿼리 또는 공식 한국어 원문 그대로라고 주장하지 않는다.
- `idea` 61개: 현재 품목과 검색 결과에서 파생한 편집 가설. 실제 자동완성·검색 수요를 확인했다고 표시하지 않는다.
- Google 자동완성은 입력을 시도했지만 제안 목록 노출을 확인하지 못했다. 자동완성 검증 성공으로 처리하지 않았다.
- Search Console/Naver 쿼리는 제공되지 않았으며 임의 접근하지 않았다. Naver 검색 제안의 직접 관찰도 이번에는 하지 않았다.
- 검색 결과의 AI 개요·블로그·판매 문구는 사실 근거로 채택하지 않았다. 공식 본문을 직접 열어 적용 범위와 주장 확인.

실제 연관 검색 8개: ‘청소기 헤파 필터 세척’, ‘LG 공기청정기 필터 물 세척’, ‘공기청정기 필터 청소’, ‘벽걸이 에어컨 필터 청소’, ‘에어컨 필터 청소 안하면’, ‘건조기 필터 청소 방법’, ‘LG 건조기 필터 청소’, ‘건조기 필터 청소 안하면’.

조사에 사용한 공개 검색 결과: [Google ‘필터 세척’](https://www.google.com/search?q=%ED%95%84%ED%84%B0+%EC%84%B8%EC%B2%99), ‘렌즈 케이스 수돗물 교체’, ‘마스카라 물 유통기한’, ‘엔진오일 주행거리 기간 설명서’ 및 제조사/기관 한정 검색. 검색 결과 존재는 검색량의 증거가 아니다.

레퍼런스 구조는 LG의 제품·관리 FAQ 분리, Dyson의 모델별 유지보수 순서, Oral-B의 제품군/호환 FAQ, CDC의 용액 종류·관리체계, Michelin의 규격·관리·DOT 질문 분리를 참고했다. 레퍼런스 문구·이미지·본문을 복제하지 않았다.

## 의도 분류와 구현 결정

- A 62개: 기존 URL 설명·조건·이미 검증된 답 재사용 또는 탐색 보강. 62개 모두 새 본문을 작성한 것은 아니다.
- B 3개 표현: 건조기 필터 청소 한 묶음. 독립 기기 후보이나 모델별 청소·교체 근거와 고유 의도 추가 확인 전 보류. Seed·품목 route 추가 없음.
- C 26개 표현: 6개의 서로 구별되는 절차/비교 가이드로 통합.
- D 9개: 공식 원문/국가별 표시/가격/폐기/안전 보장 문제로 보류.

15~25개 신규 페이지 목표보다 적은 6개만 구현했다. 기존 37개 품목의 교체시기·수명 표현과 기존 3개 가이드가 상당수 질문을 이미 해결한다. 모델·국가·표현만 바꾼 페이지와 동일한 답의 FAQ 페이지는 만들지 않았다.

모든 후보의 발견 경로·현재 URL·사용자 질문·빈틈·근거 확보 가능성·결정은 [조사 JSON](../research/subkeyword-audit-2026-10-03.json)에 있다. B의 현재 대응 상세는 없어서 null로 기록한다.

## 신규 가이드 6개 — 기존 페이지와 다른 역할

| URL | 제목 | 기존 답과 구별되는 질문 |
| --- | --- | --- |
| /guide/washed-filter-drying/ | 씻은 청소기 필터, 언제 다시 끼워도 될까요? | 세척 여부 분류가 아니라 세척 후 재장착 가능 조건을 판단하는 절차 |
| /guide/filter-alert-after-replacement/ | 필터를 바꿨는데 교체 알림이 남아 있나요? | 필터 종류·수명이 아니라 실제 교체 뒤 남은 알림과 모델별 초기화 확인 |
| /guide/contact-lens-case-cleaning/ | 렌즈 케이스는 수돗물로 씻어도 되나요? | 케이스의 교체주기와 구분되는 매번 사용 후 세척·건조 절차 |
| /guide/contact-lens-solution-roles/ | 렌즈 세척액·생리식염수·과산화수소는 어떻게 다른가요? | 사용기한이나 케이스 청소가 아니라 서로 대체할 수 없는 용액 기능의 비교 |
| /guide/electric-brush-head-compatibility/ | 전동칫솔모, 모양이 같으면 서로 호환될까요? | 칫솔 교체시기와 별개인 손잡이·헤드 호환 확인 절차 |
| /guide/tire-dot-date/ | 타이어 DOT 제조일자, 교체일과 어떻게 구분하나요? | 수명·주행거리 설명이 아니라 제조 주·연도 코드 판독과 기록의 차이 |

각 가이드는 첫 문장에서 직접 답하고, 확인 순서·조건/예외·공식 근거 링크와 해당 품목/가이드 링크를 제공한다. 실제 관찰되지 않은 기간·비용·위험 수치를 넣지 않았다. 미래 교체일·중화시간·안전 수명 계산 기능은 추가하지 않았다.

## 기존 상세 보강과 탐색

- /item/toothbrush/ — 「칫솔 뚜껑은 젖은 채로 닫아도 될까요?」: ADA는 사용 뒤 충분히 헹군 칫솔을 세워 자연 건조하고 젖은 칫솔의 밀폐 보관을 피하도록 안내합니다. 살균기나 뚜껑이 기존 교체 기준을 연장한다고 계산하지 않습니다.
- /item/mascara/ — 「마른 마스카라에 물을 넣어도 될까요?」: FDA는 말라버린 마스카라에 물이나 침을 더하지 말고 버리도록 안내합니다. 미국의 일반 안내이며 국내 제품 라벨과 보관 지침이 우선입니다. 물을 넣은 날부터 사용기한을 새로 계산하지 않습니다.
- /item/sunscreen/ — 「보관 장소도 확인했나요?」: 구매일만으로 사용 가능 여부를 판단하지 않습니다. FDA의 화장품 보관 안내는 뜨거운 차량처럼 열에 노출되는 장소를 피하도록 합니다. 실제 선크림의 국내 라벨과 제조사 보관 지침을 먼저 확인하고 보관 조건을 지키지 못했다면 제조사에 문의하세요.

- 홈의 기존 가이드 영역에 신규 가이드를 포함한다. 홈 전체 리디자인 없음.
- 품목/색인 카테고리에는 실제 해당 품목과 연결된 가이드만 연결한다.
- 기존 가이드와 신규 가이드에 의미가 있는 역방향 관련 링크도 제공한다. 자기 자신·중복 가이드 링크 제외.
- 검색은 기존 품목의 우선순위·에어컨필터 분기·verified/needs_research를 유지하고 별도 ‘질문별 확인 가이드’ 결과를 추가했다.
- ‘렌즈’에서 콘택트렌즈는 계속 확인 중이며, 케이스·용액 가이드가 이 품목을 승격시키지 않는다.
- 검색어는 로컬 필터링에만 사용하며 외부 검색 API·쿠팡 전달 없음. 신규 검색 결과는 DOM textContent로 만든다.
- 기존 URL 변경·301·품목의 source_ids/cycle/commerce/계산 로직 변경 없음.

## 주장·출처·적용 범위

기존 `04-source-registry.json`의 46개 레코드는 보존한다. 이번 가이드/보강의 주장별 근거는 `research/subkeyword-content-2026-10-03.json`의 독립 감사 source map 9개에 확인일·직접 뒷받침하는 내용·일반화 금지 내용을 기록했다. 원래 품목을 승격하거나 기존 근거를 덮어쓰는 레지스트리가 아니다.

### Dyson Korea — 다이슨 Gen5 디텍트 무선 청소기 가이드 — 필터 유지보수

[공식 원문](https://www.dyson.co.kr/products/cord-free/dyson-gen5detect/owners) · A_DIRECT · 확인 2026-10-03
적용 범위: 한국 Gen5 디텍트의 세척 가능 필터. 다른 모델의 세척·건조 시간을 보증하지 않음
확인한 내용: 최소 24시간 건조 후 완전히 마른 필터 재장착; 젖은 필터 사용 시 제품 손상 가능
이 자료로 확정하지 않는 내용: 모든 HEPA 필터 물 세척; 24시간이면 항상 건조 완료

### LG전자 — [LG 에어컨 필터] 표시창에 [청정][송풍][필터교체] 표시가 깜빡여요

[공식 원문](https://www.lge.co.kr/support/solutions-20152403079263) · A_DIRECT · 확인 2026-10-03
적용 범위: 원문의 공기청정 기능·출시연도별 LG 에어컨. 모든 기기의 버튼 조작으로 일반화하지 않음
확인한 내용: 교체 알림은 실제 오염도가 아닌 사용시간 기준; 송풍 표시는 극세필터 청소 안내인 경우가 있음; 출시연도별 자동 해제·해제 방법 차이
이 자료로 확정하지 않는 내용: 알림 초기화가 실제 교체를 대신함

### LG전자 — 공기청정기, 자주 묻는 질문 살펴보기

[공식 원문](https://www.lge.co.kr/story/faq/air-purifier-faq) · A_DIRECT · 확인 2026-10-03
적용 범위: LG FAQ에서 설명하는 디스플레이·ThinQ·설정 메뉴 지원 모델
확인한 내용: 필터 실제 교체 뒤 해당 필터의 교체 알림 초기화; 필터 잔여량 디스플레이 또는 ThinQ 확인
이 자료로 확정하지 않는 내용: 모든 모델의 동일한 초기화 메뉴

### CDC — About Cleaning, Disinfecting, and Storing Contact Lenses

[공식 원문](https://www.cdc.gov/contact-lenses/about/about-cleaning-disinfecting-and-storing-contact-lenses.html) · A_DIRECT · 확인 2026-10-03
적용 범위: 미국 렌즈 관리 안내. 다목적 용액·과산화수소·RGP 관리체계를 구분하고 실제 제품 라벨과 안과 안내 우선
확인한 내용: 케이스는 새 용액으로 문질러 헹구고 물 사용 피함; 남은 용액에 새 용액 보충 금지; 생리식염수는 소독제가 아님; 과산화수소 제품은 지정 중화 케이스·라벨 지침 사용
이 자료로 확정하지 않는 내용: 모든 렌즈의 교체 날짜; 모든 제품의 동일 중화 시간

### Oral-B US — Replacement Brush Heads — Oral-B Brush Head FAQs

[공식 원문](https://oralb.com/en-us/products/replacement-brush-heads/io-brush-heads/) · A_DIRECT · 확인 2026-10-03
적용 범위: 미국 iO와 Genius·Smart·Vitality·Pro 및 Kids 제품군. 다른 제조사·모델의 호환 보증 아님
확인한 내용: iO 손잡이는 iO 칫솔모; 구형 Genius·Smart·Vitality·Pro는 해당 Pro 칫솔모; Kids도 iO Kids·Pro Kids 별도 호환
이 자료로 확정하지 않는 내용: 모든 원형 헤드 호환; 제3자 부품 성능·호환 보증

### 미쉐린 코리아 — 타이어 표시 설명: 타이어를 판독하는 방법

[공식 원문](https://www.michelin.co.kr/auto/advice/tyre-basics/tyre-markings-explained) · A_DIRECT · 확인 2026-10-03
적용 범위: 미쉐린의 DOT·타이어 표기 읽기 안내. 차량별 공기압과 실제 상태 점검은 별도
확인한 내용: DOT 말단 4자리 앞 2개는 제조 주, 뒤 2개는 제조 연도; MAX PRESS는 차량 권장 공기압과 다를 수 있음
이 자료로 확정하지 않는 내용: 제조일만으로 남은 안전 수명 계산

### 미쉐린 코리아 — 자주 묻는 질문 — 제조일(DOT) 및 원산지

[공식 원문](https://www.michelin.co.kr/auto/faq-car) · A_DIRECT · 확인 2026-10-03
적용 범위: 미쉐린 코리아 FAQ. 제조일 표시는 안·바깥 한쪽에만 있을 수 있음
확인한 내용: 제조일자는 한쪽 사이드월에 표시될 수 있음; 1012는 2012년 10주차 생산 예시
이 자료로 확정하지 않는 내용: 교체일과 제조일 동일 취급

### American Dental Association — Toothbrushes — Toothbrush Care

[공식 원문](https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes) · A_DIRECT · 확인 2026-10-03
적용 범위: 일반 칫솔 관리. 살균 효능과 감기 후 자동 교체 규칙은 이 보강에서 주장하지 않음
확인한 내용: 사용 뒤 헹구고 세워 자연 건조; 젖은 칫솔을 밀폐 보관하지 않음
이 자료로 확정하지 않는 내용: 살균기로 교체주기 연장

### FDA — Shelf Life and Expiration Dating of Cosmetics

[공식 원문](https://www.fda.gov/cosmetics/cosmetics-labeling/shelf-life-and-expiration-dating-cosmetics) · A_DIRECT · 확인 2026-10-03
적용 범위: 미국 일반 화장품 안내. 국내 라벨·제조사 보관 지침 우선
확인한 내용: 마른 마스카라에 물·침 추가하지 않음; 열·습도·보관 상태가 제품 유지기간에 영향
이 자료로 확정하지 않는 내용: 모든 화장품의 동일 개봉 후 사용기한

## 보류 목록

- D 「감기 후 칫솔 교체」 — 확인한 ADA 관리 본문만으로 모든 감기 뒤 즉시 교체 규칙을 만들 수 없음. 교체·보관 안내만 유지.
- D 「화장품 12M 표시」 — 표시기호의 국가별 제도·실제 라벨 원문을 추가 확인하기 전 법적 의미나 자동 기한을 확정하지 않음.
- D 「화장품 냉장 보관」 — 제형·제조사별 보관 지침이 필요하며 모든 화장품의 냉장 보관을 권하지 않음.
- D 「타이어 교체 비용」 — 차종·규격·판매처·작업별 실제 가격 자료 없음. 비용 수치 미생성.
- D 「아기 젖꼭지 단계 교체」 — Natural Response 미국 공식 URL 본문이 비어 접근 확인 실패. Classic의 교체 예시를 유량 단계 변경 기준으로 쓰지 않음.
- D 「아기 젖꼭지 구멍 넓히기」 — 확인한 공식 원문 없이 가공·구멍 확대를 안내하지 않음. 제품군별 사용설명서 추가 필요.
- D 「냉장고 필터 교체 후 물 빼기」 — 냉장고 모델·판매국별 플러싱 지침을 대조하기 전 공통 시간·물량을 추가하지 않음.
- B 「건조기 필터 청소 방법」 — 세 쿼리는 건조기 필터 청소 한 묶음. 실제 모델별 청소 원문·교체 필요 조건을 더 확인한 뒤 기존 청소·필터 가이드와 중복 여부를 결정. Seed/route 추가 없음.
- B 「LG 건조기 필터 청소」 — 세 쿼리는 건조기 필터 청소 한 묶음. 실제 모델별 청소 원문·교체 필요 조건을 더 확인한 뒤 기존 청소·필터 가이드와 중복 여부를 결정. Seed/route 추가 없음.
- B 「건조기 필터 청소 안하면」 — 세 쿼리는 건조기 필터 청소 한 묶음. 실제 모델별 청소 원문·교체 필요 조건을 더 확인한 뒤 기존 청소·필터 가이드와 중복 여부를 결정. Seed/route 추가 없음.
- D 「교체주기 계산 안전 보장」 — 날짜·횟수만으로 안전 보장 콘텐츠를 만들지 않음. 기존 도구 한계 안내 유지.
- D 「교체한 필터 버리는 방법」 — 폐기 대상·재질·지역별 공식 처리 근거가 미확정. 기존 검증된 버림뚝딱 연결 외 추가 안내 없음.

특히 Philips Natural Response 공식 미국 URL은 본문 0줄로 확인되어, 검색 snippet의 수유 단계 조언을 확정 답으로 사용하지 않았다.

## 최종 수량

- verified 37 / needs_research 20 / Seed 57 — 변동 없음.
- 품목 상세 37 / 색인 카테고리 3 / 가이드 9 (기존 3 + 신규 6).
- sitemap 52 = 상세 37 + 카테고리 3 + 가이드 9 + 홈·소개·출처 원칙 3.
- 생성 HTML 57 = 색인 52 + search/my-home/privacy/affiliate-disclosure 4 + 404 1.
- 검색·My Home·개인정보·제휴 고지·404·needs_research는 sitemap 제외.

## 검증 결과

- npm run build: 성공, 정적 HTML 57개. 첫 시도 Windows spawn EPERM은 실행 제한으로, 승인된 동일 빌드 재실행에서 성공했다.
- test:data / search / e2e / today / release / coupang / analytics / expansion / content-expansion / subkeywords: 모두 통과.
- 기존 검색 fixture 70개 및 Seed 57개 전체 이름·별칭 유지. 신규 가이드의 실제 빌드 검색 스크립트 실행: 제목·키워드 30 + 빈값/script/missing 3 = 33개, 반복 제출·이전 결과 제거·held 상태 보존 추가 검증.
- E2E 20개는 기존 빌드 invariant 검사의 통과다. 전체 20개 사용자 동작을 이번 브라우저에서 다시 수행했다고 주장하지 않는다.
- 보강 데이터/도구 보호 검사: 기존 Seed·상세·Registry·fixture·보호 런타임이 기준 커밋과 동일.
- title/description/H1/canonical 중복 없음; JSON-LD/OG 파싱·동일 URL 확인; 내부 링크 존재, sitemap 전체 홈 도달 가능. 신규 가이드 광고 없음.
- 가이드·기존 상세까지 포함한 편집 본문 4-gram Jaccard 최대 0.097852 (기존 아기 젖꼭지/아기 젖병). 신규 가이드끼리 최대 0.057972 (케이스 관리/용액 비교). 자동 유사도만으로 품질을 보증하지 않고 고유 질문과 절차를 별도로 수동 검토했다.
- 기존 가장 짧은 페이지는 출처 원칙·소개·주방 카테고리·도마·매트리스이며, 이번 목표와 무관한 임의 장문 보강을 하지 않았다.
- 로컬 HTTP: 52 URL 전부 200·공식 canonical·색인 허용, 보조 4페이지 noindex, unknown item 실제 404 + noindex, sitemap/robots 200.
- 실제 브라우저: 신규 가이드 6개 + 본문 보강 상세 3개 × PC1280/모바일390/360 = 27 화면. innerWidth/scrollWidth 전수 확인, 가로 넘침 없음. 대표 모바일 가이드/상세 화면도 직접 시각 확인.
- 실제 키보드 Enter 검색/가이드 이동; 렌즈·필터 리셋·타이어 DOT·골프공·script 입력 결과 확인. 콘솔 warn/error 없음.
- 이 브라우저 QA는 My Home 저장 데이터를 생성하거나 다른 origin 저장소를 삭제하지 않았다.
- TODAY는 순수 Astro preview에서 Function이 제공되지 않으므로 ‘TODAY —’ fallback이며 handler/client/D1 환경 분리는 로컬 동작 테스트로 검사했다. Production D1 직접 조회 없음.
- pages.dev host-specific noindex는 `_headers` 원본/빌드 복사와 보호 검사를 통과. 배포하지 않았으므로 신규 운영 응답 헤더를 확인한 것은 아니다.
- AdSense·ads.txt·GA·쿠팡은 자산/설정 불변 및 회귀 검사만 확인. GA 실제 collect/차단 없는 Chrome 광고 iframe을 재검증했다고 주장하지 않는다.
- git diff --check: 통과(LF/CRLF 알림만 있음). stage/commit/push/배포 없음.

## 변경 파일

- package.json: 새 로컬 검사 명령.
- public/sitemap.xml, research/expansion-contract.json: 승인된 가이드 6개와 sitemap 52 기준.
- research/subkeyword-audit-2026-10-03.json: 100개 후보와 확인 수준·분류·개별 이유.
- research/subkeyword-content-2026-10-03.json: 6개 가이드·3개 보강·9개 근거 감사.
- src/data/guides.ts: 기존/신규 가이드 통합, 기존 원문 보존.
- src/components/PracticalGuides.astro, SubkeywordNotes.astro: 탐색과 주장별 출처 표시.
- src/pages/guide/[slug].astro, item/[slug].astro, category/[slug].astro, search.astro: 기존 구조 재사용·상호 연결·검색 가이드 분리.
- scripts/test-subkeyword-content.mjs: 보호 범위·100개 조사·중복·실제 검색 스크립트 검사.
- scripts/test-content-preview-http.mjs: 별도 로컬 QA origin을 환경변수로 지정할 수 있도록 변경.
- docs/SUBKEYWORD-CONTENT-2026-10-03.md: 이 보고서.

## 남은 확인사항

- 사용자 제공 Search Console/Naver 쿼리로 61개 가설의 수요·우선순위 확인 가능. 비공개 데이터를 직접 요청하거나 계정에 접근하지 않았다.
- 건조기 모델별 공식 원문, 유아 수유 단계 원문, 국가별 PAO 표시, 가격·폐기 근거는 보류 유지.
- Production 반영은 별도 승인 이후. 변경 자산의 운영 응답·캐시·배포는 이번 범위 밖이다.

## 후보 목록 (같은 묶음은 독립 페이지 수가 아님)

| 후보 | 분류 | 확인 수준 | 현재 상세 | 결정 |
| --- | --- | --- | --- | --- |
| 청소기 헤파 필터 세척 | A | related_search | /item/vacuum-filter/ | /guide/filter-care-or-replace/ |
| 청소기 필터 물 세척 | A | idea | /item/vacuum-filter/ | /guide/filter-care-or-replace/ |
| 다이슨 필터 24시간 | C | idea | /item/vacuum-filter/ | /guide/washed-filter-drying/ |
| 청소기 필터 건조 | C | idea | /item/vacuum-filter/ | /guide/washed-filter-drying/ |
| 젖은 필터 다시 끼우기 | C | idea | /item/vacuum-filter/ | /guide/washed-filter-drying/ |
| LG 공기청정기 필터 물 세척 | A | related_search | /item/air-purifier-filter/ | /item/air-purifier-filter/ |
| 공기청정기 필터 청소 | A | related_search | /item/air-purifier-filter/ | /item/air-purifier-filter/ |
| 벽걸이 에어컨 필터 청소 | A | related_search | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 에어컨 필터 청소 안하면 | A | related_search | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 필터 세척과 교체 차이 | A | idea | /item/vacuum-filter/ | /item/vacuum-filter/ |
| 필터 교체 알림 초기화 | C | official_faq_topic | /item/air-conditioner-filter/ | /guide/filter-alert-after-replacement/ |
| 에어컨 필터 송풍 표시 | C | official_faq_topic | /item/air-conditioner-filter/ | /guide/filter-alert-after-replacement/ |
| 필터 교체했는데 불 | C | idea | /item/air-conditioner-filter/ | /guide/filter-alert-after-replacement/ |
| 필터 리셋 | C | idea | /item/air-conditioner-filter/ | /guide/filter-alert-after-replacement/ |
| 공기청정기 필터 잔여량 확인 | A | official_faq_topic | /item/air-purifier-filter/ | /item/air-purifier-filter/ |
| 필터 알림은 오염도 기준인가 | A | official_faq_topic | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 필터 알림 자동 해제 | A | official_faq_topic | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 에어컨 초미세먼지 필터 교체 | A | idea | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 필터 청소 후 알림 | A | idea | /item/air-conditioner-filter/ | /item/air-conditioner-filter/ |
| 공기청정기 다른 필터 호환 | A | official_faq_topic | /item/air-purifier-filter/ | /item/air-purifier-filter/ |
| 렌즈 케이스 수돗물 | C | official_faq_topic | /item/contact-lens-case/ | /guide/contact-lens-case-cleaning/ |
| 렌즈 케이스 세척 | C | official_faq_topic | /item/contact-lens-case/ | /guide/contact-lens-case-cleaning/ |
| 렌즈통 말리기 | C | official_faq_topic | /item/contact-lens-case/ | /guide/contact-lens-case-cleaning/ |
| 렌즈액 보충 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-case-cleaning/ |
| 렌즈 생리식염수 소독 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-solution-roles/ |
| 렌즈 세척 소독 차이 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-solution-roles/ |
| 과산화수소 렌즈 케이스 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-solution-roles/ |
| 렌즈액 재사용 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-solution-roles/ |
| 하드렌즈 소프트렌즈 세척액 차이 | C | official_faq_topic | /item/contact-lens-solution/ | /guide/contact-lens-solution-roles/ |
| 렌즈 케이스 교체주기 | A | idea | /item/contact-lens-case/ | /item/contact-lens-case/ |
| 전동칫솔모 호환 | C | official_faq_topic | /item/toothbrush/ | /guide/electric-brush-head-compatibility/ |
| 오랄비 iO 칫솔모 호환 | C | official_faq_topic | /item/toothbrush/ | /guide/electric-brush-head-compatibility/ |
| 오랄비 Pro iO 차이 | C | official_faq_topic | /item/toothbrush/ | /guide/electric-brush-head-compatibility/ |
| 어린이 칫솔모 호환 | C | official_faq_topic | /item/toothbrush/ | /guide/electric-brush-head-compatibility/ |
| 칫솔모 벌어짐 교체 | A | idea | /item/toothbrush/ | /item/toothbrush/ |
| 칫솔 뚜껑 보관 | A | official_faq_topic | /item/toothbrush/ | /item/toothbrush/ |
| 칫솔 자연 건조 | A | official_faq_topic | /item/toothbrush/ | /item/toothbrush/ |
| 감기 후 칫솔 교체 | D | idea | /item/toothbrush/ | hold |
| 전기면도기 헤드 세척 교체 차이 | A | idea | /item/electric-shaver-head/ | /item/electric-shaver-head/ |
| 면도날 교체 횟수 | A | idea | /item/razor-blade/ | /item/razor-blade/ |
| 마른 마스카라 물 넣기 | A | official_faq_topic | /item/mascara/ | /item/mascara/ |
| 화장품 사용기한 개봉 후 차이 | A | idea | /item/mascara/ | /item/mascara/ |
| 선크림 차 안 보관 | A | official_faq_topic | /item/sunscreen/ | /item/sunscreen/ |
| 화장품 제조일자 사용기한 | A | idea | /item/mascara/ | /item/mascara/ |
| 미개봉 화장품 유통기한 | A | idea | /item/mascara/ | /item/mascara/ |
| 선크림 작년 제품 사용 | A | idea | /item/sunscreen/ | /item/sunscreen/ |
| 마스카라 냄새 변화 | A | idea | /item/mascara/ | /item/mascara/ |
| 화장품 개봉일 모를 때 | A | idea | /item/mascara/ | /item/mascara/ |
| 화장품 12M 표시 | D | idea | /item/mascara/ | hold |
| 화장품 냉장 보관 | D | idea | /item/mascara/ | hold |
| 타이어 DOT | C | official_faq_topic | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 제조일자 확인 | C | official_faq_topic | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 4자리 숫자 | C | official_faq_topic | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 제조일자 안쪽 | C | official_faq_topic | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 MAX PRESS | C | official_faq_topic | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 제조일과 교체일 차이 | C | idea | /item/tire/ | /guide/tire-dot-date/ |
| 타이어 편마모 원인 | A | official_faq_topic | /item/tire/ | /item/tire/ |
| 타이어 옆면 혹 | A | official_faq_topic | /item/tire/ | /item/tire/ |
| 타이어 공기압 권장값 | A | official_faq_topic | /item/tire/ | /item/tire/ |
| 타이어 교체 비용 | D | idea | /item/tire/ | hold |
| 엔진오일 주행거리 기간 기준 | A | idea | /item/engine-oil/ | /item/engine-oil/ |
| 엔진오일 가혹조건 | A | idea | /item/engine-oil/ | /item/engine-oil/ |
| 엔진오일 많이 안 타면 | A | idea | /item/engine-oil/ | /item/engine-oil/ |
| 엔진 에어필터 청소 교체 | A | idea | /item/engine-air-filter/ | /item/engine-air-filter/ |
| 에어컨필터 엔진필터 차이 | A | idea | /item/cabin-air-filter/ | /item/cabin-air-filter/ |
| 브레이크 패드 점검 교체 | A | idea | /item/brake-pad/ | /item/brake-pad/ |
| 점화플러그 연식별 교체 | A | idea | /item/spark-plug/ | /item/spark-plug/ |
| 냉각수 보충 교환 차이 | A | idea | /item/engine-coolant/ | /item/engine-coolant/ |
| 수입차 정비표 국내 적용 | A | idea | /item/engine-oil/ | /item/engine-oil/ |
| 정비표 I R 뜻 | A | idea | /item/engine-oil/ | /item/engine-oil/ |
| 아기 젖꼭지 단계 교체 | D | idea | /item/baby-bottle-nipple/ | hold |
| 아기 젖꼭지 구멍 넓히기 | D | idea | /item/baby-bottle-nipple/ | hold |
| 공갈젖꼭지 수유용 차이 | A | idea | /item/pacifier/ | /item/pacifier/ |
| 아기 젖병 재질 교체 | A | idea | /item/baby-bottle/ | /item/baby-bottle/ |
| 젖병 흠집 교체 | A | idea | /item/baby-bottle/ | /item/baby-bottle/ |
| 텀블러 고무패킹 세척 | A | idea | /item/tumbler-gasket/ | /item/tumbler-gasket/ |
| 텀블러 패킹 냄새 | A | idea | /item/tumbler-gasket/ | /item/tumbler-gasket/ |
| 후라이팬 코팅 벗겨짐 | A | idea | /item/frying-pan/ | /item/frying-pan/ |
| 도마 칼집 교체 | A | idea | /item/cutting-board/ | /item/cutting-board/ |
| 주방 수세미 냄새 | A | idea | /item/kitchen-sponge/ | /item/kitchen-sponge/ |
| 로봇청소기 물걸레 세탁 횟수 | A | idea | /item/robot-mop-pad/ | /item/robot-mop-pad/ |
| 로봇청소기 필터 물 세척 | A | idea | /item/vacuum-filter/ | /item/vacuum-filter/ |
| 로봇청소기 브러시 머리카락 | A | idea | /item/robot-vacuum-brush/ | /item/robot-vacuum-brush/ |
| 냉장고 급수 필터 초기화 | A | idea | /item/refrigerator-water-filter/ | /item/refrigerator-water-filter/ |
| 냉장고 필터 교체 후 물 빼기 | D | idea | /item/refrigerator-water-filter/ | hold |
| 가습기 수분필터 공기필터 차이 | A | idea | /item/humidifier-filter/ | /item/humidifier-filter/ |
| 냉장고 탈취필터 세척 | A | idea | /item/refrigerator-deodorizer/ | /item/refrigerator-deodorizer/ |
| 건조기 필터 청소 방법 | B | related_search | 없음 | hold |
| LG 건조기 필터 청소 | B | related_search | 없음 | hold |
| 건조기 필터 청소 안하면 | B | related_search | 없음 | hold |
| 교체일 모를 때 기록 | A | idea | /item/mattress/ | /item/mattress/ |
| 대략 교체일 캘린더 | A | idea | /item/mattress/ | /item/mattress/ |
| 관리했어요 교체했어요 차이 | A | idea | /item/mattress/ | /item/mattress/ |
| 누적 세탁횟수 청소횟수 차이 | A | idea | /item/robot-mop-pad/ | /item/robot-mop-pad/ |
| 매트리스 얼룩 교체 | A | idea | /item/mattress/ | /item/mattress/ |
| 멀티탭 변색 교체 | A | idea | /item/power-strip/ | /item/power-strip/ |
| 와이퍼 줄무늬 교체 | A | idea | /item/wiper-blade/ | /item/wiper-blade/ |
| 샤워기 필터 색 변함 | A | idea | /item/shower-filter/ | /item/shower-filter/ |
| 교체주기 계산 안전 보장 | D | idea | /item/mattress/ | hold |
| 교체한 필터 버리는 방법 | D | idea | /item/mattress/ | hold |
