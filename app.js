const tips = [
  'Hoje o objetivo não é perfeição. É fazer o jogo abrir e funcionar no navegador.',
  'Salve o arquivo exatamente como index.html. Se salvar como .txt, o navegador não vai rodar como página.',
  'Teste no celular: uma pessoa idosa precisa conseguir ler sem aproximar demais a tela.',
  'Botão bom para pessoa idosa é grande, claro e com texto direto: Iniciar, Ajuda, Jogar Novamente.',
  'Se o código der erro, peça para a IA: corrija este HTML mantendo tudo em um único arquivo.',
  'Depois que funcionar, personalize: troque cores, perguntas, emojis, palavras e mensagens.',
  'A pergunta principal do teste é: a pessoa idosa entende o que deve fazer sem explicação longa?'
];
const tip = document.getElementById('robotTip');
document.getElementById('newTip')?.addEventListener('click', () => {
  tip.textContent = 'Dica: ' + tips[Math.floor(Math.random() * tips.length)];
});

document.querySelectorAll('.copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.parentElement.querySelector('textarea').value;
    try {
      await navigator.clipboard.writeText(text);
      const old = btn.textContent;
      btn.textContent = 'Copiado!';
      setTimeout(() => btn.textContent = old, 1400);
    } catch (e) {
      alert('Selecione o texto do prompt e copie manualmente.');
    }
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
