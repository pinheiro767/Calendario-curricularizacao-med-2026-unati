const CACHE_NAME = 'semana5-pwa-corrigido-v1';
const FILES = [
 './','./index.html','./manifest.json','./sw.js',
 './assets/img/fundo-neuro.png','./assets/img/robo-neuro.png','./assets/img/capa-neuro.png','./assets/img/memoria-neuro.png','./assets/img/sudoku-neuro.png','./assets/img/cruzadas-neuro.png','./assets/img/quiz-neuro.png','./assets/img/cartas-neuro.png','./assets/img/trofeu-neuro.png',
 './assets/icons/icon-192.png','./assets/icons/icon-512.png',
 './assets/audio/clique.mp3','./assets/audio/sucesso.mp3','./assets/audio/erro.mp3','./assets/audio/vitoria.mp3','./assets/audio/ambiente.mp3'
];
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES).catch(()=>c.addAll(['./','./index.html','./manifest.json','./sw.js'])))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))); });
