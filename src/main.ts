import './styles.css';

const header = document.querySelector<HTMLElement>('#site-header');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');

function setMenu(open: boolean): void {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', menuButton.dataset[open ? 'closeLabel' : 'openLabel'] ?? 'Menu');
  mobileNav.inert = !open;
  mobileNav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileNav?.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
window.addEventListener('resize', () => { if (window.innerWidth > 1050) setMenu(false); });

function updateHeader(): void { header?.classList.toggle('is-scrolled', window.scrollY > 24); }
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    if (link.dataset.nav === visible.target.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.5] });
document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));

document.querySelectorAll<HTMLAnchorElement>('[data-language]').forEach((link) => link.addEventListener('click', () => {
  localStorage.setItem('artevital-language', link.dataset.language ?? 'es');
  link.href = `${link.getAttribute('href')}${window.location.hash}`;
}));

const storyDialog = document.querySelector<HTMLDialogElement>('#jina-story');
document.querySelector<HTMLButtonElement>('[data-open-story]')?.addEventListener('click', () => {
  storyDialog?.showModal();
  document.body.classList.add('dialog-open');
  storyDialog?.querySelector('h2')?.classList.add('writing-title', 'is-written');
});
storyDialog?.querySelector<HTMLButtonElement>('[data-close-story]')?.addEventListener('click', () => storyDialog.close());
storyDialog?.addEventListener('click', (event) => { if (event.target === storyDialog) storyDialog.close(); });
storyDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

const notesDialog = document.querySelector<HTMLDialogElement>('#casa-notes');
document.querySelector<HTMLButtonElement>('[data-open-notes]')?.addEventListener('click', () => {
  notesDialog?.showModal();
  document.body.classList.add('dialog-open');
  notesDialog?.querySelector('h2')?.classList.add('writing-title', 'is-written');
});
notesDialog?.querySelector<HTMLButtonElement>('[data-close-notes]')?.addEventListener('click', () => notesDialog.close());
notesDialog?.addEventListener('click', (event) => { if (event.target === notesDialog) notesDialog.close(); });
notesDialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector<HTMLElement>('.service-carousel__track');
  const slides = carousel.querySelectorAll('.service-carousel__slide');
  const dots = carousel.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]');
  const count = carousel.querySelector<HTMLElement>('.carousel-count');
  if (!track || slides.length < 2) return;
  let active = 0;
  let touchStart = 0;
  const goTo = (index: number) => {
    active = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${active * 100}%)`;
    if (count) count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => goTo(active - 1));
  carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => goTo(active + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
  carousel.addEventListener('pointerdown', (event) => { if (event.pointerType === 'touch') touchStart = event.clientX; });
  carousel.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'touch' || !touchStart) return;
    const distance = event.clientX - touchStart;
    if (Math.abs(distance) > 40) goTo(active + (distance < 0 ? 1 : -1));
    touchStart = 0;
  });
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(() => {
      if (!document.hidden && !carousel.matches(':hover') && !carousel.matches(':focus-within')) goTo(active + 1);
    }, 5200);
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll<HTMLElement>('.service-copy, .service-visual, .casa-copy, .casa-intro, .casa-contact, .casa-plans, .casa-prices, .casa-notes-callout, .about-photo, .about-copy, .reviews > div, .contact > div, .footer-main > div, .footer-main > nav');
  const revealObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  revealTargets.forEach((target) => {
    target.classList.add('reveal');
    revealObserver.observe(target);
  });
  const titles = new Set(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, main h4'));
  titles.forEach((title) => title.classList.add('writing-title'));
  let titleFrame = 0;
  const showTitles = () => {
    titleFrame = 0;
    titles.forEach((title) => {
      const bounds = title.getBoundingClientRect();
      if (bounds.top < window.innerHeight * .9 && bounds.bottom > 0) {
        title.classList.add('is-written');
        titles.delete(title);
      }
    });
  };
  const scheduleTitles = () => { if (!titleFrame) titleFrame = window.requestAnimationFrame(showTitles); };
  window.addEventListener('scroll', scheduleTitles, { passive: true });
  window.addEventListener('resize', scheduleTitles);
  document.documentElement.classList.add('has-js');
  scheduleTitles();
}
