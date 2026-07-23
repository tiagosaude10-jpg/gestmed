from pathlib import Path
import json
import re
import unicodedata

INDEX_PATH = Path('index.html')
BUILD = '2026.07.23.91'
REVIEW_DATE = '2026-07-23'

INDEXED_FIELDS = [
    'classe_farmacologica',
    'indicacoes_contexto',
    'primeiro_trimestre',
    'segundo_trimestre',
    'terceiro_trimestre',
    'lactacao',
    'resumo_alerta',
    'alternativa_conduta',
    'disponibilidade_sus',
    'nivel_validacao',
    'fonte_ministerio_saude',
    'fonte_rename',
    'fonte_anvisa_bulario',
    'fonte_lactacao_ms',
    'fonte_adicional',
    'fonte_dcb_anvisa',
    'data_revisao_base',
    'status',
    'decisao_resumida_gestacao',
    'tipo_registro',
    'categoria_risco_fda',
]

DIRECT_FIELDS = [
    'principio_ativo',
    'sinonimos_nomes_comerciais',
    'principio_ativo_base',
]

ANVISA_BULARIO = 'https://www.gov.br/anvisa/pt-br/sistemas/bulario-eletronico'
RENAME = 'https://www.gov.br/saude/pt-br/composicao/sectics/rename'
LACTACAO_MS = 'https://www.gov.br/saude/pt-br/assuntos/saude-da-crianca/publicacoes/amamentacao-e-uso-de-medicamentos-e-outras-substancias-2a-edicao/view'
DCB_ANVISA = 'https://bibliotecadigital.anvisa.gov.br/jspui/handle/anvisa/20673'


def normalize(value: str) -> str:
    value = unicodedata.normalize('NFD', value or '')
    value = ''.join(char for char in value if unicodedata.category(char) != 'Mn')
    return re.sub(r'\s+', ' ', value.casefold()).strip()


def extract_json_const(text: str, name: str, next_name: str):
    prefix = f'const {name} = '
    start = text.index(prefix) + len(prefix)
    end = text.index(f';\n\nconst {next_name}', start)
    return start, end, json.loads(text[start:end])


def replace_json_const(text: str, name: str, next_name: str, value) -> str:
    start, end, _ = extract_json_const(text, name, next_name)
    payload = json.dumps(value, ensure_ascii=False, separators=(',', ':'))
    return text[:start] + payload + text[end:]


def append_posology(text: str, entries: dict[str, str]) -> str:
    marker = 'const GESTMED_POSOLOGIA_ADULTO = {'
    start = text.index(marker)
    end_marker = '\n};\n\nfunction gestmedGetPosologiaAdulto'
    end = text.index(end_marker, start)
    block = text[start:end]

    additions = []
    for key, value in entries.items():
        quoted_key = json.dumps(key, ensure_ascii=False)
        if f'{quoted_key}:' in block:
            continue
        additions.append(f'  {quoted_key}: {json.dumps(value, ensure_ascii=False)},')

    if additions:
        block = block.rstrip() + '\n' + '\n'.join(additions) + '\n'
        text = text[:start] + block + text[end:]
    return text


