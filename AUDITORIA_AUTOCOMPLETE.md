# Auditoria autocomplete

## const elSearch
```js
 que é monitorado de perto pela equipe obstétrica.",
      "materna": "Gestação chamada de 'pós-termo tardia'. É esperado acompanhamento mais próximo, com monitorização fetal e avaliação de indução do parto conforme protocolo institucional."
    },
    "42": {
      "comparacao": "uma abóbora grande",
      "comprimento": "cerca de 51,5 cm",
      "peso": "cerca de 3685 g",
      "desenvolvimento": "Gestação pós-termo (≥42 semanas) — requer avaliação obstétrica prioritária, pela associação com maior risco de insuficiência placentária e complicações no parto.",
      "materna": "A maioria dos serviços indica indução do trabalho de parto antes de completar 42 semanas, exatamente para reduzir esses riscos."
    }
  };
  
  "use strict";

  // ==========================================================
  // ELEMENTOS DA PÁGINA
  // ==========================================================
  const elSearch = document.getElementById("search");
  const elSuggestions = document.getElementById("suggestions");
  const elCount = document.getElementById("count");
  const elMedsIntroCard = document.getElementById("medsIntroCard");
  const elResultsSectionTitle = document.getElementById("resultsSectionTitle");
  const elCards = document.getElementById("cards");
  const elModal = document.getElementById("modal");
  const elDetail = document.getElementById("detail");
  const elTotalBadge = document.getElementById("totalBadge");
  const elBaseBadge = document.getElementById("baseBadge");
  const elPendingBadge = document.getElementById("pendingBadge");

  // ==========================================================
  // CARREGAMENTO DOS DADOS
  // ==========================================================
  // GESTMED_DATA e GESTMED_META vêm de data.js (carregado antes deste
  // script no index.html). Caso não estejam definidos, o app avisa
  // claramente em vez de falhar silenciosamente.
  const RAW_DATA = typeof GESTMED_DATA !== "undefined" ? GESTMED_DATA : null;
  const META = typeof GESTMED_META !== "undefined" ? GESTMED_META : null;

  // ==========================================================
  // UTILITÁRIOS DE TEXTO
  // ==========================================================
  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // ==========================================================
  // CLASSIFICAÇÃO DE RISCO -> CLASSE VISUAL (BADGE)
  // ==========================================================
  // Interpreta o texto livre de qualquer campo de classificação
  // (decisao_resumida_gestacao, primeiro_trimestre, segundo_trimestre,
  // terceiro_trimestre, lactacao) e retorna uma categoria fixa para
  // estilização. A ordem dos testes importa: verificamos primeiro os
  // sinais de "pendente/incerto", depois os mais restritivos, e só por
  // último os favoráveis. Qualquer texto não reconhecido cai em
  // "pendente" por padrão — nunca em uma categoria que pareça segura.
  function classifyRisk(text) {
    const t = normalizeText(text);

```

## const elSuggestions
```js
     "materna": "Gestação chamada de 'pós-termo tardia'. É esperado acompanhamento mais próximo, com monitorização fetal e avaliação de indução do parto conforme protocolo institucional."
    },
    "42": {
      "comparacao": "uma abóbora grande",
      "comprimento": "cerca de 51,5 cm",
      "peso": "cerca de 3685 g",
      "desenvolvimento": "Gestação pós-termo (≥42 semanas) — requer avaliação obstétrica prioritária, pela associação com maior risco de insuficiência placentária e complicações no parto.",
      "materna": "A maioria dos serviços indica indução do trabalho de parto antes de completar 42 semanas, exatamente para reduzir esses riscos."
    }
  };
  
  "use strict";

  // ==========================================================
  // ELEMENTOS DA PÁGINA
  // ==========================================================
  const elSearch = document.getElementById("search");
  const elSuggestions = document.getElementById("suggestions");
  const elCount = document.getElementById("count");
  const elMedsIntroCard = document.getElementById("medsIntroCard");
  const elResultsSectionTitle = document.getElementById("resultsSectionTitle");
  const elCards = document.getElementById("cards");
  const elModal = document.getElementById("modal");
  const elDetail = document.getElementById("detail");
  const elTotalBadge = document.getElementById("totalBadge");
  const elBaseBadge = document.getElementById("baseBadge");
  const elPendingBadge = document.getElementById("pendingBadge");

  // ==========================================================
  // CARREGAMENTO DOS DADOS
  // ==========================================================
  // GESTMED_DATA e GESTMED_META vêm de data.js (carregado antes deste
  // script no index.html). Caso não estejam definidos, o app avisa
  // claramente em vez de falhar silenciosamente.
  const RAW_DATA = typeof GESTMED_DATA !== "undefined" ? GESTMED_DATA : null;
  const META = typeof GESTMED_META !== "undefined" ? GESTMED_META : null;

  // ==========================================================
  // UTILITÁRIOS DE TEXTO
  // ==========================================================
  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // ==========================================================
  // CLASSIFICAÇÃO DE RISCO -> CLASSE VISUAL (BADGE)
  // ==========================================================
  // Interpreta o texto livre de qualquer campo de classificação
  // (decisao_resumida_gestacao, primeiro_trimestre, segundo_trimestre,
  // terceiro_trimestre, lactacao) e retorna uma categoria fixa para
  // estilização. A ordem dos testes importa: verificamos primeiro os
  // sinais de "pendente/incerto", depois os mais restritivos, e só por
  // último os favoráveis. Qualquer texto não reconhecido cai em
  // "pendente" por padrão — nunca em uma categoria que pareça segura.
  function classifyRisk(text) {
    const t = normalizeText(text);

    if (!t) return "pendente";

    if (
      /pende
```

