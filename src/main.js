/**
 * GreenSupplyHub — Main Entry
 */
import './css/base.css';
import './css/components.css';
import './css/layout.css';
import './css/pages.css';
import './css/admin.css';

import { router } from './router.js';
import { dataService } from './utils/data-service.js';
import { renderHome } from './pages/home.js';
import { renderSuppliers } from './pages/suppliers.js';
import { renderSupplierDetail } from './pages/supplier-detail.js';
import { renderAbout } from './pages/about.js';
import { renderNews } from './pages/news.js';
import { renderContact } from './pages/contact.js';
import { renderJoin } from './pages/join.js';
import { renderAdminLogin } from './admin/login.js';
import { renderAdmin } from './admin/admin.js';

// ─── Header ────────────────────────────────────────────
function renderHeader() {
  const header = document.getElementById('site-header');
  const currentHash = window.location.hash.slice(1) || '/';

  if (currentHash.startsWith('/admin')) {
    header.innerHTML = '';
    header.className = '';
    return;
  }

  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="#/" class="logo">
        <div class="logo__icon">
          <span class="material-icons-outlined">eco</span>
        </div>
        <div class="logo__text">
          <span class="logo__name">GreenSupplyHub</span>
          <span class="logo__tagline">Asia's Green Textile Supply Chain</span>
        </div>
      </a>

      <nav class="nav" id="main-nav">
        <a href="#/" class="nav__link ${currentHash === '/' ? 'active' : ''}" data-page="/">Home</a>
        <a href="#/suppliers" class="nav__link ${currentHash.startsWith('/suppliers') ? 'active' : ''}" data-page="/suppliers">Suppliers</a>
        <a href="#/news" class="nav__link ${currentHash.startsWith('/news') ? 'active' : ''}" data-page="/news">News</a>
        <a href="#/about" class="nav__link ${currentHash === '/about' ? 'active' : ''}" data-page="/about">About</a>
        <a href="#/contact" class="nav__link ${currentHash === '/contact' ? 'active' : ''}" data-page="/contact">Contact</a>
      </nav>

      <div class="header-actions">
        <a href="#/join" class="btn btn--primary">Join Us</a>
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu">
          <span class="material-icons-outlined">menu</span>
        </button>
      </div>
    </div>
  `;

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.querySelector('.material-icons-outlined').textContent =
        nav.classList.contains('open') ? 'close' : 'menu';
    });
  }

  let lastScrollY = 0;
  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
  };

  window.removeEventListener('scroll', window._headerScroll);
  window._headerScroll = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ─── Footer ─────────────────────────────────────────────
function renderFooter() {
  const footer = document.getElementById('site-footer');
  const currentHash = window.location.hash.slice(1) || '/';

  if (currentHash.startsWith('/admin')) {
    footer.innerHTML = '';
    footer.className = '';
    return;
  }

  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#/" class="logo" style="margin-bottom:var(--space-2)">
            <div class="logo__icon">
              <span class="material-icons-outlined">eco</span>
            </div>
            <div class="logo__text">
              <span class="logo__name">GreenSupplyHub</span>
              <span class="logo__tagline">Asia's Green Textile Supply Chain</span>
            </div>
          </a>
          <p>Dedicated to driving Asia's green textile supply chain transformation, connecting quality suppliers with brand buyers, and building a sustainable future together.</p>
          <div class="footer-social">
            <a href="#" aria-label="WeChat"><span class="material-icons-outlined">chat</span></a>
            <a href="#" aria-label="Global"><span class="material-icons-outlined">public</span></a>
            <a href="#" aria-label="LinkedIn"><span class="material-icons-outlined">work</span></a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/suppliers">Supplier Search</a></li>
            <li><a href="#/news">Industry News</a></li>
            <li><a href="#/about">About Us</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Member Services</h4>
          <ul>
            <li><a href="#/join">Join Us</a></li>
            <li><a href="#/contact">Contact Us</a></li>
            <li><a href="#/suppliers">Company Directory</a></li>
            <li><a href="#/news">Market Reports</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:market@greensupplyhub.asia">market@greensupplyhub.asia</a></li>
            <li><a href="tel:+8618616806685">+86-18616806685</a></li>
            <li>PuDong, Shanghai</li>
            <li>Go-Enter LTD</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} GreenSupplyHub.asia All Rights Reserved</span>
        <div>
          <a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a> · <a href="#/admin/login">Admin</a>
        </div>
      </div>
    </div>
  `;
}

// ─── Toast Notification ─────────────────────────────────
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="material-icons-outlined">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}</span>
    ${message}
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ─── Routes ─────────────────────────────────────────────
router
  .register('/', () => { renderHeader(); renderFooter(); renderHome(); })
  .register('/suppliers', () => { renderHeader(); renderFooter(); renderSuppliers(); })
  .register('/supplier', (params) => { renderHeader(); renderFooter(); renderSupplierDetail(params[0]); })
  .register('/about', () => { renderHeader(); renderFooter(); renderAbout(); })
  .register('/news', (params) => { renderHeader(); renderFooter(); renderNews(params[0]); })
  .register('/contact', () => { renderHeader(); renderFooter(); renderContact(); })
  .register('/join', () => { renderHeader(); renderFooter(); renderJoin(); })
  .register('/admin/login', () => { renderHeader(); renderFooter(); renderAdminLogin(); })
  .register('/admin', () => { renderHeader(); renderFooter(); renderAdmin(); });

if (!window.location.hash) {
  window.location.hash = '#/';
}
