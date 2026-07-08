const state = JSON.parse(localStorage.getItem("ngs-state") || "{}");

const tabs = [
  ["inicio", "Início"],
  ["cronograma", "Cronograma"],
  ["github-conta", "Conta GitHub"],
  ["github-repo", "Repositório"],
  ["pastas", "Pastas"],
  ["imagens", "Imagens"],
  ["escolha-jogo", "Escolher jogo"],
  ["prompt-jogo", "Prompt IA"],
  ["sons", "Sons"],
  ["pwa", "PWA"],
  ["pages", "GitHub Pages"],
  ["testes", "Testes"],
  ["relatorio", "Relatório"],
  ["certificado", "Certificado"]
];

const imageData = [
  [
    "fundo-neuro.png",
    "Fundo geral do app",
    "1920x1080",
    "Crie um fundo horizontal 1920x1080 estilo anime fofo e tecnológico para app educativo de neuroanatomia, com bolhas, neurônios luminosos, azul, ciano, roxo e dourado suave, visual acolhedor para público 60+."
  ],
  [
    "robo-neuro.png",
    "Robô flutuante Neuro Guia",
    "PNG transparente",
    "Crie um robô assistente fofo e acadêmico chamado Neuro Guia, em PNG com fundo transparente, estilo anime 3D, simpático, com olhos azuis, detalhes ciano e roxo, adequado para idosos e estudantes."
  ],
  [
    "capa-neuro.png",
    "Capa inicial",
    "1024x1024",
    "Crie capa quadrada 1024x1024 para Semana 5 Mão na Massa, app PWA de games educativos para público 60+, estilo anime fofo, moderno, acessível, com robô Neuro Guia e elementos de GitHub, imagens, sons e PWA."
  ],
  [
    "memoria-neuro.png",
    "Card do jogo da memória",
    "1024x1024",
    "Crie imagem quadrada para jogo da memória de neuroanatomia, com cartas grandes, cérebro holográfico, pares de imagens, estilo anime fofo, azul, ciano, roxo e dourado suave."
  ],
  [
    "sudoku-neuro.png",
    "Card do sudoku",
    "1024x1024",
    "Crie imagem quadrada para sudoku neuroeducativo, números grandes, grade acessível, cérebro digital, estilo anime fofo e tecnológico para idosos 60+."
  ],
  [
    "cruzadas-neuro.png",
    "Card das palavras cruzadas",
    "1024x1024",
    "Crie imagem quadrada para palavras cruzadas de neuroanatomia, letras grandes, pistas visuais, cérebro luminoso, estilo anime fofo e acessível."
  ],
  [
    "quiz-neuro.png",
    "Card do quiz",
    "1024x1024",
    "Crie imagem quadrada para quiz de neuroanatomia, painel de perguntas, botões grandes, acerto e erro, cérebro holográfico, estilo anime fofo, visual premium."
  ],
  [
    "cartas-neuro.png",
    "Card das cartas educativas",
    "1024x1024",
    "Crie imagem quadrada para jogo de cartas educativas sobre neuroanatomia, cartas 3D, pistas, imagens e conceitos, estilo anime fofo e acessível."
  ],
  [
    "trofeu-neuro.png",
    "Tela de conclusão",
    "1024x1024",
    "Crie imagem quadrada de troféu de conclusão para oficina de PWA e games 60+, robô Neuro Guia comemorando, confetes, dourado suave, azul, ciano e roxo."
  ]
];

const games = [
  [
    "memoria",
    "Memória",
    "assets/img/memoria-neuro.png",
    "10 imagens diferentes, 20 cartas, pares, acertos e vitória."
  ],
  [
    "quiz",
    "Quiz",
    "assets/img/quiz-neuro.png",
    "5 a 10 perguntas, alternativas grandes, feedback e pontuação."
  ],
  [
    "sudoku",
    "Sudoku",
    "assets/img/sudoku-neuro.png",
    "Grade simples, números grandes, lógica e concentração."
  ],
  [
    "cruzadas",
    "Palavras Cruzadas",
    "assets/img/cruzadas-neuro.png",
    "Dicas curtas, letras grandes e vocabulário educativo."
  ],
  [
    "cartas",
    "Cartas Educativas",
    "assets/img/cartas-neuro.png",
    "Imagem, pista e conceito em cartas grandes."
  ],
  [
    "bolhas",
    "Bolhas",
    "assets/img/capa-neuro.png",
    "Bolhas grandes, respostas rápidas e sem pressão de tempo."
  ]
];

const som = {
  clique: el("somClique"),
  sucesso: el("somSucesso"),
  erro: el("somErro"),
  vitoria: el("somVitoria"),
  ambiente: el("somAmbiente")
};

