// StashUI service worker: a durable, capped cache for the gallery's images and
// app shell, so revisits and back/forward paint cards instantly (even offline)
// instead of depending on the browser's shared HTTP cache, which evicts
// aggressively under pressure.
//
// - /previews/{lq,poster}/*?v=…  cache-first (content-versioned, never change)
// - /previews/*.jpg?v=…          cache-first (master posters, untiered clips)
// - /_next/static/*              cache-first (hashed build assets)
// - everything else, including the mp4 clips, goes straight to the network.
//   Video uses HTTP range requests, which the immutable HTTP cache already
//   serves well; replaying ranges from Cache Storage is fragile on Safari.

const VERSION = "v1";
const IMG = `stash-img-${VERSION}`;
const STATIC = `stash-static-${VERSION}`;
const LIMITS = { [IMG]: 3000, [STATIC]: 400 };

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([IMG, STATIC]);
      for (const k of await caches.keys()) {
        if (k.startsWith("stash-") && !keep.has(k)) await caches.delete(k);
      }
      await self.clients.claim();
    })(),
  );
});

function bucket(url) {
  if (url.origin !== self.location.origin) return null;
  const p = url.pathname;
  if (p.startsWith("/_next/static/")) return STATIC;
  if (p.startsWith("/previews/") && url.searchParams.has("v")) {
    if (/\.(webp|jpg)$/.test(p)) return IMG;
  }
  return null;
}

let trimming = false;
async function trim(name) {
  if (trimming) return;
  trimming = true;
  try {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    const extra = keys.length - LIMITS[name];
    // keys() is insertion-ordered: drop the oldest first
    for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
  } finally {
    trimming = false;
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || req.headers.has("range")) return;
  const name = bucket(new URL(req.url));
  if (!name) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(name);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok && res.type === "basic") {
        const copy = res.clone();
        event.waitUntil(cache.put(req, copy).then(() => trim(name)));
      }
      return res;
    })(),
  );
});
