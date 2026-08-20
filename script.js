document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      hamburger.textContent = isOpen ? '✕ CHIUDI' : '≡ MENU';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '≡ MENU';
      });
    });
  }

  /* ---- Dropdown "Servizi" apribile al tocco su mobile ---- */
  const dropdown = document.querySelector('.nav-links .dropdown');
  if (dropdown) {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 780) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  }

  /* ---- Evidenzia la voce di menu della pagina corrente ---- */
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[href]').forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---- Timecode live in stile telecamera nell'hero ---- */
  const timecodeEls = document.querySelectorAll('[data-timecode]');
  if (timecodeEls.length) {
    const start = performance.now();
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const elapsed = performance.now() - start;
      const totalFrames = Math.floor(elapsed / (1000 / 24)); // 24 fps
      const frames = totalFrames % 24;
      const totalSeconds = Math.floor(totalFrames / 24);
      const seconds = totalSeconds % 60;
      const minutes = Math.floor(totalSeconds / 60) % 60;
      const hours = Math.floor(totalSeconds / 3600);
      const value = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
      timecodeEls.forEach(el => { el.textContent = value; });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---- Header: aggiunge un filo più definito allo scroll ---- */
  const header = document.querySelector('header');
  const onScroll = () => {
    if (!header) return;
    header.style.borderBottomColor = window.scrollY > 30 ? 'rgba(230,35,26,0.35)' : '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Animazione di comparsa allo scroll ---- */
  const revealTargets = document.querySelectorAll(
    '.slate-card, .take-card, .phase-card, .pod-card, .spec-item, .feature-item, .feature-box, .video-card, .reel-card, .video-card-small, .monitor'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i % 4 * 60);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  }

});
