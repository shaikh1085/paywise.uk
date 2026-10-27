// Task 10 prerender — MANUAL step, NOT part of `npm run build`.
// Why manual: a real browser is needed (SEO.tsx sets title/meta only in
// useEffect, so a Node renderToString would still output homepage meta),
// and the Vercel build image is NOT verified to run a browser. Do not
// wire this into `build` until a browser-on-Vercel run is proven.
//
// Usage (after a normal build, locally or in CI where a Chromium exists):
//   npm run build
//   npm run prerender        # needs Playwright + Chromium, see below
//   # then copy the rendered pages into public/ so the NEXT build ships
//   # them as static files (see PRERENDER.md). Or serve dist/ directly.
//
// Requirements: `npm i -D playwright` + `npx playwright install chromium`,
// OR playwright-core with CHROME_PATH pointing at a Chromium binary.
// This script crawls ONLY scripts/canonical-routes.ts (53 routes) and
// writes one rendered HTML file per route into dist/<route>/index.html.
// It never touches src/ and never pushes or deploys anything.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://paywise-pilot.test';
const HOMEPAGE_TITLE = 'PayWise UK — UK Salary & Take-Home Pay Calculator (2026/2027)';
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml', '.json': 'application/json', '.ico': 'image/x-icon', '.webp': 'image/webp' };

const routesText = fs.readFileSync(path.join(ROOT, 'scripts/canonical-routes.ts'), 'utf8');
const ROUTES = [...routesText.matchAll(/^\s*'([^']+)',/gm)].map((m) => m[1]);
if (!fs.existsSync(DIST)) { console.error('dist/ not found — run `npm run build` first.'); process.exit(1); }

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  ({ chromium } = await import('playwright-core'));
}
const launchOpts = { args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] };
if (process.env.CHROME_PATH) launchOpts.executablePath = process.env.CHROME_PATH;

const browser = await chromium.launch(launchOpts);
const page = await browser.newPage();
await page.route('**/*', async (route) => {
  const reqUrl = new URL(route.request().url());
  if (reqUrl.origin !== ORIGIN) { await route.abort(); return; }
  let file = path.join(DIST, decodeURIComponent(reqUrl.pathname));
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(DIST, 'index.html');
  await route.fulfill({ status: 200, contentType: MIME[path.extname(file)] || 'application/octet-stream', body: fs.readFileSync(file) });
});

const report = [];
for (const routePath of ROUTES) {
  const entry = { route: routePath, title: null, error: null };
  try {
    await page.goto(`${ORIGIN}${routePath}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => document.title && document.body && document.body.innerText.length > 200, { timeout: 20000 });
    await page.waitForTimeout(600);
    entry.title = await page.evaluate(() => document.title);
    const html = await page.content();
    const outFile = routePath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, routePath.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
  } catch (e) { entry.error = String(e).split('\n')[0]; }
  report.push(entry);
  console.log(`${entry.error ? 'FAIL' : 'ok  '} ${routePath} :: ${entry.title}`);
}
await browser.close();
const bad = report.filter((r) => r.error || (r.route !== '/' && r.title === HOMEPAGE_TITLE));
console.log(`\n${report.length} routes, ${bad.length} problems`);
if (bad.length) { console.log(bad.map((r) => `${r.route}: ${r.error || 'homepage title'}`).join('\n')); process.exit(1); }
