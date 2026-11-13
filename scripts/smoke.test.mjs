import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '../dist');

test('both language routes contain crawlable content and the approved navigation', () => {
  const expectations = {
    es: ['lang="es"', 'Tu ', 'Peinados', 'Maquillaje', 'Faciales', 'Novias', 'Casa de Campo', 'Sobre mí', 'Opiniones', 'Leer mi presentación'],
    en: ['lang="en"', 'Your ', 'Hairstyling', 'Makeup', 'Facials', 'Bridal', 'Casa de Campo', 'About me', 'Reviews', 'Read my story'],
  };
  for (const [lang, words] of Object.entries(expectations)) {
    const html = readFileSync(resolve(dist, lang, 'index.html'), 'utf8');
    for (const word of words) assert.ok(html.includes(word), `${lang} missing ${word}`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${lang} should have one H1`);
    assert.ok(!html.includes('829 123 4567'), `${lang} contains a placeholder phone number`);
    assert.ok(html.includes('wa.me/18296691575'), `${lang} is missing the booking number`);
    assert.ok(html.includes('tel:+18296691575'), `${lang} is missing the call link`);
    assert.ok(html.includes('829-669-1575'), `${lang} is missing the displayed number`);
    assert.ok(!html.includes('809-936-6301') && !html.includes('18099366301'), `${lang} contains the old number`);
    assert.ok(html.includes('Plaza Buena Vista, Calle Los Robles'), `${lang} is missing the address`);
    assert.ok(html.includes('google.com/maps/place/Artevital'), `${lang} is missing the Google profile`);
    assert.ok(!/<nav class="desktop-nav"[^>]*>[\s\S]*?href="#contacto"/.test(html.split('</nav>')[0]), `${lang} header still has Contact`);
    assert.equal((html.match(/data-carousel aria-label=/g) ?? []).length, 5, `${lang} should have five carousels`);
    assert.ok(html.includes('id="jina-story"'), `${lang} is missing Jina's dialog`);
    assert.ok(html.includes('id="casa-notes"'), `${lang} is missing Casa de Campo notes`);
    assert.ok(html.includes('artevitalrd@gmail.com') && html.includes('jinamorales@live.com'), `${lang} is missing contact emails`);
    const bridal = html.match(/<section class="service service--novias[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.equal((bridal.match(/class="service-carousel__slide"/g) ?? []).length, 6, `${lang} must include all six bridal photos`);
    for (const price of ['US$531', 'US$413', 'US$295', 'US$236', 'US$212', 'US$177', 'US$94', 'US$59', 'US$35']) {
      assert.ok(html.includes(price), `${lang} is missing ${price}`);
    }
  }
});

test('required visual assets and entry points are built', () => {
  for (const path of ["index.html", "robots.txt", "images/artevital-logo-transparent.webp", "images/jina-morales-signature.png", "images/jina-01.webp", "icons/whatsapp.svg", "icons/instagram.svg", "images/hero-artevital.webp", "images/casa-de-campo-boho-chic.webp", "images/peinados-01.webp", "images/peinados-02.webp", "images/peinados-03.webp", "images/peinados-04.webp", "images/peinados-05.webp", "images/novias-01.webp", "images/novias-02.webp", "images/novias-03.webp", "images/novias-04.webp", "images/novias-05.webp", "images/novias-06.webp", "images/maquillaje-01.webp", "images/maquillaje-02.webp", "images/faciales-01.webp", "images/faciales-02.webp", "images/faciales-03.webp"]) {
    assert.ok(existsSync(resolve(dist, path)), `missing ${path}`);
  }
});


test('official domain, legal pages and deferred photo galleries are consistent', () => {
  for (const lang of ['es', 'en']) {
    const home = readFileSync(resolve(dist, lang, 'index.html'), 'utf8');
    const about = home.match(/<section class="about"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.equal((about.match(/class="service-carousel__slide"/g) ?? []).length, 5);
    assert.ok(about.includes('src="/images/jina-01.webp"'));
    assert.ok(!home.includes('jina-morales-enhanced'));
    assert.ok(!home.includes('onrender.com') && !home.includes('fonts.googleapis.com'));
    assert.ok(home.includes('srcset=') && home.includes('data-srcset='));
    const hero = home.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(!hero.includes('wa.me/'));
    assert.ok(hero.includes('fetchpriority="high"'));
    for (const route of ['aviso-legal', 'privacidad', 'cookies', 'reservas']) {
      const html = readFileSync(resolve(dist, lang, route, 'index.html'), 'utf8');
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
      assert.ok(html.includes(`rel="canonical" href="https://artevitalrd.com/${lang}/${route}/"`));
      assert.ok(home.includes(`href="/${lang}/${route}/"`));
      assert.ok(html.includes('Arte Vital by Jina Morales EIRL'));
      assert.ok(!html.includes('artevital.prontialatam.com'));
    }
  }
});
