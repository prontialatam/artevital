import { business, sections, serviceImages, type Language, type SectionId } from '../content/site';
import { translations } from '../content/i18n';
import { casaContent } from '../content/casa';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);

const arrow = '<span class="arrow" aria-hidden="true">↗</span>';

const iconPaths: Record<SectionId, string> = {
  inicio: '<path d="m3 11 9-7 9 7v10H3z"/><path d="M9 21v-7h6v7"/>',
  peinados: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="m8 8 12 12M8 16 20 4"/>',
  maquillaje: '<path d="m4 20 12-12 4 4L8 24"/><path d="m14 6 3-3 4 4-3 3M3 5l1-2 1 2 2 1-2 1-1 2-1-2-2-1z"/>',
  faciales: '<path d="M12 20c-5-3-7-8-5-14 4 1 6 4 5 8 1-4 3-7 7-8 2 6 0 11-7 14Z"/><path d="M4 20h16"/>',
  'casa-de-campo': '<path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6M3 9l9-6 9 6"/>',
  nosotros: '<circle cx="12" cy="7" r="4"/><path d="M4 21c0-5 3-8 8-8s8 3 8 8"/>',
  opiniones: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
  contacto: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
};

function menuIcon(id: SectionId): string {
  return `<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[id]}</svg>`;
}

function brandIcon(kind: 'whatsapp' | 'instagram'): string {
  return `<span class="brand-icon brand-icon--${kind}" aria-hidden="true"><img src="/icons/${kind}.svg" width="18" height="18" alt="" /></span>`;
}

const shortcutPaths = {
  peinados: '<path d="M5 18c1-3 2-4 3-7 1-3 3-5 6-5 4 0 6 3 5 7-1 4-4 6-8 6H5Z"/><path d="M8 16c4-1 7-4 8-8M12 19c2-2 3-4 3-7"/>',
  maquillaje: '<path d="m5 19 9-9 4 4-9 9H5v-4ZM13 7l3-3 4 4-3 3M3 5l1-2 1 2 2 1-2 1-1 2-1-2-2-1Z"/>',
  faciales: '<path d="M12 20C7 17 5 12 7 6c4 1 6 4 5 8 1-4 3-7 7-8 2 6 0 11-7 14Z"/><path d="M5 21h14"/>',
  'casa-de-campo': '<path d="M4 20h16M7 20v-7l5-4 5 4v7M12 9V4M12 4c-3 0-5 1-7 3M12 4c3 0 5 1 7 3M12 4c-1 2-1 4 0 5"/>',
} as const;

function shortcutIcon(id: keyof typeof shortcutPaths): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shortcutPaths[id]}</svg>`;
}

function accentedTitle(title: string, accent: string): string {
  const start = title.toLocaleLowerCase().indexOf(accent.toLocaleLowerCase());
  if (start < 0) return escapeHtml(title);
  const end = start + accent.length;
  return `${escapeHtml(title.slice(0, start))}<em class="headline-accent">${escapeHtml(title.slice(start, end))}</em>${escapeHtml(title.slice(end))}`;
}

function bookingHref(lang: Language): string {
  const number = business.phoneE164.replace(/\D/g, '');
  return number && number.length >= 10 ? `https://wa.me/${number}?text=${encodeURIComponent(translations[lang].bookingMessage)}` : '#contacto';
}

export function CTA(label: string, href: string, variant: 'solid' | 'text' | 'light' = 'solid', external = false, icon?: 'whatsapp' | 'instagram'): string {
  return `<a class="cta cta--${variant}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${icon ? brandIcon(icon) : ''}<span>${escapeHtml(label)}</span>${arrow}</a>`;
}

export function LanguageSwitcher(lang: Language, compact = false): string {
  return `<div class="language-switcher${compact ? ' language-switcher--mobile' : ''}" aria-label="Language / Idioma"><a href="/es/" lang="es" data-language="es" ${lang === 'es' ? 'aria-current="true"' : ''}><span class="language-flag" aria-hidden="true">🇪🇸</span>ES</a><span aria-hidden="true">/</span><a href="/en/" lang="en" data-language="en" ${lang === 'en' ? 'aria-current="true"' : ''}><span class="language-flag" aria-hidden="true">🇺🇸</span>EN</a></div>`;
}

