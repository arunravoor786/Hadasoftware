// Deploys dist/ to Hostinger over FTP (explicit TLS by default).
//
//   npm run deploy:dry          list what would be uploaded and what is on the server now
//   npm run deploy              back up the live site, then upload dist/
//   npm run deploy -- --clean-legacy   also delete the old site's six .html pages and its old assets
//
// Credentials come from .env.deploy (git-ignored) or the environment (CI).
// Copy .env.example to .env.deploy and fill it in from hPanel → Files → FTP Accounts.
import fs from 'node:fs';
import path from 'node:path';
import { Client } from 'basic-ftp';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const NO_BACKUP = args.has('--no-backup');
const CLEAN_LEGACY = args.has('--clean-legacy');
const LEGACY_FILES = ['about.html', 'acip.html', 'bizwhats.html', 'contact.html', 'products.html', 'assets/style.css', 'assets/site.js'];

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m && !line.trimStart().startsWith('#')) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = { ...loadEnvFile('.env.deploy'), ...process.env };
const missing = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'].filter((k) => !env[k]);
if (missing.length) {
  console.error(`Missing ${missing.join(', ')}.\nCopy .env.example to .env.deploy and fill in your Hostinger FTP details (hPanel → Files → FTP Accounts).`);
  process.exit(1);
}

const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/ is missing. Run `npm run build` first.');
  process.exit(1);
}

const remoteDir = env.FTP_REMOTE_DIR || 'public_html';
const client = new Client(60_000);
client.ftp.verbose = Boolean(env.FTP_VERBOSE);

function localFiles(dir, base = dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? localFiles(full, base) : [path.relative(base, full).split(path.sep).join('/')];
  });
}

try {
  await client.access({
    host: env.FTP_HOST,
    port: Number(env.FTP_PORT || 21),
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: env.FTP_SECURE !== 'false',
    secureOptions: { rejectUnauthorized: env.FTP_TLS_REJECT_UNAUTHORIZED !== 'false' },
  });
  console.log(`Connected to ${env.FTP_HOST} as ${env.FTP_USER}.`);

  await client.cd(remoteDir);
  const current = await client.list();
  console.log(`\nRemote ${remoteDir}/ currently has ${current.length} entries:`);
  for (const f of current) console.log(`  ${f.isDirectory ? 'd' : '-'} ${f.name}`);

  const files = localFiles(dist);
  console.log(`\nLocal dist/ has ${files.length} files to upload.`);

  if (DRY) {
    for (const f of files) console.log(`  + ${f}`);
    console.log('\nDry run only: nothing was changed.');
  } else {
    if (!NO_BACKUP) {
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = path.resolve('backups', `live-${stamp}`);
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`\nBacking up the live site to ${backupDir} …`);
      await client.downloadToDir(backupDir);
      await client.cd('/');
      await client.cd(remoteDir);
    }
    console.log('\nUploading …');
    await client.uploadFromDir(dist);
    if (CLEAN_LEGACY) {
      for (const f of LEGACY_FILES) {
        try {
          await client.remove(f);
          console.log(`  removed old ${f}`);
        } catch {
          // already gone
        }
      }
    }
    console.log(`\nDeployed ${files.length} files to ${remoteDir}/. Open https://hadasoft.in/ to check.`);
  }
} catch (err) {
  console.error(`\nDeploy failed: ${err.message}`);
  if (/certificate|self.signed|altname/i.test(String(err.message))) {
    console.error('The FTP TLS certificate did not match the host. Use the FTP hostname shown in hPanel, or set FTP_TLS_REJECT_UNAUTHORIZED=false.');
  }
  process.exitCode = 1;
} finally {
  client.close();
}
