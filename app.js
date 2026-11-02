(() => {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];

  const STATUS = {
    terminado: 'Terminado',
    beta: 'Beta',
    desarrollo: 'En desarrollo',
  };

  const state = { q: '', status: 'todos', tag: null, sort: 'destacados' };

  const $ = (id) => document.getElementById(id);
  const grid = $('grid');
  const empty = $('empty');

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);

  const gameUrl = (g) => g.url || `games/${g.slug}/index.html`;
  const authors = (g) => [].concat(g.autores || []).join(', ');

  // Cabecera con contadores
  function renderStats() {
    const count = (s) => games.filter((g) => g.estado === s).length;
    $('stats').innerHTML = [
      `<span class="stat"><b>${games.length}</b> ${games.length === 1 ? 'juego' : 'juegos'}</span>`,
      ...Object.entries(STATUS)
        .filter(([k]) => count(k))
        .map(([k, label]) => `<span class="stat"><b>${count(k)}</b> ${label.toLowerCase()}</span>`),
    ].join('');
  }

  function renderFilters() {
    const statusOpts = [['todos', 'Todos'], ...Object.entries(STATUS)];
    $('status-filter').innerHTML = statusOpts
      .map(([k, label]) => `<button type="button" class="chip" data-status="${k}" aria-pressed="${state.status === k}">${label}</button>`)
      .join('');

    const tags = [...new Set(games.flatMap((g) => g.generos || []))].sort((a, b) => a.localeCompare(b, 'es'));
    $('tag-filter').innerHTML = tags
      .map((t) => `<button type="button" class="chip" data-tag="${esc(t)}" aria-pressed="${state.tag === t}">#${esc(t)}</button>`)
      .join('');
  }

  function matches(g) {
    if (state.status !== 'todos' && g.estado !== state.status) return false;
    if (state.tag && !(g.generos || []).includes(state.tag)) return false;
    if (!state.q) return true;
    const hay = [g.titulo, g.descripcion, authors(g), ...(g.generos || [])].join(' ').toLowerCase();
    return hay.includes(state.q);
  }

  function renderGrid() {
    // "Destacados" respeta el orden de games.js
    const list = games.filter(matches);
    if (state.sort === 'az') list.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));

    grid.innerHTML = list.map((g) => {
      const [c1, c2] = g.colores || [];
      const cover = g.portada
        ? `<img src="${esc(g.portada)}" alt="" loading="lazy">`
        : esc(g.emoji || '🎮');
      return `
        <article class="card">
          <a class="cover" href="${esc(gameUrl(g))}" target="_blank" rel="noopener" style="--c1:${esc(c1 || '#ff4fa3')};--c2:${esc(c2 || '#4fb3ff')}" aria-label="Jugar a ${esc(g.titulo)} (se abre su web)">
            <span class="badge ${esc(g.estado)}">${esc(STATUS[g.estado] || g.estado)}</span>
            ${cover}
            <span class="play">↗ JUGAR</span>
          </a>
          <div class="body">
            <h3>${esc(g.titulo)}</h3>
            <p>${esc(g.descripcion)}</p>
            ${authors(g) ? `<p class="by">por ${esc(authors(g))}</p>` : ''}
            <div class="meta">
              ${(g.generos || []).map((t) => `<span>#${esc(t)}</span>`).join('')}
            </div>
            <a class="btn-play" href="${esc(gameUrl(g))}" target="_blank" rel="noopener">↗ Jugar</a>
          </div>
        </article>`;
    }).join('');

    empty.hidden = list.length > 0;
  }

  function render() {
    renderFilters();
    renderGrid();
  }

  // Eventos de la página
  document.addEventListener('click', (e) => {
    const st = e.target.closest('[data-status]');
    if (st) { state.status = st.dataset.status; return render(); }

    const tag = e.target.closest('[data-tag]');
    if (tag) { state.tag = state.tag === tag.dataset.tag ? null : tag.dataset.tag; return render(); }
  });

  $('search').addEventListener('input', (e) => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });
  $('sort').addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });

  renderStats();
  render();
})();
