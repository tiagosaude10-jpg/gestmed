const fs = require('fs');

const SOURCE = 'backups/gestamed-base-603-1503-fonte.html';
const INDEX = 'index.html';
const START_MARKER = '/* GESTMED_GASTRIC_PACKAGE_126_START */';
const END_MARKER = '/* GESTMED_GASTRIC_PACKAGE_126_END */';
const REVIEW_DATE = '2026-07-24';

const common = {
  nivel_validacao: 'Revisão clínica + fontes oficiais e teratologia clínica',
  fonte_ministerio_saude: 'https://bvsms.saude.gov.br/bvs/publicacoes/manual_gestacao_alto_risco.pdf',
  fonte_rename: 'https://bvsms.saude.gov.br/bvs/publicacoes/relacao_nacional_medicamentos_2024.pdf',
  fonte_anvisa_bulario: 'https://www.gov.br/anvisa/pt-br/sistemas/bulario-eletronico',
  fonte_lactacao_ms: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca/publicacoes/amamentacao-e-uso-de-medicamentos-e-outras-substancias-2a-edicao/view',
  fonte_dcb_anvisa: 'https://bibliotecadigital.anvisa.gov.br/jspui/handle/anvisa/20673',
  data_revisao_base: REVIEW_DATE,
  status: 'BASE EDUCACIONAL — individualizar indicação, dose, duração e verificar bula/protocolo vigente',
  tipo_registro: 'Princípio ativo/base clínica',
  grupo_navegacao: 'Protetor gástrico | Protetores gástricos'
};

function rec(data) { return Object.assign({}, common, data); }

