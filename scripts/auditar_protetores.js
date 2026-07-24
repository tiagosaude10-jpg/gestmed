const fs = require('fs');
const vm = require('vm');

const sourcePath = 'backups/gestamed-base-603-1503-fonte.html';
const text = fs.readFileSync(sourcePath, 'utf8');
const dataMarker = '// data.js — GestMed';
const start = text.indexOf(dataMarker);
const scriptEnd = text.indexOf('</script>', start + dataMarker.length);
if (start < 0 || scriptEnd < 0 || scriptEnd <= start) throw new Error('Bloco JavaScript da base não encontrado');
let block = text.slice(start + dataMarker.length, scriptEnd);
block = block.replace(/^\s*\([^\n]*\)\s*/, '');

const sandbox = { console: { log() {}, warn() {}, error() {} }, window: {}, document: {} };
vm.createContext(sandbox);
vm.runInContext(block, sandbox, { timeout: 30000, filename: 'gestamed-data.js' });

function readExpr(expr) {
  try { return vm.runInContext(expr, sandbox, { timeout: 5000 }); }
  catch (e) { return { __error: String(e && e.message || e) }; }
}
function norm(v) {
  return String(v == null ? '' : v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function recText(r) {
  try { return norm(JSON.stringify(r)); } catch { return ''; }
}

const vars = {};
for (const name of ['GESTMED_META','GESTMED_STRINGS','GESTMED_COMPACT','GESTMED_DATA','GESTMED_POSOLOGIA_ADULTO','RAW_DATA']) {
  const type = readExpr(`typeof ${name}`);
  let value = null;
  if (type !== 'undefined') value = readExpr(name);
  vars[name] = {
    type,
    isArray: Array.isArray(value),
    length: Array.isArray(value) ? value.length : null,
    keys: value && !Array.isArray(value) && typeof value === 'object' ? Object.keys(value).slice(0, 30) : null
  };
}

const data = readExpr(`typeof GESTMED_DATA !== 'undefined' ? GESTMED_DATA : (typeof RAW_DATA !== 'undefined' ? RAW_DATA : [])`);
if (!Array.isArray(data)) throw new Error('Nenhum array de dados encontrado');

const targets = [
  'Omeprazol','Pantoprazol','Esomeprazol','Lansoprazol','Rabeprazol','Dexlansoprazol',
  'Famotidina','Cimetidina','Nizatidina','Ranitidina',
  'Carbonato de cálcio','Hidróxido de alumínio','Hidróxido de magnésio','Alginato de sódio',
  'Sucralfato','Subsalicilato de bismuto','Subcitrato de bismuto'
];
const matches = {};
for (const target of targets) {
  const n = norm(target);
  matches[target] = data
    .map((r, i) => ({ index: i, record: r, text: recText(r) }))
    .filter(x => x.text.includes(n))
    .slice(0, 12)
    .map(x => ({ index: x.index, record: x.record }));
}

const sampleIndexes = new Set();
for (const arr of Object.values(matches)) for (const item of arr) sampleIndexes.add(item.index);
if (!sampleIndexes.size) {
  [0,1,2,10,50,100,200,400,600].forEach(i => { if (i < data.length) sampleIndexes.add(i); });
}
const samples = [...sampleIndexes].slice(0, 30).map(index => ({ index, record: data[index] }));

const report = {
  sourcePath,
  sourceBytes: Buffer.byteLength(text),
  dataBlockBytes: Buffer.byteLength(block),
  variables: vars,
  dataLength: data.length,
  firstRecordKeys: data[0] && typeof data[0] === 'object' ? Object.keys(data[0]) : [],
  matches,
  samples
};
fs.writeFileSync('auditoria-protetores.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ dataLength: report.dataLength, variables: report.variables, counts: Object.fromEntries(Object.entries(matches).map(([k,v]) => [k,v.length])) }, null, 2));
