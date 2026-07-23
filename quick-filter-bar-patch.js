(function () {
  'use strict';

  var PATCH_ID = 'gestamed-quick-filter-bar-2026-07-23-120';
  if (document.documentElement.getAttribute('data-gm-quick-filter-patch') === PATCH_ID) return;
  document.documentElement.setAttribute('data-gm-quick-filter-patch', PATCH_ID);

  var clinicalFilters = [
    { label: 'Vômitos', terms: ['vômito', 'êmese', 'antiemético', 'ondansetrona', 'metoclopramida'] },
    { label: 'Azia/Refluxo', terms: ['refluxo', 'azia', 'pirose', 'antiácido', 'omeprazol', 'pantoprazol'] },
    { label: 'Constipação', terms: ['constipação', 'prisão de ventre', 'laxante', 'lactulose', 'macrogol'] }
  ];

  var therapeuticFilters = [
    { label: 'Analgésicos', terms: ['analgésico', 'analgesia', 'antálgico'] },
    { label: 'Anti-inflamatórios', terms: ['anti-inflamatório', 'antiinflamatório', 'aine'] },
    { label: 'Antibióticos', terms: ['antibiótico', 'antibacteriano', 'antimicrobiano', 'penicilina', 'cefalosporina', 'macrolídeo'] },
    { label: 'Antifúngicos', terms: ['antifúngico', 'antimicótico'] },
    { label: 'Antivirais', terms: ['antiviral'] },
    { label: 'Anti-histamínicos', terms: ['anti-histamínico', 'antihistamínico', 'antialérgico'] },
    { label: 'Antieméticos', terms: ['antiemético', 'náusea', 'vômito'] },
    { label: 'Anti-hipertensivos', terms: ['anti-hipertensivo', 'antihipertensivo', 'hipertensão'] },
    { label: 'Antidiabéticos', terms: ['antidiabético', 'hipoglicemiante', 'diabetes', 'insulina'] },
    { label: 'Anticoagulantes', terms: ['anticoagulante', 'heparina'] },
    { label: 'Antiagregantes', terms: ['antiagregante', 'antiplaquetário', 'antiagregação'] },
    { label: 'Anticonvulsivantes', terms: ['anticonvulsivante', 'antiepiléptico', 'epilepsia'] },
    { label: 'Antidepressivos', terms: ['antidepressivo', 'depressão', 'isrs'] },
    { label: 'Ansiolíticos', terms: ['ansiolítico', 'ansiedade', 'benzodiazepínico'] },
    { label: 'Antipsicóticos', terms: ['antipsicótico', 'neuroléptico'] },
    { label: 'Corticoides', terms: ['corticoide', 'corticosteroide', 'glicocorticoide'] },
    { label: 'Broncodilatadores', terms: ['broncodilatador'] },
    { label: 'Antiasmáticos', terms: ['antiasmático', 'asma'] },
    { label: 'Antiácidos', terms: ['antiácido', 'azia', 'pirose'] },
    { label: 'Protetores gástricos', terms: ['protetor gástrico', 'inibidor da bomba de prótons', 'ibp', 'antiulceroso'] },
    { label: 'Laxantes', terms: ['laxante', 'constipação'] },
    { label: 'Antidiarreicos', terms: ['antidiarreico', 'diarreia'] },
    { label: 'Diuréticos', terms: ['diurético'] },
    { label: 'Hormônios', terms: ['hormônio', 'hormonal', 'progesterona', 'levotiroxina'] },
    { label: 'Vitaminas e suplementos', terms: ['vitamina', 'suplemento', 'mineral', 'ácido fólico', 'ferro'] },
    { label: 'Medicamentos obstétricos', terms: ['obstétrico', 'tocolítico', 'uterotônico', 'ocitocina', 'misoprostol', 'sulfato de magnésio'] }
  ];

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function wordsOnly(value) {
    return normalize(value)
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function matchesLabel(element, label) {
    var text = wordsOnly(element && element.textContent);
    var wanted = wordsOnly(label);
    return text === wanted || text.slice(-(wanted.length + 1)) === ' ' + wanted;
  }

  function getData() {
    try {
      if (typeof RAW_DATA !== 'undefined' && Array.isArray(RAW_DATA)) return RAW_DATA;
    } catch (error) {}
    try {
      if (typeof GESTMED_DATA !== 'undefined' && Array.isArray(GESTMED_DATA)) return GESTMED_DATA;
    } catch (error) {}
    return [];
  }

  function recordText(record) {
    try {
      if (typeof searchableText === 'function') return normalize(searchableText(record));
    } catch (error) {}
    try {
      return normalize(JSON.stringify(record));
    } catch (error) {
      return '';
    }
  }

  function buildIndex() {
    return getData().map(recordText).filter(Boolean);
  }

  function chooseTerm(definition, index) {
    var bestTerm = definition.terms[0];
    var bestCount = 0;
    definition.terms.forEach(function (term) {
      var normalizedTerm = normalize(term);
      var count = index.reduce(function (total, text) {
        return total + (text.indexOf(normalizedTerm) !== -1 ? 1 : 0);
      }, 0);
      if (count > bestCount) {
        bestCount = count;
        bestTerm = term;
      }
    });
    return { term: bestTerm, count: bestCount };
  }

  function findClickable(label) {
    var elements = document.querySelectorAll('button, [role="button"], a');
    return Array.prototype.find.call(elements, function (element) {
      return matchesLabel(element, label);
    });
  }

  function locateStrip() {
    var dor = findClickable('Dor');
    var febre = findClickable('Febre');
    var alergia = findClickable('Alergia');
    var nauseas = findClickable('Náuseas') || findClickable('Náusea');
    var buttons = [dor, febre, alergia, nauseas].filter(Boolean);
    if (buttons.length < 4) return null;

    var ancestor = dor.parentElement;
    var fallback = null;
    var depth = 0;
    while (ancestor && depth < 8) {
      var containsAll = buttons.every(function (button) { return ancestor.contains(button); });
      if (containsAll) {
        if (!fallback) fallback = ancestor;
        var style = window.getComputedStyle(ancestor);
        var rect = ancestor.getBoundingClientRect();
        var isHorizontal = style.display.indexOf('flex') !== -1 || style.overflowX === 'auto' || style.overflowX === 'scroll' || ancestor.scrollWidth > ancestor.clientWidth;
        if (isHorizontal && rect.height > 0 && rect.height < 160) {
          return { strip: ancestor, template: dor, originals: buttons };
        }
      }
      ancestor = ancestor.parentElement;
      depth += 1;
    }
    return fallback ? { strip: fallback, template: dor, originals: buttons } : null;
  }

  function findSearchInput() {
    return document.querySelector('#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]');
  }

  function runSearch(term, clickedButton, strip) {
    var input = findSearchInput();
    if (!input) return;

    Array.prototype.forEach.call(strip.querySelectorAll('.gm-added-filter'), function (button) {
      button.classList.remove('gm-filter-active');
    });
    clickedButton.classList.add('gm-filter-active');

    input.value = term;
    ['input', 'keyup', 'change'].forEach(function (type) {
      input.dispatchEvent(new Event(type, { bubbles: true }));
    });

    try {
      if (typeof applyFilters === 'function') applyFilters();
    } catch (error) {}
  }

  function cleanClone(template) {
    var clone = template.cloneNode(true);
    clone.removeAttribute('id');
    clone.removeAttribute('onclick');
    clone.removeAttribute('href');
    Array.prototype.slice.call(clone.attributes).forEach(function (attribute) {
      if (attribute.name.indexOf('data-') === 0) clone.removeAttribute(attribute.name);
    });
    clone.textContent = '';
    if (clone.tagName === 'BUTTON') clone.type = 'button';
    return clone;
  }

  function makeButton(template, definition, group, queryInfo, strip) {
    var button = cleanClone(template);
    button.classList.add('gm-added-filter', group === 'class' ? 'gm-class-filter' : 'gm-clinical-filter');
    button.setAttribute('data-gm-added-filter', definition.label);
    button.setAttribute('data-gm-result-count', String(queryInfo.count));
    button.setAttribute('aria-label', definition.label);
    button.setAttribute('title', definition.label);

    var label = document.createElement('span');
    label.textContent = definition.label;
    button.appendChild(label);

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
      runSearch(queryInfo.term, button, strip);
    }, true);

    return button;
  }

  function ensureStyle() {
    var oldStyle = document.getElementById('gm-quick-filter-style');
    if (oldStyle) oldStyle.remove();
    var style = document.createElement('style');
    style.id = 'gm-quick-filter-style';
    style.textContent = [
      '.gm-filter-strip{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:8px!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;padding-bottom:3px!important;}',
      '.gm-filter-strip::-webkit-scrollbar{display:none!important;}',
      '.gm-filter-strip>*{flex:0 0 auto!important;}',
      '.gm-filter-divider{width:1px!important;min-width:1px!important;height:28px!important;background:rgba(100,116,139,.45)!important;margin:0 3px!important;align-self:center!important;}',
      '.gm-added-filter{flex:0 0 auto!important;white-space:nowrap!important;}',
      '.gm-clinical-filter{background:#fff7ed!important;border-color:#fdba74!important;color:#9a3412!important;}',
      '.gm-class-filter{background:#eef2ff!important;border-color:#a5b4fc!important;color:#3730a3!important;}',
      '.gm-added-filter.gm-filter-active{box-shadow:0 0 0 2px rgba(15,118,110,.20)!important;transform:translateY(-1px);}'
    ].join('');
    document.head.appendChild(style);
  }

  function applyPatch() {
    var found = locateStrip();
    if (!found) return false;

    var strip = found.strip;
    var expectedAdded = clinicalFilters.length + therapeuticFilters.length;
    if (strip.getAttribute('data-gm-filter-patch') === PATCH_ID && strip.querySelectorAll('.gm-added-filter').length === expectedAdded) return true;

    ensureStyle();
    strip.classList.add('gm-filter-strip');

    var keep = found.originals;
    var clickables = Array.prototype.slice.call(strip.querySelectorAll('button, [role="button"], a'));
    clickables.forEach(function (element) {
      if (keep.indexOf(element) === -1) element.remove();
    });
    Array.prototype.forEach.call(strip.querySelectorAll('.gm-added-filter, .gm-filter-divider'), function (element) {
      element.remove();
    });

    var index = buildIndex();
    clinicalFilters.forEach(function (definition) {
      strip.appendChild(makeButton(found.template, definition, 'clinical', chooseTerm(definition, index), strip));
    });

    var divider = document.createElement('span');
    divider.className = 'gm-filter-divider';
    divider.setAttribute('aria-hidden', 'true');
    strip.appendChild(divider);

    therapeuticFilters.forEach(function (definition) {
      strip.appendChild(makeButton(found.template, definition, 'class', chooseTerm(definition, index), strip));
    });

    strip.setAttribute('data-gm-filter-patch', PATCH_ID);
    strip.setAttribute('data-gm-filter-groups', 'clinical:7;classes:' + therapeuticFilters.length);
    strip.scrollLeft = 0;
    return true;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (applyPatch() || attempts >= 60) return;
    window.setTimeout(start, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  var observer = new MutationObserver(function () {
    window.clearTimeout(observer._gmTimer);
    observer._gmTimer = window.setTimeout(applyPatch, 150);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
