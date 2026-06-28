# CANPORVEN.ORG — Canary Islands ↔ Venezuela Humanitarian Coordination Platform

> **A hybrid infrastructure project built with Base44, AI-accelerated development, and custom engineering.**  
> **Not a "vibe-coded" toy. This is production-grade crisis response tooling.**

[![Base44](https://img.shields.io/badge/Built%20with-Base44-3b82f6)](https://base44.com)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**Live:** [canporven.canarymedtech.es](https://canporven.canarymedtech.es) → migrating to [canariasporvenezuela.org](https://canariasporvenezuela.org)  
**App:** [app.base44.com/apps/6a3fe712a7f72f3df9b00ca1](https://app.base44.com/apps/6a3fe712a7f72f3df9b00ca1)

---

## What is this?

**canporven.org** is a **meta-coordination hub** connecting the **Canary Islands** with **Venezuela** after the June 24, 2026 earthquake (M7.1 + M7.5). Instead of fragmenting information across 45+ citizen-built platforms, we aggregate, normalize, and cross-reference data so families, volunteers, and medical professionals see the full picture in one place.

### What we do NOT do
- ❌ We do NOT collect donations directly
- ❌ We do NOT replace existing platforms — we amplify them
- ❌ We do NOT claim data as our own — every source is credited

### What we DO do
- ✅ Aggregate open data from citizen platforms (maps, missing persons, hospital patients, shelters)
- ✅ Provide a **unified dashboard** with source-coded overlays
- ✅ Build a **fuzzy matching engine** to cross-reference missing persons with hospital patients
- ✅ Offer **telemedicine** connections through [canarymedic.es](https://canarymedic.es)
- ✅ Act as an **open API hub** so other platforms can consume normalized data from us

---

## Architecture: A Hybrid Stack

This project is **NOT** a "vibe-coded" experiment where someone typed a prompt and accepted the output. It is a deliberately engineered hybrid:

| Layer | Technology | Role |
|-------|-----------|------|
| **Infrastructure** | Base44 (Vite + React + Tailwind + shadcn/ui) | Production hosting, auth, database, server functions |
| **AI Acceleration** | LLM-assisted research, security auditing, code generation | Rapid analysis of 45+ repos, vulnerability detection, documentation |
| **Custom Engineering** | Vanilla JS/TS, algorithm design, API clients | Matching algorithms, deduplication, data normalization, CORS handling |
| **Data Sources** | Multiple open APIs + Supabase + Google Sheets | SOS Venezuela 2026, Apoyo Venezuela, ApoyoVzla, Red Solidaria Venezuela |

### Why "hybrid" matters

**Base44** gave us the scaffold: auth, database, deployment, server functions. Without it, we would have spent days wiring up infrastructure instead of building features.

**AI** accelerated what a single developer could research: in 48 hours, we analyzed 45+ GitHub repositories, identified 6 security vulnerabilities, evaluated API designs, and wrote integration plans that would have taken weeks manually.

**Custom Engineering** is where the real work lives:
- The **fuzzy matching algorithm** (Levenshtein + token reordering + weighted confidence scoring) was hand-tuned for Spanish names and Latin American ID formats
- The **API clients** handle rate limiting, CORS edge cases, and graceful degradation when sources fail
- The **security audits** (as @Devdorado) responsibly disclosed exposed keys across 4 projects
- The **community coordination** (GitHub issues, bilingual outreach, API negotiation) is human relationship work that no AI can replace

---

## Data Sources & Integrations

### 🟢 Live & Integrated

| Source | Data Type | API | Status |
|--------|-----------|-----|--------|
| **SOS Venezuela 2026** | Reports, missing persons, damage validation, news | `https://sosvenezuela2026.com/api/...` (5 endpoints, CORS-open, no auth) | ✅ Dashboard + Map |
| **Apoyo Venezuela** | Affected zones, needs, emergency contacts, campaigns | `https://apoyovenezuela.com/api/v1/...` (OpenAPI 3.1, CORS-open) | ✅ Dashboard + Map |

### 🟡 In Progress

| Source | Data Type | API | Status |
|--------|-----------|-----|--------|
| **Red Solidaria Venezuela** | Hospital patients | Google Sheets API (read-only, server-side key) | 🔄 Matching engine built, awaiting Google Cloud key |
| **ApoyoVzla** | Missing persons, donations, shelters | Supabase (SSR, read-only access requested) | 🔄 Collaboration request sent |

### 🔴 Planned

| Source | Data Type | API | Status |
|--------|-----------|-----|--------|
| **infoayudavenezuela-backend** | Collection centers | NestJS + Swagger (early stage) | ⏳ Monitoring growth |

---

## Security Work (as @Devdorado)

We believe security is not optional in crisis tooling. In the first 48 hours of the earthquake response, we analyzed emerging repositories and responsibly disclosed vulnerabilities:

| Project | Issue | Impact | Resolution |
|---------|-------|--------|------------|
| **red-solidaria-venezuela** | Google Sheets API key exposed in frontend | Anyone could exhaust the API quota, breaking patient search | ✅ Key rotated, HTTP Referer restrictions, moved to Vercel env vars |
| **sosvenezuela2026** | `schema.sql` contained `\restrict` token (potential encrypted password) + admin credentials in README | Database exposure risk, credential compromise | ✅ Admin converted to honeypot, open API access offered |
| **sosvenezuelaterremoto** | README instructed pasting Supabase anon key into HTML without RLS warnings | Database manipulation/spam risk | 🟡 Issue created with recommendations |
| **apoyo-venezuela** | Missing `.env.example` for contributors | Slow onboarding, potential misconfiguration | ✅ `.env.example` added within hours |

---

## Key Features

### 1. Unified Dashboard (`/venezuela`)
- **Interactive Map:** SOS Venezuela reports + Apoyo Venezuela zones overlaid with source-coded legend
- **Stats Cards:** Real-time counts (missing persons, found, critical reports, zones)
- **Person Search:** Fuzzy search across SOS Venezuela's public directory
- **News Feed:** Aggregated crisis news from SOS Venezuela 2026
- **Damage Validation:** Community-verified structural damage reports

### 2. Fuzzy Person Matching Engine (`src/lib/matching/`)
Cross-references missing persons with hospital patients to reunite families.

**Algorithm:**
- **Name matching:** Levenshtein distance + token reordering (handles "Jose Garcia" ↔ "Garcia Jose")
- **Cédula matching:** Full match = 100%, last-4 digits = 85%
- **Age matching:** ±5 years tolerance with linear decay
- **Municipality matching:** Exact or fuzzy
- **Confidence scoring:** Weighted combination (name 40%, cédula 30%, age 15%, municipality 15%)
- **Human review gate:** Only matches ≥ 85% confidence shown automatically; 50–85% flagged for manual review

### 3. Hub Sync Function (Base44 Server Function)
Runs every ~5 minutes to:
1. Fetch from SOS Venezuela 2026 and Apoyo Venezuela APIs
2. Normalize to a unified `FeedItem` schema
3. Deduplicate per source (not across sources — they are complementary data types)
4. Store in Base44 Entity
5. Expose a public read endpoint so **canporven itself becomes a queryable source for third parties**

### 4. Telemedicine Bridge (canarymedic.es)
Connecting volunteer Spanish-speaking doctors with affected communities for:
- Remote medical consultations
- Second opinions / diagnosis
- Psychological support
- Dosage guidance and treatment alternatives
- Chronic disease management

---

## Tech Stack

```
Frontend:
  React 18 (Vite)
  Tailwind CSS v4
  shadcn/ui components
  TanStack Query (data fetching + caching)
  React Leaflet (interactive maps)
  React Router (navigation)

Backend (Base44):
  Authentication & user management
  Database entities (FeedItem, hub cache)
  Server functions (sync engine, public API)
  Hosting & deployment

Data Layer:
  REST APIs (SOS Venezuela 2026, Apoyo Venezuela)
  Google Sheets API (Red Solidaria)
  Supabase (ApoyoVzla — pending)
```

---

## Project Structure

```
src/
├── api/                     # Base44 API clients
├── components/              # shadcn/ui + custom components
│   └── venezuela/           # Dashboard-specific components
│       ├── VenezuelaMap.jsx      # Leaflet map with multi-source overlays
│       ├── StatsCards.jsx        # Real-time statistics
│       ├── PersonSearch.jsx      # Fuzzy person search
│       ├── NewsFeed.jsx          # Crisis news aggregation
│       ├── ReportsList.jsx       # Filterable reports list
│       └── DamageValidation.jsx  # Structural damage validation
├── hooks/                   # TanStack Query hooks
│   ├── useVenezuelaData.js       # SOS Venezuela 2026 API hooks
│   └── useApoyoVenezuela.js      # Apoyo Venezuela API hooks (new)
├── lib/                     # Core utilities
│   ├── matching/            # Person matching engine
│   │   ├── fuzzyMatcher.js      # Levenshtein + similarity algorithms
│   │   ├── sosVenezuelaClient.js # SOS Venezuela API client
│   │   ├── googleSheetsClient.js # Google Sheets API client
│   │   ├── personMatcher.js      # Main matching engine
│   │   └── index.js              # Exports
│   ├── utils.js             # cn() helper, iframe detection
│   ├── query-client.js      # TanStack Query configuration
│   └── app-params.js        # Base44 app parameters
├── pages/                   # Route pages
│   ├── Home.jsx             # Landing page with platform links
│   └── VenezuelaDashboard.jsx # Main dashboard
├── App.jsx                  # Router + auth provider + query client
└── main.jsx / index.css     # Entry point + global styles
```

---

## Community & Credits

This project is a **citizen initiative**, not a registered NGO. We are actively seeking a legal entity or association to provide formal support.

### Data Partners
- [SOS Venezuela 2026](https://sosvenezuela2026.com) — Real-time map, person directory, open API
- [Apoyo Venezuela](https://apoyovenezuela.com) — Zone tracking, needs reporting, emergency contacts
- [ApoyoVzla](https://apoyovzla.com) — Ultra-lightweight platform (2G/3G optimized)
- [Red Solidaria Venezuela](https://redsolidariavenezuela.com) — Hospital patient search, blood donation, psychological support
- [Hospitales en Venezuela](https://hospitalesenvenezuela.com) — AI-powered patient list digitization

### Security Contributors
- [@Devdorado](https://github.com/Devdorado) (Marc Lanz) — Security audits, API integration, matching engine
- [@leonardomoros](https://github.com/leonardomoros) (Jose Nieves) — Red Solidaria Venezuela, collaboration on person matching
- [@javierdejesusda](https://github.com/javierdejesusda) — Apoyo Venezuela, rapid API development
- [@Z1Code](https://github.com/Z1Code) — SOS Venezuela 2026, open API access, honeypot security innovation
- [@DaR3kDev](https://github.com/DaR3kDev) (Kevin Villegas) — infoayudavenezuela, API specification collaboration

---

## License

MIT License — open source, free to use, modify, and redistribute. All data remains property of its respective sources. We only aggregate and normalize.

---

## Contact

- **GitHub:** [@Devdorado](https://github.com/Devdorado)
- **LinkedIn:** [Marc Lanz](https://www.linkedin.com/in/marclanz/)
- **Email:** (via GitHub issues or Base44 platform)

> *"No solo emergencia: construimos un vínculo permanente entre Canarias y Venezuela."*  
> *"Not just emergency: we build a permanent bridge between the Canary Islands and Venezuela."*

— The canporven.org team