let deferredPrompt = null;

function el(id) {
  return document.getElementById(id);
}

function save() {
  localStorage.setItem("ngs-state", JSON.stringify(state));
  updateProgress();
}

function play(audio) {
  try {
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = audio === som.ambiente ? 0.35 : 0.8;
    audio.play();
  } catch (e) {}
}

function openTab(id) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  const target = el(id);
  if (target) target.classList.add("active");

  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.id === id);
  });

  state.last = id;
  save();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  neuroFor(id);
}

function updateProgress() {
  const done = tabs.filter(([id]) => state[id]).length;
  const total = tabs.length - 1;
  const pct = Math.min(100, Math.round((done / total) * 100));

  if (el("progressFill")) {
    el("progressFill").style.width = pct + "%";
  }

  if (el("progressText")) {
    el("progressText").textContent = pct + "%";
  }

  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.classList.toggle("done", !!state[btn.dataset.id]);
  });
}

function initMenu() {
  const menu = el("menu");
  if (!menu) return;

  menu.innerHTML = tabs
    .map(([id, name]) => `<button class="navbtn" data-id="${id}">${name}</button>`)
    .join("");

  document.querySelectorAll(".navbtn").forEach(btn => {
    btn.onclick = () => {
      play(som.clique);
      openTab(btn.dataset.id);
    };
  });
}

function initImages() {
  const imageCards = el("imageCards");
  if (!imageCards) return;

  imageCards.innerHTML = imageData
    .map(([file, desc, size, prompt]) => {
      const promptId = "p-" + file.replace(/\W/g, "");

      return `
        <article class="card">
          <img src="assets/img/${file}" alt="${desc}">
          <h3>${file}</h3>
          <p><strong>Função:</strong> ${desc}</p>
          <p><strong>Tamanho:</strong> ${size}</p>
          <textarea readonly id="${promptId}">${prompt}</textarea>
          <button data-copy-target="${promptId}">📋 Copiar prompt</button>
        </article>
      `;
    })
    .join("");
}

function initGames() {
  const gameGrid = el("gameGrid");
  if (!gameGrid) return;

  gameGrid.innerHTML = games
    .map(([id, name, img, desc]) => {
      return `
        <article class="game-card">
          <img src="${img}" alt="${name}">
          <h3>${name}</h3>
          <p>${desc}</p>
          <button data-game="${id}">Escolhi ${name}</button>
        </article>
      `;
    })
    .join("");
}

function selectGame(id) {
  state.game = id;
  save();

  const prompt = window.NEURO_PROMPTS?.[id] || "";
  const promptOutput = el("promptOutput");

  if (promptOutput) {
    promptOutput.value = prompt || "Prompt não encontrado. Verifique o arquivo prompts.js.";
  }

  const tipoJogo = el("tipoJogo");

  if (tipoJogo) {
    const busca = id === "cruzadas" ? "cruz" : id;

    const option = [...tipoJogo.options].find(opt =>
      opt.textContent.toLowerCase().includes(busca)
    );

    if (option) tipoJogo.value = option.textContent;
  }

  play(som.sucesso);
  openTab("prompt-jogo");
}

