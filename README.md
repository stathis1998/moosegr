# Moose Software Solutions — marketing site

Single-page marketing site for **Moose Software Solutions** (moose.gr): custom web
applications, Shopify e-shops, and CRMs.

## Stack

- **Vite 8** (Rolldown) + **React 19** (React Compiler) + **TypeScript**
- **Tailwind CSS v4** (theme + tokens in `src/index.css`) + shadcn/ui + Radix
- Contact form delivery via [Web3Forms](https://web3forms.com/)

## Scripts

| Command           | What it does                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `npm run dev`     | Start the dev server (HMR).                                       |
| `npm run build`   | Typecheck, bundle, then **prerender** `dist/index.html`.          |
| `npm run preview` | Serve the production build locally.                              |
| `npm run lint`    | Run ESLint.                                                       |

### Build & prerender

`npm run build` runs `tsc -b && vite build && node prerender.mjs`. The prerender
step (`prerender.mjs`) loads the built site in headless Chromium and writes the
rendered HTML back into `dist/index.html`, so search engines and social-link
scrapers receive real content and meta tags. `puppeteer` (a dev dependency)
downloads a Chromium build on install.

## Project layout

- `src/components/` — page sections (`Hero`, `Features`, `Metrics`, `TechStack`,
  `Work`, `CTASection`, `ContactUs`, `Footer`) + shared `SectionHeader`,
  `ErrorBoundary`, and `ui/` primitives.
- `src/locales/translations.json` — EN/EL copy (the site currently ships English;
  the language toggle is intentionally disabled).
- `src/index.css` — Tailwind theme, brand color tokens, global styles.
- `public/` — `favicon.svg`, `og-image.jpg`, `robots.txt`, `sitemap.xml`,
  `privacy.html`.

## Deploy

Static SPA. `netlify.toml` is included (build `npm run build`, publish `dist`,
`www → non-www` redirect). Any static host works; serve `dist/` at the domain
root and keep the `www → non-www` redirect. Update the hard-coded
`https://moose.gr` URLs in `index.html`, `public/sitemap.xml`, and
`public/robots.txt` if the domain changes.

## Contact form

The form posts to Web3Forms using a public access key in
`src/components/ContactUs.tsx`. Enable hCaptcha and domain allow-listing in the
Web3Forms dashboard before launch to prevent spam to `info@moose.gr`.
