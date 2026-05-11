# Pitch Deck Handoff Document

> A complete context dump for any AI assistant picking up work on this project.
> Written by Claude (Anthropic) at the user's request to enable handoff to another AI.

---

## Quick Links

- **Live deployment:** https://pitch-deck-flame-mu.vercel.app
- **GitHub repo:** https://github.com/chrispy-1222/pitch-deck
- **Local working directory:** `/Users/christianbusiness/Desktop/pitch-deck` (also accessible via `~/pitch-deck`)
- **Vercel project ID:** `prj_8VgzN2095puWCOP40qJbewA2G4My`

---

## Project Context

**What this is:** A reusable, config-driven pitch deck web app for **Button Up Media**, a hospitality marketing agency. Each new client gets the same deck structure with a per-client config file populated.

**The user:**
- Chris Posada (chrispy-1222)
- Email: `chris.p@buttonupmedia.com`
- Founder of Button Up Media
- ⚠️ Git author email **must** be `chris.p@buttonupmedia.com` in every commit — Vercel rejects deploys with unverified authors

**Source of truth for content:** https://buttonupmedia-site.vercel.app — the user wants the pitch deck to heavily reference content from the BUM marketing site. Two key pages already mined:
- `/restaurant-advertising.html` — paid ads philosophy + Google/Meta/TikTok breakdown
- `/restaurant-seo.html` — SEO + website psychology angle

---

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (custom theme tokens, no preset palette)
- Framer Motion for animations
- React Router v6
- Lucide React for icons
- Deployed on Vercel via GitHub integration (auto-deploy on push to `main`)

### Theme Tokens

Defined in `src/index.css`:
- Background: `#0a0a0a` (`bg-0`), `bg-1`, `bg-2`, `bg-3` (gradually lighter)
- Cream text: `#f6f0e6` (`cream-50`) → `cream-300` (muted)
- Gold accent: `#e2a84d` (`gold-500`), `gold-400`, `gold-600`
- Coral: `#d06a50`
- Teal: `#45b08c`
- Lines: `border-line` (subtle borders), `border-line-soft`

### Fonts (Google Fonts, loaded in `index.html`)
- **Epilogue** — `font-display` — display headings (bold, tight tracking)
- **Figtree** — `font-sans` — body
- **Plus Jakarta Sans** — used in Cover hero
- **Cormorant Garamond** — accent serif (sparingly)

---

## Architecture Overview

### Config-driven pattern

Per-client data lives in `src/config/client.ts`. The `SERVICES` registry in `src/config/services.tsx` defines content for each service offering. Adding a new client = swap in a new client config; the rest of the deck reads from these two files.

```
src/config/
├── client.ts        # per-client values: stats, pricing, enabled services, paths/goals
└── services.tsx     # SERVICES registry + types (the agency-wide content)

src/pages/
├── CoverPage.tsx          # /
├── OpportunitiesPage.tsx  # /opportunities — problems → opportunities
├── EcosystemPage.tsx      # /ecosystem — interactive circular diagram
├── ServicePage.tsx        # /<service-route> — generic, switches by serviceKey
├── ValuePage.tsx          # /value — pricing breakdown
└── LetsGoPage.tsx         # /lets-go — bundle CTA

src/components/
├── Layout.tsx              # router shell + page transition + scroll-to-top
├── SidebarNav.tsx          # right-side vertical nav (desktop) + mobile bottom nav
├── Logo.tsx                # logo wrapper with size variants
├── AmbientBg.tsx           # ambient background gradients
├── Panel.tsx               # standard rounded panel + HrSoft divider
├── SectionHeading.tsx      # eyebrow + title + subtitle pattern
├── DeviceMockupHero.tsx    # OLD: text-overlay device mockup hero (unused now)
├── DeviceMockupSplit.tsx   # NEW: side-by-side device mockup for Website page
├── GoogleAdsHero.tsx       # NEW: CSS Google SERP mockup for Google Ads page
├── CompactVideo.tsx        # NEW: click-to-load video (avoids slow page loads)
└── PillarsVariants.tsx     # NEW: 4 pillar layouts (Numbered/Grid/Stack/Flow)

src/lib/
└── useDeckOrder.ts         # computes ordered route array for sidebar/keyboard nav
```

### Service Registry Pattern

Each service in `SERVICES` is a `ServiceMeta`:

