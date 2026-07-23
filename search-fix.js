(function () {
  'use strict';

  var FIELD_SELECTOR = [
    'input[placeholder*="Pesquisar medicamento"]',
    'input[placeholder*="princípio ativo"]',
    'input[placeholder*="principio ativo"]',
    'input[type="search"]'
  ].join(', ');

  var CARD_SELECTOR = [
    '.medicine-card',
    '.med-card',
    '.medicamento-card',
    '.medication-card',
    '.drug-card',
    '[data-med-id]',
    '[data-medicine-id]'
  ].join(', ');

  var internalEvent = false;
  var cachedDataset = null;

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function locateField() {
    return document.querySelector(FIELD_SELECTOR);
  }

  function locateBar(field) {
    return field.closest('form, .search-box, .search-container, .search-wrap, .search-bar') || field.parentElement;
  }

  function ensureStyle() {
    if (document.getElementById('gmMedicationSearchV112Style')) return;
    var style = document.createElement('style');
    style.id = 'gmMedicationSearchV112Style';
    style.textContent = [
      '.gm-med-search-bar{position:relative!important;pointer-events:auto!important}',
      '.gm-med-search-input{pointer-events:auto!important;touch-action:manipulation!important;position:relative!important;z-index:2!important;padding-right:58px!important}',
      '.gm-med-search-button{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;width:42px!important;height:42px!important;border:0!important;border-radius:12px!important;background:transparent!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:24px!important;line-height:1!important;z-index:6!important;cursor:pointer!important;pointer-events:auto!important;-webkit-tap-highlight-color:transparent!important}',
      '.gm-med-search-fallback{margin:10px 0 18px;padding:10px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;box-shadow:0 8px 22px rgba(15,23,42,.06)}',
      '.gm-med-search-fallback[hidden]{display:none!important}',
      '.gm-med-search-fallback-title{font-size:12px;font-weight:900;color:#0f172a;margin-bottom:7px}',
      '.gm-med-result{padding:10px 11px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc}',
      '.gm-med-result+.gm-med-result{margin-top:7px}',
      '.gm-med-result-name{font-size:13px;font-weight:900;color:#0f172a}',
      '.gm-med-result-status{display:inline-block;margin-top:4px;padding:3px 7px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:10px;font-weight:800}',
      '.gm-med-result-note{margin-top:5px;color:#475569;font-size:11px;line-height:1.4}',
      '.gm-med-search-empty{padding:12px;color:#64748b;font-size:12px;text-align:center}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureButton(field, bar) {
    bar.classList.add('gm-med-search-bar');
    field.classList.add('gm-med-search-input');
    field.disabled = false;
    field.readOnly = false;
    field.removeAttribute('disabled');
    field.removeAttribute('readonly');
    field.setAttribute('autocomplete', 'off');
    field.setAttribute('enterkeyhint', 'search');

    var button = bar.querySelector('.gm-med-search-button');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'gm-med-search-button';
      button.setAttribute('aria-label', 'Pesquisar medicamento');
      button.textContent = '🔎';
      bar.appendChild(button);
    }
    return button;
  }

  function dispatchOriginalSearch(field) {
    internalEvent = true;
    try {
      ['input', 'keyup', 'change', 'search'].forEach(function (type) {
        var event;
        try {
          event = type === 'keyup'
            ? new KeyboardEvent(type, { bubbles: true, key: 'Enter' })
            : new Event(type, { bubbles: true });
        } catch (error) {
          event = document.createEvent('Event');
          event.initEvent(type, true, false);
        }
        field.dispatchEvent(event);
      });
      if (typeof field.oninput === 'function') field.oninput.call(field);
      if (typeof field.onchange === 'function') field.onchange.call(field);
    } finally {
      internalEvent = false;
    }
  }

  function findMedicineCards() {
    return Array.prototype.slice.call(document.querySelectorAll(CARD_SELECTOR)).filter(function (card) {
      return !card.closest('#gmMedicationFallbackResults');
    });
  }

  function filterExistingCards(query) {
    var cards = findMedicineCards();
    if (!cards.length) return { cards: 0, matches: 0 };

    var normalizedQuery = normalize(query);
    var matches = 0;
    cards.forEach(function (card) {
      if (!Object.prototype.hasOwnProperty.call(card.dataset, 'gmOriginalDisplay')) {
        card.dataset.gmOriginalDisplay = card.style.display || '';
      }
      var visible = !normalizedQuery || normalize(card.textContent).indexOf(normalizedQuery) !== -1;
      card.style.display = visible ? card.dataset.gmOriginalDisplay : 'none';
      if (visible && normalizedQuery) matches += 1;
    });
    return { cards: cards.length, matches: matches };
  }

  function flattenObject(item) {
    if (!item || typeof item !== 'object') return '';
    var values = [];
    Object.keys(item).slice(0, 60).forEach(function (key) {
      var value;
      try { value = item[key]; } catch (error) { return; }
      if (value == null) return;
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') values.push(String(value));
    });
    return values.join(' ');
  }

  function scoreArray(array) {
    if (!Array.isArray(array) || array.length < 30) return -1;
    var sample = array.slice(0, 12).filter(function (item) { return item && typeof item === 'object'; });
    if (!sample.length) return -1;
    var keys = normalize(sample.map(function (item) { return Object.keys(item).join(' '); }).join(' '));
    var score = Math.min(array.length, 2000) / 100;
    if (/nome|name|medicamento|medicine|principio|ativo|drug/.test(keys)) score += 30;
    if (/categoria|classificacao|risco|status|gestacao|gravidez|seguranca|permitido|pode/.test(keys)) score += 20;
    if (/observacao|descricao|classe|recomendacao|nota/.test(keys)) score += 10;
    return score;
  }

  function discoverDataset() {
    if (cachedDataset) return cachedDataset;
    var candidates = [];
    var seen = typeof WeakSet === 'function' ? new WeakSet() : null;

    function inspect(value, label, depth) {
      if (!value || depth > 3 || typeof value !== 'object') return;
      if (seen) {
        if (seen.has(value)) return;
        seen.add(value);
      }
      if (Array.isArray(value)) {
        var score = scoreArray(value);
        if (score >= 0) candidates.push({ value: value, score: score, label: label });
        return;
      }
      if (value.nodeType || value === window || value === document) return;
      var keys;
      try { keys = Object.keys(value); } catch (error) { return; }
      keys.slice(0, 100).forEach(function (key) {
        if (!/med|drug|data|base|record|item|list|catalog|db/i.test(key) && depth > 0) return;
        var child;
        try { child = value[key]; } catch (error) { return; }
        inspect(child, label + '.' + key, depth + 1);
      });
    }

    [
      ['GestMedApp', window.GestMedApp],
      ['gestMedApp', window.gestMedApp],
      ['MEDICAMENTOS', window.MEDICAMENTOS],
      ['medicamentos', window.medicamentos],
      ['MEDICINES', window.MEDICINES],
      ['medicines', window.medicines],
      ['DATA', window.DATA],
      ['data', window.data],
      ['APP', window.APP],
      ['app', window.app]
    ].forEach(function (entry) { inspect(entry[1], entry[0], 0); });

    try {
      Object.keys(window).filter(function (key) {
        return /med|drug|medicine|medicamento|database|records/i.test(key);
      }).slice(0, 80).forEach(function (key) {
        var value;
        try { value = window[key]; } catch (error) { return; }
        inspect(value, 'window.' + key, 0);
      });
    } catch (error) {}

    candidates.sort(function (a, b) { return b.score - a.score; });
    cachedDataset = candidates.length ? candidates[0].value : null;
    return cachedDataset;
  }

  function getFirst(item, keys) {
    for (var i = 0; i < keys.length; i += 1) {
      var value = item && item[keys[i]];
      if (value != null && String(value).trim()) return String(value).trim();
    }
    return '';
  }

  function locateFallbackHost(field, bar) {
    var existing = document.getElementById('gmMedicationFallbackResults');
    if (existing) return existing;
    var box = document.createElement('div');
    box.id = 'gmMedicationFallbackResults';
    box.className = 'gm-med-search-fallback';
    box.hidden = true;
    if (bar.nextSibling) bar.parentNode.insertBefore(box, bar.nextSibling);
    else bar.parentNode.appendChild(box);
    return box;
  }

  function renderFallback(field, bar, query) {
    var box = locateFallbackHost(field, bar);
    var normalizedQuery = normalize(query);
    if (normalizedQuery.length < 2) {
      box.hidden = true;
      box.replaceChildren();
      return 0;
    }

    var dataset = discoverDataset();
    if (!dataset) {
      box.hidden = true;
      return 0;
    }

    var matches = dataset.filter(function (item) {
      return normalize(flattenObject(item)).indexOf(normalizedQuery) !== -1;
    }).slice(0, 40);

    box.replaceChildren();
    box.hidden = false;

    var title = document.createElement('div');
    title.className = 'gm-med-search-fallback-title';
    title.textContent = matches.length ? 'Resultados da pesquisa' : 'Nenhum medicamento encontrado';
    box.appendChild(title);

    if (!matches.length) return 0;

    matches.forEach(function (item) {
      var name = getFirst(item, ['nome', 'name', 'medicamento', 'medicine', 'principioAtivo', 'principio_ativo', 'principio ativo', 'titulo', 'title']) || 'Medicamento';
      var status = getFirst(item, ['classificacao', 'categoria', 'status', 'risco', 'gestacao', 'gravidez', 'seguranca', 'pode', 'permitido', 'recomendacao']);
      var note = getFirst(item, ['observacao', 'observações', 'observacoes', 'descricao', 'descrição', 'nota', 'classe', 'detalhes']);

      var card = document.createElement('div');
      card.className = 'gm-med-result';
      var nameEl = document.createElement('div');
      nameEl.className = 'gm-med-result-name';
      nameEl.textContent = name;
      card.appendChild(nameEl);
      if (status) {
        var statusEl = document.createElement('div');
        statusEl.className = 'gm-med-result-status';
        statusEl.textContent = status;
        card.appendChild(statusEl);
      }
      if (note) {
        var noteEl = document.createElement('div');
        noteEl.className = 'gm-med-result-note';
        noteEl.textContent = note;
        card.appendChild(noteEl);
      }
      box.appendChild(card);
    });
    return matches.length;
  }

  function runSearch(field, bar, forceDispatch) {
    var query = field.value || '';
    if (forceDispatch) dispatchOriginalSearch(field);

    window.setTimeout(function () {
      var domResult = filterExistingCards(query);
      if (normalize(query).length < 2) {
        var clearBox = document.getElementById('gmMedicationFallbackResults');
        if (clearBox) {
          clearBox.hidden = true;
          clearBox.replaceChildren();
        }
        return;
      }
      if (domResult.matches > 0) {
        var box = document.getElementById('gmMedicationFallbackResults');
        if (box) box.hidden = true;
        return;
      }
      renderFallback(field, bar, query);
    }, 120);
  }

  function activate() {
    var field = locateField();
    if (!field) return false;
    ensureStyle();
    var bar = locateBar(field);
    if (!bar) return false;
    var button = ensureButton(field, bar);

    if (field.dataset.gmMedicationSearchV112 === '1') return true;
    field.dataset.gmMedicationSearchV112 = '1';

    field.addEventListener('input', function () {
      if (internalEvent) return;
      runSearch(field, bar, false);
    });
    field.addEventListener('search', function () {
      if (internalEvent) return;
      runSearch(field, bar, false);
    });
    field.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        runSearch(field, bar, true);
      }
    });

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      field.focus();
      runSearch(field, bar, true);
    });
    button.addEventListener('touchend', function () {
      field.focus();
    }, { passive: true });

    bar.addEventListener('click', function (event) {
      if (event.target === field || event.target === button) return;
      field.focus();
    });

    return true;
  }

  function init() {
    if (activate()) return;
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (activate() || attempts >= 40) window.clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
