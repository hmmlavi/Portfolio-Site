/**
 * Generates public/sitemap.xml from the single source of truth in src/lib/seo.ts.
 *
 * Run it whenever routes change:  node scripts/generate-seo.mjs
 * It is also safe to wire into a prebuild step.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const seoSrc = readFileSync(path.join(root, 'src/lib/seo.ts'), 'utf8');

// pull every `path: '...'` paired with its `indexable: true`
const blocks = seoSrc.split(/\{\s*\n\s*id:/).slice(1);
const routes = [];
for (const b of blocks) {
  const p = b.match(/path:\s*'([^']+)'/);
  const idx = b.match(/indexable:\s*(true|false)/);
  if (p && idx && idx[1] === 'true') routes.push(p[1]);
}

const today = new Date().toISOString().slice(0, 10);
const SITE = 'https://lakshitss.vercel.app';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (p) => `  <url>
    <loc>${SITE}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'yearly'}</changefreq>
    <priority>${p === '/' ? '1.0' : '0.5'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${routes.length} public routes`);
