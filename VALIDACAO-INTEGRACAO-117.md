# Validação da integração GestaMed 2026.07.23.117

## Congelamento e reversão

- Versão visual anterior preservada na branch `backup-estavel-antes-integracao-603`.
- Commit congelado: `eed0c548eba981457819c765f112a126f30c7aa5`.
- Núcleo anterior preservado em `app-core-stable.html`.
- Fonte histórica preservada em `backups/gestamed-base-603-1503-fonte.html`.

## Método de integração

O `index.html` é montado pelo GitHub Pages antes de ser entregue ao aparelho. Ele:

1. carrega o núcleo atual do aplicativo;
2. localiza os marcadores `// data.js — GestMed` e `// app.js — GestMed`;
3. substitui apenas o bloco de dados pelo bloco histórico 603/1.503;
4. mantém integralmente o `app.js` atual, incluindo botões e módulo de prescrições;
5. incorpora no HTML final os scripts atuais do resumo e da revisão detalhada do Painel de Exames.

Não há `fetch`, `iframe`, carregador intermediário ou combinação de arquivos no iPhone.

## Proteção contra falha

Se qualquer marcador ou metadado da fonte histórica não for encontrado, o build usa o núcleo atual sem transplante. Isso impede tela branca ou carregamento infinito.

## Checklist estrutural

- [x] 603 registros clínicos/princípios ativos.
- [x] 900 registros adicionais de indexação.
- [x] 1.503 registros pesquisáveis.
- [x] Buscopan presente.
- [x] Buscopan Composto presente.
- [x] Buscoduo/Buscopan Duo presente.
- [x] Mecanismo original de pesquisa mantido no `app.js` atual.
- [x] Botão e módulo de Prescrições por Trimestre mantidos no núcleo atual.
- [x] Painel de Exames preservado pelo `summary-panel-patch.js` e `exam-panel-patch.js`.
- [x] TSH permanece fora da rotina do resumo/detalhamento revisado.
- [x] Ultrassonografias por trimestre preservadas.
- [x] Sem `search-fix.js` na versão ativa.
- [x] Sem carregamento de outro HTML em tempo de execução.

## Arquivos ativos

- `index.html`: integração cirúrgica e proteção de fallback.
- `app-core-stable.html`: interface e lógica atuais.
- `backups/gestamed-base-603-1503-fonte.html`: fonte dos dados recuperados.
- `summary-panel-patch.js`: resumo aprovado do Painel de Exames.
- `exam-panel-patch.js`: revisão detalhada dos exames.
- `teste-integracao-med-prescricao.html`: versão separada de validação.

Commit principal da integração: `b96c077e8b3d29f61e1672a6288be6909df06a6e`.
