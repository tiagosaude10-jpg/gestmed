import { chromium } from 'playwright';
import fs from 'node:fs';

const report = [];
const failures = [];
const runtimeErrors = [];
const say = (...parts) => report.push(parts.map((part) => typeof part === 'string' ? part : JSON.stringify(part, null, 2)).join(' '));
const normalize = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const expect = (condition, message) => { if (!condition) failures.push(message); };

const names = [
  'Omeprazol','Pantoprazol','Esomeprazol','Lansoprazol','Rabeprazol','Dexlansoprazol',
  'Famotidina','Cimetidina','Nizatidina','Ranitidina',
  'Carbonato de cálcio','Hidróxido de alumínio','Hidróxido de magnésio','Alginato de sódio',
  'Sucralfato','Subsalicilato de bismuto','Subcitrato de bismuto'
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1'
});
page.on('pageerror', (error) => runtimeErrors.push('PAGEERROR: ' + (error.stack || error.message)));
page.on('console', (message) => { if (message.type() === 'error') runtimeErrors.push('CONSOLE: ' + message.text()); });
page.on('requestfailed', (request) => runtimeErrors.push('REQUESTFAILED: ' + request.url() + ' ' + (request.failure()?.errorText || '')));

try {
  const response = await page.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(4000);
  expect(response?.status() === 200, 'A página não respondeu com HTTP 200');

  const snapshot = await page.evaluate((expectedNames) => {
    const normalizeInPage = (value) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    const data = typeof GESTMED_DATA !== 'undefined' && Array.isArray(GESTMED_DATA) ? GESTMED_DATA : [];
    const exact = {};
    expectedNames.forEach((name) => {
      const wanted = normalizeInPage(name);
      exact[name] = data.filter((record) => normalizeInPage(record?.principio_ativo) === wanted || normalizeInPage(record?.principio_ativo_base) === wanted);
    });
    return {
      build: document.documentElement.getAttribute('data-gestamed-build'),
      base: document.documentElement.getAttribute('data-base-integrada'),
      readyState: document.readyState,
      dataLength: data.length,
      meta: typeof GESTMED_META !== 'undefined' ? GESTMED_META : null,
      exact,
      inputPresent: !!document.querySelector('#search, #searchInput, input[type="search"], input[placeholder*="medicamento" i]'),
      clearPresent: !!document.querySelector('#gm-search-clear-button'),
      filterStripPresent: !!document.querySelector('.gm-filter-strip'),
      bodyLength: document.body?.innerText?.length || 0
    };
  }, names);

  say('SNAPSHOT', snapshot);
  expect(snapshot.build === '2026.07.24.126', 'Build esperado 2026.07.24.126, obtido ' + snapshot.build);
  expect(snapshot.base === '614-1514', 'Marcador da base esperado 614-1514, obtido ' + snapshot.base);
  expect(snapshot.readyState === 'complete', 'Documento não completou o carregamento');
  expect(snapshot.dataLength === 1514, 'GESTMED_DATA deveria conter 1514 registros, contém ' + snapshot.dataLength);
  expect(snapshot.meta?.registros_base_clinica === 614, 'Contador clínico diferente de 614');
  expect(snapshot.meta?.registros_adicionais_indexacao === 900, 'Contador de indexação diferente de 900');
  expect(snapshot.meta?.total_registros === 1514, 'Contador total diferente de 1514');
  expect(snapshot.inputPresent, 'Campo de pesquisa ausente');
  expect(snapshot.clearPresent, 'Botão X ausente');
  expect(snapshot.filterStripPresent, 'Barra de filtros ausente');
  expect(snapshot.bodyLength > 1000, 'Conteúdo principal não foi montado');

  for (const name of names) {
    const records = snapshot.exact[name] || [];
    expect(records.length === 1, `${name}: esperado exatamente 1 registro, encontrado ${records.length}`);
    if (records[0]) expect(normalize(records[0].grupo_navegacao).includes('protetor gastrico'), `${name}: grupo de navegação não cadastrado`);
  }
  const ranitidine = snapshot.exact.Ranitidina?.[0];
  const omeprazole = snapshot.exact.Omeprazol?.[0];
  const bismuthSalicylate = snapshot.exact['Subsalicilato de bismuto']?.[0];
  const bismuthSubcitrate = snapshot.exact['Subcitrato de bismuto']?.[0];
  expect(normalize(ranitidine?.decisao_resumida_gestacao).includes('situacao regulatoria'), 'Ranitidina sem classificação regulatória correta');
  expect(normalize(ranitidine?.resumo_alerta).includes('ndma'), 'Ranitidina sem alerta de NDMA');
  expect(normalize(omeprazole?.decisao_resumida_gestacao).includes('preferencial'), 'Omeprazol sem indicação de opção preferencial');
  expect(normalize(bismuthSalicylate?.decisao_resumida_gestacao).includes('evitar'), 'Subsalicilato de bismuto sem alerta de evitar');
  expect(normalize(bismuthSubcitrate?.decisao_resumida_gestacao).includes('dados insuficientes'), 'Subcitrato de bismuto sem alerta de dados insuficientes');

  const input = page.locator('#search, #searchInput, input[type="search"], input[placeholder*="medicamento" i]').first();
  for (const term of [...names, 'Antak', 'Zantac', 'Paracetamol', 'Dipirona', 'Buscopan']) {
    await input.fill('');
    await page.waitForTimeout(120);
    await input.fill(term);
    await page.waitForTimeout(500);
    const body = normalize(await page.locator('body').innerText());
    const found = body.includes(normalize(term)) || (term === 'Antak' && body.includes('ranitidina')) || (term === 'Zantac' && body.includes('ranitidina'));
    say('PESQUISA', term, found ? 'OK' : 'FALHOU');
    expect(found, `Pesquisa não apresentou resultado para ${term}`);
  }

  await input.fill('');
  await page.waitForTimeout(250);
  const gastricButton = page.getByRole('button', { name: /protetores gástricos/i }).first();
  expect(await gastricButton.count() === 1, 'Botão Protetores gástricos ausente');
  if (await gastricButton.count()) {
    await gastricButton.click({ force: true });
    await page.waitForTimeout(600);
    const filterValue = await input.inputValue();
    const body = normalize(await page.locator('body').innerText());
    say('FILTRO_PROTETORES', filterValue);
    expect(filterValue.length > 0, 'Filtro Protetores gástricos não preencheu a pesquisa');
    expect(body.includes('omeprazol') || body.includes('pantoprazol') || body.includes('famotidina'), 'Filtro Protetores gástricos não mostrou medicamentos do grupo');
  }

  const clear = page.locator('#gm-search-clear-button');
  await clear.click({ force: true });
  await page.waitForTimeout(400);
  expect((await input.inputValue()) === '', 'Botão X não limpou a pesquisa');

  const dor = page.getByRole('button', { name: /dor/i }).first();
  expect(await dor.count() === 1, 'Botão Dor ausente');
  if (await dor.count()) {
    await dor.click({ force: true });
    await page.waitForTimeout(450);
    const categoryOpen = await page.locator('#categoryModal').count() ? await page.locator('#categoryModal').evaluate((element) => element.classList.contains('open')) : false;
    expect(categoryOpen, 'Botão Dor não abriu a categoria');
    if (await page.locator('#categoryModal').count()) await page.locator('#categoryModal').evaluate((element) => element.classList.remove('open'));
  }

  for (const quickName of ['Painel de Exames', 'Prescrições por Trimestre']) {
    const button = page.getByText(quickName, { exact: false }).first();
    expect(await button.count() > 0, `${quickName}: acesso rápido ausente`);
    if (await button.count()) {
      const beforeErrors = runtimeErrors.length;
      await button.click({ force: true });
      await page.waitForTimeout(550);
      expect(runtimeErrors.length === beforeErrors, `${quickName}: gerou erro JavaScript ao abrir`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(150);
      await page.evaluate(() => {
        document.querySelectorAll('.modal.open, [role="dialog"].open').forEach((element) => element.classList.remove('open'));
      });
    }
  }

  await input.fill('dipirona');
  await page.waitForTimeout(450);
  expect((await input.inputValue()) === 'dipirona', 'Pesquisa manual deixou de funcionar após filtros e módulos');
  expect(normalize(await page.locator('body').innerText()).includes('dipirona'), 'Resultado da pesquisa manual não apareceu ao final');

  expect(runtimeErrors.length === 0, 'Foram detectados erros de execução: ' + runtimeErrors.join(' | '));
} catch (error) {
  failures.push('FATAL: ' + (error.stack || error.message));
} finally {
  if (runtimeErrors.length) say('ERROS_RUNTIME', runtimeErrors);
  if (failures.length) say('FALHAS', failures); else say('RESULTADO', 'TODOS OS TESTES PASSARAM');
  fs.writeFileSync('validacao-protetores-126.txt', report.join('\n\n'), 'utf8');
  try { await page.screenshot({ path: 'validacao-protetores-126.png', fullPage: true }); } catch {}
  await browser.close();
}

console.log(report.join('\n\n'));
if (failures.length) process.exit(1);