const navLinks = (lang: Language, mobile = false) => sections.filter((id) => id !== 'contacto').map((id) => `<a href="#${id}" data-nav="${id}"${id === 'inicio' ? ' aria-current="location"' : ''}${mobile ? ' class="mobile-nav__link"' : ''}>${escapeHtml(translations[lang].nav[id])}</a>`).join('');

export function MobileNav(lang: Language): string {
  const t = translations[lang];
  return `<nav class="mobile-nav" id="mobile-nav" aria-label="${lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'}" inert><div class="mobile-nav__links">${navLinks(lang, true)}</div><div class="mobile-nav__footer">${LanguageSwitcher(lang, true)}${CTA(t.booking, bookingHref(lang), 'solid', true, 'whatsapp')}</div></nav>`;
}

export function Header(lang: Language): string {
  const t = translations[lang];
  return `<a class="skip-link" href="#main">${escapeHtml(t.skip)}</a><header class="site-header" id="site-header"><div class="header-inner"><a class="brand" href="#inicio" aria-label="ArteVital — ${escapeHtml(t.nav.inicio)}"><img src="/images/artevital-logo-transparent.webp" width="2034" height="773" alt="ArteVital Studio and Esthetic by Jina Morales" /></a><nav class="desktop-nav" aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">${navLinks(lang)}</nav><div class="header-actions">${LanguageSwitcher(lang)}${CTA(t.booking, bookingHref(lang), 'solid', true, 'whatsapp')}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${escapeHtml(t.menu)}" data-open-label="${escapeHtml(t.menu)}" data-close-label="${escapeHtml(t.closeMenu)}"><span></span><span></span></button></div></div>${MobileNav(lang)}</header>`;
}

export function Hero(lang: Language): string {
  const t = translations[lang];
  return `<section class="hero" id="inicio" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${escapeHtml(t.hero.eyebrow)}</p><h1 id="hero-title">${accentedTitle(t.hero.first, t.hero.firstAccent)}<br />${accentedTitle(t.hero.second, t.hero.secondAccent)}</h1><p class="hero-lede">${escapeHtml(t.hero.body)}</p>${CTA(t.booking, bookingHref(lang), 'solid', true, 'whatsapp')}<div class="hero-shortcuts" aria-label="${lang === 'es' ? 'Explorar servicios' : 'Explore services'}">${(['peinados', 'maquillaje', 'faciales', 'casa-de-campo'] as const).map((id) => `<a href="#${id}"><span class="shortcut-icon">${shortcutIcon(id)}</span><span>${escapeHtml(t.nav[id])}</span></a>`).join('')}</div></div><div class="hero-visual"><img src="/images/hero-editorial.webp" width="1019" height="443" fetchpriority="high" alt="${escapeHtml(t.hero.imageAlt)}" /><div class="hero-visual__note">${escapeHtml(t.hero.imageNote)}</div></div></section>`;
}

export function ServiceSection(lang: Language, id: 'peinados' | 'maquillaje' | 'faciales', index: number): string {
  const t = translations[lang].services[id];
  const images = serviceImages[id];
  const previous = lang === 'es' ? `Imagen anterior de ${t.eyebrow}` : `Previous ${t.eyebrow} image`;
  const next = lang === 'es' ? `Imagen siguiente de ${t.eyebrow}` : `Next ${t.eyebrow} image`;
  return `<section class="service service--${id}${index % 2 ? ' service--reverse' : ''}" id="${id}" aria-labelledby="${id}-title"><div class="service-copy"><p class="eyebrow">${escapeHtml(t.eyebrow)}</p><h2 id="${id}-title">${accentedTitle(t.title, t.accent)}</h2><p>${escapeHtml(t.body)}</p>${CTA(t.action, bookingHref(lang), 'text', true, 'whatsapp')}</div><div class="service-visual"><div class="service-carousel" data-carousel aria-label="${escapeHtml(t.eyebrow)}"><div class="service-carousel__track">${images.map((image, imageIndex) => `<div class="service-carousel__slide"><img src="${image.src}" width="${image.width}" height="${image.height}" loading="lazy" alt="${escapeHtml(imageIndex === 0 ? t.alt : `${t.eyebrow} — ${imageIndex + 1}`)}" /></div>`).join('')}</div><div class="service-carousel__controls"><button type="button" class="carousel-arrow" data-carousel-prev aria-label="${escapeHtml(previous)}">←</button><span class="carousel-count" aria-live="polite">01 / 03</span><button type="button" class="carousel-arrow" data-carousel-next aria-label="${escapeHtml(next)}">→</button></div><div class="carousel-dots" aria-label="${escapeHtml(t.eyebrow)}">${images.map((_, imageIndex) => `<button type="button" data-carousel-dot="${imageIndex}" aria-label="${lang === 'es' ? 'Mostrar imagen' : 'Show image'} ${imageIndex + 1}" ${imageIndex === 0 ? 'aria-current="true"' : ''}></button>`).join('')}</div></div></div></section>`;
}

