// Packs dist/ into release/hadasoft-site-<date>.zip for upload through
// Hostinger hPanel → File Manager → public_html → Upload → Extract.
// Paths inside the zip always use forward slashes, so it extracts correctly on Linux hosts.
import fs from 'node:fs';
import path from 'node:path';
import { zipSync } from 'fflate';

const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/ is missing. Run `npm run build` first.');
  process.exit(1);
}

const files = {};
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files[path.relative(dist, full).split(path.sep).join('/')] = new Uint8Array(fs.readFileSync(full));
  }
}
walk(dist);

const zipped = zipSync(files, { level: 9 });
fs.mkdirSync('release', { recursive: true });
const out = path.join('release', `hadasoft-site-${new Date().toISOString().slice(0, 10)}.zip`);
fs.writeFileSync(out, zipped);

console.log(`Created ${out} (${Math.round(zipped.length / 1024)} KB, ${Object.keys(files).length} files).`);
console.log('Upload it to public_html in Hostinger File Manager and choose Extract. It includes the hidden .htaccess files.');
