import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '../dist');
const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, '');
if (!siteUrl) {
  console.log('SITE_URL not set; canonical, hreflang and sitemap will be added after the domain is confirmed.');
  process.exit(0);
}
if (!/^https:\/\/[^/]+$/.test(siteUrl)) throw new Error('SITE_URL must be an HTTPS origin with no path.');

for (const [folder, locale] of [['', 'es'], ['es', 'es'], ['en', 'en']]) {
  const path = resolve(dist, folder, 'index.html');
  if (!existsSync(path)) throw new Error(`Missing built locale page: ${path}`);
  const links = `<link rel="canonical" href="${siteUrl}/${locale}/" /><link rel="alternate" hreflang="es" href="${siteUrl}/es/" /><link rel="alternate" hreflang="en" href="${siteUrl}/en/" /><link rel="alternate" hreflang="x-default" href="${siteUrl}/es/" />`;
  let html = readFileSync(path, 'utf8').replace('</head>', `${links}</head>`);
  html = html.replace('content="/images/hero-editorial.webp"', `content="${siteUrl}/images/hero-editorial.webp"`);
  writeFileSync(path, html);
}

writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/es/</loc></url>\n  <url><loc>${siteUrl}/en/</loc></url>\n</urlset>\n`);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