export function CasaDeCampo(lang: Language): string {
  const t = translations[lang].casa;
  const c = casaContent[lang];
  const mailIcon = '<svg class="casa-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>';
  const noteIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10l3 3v15H4V3h3Z"/><path d="M8 10h8M8 14h8M8 18h5"/></svg>';
  const planCard = (plan: (typeof c.bridalPlans)[number]) => `<article class="casa-plan"><div class="casa-plan__heading"><h4>${escapeHtml(plan.name)}</h4><div class="casa-plan__price"><strong>${escapeHtml(plan.price)}</strong>${plan.unit ? `<span>${escapeHtml(plan.unit)}</span>` : ''}</div></div><ul>${plan.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('')}</ul></article>`;
  const priceGroup = (group: (typeof c.priceGroups)[number]) => `<article class="casa-price-group"><h4>${escapeHtml(group.title)}</h4><div class="casa-price-group__items">${group.items.map((item) => `<div class="casa-price-row"><span>${escapeHtml(item.name)}</span><strong>${escapeHtml(item.price)}${item.unit ? `<small>${escapeHtml(item.unit)}</small>` : ''}</strong></div>`).join('')}</div></article>`;
  return `<section class="casa" id="casa-de-campo" aria-labelledby="casa-title"><div class="casa-hero"><div class="casa-visual"><img src="/images/casa-de-campo-boho-chic.webp" width="1672" height="941" loading="lazy" alt="${escapeHtml(t.imageAlt)}" /></div><div class="casa-copy"><p class="eyebrow">${escapeHtml(t.eyebrow)}</p><h2 id="casa-title">${accentedTitle(t.title, t.accent)}</h2><p>${escapeHtml(t.body)}</p><span class="casa-note">${escapeHtml(t.note)}</span></div></div><div class="casa-details"><div class="casa-intro"><div class="casa-intro__lead"><span class="casa-index">01 / ArteVital</span><h3>${escapeHtml(c.focusTitle)}</h3><p>${escapeHtml(c.focus)}</p></div><div class="casa-intro__body"><p>${escapeHtml(c.lead)}</p><ul class="casa-highlights">${c.extras.map((extra) => `<li><span aria-hidden="true">✦</span>${escapeHtml(extra)}</li>`).join('')}</ul><div class="casa-brands"><span>${escapeHtml(c.brandsLabel)}</span><p>${escapeHtml(c.brands)}</p></div></div></div><div class="casa-contact"><div><span class="casa-index">02 / ${escapeHtml(c.contactTitle)}</span><h3>${escapeHtml(c.contactTitle)}</h3><p>${escapeHtml(c.contactLead)}</p></div><div class="casa-contact__links"><a class="casa-contact__primary" href="${escapeHtml(bookingHref(lang))}" target="_blank" rel="noopener noreferrer">${brandIcon('whatsapp')}<span>${escapeHtml(c.whatsappLabel)}<small>${escapeHtml(business.whatsapp ?? '')}</small></span>${arrow}</a><div class="casa-contact__label">${mailIcon}${escapeHtml(c.emailLabel)}</div><a href="mailto:artevitallr@gmail.com">artevitallr@gmail.com</a><a href="mailto:jinamorales@live.com">jinamorales@live.com</a><div class="casa-contact__label">${brandIcon('instagram')}${escapeHtml(c.instagramLabel)}</div><a href="${escapeHtml(business.instagram)}" target="_blank" rel="noopener noreferrer">@artevitallr</a><a href="${escapeHtml(business.jinaInstagram)}" target="_blank" rel="noopener noreferrer">@jinamoralesmakeupartist</a></div></div><div class="casa-plans"><span class="casa-index">03 / ${escapeHtml(c.plansTitle)}</span><h3>${escapeHtml(c.plansTitle)}</h3><h4 class="casa-group-label">${escapeHtml(c.bridalTitle)}</h4><div class="casa-plans__grid casa-plans__grid--bridal">${c.bridalPlans.map(planCard).join('')}</div><h4 class="casa-group-label">${escapeHtml(c.eventsTitle)}</h4><div class="casa-plans__grid">${c.eventPlans.map(planCard).join('')}</div></div><div class="casa-prices"><div class="casa-prices__heading"><span class="casa-index">04 / ArteVital</span><h3>${escapeHtml(c.servicesTitle)}</h3><p>${escapeHtml(c.validity)}</p></div><div class="casa-prices__grid">${c.priceGroups.map(priceGroup).join('')}</div></div><div class="casa-notes-callout"><div><span class="casa-index">05 / ${escapeHtml(c.notesTitle)}</span><h3>${escapeHtml(c.notesTitle)}</h3><p>${escapeHtml(c.notesLead)}</p></div><button type="button" class="casa-notes-button" data-open-notes aria-haspopup="dialog" aria-controls="casa-notes">${noteIcon}<span>${escapeHtml(c.notesButton)}</span>${arrow}</button></div></div><dialog class="casa-notes-dialog" id="casa-notes" aria-labelledby="casa-notes-title"><div class="casa-notes-dialog__inner"><button type="button" class="casa-notes-dialog__close" data-close-notes aria-label="${escapeHtml(c.closeNotes)}">×</button><span class="casa-index">Casa de Campo / ArteVital</span><h2 id="casa-notes-title">${escapeHtml(c.notesTitle)}</h2><p>${escapeHtml(c.notesLead)}</p><ol>${c.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ol></div></dialog></section>`;
}

