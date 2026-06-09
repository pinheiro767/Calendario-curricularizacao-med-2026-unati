let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e});
function installApp(){ if(deferredPrompt){deferredPrompt.prompt();} else {alert('No celular: toque no menu do navegador e escolha “Adicionar à tela inicial” ou “Instalar app”.');}}
function openTab(id){document.querySelectorAll('.tabcontent').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');event.target.classList.add('active');}
function gerarPDF(){
  const tabs=document.querySelectorAll('.tabcontent'); tabs.forEach(t=>t.classList.add('active'));
  const el=document.getElementById('calendarioPDF');
  html2pdf().set({margin:8,filename:'Calendario_NeuroGames_UNATI_UEM_2026.pdf',image:{type:'jpeg',quality:.98},html2canvas:{scale:2,useCORS:true},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(el).save().then(()=>{tabs.forEach(t=>t.classList.remove('active'));document.getElementById('junho').classList.add('active');});
}
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
