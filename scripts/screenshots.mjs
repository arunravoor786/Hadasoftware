// Visual check: full-page and first-viewport screenshots of every route at desktop
// and phone widths, plus a report of console errors and horizontal overflow.
// Usage: node scripts/screenshots.mjs [baseUrl] [outDir] [route,route]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://127.0.0.1:5173';
const outDir = process.argv[3] ?? 'screenshots';
const only = process.argv[4]?.split(',').filter(Boolean);
const ROUTES = only ?? ['/', '/services/', '/products/', '/bizwhats/', '/acip/', '/company/', '/contact/', '/no-such-page/'];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const slug = (route) => route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
const SLICES = process.env.SLICES === '1';

/** Scroll the whole page so lazy images load and in-view effects fire, then return to the top. */
async function walkPage(page) {
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(400);
}

async function waitForServer(url, ms = 45000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not reachable: ${url}`);
}

await waitForServer(`${base}/`);
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const problems = [];

try {
  for (const vp of VIEWPORTS) {
    const viewport = { width: vp.width, height: vp.height };

    // Reduced motion: every section renders in its final state for full-page review.
    const still = await browser.newContext({ viewport, isMobile: vp.isMobile, hasTouch: vp.isMobile, reducedMotion: 'reduce' });
    for (const route of ROUTES) {
      const page = await still.newPage();
      page.on('console', (m) => {
        if (m.type() === 'error' || m.type() === 'warning') problems.push(`[${vp.name} ${route}] console.${m.type()}: ${m.text().slice(0, 300)}`);
      });
      page.on('pageerror', (e) => problems.push(`[${vp.name} ${route}] pageerror: ${e.message}`));
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await walkPage(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) problems.push(`[${vp.name} ${route}] horizontal overflow of ${overflow}px`);
      await page.screenshot({ path: path.join(outDir, `${vp.name}-${slug(route)}-full.png`), fullPage: true });
      if (SLICES) {
        const total = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0, i = 0; y < total; y += vp.height, i++) {
          await page.screenshot({
            path: path.join(outDir, `${vp.name}-${slug(route)}-s${String(i).padStart(2, '0')}.png`),
            fullPage: true,
            clip: { x: 0, y, width: vp.width, height: Math.min(vp.height, total - y) },
          });
        }
      }
      await page.close();
    }
    await still.close();

    // Motion on: the first viewport after the intro animations have played.
    const live = await browser.newContext({ viewport, isMobile: vp.isMobile, hasTouch: vp.isMobile });
    for (const route of ROUTES) {
      const page = await live.newPage();
      page.on('pageerror', (e) => problems.push(`[${vp.name} ${route} motion] pageerror: ${e.message}`));
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(3400);
      await page.screenshot({ path: path.join(outDir, `${vp.name}-${slug(route)}-fold.png`) });
      await page.close();
    }
    await live.close();
  }
} finally {
  await browser.close();
}

console.log(problems.length ? `Problems:\n${[...new Set(problems)].join('\n')}` : 'No console errors, page errors or horizontal overflow.');
console.log(`Screenshots in ${path.resolve(outDir)}`);
