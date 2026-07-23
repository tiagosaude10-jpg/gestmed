from pathlib import Path
import re
import subprocess
import tempfile

path = Path('index.html')
text = path.read_text(encoding='utf-8')

old = """    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});"""

new = """    const closeSuggestions=()=>sug.classList.remove('open');
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',e=>{e.stopPropagation();update(inp.value,true);});
    inp.addEventListener('input',()=>update(inp.value,true));
    inp.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        closeSuggestions();
        inp.blur();
      }
    });
    clear.addEventListener('click',e=>{
      e.stopPropagation();
      inp.value='';
      update('',true);
      inp.focus();
    });

    if(document.__gestMedCondutasOutsideHandler){
      document.removeEventListener('pointerdown',document.__gestMedCondutasOutsideHandler,true);
    }
    if(document.__gestMedCondutasScrollHandler){
      window.removeEventListener('scroll',document.__gestMedCondutasScrollHandler,true);
      document.removeEventListener('touchmove',document.__gestMedCondutasScrollHandler,true);
      document.removeEventListener('wheel',document.__gestMedCondutasScrollHandler,true);
    }

    const hideCondutasSuggestions=e=>{
      if(!e.target.closest('.condutas-search-panel'))closeSuggestions();
    };
    const hideCondutasOnScroll=()=>closeSuggestions();

    document.__gestMedCondutasOutsideHandler=hideCondutasSuggestions;
    document.__gestMedCondutasScrollHandler=hideCondutasOnScroll;
    document.addEventListener('pointerdown',hideCondutasSuggestions,true);
    window.addEventListener('scroll',hideCondutasOnScroll,{passive:true,capture:true});
    document.addEventListener('touchmove',hideCondutasOnScroll,{passive:true,capture:true});
    document.addEventListener('wheel',hideCondutasOnScroll,{passive:true,capture:true});"""

if old in text:
    text = text.replace(old, new, 1)
elif 'document.__gestMedCondutasOutsideHandler' not in text:
    raise SystemExit('Bloco original do autocomplete de patologias não encontrado.')

text = text.replace('2026.07.23.91', '2026.07.23.92')

checks = {
    'fechamento permanente fora do painel': 'document.addEventListener(\'pointerdown\',hideCondutasSuggestions,true);',
    'fechamento ao rolar': "window.addEventListener('scroll',hideCondutasOnScroll,{passive:true,capture:true});",
    'fechamento no gesto de rolagem': "document.addEventListener('touchmove',hideCondutasOnScroll,{passive:true,capture:true});",
    'fechamento pela tecla Esc': "if(e.key==='Escape')",
}
for label, token in checks.items():
    if token not in text:
        raise SystemExit(f'Validação falhou: {label}.')

if "{once:true,capture:true}" in text[text.find("const inp=document.getElementById('condutasSearch')"):text.find("function selectPathology")]:
    raise SystemExit('O listener defeituoso com once:true ainda está presente.')

# Verifica a sintaxe dos scripts JavaScript embutidos.
scripts = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', text, flags=re.S | re.I)
with tempfile.TemporaryDirectory() as tmp:
    for index, script in enumerate(scripts, start=1):
        js_path = Path(tmp) / f'script_{index}.js'
        js_path.write_text(script, encoding='utf-8')
        result = subprocess.run(['node', '--check', str(js_path)], capture_output=True, text=True)
        if result.returncode != 0:
            raise SystemExit(f'Erro de sintaxe no script {index}:\n{result.stderr}')

path.write_text(text, encoding='utf-8')
print('Autocomplete das patologias corrigido e validado. Versão 2026.07.23.92.')
