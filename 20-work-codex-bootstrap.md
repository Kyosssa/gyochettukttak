# 20 — Work + Codex Bootstrap v1.8 CLEAN MASTER

이 ZIP만 source of truth로 사용.
이전 Meta AI starter 및 v1~v1.7 기획팩을 같이 넣지 마.

## 읽는 순서
1. `00-README-FIRST.md`
2. `01-product-scope.md`
3. `02-items.seed.json`
4. `03-item.schema.json`
5. `04-source-registry.json`
6. `05-launch-content.seed.json`
7. `06-search-fixtures.json`
8. `07-category-taxonomy.json`
9. `10-feature-flags.json`
10. `11-ux-state-spec.md`
11. `12-seo-content-spec.md`
12. `13-trust-research-spec.md`
13. `14-commerce-crosssite-spec.md`
14. `15-tech-cloudflare-spec.md`
15. `18-qa-release-spec.md`
16. `19-e2e-acceptance.json`

## Phase 0 — validation
UI부터 만들지 마.

- Seed 48 parse
- category_slug 15 taxonomy 안에 존재
- launch 15 indexable/verified
- source refs
- content seed 15
- duplicate id/name/slug
- search fixtures
- affiliate compatibility
- Beorim exact mappings

## Phase 1 — launch core
`10-feature-flags.json`의 `launch`만 구현.

Astro SSG:
Home / Search / 15 item / eligible category / My Home / policies / 404.

## Phase 2 — tool/state
- exact / approximate date
- condition
- usage
- mileage
- model/vehicle memory
- `관리했어요` (지원 품목만)
- `교체했어요`
- ICS

approximate → exact D-Day 금지.
condition → forced D-Day 금지.
model → fake universal cycle 금지.

## Phase 3 — SEO/Infra
canonical/sitemap/robots/noindex/static OG/pages.dev noindex.

## Phase 4 — monetization shell
AdSense placeholder.
Coupang mock.
free keyword proxy 금지.
compatibility-required item generic cards 금지.

## Phase 5 — self review
Search fixtures + E2E + release spec.

## 하지 말 것
`post_launch`/`deferred` feature를 임의로 구현하지 마.
확장 111개를 페이지로 만들지 마.
needs_research를 AI로 verified 만들지 마.
push/deploy/DNS 변경은 사용자 승인 전 금지.

## 완료 보고
1. 구현 기능
2. 테스트
3. 보류
4. 사용자 설정
5. production 전 문제


## v1.9 최종 추가 필독
- `24-source-health-audit.json`
- `25-launch-route-inventory.json`
- `26-site-copy.seed.json`
- `27-implementation-contract.md`

특히 route/scope/copy는 위 파일을 그대로 따른다.
