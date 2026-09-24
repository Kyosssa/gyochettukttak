# 12 — SEO / Content / SERP Specification

## Primary
`[품목] 교체주기`

동일 URL이 함께 해결:
- 교체시기
- 수명
- 언제 교체
- 교체 기준

검색어 변형마다 별도 thin URL 금지.

## URL
`/item/{slug}/`

## Index
- home
- verified+indexable item
- verified 3개 이상 + 고유 탐색가치가 있는 category
- about/source-policy

## Noindex
- `/search/`
- `/my-home/`
- needs_research
- preview/pages.dev
- thin category

robots.txt로 search/my-home를 차단하지 말고 HTML `noindex,follow`.

## Title/Description
고유하고 짧게.
네이버 간단체크의 약 40자 title / 80자 description 권장을 참고하되
글자수보다 정확한 고유 설명을 우선.

## Structured data
- WebSite
- Organization
- WebPage
- BreadcrumbList
- CollectionPage

FAQ/HowTo rich result에 의존하지 않음.

## 콘텐츠 문체
첫 문장에서 답.
SEO용 장문 도입 금지.
출처 없이 `60%`, `10억`, `2년이 법적수명` 같은 숫자/강한 인과 금지.

## SERP 승부
경쟁 블로그의 `숫자 하나 + 장문` 대신:
검색 H1 → 10초 답 → 근거 → 내 상황 도구 → 구매/폐기.

## 카테고리
15개 taxonomy는 **수집 구조**다.
런칭에서 카테고리 페이지를 모두 index하지 않는다.
`07-category-taxonomy.json`의 gate를 적용.
