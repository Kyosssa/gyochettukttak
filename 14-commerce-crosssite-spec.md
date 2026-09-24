# 14 — Commerce / Compatibility / Cross-site

## Affiliate 유형
### direct_generic
규격 호환 위험이 낮아 generic TOP3 가능.

### model_required / vehicle_required / product_required
정확한 모델/차종/부품 매핑 전 상품 카드 금지.

## API
`GET /api/coupang?item={slug}`

자유입력 `keyword` proxy 금지.
secret은 Cloudflare env.

## 가격/재고
시점 정보.
본문의 영구 사실로 저장하지 않음.
`가격과 재고는 판매처에서 최종 확인` 표시.

## 모델 DB 미래 계약
model/family
→ compatible part code
→ source
→ compatibility_verified
가 모두 있어야 구매 연결.

## 버림뚝딱
정확한 target이 존재하는 경우만 CTA.
필터를 가전 본체 폐기 페이지로 추정 연결하지 않음.

현재 검증된 mapping은 Content Seed를 따른다.

## 광고
AnswerCard + Tool 뒤 첫 광고.
공식 출처 CTA와 제휴 CTA의 시각 디자인 분리.
affiliate 인접 고지.

AdSense 활성화 시 실제 설정 기준으로 privacy/CMP/ads.txt 최종 확인.
