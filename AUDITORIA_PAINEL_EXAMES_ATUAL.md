# Auditoria do painel de exames atual

## Regra principal:
Índice: 278372
```html
dático):</strong> divisão clássica de NPH em 2 aplicações — 2/3 da
          dose total pela manhã (em jejum) + 1/3 à noite (ao deitar). Fonte: TelessaúdeRS-UFRGS; convenção
          padrão de fracionamento de NPH em 2 aplicações diárias.
        </div>
      </div>

      <!-- BLOCO: DIVISÃO EM 3 APLICAÇÕES/DIA (SÓ NPH) -->
      <div class="dmg-scheme-block">
        <h4>🔹 NPH dividida em 3 aplicações/dia</h4>
        <table class="dmg-table" style="margin-top:8px;">
          <thead>
            <tr><th>Horário</th><th>Proporção</th><th>Dose</th></tr>
          </thead>
          <tbody id="dmgResultBody3"></tbody>
        </table>
        <div class="dmg-info-box" style="margin-top:10px;">
          <strong>Como se chega nisso (didático):</strong> NPH fracionada em 3 partes iguais — café da manhã,
          almoço e ao deitar. Fonte: Hospital Universitário de Brasília — Aspectos práticos da insulinoterapia
          nos diabetes gestacional e pré-gestacional (Revista Brasília de Clínica).
        </div>
      </div>

      <p style="font-size:10.5px; color:#94a3b8; margin:4px 0 0;">
        Doses arredondadas para a unidade inteira (UI) mais próxima — seringas e canetas de insulina não
        medem frações de unidade. Por isso, a soma das doses pode diferir em 1 UI da dose total acima — isso
        é esperado e não é erro de cálculo.
      </p>

      <div class="dmg-info-box" style="margin-top:10px;">
        <strong>Isso é um ponto de partida de referência.</strong> Na prática, o ajuste da dose e a
        necessidade de complementar o tratamento são sempre definidos pela equipe assistente, conforme os
        valores de glicemia capilar da própria paciente.
      </div>
    </div>
  </div>

  <!-- ===================== MODAL: PAINEL DE EXAMES PRÉ-NATAL ===================== -->
  <div class="modal" id="examesModal" onclick="GestMedApp.fecharExamesModalAoClicarFora(event)">
    <div class="sheet">
      <div class="handle"></div>
      <div class="sheet-nav">
        <button class="back-btn" onclick="GestMedApp.closeExamesModule()">← Voltar</button>
        <button class="close" onclick="GestMedApp.closeExamesModule()">×</button>
      </div>
      <h2 style="margin:4px 0 4px;">📋 Painel de Exames — Pré-natal de risco habitual</h2>
      <div class="category-subtitle">Exames organizados por janela gestacional, com indicação do período ideal, prazo máximo e situações em que devem ser repetidos.</div>

      <div class="exames-nota">
        <strong>Regra principal:</strong> o painel inicial deve ser solicitado na <strong>primeira consulta</strong>,
        idealmente até <strong>12 semanas</strong>. Se o pré-natal começar depois, não se deve esperar o próximo
        trimestre: solicitar os exames iniciais imediatamente. As janelas abaixo orientam o melhor momento,
        mas não substituem avaliação clínica, epidemiológica e protocolo municipal.
      </div>

      <div class="exames-resumo-box">
        <div class="exames-resumo-titulo">🗂️ Resumo rápido — janelas principais</div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t1">1º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel inicial: 1ª consulta, preferencialmente até 12s</span>
            <span>USG 1º trimestre: 11s0d–13s6d</span>
            <span>Malária na Amazônia: testar no pré-natal</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t2">2º TRI</span>
          <div class="exames-resumo-lista">
            <span>USG morfológica: 18–24s; ideal 20s0d–23s6d</span>
            <span>TOTG 75 g: 24–28s</span>
            <span>Toxoplasmose: repetir bimestralmente e no parto se suscetível</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t3">3º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel de repetição: 28–30s</span>
            <span>EGB: 35–37s, conforme rotina municipal</span>
            <span>HIV e sífilis: repetir também na admissão para parto</span>
          </div>
        </div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>1️⃣ 1º trimestre</span>
        <span class="exames-trimestre-sub">— 0 a 13 semanas e 6 dias</span>
      </div>

      <div class="exames-nota">
        <strong>Janela do painel inicial:</strong> primeira consulta, preferencialmente até 12s0d. Se a gestante
        chegar com 14 semanas ou mais sem exames, solicitar este painel no mesmo dia.
      </div>

      <div class="exame-item">
        <span class="exame-nome">Hemograma completo</span><span class="exame-quando">1ª consulta · até 12s ideal</span>
        <div class="exame-desc">Rastreia anemia e alterações hematológicas. Repetir entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Tipagem ABO + fator Rh</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Se Rh negativo, solicitar Coombs indireto na mesma coleta.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto</span><span class="exame-quando">1ª consulta se Rh negativo</span>
        <div class="exame-desc">Se negativo e parceiro Rh positivo ou desconhecido, repetir conforme protocolo — a Linha de Cuidado do MS orienta intervalos de 4 semanas. Se positivo, encaminhar ao alto risco para titulação e vigilância fetal. A imunoglobulina anti-D é profilaxia, não exame.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Rastreio inicial de hiperglicemia. Se &lt;92 mg/dL e sem diagnóstico prévio, realizar TOTG 75 g entre 24 e 28 semanas. Se o pré-natal iniciar após 28 semanas sem rastreio, realizar a investigação imediatamente.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">EAS/urina tipo I</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Avalia proteinúria, hematúria, glicose, cetonas e sinais indiretos de infecção. Repetir no início do 3º trimestre, entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Urocultura com antibiograma</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Rastreia bacteriúria assintomática. Se positiva, tratar e fazer cultura de controle cerca de 7 dias após o término. Se a primeira for negativa, repetir apenas conforme sintomas, história de ITU recorrente, nefropatia ou rotina local; não confundir com o EAS de 28–30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Sífilis — teste rápido e/ou VDRL</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir entre 28 e 30 semanas e novamente na admissão para parto. Repetir também diante de exposição de risco e em abortamento.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV — teste rápido/sorologia</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir no início do 3º trimestre, por volta de 28 semanas, e na admissão para parto, independentemente de testagem anterior.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Se não realizado durante o pré-natal, repetir na admissão para parto; também repetir diante de nova exposição de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite C — anti-HCV ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Resultado reagente exige confirmação com HCV-RNA. Repetir apenas se exposição de risco ou protocolo específico.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose — IgG e IgM</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Se IgG e IgM não reagentes, a gestante é suscetível: reforçar prevenção e repetir as sorologias bimestralmente e no momento do parto, conforme a Linha de Cuidado do MS e o fluxo local. IgM reagente exige investigação imediata.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HTLV-1/2 — triagem</span><span class="exame-quando">1º trimestre · preferir 1ª consulta</span>
        <div class="exame-desc">Recomendação nacional recente: iniciar testagem quando os testes de triagem e confirmação estiverem disponíveis no território. Resultado reagente exige confirmação e planejamento de prevenção da transmissão vertical.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#0f766e,#059669);color:#fff;">
        <span>🌎 Exames regionais ou epidemiológicos</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">Malária — gota espessa ou teste rápido</span><span class="exame-quando">Região Amazônica · pré-natal</span>
        <div class="exame-desc"><strong>Importante para Rondônia:</strong> o Ministério da Saúde orienta testagem das gestantes da Região Amazônica, mesmo sem sintomas. Repetir imediatamente diante de febre, calafrios, cefaleia ou conforme vigilância local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Doença de Chagas — sorologia</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Priorizar conforme perfil epidemiológico: residência anterior em área endêmica, moradia rural de risco, transfusão antiga, mãe/familiar com Chagas ou protocolo territorial. O diagnóstico materno permite investigar o recém-nascido.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Eletroforese de hemoglobina</span><span class="exame-quando">1ª consulta · se indicada</span>
        <div class="exame-desc">Solicitar quando não houver resultado prévio e existir história pessoal/familiar, anemia sugestiva, origem populacional de risco ou previsão no protocolo local. Identifica doença falciforme e talassemias.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#475569,#64748b);color:#fff;">
        <span>🔎 Exames seletivos — não são rotina universal</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">TSH ± T4 livre</span><span class="exame-quando">qualquer IG · somente se indicado</span>
        <div class="exame-desc">A triagem universal de gestantes assintomáticas não é recomendada na Linha de Cuidado do MS. Solicitar em doença tireoidiana prévia, sintomas, bócio, autoimunidade, uso de medicações ou outros fatores de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rastreamento do colo do útero</span><span class="exame-quando">durante o pré-natal se estiver devido</span>
        <div class="exame-desc">Não é exame anual obrigatório. Seguir o programa nacional: DNA-HPV onde implantado ou citologia onde ainda utilizada, conforme idade e periodicidade do rastreamento. A gestação não impede a coleta quando indicada.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rubéola IgG, parasitológico de fezes e outras sorologias</span><span class="exame-quando">somente por indicação/local</span>
        <div class="exame-desc">Solicitar conforme histórico vacinal, sintomas, exposição, endemicidade ou protocolo municipal. Não incluir automaticamente em todas as gestantes.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Creatinina, TGO/TGP, DHL, ácido úrico, proteinúria quantitativa, coagulograma e ferritina</span><span class="exame-quando">somente se risco ou alteração clínica</span>
        <div class="exame-desc">Não pertencem ao painel universal de baixo risco. São indicados em hipertensão, suspeita de pré-eclâmpsia, doença renal/hepática, anemia não esclarecida, sangramento ou outras intercorrências.</div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>🩻 Imagem no 1º trimestre</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG transvaginal precoce</span><span class="exame-quando">6–10 semanas · se indicada</span>
        <div class="exame-desc">Útil para dor, sangramento, dúvida de idade gestacional, localização/viabilidade ou suspeita de gestação múltipla. Não é obrigatório realizar duas ultrassonografias transvaginais de rotina.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG do 1º trimestre / avaliação morfológica</span><span class="exame-quando">11s0d–13s6d</span>
        <div class="exame-desc">Janela fechada: realizar até 13s6d. Permite datação, número de fetos, corionicidade e avaliação morfológica inicial. Doppler e rastreamentos adicionais dependem de disponibilidade e protocolo.</div>
      </div>

      <div class="exames-trimestre-header t2">
        <span>2️⃣ 2º trimestre</span>
        <span class="exames-trimestre-sub">— 14 semanas a 27 semanas e 6 dias</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">USG morfológica do 2º trimestre</span><span class="exame-quando">18s0d–24s0d · ideal 20s0d–23s6d</span>
        <div class="exame-desc">Avalia anatomia fetal, placenta e líquido. Medida do colo por via transvaginal e Doppler devem seguir indicação, disponibilidade e protocolo; Doppler não é obrigatório em toda gestação de baixo risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">TOTG 75 g</span><span class="exame-quando">24s0d–28s0d</span>
        <div class="exame-desc">Realizar após glicemia inicial &lt;92 mg/dL e ausência de diabetes manifesto. Coletas em jejum, 1 hora e 2 horas. Se a gestante chegar depois de 28 semanas sem rastreio, realizar na primeira oportunidade.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose IgG/IgM — suscetível</span><span class="exame-quando">repetição bimestral</span>
        <div class="exame-desc">Para gestante IgG e IgM negativ
```

