# LPDG — Los pibes de Gerli

Sitio estático del grupo "Los pibes de Gerli" (GitHub: `felipendelicia/LPDG`). La portada cambia con el tiempo: la actual vive en `index.html`, las viejas quedan archivadas y navegables.

## Stack
HTML/CSS/JS vanilla, sin build ni dependencias. `index.html` y `archivo.html` linkean `styles.css` (sistema visual compartido) y agregan su CSS de layout + JS inline. Fuentes por Google Fonts (CDN). Imágenes en `photos/`.

## Comandos
No hay build/test/lint — es estático.
```bash
python3 -m http.server 8000   # previsualizar → http://localhost:8000
```
Deploy: push a `main` → GitHub Pages sirve la raíz `/` (https://felipendelicia.github.io/LPDG/).

## Convenciones
- **Estética: under tipo Under Club** (underclub.com.ar) — negro puro, alto contraste, tipografía bold mayúscula enorme y apretada, acento **violeta** (`--violet`) con corchetes en "L", grano tipo foto B/N, brutalista/editorial. Fuentes: `Syne` (display/UI/timer) + `Instrument Serif` itálica (citas). La letra siempre **legible** (nada de spray/distress).
- **Sistema visual en `styles.css`** (raíz): tokens de color (CSS vars), fuentes, y primitivas (`.nav`, `.btn`, `.toast`, `.eyebrow`, `.bracket`, `.reveal`, grano). Las páginas lo linkean y solo agregan su CSS específico. NO duplicar tokens ni colores en cada página. `legacy/` NO usa `styles.css` (snapshots autocontenidos con identidad propia).
- Portada actual = `index.html` · galería = `archivo.html` · portadas viejas = `legacy/`.
- Toda imagen va en `photos/`. Desde `legacy/` se referencia `../photos/…`.
- Logo de marca: `photos/logo-lpdg.svg` (wordmark "Lpdg" en Cedarville Cursive **vectorizado a paths**, color `--accent`) + `photos/logo-lpdg.png` (raster transparente). Usado como favicon. Regenerable con fontTools desde el TTF de Cedarville Cursive (gstatic).
- **Portada nueva**: mover la actual a `legacy/` (arreglar rutas a `../photos/` + banner READ ONLY que vuelve a `../archivo.html`), escribir la nueva en `index.html`, y sumar una card en `archivo.html`.
- Español rioplatense en todo el texto visible.
- Commits sin atribución a Claude/Anthropic.

## Gotchas
- El timer de `index.html` cuenta hacia arriba desde un ancla fija: `ANCHOR = new Date('2026-06-20T19:00:00-03:00')` (última juntada). Para cambiar el origen, editar esa constante.
- `archivo.html` escala cada preview con JS (`--s = clientWidth/1140`); las cards usan `aspect-ratio:1140/780`. Respetarlo al agregar.
- Reveal on scroll: las secciones `.reveal` se ocultan **solo** si `<html class="js">` (sin JS quedan visibles) y aparecen con IntersectionObserver. Para screenshots headless forzar `--force-prefers-reduced-motion` (las muestra ya visibles) o sale en negro.
- `.superpowers/` está en `.gitignore`.
