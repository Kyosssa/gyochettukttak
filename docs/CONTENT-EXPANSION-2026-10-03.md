# 교체뚝딱 2차 콘텐츠 확장 — 로컬 결과

확인일: 2026-10-03 (한국 시간). 아래는 최초 **로컬 검증 시점(commit / stage / push / 배포 전)**의 기록이다. 이후 사용자가 단일 커밋·main push·Production 자동 배포를 승인했다. Production D1 직접 조회·수정, migration, DNS 작업은 승인 범위에 없으며 수행하지 않는다.

## 1. 시작 기준과 권한

- 실제 main HEAD: `364d89ddd5d6fc2980db91c4af3263d74c7a8893`. 시작 작업 트리 깨끗함. 사용자 기준과 일치.
- 시작: Seed 48 / verified 25 / needs_research 23 / 색인 카테고리 3 / sitemap 31 / Registry 32 / 품목 사용·감사 출처 28.
- 읽은 기준: 구현 계약 27, QA 18, 출처·연구 13, SEO 12, 제휴·교차사이트 14, README 00, bootstrap 20, handoff 21, 이전 확장 감사·QA 및 `research/expansion-contract.json`.
- ZIP v1.9의 역사적 15/21 계약·보고는 보존. 이번 사용자 승인 범위만 현재 확장 계약에 반영. `23-validation-report.json`의 Registry 21은 현재 기준이 아님.
- 50개 비교 = 기존 보류 23 + 신규 27. 새 표현·부품이라고 별도 페이지를 만들지 않음. 검색량·인기도 추정 없음.

## 2. 채택 결과

**12개**: 기존 3개 승격(텀블러 고무패킹·아기 젖병·브레이크 패드) + 신규 9개(전기면도기 헤드·렌즈 케이스·공갈젖꼭지·냉장고 급수 필터·로봇청소기 메인 브러시·로봇청소기 물걸레 패드·엔진 에어필터·점화플러그·엔진 냉각수).

목표 15~25개보다 적다. 원문·고유 질문·적용 조건이 확보되지 않은 후보로 수를 채우지 않았다. 전동칫솔모, 로봇청소기 필터, 가습기 필터 분기, 오일 필터는 기존 상세에서 처리한다. 화장품 일반 확인은 가이드로 처리한다. 신규 보류 후보는 Seed에 무분별하게 추가하지 않았다.

최종: **verified 37 / needs_research 20 / Seed 57 / 색인 카테고리 3 / 가이드 3 / sitemap 46 URL**.

- sitemap = 홈·소개·출처 원칙 3 + 상세 37 + 카테고리 3 + 가이드 3.
- Registry 46. 품목의 고유 사용 출처 41, 가이드 전용 FDA 일반 화장품 근거를 합친 사이트 사용 출처 42. 신규 출처 감사 14개(기존 감사 28 + 신규 14).
- 상세·가이드 모두 실제 적용 제품·국가·모델을 표시한다. 해외 권고를 국내 공통 수명으로 계산하지 않는다.

## 3. 기존 verified 25개 전수 감사

표는 여섯 질문(시점, 먼저 볼 상태, 관리 가능 여부, 예외, 사용자 확인 대상, 계산 한계)을 함께 검토한 기록이다. ‘유지’는 새로운 수명·효능을 추가할 근거가 충분하다는 뜻이 아니다. 원문 재확인 한계는 아래 별도 기록한다.

