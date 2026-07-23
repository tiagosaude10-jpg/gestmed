from pathlib import Path
import re
import subprocess
import tempfile

path = Path('index.html')
text = path.read_text(encoding='utf-8')

# -----------------------------------------------------------------------------
# 1) DESTAQUE CURTO DE VACINAS NO INÍCIO DO PAINEL
# -----------------------------------------------------------------------------
summary_start = '<!-- GESTAMED_VACINAS_RESUMO_INICIO -->'
summary_end = '<!-- GESTAMED_VACINAS_RESUMO_FIM -->'
summary_html = '''<!-- GESTAMED_VACINAS_RESUMO_INICIO -->
      <div class="exames-nota" style="border-color:#86efac;background:#f0fdf4;color:#14532d;">
        <strong>💉 Vacinas também fazem parte do pré-natal:</strong> revisar a caderneta na primeira consulta; influenza, covid-19, hepatite B e dT conforme histórico; <strong>dTpa a partir de 20 semanas</strong> em cada gestação; e <strong>VSR a partir de 28 semanas</strong> em cada gestação. O esquema completo está no final deste painel.
      </div>
      <!-- GESTAMED_VACINAS_RESUMO_FIM -->'''

if summary_start in text and summary_end in text:
    text = re.sub(
        re.escape(summary_start) + r'.*?' + re.escape(summary_end),
        summary_html,
        text,
        count=1,
        flags=re.S,
    )
else:
    first_trimester_marker = '''      <div class="exames-trimestre-header t1">
        <span>1️⃣ 1º trimestre</span>'''
    if first_trimester_marker not in text:
        raise SystemExit('Marcador do primeiro trimestre não encontrado.')
    text = text.replace(first_trimester_marker, summary_html + '\n\n' + first_trimester_marker, 1)

# -----------------------------------------------------------------------------
# 2) HEPATITE B — REDAÇÃO CLARA NA PRIMEIRA CONSULTA
# -----------------------------------------------------------------------------
hbv_initial_pattern = re.compile(
    r'<span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span>'
    r'<span class="exame-quando">.*?</span>\s*'
    r'<div class="exame-desc">.*?</div>',
    flags=re.S,
)
hbv_initial_html = '''<span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · preferir 1º trimestre</span>
        <div class="exame-desc"><strong>Não repetir de rotina no 3º trimestre</strong> quando o resultado inicial for não reagente, estiver documentado e não houver nova exposição. Repetir diante de exposição de risco, violência sexual, ausência de resultado confiável ou conforme protocolo local. Se reagente, complementar a investigação e organizar a prevenção da transmissão vertical.</div>'''
text, hbv_initial_count = hbv_initial_pattern.subn(hbv_initial_html, text, count=1)
if hbv_initial_count != 1:
    raise SystemExit('Não foi possível atualizar o HBsAg da primeira consulta.')

# -----------------------------------------------------------------------------
# 3) TERCEIRO TRIMESTRE — SEPARAR HEPATITES B E C E EVITAR INTERPRETAÇÃO ERRADA
# -----------------------------------------------------------------------------
combined_hepatitis_pattern = re.compile(
    r'<div class="exame-item">\s*'
    r'<span class="exame-nome">Hepatites B e C — repetição</span>'
    r'<span class="exame-quando">.*?</span>\s*'
    r'<div class="exame-desc">.*?</div>\s*'
    r'</div>',
    flags=re.S,
)
third_trimester_hepatitis_html = '''<div class="exame-item">
        <span class="exame-nome">Hepatite B — HBsAg/teste rápido</span><span class="exame-quando">3º trimestre · somente se indicado</span>
        <div class="exame-desc">Não é exame de repetição universal. Solicitar se não houver resultado documentado, diante de nova exposição de risco ou violência sexual, ou conforme protocolo local. A vacinação incompleta deve ser atualizada conforme o PNI.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite C — anti-HCV/teste rápido</span><span class="exame-quando">3º trimestre · somente se indicado</span>
        <div class="exame-desc">Não repetir rotineiramente após resultado inicial não reagente. Repetir diante de nova exposição de risco, violência sexual ou protocolo específico.</div>
      </div>'''
text, combined_count = combined_hepatitis_pattern.subn(third_trimester_hepatitis_html, text, count=1)
if combined_count == 0 and '3º trimestre · somente se indicado' not in text:
    raise SystemExit('Bloco combinado das hepatites no terceiro trimestre não encontrado.')

