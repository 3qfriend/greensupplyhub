/**
 * GreenSupplyHub — Admin Panel
 */
import { dataService } from '../utils/data-service.js';

let currentAdminPage = 'dashboard';

export async function renderAdmin(subpage) {
  if (!dataService.isLoggedIn()) {
    window.location.hash = '#/admin/login';
    return;
  }

  const content = document.getElementById('page-content');
  content.style.paddingTop = '0';

  content.innerHTML = `
    <div class="admin-layout">
      <aside class="admin-sidebar" id="admin-sidebar">
        <a href="#/" class="admin-logo">
          <div class="admin-logo__icon">
            <span class="material-icons-outlined">eco</span>
          </div>
          <span>GreenSupplyHub</span>
        </a>

        <div class="admin-nav__label">Main</div>
        <nav class="admin-nav" id="admin-nav">
          <a class="admin-nav__item active" data-page="dashboard">
            <span class="material-icons-outlined">dashboard</span>
            Dashboard
          </a>
          <a class="admin-nav__item" data-page="suppliers">
            <span class="material-icons-outlined">business</span>
            Suppliers
          </a>
          <a class="admin-nav__item" data-page="news">
            <span class="material-icons-outlined">newspaper</span>
            News
          </a>
          <div class="admin-nav__divider"></div>
          <div class="admin-nav__label">System</div>
          <a class="admin-nav__item" data-page="settings">
            <span class="material-icons-outlined">settings</span>
            Settings
          </a>
          <a class="admin-nav__item" id="admin-logout">
            <span class="material-icons-outlined">logout</span>
            Sign Out
          </a>
        </nav>
      </aside>

      <main class="admin-main">
        <div class="admin-topbar">
          <h1 id="admin-page-title">Dashboard</h1>
          <div class="admin-topbar__actions">
            <div class="admin-user">
              <div class="admin-user__avatar">A</div>
              <span>Admin</span>
            </div>
          </div>
        </div>
        <div class="admin-content" id="admin-content"></div>
      </main>
    </div>
  `;

  document.querySelectorAll('#admin-nav .admin-nav__item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#admin-nav .admin-nav__item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentAdminPage = item.dataset.page;
      document.getElementById('admin-page-title').textContent = getPageTitle(currentAdminPage);
      loadAdminPage(currentAdminPage);
    });
  });

  document.getElementById('admin-logout').addEventListener('click', () => {
    dataService.logout();
    window.showToast('Signed out successfully', 'success');
    window.location.hash = '#/';
  });

  loadAdminPage('dashboard');
}

function getPageTitle(page) {
  const titles = { dashboard: 'Dashboard', suppliers: 'Supplier Management', news: 'News Management', settings: 'Site Settings' };
  return titles[page] || 'Admin';
}

async function loadAdminPage(page) {
  const contentArea = document.getElementById('admin-content');
  switch (page) {
    case 'dashboard': await renderDashboard(contentArea); break;
    case 'suppliers': await renderSuppliersManage(contentArea); break;
    case 'news': await renderNewsManage(contentArea); break;
    case 'settings': await renderSettings(contentArea); break;
  }
}

