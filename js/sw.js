const CACHE_NAME = 'praytimes-cache-v1';
const urlsToCache = [
    '/gps-test/',                // start page
    '/gps-test/index.html',
    '/gps-test/css/style.css',
    '/gps-test/js/app.js',
    '/gps-test/js/cities.js',
    '/gps-test/js/praytime.js',
    '/gps-test/manifest.json'
];

// کش کردن فایل‌ها هنگام نصب SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// پاسخ به درخواست‌ها از کش
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});





