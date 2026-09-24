# 18 — QA / Release Specification

## Data build blockers
- duplicate id/name/slug
- invalid category_slug
- verified/indexable인데 source 없음
- source_id missing
- model-required item에 generic product cards
- needs_research가 sitemap에 들어감

## Search
`06-search-fixtures.json` 전수통과.

특히:
- 후라이팬/프라이팬/후라이펜
- 메트리스
- 캐빈필터
- 에어컨필터 ambiguity
- `필터` multi-result
- known unverified != missing

## E2E
- exact date vs approximate false precision
- condition page no forced D-Day
- model page no generic TOP3
- My Home local-only/noindex
- Beorim exact-only
- real 404
- preview noindex
- verified-only sitemap
- item static route doesn't invoke Function

## Accessibility
keyboard search.
visible focus.
status not color-only.
checkbox labels.
reduced-motion.
dynamic result announce.

## Performance
Astro static first.
interactive islands only.
ad slot dimensions reserved.
third-party scripts kept minimal.

## Release
Preview
→ QA
→ user approval
→ production.

초기에는 자동 production publish 금지.
