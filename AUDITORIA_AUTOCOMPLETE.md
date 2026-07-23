# Auditoria autocomplete de patologias

## Pesquisar e selecionar uma patologia
```html
    return `<section class="condutas-group ${info.theme}"><div class="condutas-group-head"><div class="condutas-group-main"><div class="condutas-group-label"><span class="condutas-group-icon">${info.icon}</span><span>${esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`
```

## Digite ou toque para escolher
```html
{esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class
```

## condutasSearch
```html
ria===cat);
        return `<section class="condutas-group ${info.theme}"><div class="condutas-group-head"><div class="condutas-group-main"><div class="condutas-group-label"><span class="condutas-group-icon">${info.icon}</span><span>${esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content=
```
```html
"><span class="condutas-group-icon">${info.icon}</span><span>${esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>
```
```html
oup-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="condu
```
```html
anizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><
```
```html
 ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><h3>Referências utilizadas</h3><div class="conduta-source">${esc(p.fonte)}</div><div class="conduta-source">Versão clínica
```

## condutaSearch
Não encontrado.

## pathology
Não encontrado.

## patologia
```html
o de cálcio 10% 10 mL (1 g) EV lento disponível como antídoto. Se PA ≥160/110 mmHg persistente: hidralazina 5 mg EV lentamente, repetir a cada 20–30 minutos se necessário, máximo 20 mg; OU nifedipino 10 mg VO de liberação imediata, repetir a cada 20–30 minutos, máximo 30 mg. Não usar nifedipino sublingual.","HIDRATAÇÃO E BALANÇO HÍDRICO — Controlar entradas e saídas, balanço hídrico e diurese; ajustar hidratação, reposição ou restrição de líquidos conforme quadro materno.","BCF / CARDIOTOCOGRAFIA — Cardiotocografia contínua se feto vivo e viável durante instabilidade, crise hipertensiva, sulfatação inicial ou decisão de resolução; após estabilidade e conduta expectante, BCF pelo menos a cada 4 horas e CTG diária ou conforme protocolo.","SINAIS VITAIS E FREQUÊNCIA DE VERIFICAÇÃO — Monitorização contínua ou muito frequente; PA, FC, FR, SpO₂, temperatura e nível de consciência a cada 15–30 minutos durante fase aguda, depois pelo menos de hora em hora até estabilidade, conforme protocolo.","AVALIAÇÃO OBSTÉTRICA E CONTROLES LABORATORIAIS — Coletar hemograma/plaquetas, creatinina, AST/TGO, ALT/TGP, DHL, bilirrubinas, coagulograma e fibrinogênio quando indicado; repetir em 6–12 horas ou antes se piora. Avaliação obstétrica, anestesiologia e neonatologia; definir momento e via de resolução após estabilização materna.","CUIDADOS ESPECÍFICOS DA PATOLOGIA — Manter cuidados específicos da patologia e comunicar imediatamente sinais de deterioração materna ou fetal."],"fonte":"Doses e critérios: protocolo EBSERH/UFGD, Síndromes Hipertensivas na Gestação, publicação de 03/02/2026; Manual de Gestação de Alto Risco do Ministério da Saúde (2022)."},{"id":"crise_hipertensiva","categoria":"Síndromes hipertensivas","nome":"Crise hipertensiva na gestação/puerpério","subtitulo":"Redução segura da PA grave e prevenção de complicações cerebrovasculares.","gravidade":"Emergência","classe":"sev-red","resumo":["Tratar PAS ≥160 mmHg e/ou PAD ≥110 mmHg persistente como emergência obstétrica.","O objetivo é reduzir o risco de AVC e outras complicações sem provocar hipotensão materna ou comprometer perfusão uteroplacentária.","Avaliar simultaneamente pré-eclâmpsia com gravidade, eclâmpsia, HELLP, edema pulmonar, DPP e lesão de órgão-alvo."],"avaliacao":["Confirmar PA com manguito adequado e repetir sem retardar tratamento quando a elevação grave é persistente.","Monitorizar sintomas neurológicos, dor torácica, dispneia, saturação, diurese e vitalidade fetal.","Obter acesso venoso e acionar obstetrícia; considerar UTI/anestesiologia conforme resposta."],"exames":["Hemograma/plaquetas.","Creatinina, ureia e eletrólitos.","AST/TGO, ALT/TGP, DHL e bilirrubinas.","Proteinúria quando útil.","ECG, troponina, gasometria e imagem conforme sintomas/complicações."],"conduta":["Administrar agente de primeira linha sem atraso: hidralazina EV ou nifedipino VO de liberação imediata.","Reavaliar PA a cada 20 minutos durante titulação e mudar de agente se falha conforme protocolo.","Associar sulfato de magnésio quando houver pré-eclâmpsia com gravidade, iminência de eclâmpsia, eclâmpsia, HELLP ou crise de difícil controle.","Nitroprussiato é medida de exceção em unidade fechada, com monitorização intensiva."],"prescricao":["DIETA — Dieta zero durante tratamento agudo e até definição de necessidade de resolução/procedimento; liberar dieta somente após estabilização e decisão obstétrica.","ACESSO VENOSO E SOROTERAPIA — Acesso venoso periférico e restrição de expansão volêmica indiscriminada; controle de diurese e balanço hídrico.","MEDICAÇÕES — Tratar em até 30–60 minutos. Hidralazina: diluir 20 mg em 20 mL (1 mg/mL), administrar 5 mg EV lentamente; repetir a cada 20–30 minutos se necessário, máximo 20 mg. Alternativa: nifedipino 10 mg VO de liberação imediata; repetir a cada 20–30 minutos se necessário, máximo 30 mg. Não usar via sublingual. Se pré-eclâmpsia com gravidade ou sintomas de iminência de eclâmpsia: MgSO₄ 4 g EV de ataque + 1 g/h EV em BIC, com gluconato de cálcio 10% disponível.","HIDRATAÇÃO E BALANÇO HÍDRICO — Controlar entradas e saídas, balanço hídrico e diurese; ajustar hidratação, reposição ou restrição de líquidos conforme quadro materno.","BCF / CARDIOTOCOGRAFIA — Cardiotocografia contínua se feto vivo e viável durante a crise e tratamento; se não disponível, auscultar BCF antes, durante e após cada intervenção, com reavaliação frequente.","SINAIS VITAIS E FREQUÊNCIA DE VERIFICAÇÃO — Monitorização cardiorrespiratória; PA a cada 15 minutos durante titulação do anti-hipertensivo e até sair da faixa grave; depois a cada 30–60 minutos até estabilida
```
```html
es hepáticos e plano do recém-nascido.","CUIDADOS ESPECÍFICOS DA PATOLOGIA — Amamentação geralmente permitida após imunoprofilaxia neonatal; registrar necessidade de vacina + HBIG do RN."],"fonte":"Base: protocolos assistenciais em infectologia obstétrica e prevenção da transmissão vertical. Conteúdo educacional e de apoio, devendo ser adaptado ao protocolo institucional, exames atualizados e avaliação do obstetra/infectologista."},{"id":"hepatite_c_gestacao","categoria":"Infecções específicas e transmissão vertical","nome":"Hepatite C na gestação","subtitulo":"Seguimento obstétrico da gestante com hepatite C e prevenção de transmissão vertical.","gravidade":"Seguimento especializado","classe":"sev-blue","resumo":["A transmissão vertical do HCV é menor que a do HBV, porém exige seguimento apropriado.","Os antivirais de ação direta, em geral, não são usados rotineiramente durante a gestação fora de protocolos específicos.","A via de parto costuma ser obstétrica, evitando procedimentos invasivos quando possível."],"avaliacao":["Confirmar anti-HCV e HCV-RNA, função hepática e coinfecções.","Pesquisar fatores de risco e doença hepática avançada.","Planejar parto evitando monitorização invasiva fetal quando possível."],"exames":["HCV-RNA, transaminases e função hepática.","Sorologias associadas e avaliação obstétrica habitual."],"conduta":["Acompanhar em conjunto com infectologia/hepatologia.","Não há profilaxia intraparto específica de rotina para transmissão vertical.","Planejar avaliação do RN conforme protocolo pediátrico."],"prescricao":["DIETA — Dieta geral.","ACESSO VENOSO E SOROTERAPIA — Conforme necessidade obstétrica.","MEDICAÇÕES — Não há antiviral de rotina aprovado como prescrição padrão durante a gestação na maioria dos protocolos. Manter conduta expectante e seguimento especializado; tratar intercorrências clínicas habituais.","HIDRATAÇÃO E BALANÇO HÍDRICO — Conforme indicação clínica.","BCF / CARDIOTOCOGRAFIA — Conforme condição obstétrica.","SINAIS VITAIS E FREQUÊNCIA DE VERIFICAÇÃO — Rotina obstétrica.","AVALIAÇÃO OBSTÉTRICA E CONTROLES LABORATORIAIS — Seguir enzimas hepáticas e planejar cuidado neonatal.","CUIDADOS ESPECÍFICOS DA PATOLOGIA — Evitar procedimentos invasivos fetais quando possível; via de parto por indicação obstétrica."],"fonte":"Base: protocolos assistenciais em infectologia obstétrica e prevenção da transmissão vertical. Conteúdo educacional e de apoio, devendo ser adaptado ao protocolo institucional, exames atualizados e avaliação do obstetra/infectologista."},{"id":"toxoplasmose_gestacao","categoria":"Infecções específicas e transmissão vertical","nome":"Toxoplasmose na gestação","subtitulo":"Infecção materna com risco de transmissão congênita, exigindo estratificação e tratamento conforme idade gestacional.","gravidade":"Infecção congênita potencial","classe":"sev-orange","resumo":["A conduta depende da confirmação da infecção materna, idade gestacional e evidência de infecção fetal.","Na infecção materna aguda sem confirmação fetal, usa-se espiramicina em muitos protocolos.","Com confirmação/suspeita de infecção fetal ou após idade gestacional adequada, pode-se utilizar sulfadiazina + pirimetamina + ácido folínico."],"avaliacao":["Revisar sorologias, avidez de IgG, tempo provável de infecção e ultrassonografia fetal.","Avaliar disponibilidade de amniocentese/PCR e seguimento com medicina fetal.","Pesquisar alergias a sulfas e hematotoxicidade."],"exames":["IgM, IgG e avidez de IgG.","USG obstétrica seriada.","PCR para Toxoplasma em líquido amniótico quando indicado.","Hemograma e função hepática/renal durante o tratamento."],"conduta":["Encaminhar ao alto risco/infectologia.","Sem confirmação de infecção fetal: espiramicina.","Com infecção fetal confirmada ou fortemente suspeita, adotar esquema tríplice conforme idade gestacional e protocolo."],"prescricao":["DIETA — Dieta geral; orientar medidas higiênico-dietéticas (carnes bem cozidas, lavagem adequada de frutas/verduras, evitar água sem tratamento).","ACESSO VENOSO E SOROTERAPIA — Geralmente não necessário; usar conforme necessidade clínica.","MEDICAÇÕES — Sem confirmação fetal: espiramicina 1 g VO a cada 8 horas. Com infecção fetal confirmada/suspeita e idade gestacional adequada: sulfadiazina 1 g VO a cada 6 horas + pirimetamina 50 mg VO a cada 12 horas por 2 dias, depois 50 mg VO 1 vez ao dia + ácido folínico 10 a 15 mg VO 3 vezes por semana, conforme protocolo especializado e monitorização hematológica.","HIDRATAÇÃO E BALANÇO HÍDRICO — Hidratação oral habitual.","BCF / CARDIOTOCOGRAFIA — Conforme condição obstétrica e segui
```
```html
nicos organizados por categoria."};
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
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'
```
```html
"condutas-group ${info.theme}"><div class="condutas-group-head"><div class="condutas-group-main"><div class="condutas-group-label"><span class="condutas-group-icon">${info.icon}</span><span>${esc(cat)}</span></div><div class="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h
```
```html
s="condutas-group-desc">${esc(info.desc)}</div></div><div class="condutas-group-count">${lista.length}</div></div><div class="condutas-group-list">${lista.map(p=>`<button class="conduta-card" onclick="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e moni
```
```html
div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<butto
```
```html
se-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><h3>Referências utilizadas</h3><div class="conduta-source">${esc(p.fonte)}</div><div class="conduta-source">Versão clínica do módulo: 22/07/2026 — prescrições reorganizadas conforme a sequência hospitalar informada. Revisão profissional local obrigatória antes de uso assistencial.</div></div>`
    };
    root.innerHTML=`<button class="conduta-back" onclick="GestMedCondutas.list()">← Voltar às patologias</button><div class="conduta-detail-title">${esc(p.nome)}</div><div class="conduta-detail-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}" style="margin:0 0 10px">${esc(p.gravidade)}</span><div class="conduta-tabs">${tabs.map(t=>`<button class="conduta-tab ${aba===t[0]?'active':''}" onclick="GestMedCondutas.tab('${t[0]}')">${t[1]}</button>`).join('')}</div><div class="conduta-pane active">${content[aba]}</div>`;
  }
  function open(){atual=null;aba='resumo';renderList();modal.classList.add('open');document.body.style.overflow='hidden';}
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  function detail(id){atual=id;aba='resumo';renderDetail();root.scrollTop=0;}
  function tab(id){aba=id;renderDetail();}
  function list(){atual=null;renderList();}
  functio
```
```html
o'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><h3>Referências utilizadas</h3><div class="conduta-source">${esc(p.fonte)}</div><div class="conduta-source">Versão clínica do módulo: 22/07/2026 — prescrições reorganizadas conforme a sequência hospitalar informada. Revisão profissional local obrigatória antes de uso assistencial.</div></div>`
    };
    root.innerHTML=`<button class="conduta-back" onclick="GestMedCondutas.list()">← Voltar às patologias</button><div class="conduta-detail-title">${esc(p.nome)}</div><div class="conduta-detail-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}" style="margin:0 0 10px">${esc(p.gravidade)}</span><div class="conduta-tabs">${tabs.map(t=>`<button class="conduta-tab ${aba===t[0]?'active':''}" onclick="GestMedCondutas.tab('${t[0]}')">${t[1]}</button>`).join('')}</div><div class="conduta-pane active">${content[aba]}</div>`;
  }
  function open(){atual=null;aba='resumo';renderList();modal.classList.add('open');document.body.style.overflow='hidden';}
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  function detail(id){atual=id;aba='resumo';renderDetail();root.scrollTop=0;}
  function tab(id){aba=id;renderDetail();}
  function list(){atual=null;renderList();}
  function outside(e){if(e.target===modal)close();}
  async function copy(){const p=PROTOCOLOS.find(x=>x.id===atual);if(!p)return;const txt=p.nome+'\n\nPRESCRIÇÃO HOSPITALAR-MODELO\n'+p.prescricao.map((x,i)=>(i+1)+'. '+x).join('\n')+'\n\nATENÇÃO: revisar individualmente antes de prescrever.';try{await navigator.clipboard.writeText(txt);alert('Prescrição-modelo copiada. Revise antes de utilizar.');}catch(e){alert('Não foi possível copiar automaticamente neste navegador.');}}
  window.GestMedCondutas={open,close,detail,tab,list,outside,copy,selectPathology};
})();
</script>