// ─── Dashboard ────────────────────────────────────────────
async function renderDashboard(container) {
  const stats = await dataService.getStats();
  const recentNews = (await dataService.getNews()).slice(0, 5);
  const recentSuppliers = (await dataService.loadSuppliers()).slice(-5).reverse();

  container.innerHTML = `
    <div class="dashboard-stats">
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon dashboard-stat-card__icon--green">
          <span class="material-icons-outlined">business</span>
        </div>
        <div>
          <div class="dashboard-stat-card__value">${stats.totalSuppliers}</div>
          <div class="dashboard-stat-card__label">Total Suppliers</div>
        </div>
      </div>
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon dashboard-stat-card__icon--blue">
          <span class="material-icons-outlined">newspaper</span>
        </div>
        <div>
          <div class="dashboard-stat-card__value">${stats.totalNews}</div>
          <div class="dashboard-stat-card__label">Total Articles</div>
        </div>
      </div>
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon dashboard-stat-card__icon--gold">
          <span class="material-icons-outlined">category</span>
        </div>
        <div>
          <div class="dashboard-stat-card__value">${stats.totalCategories}</div>
          <div class="dashboard-stat-card__label">Categories</div>
        </div>
      </div>
      <div class="dashboard-stat-card">
        <div class="dashboard-stat-card__icon dashboard-stat-card__icon--red">
          <span class="material-icons-outlined">public</span>
        </div>
        <div>
          <div class="dashboard-stat-card__value">${stats.totalCountries}</div>
          <div class="dashboard-stat-card__label">Countries</div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-6)">
      <div class="admin-table-wrapper">
        <div class="admin-table-header">
          <h3>Recent Suppliers</h3>
        </div>
        <table class="admin-table">
          <thead><tr><th>Name</th><th>Category</th><th>Region</th></tr></thead>
          <tbody>
            ${recentSuppliers.map(s => `
              <tr>
                <td><strong>${s.shortName || s.name}</strong></td>
                <td><span class="badge badge--green">${s.category}</span></td>
                <td>${s.region}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="admin-table-wrapper">
        <div class="admin-table-header">
          <h3>Recent News</h3>
        </div>
        <table class="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Date</th></tr></thead>
          <tbody>
            ${recentNews.map(n => `
              <tr>
                <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n.title}</td>
                <td><span class="badge">${n.category}</span></td>
                <td>${n.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ─── Suppliers Management ─────────────────────────────────
async function renderSuppliersManage(container) {
  const suppliers = await dataService.loadSuppliers();

  container.innerHTML = `
    <div class="admin-table-wrapper">
      <div class="admin-table-header">
        <h3>Suppliers (${suppliers.length})</h3>
        <button class="btn btn--primary" id="btn-add-supplier">
          <span class="material-icons-outlined">add</span>
          Add Supplier
        </button>
      </div>
      <table class="admin-table">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Region</th><th>Certifications</th><th>Featured</th><th>Actions</th></tr>
        </thead>
        <tbody id="suppliers-tbody">
          ${suppliers.map(s => renderSupplierRow(s)).join('')}
        </tbody>
      </table>
    </div>

    <div class="modal-overlay" id="supplier-modal">
      <div class="modal" style="max-width:700px">
        <div class="modal__header">
          <h3 class="modal__title" id="supplier-modal-title">Add Supplier</h3>
          <button class="modal__close" id="supplier-modal-close">
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
        <form id="supplier-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Company Name *</label>
              <input class="form-input" name="name" required />
            </div>
            <div class="form-group">
              <label class="form-label">English Name *</label>
              <input class="form-input" name="nameEn" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Short Name</label>
              <input class="form-input" name="shortName" />
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" name="category">
                <option>Fabric Manufacturing</option>
                <option>Fiber Manufacturing</option>
                <option>Yarn Manufacturing</option>
                <option>Dyeing & Finishing</option>
                <option>Garment Manufacturing</option>
                <option>Accessories Supply</option>
                <option>Nonwoven Manufacturing</option>
                <option>Technology R&D</option>
                <option>Testing & Certification</option>
                <option>Integrated Textile</option>
                <option>Recycling & Upcycling</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Region</label>
              <input class="form-input" name="region" placeholder="e.g. Hangzhou, China" />
            </div>
            <div class="form-group">
              <label class="form-label">Country</label>
              <input class="form-input" name="country" placeholder="e.g. China" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">City</label>
              <input class="form-input" name="city" />
            </div>
            <div class="form-group">
              <label class="form-label">Year Founded</label>
              <input class="form-input" name="founded" type="number" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Employees</label>
              <input class="form-input" name="employees" placeholder="e.g. 500+" />
            </div>
            <div class="form-group">
              <label class="form-label">Featured</label>
              <select class="form-select" name="featured">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-textarea" name="description"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Certifications (comma-separated)</label>
              <input class="form-input" name="certifications" placeholder="GOTS, OEKO-TEX, GRS" />
            </div>
            <div class="form-group">
              <label class="form-label">Products (comma-separated)</label>
              <input class="form-input" name="products" placeholder="Organic Cotton, Recycled Polyester" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" name="email" type="email" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-input" name="phone" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <input class="form-input" name="address" />
          </div>
          <div class="form-group">
            <label class="form-label">Website</label>
            <input class="form-input" name="website" type="url" />
          </div>
          <input type="hidden" name="id" />
          <div style="display:flex;justify-content:flex-end;gap:var(--space-3);margin-top:var(--space-6)">
            <button type="button" class="btn btn--ghost" id="supplier-cancel">Cancel</button>
            <button type="submit" class="btn btn--primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.btn-edit');
    const deleteBtn = e.target.closest('.btn-delete');
    if (editBtn) {
      const supplier = await dataService.getSupplier(editBtn.dataset.id);
      openSupplierModal(supplier);
    }
    if (deleteBtn) {
      if (confirm('Are you sure you want to delete this supplier?')) {
        await dataService.deleteSupplier(deleteBtn.dataset.id);
        window.showToast('Supplier deleted', 'success');
        renderSuppliersManage(container);
      }
    }
  });

  document.getElementById('btn-add-supplier').addEventListener('click', () => openSupplierModal());

  const modal = document.getElementById('supplier-modal');
  document.getElementById('supplier-modal-close').addEventListener('click', () => modal.classList.remove('active'));
  document.getElementById('supplier-cancel').addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  document.getElementById('supplier-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'certifications' || key === 'products') data[key] = value.split(',').map(s => s.trim()).filter(Boolean);
      else if (key === 'featured') data[key] = value === 'true';
      else if (key === 'founded') data[key] = parseInt(value) || 2020;
      else data[key] = value;
    }
    if (data.id) {
      await dataService.updateSupplier(data.id, data);
      window.showToast('Supplier updated', 'success');
    } else {
      delete data.id;
      data.logo = null;
      await dataService.addSupplier(data);
      window.showToast('Supplier added', 'success');
    }
    modal.classList.remove('active');
    renderSuppliersManage(container);
  });
}

