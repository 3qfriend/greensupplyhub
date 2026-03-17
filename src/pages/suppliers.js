/**
 * GreenSupplyHub — Suppliers Page
 */
import { dataService } from '../utils/data-service.js';

export async function renderSuppliers() {
  const content = document.getElementById('page-content');
  const allSuppliers = await dataService.loadSuppliers();
  
  const categories = ['all', ...new Set(allSuppliers.map(s => s.category))];
  const countries = ['all', ...new Set(allSuppliers.map(s => s.country))];

  content.innerHTML = `
    <section class="suppliers-hero">
      <div class="container">
        <h1>Supplier Search</h1>
        <p>Discover quality partners in Asia's green textile supply chain</p>
        
        <div class="search-bar" style="max-width:600px;margin:0 auto">
          <span class="material-icons-outlined search-icon">search</span>
          <input type="text" id="supplier-search" placeholder="Search by supplier name, product, or keyword..." />
        </div>

        <div class="filters-bar" id="filters-bar">
          <select class="form-select" id="filter-category" style="width:auto;min-width:150px">
            ${categories.map(c => `<option value="${c}">${c === 'all' ? 'All Categories' : c}</option>`).join('')}
          </select>
          <select class="form-select" id="filter-region" style="width:auto;min-width:150px">
            ${countries.map(c => `<option value="${c}">${c === 'all' ? 'All Countries' : c}</option>`).join('')}
          </select>
          <button class="btn btn--ghost" id="clear-filters">
            <span class="material-icons-outlined" style="font-size:16px">filter_list_off</span>
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:var(--space-6)">
      <div class="container">
        <div class="suppliers-count" id="suppliers-count"></div>
        <div class="grid grid--3" id="suppliers-grid"></div>
        <div class="pagination" id="suppliers-pagination"></div>
      </div>
    </section>
  `;

  let currentFilters = { search: '', category: 'all', region: 'all' };
  const PAGE_SIZE = 9;
  let currentPage = 1;

  async function renderList() {
    const grid = document.getElementById('suppliers-grid');
    const countEl = document.getElementById('suppliers-count');
    const paginationEl = document.getElementById('suppliers-pagination');
    
    const filtered = await dataService.getSuppliers(currentFilters);
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    countEl.innerHTML = `Found <strong>${filtered.length}</strong> suppliers`;

    grid.innerHTML = pageItems.map(s => `
      <div class="supplier-card" onclick="window.location.hash='#/supplier/${s.id}'">
        <div class="supplier-card__header">
          <div class="supplier-card__logo">${s.shortName.slice(0, 2)}</div>
          <div class="supplier-card__info">
            <h3>${s.name}</h3>
            <div class="supplier-card__location">
              <span class="material-icons-outlined" style="font-size:14px">location_on</span>
              ${s.region}
            </div>
          </div>
        </div>
        <div class="supplier-card__body">
          <p class="supplier-card__desc">${s.description}</p>
          <div class="supplier-card__badges">
            ${s.certifications.map(c => `<span class="badge badge--green">${c}</span>`).join('')}
          </div>
        </div>
        <div class="supplier-card__footer">
          <span class="supplier-card__products">
            <span class="material-icons-outlined" style="font-size:16px">inventory_2</span>
            ${s.products.length} Products
          </span>
          <button class="btn btn--sm btn--primary" onclick="event.stopPropagation();window.location.hash='#/supplier/${s.id}'">
            View Details
          </button>
        </div>
      </div>
    `).join('');

    if (totalPages > 1) {
      let paginationHTML = '';
      paginationHTML += `<button class="pagination__btn" ${currentPage <= 1 ? 'disabled' : ''} data-page="${currentPage - 1}">&lsaquo;</button>`;
      for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination__btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
      paginationHTML += `<button class="pagination__btn" ${currentPage >= totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">&rsaquo;</button>`;
      paginationEl.innerHTML = paginationHTML;

      paginationEl.querySelectorAll('.pagination__btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const page = parseInt(btn.dataset.page);
          if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderList();
            window.scrollTo({ top: 200, behavior: 'smooth' });
          }
        });
      });
    } else {
      paginationEl.innerHTML = '';
    }
  }

  let debounceTimer;
  document.getElementById('supplier-search').addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentFilters.search = e.target.value;
      currentPage = 1;
      renderList();
    }, 300);
  });

  document.getElementById('filter-category').addEventListener('change', (e) => {
    currentFilters.category = e.target.value;
    currentPage = 1;
    renderList();
  });

  document.getElementById('filter-region').addEventListener('change', (e) => {
    currentFilters.region = e.target.value;
    currentPage = 1;
    renderList();
  });

  document.getElementById('clear-filters').addEventListener('click', () => {
    currentFilters = { search: '', category: 'all', region: 'all' };
    document.getElementById('supplier-search').value = '';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-region').value = 'all';
    currentPage = 1;
    renderList();
  });

  renderList();
}
