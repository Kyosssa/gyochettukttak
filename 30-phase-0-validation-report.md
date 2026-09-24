# Phase 0 validation report — 2026-09-24

## Result

**APPROVED 2026-09-24: proceed with implementation using the decisions recorded below.**

The approved `shower-filter` source correction has been made in `05-launch-content.seed.json`. The two low-relevance related-item records remain preserved as source data and are suppressed only at render time on their respective pages.

## Count reconciliation

| Measure | Verified count | Basis | Result |
| --- | ---: | --- | --- |
| Source registry | 22 | `04-source-registry.json` object keys | PASS |
| Launch source use | 18 | unique source IDs among the 15 `launch_candidate && indexable` records in `02-items.seed.json` | PASS |
| Launch source audit | 18 | `24-source-health-audit.json.sources` | PASS |
| Launch source IDs absent from registry | 0 | seed launch IDs compared with registry | PASS |
| Launch source IDs absent from audit | 0 | seed launch IDs compared with audit | PASS |
| Launch/indexable items | 15 | `02-items.seed.json` | PASS |
| Launch content items | 15 | `05-launch-content.seed.json` | PASS |

`23-validation-report.json` reports `source_registry: 21`, whereas the actual registry has **22** and `29-final-validation.json` reports **22**. The former is version `v1.8.1`; it is stale for v1.9 and must not be used as the Phase 0 baseline.

The four registry entries outside the 18 Launch seed references are `philips_sonicare_head`, `samsung_printer_supplies`, `samsung_robot_vacuum_consumables`, and `apple_iphone_battery_health`. This is expected for non-Launch/expansion records and is not a Launch audit failure.

## Source authority discrepancy (report; no data change)

The stated authority order is `02-items.seed.json` → `04-source-registry.json` → `05-launch-content.seed.json`.

For `shower-filter`, the Launch seed uses two sources: `atomy_shower_filter` and `bodyluv_shower_filter`. The source-health audit contains both, so the verified Launch-use/audit count is 18. `05-launch-content.seed.json` contains only `bodyluv_shower_filter`, leaving `atomy_shower_filter` out of its page-level `source_ids`.

This was a Seed-to-content conflict. Approval selected the Seed-aligned correction: `05-launch-content.seed.json` now lists both source IDs. `atomy_shower_filter` is presented as A_DIRECT official manufacturer material; `bodyluv_shower_filter` is B_GENERAL supplementary material. The product-specific 3–4 month / 1–2 month examples are not generalized into a universal shower-filter cycle.

## Related-item discrepancy (report; no data change)

`05-launch-content.seed.json` currently contains these low-relevance links:

| Source page | Current related item | Assessment | Pre-approval handling candidate |
| --- | --- | --- | --- |
| 매트리스 (`mattress`) | 칫솔 (`toothbrush`) | Low user relevance | Hide the related-items area on the mattress page only. |
| 멀티탭 (`power-strip`) | 청소기 필터 (`vacuum-filter`) | Low user relevance | Hide the related-items area on the power-strip page only. |

Do **not** substitute alternate products or mutate either `related_slugs` list before approval. If the hide option is approved, it should suppress only these two page-level related-items modules; it must not delete the data or affect the other related-item modules.

## Additional structural checks

- 48 seed records parse successfully; item IDs and slugs have no duplicates.
- All 15 Launch content slugs correspond one-to-one with the 15 Launch/indexable seed slugs.
- Every content source ID belongs to the authoritative Launch seed source set.
- This report validates the supplied JSON structure and internal identifiers. The supplied source-health audit records its URL/claim checks on 2026-09-24; no new live source crawl was performed in this Phase 0 pass.

## Approved implementation decision

1. Use the 22 registry sources in `04-source-registry.json` as the current implementation and automated-check baseline; retain the v1.8.1 count of 21 only as historical evidence.
2. Use the 18 unique source IDs referenced by the 15 Launch seed items and require correspondence with the 18 source-health-audit entries.
3. Render no `related_items` module on the mattress or power-strip page. Preserve their original relations without substitutions until relevance is verified.
