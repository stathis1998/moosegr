// Post-build prerender: boots `vite preview` over dist/, loads each page in
// headless Chromium, and writes the fully-rendered HTML back into dist/ so
// crawlers and social scrapers get real content + meta instead of an empty
// <div id="root">. React still mounts over it on load.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4188;

const PAGES = [
  { route: "/", out: "index.html", readySelector: "#contact" },
  { route: "/privacy.html", out: "privacy.html", readySelector: "#privacy-policy" },
];

// Every route renders from the same SPA shell, but /privacy.html needs a real
// file on disk for the preview server (and nginx in production) to serve.
await copyFile(
  path.join(ROOT, "dist", "index.html"),
  path.join(ROOT, "dist", "privacy.html"),
);

const server = await preview({
  root: ROOT,
  preview: { port: PORT, strictPort: true },
});

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  for (const { route, out, readySelector } of PAGES) {
    const url = `http://localhost:${PORT}${route}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    // Wait until React has rendered the real content before snapshotting.
    await page.waitForSelector(readySelector, { timeout: 15000 });
    const html = await page.content();

    const outFile = path.join(ROOT, "dist", out);
    await writeFile(outFile, html, "utf8");
    console.log(
      `Prerendered ${url} -> dist/${out} (${Math.round(html.length / 1024)}KB)`,
    );
  }
} finally {
  await browser.close();
  if (typeof server.close === "function") await server.close();
  else server.httpServer?.close();
}
