 const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('.phase');
 
  function activate(phase){
    tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.phase === phase ? 'true' : 'false'));
    sections.forEach(s => s.classList.toggle('active', s.id === phase));
    const activeSection = document.getElementById(phase);
    if(activeSection){
      activeSection.querySelectorAll('.card').forEach(c => c.classList.remove('in-view'));
      requestAnimationFrame(() => observeCards(activeSection));
    }
  }
 
  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.phase)));
 
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.3 });
 
  function observeCards(section){
    section.querySelectorAll('.card').forEach((c, i) => {
      setTimeout(() => io.observe(c), i * 40);
    });
  }
 
  activate('infancia');
 
  // Localizar posto de saúde (UBS) mais próximo, via geolocalização do navegador
  const findBtn = document.getElementById('find-ubs');
  if(findBtn){
    findBtn.addEventListener('click', () => {
      const mapsUrl = (query) => 'https://www.google.com/maps/search/' + encodeURIComponent(query);
 
      if(!('geolocation' in navigator)){
        window.open(mapsUrl('posto de saúde perto de mim'), '_blank', 'noopener');
        return;
      }
 
      // Abre a aba já no clique (gesto do usuário), antes do await da geolocalização —
      // celulares bloqueiam window.open() se ele acontecer depois de uma resposta assíncrona.
      const mapsTab = window.open('', '_blank', 'noopener');
      if(mapsTab){ mapsTab.document.title = 'Localizando…'; }
 
      findBtn.dataset.loading = 'true';
      const originalText = findBtn.textContent;
      findBtn.textContent = 'Localizando…';
 
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = mapsUrl(`posto de saúde perto de ${latitude},${longitude}`);
          if(mapsTab && !mapsTab.closed){ mapsTab.location.href = url; }
          else { window.location.href = url; }
          findBtn.textContent = originalText;
          delete findBtn.dataset.loading;
        },
        () => {
          // permissão negada ou indisponível: cai para busca genérica por proximidade do navegador
          const url = mapsUrl('posto de saúde perto de mim');
          if(mapsTab && !mapsTab.closed){ mapsTab.location.href = url; }
          else { window.location.href = url; }
          findBtn.textContent = originalText;
          delete findBtn.dataset.loading;
        },
        { timeout: 8000 }
      );
    });
  }