function openSupplierModal(supplier = null) {
  const modal = document.getElementById('supplier-modal');
  const form = document.getElementById('supplier-form');
  document.getElementById('supplier-modal-title').textContent = supplier ? 'Edit Supplier' : 'Add Supplier';
  form.reset();
  if (supplier) {
    form.name.value = supplier.name || '';
    form.nameEn.value = supplier.nameEn || '';
    form.shortName.value = supplier.shortName || '';
    form.category.value = supplier.category || '';
    form.region.value = supplier.region || '';
    form.country.value = supplier.country || '';
    form.city.value = supplier.city || '';
    form.founded.value = supplier.founded || '';
    form.employees.value = supplier.employees || '';
    form.featured.value = String(supplier.featured || false);
    form.description.value = supplier.description || '';
    form.certifications.value = (supplier.certifications || []).join(', ');
    form.products.value = (supplier.products || []).join(', ');
    form.email.value = supplier.email || '';
    form.phone.value = supplier.phone || '';
    form.address.value = supplier.address || '';
    form.website.value = supplier.website || '';
    form.id.value = supplier.id;
  }
  modal.classList.add('active');
}

function renderSupplierRow(s) {
  return `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:var(--space-3)">
          <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-primary-50);display:flex;align-items:center;justify-content:center;font-size:var(--text-xs);font-weight:700;color:var(--color-primary-700);flex-shrink:0">
            ${(s.shortName || s.name).slice(0, 2)}
          </div>
          <div>
            <strong style="font-size:var(--text-sm)">${s.name}</strong>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary)">${s.nameEn}</div>
          </div>
        </div>
      </td>
      <td><span class="badge badge--green">${s.category}</span></td>
      <td>${s.region}</td>
      <td>${(s.certifications || []).slice(0, 2).map(c => `<span class="badge" style="margin-right:2px">${c}</span>`).join('')}${s.certifications && s.certifications.length > 2 ? `<span class="badge">+${s.certifications.length - 2}</span>` : ''}</td>
      <td>${s.featured ? '<span class="badge badge--gold">Featured</span>' : '-'}</td>
      <td>
        <div class="actions">
          <button class="btn-edit" data-id="${s.id}">Edit</button>
          <button class="btn-delete" data-id="${s.id}">Delete</button>
        </div>
      </td>
    </tr>
  `;
}

