(function () {
  'use strict';

  function localizarCampo() {
    return document.querySelector(
      'input[placeholder*="Pesquisar medicamento"], ' +
      'input[placeholder*="princípio ativo"], ' +
      'input[placeholder*="principio ativo"], ' +
      'input[type="search"]'
    );
  }

  function dispararBusca(campo) {
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    campo.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function ativar() {
    var campo = localizarCampo();
    if (!campo) return false;

    campo.disabled = false;
    campo.readOnly = false;
    campo.removeAttribute('disabled');
    campo.removeAttribute('readonly');
    campo.style.pointerEvents = 'auto';
    campo.style.touchAction = 'manipulation';
    campo.style.position = 'relative';
    campo.style.zIndex = '5';

    if (campo.dataset.gmSearchFixed === '1') return true;
    campo.dataset.gmSearchFixed = '1';

    campo.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter') {
        evento.preventDefault();
        dispararBusca(campo);
      }
    });

    var container = campo.closest('form, .search-box, .search-container, .search-wrap, .search-bar') || campo.parentElement;
    if (container) {
      container.style.pointerEvents = 'auto';
      container.querySelectorAll('button, [role="button"], .search-icon, .search-button').forEach(function (botao) {
        if (botao.dataset.gmSearchFixed === '1') return;
        botao.dataset.gmSearchFixed = '1';
        botao.style.pointerEvents = 'auto';
        botao.addEventListener('click', function () {
          campo.focus();
          setTimeout(function () { dispararBusca(campo); }, 0);
        });
        botao.addEventListener('touchend', function () {
          campo.focus();
        }, { passive: true });
      });

      if (container.tagName === 'FORM' && container.dataset.gmSearchFormFixed !== '1') {
        container.dataset.gmSearchFormFixed = '1';
        container.addEventListener('submit', function (evento) {
          evento.preventDefault();
          campo.focus();
          dispararBusca(campo);
        });
      }
    }

    return true;
  }

  function iniciar() {
    if (ativar()) return;
    var tentativas = 0;
    var timer = setInterval(function () {
      tentativas += 1;
      if (ativar() || tentativas >= 24) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar, { once: true });
  } else {
    iniciar();
  }
})();
