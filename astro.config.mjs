// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://moose.gr",
  integrations: [react()],
  build: {
    // Mirror src/pages exactly: privacy.astro → /privacy.html (its historical
    // URL — sitemap, external links, nginx), el/index.astro → /el/index.html.
    format: "preserve",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Contact-form backend: run `SMTP_DRY_RUN=1 python server/app.py`
      // alongside `npm run dev`.
      proxy: {
        "/api": "http://127.0.0.1:8321",
      },
    },
  },
});
