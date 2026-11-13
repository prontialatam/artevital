import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderLegalPage } from '../src/components/legal';
import { legalRoutes, legalContent } from '../src/content/legal';
import { renderPage } from '../src/components/index';
import type { Language } from '../src/content/site';

const pages: Array<[string, Language]> = [['index.html', 'es'], ['es/index.html', 'es'], ['en/index.html', 'en']];
const root = resolve(import.meta.dirname, '..');

for (const [filename, lang] of pages) {
  const path = resolve(root, filename);
  const html = readFileSync(path, 'utf8');
  const rendered = html.replace(/<!-- APP_START -->[\s\S]*?<!-- APP_END -->/, `<!-- APP_START --><div id="app">${renderPage(lang)}</div><!-- APP_END -->`);
  if (rendered === html && !html.includes('class="site-header"')) throw new Error(`Missing app marker in ${filename}`);
  if (rendered !== html) writeFileSync(path, rendered);
}

for (const lang of ['es', 'en'] as const) {
  const template = readFileSync(resolve(root, lang, 'index.html'), 'utf8');
  for (const route of legalRoutes) {
    const content = legalContent(lang, route);
    const folder = resolve(root, lang, route);
    mkdirSync(folder, { recursive: true });
    const page = template
      .replace(/<!-- APP_START -->[\s\S]*?<!-- APP_END -->/, `<!-- APP_START --><div id="app">${renderLegalPage(lang, route)}</div><!-- APP_END -->`)
      .replace(/<title>.*?<\/title>/, `<title>${content.title} | ArteVital</title>`)
      .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*(" \/>)/g, `$1${content.description}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${content.title} | ArteVital$2`);
    writeFileSync(resolve(folder, 'index.html'), page);
  }
}
