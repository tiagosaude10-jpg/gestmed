from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')

current_initial = '''<span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Se não realizado durante o pré-natal, repetir na admissão para parto; também repetir diante de nova exposição de risco.</div>'''
clearer_initial = '''<span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc"><strong>Não repetir de rotina no 3º trimestre</strong> se o resultado inicial for não reagente, estiver documentado e não houver nova exposição. Repetir diante de exposição de risco ou violência sexual. Na admissão para o parto, testar se não houve rastreamento no pré-natal ou se o esquema vacinal contra hepatite B estiver incompleto.</div>'''

current_delivery = '''<span class="exame-nome">Hepatite B — HBsAg/teste rápido</span><span class="exame-quando">se não testada ou vacinação incompleta</span>
        <div class="exame-desc">O resultado orienta a profilaxia do recém-nascido nas primeiras horas de vida.</div>'''
clearer_delivery = '''<span class="exame-nome">Hepatite B — HBsAg/teste rápido</span><span class="exame-quando">parto · somente se indicado</span>
        <div class="exame-desc">Solicitar na admissão se não houve testagem no pré-natal ou se o esquema vacinal estiver incompleto. <strong>Não repetir apenas por estar no 3º trimestre.</strong> Resultado reagente exige organização da profilaxia neonatal com vacina e imunoglobulina.</div>'''

if current_initial in text:
    text = text.replace(current_initial, clearer_initial, 1)
elif 'Não repetir de rotina no 3º trimestre' not in text:
    raise SystemExit('Bloco inicial da hepatite B não encontrado.')

if current_delivery in text:
    text = text.replace(current_delivery, clearer_delivery, 1)
elif 'Não repetir apenas por estar no 3º trimestre.' not in text:
    raise SystemExit('Bloco da admissão para parto não encontrado.')

text = text.replace('content="2026.07.22.89"', 'content="2026.07.22.90"', 1)
text = text.replace('Versão 2026.07.22.89', 'Versão 2026.07.22.90')

if text.count('Não repetir de rotina no 3º trimestre') != 1:
    raise SystemExit('Validação da orientação inicial falhou.')
if text.count('Não repetir apenas por estar no 3º trimestre.') != 1:
    raise SystemExit('Validação da orientação no parto falhou.')

path.write_text(text, encoding='utf-8')
print('Orientação de hepatite B atualizada e validada.')
