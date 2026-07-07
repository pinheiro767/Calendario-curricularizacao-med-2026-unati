const CACHE_NAME = "semana5-pwa-games-60mais-v1";

const ARQUIVOS_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./assets/img/capa1.png",
  "./assets/img/capa2.png",
  "./assets/img/capa3.png",
  "./assets/img/capa4.png",
  "./assets/img/capa5.png",
  "./assets/img/capa6.png",
  "./assets/img/capa7.png",
  "./assets/img/capa8.png",
  "./assets/img/capa9.png",
  "./assets/img/capa10.png",

  "./assets/audio/clique.mp3",
  "./assets/audio/sucesso.mp3",
  "./assets/audio/erro.mp3",
  "./assets/audio/vitoria.mp3",
  "./assets/audio/ambiente.mp3",

  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS_CACHE))
  );
});

self.addEventListener("activate", evento => {
  evento.waitUntil(
    caches.keys().then(chaves => {
      return Promise.all(
        chaves
          .filter(chave => chave !== CACHE_NAME)
          .map(chave => caches.delete(chave))
      );
    })
  );
});

self.addEventListener("fetch", evento => {
  evento.respondWith(
    caches.match(evento.request).then(resposta => {
      return resposta || fetch(evento.request);
    })
  );
});