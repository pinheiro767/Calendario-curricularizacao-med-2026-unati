const CACHE='neurogames-unati-v1';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./assets/capa-neurogames.png", "./assets/missao-neuro.png", "./assets/publico-alto.png", "./assets/robo-neuro.png", "./assets/publico-intermediario.png", "./assets/estacoes-rodizio.png", "./assets/publico-baixo.png", "./assets/acessibilidade.png", "./assets/sem-internet.png", "./assets/avaliacao-cruzada.png", "./assets/problema-tecnico.png", "./assets/correcao-tecnica.png", "./assets/missao-cumprida.png", "./assets/ensaio-equipe.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
