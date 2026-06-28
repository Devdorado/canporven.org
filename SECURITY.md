# Security Policy

## Supported Versions

This is a humanitarian crisis response project. We support the latest deployed version and critical security patches for previous versions when they affect data integrity or user safety.

| Version | Supported          |
| ------- | ------------------ |
| latest  | ✅ Security patches |
| < latest | ⚠️ Critical fixes only |

## Reporting a Vulnerability

**For CRITICAL security issues (data exposure, authentication bypass, injection vulnerabilities):**

1. **DO NOT open a public GitHub issue.**
2. Email: Contact via GitHub direct message to @Devdorado
3. Or reach out via the Base44 platform messaging
4. We will respond within **4 hours** for critical issues, **24 hours** for moderate issues.

**What to include in your report:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact (what data/systems are at risk)
- Suggested fix (if you have one)
- Your contact info for follow-up questions

## What We Consider Security Issues

- ✅ Exposed API keys or secrets in committed code
- ✅ Authentication/authorization bypasses
- ✅ SQL injection or XSS vulnerabilities
- ✅ Data leaks (personal information of affected persons)
- ✅ CORS misconfigurations that expose sensitive endpoints
- ✅ Rate limiting bypasses that could destabilize the platform

## What We Do NOT Consider Security Issues

- ❌ Public API endpoints that are intentionally open (e.g., SOS Venezuela 2026 data)
- ❌ Missing features (e.g., "no 2FA") — these are feature requests
- ❌ UI/UX bugs without security implications

## Security Best Practices for Contributors

- **Never commit secrets:** API keys, tokens, passwords belong in `.env.local` (which is `.gitignore`d)
- **Verify RLS policies:** When using Supabase, always verify Row Level Security is configured
- **Sanitize inputs:** Any user-provided data displayed in the UI must be sanitized
- **CORS awareness:** When building new API endpoints, consider CORS implications
- **Data minimization:** Only collect and display the minimum data necessary for humanitarian coordination

## Acknowledgments

We thank the following security contributors:

- @Devdorado (Marc Lanz) — Responsible disclosure of exposed API keys across 4 Venezuela relief projects
- @leonardomoros (Jose Nieves) — Rapid key rotation and HTTP Referer restrictions for Red Solidaria Venezuela
- @javierdejesusda — Fast response to `.env.example` request and comprehensive API documentation

## Security Audit History

| Date | Auditor | Scope | Findings | Status |
|------|---------|-------|----------|--------|
| 2026-06-27 | @Devdorado | 6 Venezuela relief repos | 4 exposed API keys, 2 missing `.env.example` files | 4/4 resolved, 1/2 resolved |

---

*This is a humanitarian project. We treat security with the same urgency as feature development because lives depend on it.*
