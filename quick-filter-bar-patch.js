(function () {
  'use strict';

  var PATCH_ID = 'gestamed-quick-filter-bar-2026-07-23-119';
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

  function exactClickable(label) {
    var wanted = normalize(label);
    return Array.prototype.find.call(
      document.querySelectorAll('button, [role="button"], a'),
      function (element) {
        return normalize(element.textContent) === wanted;
      }
    );
  }

  function locateStrip() {
    var buttons = [exactClickable('Dor'), exactClickable('Febre'), exactClickable('Alergia'), exactClickable('Náusea')];
    if (!buttons[3]) buttons[3] = exactClickable('Náuseas');
    buttons = buttons.filter(Boolean);
    if (buttons.length < 3) return null;

    var ancestor = buttons[0].parentElement;
    var depth = 0;
    while (ancestor && depth < 7) {
      var contained = buttons.filter(function (button) { return ancestor.contains(button); }).length;
      if (contained === buttons.length) return { strip: ancestor, template: buttons[0] };
      ancestor = ancestor.parentElement;
      depth += 1;
    }
    return null;
  }

  function findSearchInput() {
    return document.querySelector(
      '#searchInput, input[type="search"], input[placeholder*="medicamento" i], input[placeholder*="princípio" i], input[placeholder*="principio" i]'
    );
  }

  function runSearch(term, clickedButton, strip) {
    var input = findSearchInput();
    if (!input) return;

    strip.querySelectorAll('.gm-added-filter').forEach(function (button) {
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
    if (document.getElementById('gm-quick-filter-style')) return;
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
    if (strip.getAttribute('data-gm-filter-patch') === PATCH_ID) return true;

    strip.querySelectorAll('.gm-added-filter, .gm-filter-divider').forEach(function (element) {
      element.remove();
    });

    ensureStyle();
    strip.classList.add('gm-filter-strip');
    strip.setAttribute('data-gm-filter-patch', PATCH_ID);

    var index = buildIndex();
    clinicalFilters.forEach(function (definition) {
      var queryInfo = chooseTerm(definition, index);
      strip.appendChild(makeButton(found.template, definition, 'clinical', queryInfo, strip));
    });

    var divider = document.createElement('span');
    divider.className = 'gm-filter-divider';
    divider.setAttribute('aria-hidden', 'true');
    strip.appendChild(divider);

    therapeuticFilters.forEach(function (definition) {
      var queryInfo = chooseTerm(definition, index);
      strip.appendChild(makeButton(found.template, definition, 'class', queryInfo, strip));
    });

    strip.setAttribute('data-gm-filter-groups', 'clinical:' + clinicalFilters.length + ';classes:' + therapeuticFilters.length);
    return true;
  }

  var attempts = 0;
  function start() {
    attempts += 1;
    if (applyPatch() || attempts >= 40) return;
    window.setTimeout(start, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  var observer = new MutationObserver(function () {
    window.clearTimeout(observer._gmTimer);
    observer._gmTimer = window.setTimeout(applyPatch, 120);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
