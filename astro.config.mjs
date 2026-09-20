// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sitemap from '@astrojs/sitemap';

const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
const blogDates = new Map();

try {
  for (const slug of readdirSync(blogDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const indexPath = join(blogDir, slug.name, 'index.md');
    const raw = readFileSync(indexPath, 'utf8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;
    const fm = fmMatch[1];
    if (/^draft:\s*true/m.test(fm)) continue;
    const dateMatch = fm.match(/^publishedAt:\s*([^\n]+)/m);
    if (!dateMatch) continue;
    const date = new Date(dateMatch[1].trim().replace(/^['"]|['"]$/g, ''));
    if (Number.isNaN(date.getTime())) continue;
    blogDates.set(`/blog/${slug.name.toLowerCase()}/`, date);
  }
} catch {
  // best-effort lastmod; sitemap still works without it
}

// https://astro.build/config
export default defineConfig({
  site: 'https://eenayar.github.io',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const url = new URL(item.url);
        const date = blogDates.get(url.pathname.toLowerCase());
        if (date) {
          item.lastmod = date.toISOString();
        }
        return item;
      },
    }),
  ],
});
