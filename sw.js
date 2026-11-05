// Service worker de Nos Viciamos.
// Sirve la web desde la caché (rápida y sin conexión) y, a la vez, descarga la
// versión del servidor. Si algún archivo ha cambiado, avisa a la página para que
// muestre el mensaje de "Actualizar".
const CACHE = 'nosviciamos-v1';
const CORE = [
  '/',
  '/styles.css',
  '/app.js',
  '/games.js',
  '/favicon.svg',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/site.webmanifest',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// La página "/" se guarda siempre con la misma clave, aunque lleve ?parámetros
const keyFor = (req) => (req.mode === 'navigate' ? '/' : req);

async function notifyUpdate() {
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((c) => c.postMessage({ type: 'update' }));
}

async function refresh(req, cached) {
  const fresh = await fetch(req, { cache: 'no-store' });
  if (!fresh.ok) return fresh;
  const cache = await caches.open(CACHE);
  await cache.put(keyFor(req), fresh.clone());
  const version = (res) => res.headers.get('etag') || res.headers.get('last-modified');
  const before = cached && version(cached);
  const after = version(fresh);
  if (before && after && before !== after) notifyUpdate();
  return fresh;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  e.respondWith((async () => {
    const cached = await caches.match(keyFor(req), { ignoreSearch: true });
    const network = refresh(req, cached);
    if (cached) {
      e.waitUntil(network.catch(() => {}));
      return cached;
    }
    return network.catch(() => caches.match('/'));
  })());
});
