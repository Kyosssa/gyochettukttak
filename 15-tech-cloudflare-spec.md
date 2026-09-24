# 15 — Technical / Cloudflare Specification

## Stack
Astro SSG
GitHub
Cloudflare Pages
localStorage
Cloudflare Web Analytics

Launch core에서 D1/R2 불필요.

## Dynamic
Coupang을 실제 연동할 때 `/api/*`만 Function.

일반 item/category/home HTML이 Function을 통과하지 않도록 `_routes.json` 검증.

## OG
build-time static 1200x630.

## Search index
build-time:
name / aliases / primary keyword / category / verification state.

우선순위:
canonical exact > alias exact > prefix > substring > conservative fuzzy.

`필터`처럼 일반어는 결과 목록.
`에어컨필터`처럼 의도가 갈리는 검색은 분기.

## Security
secret frontend 금지.
CSP는 AdSense/Coupang 실제 domain 확인 후 Report-Only부터 검증.
HSTS preload는 첫 배포부터 사용하지 않음.

## Preview
pages.dev / preview에 `X-Robots-Tag: noindex`.

## Static cache
hashed assets만 immutable.
HTML long immutable 금지.
