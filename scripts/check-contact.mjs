// Content guard. Fails the build if the site exposes a phone number, a WhatsApp
// click-to-chat link, or details of people no longer with the company.
// Runs automatically after `npm run build`; run it alone with `npm run check:contact`.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TEXT = /\.(html|js|mjs|css|json|xml|txt|svg|ts|tsx|webmanifest)$/i;

/** Rules for every scanned file (safe on minified bundles). */
const strict = [
  { name: 'tel: phone link', re: /tel:\+?\d/i },
  { name: 'WhatsApp click-to-chat link', re: /wa\.me\/|api\.whatsapp\.com\/send/i },
  { name: "the previous company phone number", re: /8329\s?438\s?542|83294\s?38542/ },
  { name: 'removed person (no longer with the company)', re: /manikantha|mathiyalagan|nithyakalyani/i },
];
/** Extra rule for human-written files only (minified JS is full of long numbers). */
const humanOnly = [{ name: 'Indian mobile number', re: /(?:\+91[\s-]?)\b[6-9]\d{4}[\s-]?\d{5}\b|\b[6-9]\d{4}\s\d{5}\b/ }];

function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (TEXT.test(entry.name)) yield p;
  }
}

const targets = [
  ...walk(path.join(ROOT, 'src')),
  ...walk(path.join(ROOT, 'public')),
  ...walk(path.join(ROOT, 'dist')),
  path.join(ROOT, 'index.html'),
].filter((p) => fs.existsSync(p));

const problems = [];
for (const file of targets) {
  const text = fs.readFileSync(file, 'utf8');
  const minified = /[\\/]dist[\\/]assets[\\/]/.test(file);
  const rules = minified ? strict : [...strict, ...humanOnly];
  for (const rule of rules) {
    const m = rule.re.exec(text);
    if (m) {
      const at = Math.max(0, m.index - 40);
      problems.push(`${path.relative(ROOT, file)}: ${rule.name}: …${text.slice(at, m.index + m[0].length + 40).replace(/\s+/g, ' ')}…`);
    }
  }
}

if (problems.length) {
  console.error('\nContent guard failed:\n' + problems.map((p) => `  - ${p}`).join('\n') + '\n');
  process.exit(1);
}
console.log(`Content guard passed: ${targets.length} files, no phone numbers, WhatsApp links or removed names.`);