|상세|교체·점검 판단 / 먼저 볼 상태|관리와 교체 구분|예외·사용자가 확인할 정보|도구 한계·조치|
|---|---|---|---|---|
|칫솔|기존 ADA 기간·마모 안내 유지|헹굼·자연 건조와 새 칫솔모 장착 구분 추가|Oral-B iO 호환 분기, 손잡이 모델|기존 날짜 정책 유지. 전동칫솔모 별칭·공식 출처·2개 설명 추가|
|면도날|기존 단일 날 사용 횟수 안내 유지|헹굼과 전기 헤드 교체는 별개|AAD 단일 날과 전기면도기 설명서 구분|사용자 입력만 저장. 전기 헤드 분기·관련 링크 추가|
|샤워기 필터|수질·제품별 안내, 애터미 예시는 제품 한정|다른 필터의 세척법을 전용하지 않음|필터 종류·모델·애터미의 서로 다른 부품|공통 D-Day 없음. 기존 출처·설명 유지|
|수세미|냄새·오염 상태, 확정 수명 없음|싱크대 헹굼이 교체를 대체한다고 주장하지 않음|Mayo의 주방 스펀지 안내, 재질 차이|상태 기록만. 본문 재확인 후 유지|
|후라이팬|코팅 손상 우선, 고정 연수 없음|부드러운 도구·스펀지 관리와 손상 교체 구분 추가|코팅 팬과 다른 재질 구분, 제품 지침|상태 기록만. 빈 팬 가열 주의 추가|
|도마|깊은 칼집·마모 기준 유지|세척 가능 여부는 재질·제품 지침|재질과 손상, 기존 USDA 안내|새 날짜·세척법 추가 안 함. 원문 재접근 실패로 보강 보류|
|정수기 필터|모델·알림·실제 사용량 기준 유지|다른 기기의 필터 세척법 전용 금지|모델·필터 단계·사용량 단위|입력값 기록만, 인증 유효정수량을 자동 교체일로 계산하지 않음|
|매트리스|보조 일반 기간보다 처짐·상태 우선|청소가 구조 손상을 복구한다는 주장 없음|재질·제품 지침과 B_GENERAL 성격|기존 날짜 기록만. 구매 메타데이터 기록 문제는 아래 참조|
|에어컨 필터|모델·필터 종류별 관리·교체|LG 극세와 탈취·TVF 물 세척 여부 분기 추가|실제 필터 이름·모델 설명서|공통 기한 없음. 세척일과 교체일 분리|
|공기청정기 필터|모델별 알림·교체 기준|LG 제품군별 관리가 다름을 추가|뒷면·하단 모델 라벨, 필터 구조|모델별 예시를 공통 주기로 계산하지 않음|
|가습기 필터|필터 종류별 안내|하이드로에센셜 수분 필터와 공기 필터 세척 여부 분리|같은 기기 안의 다른 부품|관리 버튼이 교체일을 바꾸지 않음. 분기 설명 추가|
|청소기 필터|모델·세척 가능 여부|Dyson 건조와 Roomba 물 세척 금지 분기 추가|Combo i5/i5+·j5/j5+와 다른 기기 구분|새 공통 기한 없음. 로봇 필터 별칭·출처·실제 관련 링크 추가|
|멀티탭|정격·손상 우선, 법정 고정 연수 없음|손상 상태를 청소로 해결한다고 주장하지 않음|제품 정격과 설치 환경|날짜 안전 판정 없음. 관련 청소기 링크 숨김 유지|
|와이퍼|닦임 상태·차량 설명서|차량별 관리 지침 우선|차종·연식, 기존 현대 국내 설명서|직접 입력 주행거리만, 공통 교체 거리 없음. 유지|
|차량 공조 필터|차종 정비표·운행 조건|필터를 임의 물 세척하지 않음|차량 설명서·부품 코드·먼지 환경|해당 차종 예시를 국내 전체에 계산하지 않음. 유지|
|치간칫솔|모의 마모·손상|헹굼·건조와 새 브러시 구분|TePe의 해당 제품과 맞는 크기|상태 기록만. 기존 2개 고유 설명 유지|
|치약|튜브·포장 표시기한 우선|보관과 기간 연장 보장 구분|Colgate 지역 자료와 실제 제품 표시|표시기한·개봉 후 기간 자동 계산 없음을 도구에 명시, 가이드 연결|
|마스카라|표시 기한·건조 상태|말랐다고 물 섞어 연장하지 않음|FDA 눈 화장품 안내·실제 라벨|구매·개봉일 예시 자동 계산 안 함을 명시, 가이드 연결|
|렌즈 세척액|병 기한·개봉 후 폐기·매회 잔여액 별개|잔여액에 새 용액 보충과 구분|제품 라벨·안과 안내|서로 다른 기간의 자동 통합 없음 명시, 가이드 연결|
|선크림|국내 라벨·보관 상태 우선|보관이 표시기한을 연장한다는 주장 없음|FDA 미국판 사례를 국내 표시 대신 쓰지 않음|날짜로 보호 효과 보장 안 함 명시, 가이드 연결|
|아기 젖꼭지|사용 전 손상과 Classic/Classic+ 예시|세척·소독과 부품 교체 별개|수유용·공갈용·젖병 몸체 구분|제품 한정 예시를 일반 D-Day·ICS로 계산하지 않음. 유지|
|타이어|마모·손상·제조일·차량 기준|점검과 새 타이어 장착 구분|Michelin 일반 안내와 내 차량 규격|주행거리로 안전 판정 없음. 유지|
|엔진오일|차량 정비표의 기간·거리 조건|보충과 교환, 오일 필터 작업 구분 추가|LX2 미국판과 내 차량·가혹조건|직접 입력 거리만. 일반 교환 거리 없음. 관련 부품 링크 추가|
|가스레인지 점화건전지|건전지식인지와 점화 상태|220V·압전식을 건전지 교체로 취급하지 않음|기기 모델·전원 방식|린나이 원문 재접근 실패. 추가 원인 진단·기간 보강 보류|
|냉장고 탈취제|교체형 알림·반영구형 구분|알림 초기화와 실제 교체 별개|LG 내장 필터와 별도 시판 탈취제|공통 연 1회 계산 없음. 기존 2개 설명 유지|

총 12개 기존 상세 보강: 고유 설명 8개 + 사용기한 도구 한계·가이드 연결 4개. 나머지 13개는 근거 범위와 기존 동작을 보존했다. 모든 상세에 같은 FAQ를 일괄 추가하지 않았다.

### 원문·재확인 한계

- USDA 도마, 린나이 구형 FAQ: 이번 도구의 원문 접근 실패. 폐기·변경이라고 단정하지 않고 기존 승인 콘텐츠 유지, 새로운 주장 추가 보류.
- 삼성 정수기 FAQ 본문은 열리지만 이전 감사의 일부 숫자와 현재 추출 본문 간 재확인 한계가 있음. 기존 공개 첫 답변에는 특정 공통 숫자가 없고 이번에 숫자를 추가하지 않았다. 제품 설명서 원문 보강은 후속 확인 사항.
- 애터미의 세그먼트 3~4개월·겔 1~2개월 예시는 본문에 유지되어 있음. 바디럽 URL은 **사용자 상품 리뷰**이며 제조사의 기술 교체 안내가 아님. 기존 승인된 보조 성격만 유지하고 이를 신규 기간·건강 효과 근거로 사용하지 않음.
- Mayo·Sleep Foundation·연합뉴스 현재 본문 재확인. Sleep Foundation과 연합뉴스는 정부·제조사 직접 자료처럼 승격하지 않음. 기존 출처 등급 보존.
- 후보 보류의 ‘미확보’는 이번 검토에서 승격할 충분한 본문이 없다는 의미이지 해당 근거가 어디에도 없다는 단정이 아님.

### 매트리스 구매 제한 메타데이터

기존 Seed의 모델 확인 메타데이터와 content의 `direct_generic` 기록 차이는 유지했다. 공개 템플릿에 일반 상품 추천 카드 렌더러가 없고 실제 가격·호환 상품 추천도 없음. 기존 쿠팡은 일반 제휴 배너로 제품 호환 추천이 아니며 신규로 확대하지 않았다. 현재 사용자 동작을 우회하는 구매 추천이 확인되지 않았으므로 이번 콘텐츠 확장과 무관한 데이터 정리를 하지 않았다.

## 4. 가이드 3개와 고유 역할

기존 `/about/`와 `/source-policy/`는 서비스·근거 정책 안내이고, 같은 확인 순서 가이드는 없었다.

- `/guide/filter-care-or-replace/`: 필터명 → 물 세척 허용·금지 → 시간 알림 → 실제 작업 기록. 서로 다른 제조사 사례를 비교하되 개별 관리법을 섞지 않음.
- `/guide/cosmetic-expiry-label/`: 실제 라벨 → 개봉 후 안내 → 보관·변화 → 도구 한계. FDA 미국 제도를 국내 표시 의무로 해석하지 않음.
- `/guide/read-maintenance-manual/`: 모델·국가 → I/R 작업 → 일반·가혹조건 → 부품 호환·정비 기록. 보증·서비스 방문 간격을 수명으로 해석하지 않음.

