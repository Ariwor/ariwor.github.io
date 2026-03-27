(function () {
  'use strict';

  const dialog = document.createElement('dialog');
  dialog.id = 'search-dialog';
  dialog.setAttribute('aria-label', 'Quick search');
  dialog.innerHTML = `
    <div class="search-inner">
      <div class="search-bar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search-input" placeholder="Search pages and projects\u2026" autocomplete="off" spellcheck="false" aria-label="Search">
        <kbd class="search-esc">Esc</kbd>
      </div>
      <ul id="search-results" role="listbox"></ul>
    </div>`;
  document.body.appendChild(dialog);

  const input  = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const KEYWORD_REDIRECTS = {
    'synthetic biology': '/projects/#synbio',
    igem: '/projects/#igem',
    'space biology': '/projects/#acubesat',
    'aerospace engineering': '/projects/#acubesat',
    cv: '/assets/A.Arampatzis_CV.pdf'
  };

  function openSearch() {
    dialog.showModal();
    input.value = '';
    input.focus();
    renderResults('');
  }
  window.openSearch = openSearch;

  function closeSearch() { dialog.close(); }

  dialog.addEventListener('click', e => { if (e.target === dialog) closeSearch(); });
  dialog.addEventListener('cancel', closeSearch);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      dialog.open ? closeSearch() : openSearch();
    }
  });

  function matches(entry, q) {
    if (!q.trim()) return true;
    const needle = q.toLowerCase();
    const haystack = (entry.label + ' ' + entry.category + ' ' + (entry.keywords || []).join(' ')).toLowerCase();
    return haystack.includes(needle);
  }

  function scoreEntry(entry, q) {
    const query = q.trim().toLowerCase();
    if (!query) return 0;

    const label = (entry.label || '').toLowerCase();
    const category = (entry.category || '').toLowerCase();
    const keywords = (entry.keywords || []).map(k => String(k).toLowerCase());
    const haystack = (label + ' ' + category + ' ' + keywords.join(' ')).trim();

    let score = 0;
    if (label === query) score += 120;
    if (keywords.includes(query)) score += 100;
    if (label.startsWith(query)) score += 40;
    if (keywords.some(k => k.startsWith(query))) score += 24;
    if (label.includes(query)) score += 16;
    if (haystack.includes(query)) score += 8;
    return score;
  }

  let activeIdx = 0;

  function renderResults(q) {
    const index = (typeof SEARCH_INDEX !== 'undefined') ? SEARCH_INDEX : [];
    const isEmptyQuery = !q.trim();
    const maxResults = isEmptyQuery ? 8 : 10;
    const filtered = index
      .filter(e => matches(e, q))
      .map((entry, idx) => ({ entry, idx, score: scoreEntry(entry, q) }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.idx - b.idx;
      })
      .slice(0, maxResults)
      .map(x => x.entry);
    activeIdx = 0;

    if (!filtered.length) {
      results.innerHTML = '<li class="search-empty">No results</li>';
      return;
    }

    results.innerHTML = filtered.map((e, i) => `
      <li role="option" class="search-result${i === 0 ? ' focused' : ''}" data-href="${e.url}">
        <span class="sr-label">${highlight(e.label, q)}</span>
        <span class="sr-cat">${e.category}</span>
      </li>`).join('');

    results.querySelectorAll('[data-href]').forEach(li => {
      li.addEventListener('click', () => navigate(li.dataset.href));
      li.addEventListener('mouseenter', () => {
        results.querySelectorAll('.search-result').forEach((el, i) => el.classList.toggle('focused', el === li));
      });
    });
  }

  function highlight(text, q) {
    if (!q.trim()) return text;
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function resolveHref(href) {
    if (!href || /^(https?:|mailto:|#)/i.test(href)) return href;
    if (window.location.protocol !== 'file:') return href;
    if (!href.startsWith('/')) return href;

    const atRoot = (typeof PAGE_ID !== 'undefined' && PAGE_ID === 'home');
    const localPrefix = atRoot ? './' : '../';
    const cleaned = href.replace(/^\/+/, '');
    const parts = cleaned.split('#');
    let pathPart = parts[0];
    const hashPart = parts[1] ? '#' + parts[1] : '';

    // file:// navigation is more reliable with explicit index.html targets.
    if (pathPart.endsWith('/')) {
      pathPart += 'index.html';
    } else if (pathPart && !pathPart.includes('.')) {
      pathPart += '/index.html';
    }

    return localPrefix + pathPart + hashPart;
  }

  function navigate(href) {
    closeSearch();
    window.location.href = resolveHref(href);
  }

  function normalizeQuery(q) {
    return q.toLowerCase().trim().replace(/\s+/g, ' ');
  }

  input.addEventListener('input', () => renderResults(input.value));

  input.addEventListener('keydown', e => {
    const items = [...results.querySelectorAll('.search-result')];
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = (activeIdx + 1) % items.length;
      items.forEach((el, i) => el.classList.toggle('focused', i === activeIdx));
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = (activeIdx - 1 + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle('focused', i === activeIdx));
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      const redirectHref = KEYWORD_REDIRECTS[normalizeQuery(input.value)];
      if (redirectHref) {
        navigate(redirectHref);
        return;
      }
      const focused = results.querySelector('.search-result.focused');
      if (focused) navigate(focused.dataset.href);
    }
  });

})();
