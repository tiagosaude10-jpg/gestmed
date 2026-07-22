from pathlib import Path
import json, re

index_path = Path('index.html')
text = index_path.read_text(encoding='utf-8')
versions_found = re.findall(r'2026\.07\.22\.\d+', text)
VERSION = max(versions_found, key=lambda value: int(value.rsplit('.', 1)[1])) if versions_found else '2026.07.22.58'
marker = 'const PROTOCOLOS='
start = text.index(marker) + len(marker)
end = text.index('];\n\n  const modal', start) + 1
protocols = json.loads(text[start:end])
by_id = {p['id']: p for p in protocols}
updated = []


def get(pid):
    p = by_id.get(pid)
    if p is None:
        print(f'AVISO: protocolo ausente: {pid}')
    return p


def set_list_item(pid, field, prefix, new_text):
    p = get(pid)
    if not p:
        return
    items = p.get(field, [])
    for i, item in enumerate(items):
        if isinstance(item, str) and item.startswith(prefix):
            items[i] = new_text
            updated.append(f'{pid}.{field}[{i}]')
            return
    raise RuntimeError(f'Item com prefixo {prefix!r} não encontrado em {pid}.{field}')


def set_source(pid, source):
    p = get(pid)
    if not p:
        return
    p['fonte'] = source
    updated.append(f'{pid}.fonte')


INDUCAO_RX = (
    'MEDICAÇÕES — OCITOCINA (prescrever em UI/mUI, não em mg): preparar 1 ampola de 5 UI em 500 mL de SF 0,9% '
    '(concentração 10 mUI/mL), preferencialmente em bomba e via exclusiva. Esquema de baixa dose: iniciar 1–2 mUI/min '
    '(6–12 mL/h); aumentar 1–2 mUI/min (6–12 mL/h) a cada 30 minutos, somente após reavaliar dinâmica uterina e BCF/CTG, '
    'até obter 3–5 contrações em 10 minutos. Dose máxima no esquema de baixa dose: 20 mUI/min (120 mL/h). '
    'Esquema de alta dose, apenas quando previsto no protocolo institucional: iniciar 4–6 mUI/min (24–36 mL/h), aumentar 4–6 mUI/min '
    'a cada 30 minutos e limitar a 40 mUI/min (240 mL/h). Não administrar bolus EV para indução/condução. '
    'Suspender imediatamente se houver mais de 5 contrações em 10 minutos, taquissistolia, hipertonia, alteração fetal, sangramento, '
    'dor uterina contínua ou suspeita de rotura uterina.'
)

INDUCAO_SHORT = (
    'MEDICAÇÕES — Se a obstetrícia decidir iniciar ou manter ocitocina: 5 UI em 500 mL de SF 0,9% (10 mUI/mL), por bomba. '
    'Iniciar 1–2 mUI/min (6–12 mL/h) e aumentar 1–2 mUI/min a cada 30 minutos após avaliação da dinâmica e CTG, '
    'até 3–5 contrações/10 minutos; máximo de 20 mUI/min no esquema de baixa dose. Doses até 40 mUI/min somente em esquema institucional '
    'de alta dose. Suspender em taquissistolia, hipertonia, alteração fetal, sangramento ou dor contínua. Ocitocina é prescrita em UI/mUI, não em mg.'
)

HPP_TREATMENT = (
    'MEDICAÇÕES — HPP/ATONIA: ocitocina 5 UI EV lentamente, em 3 minutos, seguida imediatamente de 20–40 UI em 500 mL de SF 0,9% '
    'ou Ringer lactato a 250 mL/h em bomba. Após controle do sangramento, reduzir para manutenção conforme protocolo: 20 UI em 500 mL '
    'a 125 mL/h por cerca de 4 horas; em atonia grave ou risco de recorrência, pode-se manter 20 UI em 500 mL a 67,5 mL/h por até 24 horas. '
    'Não insistir isoladamente na ocitocina se a resposta for inadequada; avançar rapidamente para uterotônicos de segunda linha e medidas mecânicas/cirúrgicas. '
    'Ácido tranexâmico 1 g EV em 10 minutos, o mais cedo possível e até 3 horas do início; repetir 1 g após 30 minutos se o sangramento persistir ou reiniciar. '
    'Ocitocina é prescrita em UI/mUI, não em mg.'
)

