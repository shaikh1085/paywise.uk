# PayWise prerendering (Task 10) — applied 2026-10-26

## What is applied, and what is not

- The 52 non-homepage canonical routes have a rendered HTML snapshot in
  `public/<route>/index.html` (generated 2026-10-26 in Chromium 152 from
  the v3 build). Vite copies `public/` into `dist/` on every build, so a
  normal `npm run build` now ships those snapshots as static files.
  The homepage keeps the built `index.html` (its hardcoded title is
  already the homepage title).
- Verified on the generated output: 53/53 routes, 53 unique titles, no
  missing description/canonical/H1, all canonicals matching
  `paywiseuk.vercel.app` + route.
- NOT applied: nothing was pushed to GitHub, nothing was merged to
  `main`, and nothing is live yet. This working copy is not a git repo.

## How it works, and the one thing to check on preview

`vercel.json` rewrites everything to `/index.html` as an SPA fallback.
On Vercel, a matching static file is served before the rewrite fallback,
so a direct load of e.g. `/credit-card-repayment-calculator/` should
serve `public/credit-card-repayment-calculator/index.html`. That
precedence must be confirmed on the Vercel preview deployment — if the
preview still serves the SPA shell for a route, this approach does not
work there and the fallback is a build-time crawl (see below).

## Regenerating (snapshots go stale when content changes)

Snapshots are static: if a page's title, text or calculator changes,
regenerate them, otherwise crawlers keep seeing the old snapshot.

CRITICAL (learned 2026-10-27, live breakage): snapshots embed the
hashed asset filenames (assets/index-<hash>.css/.js) from the build
they were crawled from. ANY later source change that alters the CSS/JS
hash makes every snapshot's stylesheet and bundle 404, so deep pages
render completely unstyled with no hydration — even if no page content
changed (the watermark-only change did exactly this). Rule: regenerate
snapshots after EVERY source change before any push, and verify all
snapshot asset refs match the fresh dist build.

```
npm run build
npm run prerender   # needs Playwright + Chromium; see scripts/prerender.mjs
# then copy dist/<route>/index.html for the 52 non-homepage routes
# back into public/<route>/index.html and rebuild once to verify.
```

Do NOT wire `prerender` into `npm run build` until a browser run on
the Vercel build image is proven — that is still unverified, and a
failing browser step would break the whole build. Do NOT re-add
`vite-plugin-prerender` (tried 2026-10-26, broken: ESM require(),
pinned Chromium 2019 cannot parse the Vite 6 bundle, X11 libs missing).

## Known stale content (not a prerender failure)

Two rendered titles still carry an old year: `/stamp-duty-calculator`
(2025/26) and `/credit-card-repayment-calculator` (2025/2026). Fix the
source titles, then regenerate those snapshots.
