import { DEMOS, GROUPS } from '../../data/demos.js';
import { THUMBS } from '../../data/thumbs.js';

const ARROW_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>`;
const EXTERNAL_SVG = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>`;

let state = { q: '', activeGroup: 'all' };

function fuzzyMatch(d, q) {
  if (!q) return true;
  const hay = (d.title + ' ' + d.desc + ' ' + d.tags.join(' ') + ' ' + d.group).toLowerCase();
  return hay.includes(q.toLowerCase());
}

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text, q) {
  if (!q) return esc(text);
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return esc(text);
  return esc(text.slice(0, idx)) +
    `<mark>${esc(text.slice(idx, idx + q.length))}</mark>` +
    esc(text.slice(idx + q.length));
}

function renderCard(d, q) {
  const g = GROUPS.find(x => x.id === d.group);
  const thumbFn = THUMBS[d.slug];
  const thumb = thumbFn ? thumbFn(g.color) : `<div style="position:absolute;inset:0;background:#2E3440"></div>`;
  const tags = d.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');
  return `
    <article class="card">
      <a class="card-link" href="${esc(d.href)}" target="_blank" rel="noopener" aria-label="${esc(d.title)}"></a>
      <div class="card-thumb">
        ${thumb}
        <div class="card-thumb-overlay">
          <span class="dot" style="background:${g.color}"></span>${esc(g.short)}
        </div>
      </div>
      <div class="card-body">
        <h3>${highlight(d.title, q)}</h3>
        <p>${highlight(d.desc, q)}</p>
      </div>
      <div class="card-tags">${tags}</div>
      <div class="card-footer">
        Open Demo ${ARROW_SVG}
        <span style="margin-left:auto;opacity:.6">${EXTERNAL_SVG}</span>
      </div>
    </article>`;
}

function renderSection(g, items, total, idx, q) {
  const num = String(idx + 1).padStart(2, '0');
  const cards = items.map(d => renderCard(d, q)).join('');
  return `
    <section class="compass-section" id="g-${g.id}">
      <div class="group-head">
        <span class="group-dot" style="background:${g.color}"></span>
        <h2>${esc(g.label)}</h2>
        <span class="group-count">${items.length} of ${total}</span>
        <span class="group-num">/ ${num}</span>
      </div>
      <div class="compass-grid">${cards}</div>
    </section>`;
}

function renderRail(byGroup) {
  const items = GROUPS.map(g => {
    const n = (byGroup[g.id] || []).length;
    return `<li>
      <a href="#g-${g.id}" data-group="${g.id}">
        <span class="rail-dot" style="background:${g.color}"></span>
        ${esc(g.short)}
        <span class="rail-num">${n}</span>
      </a>
    </li>`;
  }).join('');
  document.getElementById('rail-list').innerHTML = items;
  updateRailActive(GROUPS[0].id);
}

function renderChips(counts, totalShown) {
  const allChip = `<button class="chip${state.activeGroup === 'all' ? ' active' : ''}" data-group="all">
    All <span class="ct">${totalShown}</span>
  </button>`;
  const groupChips = GROUPS.map(g => `
    <button class="chip${state.activeGroup === g.id ? ' active' : ''}" data-group="${g.id}">
      <span class="dot" style="background:${g.color}"></span>
      ${esc(g.label)}
      <span class="ct">${counts[g.id] || 0}</span>
    </button>`
  ).join('');
  document.getElementById('filter-chips').innerHTML = allChip + groupChips;
}

function render() {
  const { q, activeGroup } = state;
  const kbd = document.getElementById('search-kbd');
  kbd.textContent = q ? 'esc' : '⌘ K';
  kbd.className = 'search-kbd' + (q ? ' active' : '');

  const filtered = DEMOS.filter(d =>
    (activeGroup === 'all' || d.group === activeGroup) && fuzzyMatch(d, q)
  );

  const counts = {};
  DEMOS.filter(d => fuzzyMatch(d, q)).forEach(d => {
    counts[d.group] = (counts[d.group] || 0) + 1;
  });
  const totalShown = DEMOS.filter(d => fuzzyMatch(d, q)).length;

  renderChips(counts, totalShown);

  const byGroup = {};
  GROUPS.forEach(g => { byGroup[g.id] = filtered.filter(d => d.group === g.id); });
  const totalByGroup = {};
  GROUPS.forEach(g => { totalByGroup[g.id] = DEMOS.filter(d => d.group === g.id).length; });

  renderRail(byGroup);

  const content = document.getElementById('compass-content');
  if (filtered.length === 0) {
    content.innerHTML = `<div class="empty">No results for <span class="q">"${esc(q)}"</span>.<div style="margin-top:.4rem">Try a different keyword.</div></div>`;
    return;
  }

  content.innerHTML = GROUPS
    .filter(g => (byGroup[g.id] || []).length > 0)
    .map((g, idx) => renderSection(g, byGroup[g.id], totalByGroup[g.id], GROUPS.indexOf(g), q))
    .join('');

  setupObserver();
}

let observer = null;

function setupObserver() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) {
      updateRailActive(visible[0].target.id.replace('g-', ''));
    }
  }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.5, 1] });
  GROUPS.forEach(g => {
    const el = document.getElementById('g-' + g.id);
    if (el) observer.observe(el);
  });
}

function updateRailActive(groupId) {
  document.querySelectorAll('#rail-list a').forEach(a => {
    a.classList.toggle('active', a.dataset.group === groupId);
  });
}

export function initGallery() {
  const searchEl = document.getElementById('search');
  searchEl.placeholder = `Search ${DEMOS.length} demos…`;

  searchEl.addEventListener('input', () => {
    state.q = searchEl.value;
    render();
  });

  document.getElementById('filter-chips').addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    state.activeGroup = btn.dataset.group;
    render();
  });

  document.addEventListener('keydown', (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchEl.focus();
      searchEl.select();
    } else if (e.key === 'Escape' && document.activeElement === searchEl) {
      state.q = '';
      searchEl.value = '';
      searchEl.blur();
      render();
    }
  });

  render();
}
