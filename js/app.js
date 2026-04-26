/**
 * Sincetur Travel — Application Logic
 * Manages destinations, attractions, search, filters and modal.
 */

'use strict';

/* ============================================================
   Data
   ============================================================ */

const destinations = [
  {
    id: 1,
    emoji: '🏖️',
    name: 'Florianópolis',
    state: 'SC',
    tag: 'praia',
    tagLabel: 'Praia',
    description:
      'A Ilha da Magia oferece mais de 40 praias, lagoas e uma rica cultura açoriana. Perfeita para surf, mergulho e ecoturismo.',
    rating: 4.8,
  },
  {
    id: 2,
    emoji: '🏙️',
    name: 'São Paulo',
    state: 'SP',
    tag: 'cidade',
    tagLabel: 'Cidade',
    description:
      'A maior metrópole da América do Sul concentra museus de classe mundial, gastronomia diversificada e intensa vida cultural.',
    rating: 4.6,
  },
  {
    id: 3,
    emoji: '🌿',
    name: 'Bonito',
    state: 'MS',
    tag: 'natureza',
    tagLabel: 'Natureza',
    description:
      'Paraíso do ecoturismo com rios de águas cristalinas, grutas esplêndidas e mergulhos inesquecíveis na natureza pantaneira.',
    rating: 4.9,
  },
  {
    id: 4,
    emoji: '🏰',
    name: 'Ouro Preto',
    state: 'MG',
    tag: 'cultura',
    tagLabel: 'Cultura',
    description:
      'Patrimônio Histórico da Humanidade, a cidade colonial barroca encanta com igrejas douradas, museus e a arte de Aleijadinho.',
    rating: 4.7,
  },
  {
    id: 5,
    emoji: '🌊',
    name: 'Fernando de Noronha',
    state: 'PE',
    tag: 'praia',
    tagLabel: 'Praia',
    description:
      'Arquipélago paradisíaco com praias consideradas as mais belas do Brasil, mergulho com golfinhos e tartarugas marinhas.',
    rating: 5.0,
  },
  {
    id: 6,
    emoji: '🌲',
    name: 'Manaus',
    state: 'AM',
    tag: 'natureza',
    tagLabel: 'Natureza',
    description:
      'Portal de entrada para a Amazônia: encontro das águas, florestas exuberantes e o grandioso Teatro Amazonas.',
    rating: 4.5,
  },
  {
    id: 7,
    emoji: '🎭',
    name: 'Salvador',
    state: 'BA',
    tag: 'cultura',
    tagLabel: 'Cultura',
    description:
      'Primeira capital do Brasil: Pelourinho, Carnaval, culinária afro-baiana e uma energia única que encanta todos os visitantes.',
    rating: 4.8,
  },
  {
    id: 8,
    emoji: '🏔️',
    name: 'Gramado',
    state: 'RS',
    tag: 'cidade',
    tagLabel: 'Cidade',
    description:
      'A cidade serrana com arquitetura europeia oferece fondue, chocolate artesanal, o Festival de Cinema e a mágica Festa de Natal.',
    rating: 4.9,
  },
];

const attractions = [
  {
    id: 101,
    emoji: '🏖️',
    name: 'Praia de Ipanema',
    location: 'Rio de Janeiro, RJ',
    tag: 'praia',
    tagLabel: 'Praia',
    description:
      'Uma das praias mais famosas do mundo, cenário da icônica música "Garota de Ipanema". Ideal para vôlei de praia e pôr do sol.',
    rating: 4.9,
  },
  {
    id: 102,
    emoji: '🗿',
    name: 'Cristo Redentor',
    location: 'Rio de Janeiro, RJ',
    tag: 'cultura',
    tagLabel: 'Cultura',
    description:
      'Uma das Sete Maravilhas do Mundo Moderno, o Cristo Redentor domina o morro do Corcovado com vista panorâmica do Rio.',
    rating: 5.0,
  },
  {
    id: 103,
    emoji: '💧',
    name: 'Cataratas do Iguaçu',
    location: 'Foz do Iguaçu, PR',
    tag: 'natureza',
    tagLabel: 'Natureza',
    description:
      'Patrimônio Natural da Humanidade, as Cataratas são o maior conjunto de quedas d\'água do planeta — uma experiência épica.',
    rating: 5.0,
  },
  {
    id: 104,
    emoji: '🎨',
    name: 'MASP',
    location: 'São Paulo, SP',
    tag: 'cultura',
    tagLabel: 'Cultura',
    description:
      'O Museu de Arte de São Paulo abriga um dos maiores acervos de arte do hemisfério sul, com obras de Raphael, Van Gogh e Picasso.',
    rating: 4.7,
  },
  {
    id: 105,
    emoji: '🌅',
    name: 'Lençóis Maranhenses',
    location: 'Barreirinhas, MA',
    tag: 'natureza',
    tagLabel: 'Natureza',
    description:
      'Dunas brancas que se transformam em lagoas de água doce na estação chuvosa — uma das paisagens mais surreais do Brasil.',
    rating: 4.9,
  },
  {
    id: 106,
    emoji: '⛵',
    name: 'Paraty',
    location: 'Paraty, RJ',
    tag: 'cultura',
    tagLabel: 'Cultura',
    description:
      'Centro histórico colonial e Patrimônio da Humanidade, cercado por ilhas, praias e florestas de Mata Atlântica preservada.',
    rating: 4.8,
  },
];

