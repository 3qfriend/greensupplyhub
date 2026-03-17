/**
 * GreenSupplyHub — Hash Router
 * Simple yet effective hash-based SPA routing
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.beforeEach = null;
    
    window.addEventListener('hashchange', () => this._handleRoute());
    window.addEventListener('load', () => this._handleRoute());
  }

  register(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  _handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const [path, ...paramParts] = hash.split('/').filter(Boolean);
    const route = '/' + (path || '');
    const params = paramParts;

    // Admin routes
    if (route.startsWith('/admin')) {
      const adminPath = '/' + hash.slice(1);
      if (this.routes[adminPath]) {
        this.currentRoute = adminPath;
        this.routes[adminPath](params);
        return;
      }
      // Try matching admin sub-routes
      for (const [registeredPath, handler] of Object.entries(this.routes)) {
        if (registeredPath.startsWith('/admin') && adminPath.startsWith(registeredPath)) {
          this.currentRoute = registeredPath;
          handler(params);
          return;
        }
      }
    }

    // Find matching route
    if (this.routes[route]) {
      this.currentRoute = route;
      
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Page transition
      const content = document.getElementById('page-content');
      if (content) {
        content.style.animation = 'none';
        content.offsetHeight; // trigger reflow
        content.style.animation = 'pageIn 0.4s ease-out';
      }
      
      this.routes[route](params);
    } else if (this.routes['/404']) {
      this.routes['/404']();
    } else {
      this.navigate('/');
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

export const router = new Router();
export default router;