각 가이드는 4단계 고유 본문과 실제 verified 상세 링크·근거 링크가 있다. 내용 없는 허브나 복사 모음 없음. 홈과 기존 카테고리·관련 상세에서 연결한다.

## 5. 기준과 도구의 일치

- 신규 12개 모두 `cycle:null`, 계산기 비활성. 상태·모델·차량·직접 입력 사용량 도구를 재사용한다.
- 4주·2년·6개월·6~12개월은 적용 제품 예시. 전체 제품군 자동 만료일·긴급도·D-Day·ICS 날짜로 변환하지 않음.
- 렌즈 케이스의 CDC 권고는 렌즈 처방·용액 사용기한과 별개. 이번 도구는 실제 교체 기록만 지원한다.
- 로봇 패드 입력은 **세탁 횟수**. 청소 운행 횟수로 추정하지 않고 관리 버튼이 자동 횟수를 증가시키지 않음.
- My Home은 기존 localStorage 구조 그대로. 관리 시점은 교체일·사용량과 독립적이다.
- ICS는 기록된 실제 교체일의 확인 이벤트. 미래 교체 권고 일정·안전 보장·반복 일정이 아니다. 날짜가 없으면 생성하지 않는다.
- 표시 사용기한과 개봉 후 기간을 동시에 계산하거나 제품별 부품 수명을 자동 산정하는 기능은 보류. 스키마 개편·새 계산기 개발 없음.
- 신규 광고·제휴 없음. 기존 쿠팡 대상 **원래 15개만** 유지. 모델·차종 확인 전 일반 상품 추천 없음.

## 6. 검증 결과

- `npm run build`: 성공, 정적 HTML 51개. 최초 sandbox `spawn EPERM`은 실행 제한으로, 승인된 로컬 실행에서 전체 빌드 성공.
- `test:data`: Seed 57 / verified 37 / 보류 20 / Registry 46, 출처 사용·감사 대응 성공.
- `test:search`: **70 fixture**(이전 35 보존, 브레이크 패드의 승인 승격 상태 갱신, 새 이름·별칭 35 추가). 별도로 **Seed 57개 전체 이름·별칭**의 정확한 첫 결과·상태 검사 성공.
- `test:e2e`: 기존 acceptance 20개의 **빌드 불변식 매핑 검사** 성공. 20개 전체가 실제 브라우저 시나리오로 새로 실행됐다는 뜻은 아님.
- `test:today`, `test:analytics`, `test:coupang`, `test:release`, `test:expansion`, `test:content-expansion`: 성공. 최종 빌드 뒤 전체 9개 검사 스크립트·로컬 HTTP 검사·`git diff --check` 재실행 모두 exit 0. CRLF 변환 예고는 경고이며 공백 오류 없음.
- SEO: 공식 canonical, title/description/H1 고유성, OG, JSON-LD 파싱, noindex 제외, sitemap 46 고유 URL, 내부 링크 대상 존재 성공.
- 고아 페이지 검사에서 기존 카테고리 3개의 유입 링크 부재 발견 → 홈 그룹 제목에 해당 category 링크만 추가. 홈 전체 리디자인 없음. 현재 sitemap **46개 모두 홈에서 도달 가능**.
- 신규 상세·가이드 15개 고유 편집 본문의 4-gram Jaccard 최대 **0.0576**(공갈젖꼭지/젖병). 완전·실질 반복 자동 경고 없음. 수치가 검색 품질 또는 AdSense 승인을 보장하는 것은 아님.
- 기존 짧은 문서 알림: 출처 원칙·소개·카테고리 3개. 카테고리는 품목 탐색·가이드 링크 역할이며 교체 문구 복사로 길이를 늘리지 않음. 출처 원칙·소개도 이번 근거 없는 내용 추가 없음.
- 로컬 preview HTTP: 색인 46개 모두 200·canonical·index 허용, 검색/내 관리/개인정보/제휴 고지 noindex, 없는 품목 **실제 404 + noindex**, sitemap/robots 200.
- 기존 버림뚝딱 연결 4개(칫솔·후라이팬·도마·매트리스): 읽기 전용 HTTP **200**, 각 기존 공식 canonical 일치. 새 폐기 방법·mapping 없음.
- `_headers` 기존 host-specific pages.dev 규칙 및 공식 도메인 규칙 부재 검사 성공. 실제 Cloudflare 응답 헤더는 **이번 로컬 작업에서 재배포·검증하지 않음**.
- 기존 답변·계산·광고 정책 보호 검사: 원래 verified 25개 계산/구매/관리 관련 필드와 기존 출처 기록 보존. 승인된 별칭·추가 출처·고유 설명·관련/가이드 링크·도구 설명만 차이 허용.

### 실제 브라우저 QA (IAB, 별도 로컬 origin)

`http://127.0.0.1:4322`에서 수행. 공식 도메인·pages.dev 저장소와 Production D1은 건드리지 않음.

- 신규 상세 12 + 가이드 3: **1280/390/360px 모두** 실제 DOM 너비 확인, 가로 넘침 없음. 1280의 scrollWidth 1265, 390의 375, 360의 345(세로 스크롤바 제외). 대표 가이드·공갈젖꼭지 화면 직접 확인.
- 360px의 기존 워드마크는 두 줄로 보이는 현상 있음. 가로 넘침은 없으나 이번 브랜드 보호 범위에 따라 기존 헤더 디자인은 변경하지 않음.
- 물걸레 패드: 모델 입력, 음수 사용량 -1 차단, 직접 입력 12 저장, 교체·관리·내 관리 저장, 새로고침 유지 성공.
- My Home: 음수 수정 -3은 저장되지 않음(새로고침 뒤 12 유지), 정상 날짜 `2026-09-20`·사용량 14 수정 성공.
- 실제 관리 핸들러 실행 검사: 관리가 교체일 `2026-09-20`·모델·사용량을 바꾸지 않음. 신규 적용 예시가 미래 ICS 일정으로 바뀌지 않음.
- ICS 다운로드 이벤트 API는 10초 timeout이었으므로 이벤트 자체를 성공으로 처리하지 않음. 실제 Downloads의 `robot-mop-pad-check.ics`(2026-10-03 14:28:40, 130 bytes)를 확인했고 UTF-8 `SUMMARY:교체뚝딱 robot-mop-pad 확인`, `DTSTART:20260920`, VCALENDAR/VEVENT 구조 정상. 미래 권고일이 아닌 수정한 실제 기록 날짜.
- 생성한 로컬 테스트 데이터만 실제 **전체 데이터 삭제** UI로 제거. 삭제 직후·새로고침·새 탭 모두 빈 상태. 다른 origin·쿠키·전체 브라우저 저장소 정리 없음. 에이전트 QA 탭을 닫고 viewport override도 해제했다.
- 신규 별칭 `쪽쪽이`: Enter 검색 → 공갈젖꼭지, Tab으로 검색 버튼 → 결과 링크 접근 확인. `렌즈`는 확인 중 본문을 유지하고 렌즈 자체의 기간·상품 링크 없음; 세척액·케이스 verified 결과는 구분 표시.
- 대표 경로에서 콘솔 오류 없음. GA는 로컬에서 실행되지 않고 신규 상세·가이드에는 쿠팡 loader/슬롯 없음. 실제 운영 GA 수집·쿠팡 iframe·Cloudflare TODAY/D1 동작을 새로 통과했다고 주장하지 않음(코드·회귀 보호만).

## 7. 남은 확인 사항

1. 보류 20개 및 신규 미채택 후보의 직접 원문·제품별 적용 범위 추가 조사. 특히 beautyblender 상충 안내 해소, 유축기 부품·브레이크액 원문 필요.
2. 접근 실패한 USDA·린나이 원문, 삼성 정수기 기존 감사의 숫자 근거 후속 확인. 현재 공개 페이지의 새로운 숫자 확정에는 사용하지 않음.
3. 이후 배포가 승인되면 운영 HTTP·pages.dev 실제 헤더·캐시·실제 광고·GA·TODAY 환경 smoke test 필요. 이번에는 모두 로컬 상태이며 운영 사이트는 기존 25개 그대로다.
4. 모든 신규 품목의 모든 관리 행동을 각각 브라우저에서 반복한 것은 아님. 공통 실제 핸들러 실행 검사 + 대표 UI 흐름 + 신규 15개 전수 화면 검사로 범위를 명시한다.
5. 360px 기존 워드마크 줄바꿈은 별도 UI 변경 승인 시 검토 가능.

## 8. 변경 파일과 상세 근거

아래는 실제 JSON 및 Git 작업 트리에서 생성한 목록이다. 보류 후보의 URL 미확보 칸을 임의 주소로 채우지 않는다.

### 최종 배포 전 승인 점검

- 현재 main과 origin/main은 시작 기준 `364d89ddd5d6fc2980db91c4af3263d74c7a8893`에서 일치한다.
- 신규 9개·기존 보류 승격 3개를 원본 Seed와 직접 비교 확인. verified 25→37, needs_research 23→20, Seed 48→57.
- 신규 12개·기존 보강 12개의 적용 대상·작업 구분·도구 설명 최종 검토 완료. 새 공통 교체 예정일·기한 초과 계산 없음. 공통 런타임은 불변이며 ICS는 실제 기록 날짜만 사용한다.
- sitemap 46 = 상세 37 + 색인 카테고리 3 + 가이드 3 + 홈 1 + 소개 1 + 출처 원칙 1. 출처 원칙은 기존 계약상 색인 정보 페이지이다. noindex 정책인 개인정보·제휴 고지·검색·내 관리 및 보류 품목은 제외했다.
- 이미 성공한 전체 build·9개 검사·로컬 HTTP·45개 화면 크기 검사는 콘텐츠 수정이나 실패가 없어 불필요하게 반복하지 않았다. 기존 AdSense·GA·TODAY·쿠팡·D1 설정 보호 파일의 diff는 없다.
- 기능 결함의 추가 수정 없음. 이번 확장 문서·데이터·템플릿·검사 파일만 stage하고 cached diff를 확인한 뒤 단일 커밋·non-force push한다. 실제 배포 결과와 commit hash는 사용자 최종 보고에 별도로 제공한다.

<!-- GENERATED-DETAILS -->

### 후보 50개 비교

