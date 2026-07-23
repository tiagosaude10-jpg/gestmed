# Recuperação da base GestaMed 603/1.503

Fonte histórica validada: commit `bccc584d321348e68a77c5e6039beb4355a9fa30`.

## Estrutura recuperada

- 603 registros clínicos/princípios ativos;
- 900 registros adicionais de indexação;
- 1.503 registros pesquisáveis no total;
- Buscopan, Buscopan Composto e Buscoduo presentes;
- metadados, strings compactadas, registros, expansão `GESTMED_DATA` e posologias recuperados.

## Método aplicado

O núcleo atual do aplicativo foi preservado. Antes da inicialização, o `index.html` carrega a cópia histórica, extrai apenas o bloco `data.js — GestMed` e o transplanta no núcleo atual. Em seguida, o próprio `app.js` atual inicia normalmente usando o mecanismo original:

`GESTMED_DATA → RAW_DATA → applyFilters → renderSuggestions → openMed`

A correção paralela `search-fix.js` deixou de ser carregada. O `exam-panel-patch.js` permanece ativo para preservar a revisão atual do Painel de Exames.

## Cópias de segurança

- `backups/gestamed-base-603-1503-fonte.html`: fonte histórica integral;
- `backups/app-core-antes-recuperacao-113.html`: núcleo ativo antes da recuperação.

Build: `2026.07.23.114`.