const records = [
  rec({
    principio_ativo: 'Omeprazol', sinonimos_nomes_comerciais: 'Losec; Prilosec', principio_ativo_base: 'Omeprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo, pirose e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado — opção preferencial entre os IBP', segundo_trimestre: 'Pode ser utilizado — opção preferencial entre os IBP', terceiro_trimestre: 'Pode ser utilizado — opção preferencial entre os IBP',
    lactacao: 'Compatível/geralmente aceitável',
    resumo_alerta: 'É o IBP com maior experiência de uso na gestação. Usar quando medidas comportamentais e opções simples forem insuficientes, na menor dose eficaz.',
    alternativa_conduta: 'Medidas comportamentais, antiácido ou alginato; considerar antagonista H2 quando apropriado.',
    disponibilidade_sus: 'Consultar Rename e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/proton-pump-inhibitors/',
    decisao_resumida_gestacao: 'PODE SER OPÇÃO PREFERENCIAL QUANDO INDICADO', categoria_risco_fda: 'C (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Pantoprazol', sinonimos_nomes_comerciais: 'Pantozol; Protonix', principio_ativo_base: 'Pantoprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado', segundo_trimestre: 'Pode ser utilizado quando indicado', terceiro_trimestre: 'Pode ser utilizado quando indicado',
    lactacao: 'Compatível/geralmente aceitável',
    resumo_alerta: 'Os dados disponíveis para IBP não mostram aumento consistente de malformações ou outros desfechos adversos; o omeprazol possui maior experiência gestacional.',
    alternativa_conduta: 'Preferir omeprazol quando não houver motivo clínico para outro IBP.', disponibilidade_sus: 'Verificar Rename e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/proton-pump-inhibitors/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO INDICADO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Esomeprazol', sinonimos_nomes_comerciais: 'Nexium', principio_ativo_base: 'Esomeprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado', segundo_trimestre: 'Pode ser utilizado quando indicado', terceiro_trimestre: 'Pode ser utilizado quando indicado',
    lactacao: 'Compatível/geralmente aceitável', resumo_alerta: 'Pode ser usado sob orientação médica; o omeprazol é geralmente preferido por possuir mais dados na gestação.',
    alternativa_conduta: 'Omeprazol quando clinicamente adequado.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/proton-pump-inhibitors/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO INDICADO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Lansoprazol', sinonimos_nomes_comerciais: 'Prevacid; Zoton', principio_ativo_base: 'Lansoprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado', segundo_trimestre: 'Pode ser utilizado quando indicado', terceiro_trimestre: 'Pode ser utilizado quando indicado',
    lactacao: 'Uso geralmente aceitável sob avaliação', resumo_alerta: 'Os estudos observacionais disponíveis não demonstraram associação consistente com desfechos gestacionais adversos; há mais experiência com omeprazol.',
    alternativa_conduta: 'Omeprazol quando clinicamente adequado.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/proton-pump-inhibitors/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO INDICADO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Rabeprazol', sinonimos_nomes_comerciais: 'Pariet; Aciphex', principio_ativo_base: 'Rabeprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser considerado quando necessário — dados humanos mais limitados', segundo_trimestre: 'Pode ser considerado quando necessário — dados humanos mais limitados', terceiro_trimestre: 'Pode ser considerado quando necessário — dados humanos mais limitados',
    lactacao: 'Avaliação individual', resumo_alerta: 'Não há sinal estabelecido de teratogenicidade, mas existem menos dados humanos que para omeprazol. Usar apenas com indicação clínica definida.',
    alternativa_conduta: 'Preferir omeprazol ou outro IBP mais estudado quando possível.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=001dd372-2692-4d6f-a71c-95e7056349a9',
    decisao_resumida_gestacao: 'USO COM AVALIAÇÃO INDIVIDUAL', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Dexlansoprazol', sinonimos_nomes_comerciais: 'Dexilant', principio_ativo_base: 'Dexlansoprazol',
    classe_farmacologica: 'Inibidor da bomba de prótons (IBP) — protetor gástrico', indicacoes_contexto: 'Refluxo e esofagite erosiva',
    primeiro_trimestre: 'Uso com cautela — dados diretos limitados', segundo_trimestre: 'Uso com cautela — dados diretos limitados', terceiro_trimestre: 'Uso com cautela — dados diretos limitados',
    lactacao: 'Avaliação individual', resumo_alerta: 'Os dados diretos em gestantes são limitados. A avaliação utiliza também dados do lansoprazol; não é opção preferencial quando existem alternativas mais estudadas.',
    alternativa_conduta: 'Preferir omeprazol ou outro IBP com maior experiência gestacional.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=9819f033-3bbe-442e-8e92-45fec77b237d',
    decisao_resumida_gestacao: 'USO COM CAUTELA/AVALIAÇÃO INDIVIDUAL', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Famotidina', sinonimos_nomes_comerciais: 'Pepcid', principio_ativo_base: 'Famotidina',
    classe_farmacologica: 'Antagonista H2 — protetor gástrico/redutor da secreção ácida', indicacoes_contexto: 'Refluxo, azia e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado', segundo_trimestre: 'Pode ser utilizado quando indicado', terceiro_trimestre: 'Pode ser utilizado quando indicado',
    lactacao: 'Compatível/geralmente aceitável', resumo_alerta: 'Os antagonistas H2 não apresentam riscos gestacionais claros identificados. Pode ser usado quando antiácidos, alginatos ou omeprazol não forem adequados.',
    alternativa_conduta: 'Medidas comportamentais, antiácidos, alginatos ou omeprazol.', disponibilidade_sus: 'Verificar Rename e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/h2-receptor-antagonists/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO INDICADO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Cimetidina', sinonimos_nomes_comerciais: 'Tagamet', principio_ativo_base: 'Cimetidina',
    classe_farmacologica: 'Antagonista H2 — protetor gástrico/redutor da secreção ácida', indicacoes_contexto: 'Refluxo, azia e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado', segundo_trimestre: 'Pode ser utilizado quando indicado', terceiro_trimestre: 'Pode ser utilizado quando indicado',
    lactacao: 'Pode ser utilizada com avaliação', resumo_alerta: 'Pode ser usada na gestação, porém possui mais interações medicamentosas e costuma ser menos preferida que famotidina ou omeprazol.',
    alternativa_conduta: 'Famotidina ou omeprazol quando adequados.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/h2-receptor-antagonists/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO INDICADO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Nizatidina', sinonimos_nomes_comerciais: 'Axid', principio_ativo_base: 'Nizatidina',
    classe_farmacologica: 'Antagonista H2 — protetor gástrico/redutor da secreção ácida', indicacoes_contexto: 'Refluxo, azia e doença ácido-péptica',
    primeiro_trimestre: 'Pode ser utilizado quando indicado — dados mais limitados', segundo_trimestre: 'Pode ser utilizado quando indicado — dados mais limitados', terceiro_trimestre: 'Pode ser utilizado quando indicado — dados mais limitados',
    lactacao: 'Avaliação individual', resumo_alerta: 'Não há riscos gestacionais claros identificados para a classe, mas a nizatidina possui menos dados e menor disponibilidade que famotidina.',
    alternativa_conduta: 'Famotidina ou omeprazol quando adequados.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://www.medicinesinpregnancy.org/leaflets-a-z/h2-receptor-antagonists/',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO COM AVALIAÇÃO INDIVIDUAL', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Ranitidina', sinonimos_nomes_comerciais: 'Cloridrato de ranitidina; Antak; Zantac', principio_ativo_base: 'Ranitidina',
    classe_farmacologica: 'Antagonista H2 — protetor gástrico/redutor da secreção ácida', indicacoes_contexto: 'Uso histórico em refluxo, azia e doença ácido-péptica',
    primeiro_trimestre: 'Uso condicionado à formulação regularizada e ao registro sanitário vigente', segundo_trimestre: 'Uso condicionado à formulação regularizada e ao registro sanitário vigente', terceiro_trimestre: 'Uso condicionado à formulação regularizada e ao registro sanitário vigente',
    lactacao: 'Avaliação individual e verificação regulatória',
    resumo_alerta: 'Dados gestacionais históricos não demonstraram aumento importante de malformações. Entretanto, lotes antigos foram recolhidos por risco de NDMA, as apresentações foram excluídas do SUS em 2021 e não deve ser escolha de rotina sem confirmar produto regularizado.',
    alternativa_conduta: 'Preferir famotidina, omeprazol, antiácido ou alginato conforme o quadro clínico.',
    disponibilidade_sus: 'Não padronizada — apresentações excluídas do SUS em 2021',
    fonte_ministerio_saude: 'https://bvsms.saude.gov.br/bvs/saudelegis/sctie/2021/prt0076_30_12_2021.html',
    fonte_rename: 'https://www.gov.br/conitec/pt-br/assuntos/avaliacao-de-tecnologias-em-saude/recomendacoes-da-conitec/2021-1',
    fonte_anvisa_bulario: 'https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2020/ranitidina-entenda-o-recolhimento-voluntario',
    fonte_adicional: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-approves-reformulated-ranitidine-following-comprehensive-safety-review',
    status: 'BASE EDUCACIONAL — não usar como escolha de rotina; confirmar registro, formulação, lote e condições de armazenamento',
    decisao_resumida_gestacao: 'USO CONDICIONADO À SITUAÇÃO REGULATÓRIA', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)',
    observacao_regulatoria: 'FDA aprovou formulação reformulada nos EUA em 24/11/2025; isso não substitui a verificação do registro sanitário da apresentação disponível no Brasil.'
  }),
  rec({
    principio_ativo: 'Carbonato de cálcio', sinonimos_nomes_comerciais: 'Antiácidos à base de carbonato de cálcio', principio_ativo_base: 'Carbonato de cálcio',
    classe_farmacologica: 'Antiácido — grupo de protetores gástricos', indicacoes_contexto: 'Azia e pirose; também pode ser usado como suplemento em indicação própria',
    primeiro_trimestre: 'Pode ser utilizado', segundo_trimestre: 'Pode ser utilizado', terceiro_trimestre: 'Pode ser utilizado',
    lactacao: 'Compatível/geralmente aceitável', resumo_alerta: 'Evitar excesso e uso prolongado sem avaliação. Manter intervalo de pelo menos 2 horas do ferro e do ácido fólico para não prejudicar a absorção.',
    alternativa_conduta: 'Medidas comportamentais ou alginato.', disponibilidade_sus: 'Consultar indicação, apresentação e padronização local',
    fonte_adicional: 'https://www.nhs.uk/pregnancy/common-symptoms/indigestion-and-heartburn/',
    decisao_resumida_gestacao: 'PODE SER UTILIZADO QUANDO INDICADO', categoria_risco_fda: 'Não aplicável/variável conforme apresentação'
  }),
  rec({
    principio_ativo: 'Hidróxido de alumínio', sinonimos_nomes_comerciais: 'Antiácidos com alumínio', principio_ativo_base: 'Hidróxido de alumínio',
    classe_farmacologica: 'Antiácido — grupo de protetores gástricos', indicacoes_contexto: 'Azia e pirose',
    primeiro_trimestre: 'Uso com cautela — preferir curto período', segundo_trimestre: 'Uso com cautela — preferir curto período', terceiro_trimestre: 'Uso com cautela — preferir curto período',
    lactacao: 'Uso ocasional geralmente aceitável', resumo_alerta: 'Evitar uso excessivo ou prolongado e ter cautela em doença renal. Pode causar constipação e interferir na absorção de outros medicamentos.',
    alternativa_conduta: 'Carbonato de cálcio ou alginato quando adequados.', disponibilidade_sus: 'Verificar padronização local',
    fonte_adicional: 'https://www.nhs.uk/medicines/antacids/',
    decisao_resumida_gestacao: 'USO COM CAUTELA/AVALIAÇÃO INDIVIDUAL', categoria_risco_fda: 'Não aplicável/variável conforme apresentação'
  }),
  rec({
    principio_ativo: 'Hidróxido de magnésio', sinonimos_nomes_comerciais: 'Leite de magnésia; antiácidos com magnésio', principio_ativo_base: 'Hidróxido de magnésio',
    classe_farmacologica: 'Antiácido e laxante osmótico — grupo de protetores gástricos', indicacoes_contexto: 'Azia; constipação em formulações e doses específicas',
    primeiro_trimestre: 'Uso com cautela — preferir curto período', segundo_trimestre: 'Uso com cautela — preferir curto período', terceiro_trimestre: 'Uso com cautela — preferir curto período',
    lactacao: 'Uso ocasional geralmente aceitável', resumo_alerta: 'Avaliar função renal, evitar excesso e observar diarreia ou alterações eletrolíticas. A dose antiácida não deve ser confundida com a dose laxativa.',
    alternativa_conduta: 'Carbonato de cálcio ou alginato para azia; medidas dietéticas para constipação.', disponibilidade_sus: 'Verificar padronização local',
    fonte_adicional: 'https://www.nhs.uk/medicines/antacids/',
    decisao_resumida_gestacao: 'USO COM CAUTELA/AVALIAÇÃO INDIVIDUAL', categoria_risco_fda: 'Não aplicável/variável conforme apresentação'
  }),
  rec({
    principio_ativo: 'Alginato de sódio', sinonimos_nomes_comerciais: 'Gaviscon e associações com alginato', principio_ativo_base: 'Alginato de sódio',
    classe_farmacologica: 'Barreira antirrefluxo — grupo de protetores gástricos', indicacoes_contexto: 'Azia e refluxo gastroesofágico',
    primeiro_trimestre: 'Pode ser utilizado', segundo_trimestre: 'Pode ser utilizado', terceiro_trimestre: 'Pode ser utilizado',
    lactacao: 'Compatível/geralmente aceitável', resumo_alerta: 'Forma uma barreira que reduz o refluxo e pode ser opção inicial na gestação. Conferir a composição da associação e o teor de sódio, especialmente em hipertensão ou edema.',
    alternativa_conduta: 'Medidas comportamentais e antiácidos apropriados.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://www.nhs.uk/pregnancy/common-symptoms/indigestion-and-heartburn/',
    decisao_resumida_gestacao: 'PODE SER OPÇÃO INICIAL QUANDO INDICADO', categoria_risco_fda: 'Não aplicável'
  }),
  rec({
    principio_ativo: 'Sucralfato', sinonimos_nomes_comerciais: 'Carafate', principio_ativo_base: 'Sucralfato',
    classe_farmacologica: 'Protetor de mucosa gástrica', indicacoes_contexto: 'Doença ulcerosa e proteção da mucosa em indicação específica',
    primeiro_trimestre: 'Pode ser utilizado quando claramente necessário', segundo_trimestre: 'Pode ser utilizado quando claramente necessário', terceiro_trimestre: 'Pode ser utilizado quando claramente necessário',
    lactacao: 'Uso com cautela/geralmente aceitável pela baixa absorção sistêmica', resumo_alerta: 'A absorção sistêmica é baixa, mas os dados controlados em gestantes são limitados. Separar de outros medicamentos por pelo menos 2 horas; cautela em doença renal por conter alumínio.',
    alternativa_conduta: 'Tratamento direcionado à causa; IBP ou antagonista H2 quando mais apropriados.', disponibilidade_sus: 'Verificar registro e padronização local',
    fonte_adicional: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=636edacc-ff9a-41c2-9903-14cf28b935a7',
    decisao_resumida_gestacao: 'PODE SER CONSIDERADO QUANDO CLARAMENTE NECESSÁRIO', categoria_risco_fda: 'B (histórica; não usar isoladamente para decisão)'
  }),
  rec({
    principio_ativo: 'Subsalicilato de bismuto', sinonimos_nomes_comerciais: 'Pepto-Bismol; Pepti-Calm', principio_ativo_base: 'Subsalicilato de bismuto',
    classe_farmacologica: 'Composto de bismuto com salicilato — não recomendado como protetor gástrico na gestação', indicacoes_contexto: 'Diarreia, dispepsia e azia fora da gestação',
    primeiro_trimestre: 'Evitar', segundo_trimestre: 'Evitar', terceiro_trimestre: 'Não utilizar — maior preocupação após 30 semanas',
    lactacao: 'Evitar', resumo_alerta: 'Contém salicilato. Não deve ser tratamento de rotina na gestação, com preocupação especial no terceiro trimestre e após 30 semanas.',
    alternativa_conduta: 'Escolher tratamento compatível com a causa: hidratação, antiácido, alginato ou outro medicamento adequado.', disponibilidade_sus: 'Não recomendado como rotina na gestação',
    fonte_adicional: 'https://www.nhs.uk/medicines/pepto-bismol/pregnancy-breastfeeding-and-fertility-while-taking-pepto-bismol/',
    decisao_resumida_gestacao: 'EVITAR/NÃO UTILIZAR NA GESTAÇÃO', categoria_risco_fda: 'C no início / D no terceiro trimestre (histórica e dependente do salicilato)'
  }),
  rec({
    principio_ativo: 'Subcitrato de bismuto', sinonimos_nomes_comerciais: 'Bismuto subcitrato; dicitrato tripotássico de bismuto', principio_ativo_base: 'Subcitrato de bismuto',
    classe_farmacologica: 'Composto de bismuto — protetor de mucosa/antiulceroso', indicacoes_contexto: 'Esquemas para doença ulcerosa ou Helicobacter pylori fora da gestação',
    primeiro_trimestre: 'Evitar — dados gestacionais insuficientes', segundo_trimestre: 'Evitar — dados gestacionais insuficientes', terceiro_trimestre: 'Evitar — dados gestacionais insuficientes',
    lactacao: 'Evitar/avaliação individual', resumo_alerta: 'Não há dados humanos adequados para recomendar uso rotineiro na gestação. Associações para H. pylori podem conter tetraciclina e outros componentes contraindicados; avaliar cada formulação separadamente.',
    alternativa_conduta: 'Adiar esquemas não urgentes ou utilizar alternativa definida por obstetra/gastroenterologista.', disponibilidade_sus: 'Não recomendado como rotina na gestação',
    fonte_adicional: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c29bfde9-5eb4-422a-bd30-4bce45e73dc0',
    decisao_resumida_gestacao: 'EVITAR — DADOS INSUFICIENTES', categoria_risco_fda: 'Não estabelecida para o composto isolado'
  })
];