function copyText(text) {
  if (!text) {
    play(som.erro);
    alert("Nada para copiar.");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        play(som.sucesso);
        alert("Copiado!");
      })
      .catch(() => {
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const temp = document.createElement("textarea");
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();

  try {
    document.execCommand("copy");
    play(som.sucesso);
    alert("Copiado!");
  } catch (e) {
    play(som.erro);
    alert("Não foi possível copiar automaticamente. Selecione e copie manualmente.");
  }

  document.body.removeChild(temp);
}

function neuroFor(id) {
  const mensagens = {
    inicio: "Hoje a meta é preparar o projeto. Não precisa programar o jogo inteiro agora.",
    cronograma: "O cronograma mostra o caminho até a entrega final. Hoje é preparação.",
    "github-conta": "Abra github.com, clique em Sign up e confirme o e-mail. Essa é a primeira tarefa prática.",
    "github-repo": "O repositório será a pasta online do grupo. Use nome simples, sem acentos.",
    pastas: "A imagem não fica dentro do HTML. O HTML aponta para assets/img/nome-da-imagem.png.",
    imagens: "Crie as imagens com os nomes exatos. Depois substitua os modelos mantendo os nomes.",
    "escolha-jogo": "Escolha apenas um jogo por grupo. O prompt muda conforme a escolha.",
    "prompt-jogo": "Copie o prompt e peça para a IA gerar o HTML do jogo escolhido.",
    sons: "Baixe sons curtos, renomeie e coloque na pasta assets/audio.",
    pwa: "O botão de instalação aparece quando o navegador reconhece o PWA.",
    pages: "Depois de ativar o Pages, aguarde alguns minutos antes de testar.",
    testes: "Teste em celular, tablet e computador. Tire prints para o relatório.",
    relatorio: "Clique em Neuro Guia preenche tudo. Depois revise e adicione os prints.",
    certificado: "Gere o certificado quando o grupo concluir as etapas principais."
  };

  const neuroText = el("neuroText");
  if (neuroText) {
    neuroText.textContent = mensagens[id] || "Estou aqui para ajudar.";
  }
}

function initEvents() {
  document.body.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    play(som.clique);

    if (button.dataset.goto) {
      openTab(button.dataset.goto);
    }

    if (button.dataset.done) {
      state[button.dataset.done] = true;
      save();
      play(som.sucesso);

      const index = tabs.findIndex(([id]) => id === button.dataset.done);
      if (tabs[index + 1]) openTab(tabs[index + 1][0]);
    }

    if (button.dataset.copy) {
      copyText(button.dataset.copy);
    }

    if (button.dataset.copyTarget) {
      const target = el(button.dataset.copyTarget);
      copyText(target?.value || "");
    }

    if (button.dataset.game) {
      selectGame(button.dataset.game);
    }

    if (button.dataset.action) {
      accessAction(button.dataset.action);
    }

    if (button.dataset.help) {
      help(button.dataset.help);
    }
  });

  const continueBtn = el("continueBtn");
  if (continueBtn) {
    continueBtn.onclick = () => openTab(state.last || "github-conta");
  }

  const neuroButton = el("neuroButton");
  const neuroPanel = el("neuroPanel");

  if (neuroButton && neuroPanel) {
    neuroButton.onclick = () => {
      neuroPanel.classList.toggle("active");
    };
  }

  const makeCertBtn = el("makeCert");
  if (makeCertBtn) {
    makeCertBtn.onclick = makeCert;
  }

  const btnInstall = el("btnInstall");
  const btnInstall2 = el("btnInstall2");

  if (btnInstall) btnInstall.onclick = installApp;
  if (btnInstall2) btnInstall2.onclick = installApp;

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;

    if (btnInstall) btnInstall.style.display = "inline-block";
  });
}

function accessAction(action) {
  if (action === "fontPlus") {
    let fontSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--font")
    );

    fontSize += 2;
    document.documentElement.style.setProperty("--font", fontSize + "px");
  }

  if (action === "fontMinus") {
    let fontSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--font")
    );

    fontSize = Math.max(16, fontSize - 2);
    document.documentElement.style.setProperty("--font", fontSize + "px");
  }

  if (action === "dark") {
    document.body.classList.toggle("dark");
  }

  if (action === "contrast") {
    document.body.classList.toggle("contrast");
  }

  if (action === "spacing") {
    document.body.classList.toggle("spacing");
  }

  if (action === "audio") {
    if (!som.ambiente) return;

    if (som.ambiente.paused) {
      som.ambiente.volume = 0.35;
      som.ambiente.play();
    } else {
      som.ambiente.pause();
    }
  }
}

function help(type) {
  const mensagens = {
    imagem: "Confira: a imagem está em assets/img? O nome está igual? No GitHub, maiúsculas e minúsculas fazem diferença.",
    som: "O som só toca depois de um clique. Confira se o arquivo está em assets/audio e se não está vazio.",
    pdf: "O PDF é gerado pelo arquivo relatorio.js. Se baixar dois PDFs, apague qualquer html2pdf ou downloadPdf do app.js.",
    github: "Se aparecer 404, aguarde, confira Settings > Pages > main > /root e veja se existe index.html."
  };

  const neuroText = el("neuroText");
  if (neuroText) {
    neuroText.textContent = mensagens[type] || "Estou aqui para ajudar.";
  }
}

function makeCert() {
  const nome = el("certName")?.value || "Grupo participante";
  const certPreview = el("certPreview");

  if (!certPreview) return;

  certPreview.innerHTML = `
    <h2>Certificado de Conclusão</h2>
    <p>
      Certificamos que <strong>${nome}</strong> concluiu a Semana 5 da Oficina
      Neuro Games Studio 60+, com organização do projeto PWA, GitHub, assets,
      acessibilidade e relatório científico.
    </p>
    <p>UNATI • UEM</p>
  `;

  play(som.vitoria);
}

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  } else {
    alert("Se o botão de instalação não aparecer, abra pelo GitHub Pages no Chrome/Edge e use “Adicionar à tela inicial”.");
  }
}

function initSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initImages();
  initGames();
  initEvents();
  updateProgress();
  openTab(state.last || "inicio");
  initSW();
});
