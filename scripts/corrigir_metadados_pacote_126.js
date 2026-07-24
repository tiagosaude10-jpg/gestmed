const fs = require('fs');

const sourcePath = 'backups/gestamed-base-603-1503-fonte.html';
const indexPath = 'index.html';
let source = fs.readFileSync(sourcePath, 'utf8');
let index = fs.readFileSync(indexPath, 'utf8');

if (!source.includes('GESTMED_GASTRIC_PACKAGE_126_START')) throw new Error('Pacote gástrico 126 não encontrado');
if (!index.includes('2026.07.24.126')) throw new Error('Index 126 não encontrado');

const replacements = [
  [/'nome_base':'GestMed — Base ampliada com 1\.503 entradas pesquisáveis'/g, "'nome_base':'GestMed — Base ampliada com 1.514 entradas pesquisáveis'"],
  [/"nome_base":"GestMed — Base ampliada com 1\.503 entradas pesquisáveis"/g, '"nome_base":"GestMed — Base ampliada com 1.514 entradas pesquisáveis"'],
  [/'total_registros':1503/g, "'total_registros':1514"],
  [/"total_registros":1503/g, '"total_registros":1514'],
  [/'registros_base_clinica':603/g, "'registros_base_clinica':614"],
  [/"registros_base_clinica":603/g, '"registros_base_clinica":614'],
  [/A base contém 600 registros de princípios ativos\/base clínica e 900 formas salinas/g, 'A base contém 614 registros de princípios ativos/base clínica e 900 formas salinas']
];
for (const [pattern, replacement] of replacements) source = source.replace(pattern, replacement);

const metaAnchor = "    GESTMED_META.versao = '2026.07.24.126';";
const metaExpanded = [
  "    GESTMED_META.nome_base = 'GestMed — Base ampliada com 1.514 entradas pesquisáveis';",
  "    GESTMED_META.versao = '2026.07.24.126';",
  "    GESTMED_META.nota_metodologica = 'A base contém 614 registros de princípios ativos/base clínica e 900 formas salinas, ésteres ou derivados adicionados para indexação. As 900 entradas adicionais não são classificações gestacionais independentes e não devem herdar automaticamente a segurança do princípio ativo-base. Cada forma deve ser confirmada na Lista DCB vigente, na consulta de medicamentos regularizados e na bula profissional da Anvisa.';"
].join('\n');
if (!source.includes(metaExpanded)) {
  if (!source.includes(metaAnchor)) throw new Error('Âncora dos metadados 126 não encontrada');
  source = source.replace(metaAnchor, metaExpanded);
}

index = index
  .replace("fonte_603 contains '\"total_registros\":1503'", "fonte_603 contains '\"total_registros\":1514'")
  .replace("fonte_603 contains '\"registros_base_clinica\":603'", "fonte_603 contains '\"registros_base_clinica\":614'");

const required = [
  'GestMed — Base ampliada com 1.514 entradas pesquisáveis',
  '"total_registros":1514',
  '"registros_base_clinica":614',
  'A base contém 614 registros de princípios ativos/base clínica',
  "fonte_603 contains '\"total_registros\":1514'",
  "fonte_603 contains '\"registros_base_clinica\":614'"
];
for (const marker of required) {
  if (!(source.includes(marker) || index.includes(marker))) throw new Error('Marcador final ausente: ' + marker);
}

fs.writeFileSync(sourcePath, source);
fs.writeFileSync(indexPath, index);
console.log('METADADOS_126_CORRIGIDOS');