## Resumo rápido — janelas principais
Índice: 278876
```html
 <tr><th>Horário</th><th>Proporção</th><th>Dose</th></tr>
          </thead>
          <tbody id="dmgResultBody3"></tbody>
        </table>
        <div class="dmg-info-box" style="margin-top:10px;">
          <strong>Como se chega nisso (didático):</strong> NPH fracionada em 3 partes iguais — café da manhã,
          almoço e ao deitar. Fonte: Hospital Universitário de Brasília — Aspectos práticos da insulinoterapia
          nos diabetes gestacional e pré-gestacional (Revista Brasília de Clínica).
        </div>
      </div>

      <p style="font-size:10.5px; color:#94a3b8; margin:4px 0 0;">
        Doses arredondadas para a unidade inteira (UI) mais próxima — seringas e canetas de insulina não
        medem frações de unidade. Por isso, a soma das doses pode diferir em 1 UI da dose total acima — isso
        é esperado e não é erro de cálculo.
      </p>

      <div class="dmg-info-box" style="margin-top:10px;">
        <strong>Isso é um ponto de partida de referência.</strong> Na prática, o ajuste da dose e a
        necessidade de complementar o tratamento são sempre definidos pela equipe assistente, conforme os
        valores de glicemia capilar da própria paciente.
      </div>
    </div>
  </div>

  <!-- ===================== MODAL: PAINEL DE EXAMES PRÉ-NATAL ===================== -->
  <div class="modal" id="examesModal" onclick="GestMedApp.fecharExamesModalAoClicarFora(event)">
    <div class="sheet">
      <div class="handle"></div>
      <div class="sheet-nav">
        <button class="back-btn" onclick="GestMedApp.closeExamesModule()">← Voltar</button>
        <button class="close" onclick="GestMedApp.closeExamesModule()">×</button>
      </div>
      <h2 style="margin:4px 0 4px;">📋 Painel de Exames — Pré-natal de risco habitual</h2>
      <div class="category-subtitle">Exames organizados por janela gestacional, com indicação do período ideal, prazo máximo e situações em que devem ser repetidos.</div>

      <div class="exames-nota">
        <strong>Regra principal:</strong> o painel inicial deve ser solicitado na <strong>primeira consulta</strong>,
        idealmente até <strong>12 semanas</strong>. Se o pré-natal começar depois, não se deve esperar o próximo
        trimestre: solicitar os exames iniciais imediatamente. As janelas abaixo orientam o melhor momento,
        mas não substituem avaliação clínica, epidemiológica e protocolo municipal.
      </div>

      <div class="exames-resumo-box">
        <div class="exames-resumo-titulo">🗂️ Resumo rápido — janelas principais</div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t1">1º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel inicial: 1ª consulta, preferencialmente até 12s</span>
            <span>USG 1º trimestre: 11s0d–13s6d</span>
            <span>Malária na Amazônia: testar no pré-natal</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t2">2º TRI</span>
          <div class="exames-resumo-lista">
            <span>USG morfológica: 18–24s; ideal 20s0d–23s6d</span>
            <span>TOTG 75 g: 24–28s</span>
            <span>Toxoplasmose: repetir bimestralmente e no parto se suscetível</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t3">3º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel de repetição: 28–30s</span>
            <span>EGB: 35–37s, conforme rotina municipal</span>
            <span>HIV e sífilis: repetir também na admissão para parto</span>
          </div>
        </div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>1️⃣ 1º trimestre</span>
        <span class="exames-trimestre-sub">— 0 a 13 semanas e 6 dias</span>
      </div>

      <div class="exames-nota">
        <strong>Janela do painel inicial:</strong> primeira consulta, preferencialmente até 12s0d. Se a gestante
        chegar com 14 semanas ou mais sem exames, solicitar este painel no mesmo dia.
      </div>

      <div class="exame-item">
        <span class="exame-nome">Hemograma completo</span><span class="exame-quando">1ª consulta · até 12s ideal</span>
        <div class="exame-desc">Rastreia anemia e alterações hematológicas. Repetir entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Tipagem ABO + fator Rh</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Se Rh negativo, solicitar Coombs indireto na mesma coleta.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto</span><span class="exame-quando">1ª consulta se Rh negativo</span>
        <div class="exame-desc">Se negativo e parceiro Rh positivo ou desconhecido, repetir conforme protocolo — a Linha de Cuidado do MS orienta intervalos de 4 semanas. Se positivo, encaminhar ao alto risco para titulação e vigilância fetal. A imunoglobulina anti-D é profilaxia, não exame.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Rastreio inicial de hiperglicemia. Se &lt;92 mg/dL e sem diagnóstico prévio, realizar TOTG 75 g entre 24 e 28 semanas. Se o pré-natal iniciar após 28 semanas sem rastreio, realizar a investigação imediatamente.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">EAS/urina tipo I</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Avalia proteinúria, hematúria, glicose, cetonas e sinais indiretos de infecção. Repetir no início do 3º trimestre, entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Urocultura com antibiograma</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Rastreia bacteriúria assintomática. Se positiva, tratar e fazer cultura de controle cerca de 7 dias após o término. Se a primeira for negativa, repetir apenas conforme sintomas, história de ITU recorrente, nefropatia ou rotina local; não confundir com o EAS de 28–30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Sífilis — teste rápido e/ou VDRL</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir entre 28 e 30 semanas e novamente na admissão para parto. Repetir também diante de exposição de risco e em abortamento.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV — teste rápido/sorologia</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir no início do 3º trimestre, por volta de 28 semanas, e na admissão para parto, independentemente de testagem anterior.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Se não realizado durante o pré-natal, repetir na admissão para parto; também repetir diante de nova exposição de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite C — anti-HCV ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Resultado reagente exige confirmação com HCV-RNA. Repetir apenas se exposição de risco ou protocolo específico.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose — IgG e IgM</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Se IgG e IgM não reagentes, a gestante é suscetível: reforçar prevenção e repetir as sorologias bimestralmente e no momento do parto, conforme a Linha de Cuidado do MS e o fluxo local. IgM reagente exige investigação imediata.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HTLV-1/2 — triagem</span><span class="exame-quando">1º trimestre · preferir 1ª consulta</span>
        <div class="exame-desc">Recomendação nacional recente: iniciar testagem quando os testes de triagem e confirmação estiverem disponíveis no território. Resultado reagente exige confirmação e planejamento de prevenção da transmissão vertical.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#0f766e,#059669);color:#fff;">
        <span>🌎 Exames regionais ou epidemiológicos</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">Malária — gota espessa ou teste rápido</span><span class="exame-quando">Região Amazônica · pré-natal</span>
        <div class="exame-desc"><strong>Importante para Rondônia:</strong> o Ministério da Saúde orienta testagem das gestantes da Região Amazônica, mesmo sem sintomas. Repetir imediatamente diante de febre, calafrios, cefaleia ou conforme vigilância local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Doença de Chagas — sorologia</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Priorizar conforme perfil epidemiológico: residência anterior em área endêmica, moradia rural de risco, transfusão antiga, mãe/familiar com Chagas ou protocolo territorial. O diagnóstico materno permite investigar o recém-nascido.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Eletroforese de hemoglobina</span><span class="exame-quando">1ª consulta · se indicada</span>
        <div class="exame-desc">Solicitar quando não houver resultado prévio e existir história pessoal/familiar, anemia sugestiva, origem populacional de risco ou previsão no protocolo local. Identifica doença falciforme e talassemias.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#475569,#64748b);color:#fff;">
        <span>🔎 Exames seletivos — não são rotina universal</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">TSH ± T4 livre</span><span class="exame-quando">qualquer IG · somente se indicado</span>
        <div class="exame-desc">A triagem universal de gestantes assintomáticas não é recomendada na Linha de Cuidado do MS. Solicitar em doença tireoidiana prévia, sintomas, bócio, autoimunidade, uso de medicações ou outros fatores de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rastreamento do colo do útero</span><span class="exame-quando">durante o pré-natal se estiver devido</span>
        <div class="exame-desc">Não é exame anual obrigatório. Seguir o programa nacional: DNA-HPV onde implantado ou citologia onde ainda utilizada, conforme idade e periodicidade do rastreamento. A gestação não impede a coleta quando indicada.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rubéola IgG, parasitológico de fezes e outras sorologias</span><span class="exame-quando">somente por indicação/local</span>
        <div class="exame-desc">Solicitar conforme histórico vacinal, sintomas, exposição, endemicidade ou protocolo municipal. Não incluir automaticamente em todas as gestantes.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Creatinina, TGO/TGP, DHL, ácido úrico, proteinúria quantitativa, coagulograma e ferritina</span><span class="exame-quando">somente se risco ou alteração clínica</span>
        <div class="exame-desc">Não pertencem ao painel universal de baixo risco. São indicados em hipertensão, suspeita de pré-eclâmpsia, doença renal/hepática, anemia não esclarecida, sangramento ou outras intercorrências.</div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>🩻 Imagem no 1º trimestre</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG transvaginal precoce</span><span class="exame-quando">6–10 semanas · se indicada</span>
        <div class="exame-desc">Útil para dor, sangramento, dúvida de idade gestacional, localização/viabilidade ou suspeita de gestação múltipla. Não é obrigatório realizar duas ultrassonografias transvaginais de rotina.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG do 1º trimestre / avaliação morfológica</span><span class="exame-quando">11s0d–13s6d</span>
        <div class="exame-desc">Janela fechada: realizar até 13s6d. Permite datação, número de fetos, corionicidade e avaliação morfológica inicial. Doppler e rastreamentos adicionais dependem de disponibilidade e protocolo.</div>
      </div>

      <div class="exames-trimestre-header t2">
        <span>2️⃣ 2º trimestre</span>
        <span class="exames-trimestre-sub">— 14 semanas a 27 semanas e 6 dias</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">USG morfológica do 2º trimestre</span><span class="exame-quando">18s0d–24s0d · ideal 20s0d–23s6d</span>
        <div class="exame-desc">Avalia anatomia fetal, placenta e líquido. Medida do colo por via transvaginal e Doppler devem seguir indicação, disponibilidade e protocolo; Doppler não é obrigatório em toda gestação de baixo risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">TOTG 75 g</span><span class="exame-quando">24s0d–28s0d</span>
        <div class="exame-desc">Realizar após glicemia inicial &lt;92 mg/dL e ausência de diabetes manifesto. Coletas em jejum, 1 hora e 2 horas. Se a gestante chegar depois de 28 semanas sem rastreio, realizar na primeira oportunidade.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose IgG/IgM — suscetível</span><span class="exame-quando">repetição bimestral</span>
        <div class="exame-desc">Para gestante IgG e IgM negativas no início, repetir a cada dois meses. Uma coleta costuma cair no 2º trimestre; manter o calendário bimestral até o parto.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto — Rh negativo não sensibilizada</span><span class="exame-quando">intervalos de 4 semanas</span>
        <div class="exame-desc">Manter repetição conforme protocolo quando parceiro for Rh positivo/desconhecido. Garantir resultado recente antes da profilaxia anti-D em torno de 28 s
```

