(() => {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];

  const STATUS = {
    terminado: 'Terminado',
    beta: 'Beta',
    desarrollo: 'En desarrollo',
  };

  // Filtros por tipo: cada uno agrupa juegos por su género en games.js
  const TIPOS = [
    ['fiesta', '🎉 Fiesta'],
    ['multijugador', '📱 Multijugador'],
    ['online', '🌐 Online'],
    ['trivia', '❓ Preguntas'],
    ['cartas', '🃏 Cartas'],
    ['puzle', '🧩 Puzles'],
    ['aventura', '🗺️ Aventura'],
    ['simulación', '🏗️ Simulación'],
  ];

  const state = { q: '', tipo: null };

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

  function renderTipos() {
    const opts = [[null, 'Todos'], ...TIPOS.filter(([t]) => games.some((g) => (g.generos || []).includes(t)))];
    $('tipos').innerHTML = opts
      .map(([t, label]) => `<button type="button" class="chip" data-tipo="${t || ''}" aria-pressed="${state.tipo === t}">${label}</button>`)
      .join('');
  }

  function matches(g) {
    if (state.tipo && !(g.generos || []).includes(state.tipo)) return false;
    if (!state.q) return true;
    const hay = [g.titulo, g.descripcion, authors(g), ...(g.generos || [])].join(' ').toLowerCase();
    return hay.includes(state.q);
  }

  function renderGrid() {
    const list = games.filter(matches).sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));

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

  $('search').addEventListener('input', (e) => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });

  $('tipos').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tipo]');
    if (!b) return;
    state.tipo = b.dataset.tipo || null;
    renderTipos();
    renderGrid();
  });

  renderStats();
  renderTipos();
  renderGrid();
})();
