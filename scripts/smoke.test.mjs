import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(import.meta.dirname, '../dist');

test('both language routes contain crawlable content and the approved navigation', () => {
  const expectations = {
    es: ['lang="es"', 'Tu ', 'Peinados', 'Maquillaje', 'Faciales', 'Casa de Campo', 'Sobre mí', 'Opiniones', 'Leer mi presentación'],
    en: ['lang="en"', 'Your ', 'Hairstyling', 'Makeup', 'Facials', 'Casa de Campo', 'About me', 'Reviews', 'Read my story'],
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
    assert.equal((html.match(/data-carousel aria-label=/g) ?? []).length, 3, `${lang} should have three carousels`);
    assert.ok(html.includes('id="jina-story"'), `${lang} is missing Jina's dialog`);
    assert.ok(html.includes('id="casa-notes"'), `${lang} is missing Casa de Campo notes`);
    assert.ok(html.includes('artevitallr@gmail.com') && html.includes('jinamorales@live.com'), `${lang} is missing contact emails`);
    for (const price of ['US$531', 'US$413', 'US$295', 'US$236', 'US$212', 'US$177', 'US$94', 'US$59', 'US$35']) {
      assert.ok(html.includes(price), `${lang} is missing ${price}`);
    }
  }
});

test('required visual assets and entry points are built', () => {
  for (const path of ['index.html', 'robots.txt', 'images/artevital-logo-transparent.webp', 'images/jina-signature-transparent.png', 'images/jina-morales-enhanced.webp', 'icons/whatsapp.svg', 'icons/instagram.svg', 'images/hero-editorial.webp', 'images/hairstyles-editorial.webp', 'images/makeup-editorial.webp', 'images/facials-editorial.webp', 'images/casa-de-campo-boho-chic.webp', 'images/hairstyles-chignon.jpg', 'images/hairstyles-waves.jpg', 'images/makeup-bridal.jpg', 'images/makeup-evening.jpg', 'images/facials-mask.jpg', 'images/facials-glow.jpg']) {
    assert.ok(existsSync(resolve(dist, path)), `missing ${path}`);
  }
});
