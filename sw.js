/* LPDG service worker — instalable + offline.
   Subí VERSION cuando cambien los assets para invalidar la caché. */
const VERSION = 'lpdg-v1';
const SHELL = [
  './', './index.html', './archivo.html', './styles.css', './manifest.webmanifest',
  './photos/logo-lpdg.svg', './photos/logo-lpdg.png', './photos/og-cover.png',
  './photos/icon-192.png', './photos/icon-512.png', './photos/apple-touch-icon.png',
  './photos/leon.jpeg', './photos/IMG-20250614-WA0026.jpg',
  './legacy/cumple-gianni.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navegación: red primero (el timer siempre fresco), caché como respaldo offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return r; })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Resto (CSS, imágenes, fuentes): caché primero, revalida en segundo plano.
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req)
        .then((r) => {
          if (r && r.status === 200) { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); }
          return r;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
