const cacheName = 'app-v1';
const filesToCache=[
    './index.html',
    './app.webmanifest',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    './js/mat.js',
    './js/zxing-reader.js',
    './css/main.css',
    '.js/idb.js'
    //Firebase
    //'https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js',
    //'https://www.gstatic.com/firebasejs/7.3.0/firebase-auth.js',
    //'https://www.gstatic.com/firebasejs/7.3.0/firebase-firestore.js',
    //'./js/init-firebase.js',
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