|후보 / 검색 의도|결정·이유|공식 원문 / 범위|
|---|---|---|
|샤워타월 교체시기|보류: 세척과 폐기 상태를 연결하는 제조사 직접 본문 미확보.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|욕실 슬리퍼 교체시기|보류: 재질별 손상·교체 안내의 직접 본문 미확보.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|플라스틱 밀폐용기 교체시기|보류: 내열·사용 안내만으로 공통 교체 기준을 확정하지 않음.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|행주 교체시기|보류: 세척·소독과 폐기 시점을 구분하는 직접 근거 추가 필요.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|실리콘 주걱 교체시기|보류: 보증·교환 정책은 소모품 교체 기준이 아님.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|텀블러 고무패킹 교체시기|승격: 이전 Zojirushi 접근 실패 대신 Thermos의 패킹 세척·교체 본문 확보. Thermos 보틀 적용 범위로 한정.|[Thermos — How to Clean a Stainless Steel Water Bottle — And Keep It Performing Like New](https://thermos.com/blogs/news/how-to-clean-a-stainless-steel-water-bottle-and-keep-it-performing-like-new)|
|베개 교체시기|보류: 베개솜과 구별되는 소재별 교체 근거 부족.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|베개솜 교체시기|보류: 베개와 중복 위험, 충전재별 직접 근거 미확보.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|이불 교체시기|보류: 세탁 지침을 교체주기로 바꿀 수 없음.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|수건 교체시기|보류: 관리 소개는 고정 수명 근거가 아님.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|속옷 교체시기|보류: 탄성·소재 상태와 교체를 연결하는 직접 근거 미확보.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|양말 교체시기|보류: 판매 목록은 교체 기준이 아님.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|운동화 교체시기|보류: Nike 러닝화 안내 본문 불완전. 운동화 전체로 일반화 금지.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|브라 교체시기|보류: 스포츠브라·일반 브라 구분 및 직접 근거 추가 필요.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|칫솔 살균기 필터 교체시기|보류: 살균기 전구와 필터는 다른 부품. 기존 후보 근거 불일치 미해결.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|형광등/LED 전구 교체시기|보류: 정격 수명·보증기간을 실제 교체 날짜로 변환하지 않음.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|아이라이너 교체시기|보류: FDA 일반 눈 화장품 안내만으로 마스카라와 별개의 충분한 교체 설명 미확보.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|메이크업 스펀지 교체시기|보류: beautyblender 공식 안내에 3개월/3~6개월 차이. 적용 범위 충돌 해소 전 승격 금지.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|콘택트렌즈 교체시기|보류: 처방·렌즈 종류·착용 일정 확인 필요. 케이스 관리 기준을 렌즈 자체에 적용하지 않음.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|립스틱 교체시기|보류: 일반 화장품 보관 안내만으로 독립된 고유 교체 기준을 확정하지 않음.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|아기 젖병 교체시기|승격: Philips Anti-colic 설명서에서 부품 손상·균열과 교체 직접 안내 확보. 젖꼭지 주기와 구분.|[Philips Avent — Philips Avent Anti-colic baby bottle — English safety and maintenance](https://www.documents.philips.com/assets/20201021/b01137b437e948ca91a1ac5b01739712.pdf)|
|아기 칫솔 교체시기|보류: 기존 칫솔과 별개 질문·제품별 근거 부족.|이전 보류 사유 유지; 본문 근거 부족 또는 범위 충돌|
|브레이크 패드 교체시기|승격: 현대 NE1a 2025 미국판 마모 경고·축별 교체 안내 확보. 공통 주행거리 계산 없음.|[Hyundai Motor — Disc Brakes Wear Indicator](https://ownersmanual.hyundai.com/full_webhelp/NE1a/2025/en_US/idb4da7abbeff.html)|
|전동칫솔모 교체·관리 기준|기존 칫솔에 통합: Oral-B 직접 FAQ 확보. 손잡이 전체 교체와 다르지만 독립 페이지보다 호환·세척 분기가 적합.|[Oral-B Singapore — FAQ — Which replacement head fits my Oral B toothbrush?](https://www.oralb.com.sg/en-sg/faq)|
|전기면도기 헤드 교체·관리 기준|추가: 수동 면도날과 다른 SH30 헤드·면도망 관리 질문.|[Philips — S3608 User Manual — Cleaning and Replacement](https://www.documents.philips.com/assets/20230913/2bcf6c0f0cb94bc5955cb07c007abdee.pdf)|
|렌즈 케이스 교체·관리 기준|추가: 렌즈·관리용액과 다른 매회 세척 및 케이스 교체 질문.|[미국 CDC — Preventing Eye Infections When Wearing Contacts](https://www.cdc.gov/contact-lenses/prevention/)|
|공갈젖꼭지 교체·관리 기준|추가: 수유용 젖꼭지와 다른 SCF093/02 사용 후 권고.|[Philips Avent — Avent ultra soft SCF093/02 — Disclaimers](https://www.philips.co.uk/c-p/SCF093_02/soother-ultra-soft)|
|냉장고 급수 필터 교체·관리 기준|추가: 탈취 필터와 다른 급수 카트리지·타이머·호환 코드 질문.|[Samsung Canada — Guide to replacing the water filter in your Samsung refrigerator](https://www.samsung.com/ca/support/home-appliances/replace-the-water-filter-in-your-samsung-refrigerator/)|
|로봇청소기 필터 교체·관리 기준|기존 청소기 필터에 통합: Roomba Combo의 물 세척 금지 분기로 구분. 기존 필터 검색 의도와 중복.|[iRobot — Mopping Complete Guide: Roomba Combo i Series and Combo j5/j5+](https://support.irobot.co.uk/articles/en_US/Knowledge/54001)|
|로봇청소기 메인 브러시 교체·관리 기준|추가: 필터와 다른 롤러·캡·축 이물 관리와 부품 교체 질문.|[iRobot — Main Brush Care: All Roomba Models](https://support.irobot.co.uk/articles/en_GB/Knowledge/2451)|
|로봇청소기 사이드 브러시 교체·관리 기준|보류: 메인 브러시와 동일한 교체주기를 적용하지 않음. 독립된 범위 검증 미완료.|승격 판단에 충분한 직접 원문 미확보|
|로봇청소기 물걸레 패드 교체·관리 기준|추가: 직접 확인한 세탁 횟수 기준과 작업 후 관리가 별도 질문.|[iRobot — Mopping Complete Guide: Roomba Combo i Series and Combo j5/j5+](https://support.irobot.co.uk/articles/en_US/Knowledge/54001)|
|건조기 보풀 필터 교체·관리 기준|보류: LG 관리 자료 후보는 확보했으나 세척·교체 직접 조건 구분 검증 미완료.|승격 판단에 충분한 직접 원문 미확보|
|건조기 향기시트 교체·관리 기준|보류: 제품 라벨·종류별 사용 기준 본문 미확보.|승격 판단에 충분한 직접 원문 미확보|
|가습기 위크 필터 교체·관리 기준|기존 가습기 필터에 통합: 물 필터와 공기 필터를 기존 모델 분기에서 구분. 중복 독립 페이지 방지.|[LG Electronics — 하이드로에센셜 필터 교체 및 청소방법](https://www.lge.co.kr/support/solutions-20154871046245)|
|젖병 빨대 교체·관리 기준|보류: 수유 젖꼭지와 다른 부품. 독립된 모델별 직접 근거 미확보.|승격 판단에 충분한 직접 원문 미확보|
|유축기 밸브 교체·관리 기준|보류: 사용 빈도·제품 모델에 맞는 교체 직접 본문 미확보.|승격 판단에 충분한 직접 원문 미확보|
|유축기 멤브레인 교체·관리 기준|보류: 밸브와 혼동하지 않고 고유 질문·모델별 원문 추가 필요.|승격 판단에 충분한 직접 원문 미확보|
|이유식 스푼 교체·관리 기준|보류: 재질별 손상 판단 직접 본문 미확보.|승격 판단에 충분한 직접 원문 미확보|
|화장품 크림 교체·관리 기준|가이드로 통합: 표시기한·개봉 후 기간 확인은 공통 확인 순서로 다룸. 독립 페이지의 고유 근거 부족.|[미국 FDA — Shelf Life and Expiration Dating of Cosmetics](https://www.fda.gov/cosmetics/cosmetics-labeling/shelf-life-and-expiration-dating-cosmetics)|
|액상 파운데이션 교체·관리 기준|보류: 제조사별 표시기한 원문 및 고유 교체 내용 미확보.|승격 판단에 충분한 직접 원문 미확보|
|화장품 브러시 교체·관리 기준|보류: 세척 빈도와 교체 상태를 구분하는 직접 근거 미확보.|승격 판단에 충분한 직접 원문 미확보|
|데오드란트 교체·관리 기준|보류: 제품별 표시기한·개봉 후 안내 본문 미확보.|승격 판단에 충분한 직접 원문 미확보|
|샴푸 교체·관리 기준|보류: 일률적 사용기한을 만들지 않음. 제품별 표시·보관 원문 추가 필요.|승격 판단에 충분한 직접 원문 미확보|
|엔진 에어필터 교체·관리 기준|추가: 실내 공조 필터와 다른 흡기 부품·물 세척 금지 질문.|[Hyundai Motor — Air Cleaner — Filter replacement](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/topic_kxz_byd_qcc.html)|
|점화플러그 교체·관리 기준|추가: 엔진별 정비표 R 항목 및 정비 기록 확인 질문.|[Hyundai Motor — Normal Maintenance Schedule — Spark plugs](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/idf65ecf8f9d3.html)|
|엔진 냉각수 교체·관리 기준|추가: 수위·보충·교환·뜨거운 캡 경고가 구별되는 질문.|[Hyundai Motor — Engine Coolant — Checking and changing coolant](https://ownersmanual.hyundai.com/full_webhelp/LX3/2026/en_US/topic_wtn_bvd_qcc.html)|
|브레이크액 교체·관리 기준|보류: 점검 I 표시를 교환 R로 바꿀 수 없음. 실제 적용 차량 교환 원문 추가 필요.|승격 판단에 충분한 직접 원문 미확보|
|자동차 12V 배터리 교체·관리 기준|보류: 충전·점검과 교환을 구분하는 고유 본문 근거 미확보.|승격 판단에 충분한 직접 원문 미확보|
|엔진오일 필터 교체·관리 기준|기존 엔진오일에 통합: 기존 LX2 정비표의 엔진오일·오일 필터 작업 확인으로 충분. 별도 반복 페이지 방지.|[Hyundai Motor — 2025 LX2 미국판 Normal Maintenance Schedule](https://ownersmanual.hyundai.com/full_webhelp/LX2/2025/en_US/id316950c25a6.html)|

### 신규·승격 상세별 적용 범위와 고유 내용

|품목 / route|공식 근거와 적용 대상|직접 지원 내용 / 일반화하지 않는 내용|
|---|---|---|
|전기면도기 헤드 · /item/electric-shaver-head/|[Philips — S3608 User Manual — Cleaning and Replacement](https://www.documents.philips.com/assets/20230913/2bcf6c0f0cb94bc5955cb07c007abdee.pdf) — Philips S3608·SH30, 영문 설명서|Philips S3608 설명서는 헤드를 2년마다 교체하고 손상된 헤드는 즉시 바꾸도록 안내합니다. 이 기간은 SH30을 사용하는 해당 기기의 예시이지 모든 전기면도기 날·망의 수명이 아닙니다.|
|렌즈 케이스 · /item/contact-lens-case/|[미국 CDC — Preventing Eye Infections When Wearing Contacts](https://www.cdc.gov/contact-lenses/prevention/) — 미국 콘택트렌즈 보관 케이스 관리 안내, 개별 렌즈 처방과 구분|CDC는 렌즈 케이스를 적어도 3개월마다 교체하고 사용 뒤 용액으로 세척하도록 안내합니다. 렌즈 자체의 처방 주기나 용액 병의 사용기한과 같은 기준이 아닙니다.|
|공갈젖꼭지 · /item/pacifier/|[Philips Avent — Avent ultra soft SCF093/02 — Disclaimers](https://www.philips.co.uk/c-p/SCF093_02/soother-ultra-soft) — 영국 ultra soft SCF093/02 제품 안내|Philips Avent ultra soft SCF093/02 안내는 위생상 사용 4주 후 교체를 권고합니다. 수유용 젖꼭지의 3개월 예시와 다르며 다른 재질·모델의 쪽쪽이에 같은 기간을 계산하지 않습니다.|
|냉장고 급수 필터 · /item/refrigerator-water-filter/|[Samsung Canada — Guide to replacing the water filter in your Samsung refrigerator](https://www.samsung.com/ca/support/home-appliances/replace-the-water-filter-in-your-samsung-refrigerator/) — 캐나다 삼성 냉장고 HAF-CIN/HAF-QIN/HAFCU1 등 해당 모델|Samsung Canada는 해당 냉장고 급수 필터에 약 6개월 안내를 제공합니다. 알림은 타이머이며 수질·출수량에 따라 달라집니다. 냉장고 탈취 필터나 모든 국내 냉장고에 같은 주기를 적용하지 않습니다.|
|로봇청소기 메인 브러시 · /item/robot-vacuum-brush/|[iRobot — Main Brush Care: All Roomba Models](https://support.irobot.co.uk/articles/en_GB/Knowledge/2451) — Roomba 메인 브러시, 시리즈별 분리·장착 구조|iRobot은 Roomba 메인 브러시를 주 1회 청소하고 6~12개월 또는 필요 시 교체하도록 안내합니다. 반려동물이 있으면 청소 빈도 안내가 달라집니다. 다른 로봇의 브러시에 같은 기간을 적용하지 않습니다.|
|로봇청소기 물걸레 패드 · /item/robot-mop-pad/|[iRobot — Mopping Complete Guide: Roomba Combo i Series and Combo j5/j5+](https://support.irobot.co.uk/articles/en_US/Knowledge/54001) — Roomba Combo i5/i5+·j5/j5+, 다른 로봇에는 일반화하지 않음|Roomba Combo i5/i5+·j5/j5+ 안내는 물걸레 작업 뒤 세척, 30회 세탁 뒤 패드 교체를 구분합니다. 청소 운행 횟수와 세탁 횟수는 같지 않고 일회용·다른 모델 패드에는 적용되지 않습니다.|
|엔진 에어필터 · /item/engine-air-filter/|[Hyundai Motor — Air Cleaner — Filter replacement](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/topic_kxz_byd_qcc.html) — 2026 LX3HEV 미국판 엔진 흡기 필터|현대 2026 LX3HEV 미국판은 엔진 에어필터가 오염되면 교체하고 물로 씻지 않도록 합니다. 실내 공조 필터와 다르며 먼지·모래가 많은 운행 조건에서는 더 자주 확인해야 합니다.|
|점화플러그 · /item/spark-plug/|[Hyundai Motor — Normal Maintenance Schedule — Spark plugs](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/idf65ecf8f9d3.html) — 2026 LX3HEV 미국판 일반조건 정비표|현대 2026 LX3HEV 미국판 일반조건 정비표에는 점화플러그 교체 주행거리 항목이 있습니다. 엔진·국가·가혹조건이 다르면 기준이 달라질 수 있어 국내 모든 차량의 공통 거리로 계산하지 않습니다.|
|엔진 냉각수 · /item/engine-coolant/|[Hyundai Motor — Engine Coolant — Checking and changing coolant](https://ownersmanual.hyundai.com/full_webhelp/LX3/2026/en_US/topic_wtn_bvd_qcc.html) — 2026 LX3 미국판 엔진 냉각수, 인버터 회로와 구분|현대 2026 LX3 미국판은 냉각된 엔진에서 저장통 MIN/MAX를 확인하고 잦은 보충이 필요하면 정비 점검을 받도록 합니다. 전체 교환 시점은 실제 차량 정비표를 따르며 공통 연수는 계산하지 않습니다.|
|텀블러 고무패킹 · /item/tumbler-gasket/|[Thermos — How to Clean a Stainless Steel Water Bottle — And Keep It Performing Like New](https://thermos.com/blogs/news/how-to-clean-a-stainless-steel-water-bottle-and-keep-it-performing-like-new) — 미국 Thermos 스테인리스 보틀 뚜껑의 분리 가능한 패킹|Thermos는 스테인리스 보틀의 냄새가 세척 후에도 남으면 뚜껑 패킹을 별도로 청소하거나 교체하도록 안내합니다. 병 전체의 변색과 패킹 문제를 구분하며 공통 개월 수는 제시하지 않습니다.|
|아기 젖병 · /item/baby-bottle/|[Philips Avent — Philips Avent Anti-colic baby bottle — English safety and maintenance](https://www.documents.philips.com/assets/20201021/b01137b437e948ca91a1ac5b01739712.pdf) — Avent Anti-colic 젖병·해당 구성 부품, 영문 설명서 5~7쪽|Philips Avent Anti-colic 설명서는 매 사용 전 부품을 점검하고 손상·약해짐이 처음 보이면 버리도록 합니다. 플라스틱에 균열이 생기면 교체하며 젖꼭지의 3개월 안내를 병 전체 수명으로 적용하지 않습니다.|
|브레이크 패드 · /item/brake-pad/|[Hyundai Motor — Disc Brakes Wear Indicator](https://ownersmanual.hyundai.com/full_webhelp/NE1a/2025/en_US/idb4da7abbeff.html) — 2025 NE1a 미국판 마모 경고 장치가 있는 브레이크 패드|현대 2025 NE1a 미국판은 패드가 마모돼 교체가 필요할 때 높은 경고음이 날 수 있다고 안내합니다. 소리 하나로 고장을 확정하거나 모든 차의 교체 주행거리를 만들지 않습니다.|

### 출처 제목·URL·확인일·claim 범위

신규 출처 모두 2026-10-03 본문 확인. 숫자를 인용하는 제품은 해당 모델의 직접 예시에만 사용. Registry의 각 claim에 scope 저장.

- **philips_s3608_heads**: [Philips — S3608 User Manual — Cleaning and Replacement](https://www.documents.philips.com/assets/20230913/2bcf6c0f0cb94bc5955cb07c007abdee.pdf). 적용: Philips S3608·SH30, 영문 설명서. 직접 지원: 손상된 헤드는 즉시 교체하고 해당 모델의 헤드 교체 권고는 2년이다. 매 면도 후 세척하며 커터와 보호망의 짝을 섞지 않는다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **cdc_lens_case**: [미국 CDC — Preventing Eye Infections When Wearing Contacts](https://www.cdc.gov/contact-lenses/prevention/). 적용: 미국 콘택트렌즈 보관 케이스 관리 안내, 개별 렌즈 처방과 구분. 직접 지원: 케이스는 적어도 3개월마다 교체한다. 용액으로 문질러 헹구고 사용 후 뚜껑을 열어 뒤집어 보관하며 새 용액과 잔여액을 섞지 않는다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **philips_ultrasoft_pacifier**: [Philips Avent — Avent ultra soft SCF093/02 — Disclaimers](https://www.philips.co.uk/c-p/SCF093_02/soother-ultra-soft). 적용: 영국 ultra soft SCF093/02 제품 안내. 직접 지원: 위생상 사용 4주 후 공갈젖꼭지 교체를 안내한다. 수유용 젖꼭지와 다른 제품이다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **samsung_ca_fridge_water**: [Samsung Canada — Guide to replacing the water filter in your Samsung refrigerator](https://www.samsung.com/ca/support/home-appliances/replace-the-water-filter-in-your-samsung-refrigerator/). 적용: 캐나다 삼성 냉장고 HAF-CIN/HAF-QIN/HAFCU1 등 해당 모델. 직접 지원: 약 6개월의 필터 알림은 타이머이며 수질·출수 사용량에 따라 시점이 달라진다. 냉장고 모델과 설치된 카트리지 코드를 확인하고 실제 교체 후 알림을 초기화한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **irobot_main_brush**: [iRobot — Main Brush Care: All Roomba Models](https://support.irobot.co.uk/articles/en_GB/Knowledge/2451). 적용: Roomba 메인 브러시, 시리즈별 분리·장착 구조. 직접 지원: 주 1회, 반려동물이 있으면 주 2회 청소하며 6~12개월 또는 필요 시 교체를 권고한다. 브러시 끝과 캡·축에 감긴 이물을 제거하고 축 모양을 맞춰 장착한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **irobot_combo_mop**: [iRobot — Mopping Complete Guide: Roomba Combo i Series and Combo j5/j5+](https://support.irobot.co.uk/articles/en_US/Knowledge/54001). 적용: Roomba Combo i5/i5+·j5/j5+, 다른 로봇에는 일반화하지 않음. 직접 지원: 물걸레 패드는 매 작업 후 청소, 30회 세탁 후 교체를 안내한다. 패드는 자연 건조하며 표백·다림질·회전식 건조를 하지 않는다. 이 모델 필터는 세척 금지이고 청소와 교체가 구분된다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **hyundai_lx3hev_air_cleaner**: [Hyundai Motor — Air Cleaner — Filter replacement](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/topic_kxz_byd_qcc.html). 적용: 2026 LX3HEV 미국판 엔진 흡기 필터. 직접 지원: 오염되면 교체하며 물로 씻거나 헹구지 않는다. 먼지·모래가 많은 운행은 더 자주 교체하고 실제 차량 부품 규격을 확인한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **hyundai_lx3hev_schedule**: [Hyundai Motor — Normal Maintenance Schedule — Spark plugs](https://ownersmanual.hyundai.com/full_webhelp/LX3HEV/2026/en_US/idf65ecf8f9d3.html). 적용: 2026 LX3HEV 미국판 일반조건 정비표. 직접 지원: 점화플러그 교체는 해당 정비표의 주행거리 항목에 지정되어 있다. I는 점검 후 필요 조치, R은 교체이며 다른 차종·엔진·가혹조건에 수치를 복사하지 않는다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **hyundai_lx3_coolant**: [Hyundai Motor — Engine Coolant — Checking and changing coolant](https://ownersmanual.hyundai.com/full_webhelp/LX3/2026/en_US/topic_wtn_bvd_qcc.html). 적용: 2026 LX3 미국판 엔진 냉각수, 인버터 회로와 구분. 직접 지원: 냉각된 엔진에서 저장통 MIN/MAX를 확인하고 잦은 보충은 정비 점검을 받는다. 뜨거운 엔진·라디에이터의 캡을 열지 않으며 교환은 실제 정비표에 따라 정비소에 요청한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **hyundai_ne1a_brake_wear**: [Hyundai Motor — Disc Brakes Wear Indicator](https://ownersmanual.hyundai.com/full_webhelp/NE1a/2025/en_US/idb4da7abbeff.html). 적용: 2025 NE1a 미국판 마모 경고 장치가 있는 브레이크 패드. 직접 지원: 패드가 마모돼 교체가 필요하면 앞·뒤 브레이크에서 높은 경고음이 날 수 있다. 마모된 패드로 계속 주행하지 않으며 앞축 또는 뒤축 세트 단위로 교체한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **thermos_gasket_care**: [Thermos — How to Clean a Stainless Steel Water Bottle — And Keep It Performing Like New](https://thermos.com/blogs/news/how-to-clean-a-stainless-steel-water-bottle-and-keep-it-performing-like-new). 적용: 미국 Thermos 스테인리스 보틀 뚜껑의 분리 가능한 패킹. 직접 지원: 세척 후에도 냄새가 남으면 뚜껑 패킹을 분리해 청소하거나 교체하는 방법을 안내한다. 패킹은 교체 부품이며 완전히 말린 뒤 조립한다. 커피 착색과 교체 판단은 구분한다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **philips_anticolic_bottle**: [Philips Avent — Philips Avent Anti-colic baby bottle — English safety and maintenance](https://www.documents.philips.com/assets/20201021/b01137b437e948ca91a1ac5b01739712.pdf). 적용: Avent Anti-colic 젖병·해당 구성 부품, 영문 설명서 5~7쪽. 직접 지원: 매 사용 전 점검하고 손상·약해짐이 처음 보이면 해당 부품을 버린다. 플라스틱에 균열이 생기면 즉시 교체한다. 젖꼭지 3개월 안내를 병 전체의 수명으로 해석하지 않는다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **oralb_sg_head_care**: [Oral-B Singapore — FAQ — Which replacement head fits my Oral B toothbrush?](https://www.oralb.com.sg/en-sg/faq). 적용: Oral-B 전동칫솔모, iO와 기존 손잡이 호환 분리. 직접 지원: 3개월 또는 모가 마모될 때 교체하며 iO와 기존 헤드 호환을 구분한다. 매 사용 후 헤드와 손잡이를 분리해 헹구고 말린다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.
- **fda_cosmetic_shelf_life**: [미국 FDA — Shelf Life and Expiration Dating of Cosmetics](https://www.fda.gov/cosmetics/cosmetics-labeling/shelf-life-and-expiration-dating-cosmetics). 적용: 미국 화장품 표시 제도·보관 일반 안내, 국내 라벨 우선. 직접 지원: 제형·사용법·보관에 따라 사용기간이 달라지고 제조사가 기한을 판단한다. 미국 화장품과 의약품의 표시 제도가 다르며 고온·오염·내용물 변화가 고려 요인이다. 다른 모델·국가·제품군의 공통 기준은 지원하지 않는다.

### 변경 파일 (미stage)

```text
 M 02-items.seed.json
 M 04-source-registry.json
 M 05-launch-content.seed.json
 M 06-search-fixtures.json
 M package.json
 M public/sitemap.xml
 M research/expansion-contract.json
 M scripts/test-coupang.mjs
 M scripts/test-expansion.mjs
 M scripts/test-release.mjs
 M scripts/test-search.mjs
 M scripts/test-static.mjs
 M scripts/test-today.mjs
 M scripts/validate-data.mjs
 M src/pages/category/[slug].astro
 M src/pages/index.astro
 M src/pages/item/[slug].astro
?? docs/CONTENT-EXPANSION-2026-10-03.md
?? research/2026-10-03-candidate-decisions.json
?? research/2026-10-03-source-audit.json
?? research/content-expansion-2026-10-03.json
?? research/practical-guides-2026-10-03.json
?? scripts/apply-content-expansion-2026-10-03.mjs
?? scripts/connect-category-navigation.mjs
?? scripts/enrich-label-guidance.mjs
?? scripts/finalize-expansion-metadata.mjs
?? scripts/test-content-expansion-2026-10-03.mjs
?? scripts/test-content-preview-http.mjs
?? scripts/update-expansion-wiring.mjs
?? scripts/write-content-expansion-report.mjs
?? src/components/PracticalGuides.astro
?? src/pages/guide/[slug].astro
```
