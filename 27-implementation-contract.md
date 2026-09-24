# 27 — Implementation Contract / Stop Conditions

이 문서는 **Codex가 임의 해석하지 말아야 할 경계**다.

## 구현 완료의 기준
`10-feature-flags.json`의 `launch=true` 기능과
`25-launch-route-inventory.json`의 Launch route만 먼저 완성한다.

## STOP — 즉시 구현을 멈추고 보고할 조건

다음 상황에서는 추측으로 해결하지 말고 사용자에게 보고한다.

1. Seed와 Source Registry가 서로 충돌한다.
2. 공식 출처의 현재 문구가 Seed claim과 materially 다르다.
3. 모델/차종/부품 호환을 검증할 데이터가 없는데 상품 추천이 필요하다.
4. Coupang API 자격증명 또는 최신 정책이 없어서 실제 연동을 검증할 수 없다.
5. AdSense ID/CMP 설정이 없어 실제 광고 코드를 안전하게 넣을 수 없다.
6. Cloudflare Production/DNS 변경이 필요하다.
7. 기존 버림뚝딱 URL이 404/redirect되어 cross-link 정확성이 깨진다.
8. Launch 범위 밖 기능을 구현해야만 핵심 기능이 가능하다고 판단된다.

이때 mock/placeholder로 안전하게 진행 가능한 부분은 진행하고,
외부 설정/정책 의존 부분만 보류한다.

## NEVER
- needs_research → AI 추정으로 verified
- 자유검색어 Coupang proxy
- 모델 fuzzy match만으로 구매 추천
- approximate date → exact D-Day
- condition item → 임의 고정주기
- 필터 → 본체 폐기 페이지 추정 링크
- v1 확장후보 111개 자동 페이지 생성
- 사용자 승인 없는 git push / production deploy / DNS

## Content authority order
1. `02-items.seed.json`
2. `04-source-registry.json`
3. `05-launch-content.seed.json`
4. Spec 문서

문서와 JSON이 충돌하면 위 순서를 따른 뒤 충돌을 보고한다.

## Route authority
`25-launch-route-inventory.json`

## Scope authority
`10-feature-flags.json`

## Copy authority
`26-site-copy.seed.json`

## 검수
`06-search-fixtures.json`
+
`19-e2e-acceptance.json`
+
`18-qa-release-spec.md`
를 통과한 뒤에만 Production 후보로 본다.
