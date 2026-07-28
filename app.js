const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];
let font=Number(localStorage.getItem("s6-font")||18);
let soundOn=localStorage.getItem("s6-sound")!=="0";
let volume=Number(localStorage.getItem("s6-volume")||.8);
let audio=null, ambienteAudio=null, deferredPrompt=null;

function placeholder(img){
  img.classList.add("missing");
  const name=img.dataset.name||img.getAttribute("src");
  img.removeAttribute("src");
  img.alt=`ESPAÇO PARA INSERIR: ${name}`;
  img.setAttribute("title",`Coloque ${name} em assets/img`);
}
$$(".required-image").forEach(img=>img.addEventListener("error",()=>placeholder(img)));

function applyFont(){document.documentElement.style.setProperty("--font",`${font}px`);localStorage.setItem("s6-font",font)}
function updateProgress(){
  const items=$$(".step-check"),done=items.filter(x=>x.checked).length,p=Math.round(done/items.length*100);
  $("#progressText").textContent=`${p}%`;$("#progressBar").style.width=`${p}%`;
  $("#conclusion").classList.toggle("hidden",p!==100);
}
function play(src, loop=false){
  if(!soundOn){alert("O som está desligado. Clique em Som desligado para ativar.");return}
  const isAmbiente = src.includes("ambiente");
  if(isAmbiente){
    if(ambienteAudio && !ambienteAudio.paused){ambienteAudio.pause();ambienteAudio.currentTime=0; ambienteAudio=null; setStatus("Som ambiente parado."); return}
    ambienteAudio=new Audio(src); ambienteAudio.loop=true; ambienteAudio.volume=volume;
    ambienteAudio.play().then(()=>setStatus("Som ambiente tocando. Clique novamente para parar.")).catch(()=>missingSound(src));
    return;
  }
  if(audio){audio.pause();audio.currentTime=0}
  audio=new Audio(src);audio.loop=loop;audio.volume=volume;
  audio.play().then(()=>setStatus(`Tocando: ${src.split('/').pop()}`)).catch(()=>missingSound(src));
}
function setStatus(text){const el=document.getElementById("audioStatus");if(el)el.textContent=text}
function missingSound(src){setStatus(`Arquivo não encontrado: ${src}`);alert(`Não encontrei ${src}. Confira o nome, a extensão .mp3 e a pasta assets/audio.`)}
function playClick(){if(soundOn){const c=new Audio("assets/audio/clique.mp3");c.volume=volume;c.play().catch(()=>{})}}
async function copyText(t,b){try{await navigator.clipboard.writeText(t);const old=b.textContent;b.textContent="Copiado!";setTimeout(()=>b.textContent=old,1200)}catch{alert("Selecione e copie manualmente.")}}

document.addEventListener("DOMContentLoaded",()=>{
  applyFont();
  if(localStorage.getItem("s6-dark")==="1")document.body.classList.add("dark");
  if(localStorage.getItem("s6-contrast")==="1")document.body.classList.add("contrast");
  $$(".step-check,.test-check").forEach((x,i)=>{x.checked=localStorage.getItem(`s6-check-${i}`)==="1";x.addEventListener("change",()=>{localStorage.setItem(`s6-check-${i}`,x.checked?"1":"0");updateProgress()})});
  updateProgress();

  $("#fontPlus").onclick=()=>{font=Math.min(28,font+2);applyFont()};
  $("#fontMinus").onclick=()=>{font=Math.max(14,font-2);applyFont()};
  $("#dark").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("s6-dark",document.body.classList.contains("dark")?"1":"0")};
  $("#contrast").onclick=()=>{document.body.classList.toggle("contrast");localStorage.setItem("s6-contrast",document.body.classList.contains("contrast")?"1":"0")};
  $("#sound").textContent=soundOn?"Som ligado":"Som desligado";
  $("#sound").onclick=()=>{soundOn=!soundOn;localStorage.setItem("s6-sound",soundOn?"1":"0");$("#sound").textContent=soundOn?"Som ligado":"Som desligado";if(!soundOn){if(audio)audio.pause();if(ambienteAudio)ambienteAudio.pause()}};
  $("#volume").value=volume;$("#volume").oninput=e=>{volume=Number(e.target.value);localStorage.setItem("s6-volume",volume);if(audio)audio.volume=volume;if(ambienteAudio)ambienteAudio.volume=volume};
  $("#read").onclick=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance($("#main").innerText);u.lang="pt-BR";u.rate=.95;u.volume=volume;speechSynthesis.speak(u)};
  $("#stopRead").onclick=()=>speechSynthesis.cancel();

  $$("[data-scroll]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll).scrollIntoView({behavior:"smooth"}));
  $$(".audio, .sound-test").forEach(b=>b.onclick=()=>{playClick();play(b.dataset.audio,b.dataset.loop==="true")});
  $$(".copy").forEach(b=>b.onclick=()=>copyText(b.dataset.copy||document.getElementById(b.dataset.target).value,b));
  $$(".game").forEach(b=>b.onclick=()=>{$$(".game").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");$("#selectedGame").innerHTML=`<strong>Jogo selecionado:</strong> ${b.dataset.game}`});


  const stopBtn=document.getElementById("stopAllSounds");
  if(stopBtn)stopBtn.onclick=()=>{if(audio){audio.pause();audio.currentTime=0}if(ambienteAudio){ambienteAudio.pause();ambienteAudio.currentTime=0}setStatus("Todos os sons foram parados.")};
  document.addEventListener("click",e=>{if(e.target.closest("button")&&!e.target.closest(".sound-test")&&!e.target.closest(".audio"))playClick()});

  $("#openLibras").onclick=()=>$("#librasModal").classList.remove("hidden");
  $("#closeLibras").onclick=()=>$("#librasModal").classList.add("hidden");
  $("#librasModal").onclick=e=>{if(e.target===$("#librasModal"))$("#librasModal").classList.add("hidden")};

  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("#install").classList.remove("hidden")});
  $("#install").onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("#install").classList.add("hidden")};

  if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
});