## function renderSuggestions
```js
===============================
  function searchableText(med) {
    return normalizeText(
      [
        med.principio_ativo,
        med.principio_ativo_base,
        med.sinonimos_nomes_comerciais,
        med.classe_farmacologica,
        med.indicacoes_contexto,
      ].join(" ")
    );
  }

  function applyFilters() {
    if (!RAW_DATA) return [];

    const term = normalizeText(elSearch.value.trim());

    return RAW_DATA.filter(function (med) {
      return !term || searchableText(med).includes(term);
    });
  }

  // ==========================================================
  // RENDERIZAÇÃO — LISTA
  // ==========================================================
  // ==========================================================
  // RENDERIZAÇÃO — DROPDOWN DE SUGESTÕES (AUTOCOMPLETE)
  // ==========================================================
  const MAX_SUGGESTIONS = 8;

  function renderSuggestions() {
    if (!RAW_DATA) return;

    const term = elSearch.value.trim();
    if (!term) {
      elSuggestions.classList.remove("open");
      elSuggestions.innerHTML = "";
      return;
    }

    const matches = applyFilters();

    if (matches.length === 0) {
      elSuggestions.innerHTML = '<div class="suggestion-empty">Nenhum medicamento encontrado.</div>';
      elSuggestions.classList.add("open");
      return;
    }

    const shown = matches.slice(0, MAX_SUGGESTIONS);
    const period = "todos";

    elSuggestions.innerHTML =
      shown
        .map(function (med) {
          const fieldValue = fieldForPeriod(med, period);
          const slug = classifyRisk(fieldValue);
          const derivativeFlag = isDerivative(med);
          return `
            <div class="suggestion-item" onclick="GestMedApp.selectSuggestion(${med.id})">
              <div>
                <div class="suggestion-name">${escapeHtml(med.principio_ativo)}${
            derivativeFlag ? ' <span class="derivative-tag">forma derivada</span>' : ""
          }</div>
                <div class="suggestion-class">${escapeHtml(med.classe_farmacologica)}</div>
              </div>
              <span class="badge small ${slug}">${escapeHtml(RISK_LABELS[slug])}</span>
            </div>
          `;
        })
        .join("") +
      (matches.length > MAX_SUGGESTIONS
        ? `<div class="suggestion-more">+ ${matches.length - MAX_SUGGESTIONS} resultado(s). Refine a busca para ver mais.</div>`
        : "");

    elSuggestions.classList.add("open");
  }

  function selectSuggestion(id) {
    elSuggestions.classList.remove("open");
    openMed(id);
  }

  function render() {
    if (!RAW_DATA) {
      if (elMedsIntroCard) elMedsIntroCard.style.display = "none";
      if (elResultsSectionTitle) elResultsSectionTitle.style.display = "flex";
      elCards.innerHTML =
        '<div class="empty">Erro ao carregar a base de dados (data.js). Verifique se o arquivo está presente na mesma pasta que index.html.</div>';
      elCount.textContent = "";
      return;
    }

    const term = elSearch.value.trim();

    // Sem busca ativa: não renderiza a lista completa (1.500 c
```

## elSearch.addEventListener
```js
á que os dois módulos usam a mesma base de dados da paciente.
    gaImcPesoVal = null;
    gaImcAlturaVal = null;
    const elGaImcPeso = document.getElementById("gaImcPeso");
    const elGaImcAltura = document.getElementById("gaImcAltura");
    if (elGaImcPeso) elGaImcPeso.value = "";
    if (elGaImcAltura) elGaImcAltura.value = "";
  }

  function init() {
    if (RAW_DATA && elTotalBadge) {
      elTotalBadge.textContent = RAW_DATA.length.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elBaseBadge) {
      const baseCount = RAW_DATA.filter(function (m) {
        return !isDerivative(m);
      }).length;
      elBaseBadge.textContent = baseCount.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Ex
```
```js
l = null;
    const elGaImcPeso = document.getElementById("gaImcPeso");
    const elGaImcAltura = document.getElementById("gaImcAltura");
    if (elGaImcPeso) elGaImcPeso.value = "";
    if (elGaImcAltura) elGaImcAltura.value = "";
  }

  function init() {
    if (RAW_DATA && elTotalBadge) {
      elTotalBadge.textContent = RAW_DATA.length.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elBaseBadge) {
      const baseCount = RAW_DATA.filter(function (m) {
        return !isDerivative(m);
      }).length;
      elBaseBadge.textContent = baseCount.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
 
```

