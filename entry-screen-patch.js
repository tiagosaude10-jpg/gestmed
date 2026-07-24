/* GestaMed — tela de entrada aprovada
   Patch isolado: não altera banco, cálculos, botões ou funções internas. */
(function () {
  'use strict';
  if (document.getElementById('gm-entry-overlay')) return;

  var body = document.body;
  if (!body) return;
  var root = document.documentElement;

  var style = document.createElement('style');
  style.id = 'gm-entry-screen-style';
  style.textContent = `
    html.gm-entry-open, html.gm-entry-open body { overflow:hidden!important; overscroll-behavior:none!important; }
    #gm-entry-overlay{position:fixed;inset:0;z-index:2147483647;display:flex;justify-content:center;align-items:stretch;background:#fff4f7;opacity:1;visibility:visible;transition:opacity .28s ease,visibility .28s ease;-webkit-tap-highlight-color:transparent;touch-action:manipulation;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
    #gm-entry-overlay.gm-entry-leaving{opacity:0;visibility:hidden;pointer-events:none}
    #gm-entry-overlay *{box-sizing:border-box}
    .gm-entry-frame{position:relative;width:min(100vw,480px);min-height:100vh;min-height:100dvh;overflow:auto;background:linear-gradient(180deg,#fff9fb 0%,#fff3f7 70%,#fbdce6 100%);color:#a82d53;box-shadow:0 0 42px rgba(166,56,91,.14);scrollbar-width:none}
    .gm-entry-frame::-webkit-scrollbar{display:none}
    .gm-entry-frame:before,.gm-entry-frame:after{content:"";position:absolute;border-radius:50%;pointer-events:none}
    .gm-entry-frame:before{width:300px;height:300px;left:-190px;top:70px;background:radial-gradient(circle,rgba(252,183,204,.24),rgba(252,183,204,0) 70%)}
    .gm-entry-frame:after{width:360px;height:240px;right:-220px;bottom:90px;background:radial-gradient(circle,rgba(247,157,186,.25),rgba(247,157,186,0) 70%)}
    .gm-entry-content{position:relative;z-index:1;min-height:100dvh;padding:calc(22px + env(safe-area-inset-top)) 24px calc(18px + env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;text-align:center}
    .gm-brand-mark{width:116px;height:116px;filter:drop-shadow(0 8px 16px rgba(214,73,115,.10))}
    .gm-brand-title{margin:-2px 0 4px;font-size:clamp(42px,12vw,62px);line-height:1;font-weight:600;letter-spacing:-.045em;background:linear-gradient(90deg,#e52866 0%,#f78aa5 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
    .gm-brand-subtitle{margin:6px 0 2px;font-size:clamp(14px,4vw,18px);line-height:1.45;font-weight:600;letter-spacing:.115em;color:#ad4562;text-transform:uppercase}
    .gm-heart-divider{display:flex;align-items:center;gap:12px;margin:9px 0 14px;color:#f06e94}.gm-heart-divider:before,.gm-heart-divider:after{content:"";width:58px;height:1px;background:#efb6c6}.gm-heart-divider span{font-size:18px}
    .gm-hero-art{width:min(76vw,330px);aspect-ratio:1/1;margin:-2px 0 8px;border-radius:50%;background:radial-gradient(circle at 50% 42%,#fffafd 0%,#ffe7ef 64%,rgba(255,231,239,0) 72%);filter:drop-shadow(0 14px 22px rgba(210,76,115,.10))}
    .gm-support-title{margin:2px 0 12px;font-size:clamp(23px,6.5vw,31px);line-height:1.25;font-weight:600;color:#e43a6a}
    .gm-feature-row{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:0 0 18px}
    .gm-feature{position:relative;padding:4px 5px 0;color:#b94667;font-size:12px;line-height:1.25;font-weight:500}.gm-feature+.gm-feature:before{content:"";position:absolute;left:0;top:12px;bottom:2px;width:1px;background:#efc4d0}
    .gm-feature-icon{width:56px;height:56px;margin:0 auto 6px;border:1.7px solid #ee668b;border-radius:50%;display:grid;place-items:center;color:#e94673;background:rgba(255,255,255,.38)}
    .gm-feature-icon svg{width:31px;height:31px;stroke:currentColor;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .gm-entry-action{width:100%;min-height:64px;border:0;border-radius:999px;background:linear-gradient(90deg,#e62f67 0%,#ff7f89 100%);color:white;font-size:clamp(22px,6vw,29px);font-weight:400;box-shadow:0 12px 24px rgba(227,47,103,.24);cursor:pointer;transition:transform .16s ease,filter .16s ease}
    .gm-entry-action:active{transform:scale(.985);filter:brightness(.98)}
    .gm-entry-login{margin:13px 0 0;border:0;background:transparent;color:#983851;font-size:clamp(16px,4.5vw,20px);cursor:pointer}.gm-entry-login strong{color:#e64a72;font-weight:600}
    .gm-entry-credit{margin:auto 0 0;padding-top:14px;font-size:13px;line-height:1.2;color:#d47790;white-space:nowrap}
    .gm-bottom-wave{position:absolute;left:0;right:0;bottom:0;height:115px;z-index:0;pointer-events:none;opacity:.9}
    @media (max-height:720px){.gm-entry-content{padding-top:calc(12px + env(safe-area-inset-top));padding-bottom:calc(10px + env(safe-area-inset-bottom))}.gm-brand-mark{width:88px;height:88px}.gm-brand-title{font-size:42px}.gm-brand-subtitle{font-size:13px}.gm-heart-divider{margin:5px 0 5px}.gm-hero-art{width:min(54vw,235px);margin:-4px 0 0}.gm-support-title{font-size:22px;margin-bottom:6px}.gm-feature-icon{width:45px;height:45px}.gm-feature-icon svg{width:26px;height:26px}.gm-feature{font-size:10px}.gm-feature-row{margin-bottom:10px}.gm-entry-action{min-height:54px;font-size:22px}.gm-entry-login{margin-top:8px;font-size:16px}.gm-entry-credit{padding-top:8px;font-size:11px}}
    @media (min-width:700px){#gm-entry-overlay{align-items:center;padding:18px}.gm-entry-frame{min-height:min(96dvh,900px);height:min(96dvh,900px);border-radius:30px}.gm-entry-content{min-height:100%;padding-top:28px}}
    @media (prefers-reduced-motion:reduce){#gm-entry-overlay,.gm-entry-action{transition:none}}
  `;
  document.head.appendChild(style);

  var overlay = document.createElement('section');
  overlay.id = 'gm-entry-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.setAttribute('aria-label','Tela de entrada do GestaMed');
  overlay.innerHTML = `
    <div class="gm-entry-frame">
      <svg class="gm-bottom-wave" viewBox="0 0 480 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 58C82 18 137 112 238 68c94-41 135-7 242-38v90H0Z" fill="#f8c8d7" opacity=".48"/><path d="M0 85c93-31 154 44 267 0 78-30 144-14 213-8v43H0Z" fill="#ef9fba" opacity=".24"/></svg>
      <div class="gm-entry-content">
        <svg class="gm-brand-mark" viewBox="0 0 180 180" aria-label="Símbolo GestaMed">
          <defs><linearGradient id="gmp" x1="0" x2="1"><stop stop-color="#e52f68"/><stop offset="1" stop-color="#f495a8"/></linearGradient><linearGradient id="gmg" x1="0" x2="1"><stop stop-color="#86bd3c"/><stop offset="1" stop-color="#58a922"/></linearGradient></defs>
          <path d="M90 21c-29 3-47 28-45 59 2 26 18 43 31 54 9 8 10 14 19 21 19-4 35-17 43-33 8-16 8-34 1-50-7-17-22-31-40-36" fill="none" stroke="url(#gmp)" stroke-width="8" stroke-linecap="round"/>
          <path d="M97 37c11 0 21 5 26 13-8 2-17 0-24-5M79 64c11 7 17 17 18 31-11-10-18-20-18-31M98 95c16 7 24 19 24 37-15 8-31 8-44 0" fill="none" stroke="url(#gmp)" stroke-width="6" stroke-linecap="round"/>
          <path d="M126 86c9-18 24-22 37-19-1 15-12 27-33 27M131 91c15-8 30-4 40 6-9 13-25 17-40 6" fill="url(#gmg)"/>
          <path d="M128 89c4 8 5 16 4 27" fill="none" stroke="#61a92f" stroke-width="4" stroke-linecap="round"/>
        </svg>
        <h1 class="gm-brand-title">GestaMed</h1>
        <p class="gm-brand-subtitle">Apoio clínico para<br>profissionais e estudantes.</p>
        <div class="gm-heart-divider" aria-hidden="true"><span>♥</span></div>
        <svg class="gm-hero-art" viewBox="0 0 360 360" aria-label="Ilustração de gestante">
          <defs><linearGradient id="skin" x1="0" x2="1"><stop stop-color="#ffd9c8"/><stop offset="1" stop-color="#f5b8a4"/></linearGradient><linearGradient id="dress" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffd8e4"/><stop offset="1" stop-color="#f09ab7"/></linearGradient><linearGradient id="hair" x1="0" x2="1"><stop stop-color="#6f281b"/><stop offset="1" stop-color="#a44b35"/></linearGradient></defs>
          <circle cx="180" cy="178" r="145" fill="#ffe9f0" opacity=".62"/>
          <g fill="none" stroke="#f39ab5" stroke-width="3" opacity=".8"><path d="M62 254c17-45 30-58 49-83M79 226l-19-15M87 210l20-16M68 245l-17-3M281 254c-17-45-30-58-49-83M264 226l19-15M256 210l-20-16M275 245l17-3"/></g>
          <g fill="#f7b2c6" opacity=".9"><ellipse cx="59" cy="208" rx="10" ry="18" transform="rotate(-40 59 208)"/><ellipse cx="103" cy="185" rx="9" ry="16" transform="rotate(42 103 185)"/><ellipse cx="52" cy="243" rx="9" ry="15" transform="rotate(-75 52 243)"/><ellipse cx="301" cy="208" rx="10" ry="18" transform="rotate(40 301 208)"/><ellipse cx="257" cy="185" rx="9" ry="16" transform="rotate(-42 257 185)"/><ellipse cx="308" cy="243" rx="9" ry="15" transform="rotate(75 308 243)"/></g>
          <path d="M132 77c-32 19-38 57-22 88 13 25 8 55 2 86 26 9 50 1 62-15 18-25 13-64 2-93-10-28-6-53 18-72-22-9-44-7-62 6Z" fill="url(#hair)"/>
          <ellipse cx="176" cy="98" rx="41" ry="47" fill="url(#skin)"/>
          <path d="M143 91c16-9 33-24 51-18 11 4 19 12 22 22-27 4-49-4-73-4Z" fill="url(#hair)"/>
          <path d="M170 136c-45 6-68 46-65 91 4 56 41 82 84 80 52-2 83-34 77-83-5-43-27-79-69-88Z" fill="url(#dress)"/>
          <path d="M115 174c18-17 46-25 70-20 36 8 59 42 63 78 3 27-9 54-34 68-8-52-26-94-99-126Z" fill="#f8b9cd" opacity=".7"/>
          <ellipse cx="194" cy="227" rx="62" ry="72" fill="#ffd0dd" opacity=".72"/>
          <path d="M120 167c20 16 43 18 66 7M209 155c17 8 29 22 38 42" fill="none" stroke="#fff1f5" stroke-width="5" stroke-linecap="round"/>
          <path d="M117 181c19 20 42 33 70 39" fill="none" stroke="url(#skin)" stroke-width="17" stroke-linecap="round"/>
          <path d="M237 193c-6 31-15 55-32 78" fill="none" stroke="url(#skin)" stroke-width="17" stroke-linecap="round"/>
          <ellipse cx="190" cy="219" rx="18" ry="7" fill="#f1a78f" transform="rotate(12 190 219)"/>
          <ellipse cx="201" cy="270" rx="19" ry="7" fill="#eda18a" transform="rotate(-12 201 270)"/>
          <path d="M165 104c8 7 20 7 28 1" fill="none" stroke="#b86158" stroke-width="3" stroke-linecap="round"/>
          <path d="M154 91c6-2 12-1 17 2M194 92c5-2 10-1 14 1" fill="none" stroke="#7a382d" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M176 96c-1 8-2 12-5 17 4 2 8 2 12 0" fill="none" stroke="#d88f7e" stroke-width="2" stroke-linecap="round"/>
          <path d="M200 239c8 0 14 5 14 12 0 12-14 20-14 20s-14-8-14-20c0-7 6-12 14-12Z" fill="#fff" opacity=".9"/>
        </svg>
        <h2 class="gm-support-title">Seu apoio prático<br>na rotina da obstetrícia.</h2>
        <div class="gm-feature-row">
          <div class="gm-feature"><div class="gm-feature-icon"><svg viewBox="0 0 32 32"><rect x="5" y="7" width="22" height="20" rx="2"/><path d="M10 4v6M22 4v6M5 13h22M10 18h4M18 18h4M10 23h4"/></svg></div>Protocolos<br>e condutas</div>
          <div class="gm-feature"><div class="gm-feature-icon"><svg viewBox="0 0 32 32"><path d="M16 27S5 21 5 12a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 9-11 15-11 15Z"/><path d="M23 23l4 4M26 21l2 2"/></svg></div>Conteúdos<br>confiáveis</div>
          <div class="gm-feature"><div class="gm-feature-icon"><svg viewBox="0 0 32 32"><path d="M4 13 16 6l12 7-12 7Z"/><path d="M9 17v6c4 3 10 3 14 0v-6M28 13v9"/></svg></div>Ferramentas<br>para estudo</div>
        </div>
        <button class="gm-entry-action" type="button">Começar agora</button>
        <button class="gm-entry-login" type="button">Já tem uma conta? <strong>Entrar</strong></button>
        <p class="gm-entry-credit">By Tiago Pereira de Albuquerque</p>
      </div>
    </div>`;

  function openApp(){
    if (overlay.classList.contains('gm-entry-leaving')) return;
    overlay.classList.add('gm-entry-leaving');
    root.classList.remove('gm-entry-open');
    window.setTimeout(function(){ if (overlay.parentNode) overlay.parentNode.removeChild(overlay); },320);
  }
  overlay.querySelector('.gm-entry-action').addEventListener('click',openApp);
  overlay.querySelector('.gm-entry-login').addEventListener('click',openApp);
  root.classList.add('gm-entry-open');
  body.appendChild(overlay);
})();
