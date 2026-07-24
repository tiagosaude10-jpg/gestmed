/* GestaMed — tela de abertura aprovada, exibida imediatamente. */
(function(){
  'use strict';
  var root=document.documentElement;

  function mount(){
    if(document.getElementById('gm-entry-approved')){
      root.classList.remove('gm-entry-boot');
      root.classList.add('gm-entry-lock');
      return;
    }

    var body=document.body;
    if(!body) return;

    var css=document.createElement('style');
    css.id='gm-entry-approved-style';
    css.textContent='html.gm-entry-lock,html.gm-entry-lock body{overflow:hidden!important}#gm-entry-approved{position:fixed!important;inset:0!important;z-index:2147483647!important;background:#fbeef3!important;display:flex!important;align-items:stretch!important;justify-content:center!important;opacity:1!important;visibility:visible!important}#gm-entry-approved.gm-out{opacity:0!important;pointer-events:none!important;transition:opacity .18s ease}.gm-entry-approved-wrap{position:relative;width:100vw;height:100vh;height:100dvh;overflow:hidden;background:#fbeef3}.gm-entry-approved-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center center;user-select:none;-webkit-user-drag:none}.gm-entry-approved-start{position:absolute;left:17%;right:17%;top:79.7%;height:7.2%;border:0;background:transparent;border-radius:999px;cursor:pointer;padding:0}.gm-entry-approved-login{position:absolute;left:25%;right:25%;top:87.6%;height:4.8%;border:0;background:transparent;cursor:pointer;padding:0}';
    document.head.appendChild(css);

    var overlay=document.createElement('section');
    overlay.id='gm-entry-approved';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Tela de abertura do GestaMed');
    overlay.innerHTML='<div class="gm-entry-approved-wrap"><img class="gm-entry-approved-img" alt="" src="./019B1C8C-CF04-45E6-9A4F-FB80A4C6A3C9.png?v=138"><button class="gm-entry-approved-start" type="button" aria-label="Começar agora"></button><button class="gm-entry-approved-login" type="button" aria-label="Entrar"></button></div>';

    function closeEntry(){
      if(overlay.classList.contains('gm-out')) return;
      overlay.classList.add('gm-out');
      root.classList.remove('gm-entry-lock','gm-entry-boot');
      window.setTimeout(function(){if(overlay.parentNode) overlay.parentNode.removeChild(overlay);},200);
    }

    var start=overlay.querySelector('.gm-entry-approved-start');
    var login=overlay.querySelector('.gm-entry-approved-login');
    if(start) start.addEventListener('click',closeEntry);
    if(login) login.addEventListener('click',closeEntry);

    root.classList.add('gm-entry-lock');
    body.appendChild(overlay);
    root.classList.remove('gm-entry-boot');
  }

  if(document.body) mount();
  else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();