```ts
type ServiceMeta = {
  key: ServiceKey;
  label: string;
  short: string;
  route: string;
  icon: LucideIcon;
  accent: string;          // tailwind gradient classes, e.g. "from-coral to-gold-500"
  headline: string;
  subhead: string;
  ecosystemRole: string;
  problem: string;
  solution: string;
  pillars: { title: string; body: string }[];
  deliverables: string[];  // [__] tokens become highlighted blanks on Value page
  imageUrl: string;
  heroVariant?: "deviceMockup" | "deviceSplit" | "googleAdsSerp";
  pillarLayout?: "numbered" | "grid" | "stack" | "flow";
  standalone?: boolean;    // if false: shows on Value page but no own route/nav entry
  processVideo?: { title: string; description: string; url: string };
};
```

### Active Service Keys

```ts
type ServiceKey =
  | "organicSocial"      // Organic Social Media
  | "paidSocial"         // Social Ads (Meta + TikTok) — note: route is "/paid-advertising"
  | "googleAds"          // Google Ads
  | "websiteCreation"    // Website (renamed from "Website + SEO")
  | "websiteManagement"  // Web Management — standalone:false (embedded on Website page)
  | "seo";               // disabled in client.ts (kept in registry but not rendered)

SERVICE_ORDER = [
  "organicSocial",
  "googleAds",
  "paidSocial",          // labeled "Social Ads" — historical key, don't rename
  "websiteCreation",
  "websiteManagement",   // hidden from nav via standalone:false but visible on Value page
  "seo",                 // disabled
];
```

⚠️ **Naming gotcha:** `paidSocial` is the internal key for what the UI now calls **Social Ads**. The route is `/paid-advertising`. Don't rename the key — it'd break commit history and config.

### Route Filtering (in `src/main.tsx`)

```tsx
{SERVICE_ORDER
  .filter((k) => config.services[k].enabled && SERVICES[k].standalone !== false)
  .map((k) => <Route path={SERVICES[k].route} element={<ServicePage serviceKey={k} />} />)}
```

`useDeckOrder.ts` applies the same filter for sidebar nav order + keyboard arrow navigation.

---

## Page Transition Animation

Located in `src/components/Layout.tsx`.

**Critical detail:** The scroll-to-top runs in `useLayoutEffect` (not `useEffect`) so it fires *before* paint. Otherwise, the new page briefly renders at the previous scroll position, causing children with `whileInView` to "pop" then animate.

```tsx
useLayoutEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, [location.pathname]);

<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
  >
    <Outlet />
  </motion.div>
</AnimatePresence>
```

`mode="wait"` (not `"sync"`) ensures the previous page fully exits before the new one mounts.

---

## Pillar Layout Variants

Each service has its own visual treatment to break the templated feel. Defined in `src/components/PillarsVariants.tsx`:

| Service | `pillarLayout` | Visual |
|---|---|---|
| Organic Social | `grid` | 2×2 cards, no numbers, gradient accent bars |
| Google Ads | `stack` | Horizontal rows with mono numerals + soft dividers |
| Social Ads (paidSocial) | `flow` | Horizontal 4-stage strip with arrows + alternating-indent detail cards |
| Website | `grid` | Same as Organic Social |
| (default) | `numbered` | Old numbered cards (kept as fallback, not currently used) |

**Section headings are also varied per service** — see `getPillarsHeading(key)` in `ServicePage.tsx`. No more "Four Pillars / Built on a foundation that doesn't move" repeating across every service.

---

## Hero Variants

`heroVariant` field controls the hero background:

- **`deviceMockup`** — original device mockup with text overlay (still used? no — replaced)
- **`deviceSplit`** — side-by-side: text on left half, devices on right half (used by Website page)
- **`googleAdsSerp`** — CSS Google search results mockup (used by Google Ads — replaces hero image)
- *(none)* — use `imageUrl` as full-bleed background image with gradient overlays (default)

---

## Process Video (CompactVideo)

The "What happens when you hire us" video on Organic Social used to load on every page visit (slow), and the layout had huge whitespace.

Now in `src/components/CompactVideo.tsx`:
- Renders a thumbnail + play button initially. **No `<video>` element rendered until clicked.**
- On click, swaps in `<video autoPlay controls>` with full controls.
- Max height capped at 220px. Layout is horizontal: text left (1fr), video right (320–380px).
- `controlsList="nofullscreen nodownload noremoteplayback"` and `disablePictureInPicture` prevent fullscreen escape from the deck.

