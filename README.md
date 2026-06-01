<!-- @format -->

<div align="center">

# 🌈 FirstDay 😊

### A clear, calm onboarding workspace for recruiters and joinees ✨

[![CI](https://github.com/Moleesh/FirstDay/actions/workflows/ci.yml/badge.svg)](https://github.com/Moleesh/FirstDay/actions/workflows/ci.yml)
[![Security](https://github.com/Moleesh/FirstDay/actions/workflows/security.yml/badge.svg)](https://github.com/Moleesh/FirstDay/actions/workflows/security.yml)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.5.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

**FirstDay** helps recruiters create onboarding packs, invite joinees, track
progress, review documents, collect signatures, and generate completed PDFs.
Joinees get a simple guided flow from upload to download. 😊

[Live App](https://moleesh.github.io/FirstDay) ·
[Repository](https://github.com/Moleesh/FirstDay) ·
[CI Runs](https://github.com/Moleesh/FirstDay/actions/workflows/ci.yml) ·
[Security Scans](https://github.com/Moleesh/FirstDay/actions/workflows/security.yml) ·
[Issues](https://github.com/Moleesh/FirstDay/issues)

</div>

## ✨ Product Tour

| Area          | What You Can Do                                                                       |
| ------------- | ------------------------------------------------------------------------------------- |
| 🧑‍💼 Recruiter  | Build reusable packs, map PDF fields, invite joinees, and review onboarding progress. |
| 😊 Joinee     | Upload documents, review fields, sign consent, and download the completed pack.       |
| 🎨 Appearance | Choose light, dark, or system mode and switch between accent themes.                  |
| 🔐 Platform   | Use Supabase auth and a GitHub Pages-compatible static frontend.                      |

The web app includes a recruiter template wizard, editable document checklists,
reference-template extraction, PDF page ordering, field annotations, joinee pack
downloads, welcome-link sharing, role-aware login screens, redirect-safe
`/FirstDay` routes, trial sign-ins, and a responsive onboarding experience. 🌈

## 🚀 Run Locally

### Prerequisites

- [Node.js 24](https://nodejs.org/)
- [pnpm 11.5.0](https://pnpm.io/installation)
- A [Supabase](https://supabase.com/) project

### Setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

Open the published app at
[https://moleesh.github.io/FirstDay](https://moleesh.github.io/FirstDay). 🌍

### Trial Sign-In 😊

The current web experience includes prefilled trial accounts for product
reviews. Click **Sign in** or **Continue onboarding** after opening the matching
login page.

| Role         | Login URL                                                                    | Username or ID  | Password or code |
| ------------ | ---------------------------------------------------------------------------- | --------------- | ---------------- |
| 🧑‍💼 Recruiter | [Recruiter sign-in](https://moleesh.github.io/FirstDay/login?role=recruiter) | `recruiter`     | `firstday`       |
| 😊 Joinee    | [Joinee sign-in](https://moleesh.github.io/FirstDay/login?role=joinee)       | `JN-2026-00042` | `firstday`       |

> These are development-only trial credentials. Do not use them as production
> authentication.

## 🔑 Environment Variables

Create `.env` from [`.env.example`](./.env.example) and replace sample values.
Never commit `.env` files. For GitHub Actions, use
[`.env.ci.example`](./.env.ci.example) as a safe reference and add the real
values as repository variables or secrets. 🔐

| Name                                   | Used By | Purpose                               |
| -------------------------------------- | ------- | ------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Web     | Browser-safe Supabase publishable key |
| `NEXT_PUBLIC_SUPABASE_URL`             | Web     | Supabase project URL                  |

## 🧭 Architecture

```mermaid
flowchart LR
  Pages["🌈 GitHub Pages"] --> Web["Next.js static web app"]
  Web --> Auth["🔐 Supabase Auth"]
  Web --> Trial["✨ Trial onboarding flows"]
```

| Layer      | Stack                                                              |
| ---------- | ------------------------------------------------------------------ |
| Monorepo   | Turborepo, pnpm workspaces                                         |
| Web        | Next.js 15, React 18, SCSS modules, Zustand, Jotai, TanStack Query |
| Documents  | `pdf-lib`, React PDF, signature canvas                             |
| Quality    | Vitest, Playwright, ESLint, Prettier, pnpm audit, TruffleHog       |
| Deployment | GitHub Pages static export through GitHub Actions                  |

```text
apps/
└── web/       Next.js app, SCSS modules, components, and Playwright flows

packages/
├── config/    Shared tooling configuration
├── schemas/   Shared Zod schemas
├── types/     Shared TypeScript types
└── ui/        Shared UI components
```

## 🧪 Commands

| Command                             | Purpose                        |
| ----------------------------------- | ------------------------------ |
| `pnpm dev`                          | Start the workspace            |
| `pnpm build`                        | Build apps and packages        |
| `pnpm lint`                         | Run ESLint                     |
| `pnpm format`                       | Check Prettier formatting      |
| `pnpm test`                         | Run automated tests            |
| `pnpm typecheck`                    | Run TypeScript checks          |
| `pnpm validate:env`                 | Validate environment variables |
| `pnpm --filter @onboarding/web e2e` | Run Playwright flows           |

## 🚢 GitHub Actions Setup

Add these values under **Settings → Secrets and variables → Actions** before
running deployments:

| Variable                               | Required For                 |
| -------------------------------------- | ---------------------------- |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser-safe Supabase access |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project endpoint    |

| Workflow                                                                       | Trigger                              |
| ------------------------------------------------------------------------------ | ------------------------------------ |
| [CI](https://github.com/Moleesh/FirstDay/actions/workflows/ci.yml)             | Pull requests and manual runs        |
| [Pages](https://github.com/Moleesh/FirstDay/actions/workflows/pages.yml)       | Pushes to `main` and manual runs     |
| [Security](https://github.com/Moleesh/FirstDay/actions/workflows/security.yml) | Mondays at 03:00 UTC and manual runs |

Database schema changes live in [`supabase/migrations`](./supabase/migrations).
Apply them through the Supabase dashboard or Supabase CLI before deploying
features that use new tables.

The published GitHub Pages build currently provides trial onboarding flows.
Production writes should be implemented through RLS-protected Supabase calls or
Supabase Edge Functions before accepting real onboarding documents.

## 🛡️ Security Notes

- Keep local values in `.env` and deployment values in GitHub Actions. 🔐
- Trial credentials are for development reviews only.

## 🤝 Contributing

1. Create a focused branch.
2. Keep source files below 200 lines where practical.
3. Add tests for behavior changes.
4. Run formatting, linting, type checks, tests, and builds before pushing.
5. Confirm that no secrets were committed.

## 📄 License

No license file is currently included. Treat this repository as proprietary
until a license is added.

---

<div align="center">

Built to make every first day feel lighter, clearer, and happier. 😊 🌈 ✨

</div>
