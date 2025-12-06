const CACHE_NAME = 'praytimes-cache-v1';
const urlsToCache = [
    '/gps-test/',
    '/gps-test/index.html',
    '/gps-test/css/style.css',
    '/gps-test/js/app.js',
    '/gps-test/js/cities.js',
    '/gps-test/js/praytime.js',
    '/gps-test/manifest.json',
    '/gps-test/cities.csv' 
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
        .then(() => self.skipWaiting()) // فوراً SW جدید فعال شود
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim()); // کنترل همه تب‌ها را بگیرد
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});

