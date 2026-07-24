/* GestaMed — controla a tela de abertura já presente no HTML inicial. */
(function(){
  'use strict';
  var root=document.documentElement;
  var overlay=document.getElementById('gm-entry-approved');
  if(!overlay){ root.classList.remove('gm-entry-boot'); return; }
  if(overlay.dataset.bound==='1') return;
  overlay.dataset.bound='1';

  function closeEntry(){
    if(overlay.classList.contains('gm-out')) return;
    overlay.classList.add('gm-out');
    root.classList.remove('gm-entry-lock','gm-entry-boot');
    window.setTimeout(function(){ if(overlay.parentNode) overlay.parentNode.removeChild(overlay); },220);
  }

  var start=overlay.querySelector('.gm-entry-approved-start');
  var login=overlay.querySelector('.gm-entry-approved-login');
  if(start) start.addEventListener('click',closeEntry);
  if(login) login.addEventListener('click',closeEntry);
  root.classList.add('gm-entry-lock');
  root.classList.remove('gm-entry-boot');
})();
