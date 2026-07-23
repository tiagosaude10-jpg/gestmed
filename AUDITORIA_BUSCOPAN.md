# Auditoria Buscopan

## buscopan
- Ocorrências: 0

## butilbrometo
- Ocorrências: 0

## escopolamina
- Ocorrências: 0

## hioscina
- Ocorrências: 0

## buscoduo
- Ocorrências: 0

## Identificadores GESTMED
- GESTMED_COMPACT
- GESTMED_DATA
- GESTMED_META
- GESTMED_POSOLOGIA_ADULTO
- GESTMED_STRINGS

## Padrão `const\s+(GESTMED_[A-Z0-9_]+)\s*=\s*`
```text
o individualizado.
      </p>
    </div>
  </div>

  <script>
// data.js — GestMed (v182 — adicionada Metilcobalamina)

const GESTMED_META = {"nome_base":"GestMed — Base ampliada com 1.500 entradas pesquisáveis","versao":"3.0.0","data_revisao":"2026-07-15","total_registros":1500,"registros_base_clinica":600,"registros_adicionais_indexacao":900,"nota_metodologica":"A base contém 600 registros de princípios ativos/base clínica e 900 formas salinas, ésteres ou derivados adicionados para indexação. As 900 entradas novas não são classificações gestacionais independentes e não devem herdar automaticamente a segurança do princípio ativo-base. Cada forma deve ser confirmada na Lista DCB vigente, na consulta de medicamentos regularizados e na bula profissional da Anvisa.","regra_aplicativo":"Quando status contiver PENDENTE, o aplicativo deve mostrar 'não classificado' e impedir qualquer conclusão binária de que a gestante pode usar.","fontes":{"DCB_vigente_2026":"https://bibliotecadigital.anvisa.gov.br/jspui/handl
```
```text
ov.br/anvisa/pt-br/sistemas/bulario-eletronico","RENAME":"https://www.gov.br/saude/pt-br/composicao/sectics/rename"}};

const GESTMED_STRINGS = ["Analgésico/antitérmico","Dor e febre","Preferencial","Compatível/geralmente aceitável","Usar a menor dose eficaz pelo menor tempo; avaliar hepatopatia e duplicidade em associações.","Tratar a causa e adotar medidas não farmacológicas quando apropriado.","Sim","Revisão clínica + fonte oficial","https://bvsms.saude.gov.br/bvs/publicacoes/manual_gestacao_alto_risco.pdf","https://bvsms.saude.gov.br/bvs/publicacoes/relacao_nacional_medicamentos_2024.pdf","https://www.gov.br/anvisa/pt-br/sistemas/bulario-eletronico","https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/publicacoes/amamentacao-e-uso-de-medicamentos-e-outras-substancias-2a-edicao/view","","https://bibliotecadigital.anvisa.gov.br/jspui/handle/anvisa/20673","2026-07-15","BASE EDUCACIONAL — validar bula e protocolo antes do uso","PODE SER OPÇÃO PREFERENCIAL QUANDO INDICADO","Princípio 
```
```text
 padronizada","https://web.gpmed.app/medicamentos/01986749-786a-70e4-b1e5-a4b2019e7911/metilcobalamina","2026-07-20"];

const GESTMED_COMPACT = [{"id":1,"principio_ativo":"Paracetamol","sinonimos_nomes_comerciais":"","principio_ativo_base":"Paracetamol","classe_farmacologica":0,"indicacoes_contexto":1,"primeiro_trimestre":2,"segundo_trimestre":2,"terceiro_trimestre":2,"lactacao":3,"resumo_alerta":4,"alternativa_conduta":5,"disponibilidade_sus":6,"nivel_validacao":7,"fonte_ministerio_saude":8,"fonte_rename":9,"fonte_anvisa_bulario":10,"fonte_lactacao_ms":11,"fonte_adicional":12,"fonte_dcb_anvisa":13,"data_revisao_base":14,"status":15,"decisao_resumida_gestacao":16,"tipo_registro":17,"categoria_risco_fda":18},{"id":2,"principio_ativo":"Dipirona","sinonimos_nomes_comerciais":"","principio_ativo_base":"Dipirona","classe_farmacologica":0,"indicacoes_contexto":1,"primeiro_trimestre":19,"segundo_trimestre":20,"terceiro_trimestre":21,"lactacao":22,"resumo_alerta":23,"alternativa_conduta":24,"disponibilidade_sus":
```
```text
:13,"data_revisao_base":2312,"status":28,"decisao_resumida_gestacao":78,"tipo_registro":17,"categoria_risco_fda":41}];

const GESTMED_DATA = GESTMED_COMPACT.map(function(r) {
  var out = { id: r.id, principio_ativo: r.principio_ativo, sinonimos_nomes_comerciais: r.sinonimos_nomes_comerciais, principio_ativo_base: r.principio_ativo_base };
  ["classe_farmacologica", "indicacoes_contexto", "primeiro_trimestre", "segundo_trimestre", "terceiro_trimestre", "lactacao", "resumo_alerta", "alternativa_conduta", "disponibilidade_sus", "nivel_validacao", "fonte_ministerio_saude", "fonte_rename", "fonte_anvisa_bulario", "fonte_lactacao_ms", "fonte_adicional", "fonte_dcb_anvisa", "data_revisao_base", "status", "decisao_resumida_gestacao", "tipo_registro", "categoria_risco_fda"].forEach(function(key) {
    out[key] = GESTMED_STRINGS[r[key]];
  });
  return out;
});

// ==========================================================
// POSOLOGIA DE REFERÊNCIA (ADULTO) — dose habitual/padrão de
// bula ou protocolo do Ministé
```
```text
onível. Lista inicial (lote 1/N); base ainda em expansão.
// ==========================================================
const GESTMED_POSOLOGIA_ADULTO = {
  "Paracetamol": "500–750 mg VO a cada 6/6h, se necessário (máx. 4 g/dia; em uso crônico, preferir ≤3 g/dia)",
  "Acetaminofeno": "500–750 mg VO a cada 6/6h, se necessário (máx. 4 g/dia)",
  "Dipirona": "500–1000 mg VO/IV a cada 6/6h, se necessário (máx. 4 g/dia)",
  "Ibuprofeno": "400 mg VO a cada 6/8h, se necessário — uso pontual e apenas no 1º/2º trimestre (evitar a partir de 20 semanas)",
  "Diclofenaco": "50 mg VO a cada 8/12h — uso pontual e apenas no 1º/2º trimestre (evitar a partir de 20 semanas)",
  "Ácido acetilsalicílico em baixa dose": "100–150 mg VO, 1x ao dia à noite, iniciado entre 12–16 semanas (profilaxia de pré-eclâmpsia em gestantes de alto risco)",
  "Amoxicilina": "500 mg VO a cada 8h por 7 dias (ajustar dose/duração conforme o foco infeccioso)",
  "Amoxicilina + clavulanato": "500/125 mg VO a cada 8h (ou 875/125 mg a cada 12h) por 
```

