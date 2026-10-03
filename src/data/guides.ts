import existing from '../../research/practical-guides-2026-10-03.json';
import expansion from '../../research/subkeyword-content-2026-10-03.json';

// Published guides retain their URLs and copy. New guides use independently
// audited, claim-scoped sources rather than changing existing item evidence.
export const guides = [...existing.guides, ...expansion.guides];
export const auditedSources = expansion.sources;
export const enhancements = expansion.enhancements;
