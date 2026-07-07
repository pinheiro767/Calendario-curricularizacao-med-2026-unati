const state=JSON.parse(localStorage.getItem('ngs-state')||'{}');
const tabs=[['inicio','Início'],['cronograma','Cronograma'],['github-conta','Conta GitHub'],['github-repo','Repositório'],['pastas','Pastas'],['imagens','Imagens'],['escolha-jogo','Escolher jogo'],['prompt-jogo','Prompt IA'],['sons','Sons'],['pwa','PWA'],['pages','GitHub Pages'],['testes','Testes'],['relatorio','Relatório'],['certificado','Certificado']];
const imageData=[
 ['fundo-neuro.png','Fundo geral do app','1920x1080','Crie um fundo horizontal 1920x1080 estilo anime fofo e tecnológico para app educativo de neuroanatomia, com bolhas, neurônios luminosos, azul, ciano, roxo e dourado suave, visual acolhedor para público 60+.'],
 ['robo-neuro.png','Robô flutuante Neuro Guia','PNG transparente','Crie um robô assistente fofo e acadêmico chamado Neuro Guia, em PNG com fundo transparente, estilo anime 3D, simpático, com olhos azuis, detalhes ciano e roxo, adequado para idosos e estudantes.'],
 ['capa-neuro.png','Capa inicial','1024x1024','Crie capa quadrada 1024x1024 para Semana 5 Mão na Massa, app PWA de games educativos para público 60+, estilo anime fofo, moderno, acessível, com robô Neuro Guia e elementos de GitHub, imagens, sons e PWA.'],
 ['memoria-neuro.png','Card do jogo da memória','1024x1024','Crie imagem quadrada para jogo da memória de neuroanatomia, com cartas grandes, cérebro holográfico, pares de imagens, estilo anime fofo, azul, ciano, roxo e dourado suave.'],
 ['sudoku-neuro.png','Card do sudoku','1024x1024','Crie imagem quadrada para sudoku neuroeducativo, números grandes, grade acessível, cérebro digital, estilo anime fofo e tecnológico para idosos 60+.'],
 ['cruzadas-neuro.png','Card das palavras cruzadas','1024x1024','Crie imagem quadrada para palavras cruzadas de neuroanatomia, letras grandes, pistas visuais, cérebro luminoso, estilo anime fofo e acessível.'],
 ['quiz-neuro.png','Card do quiz','1024x1024','Crie imagem quadrada para quiz de neuroanatomia, painel de perguntas, botões grandes, acerto e erro, cérebro holográfico, estilo anime fofo, visual premium.'],
 ['cartas-neuro.png','Card das cartas educativas','1024x1024','Crie imagem quadrada para jogo de cartas educativas sobre neuroanatomia, cartas 3D, pistas, imagens e conceitos, estilo anime fofo e acessível.'],
 ['trofeu-neuro.png','Tela de conclusão','1024x1024','Crie imagem quadrada de troféu de conclusão para oficina de PWA e games 60+, robô Neuro Guia comemorando, confetes, dourado suave, azul, ciano e roxo.']
];
const games=[
 ['memoria','Memória','assets/img/memoria-neuro.png','10 imagens diferentes, 20 cartas, pares, acertos e vitória.'],
 ['quiz','Quiz','assets/img/quiz-neuro.png','5 a 10 perguntas, alternativas grandes, feedback e pontuação.'],
 ['sudoku','Sudoku','assets/img/sudoku-neuro.png','Grade simples, números grandes, lógica e concentração.'],
 ['cruzadas','Palavras Cruzadas','assets/img/cruzadas-neuro.png','Dicas curtas, letras grandes e vocabulário educativo.'],
 ['cartas','Cartas Educativas','assets/img/cartas-neuro.png','Imagem, pista e conceito em cartas grandes.'],
 ['bolhas','Bolhas','assets/img/capa-neuro.png','Bolhas grandes, respostas rápidas e sem pressão de tempo.']
];
const som={clique:el('somClique'),sucesso:el('somSucesso'),erro:el('somErro'),vitoria:el('somVitoria'),ambiente:el('somAmbiente')};
let deferredPrompt=null;
function el(id){return document.getElementById(id)}
function save(){localStorage.setItem('ngs-state',JSON.stringify(state));updateProgress()}
function play(a){try{if(a){a.currentTime=0;a.volume=a===som.ambiente?.35:.8;a.play()}}catch(e){}}
function openTab(id){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el(id)?.classList.add('active');document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.id===id));state.last=id;save();window.scrollTo({top:0,behavior:'smooth'});neuroFor(id)}
function updateProgress(){const done=tabs.filter(([id])=>state[id]).length;const pct=Math.round(done/(tabs.length-1)*100);el('progressFill').style.width=Math.min(100,pct)+'%';el('progressText').textContent=Math.min(100,pct)+'%';document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('done',!!state[b.dataset.id]))}
function initMenu(){el('menu').innerHTML=tabs.map(([id,name])=>`<button class="navbtn" data-id="${id}">${name}</button>`).join('');document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>{play(som.clique);openTab(b.dataset.id)})}
function initImages(){el('imageCards').innerHTML=imageData.map(([file,desc,size,prompt])=>`<article class="card"><img src="assets/img/${file}" alt="${desc}"><h3>${file}</h3><p><strong>Função:</strong> ${desc}</p><p><strong>Tamanho:</strong> ${size}</p><textarea readonly id="p-${file.replace(/\W/g,'')}">${prompt}</textarea><button data-copy-target="p-${file.replace(/\W/g,'')}">📋 Copiar prompt</button></article>`).join('')}
function initGames(){el('gameGrid').innerHTML=games.map(([id,name,img,desc])=>`<article class="game-card"><img src="${img}" alt="${name}"><h3>${name}</h3><p>${desc}</p><button data-game="${id}">Escolhi ${name}</button></article>`).join('')}
function selectGame(id){state.game=id;save();const prompt=window.NEURO_PROMPTS[id]||'';el('promptOutput').value=prompt;const opt=[...el('tipoJogo').options].find(o=>o.textContent.toLowerCase().includes(id==='cruzadas'?'cruz':id)); if(opt) el('tipoJogo').value=opt.textContent; play(som.sucesso); openTab('prompt-jogo')}
function copyText(text){navigator.clipboard?.writeText(text).then(()=>{play(som.sucesso);alert('Copiado!')}).catch(()=>{play(som.erro);alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.')})}
function neuroFor(id){const msg={
'inicio':'Hoje a meta é preparar o projeto. Não precisa programar o jogo inteiro amanhã.',
'github-conta':'Abra github.com, clique em Sign up e confirme o e-mail. Essa é a primeira tarefa prática.',
'github-repo':'O repositório será a pasta online do grupo. Use nome simples, sem acentos.',
'pastas':'A imagem não fica dentro do HTML. O HTML aponta para assets/img/nome-da-imagem.png.',
'imagens':'Crie as imagens com os nomes exatos. Depois substitua os modelos mantendo os nomes.',
'escolha-jogo':'Escolha apenas um jogo por grupo. O prompt muda conforme a escolha.',
'prompt-jogo':'Copie o prompt e peça para a IA gerar o HTML do jogo escolhido.',
'sons':'Baixe sons curtos, renomeie e coloque na pasta assets/audio.',
'pwa':'O botão de instalação aparece quando o navegador reconhece o PWA.',
'pages':'Depois de ativar o Pages, aguarde alguns minutos antes de testar.',
'testes':'Teste em celular, tablet e computador. Tire prints para o relatório.',
'relatorio':'Clique em Neuro Guia preenche tudo. Depois revise e adicione os prints.',
'certificado':'Gere o certificado quando o grupo concluir as etapas principais.'
}; el('neuroText').textContent=msg[id]||'Estou aqui para ajudar.'}
function initEvents(){document.body.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b)return; play(som.clique); if(b.dataset.goto)openTab(b.dataset.goto); if(b.dataset.done){state[b.dataset.done]=true;save();play(som.sucesso); const idx=tabs.findIndex(([id])=>id===b.dataset.done); if(tabs[idx+1])openTab(tabs[idx+1][0])} if(b.dataset.copy)copyText(b.dataset.copy); if(b.dataset.copyTarget)copyText(el(b.dataset.copyTarget).value); if(b.dataset.game)selectGame(b.dataset.game); if(b.dataset.action)accessAction(b.dataset.action); if(b.dataset.help)help(b.dataset.help);});
 el('continueBtn').onclick=()=>openTab(state.last||'github-conta'); el('neuroButton').onclick=()=>el('neuroPanel').classList.toggle('active'); el('fillReport').onclick=()=>{R.fill();play(som.sucesso)}; el('previewReport').onclick=previewReport; el('downloadPdf').onclick=downloadPdf; el('clearReport').onclick=()=>{document.querySelectorAll('#reportForm input,#reportForm textarea').forEach(i=>i.value=''); el('reportPreview').innerHTML='';play(som.erro)}; el('makeCert').onclick=makeCert; el('btnInstall').onclick=installApp; el('btnInstall2').onclick=installApp; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e; el('btnInstall').style.display='inline-block'});}
