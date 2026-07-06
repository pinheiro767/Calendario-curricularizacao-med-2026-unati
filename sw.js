const CACHE_NAME='neuropwa-unati-v3';
const FILES=['./','./index.html','./manifest.json','./sw.js','./assets/img/capa-neuro.png','./assets/img/fundo-neuro.png','./assets/img/robo-neuro.png','./assets/img/memoria-neuro.png','./assets/img/sudoku-neuro.png','./assets/img/cruzadas-neuro.png','./assets/img/quiz-neuro.png','./assets/img/cartas-neuro.png','./assets/img/trofeu-neuro.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