// ─── News Management ──────────────────────────────────────
async function renderNewsManage(container) {
  const news = await dataService.getNews();

  container.innerHTML = `
    <div class="admin-table-wrapper">
      <div class="admin-table-header">
        <h3>News Articles (${news.length})</h3>
        <button class="btn btn--primary" id="btn-add-news">
          <span class="material-icons-outlined">add</span>
          Publish Article
        </button>
      </div>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          ${news.map(n => `
            <tr>
              <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><strong>${n.title}</strong></td>
              <td><span class="badge">${n.category}</span></td>
              <td>${n.author}</td>
              <td>${n.date}</td>
              <td>
                <div class="actions">
                  <button class="btn-edit" data-id="${n.id}" data-type="news">Edit</button>
                  <button class="btn-delete" data-id="${n.id}" data-type="news">Delete</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="modal-overlay" id="news-modal">
      <div class="modal" style="max-width:700px">
        <div class="modal__header">
          <h3 class="modal__title" id="news-modal-title">Publish Article</h3>
          <button class="modal__close" id="news-modal-close"><span class="material-icons-outlined">close</span></button>
        </div>
        <form id="news-form">
          <div class="form-group">
            <label class="form-label">Title *</label>
            <input class="form-input" name="title" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <select class="form-select" name="category">
                <option>Industry Events</option>
                <option>Policy & Regulation</option>
                <option>Market Analysis</option>
                <option>Platform News</option>
                <option>Tech Innovation</option>
                <option>Standards & Certification</option>
                <option>Industry Reports</option>
                <option>Business News</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date</label>
              <input class="form-input" name="date" type="date" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Author</label>
              <input class="form-input" name="author" value="GreenSupplyHub" />
            </div>
            <div class="form-group">
              <label class="form-label">Icon Emoji</label>
              <input class="form-input" name="icon" placeholder="e.g. 📰" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Excerpt *</label>
            <textarea class="form-textarea" name="excerpt" style="min-height:80px" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Content *</label>
            <textarea class="form-textarea" name="content" style="min-height:200px" required></textarea>
          </div>
          <input type="hidden" name="id" />
          <div style="display:flex;justify-content:flex-end;gap:var(--space-3);margin-top:var(--space-6)">
            <button type="button" class="btn btn--ghost" id="news-cancel">Cancel</button>
            <button type="submit" class="btn btn--primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;

  container.addEventListener('click', async (e) => {
    const editBtn = e.target.closest('.btn-edit[data-type="news"]');
    const deleteBtn = e.target.closest('.btn-delete[data-type="news"]');
    if (editBtn) { openNewsModal(await dataService.getNewsItem(editBtn.dataset.id)); }
    if (deleteBtn) {
      if (confirm('Are you sure you want to delete this article?')) {
        await dataService.deleteNews(deleteBtn.dataset.id);
        window.showToast('Article deleted', 'success');
        renderNewsManage(container);
      }
    }
  });

  document.getElementById('btn-add-news').addEventListener('click', () => openNewsModal());
  const modal = document.getElementById('news-modal');
  document.getElementById('news-modal-close').addEventListener('click', () => modal.classList.remove('active'));
  document.getElementById('news-cancel').addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  document.getElementById('news-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    for (const [key, value] of formData.entries()) data[key] = value;
    if (!data.date) data.date = new Date().toISOString().split('T')[0];
    if (data.id) {
      await dataService.updateNews(data.id, data);
      window.showToast('Article updated', 'success');
    } else {
      delete data.id;
      await dataService.addNews(data);
      window.showToast('Article published', 'success');
    }
    modal.classList.remove('active');
    renderNewsManage(container);
  });
}

