# Person Matching Module

Cross-references missing persons (SOS Venezuela 2026) with hospital patients (Google Sheets) to help families find loved ones after the earthquake.

## Quick Start

```javascript
import { runMatchingPipeline, GoogleSheetsClient } from '@/lib/matching';

const result = await runMatchingPipeline({
  sosVenezuelaClient: {
    fetchNormalizedMissingPersons: async () => {
      // Or use the built-in client
      const { fetchNormalizedMissingPersons } = await import('@/lib/matching/sosVenezuelaClient.js');
      return fetchNormalizedMissingPersons();
    }
  },
  googleSheetsClient: new GoogleSheetsClient({
    apiKey: 'YOUR_GOOGLE_API_KEY',      // from Google Cloud Console
    spreadsheetId: '1FlFw-gu...',        // from Jose (red-solidaria-venezuela)
    range: 'Sheet1!A2:Z',                 // adjust as needed
  }),
  options: {
    nameThreshold: 0.75,     // min name similarity (0-1)
    maxResultsPerPerson: 5,   // top N candidates per missing person
    minConfidence: 0.50,      // min overall confidence to include
  },
});

console.log(result.stats);
// { missingPersons: 4500, hospitalPatients: 320, potentialMatches: 87, ... }

console.log(result.matches[0]);
// { missingPerson: {name, age, ...}, candidates: [{name, hospital, confidence: 92, ...}], ... }
```

## Algorithm

| Signal | Weight | Method |
|--------|--------|--------|
| Name | 40% | Levenshtein distance + token reordering (Jose Garcia ↔ Garcia Jose) |
| Cédula | 30% | Exact match = 100%, last-4 match = 85%, no match = 0% |
| Age | 15% | ±5 years tolerance, linear decay |
| Municipality | 15% | Exact or fuzzy match |

**Confidence thresholds:**
- ≥ 85% → Strong match (auto-display)
- 50–85% → Possible match (requires human review)
- < 50% → Filtered out

## Files

| File | Purpose |
|------|---------|
| `fuzzyMatcher.js` | Levenshtein, Jaro-Winkler-inspired similarity, name normalization |
| `sosVenezuelaClient.js` | Fetch & normalize SOS Venezuela 2026 `/api/persons/list` |
| `googleSheetsClient.js` | Fetch & parse Google Sheets (auto-detects headers) |
| `personMatcher.js` | Main matching engine + display formatting |
| `index.js` | Exports |

## Integration into canporven.org

See `src/pages/VenezuelaDashboard.jsx` — add a new tab or section for "Coincidencias" that consumes `result.matches`.

## Credits

Built for Build4Venezuela hackathon. Data sources: SOS Venezuela 2026 + Red Solidaria Venezuela.
