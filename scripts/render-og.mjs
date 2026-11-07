// Renders the social preview image (public/og.png, 1200x630) and PNG icons
// (favicon-32.png, apple-touch-icon.png) with the site's own fonts, using the system Chrome.
// Usage: npm run og
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = process.cwd();
// Fonts are inlined as data URLs: Chrome will not load file:// fonts into an about:blank page.
const fontUrl = (p) =>
  `data:font/woff2;base64,${fs.readFileSync(path.join(root, 'node_modules', p)).toString('base64')}`;
const ARCHIVO = fontUrl('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const PLEX = fontUrl('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2');

const MARK = (fill, stroke) => `
  <svg viewBox="0 0 28 28" width="100%" height="100%" fill="none">
    <rect x="3.5" y="3" width="4.6" height="22" rx="1" fill="${fill}"/>
    <rect x="19.9" y="3" width="4.6" height="22" rx="1" fill="${fill}"/>
    <path d="M8.1 14h2.5M17.4 14h2.5" stroke="${stroke}" stroke-width="2.4"/>
    <circle cx="14" cy="14" r="3.3" stroke="${stroke}" stroke-width="2.4"/>
  </svg>`;

// Lemniscate path for the preview's loop figure.
function loopPath(cx, cy, a, ys) {
  const pts = [];
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const s = Math.sin(t);
    const c = Math.cos(t);
    const d = 1 + s * s;
    pts.push(`${i ? 'L' : 'M'}${(cx + (a * c) / d).toFixed(1)} ${(cy + (ys * a * s * c) / d).toFixed(1)}`);
  }
  return pts.join(' ');
}
function loopPoint(cx, cy, a, ys, t) {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return [cx + (a * c) / d, cy + (ys * a * s * c) / d];
}

const dots = [0.5, 1.4, 2.6, 3.7, 4.6, 5.6]
  .map((t) => {
    const [x, y] = loopPoint(230, 210, 190, 1.42, t);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="${x < 230 ? '#1FB89F' : '#FF6A1A'}"/>`;
  })
  .join('');

const OG = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Archivo; src: url(${ARCHIVO}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  @font-face { font-family: Plex; src: url(${PLEX}) format('woff2'); font-weight: 500; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #F3F1EA; color: #111418; font-family: Archivo; position: relative; overflow: hidden;
         background-image: radial-gradient(rgba(17,20,24,.16) 1px, transparent 1px); background-size: 24px 24px; }
  .brand { position: absolute; left: 72px; top: 64px; display: flex; align-items: center; gap: 14px; font-size: 34px; font-weight: 640; font-stretch: 112%; letter-spacing: -0.035em; }
  .brand .m { width: 40px; height: 40px; }
  h1 { position: absolute; left: 72px; top: 178px; width: 640px; font-size: 76px; line-height: 1.02; font-weight: 560; font-stretch: 110%; letter-spacing: -0.035em; }
  .u { position: relative; white-space: nowrap; }
  .u::after { content: ''; position: absolute; left: 0; right: 0; bottom: 4px; height: 6px; background: #1FB89F; }
  .s { position: relative; color: #62676F; white-space: nowrap; }
  .s::after { content: ''; position: absolute; left: -3px; right: -3px; top: 56%; height: 5px; background: #FF6A1A; }
  .foot { position: absolute; left: 72px; right: 72px; bottom: 56px; display: flex; justify-content: space-between; border-top: 1px solid rgba(17,20,24,.34); padding-top: 20px;
          font-family: Plex; font-size: 19px; letter-spacing: .06em; text-transform: uppercase; color: #454A52; }
  .fig { position: absolute; right: 40px; top: 70px; width: 470px; height: 420px; }
</style></head><body>
  <div class="brand"><div class="m">${MARK('#111418', '#111418')}</div>Hadasoft</div>
  <h1>Software built to <span class="u">deliver</span>, not to <span class="s">demo</span>.</h1>
  <svg class="fig" viewBox="0 0 460 420">
    <path d="${loopPath(230, 210, 190, 1.42)}" fill="none" stroke="rgba(17,20,24,.06)" stroke-width="14"/>
    <path d="${loopPath(230, 210, 190, 1.42)}" fill="none" stroke="#111418" stroke-width="2"/>
    <circle cx="230" cy="210" r="18" fill="#F3F1EA" stroke="#111418" stroke-width="2"/>
    <ellipse cx="230" cy="205" rx="7" ry="2.6" fill="none" stroke="#111418" stroke-width="1.6"/>
    <path d="M223 205 v9 a7 2.6 0 0 0 14 0 v-9" fill="none" stroke="#111418" stroke-width="1.6"/>
    ${dots}
    <text x="105" y="216" font-family="Plex" font-size="15" fill="#0B7A6C" text-anchor="middle" letter-spacing="1">BIZWHATS</text>
    <text x="355" y="216" font-family="Plex" font-size="15" fill="#B8460B" text-anchor="middle" letter-spacing="1">ACIP</text>
  </svg>
  <div class="foot"><span>Custom software · AI systems · Automation</span><span>hadasoft.in</span></div>
</body></html>`;

const ICON = (size, radius) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; background: transparent; }
  .t { width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: #111418; display: grid; place-items: center; }
  .m { width: ${Math.round(size * 0.66)}px; height: ${Math.round(size * 0.66)}px; }
</style></head><body><div class="t"><div class="m">${MARK('#F3F1EA', '#F3F1EA')}</div></div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const render = async (html, width, height, file) => {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(root, 'public', file), omitBackground: file !== 'og.png' });
    await page.close();
    console.log(`wrote public/${file}`);
  };
  await render(OG, 1200, 630, 'og.png');
  await render(ICON(180, 0), 180, 180, 'apple-touch-icon.png');
  await render(ICON(32, 6), 32, 32, 'favicon-32.png');
} finally {
  await browser.close();
}
