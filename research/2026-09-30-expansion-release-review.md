# 확장 출시 전 최종 검토

- 신규 10개 AnswerCard, 적용 범위, 관리 도구 검토 완료. 모든 cycle은 null이며 calendar_condition 도구·자동 D-Day·미래 교체일 계산은 없음.
- Philips Classic/Classic+ 젖꼭지의 3개월은 해당 제품군 예시로 한정. 엔진오일은 2025 LX2 미국판 정비표이며 실제 차량 설명서·엔진·국가·가혹조건 확인 우선. 선크림은 국내 라벨의 사용기한·보관 지침 우선.
- 치간칫솔·타이어는 상태 점검, 치약·마스카라·렌즈 세척액·선크림은 표시 기한과 적용 범위를 구분. 점화건전지는 건전지식 모델만, 냉장고 탈취제는 LG 내장 교체형/UV 반영구형/시판 제품 구분.
- 공유 app.js 실제 handler를 신규 10개 각각 실행하는 검사 추가: 교체 기록 없으면 ICS 미생성, 교체했어요는 실제 교체일만 저장, ICS DTSTART는 그 날짜와 일치. 출처의 기간을 더하거나 반복·미래 예정일을 생성하지 않음. 기존 런타임 변경 없음.
- 매트리스 seed의 model_check_required=true와 content의 direct_generic/generic_cards_allowed=true는 기존 불일치. 실제 src/public에는 이 메타데이터를 이용한 일반 상품 추천 코드가 없고, 현재 쿠팡은 별도 고지된 일반 광고이며 호환 상품이라고 안내하지 않음. 모델 추천 제한을 우회하는 동작이 없어 이번에 원래 verified 데이터는 수정하지 않음. 향후 상품 추천을 구현하기 전에 메타데이터 정합성 해결 필요.
- AdSense/ads.txt/GA 동의/TODAY/DB 설정/쿠팡 설정과 기존 15개 공식 답변·출처는 기준 커밋 대비 불변 검사 유지.
- 배포는 단일 확장 커밋의 main non-force push에 따른 기존 Pages Git 자동 배포만. D1 직접 조회·변경·migration, DNS 변경 없음.
