# ArteVital web

Sitio estático bilingüe (ES/EN), publicado en https://artevital.prontialatam.com/.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+ y pnpm. Desde esta carpeta:

```bash
pnpm install
pnpm dev
```

Abrir `/es/` o `/en/`. Para verificar la versión de producción:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test
```

`dist/` es la salida local del build. `docs/` contiene la versión publicada por GitHub Pages desde la rama `main`; incluye el dominio personalizado en `docs/CNAME`. Para actualizar la web, ejecutar `SITE_URL=https://artevital.prontialatam.com pnpm build`, copiar el contenido de `dist/` a `docs/` y conservar `docs/CNAME` y `docs/.nojekyll` antes de subir los cambios a GitHub.

## Editar contenido

- `src/content/i18n.ts`: textos de ambas lenguas.
- `src/content/site.ts`: identidad, enlaces y datos del negocio. Los campos `null` no están verificados y no se muestran.
- `src/styles.css`: colores, tipografía y diseño.
- `src/components/index.ts`: secciones y navegación.
- `scripts/prepare_images.py`: prepara recortes WebP a partir de las dos maquetas suministradas.

El logo transparente procede del archivo oficial aportado. La foto de Jina es una mejora de la fotografía enviada y su firma procede del archivo adjunto. El hero y las imágenes de servicios siguen siendo recortes **editoriales provisionales** de las maquetas; no muestran necesariamente clientas ni trabajos reales. Sustituirlas por fotografías autorizadas o licenciadas cuando estén disponibles.

## Datos pendientes de confirmar

- Fotografías autorizadas de servicios, instalaciones y trabajos; permiso de uso de imágenes.
- Horario y correo, si se desean mostrar.
- Catálogo de servicios, duraciones y precios confirmados.
- Opiniones reales con permiso, si se desean mostrar dentro de la web. Actualmente se enlaza al perfil de Google facilitado.
- Si se usa analítica, IDs y mecanismo de consentimiento.

«Reservar cita» abre WhatsApp con el número facilitado y un mensaje prellenado según el idioma. No hay agenda ni formulario. No se cargan cookies de analítica.
