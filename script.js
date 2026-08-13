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