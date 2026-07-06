const CACHE_NAME = "neuropwa-unati-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",

  "./assets/img/capa-neuro.png",
  "./assets/img/fundo-neuro.png",
  "./assets/img/robo-neuro.png",
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
