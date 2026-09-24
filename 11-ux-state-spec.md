# 11 — UX / State Specification

## 첫 화면
H1
→ Evidence badge
→ AnswerCard
→ 핵심 Tool
→ 첫 광고

## 입력
### 정확한 날짜를 앎
exact date → exact 상태/D-Day 계산 가능.

### 정확히 기억 안 남
대략 범위 선택 → 정확한 `D-17` 같은 값 금지.
`확인 시점이 가까울 수 있어요` 같은 범위형 결과.

## Tool 유형
- calendar_condition
- usage_counter
- condition
- model_condition / model_usage / model_maintenance
- safety_condition
- vehicle_condition / vehicle_mileage

## My Home
localStorage only / `/my-home/` noindex.

상태:
- 여유
- 곧 확인
- 확인 필요
- 상태 확인
- 모델 확인 필요

기능:
- 교체했어요
- 관리했어요 (지원 품목만)
- 날짜 수정
- 사용횟수/주행거리 갱신
- 모델/차종 기억
- 전체 데이터 삭제

### 관리 vs 교체
`관리했어요`
→ 마지막 세척/점검 시각만 기록.
공식 교체주기를 임의로 연장하지 않음.

`교체했어요`
→ 실제 새 소모품으로 교체했을 때만 lastReplacedAt reset.

## 모델명 도우미
사진 AI 없이:
브랜드 선택 → 라벨 위치 안내 → 모델 입력 → 브라우저 저장.

fuzzy model match만으로 구매 카드 표시 금지.

## 접근성
검색 autocomplete는 keyboard 지원.
상태를 색상만으로 전달하지 않음.
동적 계산결과는 `aria-live=polite` 검토.
