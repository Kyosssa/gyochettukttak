# 품목 확장 로컬 검증 결과

## 결과

2026-09-30, main HEAD cadd2a2c34dc4929615a5cb4142110e6c0431f0c 유지. commit/push/deploy 없음.
Seed 48 / verified 25 / needs_research 23 / item 25 / category 3 / sitemap 31 / registry 32 / 사용·감사 출처 28.

## 실행한 검사

- npm run build: PASS, 36 HTML 페이지 생성. 최초 sandbox spawn EPERM 이후 허용된 로컬 실행에서 최종 성공.
- test:data: PASS, 중복 id/name/slug, taxonomy, source 참조·감사 대응, 상태·본문 대응, 관련 링크 자기 자신/중복/검증된 route 검사.
- test:search: 기존 fixture 35 PASS + 신규 10개 모든 정확한 이름·별칭 PASS.
- test:e2e: 기존 20개 acceptance를 매핑한 정적 invariant 검사 PASS. 이것을 20개 전부의 실제 브라우저 E2E라고 표현하지 않음.
- test:today: 실제 mock handler/client, 개인정보, Preview/Production DB 분리 설정 회귀 PASS. 운영 D1에는 접근하지 않음.
- test:release: 31 URL title/description/H1/canonical 고유성·존재, JSON-LD 파싱, OG, 내부 링크, needs_research 제외, noindex/robots/ads.txt 회귀 PASS.
- test:coupang: 기존 15개만 대상, 21개 비대상 PASS. 신규 10개 미노출. loader/배너 설정 파일 불변.
- test:analytics: consent/domain/payload/privacy/responsive invariant PASS, GA 파일 불변.
- test:expansion: 원래 15개 seed/content와 기존 registry의 모든 값 불변, 보호 런타임·정책·설정 파일의 기준 커밋 일치 PASS. 신규 10개 scope·고유 설명·메타 길이·route·홈/검색 탐색·31 sitemap, 나머지 23개 route 미생성 PASS.
- git diff --check: PASS. LF→CRLF 알림은 Git 변환 알림이며 whitespace 오류는 없음.

## 실제 브라우저

로컬 Astro preview http://127.0.0.1:4321 에서 IAB로 실행.

- 신규 10개 각각 1280×850, 390×850, 360×850: 30 화면의 DOM 기하 검사에서 scrollWidth≤viewport, button/input 좌우 잘림 0, 적용 범위·출처 있음, iframe/광고 wrapper 0.
- 타이어 PC, 젖꼭지 360, 렌즈 세척액 390 실제 스크린샷 시각 확인.
- 360px 젖꼭지 H1의 음절 중간 줄바꿈 재현 후 신규 상세만 keep-all/balance 적용. 재확인 완료.
- 치간 칫솔 별칭에서 일반 칫솔이 먼저 나오던 문제를 재현. 정확한 이름·별칭 우선순위 수정 후 치간칫솔이 첫 결과인 것 확인. 키보드 Enter 검색·결과 링크 이동, focus outline solid 확인.
- 렌즈 검색: 콘택트렌즈는 확인 중, 세척액은 별도 verified 결과. 렌즈의 교체주기·상품을 생성하지 않음.
- 타이어 음수 주행거리 -1: 오류 표시 및 저장 차단. 직접 입력 12000: 저장·교체 버튼·내 관리 표시 확인.
- 로컬 QA 기록은 전체 데이터 삭제 UI로 제거, 삭제 직후와 새로고침 후 빈 상태 확인. 다른 origin에는 접근하지 않음.
- ICS: IAB download 이벤트 대기는 timeout되어 그 이벤트를 성공 근거로 사용하지 않음. 실제 Downloads/tire-check.ics 생성 시각 2026-09-30 21:34:13, 121 bytes 확인. UTF-8 내용에서 SUMMARY:교체뚝딱 tire 확인, DTSTART:20260930, VCALENDAR/VEVENT 시작·종료를 확인. 미래 교체주기를 생성한 파일이 아니라 실제 교체 기록의 확인 이벤트임.
- 브라우저 error/warn 로그 없음. 모바일 홈 25개 카드, 가로 넘침 없음.
- HTTP 직접 확인: 신규 상세 200, sitemap 200·31 URL, /item/not-real-expansion/ 실제 404 + noindex.

## 보존 및 추가 확인

- pages.dev host-specific _headers와 공식 canonical 정책은 파일/산출물로 검사. 이번에는 배포하지 않았으므로 새로운 운영 헤더 적용을 검증했다고 주장하지 않음.
- TODAY는 로컬 정적 preview에서 TODAY — fallback, handler/DB 분리는 mock와 설정 검사. Production/Preview count 조회·수정·초기화 없음.
- AdSense, ads.txt, GA4, TODAY/D1, DNS, 쿠팡 ID·trackingCode·loader 파일 변경 없음.
- 기존 매트리스 seed의 model_check_required=true와 content의 direct_generic/generic_cards_allowed=true는 기존 데이터 간 불일치로 관찰됨. 현재 실제 일반 상품 카드 구현은 없고 배너는 그대로 유지. 기존 verified 내용을 임의 변경하지 않는 범위에 따라 이번에 수정하지 않음; 향후 메타데이터 정합성 검토 대상.
- 보류 23개는 공식 본문·적용 범위·고유 질문을 더 확보해야 함. 검색량 데이터가 없으므로 추정 수치 없음. 승격 10개도 claim_scope를 넘어 모델·지역·제품군을 일반화하지 않음.

## 변경 파일

- 02-items.seed.json, 04-source-registry.json, 05-launch-content.seed.json
- public/sitemap.xml
- src/pages/item/[slug].astro, src/pages/search.astro
- package.json
- scripts/validate-data.mjs, test-search.mjs, test-static.mjs, test-today.mjs, test-release.mjs, test-coupang.mjs, test-expansion.mjs
- research/2026-09-30-expansion.json, 2026-09-30-expansion-audit.md, 2026-09-30-expansion-qa.md, expansion-contract.json, expansion-source-audit.json

총 tracked 변경 13개 + 신규 파일 6개. 기존 ZIP·dist·node_modules·.astro는 커밋하지 않음.