SOURCE_INDUCTION = (
    'Dose e preparo: HC-UFMG/Ebserh PR 215 — Indução do Trabalho de Parto e PR 326 — Assistência ao Parto. '
    'Uso racional e monitorização: Ministério da Saúde, Diretriz Nacional de Assistência ao Parto Normal, e FEBRASGO, recomendações sobre distocias e uso criterioso de ocitocina. '
    'Adaptar ao protocolo institucional e à avaliação do obstetra responsável.'
)
SOURCE_HPP = (
    'Dose e velocidade: HC-UFMG/Ebserh PRT.UMUL.380 — Hemorragia Pós-Parto (2024) e FEBRASGO, fluxograma de tratamento da hemorragia pós-parto. '
    'Adaptar à apresentação disponível, protocolo institucional, condição hemodinâmica e avaliação obstétrica/anestésica.'
)

# Indução, condução e distocias
p = get('ocitocina_inducao_conducao')
if p:
    p['resumo'][0] = 'Ocitocina é prescrita em UI ou mUI (não em mg) e deve ser administrada por bomba de infusão, com diluição, velocidade e incrementos claramente registrados.'
    p['conduta'][0] = 'Preferir esquema de baixa dose; somente utilizar esquema de alta dose quando formalmente padronizado pelo serviço.'
    set_list_item('ocitocina_inducao_conducao', 'prescricao', 'ACESSO VENOSO E SOROTERAPIA —',
        'ACESSO VENOSO E SOROTERAPIA — Manter acesso venoso pérvio e, sempre que possível, via exclusiva. Diluição padrão: ocitocina 5 UI em 500 mL de SF 0,9%, resultando em 10 mUI/mL. Usar bomba de infusão.')
    set_list_item('ocitocina_inducao_conducao', 'prescricao', 'MEDICAÇÕES —', INDUCAO_RX)
    set_list_item('ocitocina_inducao_conducao', 'prescricao', 'BCF / CARDIOTOCOGRAFIA —',
        'BCF / CARDIOTOCOGRAFIA — Cardiotocografia contínua durante a infusão. Avaliar e registrar dinâmica uterina e padrão fetal antes do início e antes de cada incremento, com intervalo mínimo de 30 minutos.')
    set_source('ocitocina_inducao_conducao', SOURCE_INDUCTION)