## document.addEventListener
```js
ntById("gaImcAltura");
    if (elGaImcPeso) elGaImcPeso.value = "";
    if (elGaImcAltura) elGaImcAltura.value = "";
  }

  function init() {
    if (RAW_DATA && elTotalBadge) {
      elTotalBadge.textContent = RAW_DATA.length.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elBaseBadge) {
      const baseCount = RAW_DATA.filter(function (m) {
        return !isDerivative(m);
      }).length;
      elBaseBadge.textContent = baseCount.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
    openMed: openMed,
    closeModal: closeModal,
    fecharModalAoClicarFora: fecharModalAoClicarFora,
    forceIni
```
```js
 RAW_DATA.length.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elBaseBadge) {
      const baseCount = RAW_DATA.filter(function (m) {
        return !isDerivative(m);
      }).length;
      elBaseBadge.textContent = baseCount.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
    openMed: openMed,
    closeModal: closeModal,
    fecharModalAoClicarFora: fecharModalAoClicarFora,
    forceInit: initSafe,
    selectSuggestion: selectSuggestion,
    openGaCalculator: openGaCalculator,
    closeGaCalculator: closeGaCalculator,
    clearGaCalculator: clearGaCalculator,
    fecharGaModalAoClicarFora: fe
```
```js
toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
    openMed: openMed,
    closeModal: closeModal,
    fecharModalAoClicarFora: fecharModalAoClicarFora,
    forceInit: initSafe,
    selectSuggestion: selectSuggestion,
    openGaCalculator: openGaCalculator,
    closeGaCalculator: closeGaCalculator,
    clearGaCalculator: clearGaCalculator,
    fecharGaModalAoClicarFora: fecharGaModalAoClicarFora,
    switchGaTab: switchGaTab,
    onGaImcInputsChange: onGaImcInputsChange,
    calcGaDum: calcGaDum,
    calcGaUs: calcGaUs,
    calcGanhoPeso: calcGanhoPeso,
    openCategoryModal: openCategoryModal,
   
```
```js
ndição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><h3>Referências utilizadas</h3><div class="conduta-source">${esc(p.fonte)}</div><div class="conduta-source">Versão clínica do módulo: 22/07/2026 — prescrições reorganizadas conforme a sequência hospitalar informada. Revisão profissional local obrigatória antes de uso assistencial.</div></div>`
    };
    root.innerHTML=`<button class="conduta-back" onclick="GestMedCondutas.list()">← Voltar às patologias</button><div class="conduta-detail-title">${esc(p.nome)}</div><div class="conduta-detail-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}" style="margin:0
```

## window.addEventListener
```js
dyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
    openMed: openMed,
    closeModal: closeModal,
    fecharModalAoClicarFora: fecharModalAoClicarFora,
    forceInit: initSafe,
    selectSuggestion: selectSuggestion,
    openGaCalculator: openGaCalculator,
    closeGaCalculator: closeGaCalculator,
    clearGaCalculator: clearGaCalculator,
    fecharGaModalAoClicarFora: fecharGaModalAoClicarFora,
    switchGaTab: switchGaTab,
    onGaImcInputsChange: onGaImcInputsChange,
    calcGaDum: calcGaDum,
    calcGaUs: calcGaUs,
    calcGanhoPeso: calcGanhoPeso,
    openCategoryModal: openCategoryModal,
    closeCategoryModal: closeCategoryModal,
    fecharCategoryModalAoClicarFora: fecharCategoryModalAoClicarFora,
    openExamesModule: openExamesModule,
    closeExamesModule: closeExamesModule,
    fecharExamesModalAoClicarFora: fecharExamesModalAoClicarFora,
    openPrescricoesModule: openPrescricoesModule,
    closePrescricoesModule: closePrescricoesModule,
    fecharPrescricoesModalAoClicarFora: fecharPrescricoesModalAoClicarFora,
    crescimentoIrPara: crescimentoIrPara,
    crescimentoNav: crescimentoNav,
    openGanhoPesoModule: openGanhoPesoModule,
    closeGanhoPesoModule: closeGanhoPesoModule,
    clearGanhoPesoModule: clearGanhoPesoModule,
    fecharGanhoPesoModalAoClicarFora: fecharGanhoPesoModalAoClicarFora,
    openDmgModule: openDmgModule,
    closeDmgModule: closeDmgModule,
    clearDmgModule: clearDmgModule,
    fecharDmgModalAoClicarFora: fecharDmgModalAoClicarFora,
    abrirDmgResultado: abrirDmgResultado,
    closeDmgResultModal: closeDmgResultModal,
    fecharDmgResultModalAoClicarFora: fecharDmgResultModalAoClicarFora,
  };
})();

  </script>
  <script>
    // Watchdog: verificação final de segurança. Se por qualquer motivo o app
    // não tiver inicializado até aqui (ex.: erro de timing em algum visualizador
    // sandboxed), tenta de novo manualmente e, falhando, 
```
