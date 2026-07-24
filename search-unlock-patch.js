/* GestaMed — desbloqueio seguro da busca de medicamentos no iPhone. */
(function(){
  'use strict';
  if(window.__gmSearchUnlock147) return;
  window.__gmSearchUnlock147=true;

  var FIELD='input[placeholder*="Pesquisar medicamento" i],input[placeholder*="princípio ativo" i],input[placeholder*="principio ativo" i],input[type="search"]';

  function fire(field){
    ['input','change','search'].forEach(function(type){
      try{field.dispatchEvent(new Event(type,{bubbles:true}));}catch(e){}
    });
    try{field.dispatchEvent(new KeyboardEvent('keydown',{bubbles:true,key:'Enter'}));}catch(e){}
  }

  function apply(){
    var field=document.querySelector(FIELD);
    if(!field) return false;
    var bar=field.closest('form,.search-box,.search-container,.search-wrap,.search-bar')||field.parentElement;
    if(!bar) return false;

    field.disabled=false;
    field.readOnly=false;
    field.removeAttribute('disabled');
    field.removeAttribute('readonly');
    field.style.setProperty('pointer-events','auto','important');
    field.style.setProperty('touch-action','auto','important');
    field.style.setProperty('position','relative','important');
    field.style.setProperty('z-index','20','important');
    field.style.setProperty('-webkit-user-select','text','important');
    field.style.setProperty('user-select','text','important');

    bar.style.setProperty('position','relative','important');
    bar.style.setProperty('pointer-events','auto','important');
    bar.style.setProperty('z-index','30','important');

    var button=bar.querySelector('.gm-med-search-button');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='gm-med-search-button';
      button.textContent='🔎';
      button.setAttribute('aria-label','Pesquisar medicamento');
      bar.appendChild(button);
    }
    button.disabled=false;
    button.style.setProperty('position','absolute','important');
    button.style.setProperty('right','10px','important');
    button.style.setProperty('top','50%','important');
    button.style.setProperty('transform','translateY(-50%)','important');
    button.style.setProperty('width','50px','important');
    button.style.setProperty('height','50px','important');
    button.style.setProperty('border','0','important');
    button.style.setProperty('background','transparent','important');
    button.style.setProperty('z-index','40','important');
    button.style.setProperty('pointer-events','auto','important');
    button.style.setProperty('touch-action','manipulation','important');
    button.style.setProperty('cursor','pointer','important');

    if(button.dataset.gmUnlock147!=='1'){
      button.dataset.gmUnlock147='1';
      var run=function(ev){
        if(ev){ev.preventDefault();ev.stopPropagation();}
        field.focus({preventScroll:false});
        fire(field);
      };
      button.addEventListener('pointerup',run,{passive:false});
      button.addEventListener('touchend',run,{passive:false});
      button.addEventListener('click',run,false);
    }

    if(bar.dataset.gmUnlock147!=='1'){
      bar.dataset.gmUnlock147='1';
      bar.addEventListener('pointerup',function(ev){
        if(ev.target===button||ev.target===field) return;
        field.focus({preventScroll:false});
      },false);
    }
    return true;
  }

  function start(){
    var n=0;
    var timer=setInterval(function(){n++;if(apply()||n>50)clearInterval(timer);},200);
    apply();
    new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();