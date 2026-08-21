# Moose Software Solutions — marketing site

Marketing site for **Moose Software Solutions** (moose.gr): custom web
applications, Shopify e-shops, and CRMs. Built with Astro — every page ships as
static HTML, with React hydrating only the interactive sections (islands).

## Stack

- **Astro 7** (static output, React islands) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme + tokens in `src/index.css`) + shadcn/ui + Radix
  (the shadcn Tailwind preset is vendored at `src/styles/shadcn-tailwind.css`;
  use `npx shadcn@latest` to scaffold new ui components)
- Contact form delivery via the self-hosted backend in `server/` (`/api/contact`,
  proxied in dev — see `astro.config.mjs`)

## Pages & languages

Language is part of the URL; each page is prerendered per locale with proper
`hreflang` alternates (copy lives in `src/locales/translations.json`):

| URL                | Page                    |
| ------------------ | ----------------------- |
| `/`                | Homepage (English)      |
| `/el/`             | Homepage (Greek)        |
| `/privacy.html`    | Privacy policy (English) — keeps its historical URL |
| `/el/privacy.html` | Privacy policy (Greek)  |

## Scripts

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Astro dev server (HMR).                   |
| `npm run build`   | Typecheck (`tsc --noEmit`), then `astro build` to `dist/`. |
| `npm run preview` | Serve the production build locally.                 |
| `npm run lint`    | Run ESLint.                                         |

## Project layout

- `src/pages/` — one `.astro` file per URL (thin wrappers around shared shells).
- `src/components/HomePage.astro`, `PrivacyShell.astro` — per-locale page shells.
- `src/layouts/Base.astro` — `<head>` (meta, OG, hreflang, JSON-LD, Consent
  Mode bootstrap + GTM container `GTM-T4JVVFKQ`). GA4 and Google Ads tags are
  configured in GTM, not in code; `src/lib/analytics.ts` only pushes
  dataLayer events.
- `src/components/` — React sections (`Hero`, `Features`, `Metrics`, `TechStack`,
  `Work`, `CTASection`, `ContactUs`, `Footer`) + shared `SectionHeader` and
  `ui/` primitives. Sections take a `locale` prop; only `Hero`, `SocialProof`,
  `TechStack`, `Work`, `ContactUs`, and `CookieBanner` hydrate on the client.
- `src/lib/home-interactions.ts` — document-level click handling for the static
  sections (CTA focus/flash, Features → Work project selection).
- `src/locales/translations.json` — EN/EL copy (English is the type-checked
  source of truth; a missing Greek key fails the build).
- `src/index.css` — Tailwind theme, brand color tokens, global styles.
- `public/` — favicons, `og-image.jpg`, `robots.txt`, `sitemap.xml`.
- `server/` — Flask contact-form backend + nginx/systemd config (deployed
  separately; see `server/README.md`).

## Deploy

Fully static output. Serve `dist/` at the domain root (nginx on the production
server) and keep the `www → non-www` redirect. Update the hard-coded
`https://moose.gr` URLs in `astro.config.mjs` (`site`), `src/layouts/Base.astro`,
and `public/sitemap.xml` if the domain changes.
