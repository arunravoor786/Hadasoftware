// After `vite build`: write one real HTML file per route (correct title, description,
// canonical and social tags before any JavaScript runs), a 404 page, the sitemap and
// cache headers for hashed assets. Then run the content guard.
import fs from 'node:fs';
import path from 'node:path';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, notFound, pages } from '../src/seo/pages.ts';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

if (!template.includes('<!--seo:start-->') || !template.includes('<!--noscript:start-->')) {
  throw new Error('postbuild: seo/noscript markers are missing from dist/index.html');
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function seoBlock(meta, url, noindex) {
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex' : 'index, follow'}" />`,
    noindex ? null : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

function noscriptBlock(meta) {
  const links = pages.map((p) => `<a href="${p.path}">${esc(p.label)}</a>`).join(' · ');
  return (
    '<noscript><div style="max-width:720px;margin:48px auto;padding:0 20px;font-family:system-ui,sans-serif;color:#111418;line-height:1.6">' +
    `<p><strong>${SITE_NAME}</strong></p><h1 style="font-size:2rem;line-height:1.15">${esc(meta.h1)}</h1><p>${esc(meta.summary)}</p>` +
    `<p>Write to us: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p><nav>${links}</nav></div></noscript>`
  );
}

function render(meta, url, noindex = false) {
  return template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${seoBlock(meta, url, noindex)}\n    <!--seo:end-->`)
    .replace(/<!--noscript:start-->[\s\S]*?<!--noscript:end-->/, `<!--noscript:start-->${noscriptBlock(meta)}<!--noscript:end-->`);
}

for (const meta of pages) {
  const out = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, meta.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(meta, SITE_URL + meta.path));
}
fs.writeFileSync(path.join(dist, '404.html'), render(notFound, `${SITE_URL}/404`, true));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);

// Hashed build assets never change, so browsers may cache them for a year.
fs.writeFileSync(
  path.join(dist, 'assets', '.htaccess'),
  '<IfModule mod_headers.c>\n  Header set Cache-Control "public, max-age=31536000, immutable"\n</IfModule>\n',
);

console.log(`postbuild: wrote ${pages.length} route pages, 404.html, sitemap.xml and asset cache rules.`);
await import('./check-contact.mjs');