---

## Value Page

`src/pages/ValuePage.tsx` renders one row per `enabled` service (including non-standalone like Web Management). Each row shows:
- Service icon + label
- Hours estimate (top-left badge)
- Price per month (right side, large)
- Deliverables list with `[__]` tokens highlighted in gold

**Template blanks:** Any deliverable string containing `[__]` renders that token as a highlighted blank pill so the user knows to fill it in when adapting the template.

The "à la carte total" section was removed at user's request — replaced with messaging on the Let's Go page about bundle savings.

---

## Let's Go Page

`src/pages/LetsGoPage.tsx` shows the all-in-one bundle. Bundle includes:
- Organic Social
- Google Ads
- Website (with Website Management embedded)

**Social Ads is explicitly NOT in the bundle** — it's an add-on. The user's stance: "this can always be added on later, but we don't recommend it right away."

The PILLARS constant in this file should match the bundle composition. Currently:
- Organic Social — "Community + content engine"
- Paid Advertising → should reflect Google Ads only? **Pending review**
- Website + SEO → renamed to just Website

---

## Web Management (Special Case)

`websiteManagement` service has `standalone: false`. This means:
- ❌ No standalone route at `/website-management`
- ❌ No sidebar nav entry
- ✅ Shows as own row on the Value page (with own price/deliverables)
- ✅ Embedded as a "Also included with the website" subsection at the bottom of the Website page (`ServicePage.tsx` → `<WebManagementSubsection />`)

The subsection content is hardcoded in `ServicePage.tsx` (not pulled from `SERVICES.websiteManagement.pillars`). Three sub-items: landing pages for ads, batch revision cycles, always-on monitoring.

---

## Public Assets

```
public/
├── logo.png                    # 1080x1350, white logo on transparent — has tons of padding
├── favicon-bum.svg             # NEW: cropped logo + dark gradient tile (256×256)
├── favicon-256.png             # cropped 256×256 PNG (used inside favicon-bum.svg as base64)
├── favicon-cropped.png         # tightly cropped intermediate
├── images/
│   ├── bts-shoot.jpeg          # Organic Social hero (BTS photo)
│   ├── download-2.jpg          # Social Ads (paidSocial) hero
│   ├── rp-menu-computer.jpg    # Rusty Pelican desktop screenshot
│   └── rp-menu-mobile.jpg      # Rusty Pelican mobile screenshot
└── videos/
    └── how-we-work.mp4         # 66MB process video (Organic Social)
```

The favicon now uses `/favicon-bum.svg` — a tightly cropped logo on a dark gradient tile. Browser tabs show the logo filled-in instead of small with white space around it.

---

## Conversation History (Major Iterations)

This deck went through several rounds of overhaul. In rough order:

### Round 1 — Initial polish
- Real logo.png replacing placeholder
- Equal-height path cards on Opportunities page
- Removed all em/en dashes from copy
- Muted service icon colors to gold-only

### Round 2 — Logo sizing
- Bumped Cover logo from `size-9` → `size-18` (72px)
- Bumped sidebar logo to `size-12` (48px)

### Round 3 — Ecosystem + organic social media
- Auto-scroll to detail panel on node click
- Mutual exclusivity between node detail and break warning
- BTS photo as hero, process video, work examples

### Round 4 — Process video tightening
- Removed "Results we've created" / work examples section entirely
- Compact Panel layout for video
- Disabled fullscreen/PiP/download

### Round 5 — Major content overhaul
- Favicon → BUM logo
- Hover-to-play video with audio
- Organic Social rewrite around 95/5 trust-first ratio
- Deliverables moved to Value page
- Paid Social → Paid Advertising (Google + Meta + TikTok merged)
- Website + SEO merged into single service
- Heavy use of buttonupmedia-site.vercel.app source content

