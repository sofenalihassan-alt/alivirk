# Ali Hassan — Personal Portfolio

A multi-page personal brand site for Ali Hassan — ICT Apprentice at FFC Port Qasim, freelancer and computing student.
Creative direction: **Midnight Digital Universe** — midnight surfaces, champagne-gold accents, selective glassmorphism and cinematic motion.

## Pages

| Path | Page |
| --- | --- |
| `/` | Home — hero, introduction, expertise preview, Skill Serve feature, journey, learning, contact invitation |
| `/about` | Background, DAE achievements, transition to FFC, freelancing, values, scroll timeline, vision |
| `/expertise` | Filterable skills explorer with honest experience labels |
| `/projects` | Project portfolio with category filters |
| `/projects/$slug` | Project detail pages |
| `/experience` | Current role at FFC, education, animated milestone timeline |
| `/learning` | Interactive learning roadmap and draft notes |
| `/contact` | Validated contact form + direct channels |
| any unknown URL | Custom animated 404 |
| `/sitemap.xml`, `/robots.txt` | Generated from the request host |

## Technologies

React 19 · TypeScript · TanStack Start (file-based routing, SSR, server functions) · Vite · Tailwind CSS v4 ·
Motion (Framer Motion) · Lucide icons · react-hook-form + zod · Lovable Cloud (database for contact messages).

## Project structure

```
src/
  lib/site.ts            ← name, email, WhatsApp, social links (edit here)
  data/                  ← all page content
    projects.ts          ← projects (add / edit / remove)
    expertise.ts         ← skill categories and descriptions
    journey.ts           ← education & experience milestones
    learning.ts          ← roadmap + draft notes
  components/
    motion/              ← Reveal, Stagger, SplitText, Magnetic
    site/                ← Header, Footer, Cta, PageHeader, Timeline, ambient effects…
    home/                ← hero visual, Skill Serve preview, project previews
  lib/contact-schema.ts  ← form validation rules (shared client + server)
  lib/contact.functions.ts ← server function that stores contact messages
  routes/                ← one file per page
  styles.css             ← design tokens (colors, fonts, glass utilities, keyframes)
```

## Local setup

```bash
bun install
bun run dev      # http://localhost:8080
bun run test     # vitest
bun run build
```

## Environment variables

Provided automatically by Lovable Cloud (see `.env`):

| Variable | Used by |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Contact form server function |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser client (not used by the form) |

## Contact form

Submissions are validated in the browser and again on the server (`src/lib/contact-schema.ts`), then stored in the
`contact_messages` table in Lovable Cloud. Visitors can only insert — nobody can read messages from the website.
Read them in Lovable → **Cloud → Database → contact_messages**.

Email notifications to `spark@skillserve.store` require a verified sender domain (e.g. `skillserve.store`) set up under
Lovable → **Emails**. Once verified, a notification can be sent from the same server function after the insert.

## Updating content

- **Personal details / links:** `src/lib/site.ts` (add more profiles to `socials.others`).
- **Projects:** edit `src/data/projects.ts`. Set `isPlaceholder: false`, add `liveUrl` / `githubUrl` (or `null`).
- **Skills:** `src/data/expertise.ts`. Use honest levels: Practical experience, Working knowledge, Fundamentals, Currently exploring.
- **Journey:** `src/data/journey.ts` (dates intentionally omitted until confirmed).
- **Notes:** replace drafts in `src/data/learning.ts`.
- **Portrait:** `src/assets/ali-hassan-portrait.webp.asset.json` (CDN-hosted).

## Deployment

The site is hosted on Lovable: click **Publish** in the editor. It runs server-side rendering on an edge runtime,
so no SPA fallback config is needed — every route renders on the server. Connect a custom domain in Project Settings → Domains.
