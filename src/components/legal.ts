import { Header, Footer } from './index';
import { legalContent, legalIdentity, type LegalRoute } from '../content/legal';
import type { Language } from '../content/site';

export function renderLegalPage(lang: Language, route: LegalRoute): string {
  const content = legalContent(lang, route);
  const navigation = (html: string) => html.replace(/href="#/g, `href="/${lang}/#`).replace(/href="\/(es|en)\/"/g, (_, locale: string) => `href="/${locale}/${route}/"`);
  return `${navigation(Header(lang))}<main id="main" class="legal-page"><p class="eyebrow">ArteVital · ${lang === 'es' ? 'Información legal' : 'Legal information'}</p><h1>${content.title}</h1><p class="legal-page__date">${lang === 'es' ? 'Actualizado el 12 de noviembre de 2026' : 'Updated 12 November 2026'} · ${legalIdentity.company}</p>${content.body}<p><a href="/${lang}/">${lang === 'es' ? 'Volver a ArteVital' : 'Back to ArteVital'}</a></p></main>${navigation(Footer(lang))}`;
}
