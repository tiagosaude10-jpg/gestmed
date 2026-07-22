from pathlib import Path
import re
import subprocess
import tempfile

index_path = Path('index.html')
text = index_path.read_text(encoding='utf-8')

categoria = 'Trabalho de parto e indução'

# Ordem visual das categorias.
for antigo in [
    "'Doenças clínicas na gestação','Alterações fetais e placentárias'];",
    "'Alterações fetais e placentárias'];",
]:
    if antigo in text and categoria not in antigo:
        novo = antigo[:-2] + ",'Trabalho de parto e indução'];"
        text = text.replace(antigo, novo, 1)
        break

# Metadados visuais da nova categoria.
if '"Trabalho de parto e indução":{theme:"theme-parto"' not in text:
    alvo = '"Alterações fetais e placentárias":{theme:"theme-fetais",icon:"🫄",desc:"Situações de risco fetal e placentário, com vigilância de crescimento, líquido amniótico, doppler e timing de resolução."}'
    acrescimo = alvo + ',"Trabalho de parto e indução":{theme:"theme-parto",icon:"🕒",desc:"Maturação cervical, indução, progressão do trabalho de parto e intercorrências relacionadas à via de nascimento."}'
    if alvo not in text:
        raise RuntimeError('Metadado da categoria fetal não localizado.')
    text = text.replace(alvo, acrescimo, 1)

# Cor do cabeçalho da categoria.
if '.condutas-group.theme-parto .condutas-group-head' not in text:
    alvo_css = '.condutas-group.theme-fetais .condutas-group-head{background:linear-gradient(135deg,#7e22ce,#c026d3)}'
    novo_css = alvo_css + '.condutas-group.theme-parto .condutas-group-head{background:linear-gradient(135deg,#0369a1,#0891b2)}'
    if alvo_css not in text:
        raise RuntimeError('CSS da categoria fetal não localizado.')
    text = text.replace(alvo_css, novo_css, 1)

index_path.write_text(text, encoding='utf-8')

# Validação de todos os blocos JavaScript antes de publicar.
scripts = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', text, flags=re.S | re.I)
for numero, script in enumerate(scripts):
    with tempfile.NamedTemporaryFile('w', suffix='.js', encoding='utf-8', delete=False) as arquivo:
        arquivo.write(script)
        nome = arquivo.name
    resultado = subprocess.run(['node', '--check', nome], capture_output=True, text=True)
    if resultado.returncode != 0:
        raise RuntimeError(f'JavaScript inválido no bloco {numero}: {resultado.stderr}')

print('Categoria Trabalho de parto e indução configurada e JavaScript validado.')
