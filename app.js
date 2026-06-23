// --- LÓGICA INTERATIVA DO BOTÃO DE DICAS (ROBOT) ---
const tips = [
  "Dica: hoje o objetivo não é perfeição. É fazer o jogo abrir e funcionar no navegador diretamente no site da turma!",
  "Priorize fontes grandes e contrastantes. Lembra da acuidade visual na terceira idade?",
  "Evite layouts complexos. Menos cliques geram melhor engajamento cognitivo para o público 60+.",
  "O feedback visual imediato (cores verdes/vermelhas bem nítidas) ajuda no processamento de respostas.",
  "Use o botão de cópia dos prompts para agilizar o processo no celular ou tablet."
];

const newTipBtn = document.getElementById('newTip');
if (newTipBtn) {
  newTipBtn.addEventListener('click', function() {
    const robotTipEl = document.getElementById('robotTip');
    const currentTip = robotTipEl.innerText;
    let newTip = tips[Math.floor(Math.random() * tips.length)];
    while(newTip === currentTip) {
      newTip = tips[Math.floor(Math.random() * tips.length)];
    }
    robotTipEl.innerText = newTip;
  });
}

// --- FUNÇÃO DO BOTÃO COPIAR PROMPTS (COMPATÍVEL COM APPLE/IFRAME) ---
function copyText(textareaId, button) {
  const textarea = document.getElementById(textareaId);
  
  // Seleção de texto compatível com iOS
  textarea.select();
  textarea.setSelectionRange(0, 99999); 
  
  try {
    // Tenta usar a API moderna
    navigator.clipboard.writeText(textarea.value);
  } catch (err) {
    // Fallback para navegadores mais antigos ou restrições de iframe no Safari
    document.execCommand('copy');
  }
  
  // Feedback visual do botão
  const originalText = button.innerText;
  button.innerText = "Copiado! ✓";
  button.style.background = "var(--accent)";
  button.style.color = "white";
  
  setTimeout(() => {
    button.innerText = originalText;
    button.style.background = "rgba(255, 255, 255, 0.08)";
    button.style.color = "var(--text-main)";
  }, 2000);
}