export function About(lang: Language): string {
  const t = translations[lang].about;
  return `<section class="about" id="nosotros" aria-labelledby="about-title"><figure class="about-photo"><img src="/images/jina-morales-enhanced.webp" width="1254" height="1254" loading="lazy" alt="${lang === 'es' ? 'Retrato de Jina Morales' : 'Portrait of Jina Morales'}" /></figure><div class="about-copy"><p class="eyebrow">${escapeHtml(t.eyebrow)}</p><h2 id="about-title">${accentedTitle(t.title, t.titleAccent)}</h2><p>${escapeHtml(t.body)}</p><img class="about-signature" src="/images/jina-signature-transparent.png" width="2172" height="724" loading="lazy" alt="${lang === 'es' ? 'Firma de Jina Morales' : 'Jina Morales signature'}" /><div class="about-actions"><button class="story-trigger" type="button" data-open-story aria-haspopup="dialog" aria-controls="jina-story"><span class="story-trigger__icon" aria-hidden="true">✧</span><span>${escapeHtml(t.storyToggle)}</span><span class="story-trigger__arrow" aria-hidden="true">↗</span></button>${CTA(t.instagramAction, business.jinaInstagram, 'text', true, 'instagram')}</div></div></section><dialog class="story-dialog" id="jina-story" aria-labelledby="story-title"><div class="story-dialog__inner"><button class="story-dialog__close" type="button" data-close-story aria-label="${escapeHtml(t.closeStory)}">×</button><div class="story-dialog__header"><span class="eyebrow">${escapeHtml(t.eyebrow)}</span><h2 id="story-title">${escapeHtml(t.storyTitle)}</h2><img src="/images/jina-signature-transparent.png" width="2172" height="724" alt="" /></div><div class="story-dialog__content">${t.storyParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div></div></dialog>`;
}

export function Reviews(lang: Language): string {
  const t = translations[lang].reviews;
  return `<section class="reviews" id="opiniones" aria-labelledby="reviews-title"><div><p class="eyebrow">${escapeHtml(t.eyebrow)}</p><h2 id="reviews-title">${accentedTitle(t.title, t.accent)}</h2></div><div class="reviews-message"><span class="reviews-mark" aria-hidden="true">✧</span><p>${escapeHtml(t.body)}</p>${CTA(t.action, business.googleReviews, 'text', true)}</div></section>`;
}