</body>
</html>

```

## condutasSuggestions
```html
click="GestMedCondutas.detail('${p.id}')"><div class="conduta-card-title">${esc(p.nome)}</div><div class="conduta-card-sub">${esc(p.subtitulo)}</div><span class="conduta-severity ${p.classe}">${esc(p.gravidade)}</span></button>`).join('')}</div></section>`;
      }).join('');
    };
    root.innerHTML=`<div class="condutas-header"><h2>🩺 Condutas Obstétricas</h2><p>Protocolos clínicos e prescrições hospitalares-modelo organizados por categoria.</p><div style="margin-top:8px;font-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critic
```
```html
t-size:10.5px;font-weight:800;opacity:.9">Versão 2026.07.23.91 · ${PROTOCOLOS.length} patologias</div></div><div class="condutas-alert"><strong>Uso profissional e educacional.</strong> Antes de copiar qualquer item, confirme idade gestacional, peso, função renal, alergias, apresentação/concentração do medicamento, protocolo institucional e avaliação do obstetra responsável.</div><div class="condutas-search-panel"><label class="condutas-search-label" for="condutasSearch">Pesquisar e selecionar uma patologia</label><div class="condutas-search-wrap"><span class="condutas-search-icon">🔎</span><input class="condutas-search" id="condutasSearch" type="search" autocomplete="off" placeholder="Digite ou toque para escolher a patologia" value="${esc(filter)}"><button class="condutas-search-clear" id="condutasSearchClear" type="button" aria-label="Limpar pesquisa">×</button></div><div class="condutas-suggestions" id="condutasSuggestions"></div><div class="condutas-search-help">Toque no campo para visualizar as patologias disponíveis ou digite parte do nome.</div></div><div class="condutas-browse-title"><strong>Patologias disponíveis</strong><span class="condutas-browse-count" id="condutasBrowseCount">${PROTOCOLOS.length}</span></div><div id="condutasCardsArea">${buildBlocks(PROTOCOLOS)}</div>`;
    const inp=document.getElementById('condutasSearch');
    const sug=document.getElementById('condutasSuggestions');
    const clear=document.getElementById('condutasSearchClear');
    const area=document.getElementById('condutasCardsArea');
    const count=document.getElementById('condutasBrowseCount');
    const normalize=s=>(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const matches=q=>{
      const nq=normalize(q.trim());
      return PROTOCOLOS.filter(p=>normalize(p.nome+' '+p.subtitulo+' '+p.categoria).includes(nq));
    };
    const update=(value,show=true)=>{
      const list=matches(value);
      area.innerHTML=buildBlocks(list)||'<div class="conduta-placeholder">Nenhuma condição encontrada.</div>';
      count.textContent=list.length;
      clear.style.display=value?'flex':'none';
      const suggestions=(value?list:PROTOCOLOS).slice(0,20);
      sug.innerHTML=suggestions.length?suggestions.map(p=>`<button type="button" class="condutas-suggestion" onclick="GestMedCondutas.selectPathology('${p.id}')"><div class="condutas-suggestion-name">${esc(p.nome)}</div><div class="condutas-suggestion-category">${esc(p.categoria)} · ${esc(p.gravidade)}</div></button>`).join(''):'<div class="condutas-no-suggestion">Nenhuma patologia encontrada.</div>';
      if(show)sug.classList.add('open');
    };
    inp.addEventListener('focus',()=>update(inp.value,true));
    inp.addEventListener('click',()=>update(inp.value,true));
    inp.addEventListener('input',()=>update(inp.value,true));
    clear.addEventListener('click',()=>{inp.value='';update('',true);inp.focus();});
    document.addEventListener('click',function hideCondutasSuggestions(e){
      if(!e.target.closest('.condutas-search-panel'))sug.classList.remove('open');
    },{once:true,capture:true});
  }
  function selectPathology(id){const p=PROTOCOLOS.find(x=>x.id===id);if(!p)return;detail(id);}
  function listHtml(items, ordered=false, cls=''){const tag=ordered?'ol':'ul';return `<${tag} class="${cls}">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</${tag}>`;}
  function renderDetail(){
    const p=PROTOCOLOS.find(x=>x.id===atual); if(!p)return renderList();
    const tabs=[['resumo','Resumo'],['avaliacao','Avaliação'],['exames','Exames'],['conduta','Conduta'],['prescricao','Prescrição-modelo'],['fontes','Fontes']];
    const content={
      resumo:`<div class="conduta-box"><h3>Definição e pontos-chave</h3>${listHtml(p.resumo)}</div>`,
      avaliacao:`<div class="conduta-box"><h3>Avaliação inicial</h3>${listHtml(p.avaliacao,true)}</div>`,
      exames:`<div class="conduta-box"><h3>Exames e monitorização</h3>${listHtml(p.exames)}</div>`,
      conduta:`<div class="conduta-box"><h3>Conduta médica</h3>${listHtml(p.conduta,true)}</div>`,
      prescricao:`<div class="conduta-box rx-critical"><h3>Prescrição hospitalar-modelo</h3>${listHtml(p.prescricao,true,'prescricao-hosp')}<button class="conduta-copy" onclick="GestMedCondutas.copy()">Copiar prescrição-modelo</button></div><div class="condutas-alert">Não cole diretamente no prontuário sem revisar doses, diluições, concentração disponível, função renal, balanço hídrico, alergias e protocolo da instituição.</div>`,
      fontes:`<div class="conduta-box"><h3>Referências utilizadas</h3><div class="conduta-source"
```

## condutaSuggestions
Não encontrado.

## renderCondutas
Não encontrado.

## filtrarPatologias
Não encontrado.