### Round 6 (latest) — Visual variety + Web Management split
- Page transition fix (`useLayoutEffect` + `mode="wait"`)
- Favicon larger/filled-in (cropped + dark tile)
- **Removed 95% / 50/50 numerals** from Organic Social copy
- **Per-service pillar layouts** (Grid / Stack / Flow / Numbered)
- **Per-service section heading copy** (no more repeating "Four Pillars")
- **Google Ads SERP mockup hero** replacing the Unsplash image
- **Website renamed** from "Website + SEO" to just "Website"
- **Side-by-side hero** for Website (text left, devices right — not overlay)
- **Web Management** demoted from standalone page to subsection on Website page
- **CompactVideo** click-to-load (fixes slow page load on Organic Social)
- Social Ads got a horizontal flow strip with stage arrows

---

## Known Issues / Pending Items

These came up but haven't been addressed yet — flagged for whoever picks this up:

1. **Phone aspect ratio** — User said the Rusty Pelican mobile screenshot looks too cropped in `DeviceMockupSplit`. Current fix uses `objectPosition: "center 0%"` but may need further tuning. The screenshot itself may need re-cropping.

2. **Let's Go page PILLARS constant** — Still references "Paid Advertising" but should now likely say "Google Ads" only (since Social Ads is an add-on, not in the bundle). Check `src/pages/LetsGoPage.tsx` line ~60.

3. **Value page hour estimates** — User asked for hour recommendations next to each service. The data field exists conceptually but verify it's wired up across all rows in `ValuePage.tsx`.

4. **Bundle savings messaging** — User wants the "à la carte vs bundle" comparison on the Let's Go page (was removed from Value page). Check whether this is currently shown explicitly.

5. **Google Ads page copy expansion** — User wants this "heavily" informed by `buttonupmedia-site.vercel.app/restaurant-advertising.html`. Current pillars are good but could be expanded with budget tiers ($1K–$3K independent / $3K–$8K multi-location / $5K–$15K+ fine dining) and the 4-step process from the BUM site.

6. **Social Ads retargeting bridge** — User wants Social Ads to explicitly position as "feeds off Google Ads via retargeting." The flow strip helps but the body copy could lean harder into the retargeting bridge concept.

---

## Common Commands

```bash
# Development
cd ~/pitch-deck && npm run dev          # local dev server (vite)
cd ~/pitch-deck && npm run build        # production build (tsc -b && vite build)

# Git workflow
git add <specific files>                # never use -A unless necessary
git config user.email chris.p@buttonupmedia.com  # required for Vercel
git push origin main                    # auto-deploys to Vercel

# Vercel
npx vercel ls                           # list deployments
npx vercel alias set <deploy-url> pitch-deck-flame-mu.vercel.app
                                        # if alias gets unstuck from latest deploy
```

---

## Coding Conventions

1. **No emojis in source files** unless user explicitly requests
2. **No README files** unless requested
3. **Always read a file before editing** (Read tool requirement)
4. **Prefer Edit over Write** for existing files (sends only the diff)
5. **Tailwind first** — avoid custom CSS unless tokens force it
6. **Framer Motion** — use `whileInView` for scroll reveals, `initial`+`animate` for above-the-fold
7. **Panel component** is the canonical container — use `padding="compact"` for denser layouts
8. **`SectionHeading`** for the eyebrow / title / subtitle pattern at the top of sections
9. **TypeScript strict** — `tsc -b` runs as part of build; unused imports = build error
10. **Don't break the public/ asset references** — many are hardcoded in `services.tsx`

---

## File Manifest (Most Recently Touched)

```
src/components/Layout.tsx               # transition fix (useLayoutEffect + mode=wait)
src/components/CompactVideo.tsx         # NEW
src/components/GoogleAdsHero.tsx        # NEW
src/components/DeviceMockupSplit.tsx    # NEW
src/components/PillarsVariants.tsx      # NEW
src/pages/ServicePage.tsx               # full rewrite — variant rendering + WebMgmt subsection
src/pages/ValuePage.tsx                 # deliverables grid, blanks highlighting
src/pages/LetsGoPage.tsx                # PILLARS constant (needs Google Ads update)
src/config/services.tsx                 # ServiceMeta type expanded; per-service config updates
src/main.tsx                            # route filter for standalone services
src/lib/useDeckOrder.ts                 # nav filter for standalone services
index.html                              # favicon → favicon-bum.svg
public/favicon-bum.svg                  # NEW
```

---

## Latest Commit

```
f11ad98 Visual variety per service + click-to-load video + Web Mgmt subsection
```

Pushed to `origin/main`. Vercel auto-deployed at https://pitch-deck-flame-mu.vercel.app

---

*End of handoff document.*
