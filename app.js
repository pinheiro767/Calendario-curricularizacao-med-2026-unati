let sound=false,font=18,deferredPrompt=null;
const KEY='semana4-prompts-acessibilidade-final-v1';
const fields=['gameName','gameType','groupName','siteLink','evolution','accessibility','testResult','impact','scientificText'];

function audio(type='click'){
  if(!sound) return;
  const ctx=new (window.AudioContext||window.webkitAudioContext)(), osc=ctx.createOscillator(), gain=ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination); const now=ctx.currentTime;
  if(type==='win'){[523,659,784,1046].forEach((f,i)=>osc.frequency.setValueAtTime(f,now+i*.13)); gain.gain.setValueAtTime(.22,now); gain.gain.exponentialRampToValueAtTime(.001,now+.7); osc.start(now); osc.stop(now+.75);}
  else if(type==='piece'){[392,587].forEach((f,i)=>osc.frequency.setValueAtTime(f,now+i*.1)); gain.gain.setValueAtTime(.15,now); gain.gain.exponentialRampToValueAtTime(.001,now+.25); osc.start(now); osc.stop(now+.28);}
  else{osc.frequency.setValueAtTime(650,now); gain.gain.setValueAtTime(.12,now); gain.gain.exponentialRampToValueAtTime(.001,now+.12); osc.start(now); osc.stop(now+.14);}
}
document.getElementById('soundBtn').onclick=()=>{sound=!sound;document.getElementById('soundBtn').textContent=sound?'🔊 Som ligado':'🔇 Som desligado';audio();save()};
function toggleTheme(){document.body.classList.toggle('dark');audio();save()}
function fontSize(d){font=Math.max(16,Math.min(28,font+d));document.documentElement.style.setProperty('--font',font+'px');audio();save()}
function toggleChat(){document.getElementById('chatbox').classList.toggle('open');audio()}
function bot(q){
 const ans={
  prompts:'Use o Prompt 1 para gerar o jogo básico. Depois copie o HTML gerado e use os Prompts 2, 3, 4 e 5 para melhorar a mesma versão.',
  prints:'Anexe prints de cada etapa: versão 1, versão 3, versão 5, Google Sites e teste final no celular.',
  relatorio:'Preencha os campos sobre evolução, acessibilidade, teste e impacto. Depois clique em “IA flutuante: montar relatório”.',
  pdf:'Clique em “Gerar relatório/PDF” e escolha salvar como PDF. As imagens entram no relatório sem corte.'
 };
 const div=document.createElement('div');div.className='msg';div.textContent=ans[q];document.getElementById('chatlog').appendChild(div);audio();
}
function copyPrompt(btn){navigator.clipboard.writeText(btn.parentElement.querySelector('pre').innerText);btn.textContent='Copiado!';setTimeout(()=>btn.textContent='Copiar',1200);audio()}
function update(){
 const checks=[...document.querySelectorAll('input[type=checkbox]')], done=checks.filter(c=>c.checked).length, pct=Math.round(done/checks.length*100);
 document.getElementById('bar').style.width=pct+'%'; document.getElementById('progressText').textContent=pct+'% concluído';
 document.querySelectorAll('.card').forEach(c=>c.classList.toggle('done',c.querySelector('input').checked));
 const tr=document.getElementById('trophy'); if(done===checks.length){if(!tr.classList.contains('show')) audio('win'); tr.classList.add('show')} else tr.classList.remove('show');
}
function save(){const data={font,dark:document.body.classList.contains('dark'),sound,checks:[...document.querySelectorAll('input[type=checkbox]')].map(c=>c.checked)};fields.forEach(id=>data[id]=document.getElementById(id).value);localStorage.setItem(KEY,JSON.stringify(data))}
function load(){try{const d=JSON.parse(localStorage.getItem(KEY)||'{}');if(d.dark)document.body.classList.add('dark');if(d.font){font=d.font;document.documentElement.style.setProperty('--font',font+'px')}if(d.sound){sound=d.sound;document.getElementById('soundBtn').textContent='🔊 Som ligado'}fields.forEach(id=>{if(d[id])document.getElementById(id).value=d[id]});if(d.checks)[...document.querySelectorAll('input[type=checkbox]')].forEach((c,i)=>c.checked=!!d.checks[i])}catch(e){} update()}
document.querySelectorAll('input[type=checkbox]').forEach(c=>c.addEventListener('change',()=>{audio('piece');update();save()}));fields.forEach(id=>document.getElementById(id).addEventListener('input',save));

