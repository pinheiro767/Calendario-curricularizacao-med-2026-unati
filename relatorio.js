const R = {
  get(id) {
    return document.getElementById(id)?.value?.trim() || "";
  },

  set(id, text) {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) el.value = text;
  },

  fill() {
    const tipo = R.get("tipoJogo") || "Memória";

    R.set("nomeJogo", `Neuro ${tipo} 60+`);

    R.set("introducao", `O desenvolvimento de jogos educativos digitais representa uma estratégia inovadora para promover aprendizagem ativa, inclusão digital e participação social. No contexto da curricularização da extensão, a criação de aplicativos em formato Progressive Web App (PWA) permite integrar conhecimentos acadêmicos, tecnologia, acessibilidade e demandas reais da comunidade. Neste projeto, o grupo desenvolveu um jogo educativo voltado ao público 60+, utilizando HTML, CSS e JavaScript, com recursos visuais, sonoros e interativos planejados para favorecer uma experiência simples, acolhedora e acessível.`);

    R.set("justificativa", `A atividade se relaciona à curricularização da extensão porque aproxima universidade e comunidade por meio da construção de materiais digitais acessíveis. Ao desenvolver um jogo voltado para pessoas idosas, os estudantes aplicam conhecimentos técnicos e pedagógicos em uma solução com potencial de estimular aprendizagem, inclusão digital, autonomia e participação social. A proposta também valoriza a acessibilidade e a linguagem simples como princípios fundamentais para o uso de tecnologias educacionais por diferentes públicos.`);

    R.set("objetivoGeral", `Desenvolver um jogo educativo acessível em formato PWA, voltado ao público 60+, utilizando HTML, CSS e JavaScript, com foco na promoção da aprendizagem, inclusão digital, acessibilidade e interação lúdica.`);

    R.set("objetivosEspecificos", `• Planejar um jogo educativo adequado ao público 60+.
• Organizar imagens, sons e ícones em estrutura de pastas compatível com PWA.
• Aplicar princípios de acessibilidade, usabilidade e linguagem simples.
• Utilizar recursos multimídia para favorecer engajamento e compreensão.
• Publicar o aplicativo por meio do GitHub Pages.
• Testar o funcionamento em celular, tablet e computador.
• Produzir relatório científico com evidências do desenvolvimento.`);

    R.set("conteudo", conteudoPorTipo(tipo));

    R.set("metodologiaDev", `O desenvolvimento iniciou-se com a escolha do tipo de jogo educativo e a definição do público-alvo. Em seguida, foram planejados os assets visuais, incluindo fundo, personagem, capa, cards do jogo e imagem de conclusão. Os arquivos foram organizados na estrutura assets/img, assets/audio e assets/icons. O aplicativo foi desenvolvido com HTML, CSS e JavaScript puro, sem backend, banco de dados ou frameworks, priorizando simplicidade para alunos iniciantes. Foram implementados layout responsivo, botões grandes, feedback visual, sons opcionais, controles de fonte, modo escuro, alto contraste, manifesto PWA e service worker. Após a organização do projeto, os arquivos foram preparados para publicação no GitHub Pages.`);

    R.set("metodologiaAplicacao", `A aplicação foi planejada para ocorrer em atividade extensionista com pessoas idosas participantes da UNATI. Inicialmente, os participantes recebem orientação verbal e visual sobre o objetivo do jogo. Em seguida, utilizam o aplicativo em dispositivo móvel, tablet ou computador, com acompanhamento dos estudantes. Durante a aplicação, são observados aspectos como compreensão das instruções, facilidade de navegação, legibilidade, interação com botões, percepção dos sons e uso dos recursos de acessibilidade. Ao final, os participantes podem relatar dificuldades, facilidades e sugestões de melhoria.`);

    R.set("recursosVisuais", `Foram utilizados fundo ilustrado personalizado, personagem Neuro Guia, capa da atividade, cards visuais do jogo, imagem de conclusão, botões grandes, elementos arredondados, cores em azul, ciano, roxo, branco e dourado suave, além de organização visual em estilo anime educativo e acolhedor.`);

    R.set("recursosSonoros", `Foram previstos sons curtos e opcionais: clique.mp3 para interação com botões, sucesso.mp3 para acertos, erro.mp3 para correções, vitoria.mp3 para conclusão da atividade e ambiente.mp3 como trilha opcional. Os sons foram planejados como apoio à experiência, sem serem obrigatórios para compreensão do jogo.`);

    R.set("acessibilidadeRel", `Foram incluídos recursos como aumento e redução de fonte, modo escuro, modo de alto contraste, botões ampliados, linguagem simples, instruções curtas, feedback visual, feedback sonoro opcional, textos alternativos nas imagens, compatibilidade com dispositivos móveis e integração com VLibras para apoio à tradução em Libras.`);

    R.set("resultados", `Espera-se que o jogo favoreça a aprendizagem de conteúdos específicos, estimule funções cognitivas, amplie a inclusão digital de pessoas idosas e fortaleça a relação entre universidade e comunidade. Também se espera que os estudantes desenvolvam competências relacionadas à programação, design acessível, planejamento extensionista, documentação científica e publicação de aplicações digitais.`);

    R.set("discussao", `A construção do PWA evidencia que tecnologias simples, quando bem planejadas, podem gerar experiências educativas significativas. O uso de HTML, CSS e JavaScript possibilita autonomia aos estudantes iniciantes, enquanto a preocupação com acessibilidade amplia o potencial de uso por pessoas idosas. A atividade também demonstra a importância de testar o aplicativo em diferentes dispositivos e de adequar linguagem, contraste, tamanho dos elementos e ritmo de interação às necessidades do público-alvo.`);

    R.set("dificuldades", `Durante o desenvolvimento, podem ocorrer dificuldades relacionadas à organização das pastas, caminhos das imagens, funcionamento dos sons, criação da conta no GitHub, publicação no GitHub Pages, responsividade e geração do PDF.`);

    R.set("solucoes", `As soluções incluem conferência dos nomes dos arquivos, uso de letras minúsculas, organização correta da pasta assets, testes em diferentes dispositivos, revisão do código, utilização de checklist, apoio do Neuro Guia e validação do link publicado no GitHub Pages.`);

    R.set("conclusao", `A atividade permitiu integrar tecnologia, educação, extensão universitária e acessibilidade na construção de uma solução digital voltada ao público 60+. O desenvolvimento do jogo favoreceu a aplicação prática de conhecimentos de programação, design, organização de arquivos, publicação web e documentação científica. A proposta contribui para a formação dos estudantes e para a criação de materiais digitais inclusivos, aplicáveis em ações extensionistas com pessoas idosas.`);

    R.set("referencias", `BRASIL. Lei Brasileira de Inclusão da Pessoa com Deficiência.
BRASIL. Política Nacional de Extensão Universitária.
W3C. Web Content Accessibility Guidelines — WCAG.
MOZILLA DEVELOPER NETWORK. Progressive Web Apps.
GITHUB DOCS. GitHub Pages Documentation.`);
  },

  async build() {
    const prints = document.getElementById("prints")?.files || [];

    let imagensHTML = "";

    for (const [i, file] of Array.from(prints).entries()) {
      const src = await fileToDataURL(file);

      imagensHTML += `
        <div class="print-page">
          <h2>Print ${i + 1}</h2>
          <img src="${src}" alt="Print enviado ${i + 1}">
          <p class="legenda">Figura ${i + 1}. Evidência do desenvolvimento, publicação ou teste do aplicativo.</p>
        </div>
      `;
    }

    const secoes = [
      ["introducao", "2. Introdução"],
      ["justificativa", "3. Justificativa extensionista"],
      ["objetivoGeral", "4. Objetivo geral"],
      ["objetivosEspecificos", "5. Objetivos específicos"],
      ["conteudo", "6. Conteúdo abordado"],
      ["metodologiaDev", "7. Metodologia de desenvolvimento"],
      ["metodologiaAplicacao", "8. Metodologia de aplicação com o público 60+"],
      ["recursosVisuais", "9. Recursos visuais"],
      ["recursosSonoros", "10. Recursos sonoros"],
      ["acessibilidadeRel", "11. Recursos de acessibilidade"],
      ["resultados", "12. Resultados esperados"],
      ["discussao", "13. Discussão"],
      ["dificuldades", "14. Dificuldades encontradas"],
      ["solucoes", "15. Soluções adotadas"],
      ["conclusao", "16. Conclusão"],
      ["referencias", "17. Referências"]
    ];

    const corpo = secoes.map(([id, titulo]) => {
      return `
        <section class="pdf-section">
          <h2>${titulo}</h2>
          <p>${formatarTexto(R.get(id) || "Não informado.")}</p>
        </section>
      `;
    }).join("");

    return `
      <div class="cover">
        <h1>Relatório Científico</h1>
        <h2>Neuro Games Studio 60+</h2>
        <p><strong>Grupo:</strong> ${escapeHTML(R.get("grupo") || "Não informado")}</p>
        <p><strong>Integrantes:</strong> ${escapeHTML(R.get("integrantes") || "Não informado")}</p>
        <p><strong>Jogo:</strong> ${escapeHTML(R.get("nomeJogo") || "Não informado")}</p>
        <p><strong>Tipo:</strong> ${escapeHTML(R.get("tipoJogo") || "Não informado")}</p>
        <p><strong>GitHub Pages:</strong> ${escapeHTML(R.get("linkGithub") || "Não informado")}</p>
      </div>

      <section class="pdf-section">
        <h2>1. Identificação</h2>
        <p>Este documento registra o planejamento, desenvolvimento, publicação e avaliação inicial do jogo educativo criado na oficina.</p>
      </section>

      ${corpo}

      <section class="pdf-section">
        <h2>18. Evidências com imagens</h2>
        ${prints.length ? imagensHTML : "<p>Nenhuma imagem foi enviada.</p>"}
      </section>
    `;
  }
};

