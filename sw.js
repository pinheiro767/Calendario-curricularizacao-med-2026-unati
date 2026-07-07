const CACHE='neuro-games-studio-60-v1';
const FILES=['./','./index.html','./style.css','./app.js','./relatorio.js','./prompts.js','./manifest.json','./assets/img/fundo-neuro.png','./assets/img/robo-neuro.png','./assets/img/capa-neuro.png','./assets/img/memoria-neuro.png','./assets/img/sudoku-neuro.png','./assets/img/cruzadas-neuro.png','./assets/img/quiz-neuro.png','./assets/img/cartas-neuro.png','./assets/img/trofeu-neuro.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))})
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))))})