document.getElementById('photosInput').addEventListener('change',e=>{const area=document.getElementById('photos');[...e.target.files].forEach(file=>{const r=new FileReader();r.onload=()=>{const box=document.createElement('div');box.className='photo';box.innerHTML=`<img src="${r.result}" alt="Print anexado"><small>${file.name}</small>`;area.appendChild(box)};r.readAsDataURL(file)});audio()});

function makeScientificText(){
 const g=id=>document.getElementById(id).value.trim()||'não informado';
 const txt=`RELATÓRIO CIENTÍFICO — SEMANA 4: EVOLUÇÃO DO JOGO COM ACESSIBILIDADE

O grupo ${g('groupName')} desenvolveu o jogo “${g('gameName')}”, do tipo ${g('gameType')}, no contexto da Curricularização da Extensão do curso de Medicina. A atividade teve como objetivo evoluir progressivamente o protótipo digital por meio de cinco prompts aplicados em ferramentas de Inteligência Artificial, com foco na melhoria da acessibilidade para a pessoa idosa.

A primeira versão consistiu em um protótipo funcional simples. Nas versões seguintes, foram incorporadas melhorias visuais, ajustes de usabilidade, recursos de acessibilidade inicial e recursos avançados voltados à baixa visão, facilidade de toque, clareza de instruções, feedback visual, uso sem áudio e possibilidade de inclusão de Libras.

Evolução observada: ${g('evolution')}

Recursos de acessibilidade incorporados: ${g('accessibility')}

Resultado do teste de acessibilidade: ${g('testResult')}

Relação com a pessoa idosa e com as funções cognitivas/neuroanatômicas: ${g('impact')}

A experiência demonstrou que a tecnologia não é o fim do processo, mas um meio para aproximar conhecimento científico, desenvolvimento digital e necessidades reais da comunidade. Os prints anexados documentam a evolução do jogo e subsidiam a continuidade do projeto nas próximas etapas, incluindo organização no GitHub e futura estruturação em formato PWA.`;
 document.getElementById('scientificText').value=txt; save(); audio();
}
function copyReportPrompt(){
 const g=id=>document.getElementById(id).value.trim();
 const prompt=`Atue como professor universitário da área da saúde, com experiência em Neuroanatomia, Gerontologia, Acessibilidade Digital e Curricularização da Extensão. Transforme as informações abaixo em um relatório científico curto, claro e institucional.

Nome do jogo: ${g('gameName')}
Tipo: ${g('gameType')}
Grupo: ${g('groupName')}
Link do Google Sites: ${g('siteLink')}
Evolução da versão 1 até a versão 5: ${g('evolution')}
Recursos de acessibilidade incluídos: ${g('accessibility')}
Resultado do teste de acessibilidade: ${g('testResult')}
Relação com pessoa idosa e Neuroanatomia: ${g('impact')}

Organize em: objetivo, metodologia, evolução do jogo, acessibilidade, resultados do teste, evidências anexadas e conclusão.`;
 navigator.clipboard.writeText(prompt); alert('Prompt do relatório copiado.'); audio();
}
function buildReport(){
 if(!document.getElementById('scientificText').value.trim()) makeScientificText();
 const g=id=>document.getElementById(id).value.trim()||'não informado';
 const checks=[...document.querySelectorAll('.card')].map((c,i)=>`${i+1}. ${c.querySelector('h3').innerText}: ${c.querySelector('input').checked?'concluído':'pendente'}`).join('\n');
 document.getElementById('report').innerText=`RELATÓRIO DA SEMANA 4 — PROMPTS E ACESSIBILIDADE

Jogo: ${g('gameName')}
Tipo: ${g('gameType')}
Grupo: ${g('groupName')}
Google Sites: ${g('siteLink')}

ETAPAS CONCLUÍDAS
${checks}

${document.getElementById('scientificText').value}

EVIDÊNCIAS
As imagens anexadas nesta página correspondem aos prints/fotos das versões do jogo, do Google Sites e dos testes de acessibilidade.`;
 setTimeout(()=>window.print(),200);
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const b=document.getElementById('installBtn');b.style.display='inline-flex';b.onclick=async()=>{deferredPrompt.prompt();deferredPrompt=null;b.style.display='none'}});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
load();