## 1º trimestre — 0 a 13 semanas e 6 dias
Índice: -1

## Vacinas da gestante
Índice: -1

## Hepatite B — HBsAg
Índice: 283410
```html
<div class="exame-desc">Se Rh negativo, solicitar Coombs indireto na mesma coleta.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto</span><span class="exame-quando">1ª consulta se Rh negativo</span>
        <div class="exame-desc">Se negativo e parceiro Rh positivo ou desconhecido, repetir conforme protocolo — a Linha de Cuidado do MS orienta intervalos de 4 semanas. Se positivo, encaminhar ao alto risco para titulação e vigilância fetal. A imunoglobulina anti-D é profilaxia, não exame.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Rastreio inicial de hiperglicemia. Se &lt;92 mg/dL e sem diagnóstico prévio, realizar TOTG 75 g entre 24 e 28 semanas. Se o pré-natal iniciar após 28 semanas sem rastreio, realizar a investigação imediatamente.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">EAS/urina tipo I</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Avalia proteinúria, hematúria, glicose, cetonas e sinais indiretos de infecção. Repetir no início do 3º trimestre, entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Urocultura com antibiograma</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Rastreia bacteriúria assintomática. Se positiva, tratar e fazer cultura de controle cerca de 7 dias após o término. Se a primeira for negativa, repetir apenas conforme sintomas, história de ITU recorrente, nefropatia ou rotina local; não confundir com o EAS de 28–30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Sífilis — teste rápido e/ou VDRL</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir entre 28 e 30 semanas e novamente na admissão para parto. Repetir também diante de exposição de risco e em abortamento.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV — teste rápido/sorologia</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir no início do 3º trimestre, por volta de 28 semanas, e na admissão para parto, independentemente de testagem anterior.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Se não realizado durante o pré-natal, repetir na admissão para parto; também repetir diante de nova exposição de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite C — anti-HCV ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Resultado reagente exige confirmação com HCV-RNA. Repetir apenas se exposição de risco ou protocolo específico.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose — IgG e IgM</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Se IgG e IgM não reagentes, a gestante é suscetível: reforçar prevenção e repetir as sorologias bimestralmente e no momento do parto, conforme a Linha de Cuidado do MS e o fluxo local. IgM reagente exige investigação imediata.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HTLV-1/2 — triagem</span><span class="exame-quando">1º trimestre · preferir 1ª consulta</span>
        <div class="exame-desc">Recomendação nacional recente: iniciar testagem quando os testes de triagem e confirmação estiverem disponíveis no território. Resultado reagente exige confirmação e planejamento de prevenção da transmissão vertical.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#0f766e,#059669);color:#fff;">
        <span>🌎 Exames regionais ou epidemiológicos</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">Malária — gota espessa ou teste rápido</span><span class="exame-quando">Região Amazônica · pré-natal</span>
        <div class="exame-desc"><strong>Importante para Rondônia:</strong> o Ministério da Saúde orienta testagem das gestantes da Região Amazônica, mesmo sem sintomas. Repetir imediatamente diante de febre, calafrios, cefaleia ou conforme vigilância local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Doença de Chagas — sorologia</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Priorizar conforme perfil epidemiológico: residência anterior em área endêmica, moradia rural de risco, transfusão antiga, mãe/familiar com Chagas ou protocolo territorial. O diagnóstico materno permite investigar o recém-nascido.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Eletroforese de hemoglobina</span><span class="exame-quando">1ª consulta · se indicada</span>
        <div class="exame-desc">Solicitar quando não houver resultado prévio e existir história pessoal/familiar, anemia sugestiva, origem populacional de risco ou previsão no protocolo local. Identifica doença falciforme e talassemias.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#475569,#64748b);color:#fff;">
        <span>🔎 Exames seletivos — não são rotina universal</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">TSH ± T4 livre</span><span class="exame-quando">qualquer IG · somente se indicado</span>
        <div class="exame-desc">A triagem universal de gestantes assintomáticas não é recomendada na Linha de Cuidado do MS. Solicitar em doença tireoidiana prévia, sintomas, bócio, autoimunidade, uso de medicações ou outros fatores de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rastreamento do colo do útero</span><span class="exame-quando">durante o pré-natal se estiver devido</span>
        <div class="exame-desc">Não é exame anual obrigatório. Seguir o programa nacional: DNA-HPV onde implantado ou citologia onde ainda utilizada, conforme idade e periodicidade do rastreamento. A gestação não impede a coleta quando indicada.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rubéola IgG, parasitológico de fezes e outras sorologias</span><span class="exame-quando">somente por indicação/local</span>
        <div class="exame-desc">Solicitar conforme histórico vacinal, sintomas, exposição, endemicidade ou protocolo municipal. Não incluir automaticamente em todas as gestantes.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Creatinina, TGO/TGP, DHL, ácido úrico, proteinúria quantitativa, coagulograma e ferritina</span><span class="exame-quando">somente se risco ou alteração clínica</span>
        <div class="exame-desc">Não pertencem ao painel universal de baixo risco. São indicados em hipertensão, suspeita de pré-eclâmpsia, doença renal/hepática, anemia não esclarecida, sangramento ou outras intercorrências.</div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>🩻 Imagem no 1º trimestre</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG transvaginal precoce</span><span class="exame-quando">6–10 semanas · se indicada</span>
        <div class="exame-desc">Útil para dor, sangramento, dúvida de idade gestacional, localização/viabilidade ou suspeita de gestação múltipla. Não é obrigatório realizar duas ultrassonografias transvaginais de rotina.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG do 1º trimestre / avaliação morfológica</span><span class="exame-quando">11s0d–13s6d</span>
        <div class="exame-desc">Janela fechada: realizar até 13s6d. Permite datação, número de fetos, corionicidade e avaliação morfológica inicial. Doppler e rastreamentos adicionais dependem de disponibilidade e protocolo.</div>
      </div>

      <div class="exames-trimestre-header t2">
        <span>2️⃣ 2º trimestre</span>
        <span class="exames-trimestre-sub">— 14 semanas a 27 semanas e 6 dias</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">USG morfológica do 2º trimestre</span><span class="exame-quando">18s0d–24s0d · ideal 20s0d–23s6d</span>
        <div class="exame-desc">Avalia anatomia fetal, placenta e líquido. Medida do colo por via transvaginal e Doppler devem seguir indicação, disponibilidade e protocolo; Doppler não é obrigatório em toda gestação de baixo risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">TOTG 75 g</span><span class="exame-quando">24s0d–28s0d</span>
        <div class="exame-desc">Realizar após glicemia inicial &lt;92 mg/dL e ausência de diabetes manifesto. Coletas em jejum, 1 hora e 2 horas. Se a gestante chegar depois de 28 semanas sem rastreio, realizar na primeira oportunidade.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose IgG/IgM — suscetível</span><span class="exame-quando">repetição bimestral</span>
        <div class="exame-desc">Para gestante IgG e IgM negativas no início, repetir a cada dois meses. Uma coleta costuma cair no 2º trimestre; manter o calendário bimestral até o parto.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto — Rh negativo não sensibilizada</span><span class="exame-quando">intervalos de 4 semanas</span>
        <div class="exame-desc">Manter repetição conforme protocolo quando parceiro for Rh positivo/desconhecido. Garantir resultado recente antes da profilaxia anti-D em torno de 28 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Ecocardiograma fetal</span><span class="exame-quando">18–28 semanas · se indicado</span>
        <div class="exame-desc">Não é exame universal de baixo risco. Indicar por alteração na morfológica, diabetes prévio, autoimunidade, história familiar, arritmia fetal ou outros fatores reconhecidos.</div>
      </div>

      <div class="exames-trimestre-header t3">
        <span>3️⃣ 3º trimestre</span>
        <span class="exames-trimestre-sub">— 28 semanas até o parto</span>
      </div>

      <div class="exames-nota">
        <strong>Janela principal de repetição:</strong> entre <strong>28s0d e 30s6d</strong>. Não deixar para o final da gestação sem justificativa.
      </div>

      <div class="exame-item">
        <span class="exame-nome">Hemograma completo</span><span class="exame-quando">28–30 semanas</span>
        <div class="exame-desc">Reavaliar anemia, plaquetas e condições hematológicas antes do parto.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">28–30 semanas</span>
        <div class="exame-desc">Consta na rotina do 3º trimestre do MS. Não substitui o TOTG de 24–28 semanas quando este estava indicado.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Sífilis — teste rápido e/ou VDRL</span><span class="exame-quando">28–30 semanas</span>
        <div class="exame-desc">Repetir novamente na admissão para parto, independentemente do resultado pré-natal.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV — teste rápido/sorologia</span><span class="exame-quando">início do 3º tri · cerca de 28s</span>
        <div class="exame-desc">Repetir também na admissão para parto.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">EAS/urina tipo I</span><span class="exame-quando">28–30 semanas</span>
        <div class="exame-desc">Repetição de rotina. Urocultura adicional depende do resultado inicial, sintomas, recorrência, nefropatia ou protocolo local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose IgG/IgM — suscetível</span><span class="exame-quando">28–30s se coincidir com repetição bimestral</span>
        <div class="exame-desc">Manter repetição a cada dois meses nas gestantes inicialmente não imunes e repetir também no momento do parto.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto — Rh negativo</span><span class="exame-quando">a cada 4 semanas, conforme protocolo</span>
        <div class="exame-desc">Se positivar, não seguir como baixo risco: encaminhar para avaliação de aloimunização. Anti-D em torno de 28 semanas é medida preventiva, não exame.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatites B e C — repetição</span><span class="exame-quando">se exposição, teste ausente ou risco novo</span>
        <div class="exame-desc">Não há necessidade de repetição universal quando o painel inicial foi negativo e não houve nova exposição, salvo protocolo local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Cultura vaginal e anal para estreptococo do grupo B</span><span class="exame-quando">35s0d–37s6d</span>
        <div class="exame-desc">Pode ser ofertada conforme rotina municipal. Não apresentar como obrigatória em todos os municípios. Se positiva, indicar profilaxia intraparto conforme protocolo.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG de crescimento, líquido e Doppler</span><span class="exame-quando">somente se indicada</span>
        <div class="exame-desc">Ultrassonografias seriadas e Doppler não são rotina universal no baixo risco. Solicitar por alteração da altura uterina, movimentos fetais, apresentação, comorbidades ou suspeita de crescimento anormal.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#991b1b,#dc2626);color:#fff;">
        <span>🏥 Admissão para parto ou abortamento</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV + sífilis</span><span class="exame-quando">na admissão para parto</span>
        <div class="exame-desc">Realizar independentemente da existência de resultados anteriores. Em abortamento, garantir testagem para sífilis e avaliar d
```