export function Contact(lang: Language): string {
  const t = translations[lang].contact;
  const extra = [
    business.hours ? `<span class="contact-details__extra">${escapeHtml(t.hoursLabel)}: ${escapeHtml(business.hours)}</span>` : '',
    business.email ? `<a class="contact-details__extra" href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)}</a>` : '',
    business.mapsUrl ? `<a class="contact-details__extra" href="${escapeHtml(business.mapsUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t.directions)} ${arrow}</a>` : '',
  ].join('');
  const phone = business.phoneE164;
  return `<section class="contact" id="contacto" aria-labelledby="contact-title"><div class="contact-copy"><p class="eyebrow">${escapeHtml(t.eyebrow)}</p><h2 id="contact-title">${accentedTitle(t.title, t.accent)}</h2><p>${escapeHtml(t.body)}</p><div class="contact-actions">${CTA(t.action, bookingHref(lang), 'light', true, 'whatsapp')}</div><p class="contact-note">${escapeHtml(t.note)}</p></div><div class="contact-details"><span class="contact-details__label">${escapeHtml(t.findUs)}</span><p>${escapeHtml(business.address ?? t.location)}</p><a class="contact-details__extra contact-details__phone" href="tel:${phone}">${escapeHtml(t.phoneLabel)}: ${escapeHtml(business.whatsapp ?? '')}</a>${extra}<a class="contact-details__instagram" href="${escapeHtml(business.instagram)}" target="_blank" rel="noopener noreferrer">${brandIcon('instagram')}@artevitallr</a></div></section>`;
}

export function Footer(lang: Language): string {
  const t = translations[lang];
  const year = new Date().getFullYear();
  return `<footer class="footer"><div class="footer-main"><div class="footer-brand"><div class="footer-logo-panel"><img src="/images/artevital-logo-transparent.webp" width="2034" height="773" alt="ArteVital Studio and Esthetic by Jina Morales" /></div><p>${escapeHtml(t.footer.tagline)}</p><span class="footer-script">${escapeHtml(t.hero.second)}</span></div><nav class="footer-links" aria-label="${escapeHtml(t.footer.explore)}"><p>${escapeHtml(t.footer.explore)}</p>${sections.filter((id) => id !== 'inicio').map((id: SectionId) => `<a href="#${id}">${menuIcon(id)}<span>${escapeHtml(t.nav[id])}</span></a>`).join('')}</nav><div class="footer-contact"><p>${escapeHtml(t.contact.findUs)}</p><span>${escapeHtml(business.address ?? t.contact.location)}</span><a href="tel:${business.phoneE164}">${escapeHtml(business.whatsapp ?? '')}</a><a href="${escapeHtml(business.mapsUrl ?? '#contacto')}" target="_blank" rel="noopener noreferrer">${menuIcon('contacto')}<span>${escapeHtml(t.contact.directions)}</span></a></div><div class="footer-social"><p>${escapeHtml(t.footer.follow)}</p><a href="${escapeHtml(business.instagram)}" target="_blank" rel="noopener noreferrer">${brandIcon('instagram')}<span>ArteVital Instagram</span></a><a href="${escapeHtml(business.jinaInstagram)}" target="_blank" rel="noopener noreferrer">${brandIcon('instagram')}<span>Jina Morales</span></a>${CTA(t.booking, bookingHref(lang), 'light', true, 'whatsapp')}${LanguageSwitcher(lang)}</div></div><div class="footer-bottom"><span>© ${year} ArteVital. ${escapeHtml(t.footer.rights)}</span><span>${escapeHtml(t.footer.provisional)}</span></div></footer>`;
}

export function renderPage(lang: Language): string {
  return `${Header(lang)}<main id="main">${Hero(lang)}${ServiceSection(lang, 'peinados', 0)}${ServiceSection(lang, 'maquillaje', 1)}${ServiceSection(lang, 'faciales', 2)}${CasaDeCampo(lang)}${About(lang)}${Reviews(lang)}${Contact(lang)}</main>${Footer(lang)}`;
}