set_list_item('maturacao_cervical_inducao', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Útero sem cicatriz e Bishop desfavorável: misoprostol 25 microgramas via vaginal a cada 6 horas, conforme dinâmica uterina, BCF e protocolo; não repetir se trabalho de parto ativo, taquissistolia ou alteração fetal e não usar em cicatriz uterina. Para iniciar ocitocina, aguardar pelo menos 4 horas após a última dose de misoprostol. Então preparar 5 UI em 500 mL de SF 0,9% (10 mUI/mL), iniciar 1–2 mUI/min (6–12 mL/h) e aumentar 1–2 mUI/min a cada 30 minutos até 3–5 contrações/10 minutos; máximo de 20 mUI/min no esquema de baixa dose. Ocitocina é prescrita em UI/mUI, não em mg.')
set_source('maturacao_cervical_inducao', SOURCE_INDUCTION)
set_list_item('falha_inducao', 'prescricao', 'MEDICAÇÕES —', INDUCAO_SHORT)
set_source('falha_inducao', SOURCE_INDUCTION)
set_list_item('parada_dilatacao', 'prescricao', 'MEDICAÇÕES —', INDUCAO_SHORT)
set_source('parada_dilatacao', SOURCE_INDUCTION)
set_list_item('parada_descida', 'prescricao', 'MEDICAÇÕES —', INDUCAO_SHORT)
set_source('parada_descida', SOURCE_INDUCTION)
set_list_item('rotura_prematura_membranas_termo', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Indução/condução: ocitocina 5 UI em 500 mL de SF 0,9% (10 mUI/mL), por bomba; iniciar 1–2 mUI/min (6–12 mL/h) e aumentar 1–2 mUI/min a cada 30 minutos até 3–5 contrações/10 minutos, máximo de 20 mUI/min no esquema de baixa dose. Suspender diante de taquissistolia ou alteração fetal. Profilaxia para EGB quando indicada: penicilina G cristalina 5 milhões UI EV, seguida de 2,5 milhões UI EV a cada 4 horas até o parto; alternativa ampicilina 2 g EV, seguida de 1 g EV a cada 4 horas. Não usar antibiótico apenas pela rotura a termo se EGB negativo e sem infecção.')
set_source('rotura_prematura_membranas_termo', SOURCE_INDUCTION)
set_list_item('obito_fetal', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Regime de misoprostol deve seguir idade gestacional, cicatriz uterina e protocolo do serviço. Quando houver colo favorável e indicação de ocitocina: preparar 5 UI em 500 mL de SF 0,9% (10 mUI/mL), iniciar 1–2 mUI/min (6–12 mL/h) e aumentar 1–2 mUI/min a cada 30 minutos conforme dinâmica; máximo de 20 mUI/min no esquema de baixa dose. Cicatriz uterina exige avaliação sênior, método individualizado e vigilância de rotura. Ocitocina é prescrita em UI/mUI, não em mg. Prescrever analgesia e antiemético conforme necessidade.')
set_source('obito_fetal', SOURCE_INDUCTION)

# HPP, atonia e situações pós-parto
set_list_item('hemorragia_pos_parto', 'prescricao', 'MEDICAÇÕES —', HPP_TREATMENT)
set_source('hemorragia_pos_parto', SOURCE_HPP)
set_list_item('atonia_uterina', 'prescricao', 'MEDICAÇÕES —', HPP_TREATMENT)
set_source('atonia_uterina', SOURCE_HPP)
set_list_item('inversao_uterina', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Suspender ocitocina e outros uterotônicos até a reposição uterina. Se relaxamento for necessário: nitroglicerina 50–100 microgramas EV em bolus, podendo repetir sob monitorização anestésica, ou terbutalina 0,25 mg SC, conforme contraindicações. Após reposição: ocitocina 5 UI EV lentamente em 3 minutos, seguida de 20–40 UI em 500 mL de SF 0,9% ou Ringer lactato a 250 mL/h; reduzir a manutenção após controle conforme protocolo. Se HPP, administrar também ácido tranexâmico 1 g EV em 10 minutos. Ocitocina é prescrita em UI/mUI, não em mg.')
set_source('inversao_uterina', SOURCE_HPP)
set_list_item('retencao_placentaria', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Não repetir uterotônicos apenas para “forçar” a dequitação quando houver suspeita de placenta encarcerada ou necessidade de remoção manual. Preparar analgesia/anestesia e antibioticoprofilaxia conforme protocolo. Após a retirada, se houver atonia ou HPP: ocitocina 5 UI EV lentamente em 3 minutos, seguida de 20–40 UI em 500 mL de SF 0,9% ou Ringer lactato a 250 mL/h, com manutenção após controle conforme protocolo. Ocitocina é prescrita em UI/mUI, não em mg.')
set_source('retencao_placentaria', SOURCE_HPP)
set_list_item('distocia_ombro', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Suspender ocitocina durante a distocia; nenhum fármaco substitui as manobras. Após o nascimento, fazer profilaxia de HPP com ocitocina 10 UI IM, dose única, imediatamente após o parto. Se houver atonia/sangramento, usar esquema terapêutico: 5 UI EV lentamente em 3 minutos, seguida de 20–40 UI em 500 mL a 250 mL/h. Ocitocina é prescrita em UI/mUI, não em mg.')
set_source('distocia_ombro', SOURCE_HPP)
set_list_item('parto_precipitado', 'prescricao', 'MEDICAÇÕES —',
    'MEDICAÇÕES — Suspender ocitocina de condução. Após o nascimento, profilaxia universal de HPP: ocitocina 10 UI IM, dose única, imediatamente após o parto. Se houver atonia ou sangramento, administrar 5 UI EV lentamente em 3 minutos, seguida de 20–40 UI em 500 mL de SF 0,9% ou Ringer lactato a 250 mL/h, com manutenção após controle conforme protocolo. Ocitocina é prescrita em UI/mUI, não em mg.')
set_source('parto_precipitado', SOURCE_HPP)

# Textos de segurança em que a conduta principal é suspender a infusão
for pid in ['taquissistolia_uterina', 'alteracao_aguda_vitalidade_fetal', 'rotura_uterina', 'prolapso_cordao', 'liquido_meconial_intraparto']:
    p = get(pid)
    if p:
        complemento = ' Segurança da infusão: HC-UFMG/Ebserh PR 326 — Assistência ao Parto.'
        if complemento.strip() not in p.get('fonte', ''):
            p['fonte'] = p.get('fonte', '') + complemento
            updated.append(f'{pid}.fonte')

positive_ids = {
    'ocitocina_inducao_conducao', 'maturacao_cervical_inducao', 'falha_inducao',
    'parada_dilatacao', 'parada_descida', 'rotura_prematura_membranas_termo',
    'obito_fetal', 'hemorragia_pos_parto', 'atonia_uterina', 'inversao_uterina',
    'retencao_placentaria', 'distocia_ombro', 'parto_precipitado'
}
problems = []
for pid in sorted(positive_ids):
    p = by_id.get(pid)
    if not p:
        continue
    meds = [x for x in p.get('prescricao', []) if isinstance(x, str) and x.startswith('MEDICAÇÕES —')]
    if not meds:
        problems.append(f'{pid}: seção MEDICAÇÕES ausente')
        continue
    item = meds[0]
    low = item.lower()
    if 'ocitocin' not in low:
        problems.append(f'{pid}: ocitocina não localizada na seção MEDICAÇÕES')
    if not re.search(r'\b(?:ui|mui)\b', item, flags=re.I):
        problems.append(f'{pid}: unidade UI/mUI ausente')
    if pid in {'ocitocina_inducao_conducao', 'maturacao_cervical_inducao', 'falha_inducao', 'parada_dilatacao', 'parada_descida', 'rotura_prematura_membranas_termo', 'obito_fetal'}:
        if not ('ml/h' in low and 'mui/min' in low):
            problems.append(f'{pid}: velocidade de infusão incompleta')
    if pid in {'hemorragia_pos_parto', 'atonia_uterina', 'inversao_uterina', 'retencao_placentaria', 'distocia_ombro', 'parto_precipitado'}:
        if not ('ev' in low or 'im' in low):
            problems.append(f'{pid}: via de administração ausente')

if problems:
    raise RuntimeError('Auditoria da ocitocina falhou:\n' + '\n'.join(problems))

block = json.dumps(protocols, ensure_ascii=False, separators=(',', ':'))
text = text[:start] + block + text[end:]
text = re.sub(r'2026\.07\.22\.\d+', VERSION, text)
if 'const const' in text:
    raise RuntimeError('Erro de sintaxe detectado: const const')
index_path.write_text(text, encoding='utf-8')

import subprocess
import tempfile
scripts = []
for match in re.finditer(r'<script([^>]*)>(.*?)</script>', text, flags=re.S | re.I):
    attrs, code = match.group(1), match.group(2)
    if re.search(r'\bsrc\s*=', attrs, flags=re.I):
        continue
    tipo = re.search(r'\btype\s*=\s*["\']([^"\']+)', attrs, flags=re.I)
    if tipo and tipo.group(1).lower() not in {'text/javascript', 'application/javascript', 'module'}:
        continue
    if code.strip():
        scripts.append(code)
for i, code in enumerate(scripts, 1):
    with tempfile.NamedTemporaryFile('w', suffix='.js', encoding='utf-8', delete=False) as tmp:
        tmp.write(code)
        tmp_path = tmp.name
    result = subprocess.run(['node', '--check', tmp_path], capture_output=True, text=True)
    Path(tmp_path).unlink(missing_ok=True)
    if result.returncode:
        raise RuntimeError(f'JavaScript inline {i} inválido:\n{result.stderr}')

print(f'Atualizações aplicadas: {len(updated)}')
print(f'Protocolos auditados: {len(protocols)}')
print(f'Blocos JavaScript validados: {len(scripts)}')