/* ============================================================
   DOM References
   ============================================================ */

const destinationsGrid = document.getElementById('destinationsGrid');
const attractionsGrid  = document.getElementById('attractionsGrid');
const searchForm       = document.getElementById('searchForm');
const searchInput      = document.getElementById('searchInput');
const filterBtns       = document.querySelectorAll('.filter-btn');
const modalOverlay     = document.getElementById('modalOverlay');
const modalClose       = document.getElementById('modalClose');
const modalImg         = document.getElementById('modalImg');
const modalTag         = document.getElementById('modalTag');
const modalTitle       = document.getElementById('modalTitle');
const modalDesc        = document.getElementById('modalDesc');
const modalRating      = document.getElementById('modalRating');
const navToggle        = document.getElementById('navToggle');
const nav              = document.getElementById('nav');
const yearEl           = document.getElementById('year');

/* ============================================================
   Helpers
   ============================================================ */

/**
 * Build star string from numeric rating (max 5).
 * @param {number} rating
 * @returns {string}
 */
function buildStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty) + ` ${rating.toFixed(1)}`;
}

/**
 * Sanitize a string to prevent XSS when inserted via innerHTML.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Create a card element for a destination or attraction item.
 * @param {object} item
 * @returns {HTMLElement}
 */
function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Ver detalhes de ${item.name}`);
  card.dataset.id  = item.id;
  card.dataset.tag = item.tag;

  card.innerHTML = `
    <div class="card__emoji" aria-hidden="true">${escapeHtml(item.emoji)}</div>
    <div class="card__body">
      <span class="card__tag">${escapeHtml(item.tagLabel)}</span>
      <h3 class="card__title">${escapeHtml(item.name)}</h3>
      <p class="card__desc">${escapeHtml(item.description)}</p>
      <div class="card__footer">
        <span class="card__rating">${buildStars(item.rating)}</span>
        <button class="card__btn" tabindex="-1">Saiba mais</button>
      </div>
    </div>
  `;

  card.addEventListener('click', () => openModal(item));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(item);
    }
  });

  return card;
}

/**
 * Render a list of items into a grid container.
 * @param {HTMLElement} container
 * @param {object[]}    items
 */
function renderCards(container, items) {
  container.innerHTML = '';

  if (items.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'no-results';
    empty.textContent = 'Nenhum resultado encontrado.';
    container.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(createCard(item)));
  container.appendChild(fragment);
}

/* ============================================================
   Modal
   ============================================================ */

function openModal(item) {
  modalImg.textContent   = item.emoji;
  modalTag.textContent   = item.tagLabel;
  modalTitle.textContent = item.name;
  modalDesc.textContent  = item.description;
  modalRating.textContent = buildStars(item.rating);
  modalOverlay.hidden    = false;
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

/* ============================================================
   Search
   ============================================================ */

function filterBySearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return;

  const filteredDest = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.tag.toLowerCase().includes(q),
  );

  const filteredAttr = attractions.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q),
  );

  renderCards(destinationsGrid, filteredDest);
  renderCards(attractionsGrid, filteredAttr);

  // Reset active filter button
  filterBtns.forEach((btn) => btn.classList.remove('active'));

  // Scroll to destinations
  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  filterBySearch(searchInput.value);
});

/* ============================================================
   Filter (destinations only)
   ============================================================ */

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const filtered =
      filter === 'all'
        ? destinations
        : destinations.filter((d) => d.tag === filter);

    renderCards(destinationsGrid, filtered);
  });
});

/* ============================================================
   Mobile nav toggle
   ============================================================ */

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked
nav.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================================
   Footer year
   ============================================================ */
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   Init — render all cards on load
   ============================================================ */
renderCards(destinationsGrid, destinations);
renderCards(attractionsGrid, attractions);