function openNewsModal(item = null) {
  const modal = document.getElementById('news-modal');
  const form = document.getElementById('news-form');
  document.getElementById('news-modal-title').textContent = item ? 'Edit Article' : 'Publish Article';
  form.reset();
  if (item) {
    form.title.value = item.title || '';
    form.category.value = item.category || '';
    form.date.value = item.date || '';
    form.author.value = item.author || '';
    form.icon.value = item.icon || '';
    form.excerpt.value = item.excerpt || '';
    form.content.value = item.content || '';
    form.id.value = item.id;
  }
  modal.classList.add('active');
}

// ─── Settings ─────────────────────────────────────────────
async function renderSettings(container) {
  const config = await dataService.loadConfig();

  container.innerHTML = `
    <div style="max-width:700px">
      <div class="admin-table-wrapper" style="margin-bottom:var(--space-6)">
        <div class="admin-table-header">
          <h3>Site Configuration</h3>
        </div>
        <form id="settings-form" style="padding:var(--space-6)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Site Name</label>
              <input class="form-input" name="siteName" value="${config.siteName || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Domain</label>
              <input class="form-input" name="domain" value="${config.domain || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Tagline</label>
            <input class="form-input" name="tagline" value="${config.tagline || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-textarea" name="description" style="min-height:80px">${config.description || ''}</textarea>
          </div>

          <h4 style="margin:var(--space-6) 0 var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--color-neutral-100)">Contact Information</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" name="contact.email" value="${config.contact?.email || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-input" name="contact.phone" value="${config.contact?.phone || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Address</label>
            <input class="form-input" name="contact.address" value="${config.contact?.address || ''}" />
          </div>

          <h4 style="margin:var(--space-6) 0 var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--color-neutral-100)">Platform Statistics</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Certified Members</label>
              <input class="form-input" name="stats.members" value="${config.stats?.members || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Countries</label>
              <input class="form-input" name="stats.countries" value="${config.stats?.countries || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Certifications</label>
              <input class="form-input" name="stats.certifications" value="${config.stats?.certifications || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Industry Events</label>
              <input class="form-input" name="stats.events" value="${config.stats?.events || ''}" />
            </div>
          </div>

          <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3)">
            <button type="submit" class="btn btn--primary">
              <span class="material-icons-outlined">save</span>
              Save Settings
            </button>
            <button type="button" class="btn btn--ghost" id="btn-reset-data" style="color:var(--color-error)">
              <span class="material-icons-outlined">restart_alt</span>
              Reset Data
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {};
    for (const [key, value] of formData.entries()) {
      const parts = key.split('.');
      if (parts.length === 2) {
        if (!updates[parts[0]]) updates[parts[0]] = {};
        updates[parts[0]][parts[1]] = value;
      } else {
        updates[key] = value;
      }
    }
    const currentConfig = await dataService.loadConfig();
    if (updates.contact) updates.contact = { ...currentConfig.contact, ...updates.contact };
    if (updates.stats) updates.stats = { ...currentConfig.stats, ...updates.stats };
    await dataService.updateConfig(updates);
    window.showToast('Settings saved', 'success');
  });

  document.getElementById('btn-reset-data').addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
      await dataService.resetData();
      window.showToast('Data has been reset', 'success');
      renderSettings(container);
    }
  });
}
