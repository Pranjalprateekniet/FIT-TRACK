// Safe service worker - does not block any network requests
// Avoids caching issues with development environments (Live Server / HTTP)

const CACHE_NAME = 'fittrack-v1';

self.addEventListener('install', event => {
  // Skip waiting so the new SW activates immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Pass-through fetch: always go to network, never block requests
// This prevents a broken cache from stopping Supabase API calls
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
