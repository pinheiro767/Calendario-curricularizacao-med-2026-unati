const CACHE_NAME = "semana5-pwa-games-60mais-v1";

const ARQUIVOS_CACHE = [
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

self.addEventListener("install", evento => {
  evento.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS_CACHE)));
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys().then(chaves => Promise.all(chaves.filter(chave => chave !== CACHE_NAME).map(chave => caches.delete(chave))))
  );
});

self.addEventListener("fetch", evento => {
  evento.respondWith(caches.match(evento.request).then(resposta => resposta || fetch(evento.request)));
});
