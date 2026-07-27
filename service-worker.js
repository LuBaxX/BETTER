const CACHE_NAME = "better-v1";

const FILES_TO_CACHE = [
    "./",
    "./BETTER.html",
    "./BETTER.css",
    "./manifest.json",
    "./Icons/icon-192.png",
    "./Icons/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});