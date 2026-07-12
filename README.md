# Jaya Chandra — Portfolio

Next.js 15 (App Router) + TypeScript + Tailwind + Firebase (Firestore, Spark/free plan) + Framer Motion. Deployed on Vercel.

## Build status

This repo is being built in 16 ordered phases. **Phase 1 (scaffolding, config, data-access layer, types) is complete.** Phases 2–16 (theme, layout, sections, SkyWrite case study, certifications, resume, contact, SEO, polish) are not yet built.

## Known data gaps (must resolve before seeding Firestore)

- `lib/data/projects.ts` — Fabric Marketplace `repoUrl` is `null` (unconfirmed)
- `lib/data/projects.ts` — Python Mini Projects `repoUrl` is `null` (need repo link(s) for the combined card)
- `lib/data/certifications.ts` — all four certification `date` fields are placeholder `2025-01-01`; need real issue dates
- `lib/data/certifications.ts` — all `credentialUrl` fields are `null`; add if certificates are publicly verifiable
- Resume PDF not yet added to `/public`
- Project screenshots/hero images not yet added to `/public`

None of the above are faked in code — they're explicit `null`/TODO markers so nothing ships silently wrong.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in Firebase project values
npm run dev
```

## Firestore

This project uses two collections, populated from the seed data in `lib/data/*.ts` (a seed script will be added in Phase 4):

- `projects`
- `certifications`

Skills are static (`lib/data/skills.ts`), not stored in Firestore, since they change rarely — see the comment in that file for the reasoning.

**No Firebase Storage is used anywhere in this project** (Spark plan constraint). All images ship from `/public` and are served via Next's built-in image optimization.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example` in Vercel's project settings (Production + Preview).
4. Deploy — Vercel auto-detects Next.js, no build config needed.

## Data-access layer pattern

Components never import `firebase/firestore` or `lib/firebase/config` directly. All reads go through typed functions in `lib/data/*.ts` (e.g. `getProjects()`, `getCertifications()`). This keeps the Firestore dependency isolated to one layer, so swapping data sources later doesn't touch UI code.
