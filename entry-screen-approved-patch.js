/* GestaMed — tela de abertura aprovada. Patch isolado. */
(function(){
  'use strict';
  if(document.getElementById('gm-entry-approved')) return;
  var root=document.documentElement;
  var body=document.body;
  if(!body){ root.classList.remove('gm-entry-boot'); return; }
  var probe=new Image();
  probe.onload=function(){
    var css=document.createElement('style');
    css.textContent='html.gm-entry-lock,html.gm-entry-lock body{overflow:hidden!important}#gm-entry-approved{position:fixed;inset:0;z-index:2147483647;background:#fbeef3;display:flex;align-items:stretch;justify-content:center;opacity:1;transition:opacity .2s ease}#gm-entry-approved.gm-out{opacity:0;pointer-events:none}.gm-entry-approved-wrap{position:relative;width:100vw;height:100vh;height:100dvh;overflow:hidden;background:#fbeef3}.gm-entry-approved-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center center;user-select:none;-webkit-user-drag:none}.gm-entry-approved-start{position:absolute;left:17%;right:17%;top:79.7%;height:7.2%;border:0;background:transparent;border-radius:999px;cursor:pointer;padding:0}.gm-entry-approved-login{position:absolute;left:25%;right:25%;top:87.6%;height:4.8%;border:0;background:transparent;cursor:pointer;padding:0}@media (prefers-reduced-motion:reduce){#gm-entry-approved{transition:none}}';
    document.head.appendChild(css);
    var overlay=document.createElement('section');
    overlay.id='gm-entry-approved';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Tela de abertura do GestaMed');
    overlay.innerHTML='<div class="gm-entry-approved-wrap"><img class="gm-entry-approved-img" alt="" src="./019B1C8C-CF04-45E6-9A4F-FB80A4C6A3C9.png?v=135"><button class="gm-entry-approved-start" type="button" aria-label="Começar agora"></button><button class="gm-entry-approved-login" type="button" aria-label="Entrar"></button></div>';
    function closeEntry(){
      if(overlay.classList.contains('gm-out')) return;
      overlay.classList.add('gm-out');
      root.classList.remove('gm-entry-lock');
      window.setTimeout(function(){if(overlay.parentNode) overlay.parentNode.removeChild(overlay);},220);
    }
    overlay.querySelector('.gm-entry-approved-start').addEventListener('click',closeEntry);
    overlay.querySelector('.gm-entry-approved-login').addEventListener('click',closeEntry);
    root.classList.add('gm-entry-lock');
    body.appendChild(overlay);
    root.classList.remove('gm-entry-boot');
  };
  probe.onerror=function(){
    root.classList.remove('gm-entry-boot');
    console.error('GestaMed: imagem da tela de abertura não encontrada.');
  };
  probe.src='./019B1C8C-CF04-45E6-9A4F-FB80A4C6A3C9.png?v=135';
})();
