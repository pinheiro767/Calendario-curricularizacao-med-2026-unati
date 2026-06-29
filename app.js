const LOCK_RELEASE_AT = new Date('2026-06-30T08:04:49.361611Z').getTime();
const lessonLock = document.getElementById('lessonLock');
const countdown = document.getElementById('countdown');
const soundUnlockBtn = document.getElementById('soundUnlockBtn');
let unlockedSoundPlayed = false;

function formatRemaining(ms){
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function unlockLesson(){
  document.body.classList.remove('locked');
  lessonLock?.classList.add('hidden');
  if(!unlockedSoundPlayed){
    unlockedSoundPlayed = true;
    audioEnabled = true;
    victorySound();
    confetti();
  }
}
function updateLessonLock(){
  const remaining = LOCK_RELEASE_AT - Date.now();
  if(remaining <= 0){
    unlockLesson();
    return;
  }
  document.body.classList.add('locked');
  if(countdown) countdown.textContent = formatRemaining(remaining);
}
const steps = [...document.querySelectorAll('.mission-card')];
const buttons = [...document.querySelectorAll('.complete-btn')];
const board = document.getElementById('pieceBoard');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const finalBox = document.getElementById('finalBox');
const mainTrophy = document.getElementById('mainTrophy');
const trophyText = document.getElementById('trophyText');
const themeBtn = document.getElementById('themeBtn');
const soundBtn = document.getElementById('soundBtn');
const resetBtn = document.getElementById('resetBtn');
const victoryBtn = document.getElementById('victoryBtn');
const chatBtn = document.getElementById('chatBtn');
const chatBox = document.getElementById('chatBox');
const newTip = document.getElementById('newTip');
const tipText = document.getElementById('tipText');
const pieces = ['🧩','👤','📁','📄','💻','🌐','📱','🔗'];
const tips = [
  'Hoje a meta é sair com um link funcionando no GitHub Pages.',
  'O arquivo principal precisa se chamar index.html, tudo minúsculo.',
  'Depois de ativar o Pages, espere alguns minutos antes de testar.',
  'Se abrir no celular e os botões funcionarem, a missão já foi cumprida.',
  'Google Sites é a vitrine. GitHub é a construção real do aplicativo.',
  'Na próxima etapa, esse projeto começa a caminhar para PWA instalável.'
];
let audioEnabled = false;
let state = JSON.parse(localStorage.getItem('semana4-pieces-v2') || '[]');

pieces.forEach((p, i) => {
  const slot = document.createElement('div');
  slot.className = 'piece-slot';
  slot.dataset.index = i;
  slot.textContent = p;
  board.appendChild(slot);
});

function audioCtx(){ return new (window.AudioContext || window.webkitAudioContext)(); }
function tone(freq=600, duration=0.12, type='sine', gainValue=0.08){
  if(!audioEnabled) return;
  const ctx = audioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  gain.gain.value = gainValue;
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.stop(ctx.currentTime + duration);
}
function pieceSound(){ tone(620,.10,'triangle'); setTimeout(()=>tone(880,.12,'triangle'),90); }
function victorySound(){
  if(!audioEnabled) audioEnabled = true;
  [523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>tone(f,.20,'triangle',.1), i*130));
}
function confetti(){
  const wrap = document.createElement('div');
  Object.assign(wrap.style,{position:'fixed',inset:'0',pointerEvents:'none',zIndex:'99'});
  document.body.appendChild(wrap);
  for(let i=0;i<80;i++){
    const dot=document.createElement('span');
    dot.textContent=['🎉','✨','💜','💙','⭐'][Math.floor(Math.random()*5)];
    Object.assign(dot.style,{position:'absolute',left:Math.random()*100+'vw',top:'-30px',fontSize:18+Math.random()*18+'px',transition:'transform 1.8s ease, opacity 1.8s ease'});
    wrap.appendChild(dot);
    requestAnimationFrame(()=>{dot.style.transform=`translate(${(Math.random()-.5)*200}px, ${window.innerHeight+80}px) rotate(${Math.random()*720}deg)`;dot.style.opacity='0';});
  }
  setTimeout(()=>wrap.remove(),2000);
}
function save(){ localStorage.setItem('semana4-pieces-v2', JSON.stringify(state)); }
function render(){
  const done = state.length;
  const pct = Math.round(done / pieces.length * 100);
  progressFill.style.width = pct + '%';
  progressLabel.textContent = `${done} de 8 etapas concluídas`;
  document.querySelectorAll('.piece-slot').forEach((slot,i)=> slot.classList.toggle('got', state.includes(i)));
  steps.forEach((card,i)=>{
    const ok = state.includes(i);
    card.classList.toggle('completed', ok);
    const btn = card.querySelector('.complete-btn');
    btn.textContent = ok ? 'Peça conquistada ✅' : 'Ganhar peça';
  });
  if(done === pieces.length){
    finalBox.classList.add('show');
    mainTrophy.classList.add('unlocked');
    trophyText.textContent = 'Troféu liberado!';
  } else {
    finalBox.classList.remove('show');
    mainTrophy.classList.remove('unlocked');
    trophyText.textContent = `Faltam ${pieces.length - done} peças`;
  }
}
buttons.forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.target.closest('.mission-card');
    const i = Number(card.dataset.step);
    if(!state.includes(i)){
      state.push(i); state.sort((a,b)=>a-b); save(); render(); pieceSound(); confetti();
      if(state.length === pieces.length){ setTimeout(()=>{victorySound(); confetti();}, 350); }
    }
  });
});
themeBtn.addEventListener('click',()=>{document.documentElement.classList.toggle('dark');localStorage.setItem('semana4-theme',document.documentElement.classList.contains('dark')?'dark':'light');});
soundBtn.addEventListener('click',()=>{audioEnabled = true; soundBtn.textContent='🔊 Sons ativados'; pieceSound();});
victoryBtn.addEventListener('click',()=>{audioEnabled = true; victorySound(); confetti();});
resetBtn.addEventListener('click',()=>{state=[];save();render();tone(360,.12,'sine');});
chatBtn.addEventListener('click',()=>chatBox.classList.toggle('open'));
newTip.addEventListener('click',()=>{tipText.textContent = tips[Math.floor(Math.random()*tips.length)]; pieceSound();});
if(localStorage.getItem('semana4-theme')==='dark') document.documentElement.classList.add('dark');
render();


soundUnlockBtn?.addEventListener('click', () => { audioEnabled = true; soundUnlockBtn.textContent = '🔊 Som ativado'; pieceSound(); });
updateLessonLock();
setInterval(updateLessonLock, 1000);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