# -----------------------------------------------------------------------------
# 4) HEPATITE B NA ADMISSÃO PARA O PARTO
# -----------------------------------------------------------------------------
hbv_delivery_pattern = re.compile(
    r'<span class="exame-nome">Hepatite B — HBsAg/teste rápido</span>'
    r'<span class="exame-quando">.*?</span>\s*'
    r'<div class="exame-desc">.*?</div>',
    flags=re.S,
)
# O primeiro HBsAg agora é o bloco do 3º trimestre. Precisamos localizar o bloco
# que aparece depois do cabeçalho de admissão.
admission_index = text.find('🏥 Admissão para parto ou abortamento')
if admission_index < 0:
    raise SystemExit('Cabeçalho da admissão para parto não encontrado.')
admission_tail = text[admission_index:]
match_delivery = hbv_delivery_pattern.search(admission_tail)
if not match_delivery:
    raise SystemExit('HBsAg da admissão para parto não encontrado.')
hbv_delivery_html = '''<span class="exame-nome">Hepatite B — HBsAg/teste rápido</span><span class="exame-quando">parto · somente se indicado</span>
        <div class="exame-desc">Solicitar na admissão quando não houve testagem no pré-natal ou quando o esquema vacinal contra hepatite B estiver incompleto. <strong>Não repetir apenas por estar no 3º trimestre.</strong> Resultado reagente exige organização imediata da profilaxia do recém-nascido com vacina e imunoglobulina, conforme protocolo.</div>'''
absolute_start = admission_index + match_delivery.start()
absolute_end = admission_index + match_delivery.end()
text = text[:absolute_start] + hbv_delivery_html + text[absolute_end:]

# -----------------------------------------------------------------------------
# 5) SEÇÃO COMPLETA DE VACINAS, INSERIDA ANTES DA ADMISSÃO PARA O PARTO
# -----------------------------------------------------------------------------
vaccines_start = '<!-- GESTAMED_VACINAS_INICIO -->'
vaccines_end = '<!-- GESTAMED_VACINAS_FIM -->'
vaccines_html = '''<!-- GESTAMED_VACINAS_INICIO -->
      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#166534,#16a34a);color:#fff;">
        <span>💉 Vacinas da gestante — Calendário Nacional</span>
      </div>

      <div class="exames-nota" style="border-color:#86efac;background:#f0fdf4;color:#14532d;">
        <strong>Revisar a caderneta na primeira consulta.</strong> Não reiniciar esquemas já começados: completar somente as doses faltantes. Influenza, covid-19, hepatite B, dT, dTpa e VSR podem ser organizadas durante o pré-natal conforme a semana gestacional e o histórico vacinal.
      </div>

      <div class="exame-item">
        <span class="exame-nome">Influenza</span><span class="exame-quando">qualquer trimestre · 1 dose por temporada</span>
        <div class="exame-desc">Aplicar a vacina da temporada em qualquer idade gestacional, inclusive no puerpério se a gestante não tiver sido vacinada durante a campanha vigente.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Covid-19</span><span class="exame-quando">qualquer trimestre · 1 dose em cada gestação</span>
        <div class="exame-desc">Aplicar uma dose a cada gestação, conforme o calendário vigente do Programa Nacional de Imunizações.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite B</span><span class="exame-quando">qualquer trimestre · completar 3 doses</span>
        <div class="exame-desc">Para gestante sem comprovação de esquema completo: iniciar ou completar o esquema conforme histórico. Esquema habitual: dose 1 na primeira oportunidade, dose 2 após 1 mês e dose 3 cerca de 6 meses após a primeira. Não reiniciar doses previamente válidas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">dT — difteria e tétano</span><span class="exame-quando">qualquer trimestre · conforme histórico</span>
        <div class="exame-desc">Completar o esquema básico de três doses quando incompleto. Uma das doses da gestação deve ser substituída pela dTpa a partir de 20 semanas. Respeitar os intervalos previstos pelo PNI.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">dTpa — difteria, tétano e coqueluche</span><span class="exame-quando">a partir de 20 semanas · toda gestação</span>
        <div class="exame-desc"><strong>Administrar uma dose em cada gestação</strong>, independentemente de doses anteriores de dT ou dTpa. O objetivo é ampliar a transferência de anticorpos maternos e proteger o recém-nascido contra coqueluche.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">VSR — vírus sincicial respiratório</span><span class="exame-quando">a partir de 28 semanas · toda gestação</span>
        <div class="exame-desc"><strong>Administrar uma dose em cada gestação</strong>, sem restrição de idade materna. Pode ser aplicada no mesmo dia que influenza, covid-19, hepatite B ou dTpa, em locais anatômicos diferentes.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Febre amarela</span><span class="exame-quando">somente situação excepcional</span>
        <div class="exame-desc">Considerar apenas quando houver risco epidemiológico relevante e após avaliação individual de risco-benefício pelo serviço de saúde.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#6b21a8,#9333ea);color:#fff;">
        <span>🚫 Vacinas não aplicadas rotineiramente durante a gestação</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Tríplice viral e varicela</span><span class="exame-quando">adiar para o puerpério</span>
        <div class="exame-desc">São vacinas de vírus vivos e não integram a vacinação rotineira durante a gestação. Programar no pós-parto quando houver indicação e ausência de imunidade.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HPV</span><span class="exame-quando">adiar doses durante a gravidez</span>
        <div class="exame-desc">Não iniciar nem continuar rotineiramente durante a gestação. Retomar o esquema após o parto, sem reiniciar doses válidas já recebidas.</div>
      </div>
      <!-- GESTAMED_VACINAS_FIM -->'''

