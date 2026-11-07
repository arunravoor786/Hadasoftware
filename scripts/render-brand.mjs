// Generates the Hadasoft logo pack in brand/ and release/hadasoft-logo-pack.zip:
//   - vector SVGs with the wordmark converted to outlines (no font needed to open them)
//   - high-resolution transparent PNGs
//   - print-ready vector PDFs
// Usage: npm run brand
import fs from 'node:fs';
import path from 'node:path';
import * as fontkit from 'fontkit';
import { zipSync } from 'fflate';
import { chromium } from 'playwright-core';
import wawoff2 from 'wawoff2';

const root = process.cwd();
const outDir = path.join(root, 'brand');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const WHITE = '#FFFFFF';
const MIDNIGHT = '#070A1D';
const IRIS = ['#5CE1E6', '#8C7BFF', '#FF7AB6'];

// ── Wordmark: identical to the site (src/components/ui/Logo.tsx) ─────────────
// Archivo variable, weight 640, width 112%, tracking -0.035em, kerning on.
const fontFile = path.join(root, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
// fontkit cannot build variable instances from WOFF2, so decompress to plain TTF first.
const ttf = Buffer.from(await wawoff2.decompress(fs.readFileSync(fontFile)));
const font = fontkit.create(ttf).getVariation({ wght: 640, wdth: 112 });

const F = 192; // font size in drawing units
const s = F / font.unitsPerEm;
const TRACK = -0.035 * F;
const M = (26 / 19.2) * F; // on the site the mark is 26px beside 19.2px text
const GAP = (10 / 19.2) * F;
const k = M / 28; // the mark is drawn in a 28×28 box

const round = (d) => d.replace(/-?\d*\.\d+/g, (n) => String(Math.round(Number(n) * 100) / 100));

const capH = font.capHeight * s;
const baseline = 14 * k + capH / 2; // centre the capitals on the mark
const textX = M + GAP;

const run = font.layout('Hadasoft');
let cursor = 0;
let wordD = '';
let tMinX = Infinity;
let tMaxX = -Infinity;
let tMinY = Infinity;
let tMaxY = -Infinity;
run.glyphs.forEach((glyph, i) => {
  const pos = run.positions[i];
  const p = glyph.path.scale(s, -s).translate(textX + cursor + pos.xOffset * s, baseline - pos.yOffset * s);
  const bb = p.bbox;
  if (Number.isFinite(bb.minX)) {
    tMinX = Math.min(tMinX, bb.minX);
    tMaxX = Math.max(tMaxX, bb.maxX);
    tMinY = Math.min(tMinY, bb.minY);
    tMaxY = Math.max(tMaxY, bb.maxY);
  }
  wordD += p.toSVG();
  cursor += pos.xAdvance * s + (i < run.glyphs.length - 1 ? TRACK : 0);
});
wordD = round(wordD);

// ── Mark: filled shapes only (no strokes), so it survives any tool ───────────
function markShapes(kk, ox = 0, oy = 0) {
  const f = (v) => Math.round(v * 100) / 100;
  const X = (v) => f(ox + v * kk);
  const Y = (v) => f(oy + v * kk);
  const L = (v) => f(v * kk);
  const ring = (cx, cy, r) =>
    `M${X(cx) - L(r)} ${Y(cy)}a${L(r)} ${L(r)} 0 1 0 ${L(2 * r)} 0a${L(r)} ${L(r)} 0 1 0 ${-L(2 * r)} 0Z`;
  return [
    `<rect x="${X(3.5)}" y="${Y(3)}" width="${L(4.6)}" height="${L(22)}" rx="${L(1)}"/>`,
    `<rect x="${X(19.9)}" y="${Y(3)}" width="${L(4.6)}" height="${L(22)}" rx="${L(1)}"/>`,
    `<rect x="${X(8.1)}" y="${Y(12.8)}" width="${L(2.5)}" height="${L(2.4)}"/>`,
    `<rect x="${X(17.4)}" y="${Y(12.8)}" width="${L(2.5)}" height="${L(2.4)}"/>`,
    `<path fill-rule="evenodd" d="${ring(14, 14, 4.5)}${ring(14, 14, 2.1)}"/>`,
  ].join('');
}

const gradientDef = (id, x1, y1, x2, y2) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
  IRIS.map((c, i) => `<stop offset="${i / (IRIS.length - 1)}" stop-color="${c}"/>`).join('') +
  '</linearGradient>';

// Tight bounds of the full lockup.
const vb = {
  x: Math.min(3.5 * k, tMinX),
  y: Math.min(3 * k, tMinY),
  w: 0,
  h: 0,
};
vb.w = Math.max(24.5 * k, tMaxX) - vb.x;
vb.h = Math.max(25 * k, tMaxY) - vb.y;
const VB = [vb.x, vb.y, vb.w, vb.h].map((v) => Math.round(v * 100) / 100).join(' ');

function lockupSvg({ mark, word, title }) {
  const usesGradient = mark === 'iris';
  const defs = usesGradient ? `<defs>${gradientDef('iris', 3.5 * k, 3 * k, 24.5 * k, 25 * k)}</defs>` : '';
  const markFill = usesGradient ? 'url(#iris)' : mark;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}" width="${Math.round(vb.w)}" height="${Math.round(vb.h)}">` +
    `<title>${title}</title>${defs}` +
    `<g fill="${markFill}">${markShapes(k)}</g>` +
    `<path fill="${word}" d="${wordD}"/>` +
    '</svg>'
  );
}

