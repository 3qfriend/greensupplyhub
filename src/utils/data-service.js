/**
 * GreenSupplyHub — Data Service
 * Handles loading data from JSON files and localStorage CRUD operations
 */

const STORAGE_KEYS = {
  suppliers: 'gsh_suppliers',
  news: 'gsh_news',
  config: 'gsh_config',
  auth: 'gsh_auth',
};

class DataService {
  constructor() {
    this._cache = {};
  }

  // ─── Loaders ───────────────────────────────────────────
  async loadSuppliers() {
    const local = this._getLocal(STORAGE_KEYS.suppliers);
    if (local) return local;
    const data = await this._fetchJSON('/src/data/suppliers.json');
    this._setLocal(STORAGE_KEYS.suppliers, data);
    return data;
  }

  async loadNews() {
    const local = this._getLocal(STORAGE_KEYS.news);
    if (local) return local;
    const data = await this._fetchJSON('/src/data/news.json');
    this._setLocal(STORAGE_KEYS.news, data);
    return data;
  }

  async loadConfig() {
    const local = this._getLocal(STORAGE_KEYS.config);
    if (local) return local;
    const data = await this._fetchJSON('/src/data/config.json');
    this._setLocal(STORAGE_KEYS.config, data);
    return data;
  }

  // ─── CRUD: Suppliers ──────────────────────────────────
  async getSuppliers(filters = {}) {
    let suppliers = await this.loadSuppliers();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      suppliers = suppliers.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== 'all') {
      suppliers = suppliers.filter(s => s.category === filters.category);
    }

    if (filters.region && filters.region !== 'all') {
      suppliers = suppliers.filter(s => s.country === filters.region);
    }

    if (filters.certification) {
      suppliers = suppliers.filter(s =>
        s.certifications.some(c => c.toLowerCase().includes(filters.certification.toLowerCase()))
      );
    }

    if (filters.featured) {
      suppliers = suppliers.filter(s => s.featured);
    }

    return suppliers;
  }

  async getSupplier(id) {
    const suppliers = await this.loadSuppliers();
    return suppliers.find(s => s.id === id);
  }

  async addSupplier(supplier) {
    const suppliers = await this.loadSuppliers();
    supplier.id = 's' + String(Date.now()).slice(-6);
    suppliers.push(supplier);
    this._setLocal(STORAGE_KEYS.suppliers, suppliers);
    return supplier;
  }

  async updateSupplier(id, updates) {
    const suppliers = await this.loadSuppliers();
    const idx = suppliers.findIndex(s => s.id === id);
    if (idx === -1) return null;
    suppliers[idx] = { ...suppliers[idx], ...updates };
    this._setLocal(STORAGE_KEYS.suppliers, suppliers);
    return suppliers[idx];
  }

  async deleteSupplier(id) {
    let suppliers = await this.loadSuppliers();
    suppliers = suppliers.filter(s => s.id !== id);
    this._setLocal(STORAGE_KEYS.suppliers, suppliers);
    return true;
  }

  // ─── CRUD: News ───────────────────────────────────────
  async getNews(filters = {}) {
    let news = await this.loadNews();

    if (filters.category && filters.category !== 'all') {
      news = news.filter(n => n.category === filters.category);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      news = news.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q)
      );
    }

    // Sort by date descending
    news.sort((a, b) => new Date(b.date) - new Date(a.date));
    return news;
  }

  async getNewsItem(id) {
    const news = await this.loadNews();
    return news.find(n => n.id === id);
  }

  async addNews(item) {
    const news = await this.loadNews();
    item.id = 'n' + String(Date.now()).slice(-6);
    news.unshift(item);
    this._setLocal(STORAGE_KEYS.news, news);
    return item;
  }

  async updateNews(id, updates) {
    const news = await this.loadNews();
    const idx = news.findIndex(n => n.id === id);
    if (idx === -1) return null;
    news[idx] = { ...news[idx], ...updates };
    this._setLocal(STORAGE_KEYS.news, news);
    return news[idx];
  }

  async deleteNews(id) {
    let news = await this.loadNews();
    news = news.filter(n => n.id !== id);
    this._setLocal(STORAGE_KEYS.news, news);
    return true;
  }

  // ─── Config ──────────────────────────────────────────
  async updateConfig(updates) {
    const config = await this.loadConfig();
    const updated = { ...config, ...updates };
    this._setLocal(STORAGE_KEYS.config, updated);
    return updated;
  }

  // ─── Auth ────────────────────────────────────────────
  async login(username, password) {
    const config = await this.loadConfig();
    if (username === config.admin.username && password === config.admin.password) {
      const token = btoa(username + ':' + Date.now());
      localStorage.setItem(STORAGE_KEYS.auth, token);
      return true;
    }
    return false;
  }

  isLoggedIn() {
    return !!localStorage.getItem(STORAGE_KEYS.auth);
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.auth);
  }

  // ─── Reset ───────────────────────────────────────────
  async resetData() {
    localStorage.removeItem(STORAGE_KEYS.suppliers);
    localStorage.removeItem(STORAGE_KEYS.news);
    localStorage.removeItem(STORAGE_KEYS.config);
    this._cache = {};
  }

  // ─── Helpers ─────────────────────────────────────────
  async _fetchJSON(path) {
    if (this._cache[path]) return JSON.parse(JSON.stringify(this._cache[path]));
    try {
      const resp = await fetch(path);
      const data = await resp.json();
      this._cache[path] = data;
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      console.error('Failed to load:', path, e);
      return [];
    }
  }

  _getLocal(key) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  }

  _setLocal(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      console.warn('localStorage is full or unavailable');
    }
  }

  // ─── Stats ───────────────────────────────────────────
  async getStats() {
    const suppliers = await this.loadSuppliers();
    const news = await this.loadNews();
    const categories = [...new Set(suppliers.map(s => s.category))];
    const countries = [...new Set(suppliers.map(s => s.country))];

    return {
      totalSuppliers: suppliers.length,
      totalNews: news.length,
      totalCategories: categories.length,
      totalCountries: countries.length,
      featuredCount: suppliers.filter(s => s.featured).length,
    };
  }
}

export const dataService = new DataService();
export default dataService;
