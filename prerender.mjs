// Post-build prerender: boots `vite preview` over dist/, loads the page in
// headless Chromium, and writes the fully-rendered HTML back into
// dist/index.html so crawlers and social scrapers get real content + meta
// instead of an empty <div id="root">. React still mounts over it on load.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4188;

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
  const url = `http://localhost:${PORT}/`;
  await page.goto(url, { waitUntil: "networkidle0" });
  // Wait until React has rendered the real sections before snapshotting.
  await page.waitForSelector("#contact", { timeout: 15000 });
  const html = await page.content();

  const outFile = path.join(ROOT, "dist", "index.html");
  await writeFile(outFile, html, "utf8");
  console.log(
    `Prerendered ${url} -> dist/index.html (${Math.round(html.length / 1024)}KB)`,
  );
} finally {
  await browser.close();
  if (typeof server.close === "function") await server.close();
  else server.httpServer?.close();
}