## Padrão `function\s+([A-Za-z0-9_]*(?:med|busca|search)[A-Za-z0-9_]*)\s*\(`
```text
ilumabe": "Dose de ataque 400–600 mg SC, seguida de manutenção 200–300 mg SC a cada 2 semanas, conforme indicação",
};

function gestmedGetPosologiaAdulto(med) {
  if (!med) return null;
  return (
    GESTMED_POSOLOGIA_ADULTO[med.principio_ativo_base] ||
    GESTMED_POSOLOGIA_ADULTO[med.principio_ativo] ||
    null
  );
}

  </script>
  <script>
// app.js — GestMed
// Responsável por carregar os dados (de GESTMED_DATA, definido em data.js),
// pesquisar, filtrar e renderizar a interface.

(function () {

  // Dados do guia "Crescimento do Bebê" semana a semana (4 a 42 semanas)
  const CRESCIMENTO_SEMANAS = {
    "4": {
      "comparacao": "uma semente de papoula",
      "comprimento": "menos de 0,2 cm",
      "peso": "menos de 1 g",
      "desenvolvimento": "O óvulo fecundado (agora um blastocisto) acabou de se implantar no endométrio. Começam a se formar as três camadas germinativas que originarão todos os órgãos do bebê.",
      "materna": "É comum ainda não haver sintomas perceptíveis. O atraso menstr
```
```text
==============================
  // BUSCA E FILTRAGEM
  // ==========================================================
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
   
```
```text
================
  // RENDERIZAÇÃO — MODAL DE DETALHE
  // ==========================================================
  function openMed(id) {
    const med = RAW_DATA.find(function (m) {
      return m.id === id;
    });
    if (!med) {
      alert("Medicamento não encontrado.");
      return;
    }

    const pendingFlag = isPending(med);
    const derivativeFlag = isDerivative(med);
    const overallSlug = classifyRisk(med.decisao_resumida_gestacao);

    const derivativeBanner =
      derivativeFlag && med.principio_ativo_base
        ? `<div class="pending-banner derivative-banner">
             🧪 <div>
               <strong>Forma derivada de "${escapeHtml(med.principio_ativo_base)}".</strong>
               Este registro é uma forma salina, éster ou derivado incluído apenas para ampliar a
               indexação de busca — NÃO herda automaticamente a classificação de segurança do
               princípio ativo-base. Confirme se esta forma específica consta na Lista DCB vigente
               e na 
```
```text
 {
    elModal.classList.remove("open");
    document.body.style.overflow = "";
    resetSearchToInitialState();
  }

  function resetSearchToInitialState() {
    elSearch.value = "";
    elSuggestions.innerHTML = "";
    elSuggestions.classList.remove("open");
    render();
  }

  function fecharModalAoClicarFora(event) {
    if (event.target === elModal) closeModal();
  }

  // ==========================================================
  // INICIALIZAÇÃO
  // ==========================================================
  // ==========================================================
  // CALCULADORA DE IDADE GESTACIONAL (DUM e ULTRASSOM)
  // ==========================================================
  const elGaModal = document.getElementById("gaModal");
  const elGaResult = document.getElementById("gaResult");
  let gaActiveTab = "dum";
  let lastGaWeeksToday = null;
  let lastGaDaysToday = null;
  let lastTotalDaysToday = null;
  let lastDppDate = null;
  let gaImcPesoVal = null;
  let gaImcAlturaVal = 
```
```text
to do alerta clínico geralmente menciona a
  // classe certa (ex.: "antidepressivo tricíclico", "anti-hipertensivo").
  function categorySearchableText(med) {
    return normalizeText(
      [
        med.principio_ativo,
        med.principio_ativo_base,
        med.sinonimos_nomes_comerciais,
        med.classe_farmacologica,
        med.indicacoes_contexto,
        med.resumo_alerta,
      ].join(" ")
    );
  }

  function openCategoryModal(term, label) {
    if (!RAW_DATA) return;

    const keywords = keywordsForTerm(term).map(function (k) {
      return normalizeText(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    // Limite de palavra apenas no início do radical/palavra-chave — permite
    // casar plural e variações (ex.: "nause" casa com "náuseas"), mas ainda
    // evita falso positivo como "inibidor" casando com a chave "dor" (não há
    // limite de palavra antes de "dor" dentro de "inibidor").
    const combinedRegex = new RegExp("\\b(?:" + keywords.join("|") + ")");
    const allMatch
```