function accessAction(a){if(a==='fontPlus'){let f=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font'))+2;document.documentElement.style.setProperty('--font',f+'px')} if(a==='fontMinus'){let f=Math.max(16,parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font'))-2);document.documentElement.style.setProperty('--font',f+'px')} if(a==='dark')document.body.classList.toggle('dark'); if(a==='contrast')document.body.classList.toggle('contrast'); if(a==='spacing')document.body.classList.toggle('spacing'); if(a==='audio'){if(som.ambiente.paused)som.ambiente.play(); else som.ambiente.pause()}}
function help(t){const m={imagem:'Confira: a imagem está em assets/img? O nome está igual? No GitHub, maiúsculas e minúsculas fazem diferença.',som:'O som só toca depois de um clique. Confira se o arquivo está em assets/audio e se não está vazio.',pdf:'O PDF usa html2pdf pela internet. Abra no navegador e confira conexão. Adicione imagens menores se estiver pesado.',github:'Se aparecer 404, aguarde, confira Settings > Pages > main > /root e veja se existe index.html.'};el('neuroText').textContent=m[t]}
async function previewReport(){el('reportPreview').innerHTML=await R.build();play(som.sucesso)}
async function downloadPdf(){await previewReport(); const element=el('reportPreview'); const opt={margin:10,filename:'relatorio-neuro-games-studio-60mais.pdf',image:{type:'jpeg',quality:.98},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'},pagebreak:{mode:['css','legacy'],before:'.print-page'}}; if(!window.html2pdf){alert('A biblioteca de PDF ainda não carregou. Confira a internet e tente novamente.');return} html2pdf().set(opt).from(element).save();play(som.vitoria)}
function makeCert(){const n=el('certName').value||'Grupo participante';el('certPreview').innerHTML=`<h2>Certificado de Conclusão</h2><p>Certificamos que <strong>${n}</strong> concluiu a Semana 5 da Oficina Neuro Games Studio 60+, com organização do projeto PWA, GitHub, assets, acessibilidade e relatório científico.</p><p>UNATI • UEM</p>`;play(som.vitoria)}
async function installApp(){if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}else alert('Se o botão de instalação não aparecer, abra pelo GitHub Pages no Chrome/Edge e use “Adicionar à tela inicial”.')}
function initSW(){if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})}
initMenu();initImages();initGames();initEvents();updateProgress();openTab(state.last||'inicio');initSW();
