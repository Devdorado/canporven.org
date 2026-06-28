# Contributing to canporven.org

Thank you for your interest in contributing to canporven.org! This is a humanitarian coordination platform connecting the Canary Islands with Venezuela. Every contribution helps us serve affected communities better.

## Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/canporven.org.git`
3. **Install dependencies:** `npm install`
4. **Set up environment:** Copy `.env.example` to `.env.local` and fill in your values
5. **Run locally:** `npm run dev` (frontend only) or `base44 dev` (with backend)
6. **Create a branch:** `git checkout -b feature/your-feature-name`
7. **Make changes and commit**
8. **Push and open a Pull Request**

## Development Setup

### Prerequisites
- Node.js 18+
- npm or pnpm
- Base44 CLI (for backend development): `npm install -g @base44/cli`

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Base44 (required for backend features)
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_FUNCTIONS_VERSION=your_functions_version

# Optional: Google Cloud (for Google Sheets integration)
GOOGLE_SHEETS_API_KEY=your_key

# Optional: Mapbox (if you need custom map tiles)
MAPBOX_TOKEN=your_token
```

**Important:** Never commit `.env.local` or any file containing real secrets. The `.env.example` file contains only placeholders and is safe to commit.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server (hosted Base44 backend) |
| `base44 dev` | Start frontend + local Base44 backend |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run typecheck` | TypeScript check |

## Project Structure

```
src/
├── api/              # Base44 SDK client
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── landing/      # Landing page sections
│   └── venezuela/    # Dashboard components
├── hooks/            # TanStack Query hooks
├── lib/              # Core utilities
│   └── matching/     # Person matching engine
├── pages/            # Route pages
├── App.jsx           # Main app component
└── main.jsx          # Entry point

base44/
└── functions/        # Base44 server functions
```

## How to Contribute

### Reporting Bugs

1. Check if the bug already exists in [Issues](https://github.com/Devdorado/canporven.org/issues)
2. If not, use the **Bug Report** template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser/OS info

### Suggesting Features

1. Check if the feature is already requested
2. Use the **Feature Request** template
3. Explain:
   - What problem it solves
   - Who benefits (affected persons, volunteers, medical staff, etc.)
   - How it integrates with existing data sources

### Security Issues

**DO NOT open a public issue.** See [SECURITY.md](SECURITY.md) for responsible disclosure.

### Code Contributions

#### Code Style
- We use ESLint with the React recommended rules
- Run `npm run lint:fix` before committing
- Follow the existing component structure

#### Commit Messages
Use clear, descriptive commit messages:

```
feat: add Apoyo Venezuela API client
fix: correct person matching confidence threshold
docs: update README with new data sources
security: add input validation to person search
```

#### Pull Request Process
1. Update the README.md if your changes affect user-facing features
2. Ensure all checks pass (`npm run lint`, `npm run typecheck`)
3. Request review from @Devdorado
4. Address feedback promptly
5. PRs will be merged after approval

### Adding New Data Sources

If you want to integrate a new Venezuela relief platform:

1. **Research the API:** Check if they have a public API, Supabase instance, or open data
2. **Document it:** Add the source to the README's Data Sources table
3. **Build the client:** Create a client in `src/lib/` or `src/hooks/`
4. **Normalize the data:** Map to the unified `FeedItem` schema used by the hub
5. **Add tests:** Verify the client handles errors gracefully
6. **Credit the source:** Always include attribution in the UI

## Data Ethics

This project handles sensitive humanitarian data. When contributing:

- **Privacy first:** Never expose personal details (full names, phone numbers, addresses) that are not already public
- **Source attribution:** Always credit data sources prominently
- **Accuracy:** Do not modify or fabricate data from external sources
- **Respect:** Remember that behind every data point is a real person affected by crisis

## Community

- **GitHub Discussions:** For questions, ideas, and general chat
- **GitHub Issues:** For bugs and feature requests
- **Base44 Platform:** For Base44-specific questions

## Recognition

Contributors will be listed in the README.md Credits section. We especially welcome contributions from:

- Venezuelan developers who understand the local context
- Spanish-speaking contributors who can improve our bilingual content
- Security researchers who can audit our code
- Designers who can improve the UX for people in crisis situations

---

*Thank you for helping build tools that serve people in need. 🙏*
