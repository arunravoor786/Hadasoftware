// Renders the social preview image (public/og.png, 1200x630) and PNG icons
// (favicon-32.png, apple-touch-icon.png) with the site's own fonts, using the system Chrome.
// Usage: npm run og
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = process.cwd();
// Fonts are inlined as data URLs: Chrome will not load file:// fonts into an about:blank page.
const fontUrl = (p) => `data:font/woff2;base64,${fs.readFileSync(path.join(root, 'node_modules', p)).toString('base64')}`;
const ARCHIVO = fontUrl('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const PLEX = fontUrl('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2');

const IRIS = [
  [92, 225, 230],
  [140, 123, 255],
  [255, 122, 182],
  [255, 181, 71],
];
function iris(t) {
  const x = Math.min(1, Math.max(0, t)) * (IRIS.length - 1);
  const i = Math.min(Math.floor(x), IRIS.length - 2);
  const f = x - i;
  return IRIS[i].map((c, k) => Math.round(c + (IRIS[i + 1][k] - c) * f));
}

// A still frame of the hero's particle core: a Fibonacci sphere, tilted and projected.
function coreSvg(cx, cy, r, n = 900) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.35;
  const dots = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rr = Math.sqrt(1 - y * y);
    const th = golden * i + 0.6;
    const x = Math.cos(th) * rr;
    const z = Math.sin(th) * rr;
    const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
    const depth = (z2 + 1) / 2;
    const [cr, cg, cb] = iris((x + y2 * 0.75 + 1.75) / 3.5);
    const size = (1.1 + ((i * 7919) % 13) / 9) * (0.7 + depth * 0.6);
    dots.push({ z2, s: `<circle cx="${(cx + x * r).toFixed(1)}" cy="${(cy - y2 * r).toFixed(1)}" r="${size.toFixed(2)}" fill="rgb(${cr},${cg},${cb})" fill-opacity="${(0.28 + depth * 0.72).toFixed(2)}"/>` });
  }
  return dots.sort((a, b) => a.z2 - b.z2).map((d) => d.s).join('');
}

const MARK = (fill) => `
  <svg viewBox="0 0 28 28" width="100%" height="100%" fill="none">
    <defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5CE1E6"/><stop offset=".5" stop-color="#8C7BFF"/><stop offset="1" stop-color="#FF7AB6"/></linearGradient></defs>
    <rect x="3.5" y="3" width="4.6" height="22" rx="1" fill="${fill}"/>
    <rect x="19.9" y="3" width="4.6" height="22" rx="1" fill="${fill}"/>
    <path d="M8.1 14h2.5M17.4 14h2.5" stroke="${fill}" stroke-width="2.4"/>
    <circle cx="14" cy="14" r="3.3" stroke="${fill}" stroke-width="2.4"/>
  </svg>`;

const OG = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Archivo; src: url(${ARCHIVO}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  @font-face { font-family: Plex; src: url(${PLEX}) format('woff2'); font-weight: 500; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; color: #F3F5FF; font-family: Archivo; position: relative; overflow: hidden;
         background:
           radial-gradient(520px circle at 82% 30%, rgba(140,123,255,.45), transparent 65%),
           radial-gradient(420px circle at 8% 100%, rgba(65,240,210,.22), transparent 65%),
           radial-gradient(380px circle at 95% 100%, rgba(255,122,182,.25), transparent 65%),
           #070A1D; }
  .brand { position: absolute; left: 72px; top: 64px; display: flex; align-items: center; gap: 14px; font-size: 34px; font-weight: 650; font-stretch: 112%; letter-spacing: -0.035em; }
  .brand .m { width: 40px; height: 40px; }
  h1 { position: absolute; left: 72px; top: 176px; width: 640px; font-size: 82px; line-height: 0.98; font-weight: 600; font-stretch: 112%; letter-spacing: -0.04em; }
  .g { background: linear-gradient(100deg, #5CE1E6 0%, #8C7BFF 40%, #FF7AB6 72%, #FFB547 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .s { position: relative; color: #8089B3; white-space: nowrap; }
  .s::after { content: ''; position: absolute; left: -3px; right: -3px; top: 54%; height: 6px; border-radius: 4px; background: #FF7A59; }
  .foot { position: absolute; left: 72px; right: 72px; bottom: 52px; display: flex; justify-content: space-between; border-top: 1px solid rgba(180,187,221,.25); padding-top: 20px;
          font-family: Plex; font-size: 19px; letter-spacing: .08em; text-transform: uppercase; color: #B4BBDD; }
  .fig { position: absolute; right: 34px; top: 40px; width: 470px; height: 470px; }
</style></head><body>
  <div class="brand"><div class="m">${MARK('#F3F5FF')}</div>Hadasoft</div>
  <h1>Software built to <span class="g">deliver</span>, not to <span class="s">demo</span>.</h1>
  <svg class="fig" viewBox="0 0 470 470">
    <defs><radialGradient id="glow"><stop offset="0" stop-color="rgba(140,123,255,.45)"/><stop offset="1" stop-color="rgba(140,123,255,0)"/></radialGradient></defs>
    <circle cx="235" cy="235" r="230" fill="url(#glow)"/>
    ${coreSvg(235, 235, 190)}
  </svg>
  <div class="foot"><span>Products · AI systems · Automation</span><span>hadasoft.in</span></div>
</body></html>`;

const ICON = (size, radius) => `<!doctype html><html><head><style>
  * { margin: 0; } body { width: ${size}px; height: ${size}px; background: transparent; }
  .t { width: ${size}px; height: ${size}px; border-radius: ${radius}px; background: radial-gradient(circle at 70% 25%, #2A2470, #070A1D 70%); display: grid; place-items: center; }
  .m { width: ${Math.round(size * 0.64)}px; height: ${Math.round(size * 0.64)}px; }
</style></head><body><div class="t"><div class="m">${MARK('url(#mg)')}</div></div></body></html>`;

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
  await render(ICON(32, 7), 32, 32, 'favicon-32.png');
} finally {
  await browser.close();
}