def main():
    text = INDEX_PATH.read_text(encoding='utf-8')

    _, _, meta = extract_json_const(text, 'GESTMED_META', 'GESTMED_STRINGS')
    _, _, strings = extract_json_const(text, 'GESTMED_STRINGS', 'GESTMED_COMPACT')
    _, _, records = extract_json_const(text, 'GESTMED_COMPACT', 'GESTMED_DATA')

    string_to_index = {value: index for index, value in enumerate(strings)}

    def string_index(value: str) -> int:
        if value not in string_to_index:
            string_to_index[value] = len(strings)
            strings.append(value)
        return string_to_index[value]

    definitions = [
        {
            'match_key': 'butilbrometo de escopolamina (buscopan)',
            'principio_ativo': 'Butilbrometo de escopolamina (Buscopan)',
            'sinonimos_nomes_comerciais': 'Buscopan; Buscopan simples; Buscopan verde; Buscopan drágeas; Buscopan gotas; Buscopan Pediátrico; Buscopan pediátrico gotas; Buscopan ampola; Buscopan injetável; brometo de N-butilescopolamina; escopolamina butilbrometo; hioscina butilbrometo; hyoscine butylbromide',
            'principio_ativo_base': 'Butilbrometo de escopolamina',
            'classe_farmacologica': 'Antiespasmódico anticolinérgico',
            'indicacoes_contexto': 'Cólicas e espasmos dos tratos gastrointestinal, biliar e geniturinário',
            'primeiro_trimestre': 'Uso com cautela — existem poucos dados em gestantes; a bula recomenda evitar por precaução e utilizar somente com orientação médica quando o benefício justificar.',
            'segundo_trimestre': 'Uso com cautela — utilizar somente com orientação médica; evitar automedicação e investigar a causa da dor abdominal.',
            'terceiro_trimestre': 'Uso com cautela — não há liberação automática pelo trimestre; usar somente com orientação médica e pelo menor tempo necessário.',
            'lactacao': 'Evitar por precaução — há informações insuficientes sobre a presença no leite materno.',
            'resumo_alerta': 'Buscopan simples contém apenas butilbrometo de escopolamina. Não confundir com Buscopan Composto, que contém dipirona, nem com Buscoduo, que contém paracetamol. Poucos dados estão disponíveis na gestação; não usar para mascarar dor abdominal persistente ou sinais de urgência obstétrica.',
            'alternativa_conduta': 'Investigar a causa da cólica ou dor abdominal e adotar tratamento etiológico; considerar medidas não farmacológicas e opções com melhor perfil conforme o diagnóstico.',
            'disponibilidade_sus': 'Verificar Rename e padronização local',
            'nivel_validacao': 'Bula oficial do produto + fonte regulatória consultada',
            'fonte_ministerio_saude': '',
            'fonte_rename': RENAME,
            'fonte_anvisa_bulario': ANVISA_BULARIO,
            'fonte_lactacao_ms': LACTACAO_MS,
            'fonte_adicional': 'https://www.buscopan.com.br/bula-buscopan',
            'fonte_dcb_anvisa': DCB_ANVISA,
            'data_revisao_base': REVIEW_DATE,
            'status': 'BASE EDUCACIONAL — validar bula, apresentação e protocolo antes do uso',
            'decisao_resumida_gestacao': 'USO COM CAUTELA/AVALIAÇÃO INDIVIDUAL',
            'tipo_registro': 'Princípio ativo/base clínica',
            'categoria_risco_fda': 'B (classificação histórica informada em bula/FAQ do fabricante)',
        },
        {
            'match_key': 'butilbrometo de escopolamina + dipirona (buscopan composto)',
            'principio_ativo': 'Butilbrometo de escopolamina + dipirona (Buscopan Composto)',
            'sinonimos_nomes_comerciais': 'Buscopan Composto; Buscopan composto comprimidos; Buscopan Composto gotas; Buscopan Composto ampola; Buscopan Composto injetável; Buscopan roxo; escopolamina + dipirona; butilbrometo de escopolamina + dipirona monoidratada; butilbrometo de escopolamina + metamizol; hioscina + dipirona',
            'principio_ativo_base': 'Butilbrometo de escopolamina + dipirona',
            'classe_farmacologica': 'Antiespasmódico anticolinérgico + analgésico/antitérmico',
            'indicacoes_contexto': 'Cólicas e dores abdominais intensas com espasmo, conforme diagnóstico e apresentação',
            'primeiro_trimestre': 'Evitar — a bula orienta não utilizar durante os 3 primeiros meses da gravidez.',
            'segundo_trimestre': 'Somente em situação específica — entre o 4º e o 6º mês, considerar apenas quando os benefícios compensarem claramente os riscos e sob orientação médica.',
            'terceiro_trimestre': 'Contraindicado — não utilizar após o 6º mês/terceiro trimestre devido aos riscos relacionados à dipirona para o feto e ao sangramento materno-neonatal.',
            'lactacao': 'Evitar durante o uso e por pelo menos 48 horas após a última dose, pois derivados da dipirona passam para o leite materno.',
            'resumo_alerta': 'Buscopan Composto não possui o mesmo perfil do Buscopan simples: a dipirona determina restrições importantes. Não usar no 1º trimestre nem no 3º trimestre; no 2º trimestre, somente quando o benefício superar claramente o risco. Confirmar sempre a apresentação e a concentração.',
            'alternativa_conduta': 'Investigar a causa da dor; preferir tratamento etiológico e opções com melhor perfil de segurança conforme avaliação obstétrica.',
            'disponibilidade_sus': 'Verificar Rename e padronização local',
            'nivel_validacao': 'Bula oficial do produto + fonte regulatória consultada',
            'fonte_ministerio_saude': '',
            'fonte_rename': RENAME,
            'fonte_anvisa_bulario': ANVISA_BULARIO,
            'fonte_lactacao_ms': LACTACAO_MS,
            'fonte_adicional': 'https://www.buscopan.com.br/bula-buscopan-composto',
            'fonte_dcb_anvisa': DCB_ANVISA,
            'data_revisao_base': REVIEW_DATE,
            'status': 'BASE EDUCACIONAL — não usar sem avaliação médica e confirmação da apresentação',
            'decisao_resumida_gestacao': 'EVITAR/CONTRAINDICADO CONFORME O TRIMESTRE',
            'tipo_registro': 'Princípio ativo/base clínica',
            'categoria_risco_fda': 'D (classificação histórica informada em bula/FAQ do fabricante)',
        },
        {
            'match_key': 'butilbrometo de escopolamina + paracetamol (buscoduo)',
            'principio_ativo': 'Butilbrometo de escopolamina + paracetamol (Buscoduo/Buscopan Duo)',
            'sinonimos_nomes_comerciais': 'Buscoduo; BuscoDuo; Buscopan Duo; Buscopan duo comprimidos; Buscopan laranja; escopolamina + paracetamol; butilbrometo de escopolamina + acetaminofeno; hioscina + paracetamol',
            'principio_ativo_base': 'Butilbrometo de escopolamina + paracetamol',
            'classe_farmacologica': 'Antiespasmódico anticolinérgico + analgésico/antitérmico',
            'indicacoes_contexto': 'Cólicas, dores e desconfortos abdominais leves a moderados',
            'primeiro_trimestre': 'Uso com cautela — o paracetamol tem ampla experiência de uso, mas há poucos dados para o butilbrometo; utilizar somente com orientação médica.',
            'segundo_trimestre': 'Uso com cautela — utilizar na menor dose eficaz e pelo menor tempo, somente com orientação médica.',
            'terceiro_trimestre': 'Uso com cautela — não utilizar de forma automática; avaliar indicação, dose total de paracetamol e função hepática.',
            'lactacao': 'Usar com cautela e orientação médica — o paracetamol é compatível em doses usuais, mas os dados para o butilbrometo são limitados.',
            'resumo_alerta': 'Buscoduo/Buscopan Duo combina butilbrometo de escopolamina e paracetamol. Verificar duplicidade com outros medicamentos que contenham paracetamol e respeitar a dose diária total. Não confundir com Buscopan Composto, que contém dipirona.',
            'alternativa_conduta': 'Investigar a causa da dor; quando necessário, considerar paracetamol isolado ou tratamento específico da etiologia sob avaliação clínica.',
            'disponibilidade_sus': 'Verificar Rename e padronização local',
            'nivel_validacao': 'Bula oficial do produto + fonte regulatória consultada',
            'fonte_ministerio_saude': '',
            'fonte_rename': RENAME,
            'fonte_anvisa_bulario': ANVISA_BULARIO,
            'fonte_lactacao_ms': LACTACAO_MS,
            'fonte_adicional': 'https://www.buscopan.com.br/bula-buscoduo',
            'fonte_dcb_anvisa': DCB_ANVISA,
            'data_revisao_base': REVIEW_DATE,
            'status': 'BASE EDUCACIONAL — validar bula, dose total de paracetamol e protocolo antes do uso',
            'decisao_resumida_gestacao': 'USO COM CAUTELA/AVALIAÇÃO INDIVIDUAL',
            'tipo_registro': 'Princípio ativo/base clínica',
            'categoria_risco_fda': 'C (classificação histórica informada em bula/FAQ do fabricante)',
        },
    ]

    next_id = max((record.get('id', 0) for record in records), default=0) + 1

    for definition in definitions:
        principle_norm = normalize(definition['principio_ativo'])
        base_norm = normalize(definition['principio_ativo_base'])
        found = None
        for record in records:
            if normalize(record.get('principio_ativo', '')) == principle_norm:
                found = record
                break
            if (
                normalize(record.get('principio_ativo_base', '')) == base_norm
                and 'buscopan' in normalize(record.get('sinonimos_nomes_comerciais', ''))
            ):
                found = record
                break

        if found is None:
            found = {'id': next_id}
            next_id += 1
            records.append(found)

        for field in DIRECT_FIELDS:
            found[field] = definition[field]
        for field in INDEXED_FIELDS:
            found[field] = string_index(definition[field])

    meta['versao'] = '3.0.1'
    meta['data_revisao'] = REVIEW_DATE
    meta['total_registros'] = len(records)
    base_type = 'Princípio ativo/base clínica'
    base_count = 0
    for record in records:
        type_index = record.get('tipo_registro')
        if isinstance(type_index, int) and 0 <= type_index < len(strings):
            if strings[type_index] == base_type:
                base_count += 1
    meta['registros_base_clinica'] = base_count
    meta['registros_adicionais_indexacao'] = len(records) - base_count
    meta['nome_base'] = f'GestMed — Base ampliada com {len(records):,} entradas pesquisáveis'.replace(',', '.')

    text = replace_json_const(text, 'GESTMED_COMPACT', 'GESTMED_DATA', records)
    text = replace_json_const(text, 'GESTMED_STRINGS', 'GESTMED_COMPACT', strings)
    text = replace_json_const(text, 'GESTMED_META', 'GESTMED_STRINGS', meta)

    text = append_posology(
        text,
        {
            'Butilbrometo de escopolamina': 'Drágeas: 10–20 mg VO, 3 vezes ao dia, conforme bula. Gotas, apresentação pediátrica e via injetável exigem conferência da concentração, idade/peso e bula específica. Na gestação, utilizar somente sob orientação médica.',
            'Butilbrometo de escopolamina + dipirona': 'Comprimidos 10 mg/250 mg: 1–2 comprimidos VO, 3–4 vezes ao dia, conforme bula. Gotas/injetável exigem conferência da concentração. Não utilizar no 1º nem no 3º trimestre; no 2º trimestre, somente se benefício superar claramente o risco.',
            'Butilbrometo de escopolamina + paracetamol': 'Comprimidos 10 mg/500 mg: 1–2 comprimidos VO, até 3 vezes ao dia, conforme bula. Conferir a dose total diária de paracetamol e evitar duplicidade em associações.',
        },
    )

    text = re.sub(
        r'<meta name="gestamed-build" content="[^"]+">',
        f'<meta name="gestamed-build" content="{BUILD}">',
        text,
        count=1,
    )
    text = re.sub(r'Versão 2026\.07\.\d{2}\.\d+', f'Versão {BUILD}', text)

    required_terms = [
        'Butilbrometo de escopolamina (Buscopan)',
        'Buscopan Composto',
        'Buscoduo/Buscopan Duo',
    ]
    for term in required_terms:
        if term not in text:
            raise SystemExit(f'Falha na validação: termo ausente — {term}')

    if len(records) < 1503:
        raise SystemExit(f'Falha na validação: total inesperado de registros ({len(records)}).')

    INDEX_PATH.write_text(text, encoding='utf-8')
    print(f'Buscopan restaurado. Total de registros: {len(records)}. Build: {BUILD}.')


if __name__ == '__main__':
    main()
