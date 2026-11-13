import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '../dist');
const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, '');
if (!siteUrl || !/^https:\/\/[^/]+$/.test(siteUrl)) throw new Error('SITE_URL must be a confirmed HTTPS origin.');
const legalRoutes = ['aviso-legal', 'privacidad', 'cookies', 'reservas'];
const pages = [['', 'es', ''], ...['es', 'en'].flatMap(lang => [[lang, lang, ''], ...legalRoutes.map(route => [`${lang}/${route}`, lang, route])])];
for (const [folder, locale, route] of pages) {
  const path = resolve(dist, folder, 'index.html');
  if (!existsSync(path)) throw new Error(`Missing built page: ${path}`);
  const url = `${siteUrl}/${locale}/${route ? `${route}/` : ''}`;
  const localized = lang => `${siteUrl}/${lang}/${route ? `${route}/` : ''}`;
  const links = `<link rel="canonical" href="${url}" /><link rel="alternate" hreflang="es" href="${localized('es')}" /><link rel="alternate" hreflang="en" href="${localized('en')}" /><link rel="alternate" hreflang="x-default" href="${localized('es')}" /><meta property="og:url" content="${url}" /><meta property="og:locale" content="${locale === 'es' ? 'es_DO' : 'en_US'}" /><meta name="twitter:card" content="summary_large_image" />`;
  let html = readFileSync(path, 'utf8').replace('</head>', `${links}</head>`);
  html = html.replace('content="/images/hero-artevital.webp"', `content="${siteUrl}/images/hero-artevital.webp"`);
  html = html.replace(/<script type="application\/ld\+json">(.*?)<\/script>/, (_, json) => {
    const schema = JSON.parse(json);
    Object.assign(schema, { '@id': `${siteUrl}/#business`, url: siteUrl, image: `${siteUrl}/images/hero-artevital.webp`, legalName: 'Arte Vital by Jina Morales EIRL', email: 'artevitalrd@gmail.com', sameAs: ['https://www.instagram.com/artevitallr/', 'https://www.instagram.com/jinamoralesmakeupartist/'] });
    return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
  });
  writeFileSync(path, html);
}
const urls = pages.filter(([folder]) => folder).map(([folder]) => `${siteUrl}/${folder}/`);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync(resolve(dist, '404.html'), `<!doctype html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Página no encontrada | ArteVital</title><link rel="stylesheet" href="/fonts/fonts.css"><style>body{margin:0;min-height:100vh;display:grid;place-content:center;padding:24px;background:#f7f5ef;color:#292721;font:18px/1.6 Manrope,Arial,sans-serif}h1{font-family:'Cormorant Garamond',serif;font-size:3rem}a{color:#64582f}</style></head><body><main><p>ArteVital</p><h1>Página no encontrada</h1><p>Page not found</p><p><a href="/es/">Volver al inicio</a> · <a href="/en/">English home</a></p></main></body></html>`);