## function openExames
Índice: 1680493
```html
 + keywords.join("|") + ")");
    const allMatches = RAW_DATA.filter(function (med) {
      return combinedRegex.test(categorySearchableText(med));
    });
    const matches = allMatches.filter(function (med) {
      const slug = classifyRisk(med.decisao_resumida_gestacao);
      return slug === "preferencial" || slug === "permitido";
    });
    const cautelaMatches = allMatches.filter(function (med) {
      const slug = classifyRisk(med.decisao_resumida_gestacao);
      return slug === "cautela" || slug === "especifico";
    });

    elCategoryTitle.textContent = label;

    function renderCard(med) {
      const slug = classifyRisk(med.decisao_resumida_gestacao);
      const derivativeFlag = isDerivative(med);
      return `
        <article class="card" onclick="GestMedApp.openMed(${med.id})">
          <div class="top">
            <div>
              <div class="drug">${escapeHtml(med.principio_ativo)}${
        derivativeFlag ? ' <span class="derivative-tag">forma derivada</span>' : ""
      }</div>
              <div class="class">${escapeHtml(med.classe_farmacologica)}</div>
            </div>
            <span class="badge ${slug}">${escapeHtml(RISK_LABELS[slug])}</span>
          </div>
          ${med.resumo_alerta ? `<div class="summary">${escapeHtml(med.resumo_alerta)}</div>` : ""}
        </article>
      `;
    }

    let html = "";

    if (matches.length === 0) {
      html += '<div class="empty">Nenhum medicamento classificado como preferencial ou permitido foi encontrado para essa categoria na base atual.</div>';
    } else {
      html += matches.map(renderCard).join("");
    }

    if (cautelaMatches.length > 0) {
      html += `
        <div class="category-caution-divider">
          ⚠ Outras opções — exigem avaliação médica individual
        </div>
      `;
      html += cautelaMatches.map(renderCard).join("");
    }

    elCategoryCards.innerHTML = html;

    elCategoryModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCategoryModal() {
    elCategoryModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function fecharCategoryModalAoClicarFora(event) {
    if (event.target === elCategoryModal) closeCategoryModal();
  }

  // ==========================================================
  // PAINEL DE EXAMES — PRÉ-NATAL DE RISCO HABITUAL
  // ==========================================================
  const elExamesModal = document.getElementById("examesModal");

  function openExamesModule() {
    if (!elExamesModal) return;
    elExamesModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeExamesModule() {
    if (!elExamesModal) return;
    elExamesModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function fecharExamesModalAoClicarFora(event) {
    if (event.target === elExamesModal) closeExamesModule();
  }

  // ==========================================================
  // PRESCRIÇÕES POR TRIMESTRE — DOSE E POSOLOGIA
  // ==========================================================
  const elPrescricoesModal = document.getElementById("prescricoesModal");

  function prescricaoItemHtml(item) {
    return `
      <div class="prescricao-item">
        <div class="prescricao-nome">${escapeHtml(item.nome)}</div>
        <div class="prescricao-indicacao">${escapeHtml(item.indicacao || item.periodo || "")}</div>
        <div class="prescricao-dose-row">
          <span class="prescricao-badge dose">${escapeHtml(item.dose)}</span>
          <span class="prescricao-badge via">${escapeHtml(item.via)}</span>
        </div>
        <div class="prescricao-posologia"><strong>Posologia:</strong> ${escapeHtml(item.posologia)}</div>
      </div>
    `;
  }

  function renderRotinaObrigatoria() {
    const el = document.getElementById("rotinaObrigatoriaItens");
    if (!el) return;
    el.innerHTML = ROTINA_OBRIGATORIA.map(prescricaoItemHtml).join("");
  }

  function renderPrescricoesTrimestres() {
    const el = document.getElementById("prescricoesTrimestresContainer");
    if (!el) return;
    let html = "";
    [1, 2, 3].forEach(function (num) {
      const dados = PRESCRICOES_POR_TRIMESTRE[num];
      if (!dados) return;
      html += `<div class="prescricoes-trimestre-header t${num}"><span>${num === 1 ? "1️⃣" : num === 2 ? "2️⃣" : "3️⃣"} ${escapeHtml(dados.titulo)}</span></div>`;
      html += dados.itens.map(prescricaoItemHtml).join("");
    });
    el.innerHTML = html;
  }

  function openPrescricoesModule() {
    if (!elPrescricoesModal) return;
    renderRotinaObrigatoria();
    renderPrescricoesTrimestres();
    elPrescricoesModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closePrescricoesModule() {
    if (!elPrescricoesModal) return;
    elPrescricoesModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function fecharPrescricoesModalAoClicarFora(event) {
    if (event.target === elPrescricoesModal) closePrescricoesModule();
  }

  function prescricoesTrimestreCardHtml(weeks) {
    if (weeks < 0 || weeks > 42) return "";
    const num = trimesterNumberFromWeeks(weeks);
    const dados = PRESCRICOES_POR_TRIMESTRE[num];
    if (!dados) return "";

    // Versão condensada: só nome + dose, sem posologia completa (o card
    // dentro do resultado da calculadora é resumido; o painel completo,
    // aberto pelo botão da tela inicial, tem todos os detalhes).
    const itensHtml = dados.itens
      .slice(0, 4)
      .map(
        (item) =>
          `<span>${escapeHtml(item.nome)} <strong>${escapeHtml(item.dose)}</strong></span>`
      )
      .join("");

    return `
      <div class="ga-prescricoes-inline-card">
        <div class="ga-prescricoes-inline-title">💊 Prescrições habituais deste trimestre</div>
        <div class="ga-prescricoes-inline-sub">${escapeHtml(dados.titulo)} — mais ácido fólico/sulfato ferroso da rotina obrigatória</div>
        <div class="ga-exames-inline-lista">${itensHtml}</div>
        <div class="ga-exames-inline-hint">Ver o painel completo de prescrições para posologia detalhada de cada item.</div>
      </div>
    `;
  }

  // ==========================================================
  // CRESCIMENTO DO BEBÊ — GUIA SEMANA A SEMANA (renderizado dentro do
  // resultado da calculadora de idade gestacional, não é mais um modal à parte)
  // ==========================================================
  const CRESCIMENTO_MIN_SEMANA = 4;
  const CRESCIMENTO_MAX_SEMANA = 42;
  let crescimentoSemanaAtual = 20;

  function renderCrescimentoWeekTabs() {
    const el = document.getElementById("crescimentoWeekTabs");
    if (!el) return;
    let html = "";
    for (let w = CRESCIMENTO_MIN_SEMANA; w <= CRESCIMENTO_MAX_SEMANA; w++) {
      html += `<button class="crescimento-week-tab${
        w === crescimentoSemanaAtual ? " active" : ""
      }" onclick="GestMedApp.crescimentoIrPara(${w})">Semana ${w}</button>`;
    }
    el.innerHTML = html;
  }

  function scrollCrescimentoTabIntoView() {
    const el = document.getElementById("crescimentoWeekTabs");
    if (!el) return;
    const activeBtn = el.querySelector(".crescimento-week-tab.active");
    if (activeBtn && typeof activeBtn.scrollIntoView === "function") {
      try {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } catch (e) {
        /* navegadores muito antigos podem não suportar as opções; ignora silenciosamente */
      }
    }
  }

  function renderCrescimentoContent() {
    const el = document.getElementById("crescimentoContent");
    if (!el) return;
    const dados = CRESCIMENTO_SEMANAS[String(crescimentoSemanaAtual)];
    if (!dados) return;

    el.innerHTML = `
      <div class="crescimento-hero">
        <div class="crescimento-hero-week">Semana ${crescimentoSemanaAtual} de gestação</div>
        <div class="crescimento-hero-comparacao">📏 Do tamanho de ${escapeHtml(dados.comparacao)}</div>
        <div class="crescimento-hero-medidas">
          <div class="crescimento-hero-medida">
            <div class="crescimento-hero-medida-label">Comprimento</div>
            <div class="crescimento-hero-medida-valor">${escapeHtml(dados.comprimento)}</div>
          </div>
          <div class="crescimento-hero-medida">
            <div class="crescimento-hero-medida-label">Peso</div>
            <div class="crescimento-hero-medida-valor">${escapeHtml(dados.peso)}</div>
          </div>
        </div>
      </div>
      <div class="crescimento-section">
        <div class="crescimento-section-title">👶 Desenvolvimento do bebê</div>
        <div class="crescimento-section-text">${escapeHtml(dados.desenvolvimento)}</div>
      </div>
      <div class="crescimento-section">
        <div class="crescimento-section-title">🤰 O que acontece com você</div>
        <div class="crescimento-section-text">${escapeHtml(dados.materna)}</div>
      </div>
    `;

    document.getElementById("crescimentoPrevBtn").disabled = crescimentoSemanaAtual <= CRESCIMENTO_MIN_SEMANA;
    document.getElementById("crescimentoNextBtn").disabled = crescimentoSemanaAtual >= CRESCIMENTO_MAX_SEMANA;
  }

  function crescimentoIrPara(semana) {
    if (semana < CRESCIMENTO_MIN_SEMANA || semana > CRESCIMENTO_MAX_SEMANA) return;
    crescimentoSemanaAtual = semana;
    renderCrescimentoWeekTabs();
    renderCrescimentoContent();
    scrollCrescimentoTabIntoView();
  }

  function crescimentoNav(delta) {
    crescimentoIrPara(crescimentoSemanaAtual + delta);
  }

  // ==========================================================
  // GANHO DE PESO GESTACIONAL (módulo próprio, botão na tela inicial)
  // ==========================================================
  const elGanhoPesoModal = document.getElementById("ganhoPesoModal");

  function openGanhoPesoModule() {
    if (!elGanhoPesoModal) return;
    // Reaproveita peso/altura já preenchidos na calculadora de IG, se houver.
    if (gaImcPesoVal !== null) {
      document.getElementById("pesoPreGestacional").value = gaImcPesoVal;
    }
    if (gaImcAlturaVal !== null) {
      document.getElementById("pesoAltura").value = gaImcAlturaVal;
    }
    elGanhoPesoModal.classList.add("open");
    document.body.style.overflow = "hidden";
    calcGanhoPeso();
  }

  function closeGanhoPesoModule() {
    if (!elGanhoPesoModal) return;
    elGanhoPesoModal.classList.remove("open");
    document.body.style.overflow = "";
    clearGanhoPesoModule();
  }

  function fecharGanhoPesoModalAoClicarFora(event) {
    if (event.target === elGanhoPesoModal) closeGanhoPesoModule();
  }

  function clearGanhoPesoModule() {
    document.getElementById("pesoPreGestacional").value = "";
    document.getElementById("pesoAltura").value = "";
    document.getElementById("pesoAtual").value = "";
    const elResult = document.getElementById("ganhoPesoResult");
    if (elResult) {
      elResult.style.display = "none";
      elResult.innerHTML = "";
    }
    // Também limpa os campos compartilhados de peso/altura da calculadora de
    // IG, já que os dois módulos usam a mesma base de dados da paciente.
    gaImcPesoVal = null;
    gaImcAlturaVal = null;
    const elGaImcPeso = document.getElementById("gaImcPeso");
    const elGaImcAltura = document.getElementById("gaImcAltura");
    if (elGaImcPeso) elGaImcPeso.value = "";
    if (elGaImcAltura) elGaImcAltura.value = "";
  }

  function init() {
    if (RAW_DATA && elTotalBadge) {
      elTotalBadge.textContent = RAW_DATA.length.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elBaseBadge) {
      const baseCount = RAW_DATA.filter(function (m) {
        return !isDerivative(m);
      }).length;
      elBaseBadge.textContent = baseCount.toLocaleString("pt-BR");
    }
    if (RAW_DATA && elPendingBadge) {
      const pendingCount = RAW_DATA.filter(isPending).length;
      elPendingBadge.textContent = pendingCount.toLocaleString("pt-BR") + " pendentes de revisão";
    }

    elSearch.addEventListener("input", function () {
      render();
      renderSuggestions();
    });
    elSearch.addEventListener("focus", function () {
      if (elSearch.value.trim()) renderSuggestions();
    });
    document.addEventListener("click", function (event) {
      if (!elSearch.contains(event.target) && !elSuggestions.contains(event.target)) {
        elSuggestions.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal();
        closeCategoryModal();
        elSuggestions.classList.remove("open");
      }
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", initSafe);
  // Alguns visualizadores/sandboxes (previews de arquivo, iframes) podem injetar
  // ou executar este script depois que o DOMContentLoaded já disparou. Nesse caso,
  // o listener acima nunca dispararia e o app pareceria "travado" sem erro nenhum.
  // Por segurança, também rodamos imediatamente se o documento já estiver pronto.
  if (document.readyState === "interactive" || document.readyState === "complete") {
    initSafe();
  }

  function initSafe() {
    try {
      init();
    } catch (err) {
      showFatalError("Erro ao iniciar o aplicativo: " + (err && err.message ? err.message : err));
    }
  }

  function showFatalError(message) {
    try {
      var box = document.getElementById("fatalError");
      if (box) {
        box.style.display = "block";
        box.textContent = "⚠ " + message;
      } else if (elCards) {
        elCards.innerHTML =
          '<div class="empty" style="color:#b91c1c;">⚠ ' + escapeHtml(message) + "</div>";
      }
    } catch (e) {
      // último recurso: nada mais a fazer sem acesso ao DOM
    }
  }

  // Captura qualquer erro de execução não tratado (ex.: dados corrompidos, API
  // indisponível no ambiente) e mostra na tela em vez de deixar tudo travado
  // em branco sem explicação.
  window.addEventListener("error", function (event) {
    showFatalError(
      "Falha inesperada (" + (event.message || "erro desconhecido") + "). Recarregue a página ou tente abrir o arquivo em outro navegador."
    );
  });

  // Expõe funções necessárias para os atributos onclick no HTML gerado dinamicamente
  window.GestMedApp = {
    openMed: openMed,
    closeModal: closeModal,
    fecharModalAoClicarFora: fecharModalAoClicarFora,
    forceInit: initSafe,
    selectSuggestion: selectSuggestion,
    openGaCalculator: openGaCalculator,
    clos
```

## examesModal
Índice: 277716
```html
termediária</strong> — cobre o período entre refeições e o jejum noturno. É a insulina de referência, mais barata e mais acessível no Brasil (R5 da diretriz).</span>
      </div>

      <!-- BLOCO: DIVISÃO EM 2 APLICAÇÕES/DIA (SÓ NPH) -->
      <div class="dmg-scheme-block">
        <h4>🔹 NPH dividida em 2 aplicações/dia</h4>
        <table class="dmg-table" style="margin-top:8px;">
          <thead>
            <tr><th>Horário</th><th>Proporção</th><th>Dose</th></tr>
          </thead>
          <tbody id="dmgResultBody2"></tbody>
        </table>
        <div class="dmg-info-box" style="margin-top:10px;">
          <strong>Como se chega nisso (didático):</strong> divisão clássica de NPH em 2 aplicações — 2/3 da
          dose total pela manhã (em jejum) + 1/3 à noite (ao deitar). Fonte: TelessaúdeRS-UFRGS; convenção
          padrão de fracionamento de NPH em 2 aplicações diárias.
        </div>
      </div>

      <!-- BLOCO: DIVISÃO EM 3 APLICAÇÕES/DIA (SÓ NPH) -->
      <div class="dmg-scheme-block">
        <h4>🔹 NPH dividida em 3 aplicações/dia</h4>
        <table class="dmg-table" style="margin-top:8px;">
          <thead>
            <tr><th>Horário</th><th>Proporção</th><th>Dose</th></tr>
          </thead>
          <tbody id="dmgResultBody3"></tbody>
        </table>
        <div class="dmg-info-box" style="margin-top:10px;">
          <strong>Como se chega nisso (didático):</strong> NPH fracionada em 3 partes iguais — café da manhã,
          almoço e ao deitar. Fonte: Hospital Universitário de Brasília — Aspectos práticos da insulinoterapia
          nos diabetes gestacional e pré-gestacional (Revista Brasília de Clínica).
        </div>
      </div>

      <p style="font-size:10.5px; color:#94a3b8; margin:4px 0 0;">
        Doses arredondadas para a unidade inteira (UI) mais próxima — seringas e canetas de insulina não
        medem frações de unidade. Por isso, a soma das doses pode diferir em 1 UI da dose total acima — isso
        é esperado e não é erro de cálculo.
      </p>

      <div class="dmg-info-box" style="margin-top:10px;">
        <strong>Isso é um ponto de partida de referência.</strong> Na prática, o ajuste da dose e a
        necessidade de complementar o tratamento são sempre definidos pela equipe assistente, conforme os
        valores de glicemia capilar da própria paciente.
      </div>
    </div>
  </div>

  <!-- ===================== MODAL: PAINEL DE EXAMES PRÉ-NATAL ===================== -->
  <div class="modal" id="examesModal" onclick="GestMedApp.fecharExamesModalAoClicarFora(event)">
    <div class="sheet">
      <div class="handle"></div>
      <div class="sheet-nav">
        <button class="back-btn" onclick="GestMedApp.closeExamesModule()">← Voltar</button>
        <button class="close" onclick="GestMedApp.closeExamesModule()">×</button>
      </div>
      <h2 style="margin:4px 0 4px;">📋 Painel de Exames — Pré-natal de risco habitual</h2>
      <div class="category-subtitle">Exames organizados por janela gestacional, com indicação do período ideal, prazo máximo e situações em que devem ser repetidos.</div>

      <div class="exames-nota">
        <strong>Regra principal:</strong> o painel inicial deve ser solicitado na <strong>primeira consulta</strong>,
        idealmente até <strong>12 semanas</strong>. Se o pré-natal começar depois, não se deve esperar o próximo
        trimestre: solicitar os exames iniciais imediatamente. As janelas abaixo orientam o melhor momento,
        mas não substituem avaliação clínica, epidemiológica e protocolo municipal.
      </div>

      <div class="exames-resumo-box">
        <div class="exames-resumo-titulo">🗂️ Resumo rápido — janelas principais</div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t1">1º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel inicial: 1ª consulta, preferencialmente até 12s</span>
            <span>USG 1º trimestre: 11s0d–13s6d</span>
            <span>Malária na Amazônia: testar no pré-natal</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t2">2º TRI</span>
          <div class="exames-resumo-lista">
            <span>USG morfológica: 18–24s; ideal 20s0d–23s6d</span>
            <span>TOTG 75 g: 24–28s</span>
            <span>Toxoplasmose: repetir bimestralmente e no parto se suscetível</span>
          </div>
        </div>
        <div class="exames-resumo-linha">
          <span class="exames-resumo-tag t3">3º TRI</span>
          <div class="exames-resumo-lista">
            <span>Painel de repetição: 28–30s</span>
            <span>EGB: 35–37s, conforme rotina municipal</span>
            <span>HIV e sífilis: repetir também na admissão para parto</span>
          </div>
        </div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>1️⃣ 1º trimestre</span>
        <span class="exames-trimestre-sub">— 0 a 13 semanas e 6 dias</span>
      </div>

      <div class="exames-nota">
        <strong>Janela do painel inicial:</strong> primeira consulta, preferencialmente até 12s0d. Se a gestante
        chegar com 14 semanas ou mais sem exames, solicitar este painel no mesmo dia.
      </div>

      <div class="exame-item">
        <span class="exame-nome">Hemograma completo</span><span class="exame-quando">1ª consulta · até 12s ideal</span>
        <div class="exame-desc">Rastreia anemia e alterações hematológicas. Repetir entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Tipagem ABO + fator Rh</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Se Rh negativo, solicitar Coombs indireto na mesma coleta.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Coombs indireto</span><span class="exame-quando">1ª consulta se Rh negativo</span>
        <div class="exame-desc">Se negativo e parceiro Rh positivo ou desconhecido, repetir conforme protocolo — a Linha de Cuidado do MS orienta intervalos de 4 semanas. Se positivo, encaminhar ao alto risco para titulação e vigilância fetal. A imunoglobulina anti-D é profilaxia, não exame.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Glicemia de jejum</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Rastreio inicial de hiperglicemia. Se &lt;92 mg/dL e sem diagnóstico prévio, realizar TOTG 75 g entre 24 e 28 semanas. Se o pré-natal iniciar após 28 semanas sem rastreio, realizar a investigação imediatamente.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">EAS/urina tipo I</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Avalia proteinúria, hematúria, glicose, cetonas e sinais indiretos de infecção. Repetir no início do 3º trimestre, entre 28 e 30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Urocultura com antibiograma</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Rastreia bacteriúria assintomática. Se positiva, tratar e fazer cultura de controle cerca de 7 dias após o término. Se a primeira for negativa, repetir apenas conforme sintomas, história de ITU recorrente, nefropatia ou rotina local; não confundir com o EAS de 28–30 semanas.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Sífilis — teste rápido e/ou VDRL</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir entre 28 e 30 semanas e novamente na admissão para parto. Repetir também diante de exposição de risco e em abortamento.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HIV — teste rápido/sorologia</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Repetir no início do 3º trimestre, por volta de 28 semanas, e na admissão para parto, independentemente de testagem anterior.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite B — HBsAg ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Se não realizado durante o pré-natal, repetir na admissão para parto; também repetir diante de nova exposição de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Hepatite C — anti-HCV ou teste rápido</span><span class="exame-quando">1ª consulta · até 13s6d</span>
        <div class="exame-desc">Resultado reagente exige confirmação com HCV-RNA. Repetir apenas se exposição de risco ou protocolo específico.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Toxoplasmose — IgG e IgM</span><span class="exame-quando">1ª consulta</span>
        <div class="exame-desc">Se IgG e IgM não reagentes, a gestante é suscetível: reforçar prevenção e repetir as sorologias bimestralmente e no momento do parto, conforme a Linha de Cuidado do MS e o fluxo local. IgM reagente exige investigação imediata.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">HTLV-1/2 — triagem</span><span class="exame-quando">1º trimestre · preferir 1ª consulta</span>
        <div class="exame-desc">Recomendação nacional recente: iniciar testagem quando os testes de triagem e confirmação estiverem disponíveis no território. Resultado reagente exige confirmação e planejamento de prevenção da transmissão vertical.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#0f766e,#059669);color:#fff;">
        <span>🌎 Exames regionais ou epidemiológicos</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">Malária — gota espessa ou teste rápido</span><span class="exame-quando">Região Amazônica · pré-natal</span>
        <div class="exame-desc"><strong>Importante para Rondônia:</strong> o Ministério da Saúde orienta testagem das gestantes da Região Amazônica, mesmo sem sintomas. Repetir imediatamente diante de febre, calafrios, cefaleia ou conforme vigilância local.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Doença de Chagas — sorologia</span><span class="exame-quando">1ª consulta · uma vez</span>
        <div class="exame-desc">Priorizar conforme perfil epidemiológico: residência anterior em área endêmica, moradia rural de risco, transfusão antiga, mãe/familiar com Chagas ou protocolo territorial. O diagnóstico materno permite investigar o recém-nascido.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Eletroforese de hemoglobina</span><span class="exame-quando">1ª consulta · se indicada</span>
        <div class="exame-desc">Solicitar quando não houver resultado prévio e existir história pessoal/familiar, anemia sugestiva, origem populacional de risco ou previsão no protocolo local. Identifica doença falciforme e talassemias.</div>
      </div>

      <div class="exames-trimestre-header" style="background:linear-gradient(135deg,#475569,#64748b);color:#fff;">
        <span>🔎 Exames seletivos — não são rotina universal</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">TSH ± T4 livre</span><span class="exame-quando">qualquer IG · somente se indicado</span>
        <div class="exame-desc">A triagem universal de gestantes assintomáticas não é recomendada na Linha de Cuidado do MS. Solicitar em doença tireoidiana prévia, sintomas, bócio, autoimunidade, uso de medicações ou outros fatores de risco.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rastreamento do colo do útero</span><span class="exame-quando">durante o pré-natal se estiver devido</span>
        <div class="exame-desc">Não é exame anual obrigatório. Seguir o programa nacional: DNA-HPV onde implantado ou citologia onde ainda utilizada, conforme idade e periodicidade do rastreamento. A gestação não impede a coleta quando indicada.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Rubéola IgG, parasitológico de fezes e outras sorologias</span><span class="exame-quando">somente por indicação/local</span>
        <div class="exame-desc">Solicitar conforme histórico vacinal, sintomas, exposição, endemicidade ou protocolo municipal. Não incluir automaticamente em todas as gestantes.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">Creatinina, TGO/TGP, DHL, ácido úrico, proteinúria quantitativa, coagulograma e ferritina</span><span class="exame-quando">somente se risco ou alteração clínica</span>
        <div class="exame-desc">Não pertencem ao painel universal de baixo risco. São indicados em hipertensão, suspeita de pré-eclâmpsia, doença renal/hepática, anemia não esclarecida, sangramento ou outras intercorrências.</div>
      </div>

      <div class="exames-trimestre-header t1">
        <span>🩻 Imagem no 1º trimestre</span>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG transvaginal precoce</span><span class="exame-quando">6–10 semanas · se indicada</span>
        <div class="exame-desc">Útil para dor, sangramento, dúvida de idade gestacional, localização/viabilidade ou suspeita de gestação múltipla. Não é obrigatório realizar duas ultrassonografias transvaginais de rotina.</div>
      </div>
      <div class="exame-item">
        <span class="exame-nome">USG do 1º trimestre / avaliação morfológica</span><span class="exame-quando">11s0d–13s6d</span>
        <div class="exame-desc">Janela fechada: realizar até 13s6d. Permite datação, número de fetos, corionicidade e avaliação morfológica inicial. Doppler e rastreamentos adicionais dependem de disponibilidade e protocolo.</div>
      </div>

      <div class="exames-trimestre-header t2">
        <span>2️⃣ 2º trimestre</span>
        <span class="exames-trimestre-sub">— 14 semanas a 27 semanas e 6 dias</span>
      </div>

      <div class="exame-item">
        <span class="exame-nome">USG morfológica do 2º trimestre</span><span class="exame-quando">18s0d–24s0d · ideal 20s0d–23s6d</span>
        <div class="exame-desc">Avalia anatomia fetal, placenta e líquido. Medida do colo por via transvaginal e Doppler devem seguir indicação, disponibilidade e protocolo; Doppler não é obrigatório
```
