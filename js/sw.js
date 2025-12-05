const CACHE_NAME = 'praytimes-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/cities.js'
    '/js/praytime.js',
    '/manifest.json'
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


