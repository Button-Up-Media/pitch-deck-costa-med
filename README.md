# Button Up Media — Pitch Deck Template

A reusable, configurable web pitch deck for hospitality clients.

## Quick start (per client)

Edit **one file**:

```
src/config/client.ts
```

That file controls:

- Client name, logo, decision-maker, prep date
- Number of brands (supports 1, 2, 3+)
- Which services to include (`enabled: true/false` on each):
  - Organic Social Media
  - Paid Social Advertising
  - Google Ads
  - Website Creation
  - SEO
- Whether to show the all-in-one Bundle page
- Pricing & contract terms

The router, navigation, and pricing tables all rebuild themselves from the config. No other files need to change for a typical pitch.

## Deeper edits

To tweak the copy of a service module (pillars, deliverables, problem/solution),
edit `src/config/services.tsx`. That's where each service's marketing copy lives.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion (page + element animations)
- React Router (multi-page deck)
- Lucide React (icons)

## Run locally

```bash
npm install
npm run dev
```

## Deployment

Configured for Vercel. Every response carries `X-Robots-Tag: noindex, nofollow`
so previews are not indexed by Google.

## Per-client workflow

1. Branch the repo (e.g. `client/acme-restaurant-group`)
2. Edit `src/config/client.ts`
3. Replace brand image URLs with on-brand stock or actual photos
4. Push the branch — Vercel auto-deploys a unique preview URL
5. Share the URL with the client. Done.
