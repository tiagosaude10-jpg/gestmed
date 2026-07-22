from pathlib import Path
import re

index_path = Path('index.html')
text = index_path.read_text(encoding='utf-8')

if 'data-ui-blocos="50"' in text:
    print('Destaque dos blocos já aplicado.')
    raise SystemExit(0)

css = r'''
  /* data-ui-blocos="50" */
  .condutas-group{margin:16px 0 14px}
  .condutas-group-head{position:relative;overflow:hidden;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:14px 15px;border-radius:18px;color:#fff;box-shadow:0 10px 24px rgba(15,23,42,.10)}
  .condutas-group-head::after{content:"";position:absolute;right:-18px;top:-16px;width:76px;height:76px;border-radius:50%;background:rgba(255,255,255,.12)}
  .condutas-group-main{position:relative;z-index:1;flex:1;min-width:0}
  .condutas-group-label{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:900;line-height:1.2}
  .condutas-group-icon{font-size:17px}
  .condutas-group-desc{position:relative;z-index:1;font-size:11px;line-height:1.45;opacity:.95;margin-top:5px;max-width:92%}
  .condutas-group-count{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:42px;padding:0 10px;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(2px);font-size:14px;font-weight:900}
  .condutas-group-list{display:grid;gap:8px;margin-top:10px}
  .condutas-group.theme-hipertensivas .condutas-group-head{background:linear-gradient(135deg,#0f766e,#155e75)}
  .condutas-group.theme-hemorragias .condutas-group-head{background:linear-gradient(135deg,#b91c1c,#be123c)}
  .condutas-group.theme-prematuridade .condutas-group-head{background:linear-gradient(135deg,#7c3aed,#9333ea)}
  .condutas-group.theme-emergencias .condutas-group-head{background:linear-gradient(135deg,#c2410c,#ea580c)}
  .condutas-group.theme-infeccoes .condutas-group-head{background:linear-gradient(135deg,#15803d,#16a34a)}
  .condutas-group.theme-clinicas .condutas-group-head{background:linear-gradient(135deg,#1d4ed8,#2563eb)}
  .condutas-group.theme-fetais .condutas-group-head{background:linear-gradient(135deg,#7e22ce,#c026d3)}
  @media (max-width:420px){.condutas-group-head{padding:13px 14px}.condutas-group-label{font-size:14px}.condutas-group-desc{font-size:10.5px;max-width:100%}.condutas-group-count{min-width:38px;height:38px;font-size:13px}}
'''

if '</style>' not in text:
    raise RuntimeError('Tag </style> não encontrada.')
text = text.replace('</style>', css + '\n</style>', 1)
text = text.replace(
    "const ordem=['Síndromes hipertensivas','Hemorragias obstétricas','Prematuridade e membranas','Emergências intraparto','Infecções na gestação','Doenças clínicas na gestação'];",
    "const ordem=['Síndromes hipertensivas','Hemorragias obstétricas','Prematuridade e membranas','Emergências intraparto','Infecções na gestação','Doenças clínicas na gestação','Alterações fetais e placentárias'];"
)

novo_bloco = r'''const categoryMeta={"Síndromes hipertensivas":{theme:"theme-hipertensivas",icon:"🩺",desc:"Distúrbios pressóricos da gestação e do puerpério, com foco em vigilância, anti-hipertensivos e prevenção de eclâmpsia."},"Hemorragias obstétricas":{theme:"theme-hemorragias",icon:"🩸",desc:"Sangramentos da gestação, parto e pós-parto, com condutas de estabilização, uterotônicos e controle da hemorragia."},"Prematuridade e membranas":{theme:"theme-prematuridade",icon:"👶",desc:"Ameaça de prematuridade, tocólise, corticoide antenatal, neuroproteção fetal e rotura de membranas."},"Emergências intraparto":{theme:"theme-emergencias",icon:"⚠️",desc:"Complicações agudas durante o parto que exigem resposta imediata, manobras e definição rápida da via de resolução."},"Infecções na gestação":{theme:"theme-infeccoes",icon:"🦠",desc:"ITU, IST e outras infecções maternas, com antibioticoterapia, controle de foco e vigilância materno-fetal."},"Doenças clínicas na gestação":{theme:"theme-clinicas",icon:"💊",desc:"Comorbidades maternas com impacto obstétrico, incluindo ajustes terapêuticos, monitorização e critérios de gravidade."},"Alterações fetais e placentárias":{theme:"theme-fetais",icon:"🫄",desc:"Situações de risco fetal e placentário, com vigilância de crescimento, líquido amniótico, doppler e timing de resolução."}};
    const metaCategoria=cat=>categoryMeta[cat]||{theme:"",icon:"📘",desc:"Protocolos clínicos organizados por categoria."};
    const buildBlocks=(items)=>{
      const categorias=[...new Set(items.map(p=>p.categoria))].sort((a,b)=>{
        const ia=ordem.indexOf(a),ib=ordem.indexOf(b);
        return (ia<0?999:ia)-(ib<0?999:ib);
      });
      return categorias.map(cat=>{
        const info=metaCategoria(cat);
        const lista=items.filter(p=>p.categoria===cat);
        return `<section class="condutas-group ${info.theme}"><div class="condutas-group-head"><div class="condutas-group-main"><div class="condutas-group-label"><span class="condutas-group-icon">${info.icon}</span><span>${esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };'''

padrao = r'const buildBlocks=\(items\)=>\{.*?\};(?=\n    root\.innerHTML=)'
text, total = re.subn(padrao, novo_bloco, text, count=1, flags=re.S)
if total != 1:
    raise RuntimeError('Função buildBlocks não foi localizada para atualização.')

text = text.replace('2026.07.22.49', '2026.07.22.50')
index_path.write_text(text, encoding='utf-8')
print('Destaque visual aplicado com sucesso.')
