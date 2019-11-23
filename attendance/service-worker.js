const cacheName = 'app-v2';
const filesToCache=[
    './app.webmanifest',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://unpkg.com/@zxing/library@latest',
    './js/firebase-app.js',
    './js/firebase-auth.js',
    './js/firebase-database.js',
    './js/firebase-functions.js',
    './js/mat.js',
    './css/main.css',
    './js/idb.js',
    './js/codereader.js',
    './js/FABActions.js',
    './js/init-firebase.js',
    './js/firefunction.js',
    './index.html'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
  /* Serve cached content when offline */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });