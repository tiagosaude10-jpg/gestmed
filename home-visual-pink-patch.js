/* GestaMed — tela inicial rosa inspirada no layout aprovado.
   Patch visual: preserva IDs, links, onclick e funções existentes. */
(function(){
  'use strict';
  if(document.getElementById('gm-home-pink-style-v2')) return;

  var style=document.createElement('style');
  style.id='gm-home-pink-style-v2';
  style.textContent=`
    :root{--gm-pink:#ef3f79;--gm-pink-dark:#d91f61;--gm-pink-soft:#fff1f6;--gm-rose:#ff88aa;--gm-ink:#16172b;--gm-muted:#667085;--gm-line:#f3d5df;--gm-shadow:0 9px 25px rgba(207,52,101,.11)}
    html,body{overflow-x:hidden!important;background:#fff8fb!important}
    body{color:var(--gm-ink)!important;padding-bottom:92px!important}
    .hero-banner,.hero-sr,.gm-legacy-blue-visual,.gm-legacy-blue-shell{display:none!important}
    main,.container,.app-container,.page-container{max-width:920px!important;margin-left:auto!important;margin-right:auto!important}

    .gm-home-brand-panel{margin:0 0 16px!important;padding:18px 18px 20px!important;border-radius:0 0 32px 32px!important;background:linear-gradient(145deg,#fff9fb 0%,#ffeef4 100%)!important;box-shadow:0 13px 34px rgba(204,52,101,.10)!important;position:relative!important;overflow:hidden!important}
    .gm-home-brand-panel:before{content:"";position:absolute;right:-25px;top:8px;width:240px;height:210px;background:radial-gradient(circle at 55% 45%,rgba(255,143,174,.25),rgba(255,143,174,0) 66%);pointer-events:none}
    .gm-home-brand-panel:after{content:"";position:absolute;right:20px;top:20px;width:160px;height:180px;opacity:.38;background:linear-gradient(125deg,transparent 0 45%,rgba(236,63,120,.18) 46% 48%,transparent 49% 100%);transform:rotate(-8deg);pointer-events:none}
    .gm-home-brand-top{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;position:relative!important;z-index:1!important}
    .gm-home-brand-copy{min-width:0!important;flex:1!important}
    .gm-home-logo-row{display:flex;align-items:center;gap:11px}
    .gm-home-logo-mark{width:56px;height:66px;display:grid;place-items:center;border-radius:20px;background:linear-gradient(145deg,#fff,#ffe9f1);box-shadow:0 8px 18px rgba(221,38,98,.12);font-size:36px}
    .gm-home-brand-logo{font-size:38px!important;line-height:.95!important;font-weight:850!important;letter-spacing:-.055em!important;background:linear-gradient(90deg,#d91f61 0%,#f1487f 55%,#ff88aa 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
    .gm-home-brand-tag{margin-top:7px!important;font-size:11px!important;line-height:1.35!important;letter-spacing:.10em!important;text-transform:uppercase!important;color:#925269!important;font-weight:750!important}
    .gm-home-professional{width:124px!important;height:142px!important;border-radius:30px!important;display:grid!important;place-items:center!important;background:linear-gradient(155deg,#ffe6ef,#fff)!important;box-shadow:0 12px 25px rgba(222,61,111,.14)!important;position:relative!important;overflow:hidden!important;flex:0 0 auto!important}
    .gm-home-professional:before{content:"👩🏻‍⚕️";font-size:78px;transform:translateY(7px)}
    .gm-home-professional:after{content:"";position:absolute;left:14px;right:14px;bottom:13px;height:6px;border-radius:999px;background:linear-gradient(90deg,#e92f70,#ff91ad)}
    .gm-home-hello{margin:15px 0 4px!important;font-size:26px!important;font-weight:850!important;letter-spacing:-.03em!important;color:#25182b!important;position:relative!important;z-index:1!important}
    .gm-home-desc{margin:0!important;max-width:500px!important;color:#4f5365!important;font-size:15px!important;line-height:1.45!important;position:relative!important;z-index:1!important}

    .gm-search-safe-host{margin:0 14px 16px!important;transform:none!important;position:relative!important;z-index:4!important}
    input[type="search"],input[placeholder*="medicamento" i],input[placeholder*="princípio" i]{min-height:66px!important;border:1px solid #f2cfda!important;border-radius:33px!important;background:#fff!important;box-shadow:0 9px 22px rgba(217,77,119,.10)!important;font-size:16px!important;padding-left:56px!important;padding-right:54px!important;color:#2b2633!important}
    input[type="search"]::placeholder,input[placeholder*="medicamento" i]::placeholder,input[placeholder*="princípio" i]::placeholder{color:#997687!important;opacity:1!important}

    button,[role="button"],a{-webkit-tap-highlight-color:transparent}
    button:active,[role="button"]:active,a:active{transform:scale(.985)}

    .gm-pink-card{border-radius:21px!important;box-shadow:var(--gm-shadow)!important;overflow:hidden!important;border:1px solid rgba(236,63,120,.13)!important;background:#fff!important;transition:transform .18s ease,box-shadow .18s ease!important}
    .gm-pink-card:hover{box-shadow:0 12px 28px rgba(207,52,101,.16)!important}
    .gm-pink-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;padding:0 14px!important}
    .gm-pink-grid>*{min-width:0!important;margin:0!important;height:100%!important}
    .gm-pink-grid .gm-pink-card:nth-child(1){background:linear-gradient(135deg,#edf8ff,#f7fbff)!important;border-color:#bddff5!important}
    .gm-pink-grid .gm-pink-card:nth-child(2){background:linear-gradient(135deg,#fff0f3,#fff8fa)!important;border-color:#f6c4d0!important}
    .gm-pink-grid .gm-pink-card:nth-child(3){background:linear-gradient(135deg,#effaf1,#fbfffb)!important;border-color:#c9e9ce!important}
    .gm-pink-grid .gm-pink-card:nth-child(4){background:linear-gradient(135deg,#f5efff,#fcfaff)!important;border-color:#dfcef7!important}
    .gm-pink-grid .gm-pink-card:nth-child(5){background:linear-gradient(135deg,#fff6e8,#fffaf2)!important;border-color:#f2d7a8!important}
    .gm-pink-grid .gm-pink-card:nth-child(6){background:linear-gradient(135deg,#fff0f5,#fff8fb)!important;border-color:#f3c6d5!important}

    .gm-quick-title{margin:18px 16px 10px!important;font-size:25px!important;font-weight:850!important;letter-spacing:-.03em!important;color:#17172a!important}
    .gm-evidence-card{margin:16px 14px!important;padding:16px 18px!important;border-radius:22px!important;background:linear-gradient(135deg,#fff1f6,#fff9fb)!important;border:1px solid #f4ccd8!important;box-shadow:var(--gm-shadow)!important}

    @media(max-width:560px){
      .gm-home-brand-panel{padding:15px 14px 18px!important}
      .gm-home-brand-logo{font-size:33px!important}
      .gm-home-logo-mark{width:48px;height:58px;font-size:31px}
      .gm-home-professional{width:104px!important;height:124px!important}
      .gm-home-professional:before{font-size:67px}
      .gm-home-hello{font-size:24px!important}
      .gm-home-desc{font-size:14px!important}
      .gm-pink-grid{gap:10px!important;padding:0 10px!important}
    }
    @media(max-width:370px){.gm-home-professional{width:88px!important}.gm-home-brand-logo{font-size:29px!important}.gm-home-brand-tag{font-size:9px!important}.gm-home-hello{font-size:22px!important}}
  `;
  document.head.appendChild(style);

  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function findText(re){
    var all=document.querySelectorAll('body *');
    for(var i=0;i<all.length;i++){
      var el=all[i];
      if(el.closest('.gm-home-brand-panel')) continue;
      if(el.children.length>5) continue;
      if(re.test(norm(el.textContent))) return el;
    }
    return null;
  }
  function clickableAncestor(el){
    while(el&&el!==document.body){
      if(el.tagName==='BUTTON'||el.tagName==='A'||el.getAttribute('role')==='button'||el.onclick||el.hasAttribute('data-action')) return el;
      el=el.parentElement;
    }
    return null;
  }
  function cardAncestor(el){
    var node=clickableAncestor(el)||el;
    while(node&&node!==document.body){
      var r=node.getBoundingClientRect();
      if(r.width>130&&r.height>48&&r.height<240) return node;
      node=node.parentElement;
    }
    return null;
  }
  function safeHideLegacy(search){
    var sr=search.getBoundingClientRect(), viewport=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('img,picture,svg,canvas').forEach(function(el){
      if(el.closest('.gm-home-brand-panel')||clickableAncestor(el)) return;
      var r=el.getBoundingClientRect();
      if(r.bottom<=sr.top+8&&r.width>viewport*.72&&r.height>210&&r.top<120){
        var target=el,parent=el.parentElement;
        if(parent&&parent!==document.body&&!parent.querySelector('a,button,input,select,textarea,[role="button"],[data-action]')&&parent.children.length===1) target=parent;
        target.classList.add('gm-legacy-blue-visual');target.setAttribute('aria-hidden','true');
      }
    });
  }
  function createBrand(search){
    var panel=document.querySelector('.gm-home-brand-panel');
    if(panel) return panel;
    var anchor=search.closest('main')||search.closest('section,div')||search.parentElement;
    panel=document.createElement('section');
    panel.className='gm-home-brand-panel';
    panel.innerHTML='<div class="gm-home-brand-top"><div class="gm-home-brand-copy"><div class="gm-home-logo-row"><div class="gm-home-logo-mark" aria-hidden="true">🤰🌿</div><div><div class="gm-home-brand-logo">GestaMed</div><div class="gm-home-brand-tag">Cuidar com conhecimento,<br>decidir com segurança.</div></div></div></div><div class="gm-home-professional" aria-hidden="true"></div></div><div class="gm-home-hello">Olá, Profissional! <span style="color:#ef5486">♥</span></div><p class="gm-home-desc">Acesse conteúdos confiáveis para apoiar sua prática com excelência.</p>';
    anchor.parentNode.insertBefore(panel,anchor);
    return panel;
  }
  function apply(){
    var search=document.querySelector('#search,input[type="search"],input[placeholder*="medicamento" i],input[placeholder*="princípio" i]');
    if(!search) return false;
    safeHideLegacy(search);
    var host=search.parentElement;if(host){host.classList.add('gm-search-safe-host');host.style.setProperty('transform','none','important');}
    createBrand(search);

    var quick=findText(/acesso rápido/);if(quick) quick.classList.add('gm-quick-title');
    var labels=[/idade gestacional/,/cálculo de insulina/,/painel de exames/,/ganho de peso gestacional/,/prescrições por trimestre/,/condutas obstétricas/];
    var cards=[];
    labels.forEach(function(rx){var t=findText(rx),c=t&&cardAncestor(t);if(c&&cards.indexOf(c)<0){c.classList.add('gm-pink-card');cards.push(c);}});
    if(cards.length>=4){var parent=cards[0].parentElement;if(parent&&cards.every(function(c){return c.parentElement===parent;})) parent.classList.add('gm-pink-grid');}

    var evidence=findText(/conteúdo baseado em evidências|baseado em evidências/);var ev=evidence&&cardAncestor(evidence);if(ev) ev.classList.add('gm-evidence-card');
    return true;
  }
  function start(){var n=0,t=setInterval(function(){n++;apply();if(n>=40)clearInterval(t);},250);apply();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();