const CACHE_NAME = "neuro-pwa-games-semana5-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/img/fundo-neuro.png",
  "./assets/img/robo-neuro.png",
  "./assets/img/capa-neuro.png",
  "./assets/img/memoria-neuro.png",
  "./assets/img/sudoku-neuro.png",
  "./assets/img/cruzadas-neuro.png",
  "./assets/img/quiz-neuro.png",
  "./assets/img/cartas-neuro.png",
  "./assets/img/trofeu-neuro.png",
  "./assets/audio/clique.mp3",
  "./assets/audio/sucesso.mp3",
  "./assets/audio/erro.mp3",
  "./assets/audio/vitoria.mp3",
  "./assets/audio/ambiente.mp3",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES).catch(() => undefined)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => undefined);
    return response;
  }).catch(() => caches.match("./index.html"))));
});
