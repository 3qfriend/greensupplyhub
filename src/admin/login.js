/**
 * GreenSupplyHub — Admin Login
 */
import { dataService } from '../utils/data-service.js';

export function renderAdminLogin() {
  const content = document.getElementById('page-content');

  if (dataService.isLoggedIn()) {
    window.location.hash = '#/admin';
    return;
  }

  content.innerHTML = `
    <div class="admin-login">
      <div class="admin-login-card">
        <div class="logo" style="justify-content:center;margin-bottom:var(--space-8)">
          <div class="logo__icon">
            <span class="material-icons-outlined">eco</span>
          </div>
          <div class="logo__text">
            <span class="logo__name">GreenSupplyHub</span>
            <span class="logo__tagline">Admin Panel</span>
          </div>
        </div>

        <h2 style="text-align:center;font-size:var(--text-xl);margin-bottom:var(--space-6)">Sign In to Admin Panel</h2>

        <form id="admin-login-form">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input class="form-input" type="text" id="login-username" placeholder="Enter username" required autofocus />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input class="form-input" type="password" id="login-password" placeholder="Enter password" required />
          </div>
          <button type="submit" class="btn btn--primary btn--lg" style="width:100%">
            <span class="material-icons-outlined">login</span>
            Sign In
          </button>
          <p class="form-hint">Demo: admin / admin123</p>
        </form>

        <div style="text-align:center;margin-top:var(--space-6)">
          <a href="#/" class="btn btn--ghost">
            <span class="material-icons-outlined">arrow_back</span>
            Back to Homepage
          </a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const success = await dataService.login(username, password);
    if (success) {
      window.showToast('Logged in successfully!', 'success');
      window.location.hash = '#/admin';
    } else {
      window.showToast('Invalid username or password', 'error');
    }
  });
}
