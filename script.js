  const PHASES = [
    { id:'infancia', label:'Infância', range:'0 a 9 anos', color:'var(--teal)', hex:'#34D8C4', icon:'baby',
      desc:'A fase com mais vacinas do calendário — é quando o corpo constrói suas primeiras defesas.' },
    { id:'adolescencia', label:'Adolescência', range:'10 a 19 anos', color:'var(--violet)', hex:'#8B6BFF', icon:'user',
      desc:'Hora de reforçar imunidades da infância e incluir proteções específicas dessa fase.' },
    { id:'adulta', label:'Fase adulta', range:'20 a 59 anos', color:'var(--coral)', hex:'#FF6F8F', icon:'briefcase',
      desc:'Momento de conferir a caderneta: completar esquemas antigos e manter os reforços em dia.' },
    { id:'idoso', label:'Pessoa idosa', range:'60 anos ou mais', color:'var(--amber)', hex:'#FFC15E', icon:'sun',
      desc:'O sistema imunológico fica mais vulnerável com a idade — por isso, algumas vacinas ganham prioridade.' },
  ];

  const VACCINES = {
    infancia: [
      { name:'BCG', age:'Ao nascer', icon:'shield', desc:'Protege contra as formas graves da tuberculose, como a meníngea. Aplicada na maternidade, deixa uma pequena cicatriz no braço.' },
      { name:'Hepatite B', age:'Ao nascer', icon:'droplet', desc:'Previne a infecção pelo vírus que pode evoluir para doença crônica do fígado. A primeira dose é dada logo após o nascimento.' },
      { name:'Pentavalente', age:'Doses seriadas', icon:'layers', desc:'Uma única vacina que protege contra difteria, tétano, coqueluche, Haemophilus influenzae b e hepatite B.' },
      { name:'Poliomielite', age:'Doses seriadas', icon:'footprints', desc:'Protege contra o poliovírus, causador da paralisia infantil — já eliminada do Brasil graças à vacinação em massa.' },
      { name:'Rotavírus', age:'Primeiros meses', icon:'baby', desc:'Reduz o risco das formas graves de diarreia e desidratação, principal causa de internação infantil por esse motivo.' },
      { name:'Pneumocócica', age:'Doses + reforço', icon:'activity', desc:'Protege contra o pneumococo, bactéria que causa pneumonia, meningite e otite grave em crianças pequenas.' },
      { name:'Meningocócica', age:'Doses + reforço', icon:'brain', desc:'Reduz o risco de meningite e outras infecções graves, doenças que evoluem rápido e exigem atenção imediata.' },
      { name:'Tríplice viral (SCR)', age:'A partir de 1 ano', icon:'sparkles', desc:'Protege contra sarampo, caxumba e rubéola — doenças altamente contagiosas que voltaram a circular em surtos recentes.' },
      { name:'Varicela', age:'Combinada à SCR', icon:'thermometer', desc:'Previne a catapora, que apesar de parecer leve pode causar complicações como infecções de pele e pneumonia.' },
    ],
    adolescencia: [
      { name:'HPV', age:'9 a 14 anos', icon:'shield-check', desc:'Protege contra os tipos de HPV mais associados ao câncer de colo do útero e a outros tumores. Indicada para meninas e meninos.' },
      { name:'Meningocócica ACWY', age:'Reforço', icon:'brain', desc:'Amplia a proteção contra meningite para os sorogrupos A, C, W e Y, reforçando a imunidade da infância.' },
      { name:'dT (difteria e tétano)', age:'Reforço a cada 10 anos', icon:'zap', desc:'Mantém a proteção contra difteria e tétano, doenças que ainda circulam e exigem reforços ao longo da vida.' },
    ],
    adulta: [
      { name:'Hepatite B', age:'Esquema incompleto', icon:'droplet', desc:'Indicada para quem não completou o esquema na infância ou adolescência. Nunca é tarde para se proteger.' },
      { name:'dT (difteria e tétano)', age:'Reforço a cada 10 anos', icon:'zap', desc:'O reforço contra difteria e tétano continua necessário, especialmente importante em caso de ferimentos.' },
      { name:'Febre amarela', age:'Dose única', icon:'bug', desc:'Protege contra a doença transmitida por mosquitos, recomendada para quem vive ou viaja para áreas de risco.' },
      { name:'Tríplice viral (SCR)', age:'Sem doses comprovadas', icon:'sparkles', desc:'Quem não tem comprovação de doses anteriores deve completar o esquema contra sarampo, caxumba e rubéola.' },
      { name:'Influenza', age:'Dose anual', icon:'wind', desc:'Reduz o risco de formas graves da gripe, indicada especialmente para gestantes e grupos de risco.' },
    ],
    idoso: [
      { name:'Influenza', age:'Dose anual', icon:'wind', desc:'Reduz complicações graves da gripe, que tendem a ser mais frequentes e sérias em pessoas idosas.' },
      { name:'Pneumocócica', age:'Esquema específico', icon:'activity', desc:'Protege contra o pneumococo, causa importante de pneumonia grave em pessoas idosas.' },
      { name:'Herpes-zóster', age:'A partir de 60 anos', icon:'flame', desc:'Reduz o risco de reativação do vírus da catapora em forma de "cobreiro", condição dolorosa comum nessa idade.' },
      { name:'dT (difteria e tétano)', age:'Reforço a cada 10 anos', icon:'zap', desc:'Os reforços contra difteria e tétano continuam necessários também na terceira idade.' },
    ],
  };

  // ===================================================================
  // FOTOS DAS FASES
  // Troque o caminho abaixo pelo arquivo da sua foto (mesmo nome que você
  // usou no repositório). Se o arquivo estiver na raiz do projeto, é só o
  // nome do arquivo; se estiver numa subpasta, inclua o caminho, ex:
  // 'fotos/infancia.jpg'.
  // ===================================================================
  const PHOTOS = {
    infancia:     { src: './fotos/infancia.jpg',     alt: 'Foto representando a fase da infância' },
    adolescencia: { src: './fotos/adolescencia.jpg', alt: 'Foto representando a fase da adolescência' },
    adulta:       { src: './fotos/adulta.jpg',       alt: 'Foto representando a fase adulta' },
    idoso:        { src: './fotos/idoso.png',       alt: 'Foto representando a fase da pessoa idosa' },
  };

  const photoImg = document.getElementById('hero-bg-img');

  photoImg.addEventListener('load', () => { photoImg.classList.add('loaded'); });
  photoImg.addEventListener('error', () => { photoImg.classList.remove('loaded'); });

  function renderFigure(id){
    const photo = PHOTOS[id];
    photoImg.classList.remove('loaded');
    photoImg.alt = photo.alt;
    photoImg.src = photo.src;
  }

  let active = 'infancia';

  function setPhaseColor(hex){
    document.documentElement.style.setProperty('--phase', hex);
  }

  function renderTimeline(){
    const row = document.getElementById('timeline-row');
    row.innerHTML = PHASES.map(p => `
      <button class="phase-btn" role="tab" data-phase="${p.id}" style="--phase-btn-color:${p.hex}" aria-selected="${p.id === active}">
        <span class="node"><i data-lucide="${p.icon}" width="16" height="16"></i></span>
        <span class="p-name">${p.label}</span>
        <span class="p-age mono">${p.range}</span>
      </button>
    `).join('');
    row.querySelectorAll('.phase-btn').forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.phase)));
  }

  function renderPassport(phase){
    document.getElementById('pp-icon').innerHTML = `<i data-lucide="${phase.icon}" width="20" height="20"></i>`;
    document.getElementById('pp-label').textContent = phase.label;
    document.getElementById('pp-range').textContent = phase.range;
    document.getElementById('pp-count').textContent = `${VACCINES[phase.id].length} vacinas`;
    const bar = document.getElementById('pp-barcode');
    bar.innerHTML = Array.from({length: 22}, () => {
      const h = 8 + Math.round(Math.random() * 14);
      return `<i style="height:${h}px"></i>`;
    }).join('');
  }

  function renderCards(phase){
    const grid = document.getElementById('card-grid');
    grid.innerHTML = VACCINES[phase.id].map((v, i) => `
      <article class="card" style="transition-delay:${i * 40}ms">
        <div class="card-head" data-toggle>
          <div class="card-icon"><i data-lucide="${v.icon}" width="19" height="19"></i></div>
          <div class="card-titles">
            <h3>${v.name}</h3>
            <div class="age mono">${v.age}</div>
          </div>
          <div class="chev"><i data-lucide="chevron-down" width="16" height="16"></i></div>
        </div>
        <div class="card-body">
          <div class="card-body-inner"><p>${v.desc}</p></div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.card').forEach(card => {
      const head = card.querySelector('[data-toggle]');
      head.addEventListener('click', () => {
        const open = card.getAttribute('aria-expanded') === 'true';
        card.setAttribute('aria-expanded', String(!open));
      });
    });

    observeCards();
  }

  function activate(id){
    active = id;
    const phase = PHASES.find(p => p.id === id);
    setPhaseColor(phase.hex);
    document.getElementById('phase-title').textContent = phase.label;
    document.getElementById('phase-desc').textContent = phase.desc;
    document.getElementById('phase-chip').textContent = `${VACCINES[id].length} vacinas nesta fase`;
    renderTimeline();
    renderPassport(phase);
    renderFigure(phase.id);
    renderCards(phase);
    if(window.lucide){ lucide.createIcons(); }
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold:.2 });
  function observeCards(){
    document.querySelectorAll('.card:not(.in-view)').forEach(c => io.observe(c));
  }

  /* Subtle tilt on the passport card, disabled for reduced motion */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const passport = document.getElementById('passport');
  if(!reduceMotion && passport){
    const heroEl = document.querySelector('.hero');
    heroEl.addEventListener('mousemove', (e) => {
      const r = passport.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      passport.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    heroEl.addEventListener('mouseleave', () => { passport.style.transform = 'rotateY(0) rotateX(0)'; });
  }

  activate('infancia');
  if(window.lucide){ lucide.createIcons(); }

  // ===================================================================
  // QUESTIONÁRIO DE RECOMENDAÇÃO DE VACINAS
  // ===================================================================
  const AGE_GROUPS = [
    {
      id:'bebes', label:'Recém-nascidos e lactentes', range:'0 a 2 anos', min:0, max:2, color:'#34D8C4',
      vaccines:['BCG','Hepatite A','Hepatite B','Pentavalente','Hexavalente','Poliomielite (VIP)','Poliomielite (VOP)','Rotavírus','Pneumocócica 10','Pneumocócica 13','Pneumocócica 15','Meningocócica B','Meningocócica C','Meningocócica ACWY','Tríplice viral (SCR)','Tetraviral','Varicela','Influenza','Febre amarela','COVID-19']
    },
    {
      id:'infancia2', label:'Infância', range:'3 a 10 anos', min:3, max:10, color:'#34D8C4',
      vaccines:['Influenza','COVID-19','Varicela','Tríplice viral (SCR)','dT (difteria e tétano)','DTP (difteria, tétano e coqueluche)','Febre amarela','Hepatite A','Hepatite B','Pneumocócica','Meningocócica']
    },
    {
      id:'adolescencia2', label:'Adolescência', range:'11 a 19 anos', min:11, max:19, color:'#8B6BFF',
      vaccines:['HPV','Meningocócica ACWY','Meningocócica B','dT','dTpa','Hepatite A','Hepatite B','Tríplice viral (SCR)','Varicela','Influenza','Febre amarela','COVID-19','Dengue']
    },
    {
      id:'adultos2', label:'Adultos', range:'20 a 59 anos', min:20, max:59, color:'#FF6F8F',
      vaccines:['dT','dTpa','Hepatite A','Hepatite B','Influenza','COVID-19','Febre amarela','Tríplice viral (SCR)','Varicela','Dengue','HPV','Pneumocócica','Herpes-zóster','Meningocócica']
    },
    {
      id:'idosos2', label:'Idosos', range:'60 anos ou mais', min:60, max:130, color:'#FFC15E',
      vaccines:['Influenza','COVID-19','Pneumocócica','Herpes-zóster','dT','dTpa','Hepatite A','Hepatite B','Febre amarela','Tríplice viral (SCR)','Varicela','Meningocócica','Dengue']
    },
  ];
  const PREGNANT_VACCINES = ['dT','dTpa','Hepatite B','Influenza','COVID-19'];

  const VACCINE_INFO = {
    'BCG': 'Protege contra as formas graves da tuberculose, como a meníngea.',
    'Hepatite A': 'Previne a infecção pelo vírus da hepatite A, transmitido principalmente por água e alimentos contaminados.',
    'Hepatite B': 'Previne a infecção pelo vírus da hepatite B, que pode evoluir para doença crônica do fígado.',
    'Pentavalente': 'Protege ao mesmo tempo contra difteria, tétano, coqueluche, Haemophilus influenzae b e hepatite B.',
    'Hexavalente': 'Soma a proteção da pentavalente à da poliomielite injetável, em uma única aplicação.',
    'Poliomielite (VIP)': 'Vacina injetável contra a poliomielite, causadora da paralisia infantil.',
    'Poliomielite (VOP)': 'Vacina oral (gotinha) contra a poliomielite, usada em doses de reforço.',
    'Rotavírus': 'Reduz o risco das formas graves de diarreia e desidratação em bebês.',
    'Pneumocócica 10': 'Protege contra 10 sorotipos do pneumococo, bactéria que causa pneumonia, meningite e otite.',
    'Pneumocócica 13': 'Versão com proteção ampliada para 13 sorotipos do pneumococo.',
    'Pneumocócica 15': 'Versão mais recente, com proteção ampliada para 15 sorotipos do pneumococo.',
    'Meningocócica B': 'Protege contra a meningite causada pelo meningococo do sorogrupo B.',
    'Meningocócica C': 'Protege contra a meningite causada pelo meningococo do sorogrupo C.',
    'Meningocócica ACWY': 'Amplia a proteção contra meningite para os sorogrupos A, C, W e Y.',
    'Meningocócica': 'Reduz o risco de meningite e outras infecções graves causadas pelo meningococo.',
    'Tríplice viral (SCR)': 'Protege contra sarampo, caxumba e rubéola.',
    'Tetraviral': 'Reforço da tríplice viral que soma proteção contra a varicela em uma única aplicação.',
    'Varicela': 'Previne a catapora, que pode causar complicações como infecções de pele e pneumonia.',
    'Influenza': 'Vacina anual contra a gripe, reduz o risco de formas graves da doença.',
    'Febre amarela': 'Protege contra a febre amarela, doença grave transmitida por mosquitos.',
    'COVID-19': 'Reduz o risco de formas graves da COVID-19 e de complicações da doença.',
    'dT (difteria e tétano)': 'Protege contra difteria e tétano; reforço recomendado a cada 10 anos.',
    'DTP (difteria, tétano e coqueluche)': 'Protege contra difteria, tétano e coqueluche, usada como reforço na infância.',
    'dT': 'Protege contra difteria e tétano; reforço recomendado a cada 10 anos.',
    'dTpa': 'Reforço contra difteria, tétano e coqueluche, indicado também em gestantes para proteger o recém-nascido.',
    'Pneumocócica': 'Protege contra o pneumococo, bactéria que causa pneumonia, meningite e otite grave.',
    'HPV': 'Protege contra os tipos de HPV mais associados ao câncer de colo do útero e a outros tumores.',
    'Dengue': 'Reduz o risco de formas graves da dengue, indicada conforme critérios específicos de idade e histórico.',
    'Herpes-zóster': 'Reduz o risco de reativação do vírus da catapora em forma de "cobreiro", condição dolorosa comum a partir dos 50-60 anos.',
  };

  let quizGroup = null;
  let quizPregnant = 'nao';

  function findAgeGroup(age){
    return AGE_GROUPS.find(g => age >= g.min && age <= g.max) || null;
  }

  function getCandidateVaccines(){
    if(!quizGroup) return [];
    const set = new Set(quizGroup.vaccines);
    if(quizPregnant === 'sim'){ PREGNANT_VACCINES.forEach(v => set.add(v)); }
    return Array.from(set);
  }

  function goToQuizStep(step){
    document.querySelectorAll('.quiz-step').forEach(s => { s.hidden = s.dataset.step !== String(step); });
    document.querySelectorAll('.quiz-progress .dot').forEach(d => {
      const n = Number(d.dataset.step);
      d.classList.toggle('active', n === step);
      d.classList.toggle('done', n < step);
    });
  }

  function buildQuizChecklist(){
    const wrap = document.getElementById('quiz-checklist');
    const candidates = getCandidateVaccines();
    wrap.innerHTML = candidates.map((v, i) => `
      <label class="q-check">
        <input type="checkbox" value="${v}" id="qc-${i}">
        <span>${v}</span>
      </label>
    `).join('');
  }

  function renderQuizResult(list){
    const chip = document.getElementById('quiz-result-chip');
    const resultList = document.getElementById('quiz-result-list');
    chip.textContent = `${quizGroup.label} · ${quizGroup.range}`;
    if(list.length === 0){
      resultList.innerHTML = `
        <div class="quiz-empty">
          <div class="big">🎉</div>
          <p>Pelas suas respostas, sua caderneta parece estar em dia para a sua fase!</p>
        </div>`;
    } else {
      resultList.innerHTML = list.map(v => `
        <div class="q-result-item">
          <div class="q-result-top">
            <div class="ico"><i data-lucide="syringe" width="15" height="15"></i></div>
            <h4>${v}</h4>
          </div>
          <p>${VACCINE_INFO[v] || 'Consulte um profissional de saúde para saber mais sobre esta vacina.'}</p>
        </div>
      `).join('');
    }
    if(window.lucide){ lucide.createIcons(); }
  }

  document.querySelectorAll('.q-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.q-toggle-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      quizPregnant = btn.dataset.value;
    });
  });

  // Garante o limite de 3 dígitos no campo de idade (maxlength não é confiável em type="number")
  document.getElementById('quiz-age').addEventListener('input', (e) => {
    if(e.target.value.length > 3){ e.target.value = e.target.value.slice(0, 3); }
  });

  document.getElementById('quiz-next-1').addEventListener('click', () => {
    const ageInput = document.getElementById('quiz-age');
    const age = Number(ageInput.value);
    const errorEl = document.getElementById('quiz-age-error');
    if(ageInput.value === '' || isNaN(age) || age < 0 || age > 120){
      errorEl.classList.add('show');
      return;
    }
    errorEl.classList.remove('show');
    quizGroup = findAgeGroup(age);
    if(quizGroup){ document.getElementById('quiz').style.setProperty('--phase', quizGroup.color); }
    buildQuizChecklist();
    goToQuizStep(2);
  });

  document.getElementById('quiz-back-2').addEventListener('click', () => goToQuizStep(1));

  document.getElementById('quiz-next-2').addEventListener('click', () => {
    const taken = Array.from(document.querySelectorAll('#quiz-checklist input:checked')).map(i => i.value);
    const recommended = getCandidateVaccines().filter(v => !taken.includes(v));
    renderQuizResult(recommended);
    goToQuizStep(3);
  });

  document.getElementById('quiz-back-3').addEventListener('click', () => goToQuizStep(1));

  goToQuizStep(1);

  /* Localizar posto de saúde (UBS) mais próximo, via geolocalização do navegador */
  const findBtn = document.getElementById('find-ubs');
  const findBtnTop = document.getElementById('find-ubs-top');
  function goToUBS(btn){
    const mapsUrl = (query) => 'https://www.google.com/maps/search/' + encodeURIComponent(query);

    if(!('geolocation' in navigator)){
      window.location.href = mapsUrl('posto de saúde perto de mim');
      return;
    }

    if(btn){ btn.dataset.loading = 'true'; }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.location.href = mapsUrl(`posto de saúde perto de ${latitude},${longitude}`);
      },
      () => { window.location.href = mapsUrl('posto de saúde perto de mim'); },
      { timeout: 8000 }
    );
  }
  if(findBtn){ findBtn.addEventListener('click', () => goToUBS(findBtn)); }
  if(findBtnTop){ findBtnTop.addEventListener('click', (e) => { e.preventDefault(); goToUBS(findBtnTop); }); }
  const findBtnQuiz = document.getElementById('quiz-find-ubs');
  if(findBtnQuiz){ findBtnQuiz.addEventListener('click', () => goToUBS(findBtnQuiz)); }