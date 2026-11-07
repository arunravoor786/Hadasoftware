// Captures a portfolio screenshot of a live client site with the system Chrome.
// Usage: node scripts/capture-work.mjs <url> <out.jpg> [width] [height]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const [, , url, out, w = '1280', h = '800'] = process.argv;
if (!url || !out) {
  console.error('Usage: node scripts/capture-work.mjs <url> <out.jpg> [width] [height]');
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  // Some hosts show a short "checking your browser" interstitial first; give it time to clear.
  const cleared = await page
    .waitForFunction(() => !/just a moment|checking your browser/i.test(document.title + document.body.innerText.slice(0, 200)), null, { timeout: 25000 })
    .then(() => true)
    .catch(() => false);
  if (!cleared) {
    console.error('The site is still showing a browser-check interstitial; no screenshot saved.');
    process.exitCode = 2;
    await browser.close();
    process.exit();
  }
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1500);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, type: 'jpeg', quality: 82 });

  const info = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
    h1: [...document.querySelectorAll('h1')].map((e) => e.textContent?.trim()).filter(Boolean),
    h2: [...document.querySelectorAll('h2')].map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 12),
    nav: [...document.querySelectorAll('nav a, header a')].map((e) => e.textContent?.trim()).filter(Boolean).slice(0, 20),
    footer: document.querySelector('footer')?.textContent?.replace(/\s+/g, ' ').trim().slice(0, 600) ?? null,
  }));
  console.log(JSON.stringify(info, null, 2));
  console.log(`saved ${out} (${fs.statSync(out).size} bytes)`);
} finally {
  await browser.close();
}
