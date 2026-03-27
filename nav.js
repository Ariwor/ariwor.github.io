(function () {
  'use strict';

  // R is empty string at root, '../' one level deep — works with both file:// and a server
  const R = (typeof PAGE_ID !== 'undefined' && PAGE_ID !== 'home') ? '../' : '';

  const NAV_ITEMS = [
    { id: 'home',     label: 'Home',     href: R + 'index.html' },
    { id: 'projects', label: 'Projects', href: R + 'projects/index.html' },
    { id: 'awards',   label: 'Awards',   href: R + 'awards/index.html' },
    { id: 'publications', label: 'Publications', href: R + 'publications/index.html' },
    { id: 'talks',    label: 'Talks',    href: R + 'talks/index.html' },
    { id: 'mentorship', label: 'Mentorship', href: R + 'mentorship/index.html' },
    { id: 'other',    label: 'Other',    href: R + 'other/index.html' },
    { id: 'cv',       label: 'CV\u2197', href: R + 'assets/A.Arampatzis_CV.pdf', external: true },
  ];

  const currentId = (typeof PAGE_ID !== 'undefined') ? PAGE_ID : '';

  const navLinksHTML = NAV_ITEMS.map(item => {
    const isActive = item.id === currentId;
    const external = item.external ? ' target="_blank" rel="noopener"' : '';
    const cls = isActive ? ' class="active"' : '';
    return `<li><a href="${item.href}"${external}${cls}>${item.label}</a></li>`;
  }).join('');

  const headerHTML = `
<header id="site-header">
  <div class="header-inner">
    <div class="status-bar">
      <span id="live-date"></span>
      <span class="status-sep">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>
      <span>Zurich, Switzerland</span>
      <span id="weather-sep" class="status-sep"></span>
      <span id="weather"></span>
    </div>
    <nav>
      <ul class="nav-links">${navLinksHTML}</ul>
      <div class="nav-actions">
        <button class="search-btn" id="search-btn" aria-label="Quick search (Ctrl+K)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span class="search-kbd">&#8984;K</span>
        </button>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
      </div>
    </nav>
  </div>
</header>`;

  const footerHTML = `
<footer id="site-footer">
  <p>&copy; 2026 Asterios Arampatzis</p>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Live date
  const d = new Date();
  document.getElementById('live-date').textContent =
    d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  // Live weather via Open-Meteo (Zurich, no API key)
  fetch('https://api.open-meteo.com/v1/forecast?latitude=47.3769&longitude=8.5417&current=temperature_2m,weathercode')
    .then(r => r.json())
    .then(data => {
      const c = Math.round(data.current.temperature_2m);
      document.getElementById('weather-sep').innerHTML = '&nbsp;&nbsp;&middot;&nbsp;&nbsp;';
      document.getElementById('weather').textContent = c + '\u00b0C';
    })
    .catch(() => {});

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Wire search button → search.js openSearch()
  document.getElementById('search-btn').addEventListener('click', () => {
    if (typeof openSearch === 'function') openSearch();
  });

})();