function conteudoPorTipo(tipo) {
  tipo = tipo.toLowerCase();

  if (tipo.includes("quiz")) {
    return "Foram abordados conceitos introdutórios de neuroanatomia, incluindo estrutura cerebral, neurônios, sinapses, sistema nervoso central e periférico, memória, aprendizagem e funções cerebrais básicas.";
  }

  if (tipo.includes("sudoku")) {
    return "Foram trabalhados raciocínio lógico, organização espacial, atenção, concentração e resolução de problemas, competências relevantes para estimulação cognitiva em pessoas idosas.";
  }

  if (tipo.includes("cruz")) {
    return "Foram trabalhados vocabulário, memória semântica, associação de conceitos e revisão de termos relacionados aos conteúdos educativos propostos.";
  }

  if (tipo.includes("carta")) {
    return "Foram trabalhadas associações entre imagens, pistas e conceitos, favorecendo reconhecimento visual, memória e compreensão de conteúdos básicos.";
  }

  if (tipo.includes("bolha")) {
    return "Foram trabalhadas atenção visual, coordenação motora, reconhecimento de estímulos e resposta interativa sem pressão obrigatória de tempo.";
  }

  return "Foram trabalhados processos de memória visual, associação de imagens, reconhecimento de padrões e recuperação de informações, estimulando funções cognitivas relevantes para o envelhecimento saudável.";
}

function fileToDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function escapeHTML(texto) {
  return String(texto).replace(/[&<>'"]/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[caractere]));
}

function formatarTexto(texto) {
  return escapeHTML(texto).replace(/\n/g, "<br>");
}

async function gerarPreviewRelatorio() {
  const html = await R.build();

  document.getElementById("reportPreview").innerHTML = `
    <div class="paper">
      ${html}
    </div>
  `;
}

async function esperarImagens(elemento) {
  const imagens = elemento.querySelectorAll("img");

  const promessas = Array.from(imagens).map(img => {
    if (img.complete) return Promise.resolve();

    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  return Promise.all(promessas);
}

document.addEventListener("DOMContentLoaded", () => {
  const fillReport = document.getElementById("fillReport");
  const previewReport = document.getElementById("previewReport");
  const downloadPdf = document.getElementById("downloadPdf");
  const clearReport = document.getElementById("clearReport");

  if (fillReport) {
    fillReport.addEventListener("click", () => {
      R.fill();
      alert("Neuro Guia preencheu o relatório. Revise antes de baixar.");
    });
  }

  if (previewReport) {
    previewReport.addEventListener("click", async () => {
      await gerarPreviewRelatorio();
    });
  }

  if (downloadPdf) {
    downloadPdf.addEventListener("click", async () => {
      await gerarPreviewRelatorio();

      const elemento = document.querySelector("#reportPreview .paper");

      if (!elemento) {
        alert("Não foi possível gerar o relatório.");
        return;
      }

      await esperarImagens(elemento);

      const opcoes = {
        margin: [8, 8, 8, 8],
        filename: "relatorio-semana5-pwa-games-60mais.pdf",
        image: {
          type: "jpeg",
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollY: 0
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: [".pdf-section", ".print-page"]
        }
      };

      html2pdf()
        .set(opcoes)
        .from(elemento)
        .save();
    });
  }

  if (clearReport) {
    clearReport.addEventListener("click", () => {
      document.querySelectorAll("#reportForm input, #reportForm textarea, #reportForm select").forEach(el => {
        if (el.type !== "file") el.value = "";
      });

      const prints = document.getElementById("prints");
      if (prints) prints.value = "";

      document.getElementById("reportPreview").innerHTML = "";
    });
  }
});
