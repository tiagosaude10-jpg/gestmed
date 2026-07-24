/* GestaMed — identidade visual rosa da tela principal.
   Patch visual conservador: preserva os elementos, IDs, eventos e funções existentes. */
(function(){
  'use strict';
  if(document.getElementById('gm-home-pink-style')) return;

  var style=document.createElement('style');
  style.id='gm-home-pink-style';
  style.textContent=`
    :root{--gm-pink:#ec3f78;--gm-pink-2:#ff7f9c;--gm-soft:#fff4f7;--gm-ink:#152036;--gm-muted:#71809a}
    body{background:linear-gradient(180deg,#fff8fa 0%,#fff 55%,#fff6f9 100%)!important;color:var(--gm-ink)}
    .gm-old-header-hidden{display:none!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;visibility:hidden!important}
    .gm-home-brand-panel{margin:0 0 18px;padding:18px 20px 16px;border-radius:0 0 34px 34px;background:linear-gradient(135deg,#fff6f9 0%,#ffe9f1 100%);box-shadow:0 12px 30px rgba(224,63,115,.10);position:relative;overflow:hidden}
    .gm-home-brand-panel:after{content:"";position:absolute;right:-30px;top:-35px;width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,rgba(255,142,175,.26),rgba(255,142,175,0) 70%)}
    .gm-home-brand-top{display:flex;align-items:center;justify-content:space-between;gap:12px;position:relative;z-index:1}
    .gm-home-brand-copy{min-width:0}.gm-home-brand-logo{font-size:34px;line-height:1;font-weight:800;letter-spacing:-.045em;background:linear-gradient(90deg,#df255f,#ff8da8);-webkit-background-clip:text;background-clip:text;color:transparent}
    .gm-home-brand-tag{margin-top:6px;font-size:12px;line-height:1.3;letter-spacing:.08em;text-transform:uppercase;color:#a94c68;font-weight:650}
    .gm-home-professional{width:94px;height:94px;border-radius:26px;display:grid;place-items:center;background:linear-gradient(145deg,#ffe0e9,#fff);font-size:52px;box-shadow:0 10px 22px rgba(222,61,111,.14)}
    .gm-home-hello{margin:14px 0 3px;font-size:26px;font-weight:800;letter-spacing:-.025em;color:#231b2c}.gm-home-desc{margin:0;color:#59647a;font-size:14px;line-height:1.45}
    input[type="search"],input[placeholder*="medicamento" i],input[placeholder*="princípio" i]{border-color:#f2c6d3!important;box-shadow:0 9px 20px rgba(217,77,119,.08)!important;background:#fff!important}
    button,[role="button"],a{-webkit-tap-highlight-color:transparent}
    .gm-pink-card{border-radius:22px!important;box-shadow:0 9px 22px rgba(37,46,70,.07)!important;overflow:hidden}
    .gm-pink-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
    .gm-pink-grid>*{min-width:0!important;margin:0!important;height:100%!important}
    .gm-pink-accent{outline:1px solid rgba(236,63,120,.13)!important}
    @media(max-width:390px){.gm-home-brand-logo{font-size:30px}.gm-home-professional{width:82px;height:82px;font-size:46px}.gm-home-hello{font-size:23px}}
  `;
  document.head.appendChild(style);

  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function findText(re){
    var all=document.querySelectorAll('body *');
    for(var i=0;i<all.length;i++){
      var el=all[i];
      if(el.children.length>4) continue;
      if(re.test(norm(el.textContent))) return el;
    }
    return null;
  }
  function clickableAncestor(el){
    while(el&&el!==document.body){
      var tag=el.tagName;
      if(tag==='BUTTON'||tag==='A'||el.getAttribute('role')==='button'||el.onclick||el.hasAttribute('data-action')) return el;
      el=el.parentElement;
    }
    return null;
  }
  function cardAncestor(el){
    var candidate=clickableAncestor(el)||el;
    while(candidate&&candidate!==document.body){
      var r=candidate.getBoundingClientRect();
      if(r.width>140&&r.height>48&&r.height<220) return candidate;
      candidate=candidate.parentElement;
    }
    return null;
  }
  function hideOldHeader(panel,search){
    if(!panel) return false;
    var pr=panel.getBoundingClientRect();
    var viewport=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    var all=document.querySelectorAll('body header,body section,body div,body figure,body picture,body img');
    var best=null,bestScore=-1;
    for(var i=0;i<all.length;i++){
      var el=all[i];
      if(el===panel||el.contains(panel)||panel.contains(el)||el.contains(search)||el.classList.contains('gm-old-header-hidden')) continue;
      var r=el.getBoundingClientRect();
      if(r.width<viewport*.82||r.height<260||r.height>760) continue;
      if(r.top<-10||r.bottom>pr.top+12) continue;
      var visible=getComputedStyle(el);
      if(visible.display==='none'||visible.visibility==='hidden'||Number(visible.opacity)===0) continue;
      var closeness=Math.max(0,500-Math.abs(pr.top-r.bottom));
      var score=(r.width*r.height)+closeness*1000;
      if(score>bestScore){best=el;bestScore=score;}
    }
    if(!best) return false;
    best.classList.add('gm-old-header-hidden');
    return true;
  }
  function apply(){
    var search=document.querySelector('input[type="search"],input[placeholder*="medicamento" i],input[placeholder*="princípio" i]');
    if(!search) return false;

    var panel=document.querySelector('.gm-home-brand-panel');
    if(!panel){
      var anchor=search.closest('section,header,main,div')||search.parentElement;
      panel=document.createElement('section');
      panel.className='gm-home-brand-panel';
      panel.innerHTML='<div class="gm-home-brand-top"><div class="gm-home-brand-copy"><div class="gm-home-brand-logo">GestaMed</div><div class="gm-home-brand-tag">Cuidar com conhecimento.<br>Decidir com segurança.</div></div><div class="gm-home-professional" aria-hidden="true">👩🏻‍⚕️</div></div><div class="gm-home-hello">Olá, Profissional! <span style="color:#f06b93">♥</span></div><p class="gm-home-desc">Acesse conteúdos confiáveis para apoiar sua prática com excelência.</p>';
      anchor.parentNode.insertBefore(panel,anchor);
    }

    hideOldHeader(panel,search);

    var labels=[/idade gestacional/,/cálculo de insulina/,/painel de exames/,/ganho de peso gestacional/,/prescrições por trimestre/,/condutas obstétricas/];
    var cards=[];
    labels.forEach(function(rx){var t=findText(rx);var c=t&&cardAncestor(t);if(c&&cards.indexOf(c)<0){c.classList.add('gm-pink-card','gm-pink-accent');cards.push(c);}});
    if(cards.length>=4){
      var parent=cards[0].parentElement;
      if(parent&&cards.every(function(c){return c.parentElement===parent;})) parent.classList.add('gm-pink-grid');
    }
    var quick=findText(/acesso rápido/);
    if(quick) quick.style.color='#161d31';
    return true;
  }
  function start(){
    var attempts=0;
    var timer=setInterval(function(){
      attempts++;
      apply();
      if(attempts>=60||document.querySelector('.gm-old-header-hidden')) clearInterval(timer);
    },200);
    apply();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})();