function markSvg(fill, title) {
  const usesGradient = fill === 'iris';
  const defs = usesGradient ? `<defs>${gradientDef('iris', 3.5, 3, 24.5, 25)}</defs>` : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="512" height="512"><title>${title}</title>${defs}` +
    `<g fill="${usesGradient ? 'url(#iris)' : fill}">${markShapes(1)}</g></svg>`
  );
}

function appIconSvg() {
  const size = 1024;
  const kk = (size * 0.64) / 28;
  const o = (size - 28 * kk) / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><title>Hadasoft app icon</title>` +
    '<defs><radialGradient id="bg" cx="0.7" cy="0.25" r="0.85"><stop offset="0" stop-color="#2A2470"/><stop offset="0.7" stop-color="#070A1D"/></radialGradient>' +
    `${gradientDef('iris', o + 3.5 * kk, o + 3 * kk, o + 24.5 * kk, o + 25 * kk)}</defs>` +
    `<rect width="${size}" height="${size}" rx="${size * 0.225}" fill="url(#bg)"/>` +
    `<g fill="url(#iris)">${markShapes(kk, o, o)}</g></svg>`
  );
}

const files = [
  { name: 'hadasoft-logo-white', svg: lockupSvg({ mark: WHITE, word: WHITE, title: 'Hadasoft logo, white' }), png: 4000 },
  { name: 'hadasoft-logo-iris', svg: lockupSvg({ mark: 'iris', word: WHITE, title: 'Hadasoft logo, iridescent mark, white wordmark' }), png: 4000 },
  { name: 'hadasoft-logo-dark', svg: lockupSvg({ mark: MIDNIGHT, word: MIDNIGHT, title: 'Hadasoft logo, midnight' }), png: 4000, pdf: true },
  { name: 'hadasoft-logo-iris-dark', svg: lockupSvg({ mark: 'iris', word: MIDNIGHT, title: 'Hadasoft logo, iridescent mark, midnight wordmark' }), png: 4000, pdf: true },
  { name: 'hadasoft-mark-white', svg: markSvg(WHITE, 'Hadasoft mark, white'), png: 2048 },
  { name: 'hadasoft-mark-dark', svg: markSvg(MIDNIGHT, 'Hadasoft mark, midnight'), png: 2048 },
  { name: 'hadasoft-mark-iris', svg: markSvg('iris', 'Hadasoft mark, iridescent'), png: 2048 },
  { name: 'hadasoft-app-icon', svg: appIconSvg(), png: 1024 },
];

for (const f of files) fs.writeFileSync(path.join(outDir, `${f.name}.svg`), f.svg);

// ── Raster and PDF exports through the system Chrome ─────────────────────────
const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const f of files) {
    const [, , vw, vh] = (/viewBox="([^"]+)"/.exec(f.svg)?.[1] ?? '0 0 1 1').split(' ').map(Number);
    const width = f.png;
    const height = Math.round((width * vh) / vw);
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(f.svg).toString('base64')}`;
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.setContent(`<html><body style="margin:0;background:transparent"><img src="${dataUri}" style="display:block;width:${width}px;height:${height}px"></body></html>`);
    await page.waitForLoadState('load');
    await page.screenshot({ path: path.join(outDir, `${f.name}.png`), omitBackground: true });
    if (f.pdf) {
      const mmW = 180;
      const mmH = Math.round((mmW * vh) / vw * 10) / 10;
      await page.setContent(`<html><body style="margin:0">${f.svg.replace(/width="\d+" height="\d+"/, `width="${mmW}mm" height="${mmH}mm"`)}</body></html>`);
      await page.pdf({ path: path.join(outDir, `${f.name}.pdf`), width: `${mmW}mm`, height: `${mmH}mm`, printBackground: false, pageRanges: '1' });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

// ── Usage notes ───────────────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(outDir, 'README.md'),
  `# Hadasoft logo pack

| File | Use it on |
|---|---|
| \`hadasoft-logo-white\` | dark backgrounds |
| \`hadasoft-logo-iris\` | dark backgrounds (signature version) |
| \`hadasoft-logo-dark\` | white and light backgrounds, print |
| \`hadasoft-logo-iris-dark\` | white and light backgrounds |
| \`hadasoft-mark-*\` | avatars, favicons, small spaces |
| \`hadasoft-app-icon\` | app and social profile icons |

Formats: \`.svg\` is the master (infinitely scalable, wordmark outlined, no font needed).
\`.png\` files are transparent, 4000 px wide for the logo and 2048 px for the mark.
\`.pdf\` files are vector, for print.

Colours: midnight \`${MIDNIGHT}\` · white \`${WHITE}\` · iridescent gradient \`${IRIS.join(' → ')}\`.

Keep clear space around the logo equal to the height of the mark's ring. Do not stretch, recolour outside
these colours, add effects, or set "Hadasoft" in another typeface. Wordmark: Archivo, weight 640, width 112%.
`,
);

// ── Zip ───────────────────────────────────────────────────────────────────────
const entries = {};
for (const name of fs.readdirSync(outDir)) entries[`hadasoft-logo-pack/${name}`] = new Uint8Array(fs.readFileSync(path.join(outDir, name)));
fs.mkdirSync(path.join(root, 'release'), { recursive: true });
const zipPath = path.join(root, 'release', 'hadasoft-logo-pack.zip');
fs.writeFileSync(zipPath, zipSync(entries, { level: 9 }));

for (const name of fs.readdirSync(outDir)) {
  console.log(`${name.padEnd(32)} ${Math.round(fs.statSync(path.join(outDir, name)).size / 1024)} KB`);
}
console.log(`\nZipped to ${path.relative(root, zipPath)} (${Math.round(fs.statSync(zipPath).size / 1024)} KB)`);
