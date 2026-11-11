# Interacción y Experiencia de Usuario

La fuente canónica es `ieu-00-intro.adoc`. De ella se generan los apuntes completos y un único deck para impartir la presentación y los tres temas en cuatro sesiones de aproximadamente una hora. Los ficheros históricos se conservan como referencia.

## Preparación

Se necesita Node.js 24 y pnpm 10.

```sh
corepack enable
pnpm install
pnpm exec playwright install chromium --with-deps
```

## Generación

```sh
pnpm build           # apuntes y deck de clase, HTML y PDF
pnpm build:notes     # apuntes completos, HTML y PDF
pnpm build:slides    # apuntes enlazados y deck integrado, HTML y PDF
pnpm build:html      # genera el HTML y los recursos locales sin Chromium
```

Los resultados están en `dist/`: `apuntes.html` y `clase.html`, con sus PDF e índice. Copia todo ese directorio para conservar imágenes, lecturas y reveal.js; el HTML funciona sin CDN. Puede usarse `CHROME_PATH` para seleccionar un Chrome ya instalado.

La dinámica propuesta es compartir primero los apuntes y pedir una idea y una pregunta por tema. Las preguntas de discusión aparecen junto al concepto correspondiente; cada sesión termina con lecturas, herramientas y vídeos opcionales. La guía temporal propone 5 minutos de conexión, 15 de recorrido, 30 de discusión y 10 de síntesis.

El guión visual se mantiene en `scripts/slides.mjs` y su diseño en `scripts/slides.css`. Se utilizan diagramas, imágenes del repositorio y frases breves en un lienzo 1600 × 900 (16:9), con reveal.js 6.0.2.

Las notas de cada diapositiva contienen los bloques originales de los apuntes que corresponden a sus conceptos; el reparto se mantiene en `scripts/speaker-notes.mjs` y la generación comprueba que no se omite ningún bloque. Pulsa S para abrir las notas, Esc para la vista general y Ctrl+Shift+F para buscar.

Al modificar los apuntes, revisa también este guion editorial. Los vídeos requieren conexión y no se reproducen en PDF.

## Publicación

La publicación se gestiona en `dodero/dodero.github.io`, mediante `config/repositories.json` y su workflow `publish.yml`. El constructor debe ejecutar `pnpm install --frozen-lockfile`, instalar Chromium con `pnpm exec playwright install chromium --with-deps` y ejecutar `pnpm build`; publicar todo `dist/`. Los cambios de esta rama deben estar disponibles en el remoto antes de que el publicador pueda seleccionarla.

## Seguridad del generador PDF

Playwright está fijado en 1.65.0 y el lockfile fija las dependencias transitivas. Ejecuta `pnpm audit` antes de publicar y revisa los avisos de Chromium por separado: la auditoría de paquetes no analiza el navegador descargado. La revisión del 7 de noviembre de 2026 no detectó avisos en las 35 dependencias npm; esto no certifica ausencia de vulnerabilidades en Chromium 158.0.8127.18 (revisión 1254).

El generador activa el aislamiento de Chromium y bloquea las peticiones HTTP/HTTPS durante la impresión: usa recursos locales. Para usar Chrome estable instalado, ejecuta `CHROME_CHANNEL=chrome pnpm build`; también se admite `CHROME_PATH`. El proceso informa de la versión realmente utilizada. Solo si el entorno CI impide el aislamiento, puede usarse `CHROME_NO_SANDBOX=1` en un entorno efímero y con fuentes de confianza.

Actualizar Playwright exige regenerar el lockfile, reinstalar Chromium y repetir la generación y la revisión de avisos. Fuentes: https://github.com/microsoft/playwright/security/advisories y https://chromereleases.googleblog.com/.

Las imágenes descargadas y sus fuentes están inventariadas en `images/downloaded-sources.json`.

Los iconos de conceptos se dibujan como SVG de trazo uniforme en `scripts/slides.mjs` (mapa `conceptIcons`). El tema UX e inteligencia artificial no contiene diapositivas de ampliación. La fotografía de Sketchpad muestra a Ivan Sutherland usando el TX-2 hacia 1962–1963; fuente y crédito se registran junto al recurso y en la diapositiva ampliada.

Las referencias de cada slide se eligen por su contenido, sin limitar el nivel del encabezado. `anchors` y `referenceOverrides` en `scripts/slides.mjs` indican los destinos. La generación valida que todos existan. Los subencabezados de teoría permiten enlazar directamente a interfaces de usuario, aprendibilidad, disciplinas, teorías y affordances/feedback.

## HTML generado bajo control de versiones

Se versionan los HTML de `dist/` junto con `slides.css`, las imágenes y los recursos locales de reveal.js necesarios para abrirlos. Los PDF permanecen excluidos y se regeneran con pnpm. Después de cambiar el contenido o el diseño, ejecuta `pnpm build` y revisa también los cambios generados en `dist/` antes de incorporarlos a Git.

Los vídeos recomendados se sitúan al final de la sesión de su tema; las imágenes ampliables siguen usando navegación vertical nativa de reveal.js.