const posology = {
  Esomeprazol: 'Uso adulto usual em refluxo: 20 mg VO 1 vez ao dia; individualizar indicação e duração.',
  Lansoprazol: 'Uso adulto usual: 15–30 mg VO 1 vez ao dia; individualizar indicação e duração.',
  Rabeprazol: 'Uso adulto usual: 20 mg VO 1 vez ao dia; preferir alternativa mais estudada na gestação quando possível.',
  Dexlansoprazol: 'Uso adulto usual: 30 mg VO 1 vez ao dia; não é opção preferencial na gestação.',
  Cimetidina: 'Posologia depende da indicação; revisar interações medicamentosas e preferir opção com maior experiência gestacional.',
  Nizatidina: 'Posologia depende da indicação; usar somente após avaliação médica e confirmação de disponibilidade.',
  Ranitidina: 'Não usar como escolha de rotina. Confirmar registro sanitário, formulação, lote e condições de armazenamento antes de qualquer prescrição.',
  'Alginato de sódio': 'Dose depende da formulação e das associações presentes; seguir bula do produto regularizado.',
  Sucralfato: 'Uso adulto usual em doença ulcerosa: 1 g VO 4 vezes ao dia; separar de outros medicamentos por pelo menos 2 horas.',
  'Subsalicilato de bismuto': 'Evitar na gestação; não cadastrar esquema de uso rotineiro.',
  'Subcitrato de bismuto': 'Evitar uso rotineiro na gestação; avaliar formulação e componentes associados.'
};

