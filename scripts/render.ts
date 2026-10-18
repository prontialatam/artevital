import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
