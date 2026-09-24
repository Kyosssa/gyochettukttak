# 22 — v1.7 → v1.8 Pruning / Fixes

## 삭제한 혼란
v1.7의 누적 구버전 문서:
- 예전 bootstrap 여러 개
- 예전 handoff 여러 개
- 중복 checklist/spec
를 최종 전달팩에서 제거.

이제 canonical 문서만 존재.

## 구조 보완
- stable `category_slug`를 Seed 48 전체에 추가
- 기존 데이터와 새 taxonomy 불일치 해결
- `의류·신발` 카테고리 추가
- `안전·방재`를 더 넓은 `집관리·안전`로 정리
- category는 총 15개

## Scope pruning
`생활 루틴 빠른 담기`는 launch → post_launch로 이동.
좋은 기능이지만 첫 배포 correctness보다 우선하지 않음.

## Launch 유지
- 관리했어요/교체했어요
- usage/mileage quick update
- model/vehicle local memory

정확도/재방문에 직접 기여하므로 launch 유지.

## Expansion queue 정리
기존 P1 40에서
**core next 30**으로 축소.

자동차 정비/방재/육아/헬멧 등 안전민감 품목은
`specialist` tier로 이동.

## 공식 확장 source 추가
- Philips Sonicare
- Samsung printer supplies
- Samsung robot vacuum consumables
- Apple battery health

## 결과
Codex가 읽어야 할 파일 수는 크게 줄었고,
"지금 구현"과 "나중 후보" 경계가 명확해짐.