function normalize(value) {
  return String(value == null ? '' : value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

const extension = `\n${START_MARKER}\n(function () {\n  'use strict';\n  var PACKAGE_ID = 'gestamed-protetores-gastricos-2026-07-24-126';\n  var records = ${JSON.stringify(records, null, 2)};\n  var posology = ${JSON.stringify(posology, null, 2)};\n  function normalize(value) { return String(value == null ? '' : value).normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().trim(); }\n  function exactMatch(record, name) { return normalize(record && record.principio_ativo) === normalize(name) || normalize(record && record.principio_ativo_base) === normalize(name); }\n  if (!Array.isArray(GESTMED_DATA)) return;\n  var nextId = GESTMED_DATA.reduce(function (maxId, record) { var id = Number(record && record.id); return Number.isFinite(id) && id > maxId ? id : maxId; }, 0) + 1;\n  records.forEach(function (incoming) {\n    var existing = GESTMED_DATA.find(function (record) { return exactMatch(record, incoming.principio_ativo); });\n    if (existing) { var preservedId = existing.id; Object.keys(existing).forEach(function (key) { delete existing[key]; }); Object.assign(existing, incoming); existing.id = preservedId; }\n    else { var added = Object.assign({ id: nextId++ }, incoming); GESTMED_DATA.push(added); }\n  });\n  if (typeof GESTMED_POSOLOGIA_ADULTO !== 'undefined' && GESTMED_POSOLOGIA_ADULTO) Object.assign(GESTMED_POSOLOGIA_ADULTO, posology);\n  if (typeof GESTMED_META !== 'undefined' && GESTMED_META) {\n    GESTMED_META.versao = '2026.07.24.126';\n    GESTMED_META.data_revisao = '2026-07-24';\n    GESTMED_META.registros_base_clinica = 614;\n    GESTMED_META.registros_adicionais_indexacao = 900;\n    GESTMED_META.total_registros = GESTMED_DATA.length;\n    GESTMED_META.pacote_protetores_gastricos = PACKAGE_ID;\n  }\n})();\n${END_MARKER}\n`;

let source = fs.readFileSync(SOURCE, 'utf8');
const oldBlock = new RegExp('\\n?' + START_MARKER.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + '[\\s\\S]*?' + END_MARKER.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + '\\n?', 'g');
source = source.replace(oldBlock, '\n');
const dataMarker = '// data.js — GestMed';
const dataStart = source.indexOf(dataMarker);
const scriptEnd = source.indexOf('</script>', dataStart + dataMarker.length);
if (dataStart < 0 || scriptEnd < 0) throw new Error('Bloco permanente de dados não localizado');
source = source.slice(0, scriptEnd) + extension + source.slice(scriptEnd);
fs.writeFileSync(SOURCE, source);

let index = fs.readFileSync(INDEX, 'utf8');
if (!index.includes("'2026.07.23.125'")) throw new Error('Versão funcional 125 não encontrada no index');
index = index.replace("and fonte_603 contains '\"registros_adicionais_indexacao\":900' %}", "and fonte_603 contains '\"registros_adicionais_indexacao\":900' and fonte_603 contains 'GESTMED_GASTRIC_PACKAGE_126_START' %}");
index = index.replace(/2026\.07\.23\.125/g, '2026.07.24.126');
index = index.replace("%}603-1503{%", "%}614-1514{%");
fs.writeFileSync(INDEX, index);

console.log(JSON.stringify({ package: '126', records: records.length, expectedNew: 11, expectedClinical: 614, expectedTotal: 1514 }, null, 2));
