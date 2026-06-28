/**
 * Person Matching Module — Canary Islands ↔ Venezuela Aid Coordination
 * 
 * Cross-references missing persons (SOS Venezuela 2026 API) with 
 * hospital patients (Google Sheets) to help families find loved ones.
 * 
 * Usage:
 *   import { runMatchingPipeline, GoogleSheetsClient } from '@/lib/matching';
 *   
 *   const result = await runMatchingPipeline({
 *     sosVenezuelaClient: {
 *       fetchNormalizedMissingPersons: async () => [...]
 *     },
 *     googleSheetsClient: new GoogleSheetsClient({
 *       apiKey: '...',
 *       spreadsheetId: '...',
 *     }),
 *     options: { nameThreshold: 0.75, maxResultsPerPerson: 5 },
 *   });
 */

export {
  levenshteinDistance,
  similarityScore,
  normalizeName,
  nameSimilarity,
  ageMatch,
  municipalityMatch,
  cedulaMatch,
  calculateConfidence,
} from './fuzzyMatcher.js';

export {
  fetchPersons,
  fetchAllMissingPersons,
  normalizeSOSPerson,
  fetchNormalizedMissingPersons,
} from './sosVenezuelaClient.js';

export { GoogleSheetsClient } from './googleSheetsClient.js';

export {
  findMatches,
  formatMatchSummary,
  matchesToDisplayFormat,
  runMatchingPipeline,
} from './personMatcher.js';
