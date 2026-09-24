# 13 — Evidence / Research / Freshness

## Evidence
A_DIRECT:
정부·전문협회·제조사 공식자료가 핵심 claim을 직접 지원.

B_GENERAL:
신뢰 가능한 일반 가이드. 특정 모델 보증 아님.

C_CONTEXT:
보조자료. 단독 verified 금지.

## verified의 의미
`고정 교체주기를 찾았다`가 아니라
페이지의 정확한 답 방식(기간/상태/모델/사용량)을 근거로 확인했다는 뜻.

## Research order
1. 제조사 공식 매뉴얼/고객지원
2. 정부·공공기관
3. 전문협회/전문기관
4. 신뢰 가능한 보조자료

검색결과 snippet만 보고 verified 금지.

## Work protocol
needs_research 최대 5개
→ staging research JSON
→ source/claim/scope 기록
→ 검토
→ verified.

자동 production merge/배포 금지.

## Freshness
- 모델/필터: 약 30일 검토
- 자동차 매뉴얼: 약 60일
- 정부 안전자료: 약 60일
- 일반 전문 가이드: 약 90일

자동화는 URL/status/diff 감지만.
본문/숫자 자동 수정 금지.
