import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// NOTE (Task 10, 2026-10-26): vite-plugin-prerender 1.0.8 was tried and
// REMOVED — it is not viable for this project (see report):
//  1. Its ESM build is broken (bare require() in dist/index.mjs).
//  2. Its pinned Puppeteer 1.20 / Chromium 2019 cannot parse the Vite 6
//     production bundle ("SyntaxError: Unexpected token '?'"), so every
//     "prerendered" page was just the SPA shell — no per-page title/meta.
//  3. It needs X11 system libs (libXtst etc.) that Vercel's build image
//     does not provide, and its failure crashes the whole build (exit 1).
// The shared route list lives on in scripts/canonical-routes.ts (used by
// the prebuild sitemap script) for a future prerender implementation
// (e.g. a tool with a current Chromium). Do NOT re-add this plugin
// without re-verifying a prerendered calculator page's <title>.

export default defineConfig(() => {
  return {
  base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom/')) {
                return 'vendor-react';
              }
              if (id.includes('react-router-dom') || id.includes('react-router')) {
                return 'vendor-router';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('@google/genai')) {
                return 'vendor-genai';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