if vaccines_start in text and vaccines_end in text:
    text = re.sub(
        re.escape(vaccines_start) + r'.*?' + re.escape(vaccines_end),
        vaccines_html,
        text,
        count=1,
        flags=re.S,
    )
else:
    admission_header_marker = '''      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#991b1b,#dc2626);color:#fff;">
        <span>🏥 Admissão para parto ou abortamento</span>'''
    if admission_header_marker not in text:
        raise SystemExit('Marcador de admissão para inserir vacinas não encontrado.')
    text = text.replace(admission_header_marker, vaccines_html + '\n\n' + admission_header_marker, 1)

# -----------------------------------------------------------------------------
# 6) VERSÃO E VALIDAÇÕES
# -----------------------------------------------------------------------------
text = re.sub(r'2026\.07\.23\.\d+', '2026.07.23.93', text)

required_tokens = [
    'Vacinas da gestante — Calendário Nacional',
    'dTpa — difteria, tétano e coqueluche',
    'a partir de 20 semanas · toda gestação',
    'VSR — vírus sincicial respiratório',
    'a partir de 28 semanas · toda gestação',
    'Não repetir de rotina no 3º trimestre',
    'Não repetir apenas por estar no 3º trimestre.',
    'Covid-19',
    'Influenza',
    'Hepatite B',
]
for token in required_tokens:
    if token not in text:
        raise SystemExit(f'Validação falhou: conteúdo ausente — {token}')

if text.count('GESTAMED_VACINAS_INICIO') != 1 or text.count('GESTAMED_VACINAS_FIM') != 1:
    raise SystemExit('Validação falhou: seção de vacinas duplicada ou incompleta.')
if text.count('GESTAMED_VACINAS_RESUMO_INICIO') != 1 or text.count('GESTAMED_VACINAS_RESUMO_FIM') != 1:
    raise SystemExit('Validação falhou: resumo de vacinas duplicado ou incompleto.')
if text.count('Não repetir de rotina no 3º trimestre') != 1:
    raise SystemExit('Validação falhou: orientação do HBsAg inicial duplicada.')
if text.count('Não repetir apenas por estar no 3º trimestre.') != 1:
    raise SystemExit('Validação falhou: orientação do HBsAg no parto duplicada.')

# Verifica a sintaxe de todos os scripts JavaScript embutidos.
scripts = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', text, flags=re.S | re.I)
with tempfile.TemporaryDirectory() as tmp:
    for index, script in enumerate(scripts, start=1):
        js_path = Path(tmp) / f'script_{index}.js'
        js_path.write_text(script, encoding='utf-8')
        result = subprocess.run(['node', '--check', str(js_path)], capture_output=True, text=True)
        if result.returncode != 0:
            raise SystemExit(f'Erro de sintaxe no script {index}:\n{result.stderr}')

path.write_text(text, encoding='utf-8')
print('Painel de exames e vacinas corrigido e validado. Versão 2026.07.23.93.')
