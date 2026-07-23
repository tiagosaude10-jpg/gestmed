(function () {
  'use strict';

  var VERSION = '2026.07.23.113';
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
  var datasetCache = null;
  var datasetPromise = null;
  var searchTimer = null;

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
    if (document.getElementById('gmMedicationSearchV113Style')) return;
    var style = document.createElement('style');
    style.id = 'gmMedicationSearchV113Style';
    style.textContent = [
      '.gm-med-search-bar{position:relative!important;pointer-events:auto!important}',
      '.gm-med-search-input{pointer-events:auto!important;touch-action:manipulation!important;position:relative!important;z-index:2!important;padding-right:58px!important}',
      '.gm-med-search-button{position:absolute!important;right:10px!important;top:50%!important;transform:translateY(-50%)!important;width:42px!important;height:42px!important;border:0!important;border-radius:12px!important;background:transparent!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:24px!important;line-height:1!important;z-index:6!important;cursor:pointer!important;pointer-events:auto!important;-webkit-tap-highlight-color:transparent!important}',
      '.gm-med-results{margin:10px 0 18px;padding:10px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;box-shadow:0 8px 22px rgba(15,23,42,.06)}',
      '.gm-med-results[hidden]{display:none!important}',
      '.gm-med-results-title{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;font-weight:900;color:#0f172a;margin-bottom:8px}',
      '.gm-med-results-count{font-size:10px;color:#64748b;font-weight:800}',
      '.gm-med-result{padding:11px 12px;border:1px solid #e2e8f0;border-radius:13px;background:#f8fafc}',
      '.gm-med-result+.gm-med-result{margin-top:8px}',
      '.gm-med-result-name{font-size:14px;font-weight:900;color:#0f172a;line-height:1.25}',
      '.gm-med-result-status{display:inline-block;margin-top:5px;padding:3px 8px;border-radius:999px;background:#e0f2fe;color:#075985;font-size:10px;font-weight:900}',
      '.gm-med-result-grid{margin-top:7px;display:grid;gap:5px}',
      '.gm-med-result-row{font-size:11px;line-height:1.42;color:#475569}',
      '.gm-med-result-row b{color:#1e293b}',
      '.gm-med-search-message{padding:13px 10px;color:#64748b;font-size:12px;line-height:1.45;text-align:center}',
      '.gm-med-search-loading:after{content:"";display:inline-block;width:12px;height:12px;margin-left:7px;border:2px solid #bae6fd;border-top-color:#0891b2;border-radius:50%;vertical-align:-2px;animation:gmMedSpin .7s linear infinite}',
      '@keyframes gmMedSpin{to{transform:rotate(360deg)}}'
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

    var oldButtons = bar.querySelectorAll('.gm-med-search-button');
    for (var i = 1; i < oldButtons.length; i += 1) oldButtons[i].remove();

    var button = oldButtons[0];
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

  function locateResultsHost(field, bar) {
    var existing = document.getElementById('gmMedicationSearchResults');
    if (existing) return existing;
    var box = document.createElement('section');
    box.id = 'gmMedicationSearchResults';
    box.className = 'gm-med-results';
    box.hidden = true;
    box.setAttribute('aria-live', 'polite');
    if (bar.nextSibling) bar.parentNode.insertBefore(box, bar.nextSibling);
    else bar.parentNode.appendChild(box);
    return box;
  }

  function showMessage(box, text, loading) {
    box.hidden = false;
    box.innerHTML = '';
    var message = document.createElement('div');
    message.className = 'gm-med-search-message' + (loading ? ' gm-med-search-loading' : '');
    message.textContent = text;
    box.appendChild(message);
  }

  function hideResults(box) {
    box.hidden = true;
    box.innerHTML = '';
  }

  function findMedicineCards() {
    return Array.prototype.slice.call(document.querySelectorAll(CARD_SELECTOR)).filter(function (card) {
      return !card.closest('#gmMedicationSearchResults');
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

  function primitiveText(value) {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) return value.map(primitiveText).filter(Boolean).join(' ');
    if (typeof value === 'object') {
      return Object.keys(value).slice(0, 40).map(function (key) {
        try { return primitiveText(value[key]); } catch (error) { return ''; }
      }).filter(Boolean).join(' ');
    }
    return '';
  }

  function flattenObject(item) {
    if (!item || typeof item !== 'object') return '';
    return Object.keys(item).slice(0, 80).map(function (key) {
      var value;
      try { value = item[key]; } catch (error) { return ''; }
      return key + ' ' + primitiveText(value);
    }).join(' ');
  }

  function scoreRecords(records) {
    if (!Array.isArray(records) || records.length < 20) return -1;
    var sample = records.slice(0, 20).filter(function (item) { return item && typeof item === 'object' && !Array.isArray(item); });
    if (sample.length < Math.min(5, records.length)) return -1;
    var keys = normalize(sample.map(function (item) { return Object.keys(item).join(' '); }).join(' '));
    var text = normalize(sample.map(flattenObject).join(' '));
    var score = Math.min(records.length, 2500) / 100;
    if (/nome|name|medicamento|medicine|principio|ativo|drug/.test(keys)) score += 45;
    if (/categoria|classificacao|risco|status|gestacao|gravidez|seguranca|permitido|pode/.test(keys)) score += 25;
    if (/observacao|descricao|classe|recomendacao|nota|fonte/.test(keys)) score += 15;
    if (/paracetamol|ibuprofeno|dipirona|amoxicilina/.test(text)) score += 35;
    return score;
  }

  function normalizeDataset(value, depth) {
    depth = depth || 0;
    if (!value || depth > 3) return null;
    if (Array.isArray(value)) {
      var direct = value.filter(function (item) { return item && typeof item === 'object' && !Array.isArray(item); });
      if (scoreRecords(direct) >= 0) return direct;
      for (var i = 0; i < value.length && i < 30; i += 1) {
        var nested = normalizeDataset(value[i], depth + 1);
        if (nested) return nested;
      }
      return null;
    }
    if (typeof value === 'object') {
      var values;
      try { values = Object.keys(value).map(function (key) { return value[key]; }); } catch (error) { return null; }
      var objectRecords = values.filter(function (item) { return item && typeof item === 'object' && !Array.isArray(item); });
      if (scoreRecords(objectRecords) >= 0) return objectRecords;
      var keys = Object.keys(value).slice(0, 100);
      for (var j = 0; j < keys.length; j += 1) {
        var child;
        try { child = value[keys[j]]; } catch (error2) { continue; }
        var nestedObject = normalizeDataset(child, depth + 1);
        if (nestedObject) return nestedObject;
      }
    }
    return null;
  }

  function discoverGlobalDataset() {
    var candidates = [];
    var seen = typeof WeakSet === 'function' ? new WeakSet() : null;

    function inspect(value, depth) {
      if (!value || depth > 3 || typeof value !== 'object') return;
      if (seen) {
        if (seen.has(value)) return;
        seen.add(value);
      }
      var records = normalizeDataset(value, 0);
      var score = scoreRecords(records || []);
      if (score >= 0) candidates.push({ records: records, score: score });
      if (Array.isArray(value) || value.nodeType || value === window || value === document) return;
      var keys;
      try { keys = Object.keys(value); } catch (error) { return; }
      keys.slice(0, 80).forEach(function (key) {
        if (depth > 0 && !/med|drug|data|base|record|item|list|catalog|db/i.test(key)) return;
        var child;
        try { child = value[key]; } catch (error2) { return; }
        inspect(child, depth + 1);
      });
    }

    [
      window.GestMedApp, window.gestMedApp, window.MEDICAMENTOS, window.medicamentos,
      window.MEDICINES, window.medicines, window.DATA, window.data, window.APP, window.app
    ].forEach(function (value) { inspect(value, 0); });

    try {
      Object.keys(window).filter(function (key) {
        return /med|drug|medicine|medicamento|database|records/i.test(key);
      }).slice(0, 100).forEach(function (key) {
        var value;
        try { value = window[key]; } catch (error) { return; }
        inspect(value, 0);
      });
    } catch (error) {}

    candidates.sort(function (a, b) { return b.score - a.score; });
    return candidates.length ? candidates[0].records : null;
  }

  function markerPositions(sourceLower) {
    var markers = ['ibuprofeno', 'paracetamol', 'dipirona', 'amoxicilina', 'acido folico', 'ácido fólico'];
    var positions = [];
    markers.forEach(function (marker) {
      var normalizedMarker = marker.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      var from = 0;
      while (from < sourceLower.length) {
        var index = sourceLower.indexOf(normalizedMarker, from);
        if (index < 0) break;
        positions.push(index);
        from = index + normalizedMarker.length;
        if (positions.length > 80) break;
      }
    });
    positions.sort(function (a, b) { return a - b; });
    return positions;
  }

  function countMarkersInRange(positions, start, end) {
    var count = 0;
    for (var i = 0; i < positions.length; i += 1) {
      if (positions[i] < start) continue;
      if (positions[i] > end) break;
      count += 1;
    }
    return count;
  }

  function collectLiteralRanges(source) {
    var sourceLower = source.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    var positions = markerPositions(sourceLower);
    var stack = [];
    var ranges = [];
    var quote = '';
    var escaped = false;
    var lineComment = false;
    var blockComment = false;

    for (var i = 0; i < source.length; i += 1) {
      var char = source[i];
      var next = source[i + 1] || '';

      if (lineComment) {
        if (char === '\n') lineComment = false;
        continue;
      }
      if (blockComment) {
        if (char === '*' && next === '/') { blockComment = false; i += 1; }
        continue;
      }
      if (quote) {
        if (escaped) { escaped = false; continue; }
        if (char === '\\') { escaped = true; continue; }
        if (char === quote) quote = '';
        continue;
      }
      if (char === '/' && next === '/') { lineComment = true; i += 1; continue; }
      if (char === '/' && next === '*') { blockComment = true; i += 1; continue; }
      if (char === '"' || char === "'" || char === '`') { quote = char; continue; }

      if (char === '[' || char === '{') {
        stack.push({ char: char, pos: i });
        continue;
      }
      if (char === ']' || char === '}') {
        var expected = char === ']' ? '[' : '{';
        var openIndex = stack.length - 1;
        while (openIndex >= 0 && stack[openIndex].char !== expected) openIndex -= 1;
        if (openIndex < 0) continue;
        var open = stack[openIndex];
        stack.length = openIndex;
        var length = i - open.pos + 1;
        if (length >= 5000 && countMarkersInRange(positions, open.pos, i) >= 2) {
          ranges.push({ start: open.pos, end: i, length: length, type: expected });
        }
      }
    }

    ranges.sort(function (a, b) { return a.length - b.length; });
    return ranges.slice(0, 20);
  }

  function evaluateLiteral(text) {
    try { return JSON.parse(text); } catch (error) {}
    try { return Function('"use strict";return (' + text + ');')(); } catch (error2) { return null; }
  }

  function extractObjectsFallback(source) {
    var objects = [];
    var pattern = /\{[^{}]{0,7000}(?:(?:["']?(?:nome|name|medicamento|medicine|principioAtivo|principio_ativo)["']?)\s*:)[^{}]{0,7000}\}/gi;
    var match;
    while ((match = pattern.exec(source)) && objects.length < 3000) {
      var value = evaluateLiteral(match[0]);
      if (value && typeof value === 'object' && !Array.isArray(value)) objects.push(value);
    }
    return scoreRecords(objects) >= 0 ? objects : null;
  }

  function extractDatasetFromSource(source) {
    var ranges = collectLiteralRanges(source);
    var best = null;
    var bestScore = -1;
    ranges.forEach(function (range) {
      var literal = source.slice(range.start, range.end + 1);
      var value = evaluateLiteral(literal);
      var records = normalizeDataset(value, 0);
      var score = scoreRecords(records || []);
      if (score > bestScore) {
        best = records;
        bestScore = score;
      }
    });
    if (best) return best;
    return extractObjectsFallback(source);
  }

  function loadDataset() {
    if (datasetCache) return Promise.resolve(datasetCache);
    var globalRecords = discoverGlobalDataset();
    if (globalRecords) {
      datasetCache = globalRecords;
      return Promise.resolve(datasetCache);
    }
    if (!datasetPromise) {
      datasetPromise = fetch('./app-core-stable.html?v=' + encodeURIComponent(VERSION), { cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.text();
        })
        .then(function (source) {
          var records = extractDatasetFromSource(source);
          if (!records || !records.length) throw new Error('Base de medicamentos não localizada no HTML');
          datasetCache = records;
          return records;
        });
    }
    return datasetPromise;
  }

  function getFirst(item, keys) {
    for (var i = 0; i < keys.length; i += 1) {
      var value = item && item[keys[i]];
      if (value != null && primitiveText(value).trim()) return primitiveText(value).trim();
    }
    return '';
  }

  function humanizeKey(key) {
    return String(key)
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/^./, function (char) { return char.toUpperCase(); });
  }

  function usefulRows(item) {
    var priority = [
      'classe', 'classificacao', 'classificação', 'categoria', 'status', 'risco',
      'gestacao', 'gestação', 'gravidez', 'seguranca', 'segurança', 'pode', 'permitido',
      'recomendacao', 'recomendação', 'observacao', 'observação', 'observacoes', 'observações',
      'descricao', 'descrição', 'nota', 'fonte', 'trimestre', 'conduta'
    ];
    var used = {};
    var rows = [];
    priority.forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(item, key)) return;
      var text = primitiveText(item[key]).trim();
      if (!text || text.length > 1400) return;
      used[key] = true;
      rows.push({ label: humanizeKey(key), value: text });
    });
    Object.keys(item).forEach(function (key) {
      if (used[key] || rows.length >= 8) return;
      if (/^(id|nome|name|medicamento|medicine|principioAtivo|principio_ativo|titulo|title)$/i.test(key)) return;
      var text = primitiveText(item[key]).trim();
      if (!text || text.length > 500) return;
      rows.push({ label: humanizeKey(key), value: text });
    });
    return rows.slice(0, 8);
  }

  function renderResults(box, records, query) {
    var normalizedQuery = normalize(query);
    var matches = records.filter(function (item) {
      return normalize(flattenObject(item)).indexOf(normalizedQuery) !== -1;
    }).slice(0, 50);

    box.hidden = false;
    box.innerHTML = '';

    var header = document.createElement('div');
    header.className = 'gm-med-results-title';
    var title = document.createElement('span');
    title.textContent = matches.length ? 'Medicamentos encontrados' : 'Nenhum medicamento encontrado';
    header.appendChild(title);
    if (matches.length) {
      var count = document.createElement('span');
      count.className = 'gm-med-results-count';
      count.textContent = matches.length + (matches.length === 50 ? '+' : '') + ' resultado(s)';
      header.appendChild(count);
    }
    box.appendChild(header);

    if (!matches.length) {
      var empty = document.createElement('div');
      empty.className = 'gm-med-search-message';
      empty.textContent = 'Confira a grafia ou pesquise pelo princípio ativo.';
      box.appendChild(empty);
      return;
    }

    matches.forEach(function (item) {
      var name = getFirst(item, ['nome', 'name', 'medicamento', 'medicine', 'principioAtivo', 'principio_ativo', 'principio ativo', 'titulo', 'title']) || 'Medicamento';
      var status = getFirst(item, ['classificacao', 'classificação', 'categoria', 'status', 'risco', 'gestacao', 'gestação', 'gravidez', 'seguranca', 'segurança', 'pode', 'permitido']);
      var rows = usefulRows(item);

      var card = document.createElement('article');
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

      if (rows.length) {
        var grid = document.createElement('div');
        grid.className = 'gm-med-result-grid';
        rows.forEach(function (row) {
          var line = document.createElement('div');
          line.className = 'gm-med-result-row';
          var label = document.createElement('b');
          label.textContent = row.label + ': ';
          line.appendChild(label);
          line.appendChild(document.createTextNode(row.value));
          grid.appendChild(line);
        });
        card.appendChild(grid);
      }
      box.appendChild(card);
    });

    window.setTimeout(function () {
      var rect = box.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.62) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  function executeSearch(field, bar, box, forceOriginal) {
    var query = field.value || '';
    var normalizedQuery = normalize(query);
    if (forceOriginal) dispatchOriginalSearch(field);
    filterExistingCards(query);

    if (normalizedQuery.length < 2) {
      hideResults(box);
      return;
    }

    showMessage(box, 'Buscando na base de medicamentos', true);
    loadDataset()
      .then(function (records) {
        if (normalize(field.value || '') !== normalizedQuery) return;
        renderResults(box, records, query);
      })
      .catch(function (error) {
        console.error('GestaMed: falha ao recuperar a base de medicamentos:', error);
        if (normalize(field.value || '') !== normalizedQuery) return;
        showMessage(box, 'A base de medicamentos não pôde ser recuperada. Toque na lupa para tentar novamente.', false);
        datasetPromise = null;
      });
  }

  function scheduleSearch(field, bar, box) {
    if (searchTimer) window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(function () {
      executeSearch(field, bar, box, false);
    }, 180);
  }

  function activate() {
    var field = locateField();
    if (!field) return false;
    ensureStyle();
    var bar = locateBar(field);
    if (!bar) return false;
    var button = ensureButton(field, bar);
    var box = locateResultsHost(field, bar);

    if (field.dataset.gmMedicationSearchV113 === '1') return true;
    field.dataset.gmMedicationSearchV113 = '1';

    field.addEventListener('input', function () {
      if (internalEvent) return;
      scheduleSearch(field, bar, box);
    });
    field.addEventListener('search', function () {
      if (internalEvent) return;
      executeSearch(field, bar, box, false);
    });
    field.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        executeSearch(field, bar, box, true);
      }
    });

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      field.focus();
      executeSearch(field, bar, box, true);
    });
    button.addEventListener('touchend', function () {
      field.focus();
    }, { passive: true });

    bar.addEventListener('click', function (event) {
      if (event.target === field || event.target === button) return;
      field.focus();
    });

    if (normalize(field.value || '').length >= 2) executeSearch(field, bar, box, false);
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
