/* GestaMed — tela inicial funcional reconstruída conforme modelo aprovado.
   Mantém o aplicativo original preservado e usa os botões existentes como destino. */
(function(){
  'use strict';
  if(document.getElementById('gm-dashboard-v3')) return;

  var style=document.createElement('style');
  style.id='gm-dashboard-v3-style';
  style.textContent=`
    :root{--pink:#ef3f79;--pink2:#ff7da0;--ink:#17152a;--muted:#60677a;--line:#f0d7df;--shadow:0 10px 28px rgba(188,52,96,.12)}
    html,body{margin:0!important;min-height:100%;background:#fff8fb!important;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif!important}
    body.gm-dashboard-open{overflow-x:hidden!important;background:linear-gradient(180deg,#fff7fa 0%,#fff 58%,#fff4f8 100%)!important}
    #gm-original-app{display:none}
    body:not(.gm-dashboard-open) #gm-original-app{display:block}
    #gm-dashboard-root{display:none;color:var(--ink);max-width:900px;margin:0 auto;padding:0 14px 104px;box-sizing:border-box}
    body.gm-dashboard-open #gm-dashboard-root{display:block}
    .gm-hero{margin:0 -14px 14px;padding:20px 22px 22px;background:linear-gradient(145deg,#fffafb 0%,#ffeef4 100%);border-radius:0 0 34px 34px;box-shadow:0 12px 34px rgba(204,52,101,.10);position:relative;overflow:hidden}
    .gm-hero:before{content:"";position:absolute;right:-40px;top:-20px;width:300px;height:280px;background:radial-gradient(circle,rgba(255,133,169,.28),rgba(255,133,169,0) 68%)}
    .gm-brand-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;position:relative;z-index:1}
    .gm-brand-left{display:flex;gap:13px;align-items:center;min-width:0}
    .gm-logo-mark{width:78px;height:92px;flex:0 0 auto;border-radius:26px;background:#fff;box-shadow:0 8px 22px rgba(224,55,108,.14);display:grid;place-items:center;font-size:44px;position:relative}
    .gm-logo-mark:after{content:"";position:absolute;width:22px;height:12px;border-radius:100% 0 100% 0;background:#55b933;right:9px;bottom:19px;transform:rotate(-25deg)}
    .gm-wordmark{font-size:44px;line-height:.95;font-weight:850;letter-spacing:-.055em;background:linear-gradient(90deg,#da1f60,#f24b7f 56%,#ff91ad);-webkit-background-clip:text;background-clip:text;color:transparent}
    .gm-tagline{margin-top:9px;font-size:12px;line-height:1.4;letter-spacing:.1em;text-transform:uppercase;color:#8d5368;font-weight:700}
    .gm-doctor{width:154px;height:184px;flex:0 0 auto;border-radius:34px;background:linear-gradient(160deg,#ffe1ec,#fff);box-shadow:0 12px 27px rgba(218,54,105,.14);display:grid;place-items:center;font-size:96px;overflow:hidden;position:relative}
    .gm-doctor:after{content:"";position:absolute;left:18px;right:18px;bottom:13px;height:7px;border-radius:999px;background:linear-gradient(90deg,#ea3171,#ff8dab)}
    .gm-welcome{position:relative;z-index:1;margin-top:14px}
    .gm-welcome h1{margin:0;font-size:29px;line-height:1.12;letter-spacing:-.035em}.gm-welcome h1 span{color:#f16b94}
    .gm-welcome p{margin:7px 0 0;max-width:500px;font-size:16px;line-height:1.45;color:#313345}
    .gm-search-wrap{position:relative;margin:18px 0 12px}
    .gm-search-wrap:before{content:"⌕";position:absolute;left:21px;top:50%;transform:translateY(-54%);font-size:38px;line-height:1;color:var(--pink);z-index:2}
    #gm-dashboard-search{width:100%;height:68px;border:1px solid #f0cbd7;border-radius:35px;background:#fff;box-shadow:0 9px 24px rgba(207,52,101,.11);padding:0 62px 0 62px;font-size:17px;color:#282433;outline:none;box-sizing:border-box}
    #gm-dashboard-search::placeholder{color:#9a7584;opacity:1}.gm-search-btn{position:absolute;right:11px;top:10px;width:48px;height:48px;border:0;border-radius:50%;background:#fff0f5;color:var(--pink);font-size:24px;cursor:pointer}
    .gm-chip-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:22px}.gm-chip{height:58px;border:1px solid #f1d9e1;background:#fff;border-radius:30px;box-shadow:0 7px 18px rgba(50,37,46,.07);font-size:16px;font-weight:700;color:#202033;cursor:pointer}.gm-chip span{font-size:22px;margin-right:8px}
    .gm-section-title{font-size:27px;line-height:1.1;margin:10px 2px 14px;font-weight:850;letter-spacing:-.035em}
    .gm-quick-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:18px}.gm-quick{min-height:122px;border:1px solid #f2dbe2;background:rgba(255,255,255,.72);border-radius:22px;box-shadow:0 8px 20px rgba(58,37,47,.06);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;font-size:14px;font-weight:650;color:#252133;cursor:pointer}.gm-quick .ico{font-size:34px;color:var(--pink)}
    .gm-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.gm-feature{min-height:108px;border-radius:22px;border:1px solid;box-shadow:0 8px 22px rgba(48,39,48,.07);display:grid;grid-template-columns:64px 1fr 42px;align-items:center;gap:12px;padding:12px 14px;text-align:left;cursor:pointer;color:#18182a}.gm-feature .round{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;font-size:30px;color:#fff}.gm-feature strong{font-size:18px;line-height:1.15;display:block}.gm-feature small{display:block;margin-top:4px;font-size:13px;line-height:1.25;color:#555c70}.gm-arrow{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:25px;font-weight:800}
    .f-blue{background:linear-gradient(135deg,#edf7ff,#f9fcff);border-color:#b8dcf4}.f-blue .round,.f-blue .gm-arrow{background:#3b9de2}.f-red{background:linear-gradient(135deg,#fff0f3,#fff9fa);border-color:#f4c1cf}.f-red .round,.f-red .gm-arrow{background:#ef4776}.f-green{background:linear-gradient(135deg,#effaf1,#fbfffb);border-color:#c3e4c9}.f-green .round,.f-green .gm-arrow{background:#48aa4c}.f-purple{background:linear-gradient(135deg,#f4efff,#fcfaff);border-color:#ddcdf6}.f-purple .round,.f-purple .gm-arrow{background:#914cff}.f-orange{background:linear-gradient(135deg,#fff5e7,#fffaf2);border-color:#efd39f}.f-orange .round,.f-orange .gm-arrow{background:#f49a16}.f-pink{background:linear-gradient(135deg,#fff0f5,#fff9fb);border-color:#f2c6d4}.f-pink .round,.f-pink .gm-arrow{background:#f0477d}
    .gm-base{margin-top:16px;border:1px solid #f1d8e0;border-radius:22px;background:#fff;box-shadow:var(--shadow);padding:15px 18px}.gm-base h3{margin:0 0 13px;font-size:18px}.gm-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:0}.gm-stat{display:flex;align-items:center;gap:12px;padding:5px 14px;border-right:1px solid #efdce2}.gm-stat:last-child{border-right:0}.gm-stat .sico{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:#0e869b;color:#fff;font-size:25px}.gm-stat b{font-size:25px;display:block}.gm-stat span{font-size:13px;color:#5b6272}.gm-stat.pending{background:#fff4df;border-radius:18px}.gm-stat.pending .sico{background:transparent;color:#654;font-size:28px}.gm-stat.pending b{color:#a84c08}
    .gm-evidence{margin-top:16px;border:1px solid #f3ced9;border-radius:22px;background:linear-gradient(135deg,#fff1f6,#fff9fb);box-shadow:var(--shadow);padding:15px 18px;display:grid;grid-template-columns:66px 1fr 90px;align-items:center;gap:13px}.gm-shield{width:58px;height:58px;border-radius:50%;background:#ff7da0;color:#fff;display:grid;place-items:center;font-size:31px}.gm-evidence h3{margin:0;color:#df2c69;font-size:19px}.gm-evidence p{margin:4px 0 0;font-size:13px;line-height:1.35}.gm-leaf{font-size:50px;text-align:center}
    .gm-bottom{position:fixed;left:50%;bottom:10px;transform:translateX(-50%);z-index:99999;width:min(820px,calc(100% - 20px));height:76px;border:1px solid #efd8df;border-radius:28px;background:rgba(255,255,255,.96);box-shadow:0 12px 35px rgba(92,42,61,.17);display:grid;grid-template-columns:repeat(5,1fr);backdrop-filter:blur(12px)}.gm-nav{border:0;background:transparent;color:#715c67;font-size:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer}.gm-nav .nicon{font-size:25px}.gm-nav.active{color:var(--pink);font-weight:800}.gm-nav.center{transform:translateY(-17px)}.gm-nav.center .nicon{width:64px;height:64px;border-radius:50%;background:linear-gradient(145deg,#ff83a5,#ec3f78);color:#fff;display:grid;place-items:center;font-size:32px;box-shadow:0 8px 20px rgba(230,57,112,.28)}
    .gm-toast{position:fixed;left:50%;bottom:100px;transform:translateX(-50%) translateY(20px);background:#2d2530;color:#fff;padding:11px 16px;border-radius:14px;font-size:13px;opacity:0;pointer-events:none;transition:.2s;z-index:100000}.gm-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
    @media(max-width:650px){.gm-wordmark{font-size:35px}.gm-logo-mark{width:62px;height:76px;font-size:36px}.gm-doctor{width:118px;height:150px;font-size:74px}.gm-welcome h1{font-size:25px}.gm-welcome p{font-size:14px}.gm-quick-grid{grid-template-columns:repeat(5,1fr);gap:8px}.gm-quick{min-height:98px;font-size:11px}.gm-quick .ico{font-size:27px}.gm-feature{grid-template-columns:54px 1fr 35px;padding:10px}.gm-feature .round{width:50px;height:50px;font-size:25px}.gm-feature strong{font-size:15px}.gm-feature small{font-size:11px}.gm-arrow{width:33px;height:33px}.gm-stat{padding:4px 7px;gap:7px}.gm-stat .sico{width:42px;height:42px;font-size:20px}.gm-stat b{font-size:20px}.gm-stat span{font-size:11px}}
    @media(max-width:430px){#gm-dashboard-root{padding-left:10px;padding-right:10px}.gm-hero{margin-left:-10px;margin-right:-10px;padding:16px 13px 19px}.gm-brand-row{gap:8px}.gm-brand-left{gap:8px}.gm-logo-mark{width:52px;height:66px;border-radius:20px;font-size:31px}.gm-wordmark{font-size:30px}.gm-tagline{font-size:9px}.gm-doctor{width:98px;height:127px;border-radius:25px;font-size:63px}.gm-chip-row{gap:7px}.gm-chip{height:52px;font-size:12px}.gm-chip span{font-size:18px;margin-right:4px}.gm-quick-grid{gap:6px}.gm-quick{min-height:88px;border-radius:17px;font-size:9px}.gm-quick .ico{font-size:24px}.gm-feature-grid{gap:9px}.gm-feature{min-height:99px;grid-template-columns:43px 1fr 29px;gap:7px;padding:8px}.gm-feature .round{width:42px;height:42px;font-size:21px}.gm-feature strong{font-size:13px}.gm-feature small{font-size:9px}.gm-arrow{width:28px;height:28px;font-size:18px}.gm-base{padding:12px 9px}.gm-stat{display:block;text-align:center}.gm-stat .sico{margin:0 auto 4px}.gm-stat b{font-size:18px}.gm-stat span{font-size:9px}.gm-evidence{grid-template-columns:50px 1fr 52px;padding:12px}.gm-shield{width:46px;height:46px}.gm-evidence h3{font-size:15px}.gm-evidence p{font-size:10px}.gm-leaf{font-size:38px}}
  `;
  document.head.appendChild(style);

  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function findByText(label){
    var wanted=norm(label), nodes=document.querySelectorAll('#gm-original-app a,#gm-original-app button,#gm-original-app [role="button"],#gm-original-app [onclick],#gm-original-app [data-action],#gm-original-app div,#gm-original-app span');
    for(var i=0;i<nodes.length;i++){
      var t=norm(nodes[i].textContent);
      if(t===wanted||t.indexOf(wanted)>=0){
        var n=nodes[i];
        while(n&&n.id!=='gm-original-app'){
          if(n.tagName==='A'||n.tagName==='BUTTON'||n.getAttribute('role')==='button'||n.onclick||n.hasAttribute('data-action')) return n;
          n=n.parentElement;
        }
        return nodes[i];
      }
    }
    return null;
  }
  function toast(msg){var t=document.getElementById('gm-toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(function(){t.classList.remove('show');},2200);}
  function showDashboard(){document.body.classList.add('gm-dashboard-open');window.scrollTo(0,0);}
  function showOriginal(){document.body.classList.remove('gm-dashboard-open');}
  function trigger(label,alternates){
    var names=[label].concat(alternates||[]), target=null;
    for(var i=0;i<names.length&&!target;i++) target=findByText(names[i]);
    if(!target){toast('Função em preparação: '+label);return;}
    showOriginal();setTimeout(function(){target.click();},60);
  }
  function originalSearch(){return document.querySelector('#gm-original-app #search,#gm-original-app input[type="search"],#gm-original-app input[placeholder*="medicamento" i],#gm-original-app input[placeholder*="princípio" i]');}
  function runSearch(value){
    var s=originalSearch();
    if(!s){toast('Busca indisponível neste momento.');return;}
    s.value=value;s.dispatchEvent(new Event('input',{bubbles:true}));s.dispatchEvent(new Event('change',{bubbles:true}));showOriginal();setTimeout(function(){s.focus();},80);
  }

  var wrap=document.createElement('div');wrap.id='gm-original-app';
  Array.prototype.slice.call(document.body.children).forEach(function(el){if(el.tagName!=='SCRIPT'&&el.id!=='gm-dashboard-root')wrap.appendChild(el);});
  document.body.insertBefore(wrap,document.body.firstChild);

  var root=document.createElement('div');root.id='gm-dashboard-root';
  root.innerHTML=`
    <section class="gm-hero">
      <div class="gm-brand-row"><div class="gm-brand-left"><div class="gm-logo-mark">🤰</div><div><div class="gm-wordmark">GestaMed</div><div class="gm-tagline">Cuidar com conhecimento,<br>decidir com segurança.</div></div></div><div class="gm-doctor">👩🏻‍⚕️</div></div>
      <div class="gm-welcome"><h1>Olá, Profissional! <span>♥</span></h1><p>Acesse conteúdos confiáveis para apoiar sua prática com excelência.</p></div>
    </section>
    <div class="gm-search-wrap"><input id="gm-dashboard-search" type="search" placeholder="Pesquisar medicamento ou princípio"><button class="gm-search-btn" data-search-go aria-label="Pesquisar">☷</button></div>
    <div class="gm-chip-row"><button class="gm-chip" data-filter="dor"><span>🤒</span>Dor</button><button class="gm-chip" data-filter="febre"><span>🌡️</span>Febre</button><button class="gm-chip" data-filter="alergia"><span>🌿</span>Alergia</button><button class="gm-chip" data-filter="náusea"><span>🤢</span>Náusea</button></div>
    <h2 class="gm-section-title">Acesso rápido</h2>
    <div class="gm-quick-grid"><button class="gm-quick" data-go="Agenda"><span class="ico">🗓️</span>Agenda</button><button class="gm-quick" data-go="Checklists"><span class="ico">☑️</span>Checklists</button><button class="gm-quick" data-go="Calculadoras"><span class="ico">🧮</span>Calculadoras</button><button class="gm-quick" data-go="Favoritos"><span class="ico">🔖</span>Favoritos</button><button class="gm-quick" data-go="Lembretes"><span class="ico">🔔</span>Lembretes</button></div>
    <div class="gm-feature-grid">
      <button class="gm-feature f-blue" data-go="Idade gestacional"><span class="round">📅</span><span><strong>Idade gestacional</strong></span><span class="gm-arrow">›</span></button>
      <button class="gm-feature f-red" data-go="Cálculo de insulina"><span class="round">🩸</span><span><strong>Cálculo de insulina (DMG)</strong></span><span class="gm-arrow">›</span></button>
      <button class="gm-feature f-green" data-go="Painel de Exames"><span class="round">📋</span><span><strong>Painel de Exames</strong><small>Pré-natal habitual, baixo risco</small></span><span class="gm-arrow">›</span></button>
      <button class="gm-feature f-purple" data-go="Ganho de peso gestacional"><span class="round">📈</span><span><strong>Ganho de peso gestacional</strong></span><span class="gm-arrow">›</span></button>
      <button class="gm-feature f-orange" data-go="Prescrições por Trimestre"><span class="round">💊</span><span><strong>Prescrições por Trimestre</strong><small>Dose e posologia</small></span><span class="gm-arrow">›</span></button>
      <button class="gm-feature f-pink" data-go="Condutas Obstétricas"><span class="round">🩺</span><span><strong>Condutas Obstétricas</strong><small>Emergências e prescrição-modelo</small></span><span class="gm-arrow">›</span></button>
    </div>
    <section class="gm-base"><h3>Base de medicamentos</h3><div class="gm-stats"><div class="gm-stat"><div class="sico">📄</div><div><b>1.514</b><span>registros pesquisáveis</span></div></div><div class="gm-stat"><div class="sico">🧬</div><div><b>614</b><span>princípios ativos</span></div></div><div class="gm-stat pending"><div class="sico">⏱️</div><div><b>900</b><span>pendentes de revisão</span></div></div></div></section>
    <section class="gm-evidence"><div class="gm-shield">🛡️</div><div><h3>Conteúdo baseado em evidências</h3><p>Informações atualizadas conforme diretrizes do Ministério da Saúde e FEBRASGO.</p></div><div class="gm-leaf">🌿✅</div></section>
    <nav class="gm-bottom"><button class="gm-nav active" data-home><span class="nicon">🏠</span>Início</button><button class="gm-nav" data-go="Obstetrícia"><span class="nicon">🩺</span>Obstetrícia</button><button class="gm-nav center" data-go="Pré-natal"><span class="nicon">♡</span>Pré-natal</button><button class="gm-nav" data-go="Protocolos"><span class="nicon">📋</span>Protocolos</button><button class="gm-nav" data-go="Perfil"><span class="nicon">👤</span>Perfil</button></nav>
    <div id="gm-toast" class="gm-toast"></div>`;
  document.body.insertBefore(root,wrap);
  document.body.classList.add('gm-dashboard-open');

  root.addEventListener('click',function(e){
    var home=e.target.closest('[data-home]');if(home){showDashboard();return;}
    var go=e.target.closest('[data-go]');if(go){trigger(go.getAttribute('data-go'));return;}
    var fil=e.target.closest('[data-filter]');if(fil){runSearch(fil.getAttribute('data-filter'));return;}
    if(e.target.closest('[data-search-go]')) runSearch(document.getElementById('gm-dashboard-search').value.trim());
  });
  document.getElementById('gm-dashboard-search').addEventListener('keydown',function(e){if(e.key==='Enter')runSearch(this.value.trim());});
  document.getElementById('gm-dashboard-search').addEventListener('input',function(){var s=originalSearch();if(s){s.value=this.value;s.dispatchEvent(new Event('input',{bubbles:true}));}});

  wrap.addEventListener('click',function(e){
    var n=e.target,txt='';for(var i=0;n&&n!==wrap&&i<4;i++,n=n.parentElement){txt+=' '+norm(n.textContent);}
    if(/\binício\b/.test(txt)&&!/(idade gestacional|painel de exames)/.test(txt)) setTimeout(showDashboard,80);
  },true);

  window.GestaMedHome={show:showDashboard,open:showOriginal,trigger:trigger};
})();