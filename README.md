# hadasoft.in

The website of **Hadasoftware Private Limited** (Hadasoft), Magarpatta, Pune.
React 19 · MUI 9 · Motion 14 · React Router 8 · Lenis · Vite 8 · TypeScript, built as a static site for Hostinger.

Contact on the site is **email only**: `contactus@hadasoft.in` for the company and `support@bizwhats.in` for BizWhats.
A content guard fails every build that contains a phone number, a WhatsApp click-to-chat link, or details of people
no longer with the company.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173 with hot reload
npm run build        # type-check, build, prerender every route, run the content guard → dist/
npm run preview      # serve dist/ at http://localhost:4173
```

## Deploy to Hostinger

The build output in `dist/` is the whole website, including `.htaccess` (redirects from the old `.html` URLs,
security headers and caching).

**Option A: File Manager (no credentials on this machine)**

```bash
npm run build
npm run package      # → release/hadasoft-site-YYYY-MM-DD.zip
```

In hPanel → Files → File Manager → `public_html`: upload the zip, then **Extract**. Keep a copy of the old
files first if you want a rollback (they are also in `legacy-site/` in this repo).

**Option B: FTP script**

```bash
cp .env.example .env.deploy   # fill in host, user and password from hPanel → Files → FTP Accounts
npm run deploy:dry            # shows what is on the server and what would be uploaded
npm run deploy                # backs up the live site to backups/, then uploads dist/
npm run deploy -- --clean-legacy   # also removes the old site's .html pages and old assets
```

**Option C: GitHub Actions**: add `FTP_HOST`, `FTP_USER` and `FTP_PASSWORD` as repository secrets, then run the
*Build and deploy* workflow manually with **deploy** ticked. Every push to `main` builds and checks the site.

## Where things live

| Change | File |
|---|---|
| Company facts, emails, nav, products, sectors, cities | `src/content/site.ts` |
| Client case studies (add a project → it appears on Home and Services) | `src/content/work.ts` |
| Services and the delivery process | `src/content/services.ts` |
| Page titles and descriptions (also used for link previews) | `src/seo/pages.ts` |
| Pages | `src/pages/*.tsx` |
| Motion graphics (all SVG/CSS, no WebGL) | `src/graphics/*.tsx` |
| Design tokens, theme, typography | `src/theme/` |

## Design system

- **Look:** an engineering drawing on warm paper: hairline rules, grid references, mono annotations.
- **Colour has meaning:** teal = retention (BizWhats), signal orange = risk (ACIP), ink everywhere else.
- **Type:** Archivo (variable width) for text, IBM Plex Mono for labels. Both are self-hosted, so the site makes no Google Fonts requests.
- **Motion:** every animation pauses off-screen and respects the visitor's reduced-motion setting. Smooth scrolling is
  skipped on touch devices and for reduced-motion users, so phones keep native scrolling.

The tokens and components are self-contained so they can be reused for the bizwhats.in revamp.

## Tooling

```bash
npm run shots        # screenshots of every route at 1440px and 390px + console-error/overflow report
npm run og           # re-render public/og.png and the PNG icons
npm run check:contact
node scripts/capture-work.mjs <url> public/work/<name>.jpg   # portfolio screenshot for a new case study
```

Design references for this build came from the [Inspo MCP](https://github.com/Nutlope/inspo) archive.
