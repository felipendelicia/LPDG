# LPDG — Los pibes de Gerli

Sitio estático del grupo "Los pibes de Gerli" (GitHub: `felipendelicia/LPDG`). La portada cambia con el tiempo: la actual vive en `index.html`, las viejas quedan archivadas y navegables.

## Stack
HTML/CSS/JS vanilla, sin build ni dependencias. Cada página es **un solo archivo** con CSS y JS inline. Fuentes por Google Fonts (CDN). Imágenes en `photos/`.

## Comandos
No hay build/test/lint — es estático.
```bash
python3 -m http.server 8000   # previsualizar → http://localhost:8000
```
Deploy: push a `main` → GitHub Pages sirve la raíz `/` (https://felipendelicia.github.io/LPDG/).

## Convenciones
- **Una portada = un HTML self-contained** (CSS+JS inline, sin frameworks). Mantener ese patrón.
- Portada actual = `index.html` · galería = `archivo.html` · portadas viejas = `legacy/`.
- Toda imagen va en `photos/`. Desde `legacy/` se referencia `../photos/…`.
- **Portada nueva**: mover la actual a `legacy/` (arreglar rutas a `../photos/` + banner READ ONLY que vuelve a `../archivo.html`), escribir la nueva en `index.html`, y sumar una card en `archivo.html`.
- Español rioplatense en todo el texto visible.
- Commits sin atribución a Claude/Anthropic.

## Gotchas
- El timer de `index.html` cuenta hacia arriba desde un ancla fija: `ANCHOR = new Date('2026-06-20T19:00:00-03:00')` (última juntada). Para cambiar el origen, editar esa constante.
- `archivo.html` escala cada preview con JS (`--s = clientWidth/1140`); las cards usan `aspect-ratio:1140/780`. Respetarlo al agregar.
- Las animaciones de entrada usan `opacity:0` + `@keyframes`; para screenshots headless forzar `--force-prefers-reduced-motion` o sale en negro.
- `.superpowers/` está en `.gitignore`.
