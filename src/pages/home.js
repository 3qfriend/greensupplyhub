/**
 * GreenSupplyHub — Home Page
 */
import { dataService } from '../utils/data-service.js';

export async function renderHome() {
  const content = document.getElementById('page-content');
  const config = await dataService.loadConfig();
  const suppliers = await dataService.getSuppliers({ featured: true });
  const news = await dataService.getNews();
  const latestNews = news.slice(0, 3);

  content.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-particles" id="hero-particles"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="material-icons-outlined">verified</span>
          Asia's Leading Green Textile Supply Chain Platform
        </div>
        <h1>
          Weaving a <span>Greener Future</span><br/>
          Connecting Asia's Sustainable Textile Force
        </h1>
        <p class="hero-subtitle">
          GreenSupplyHub brings together Asia's finest green textile suppliers, advancing eco-certifications, sustainable material innovation, and green manufacturing transformation
        </p>
        <div class="hero-actions">
          <a href="#/suppliers" class="btn btn--primary btn--lg">
            <span class="material-icons-outlined">search</span>
            Find Suppliers
          </a>
          <a href="#/join" class="btn btn--secondary btn--lg">
            <span class="material-icons-outlined">group_add</span>
            Become a Member
          </a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat__number">${config.stats.members}</div>
            <div class="hero-stat__label">Certified Members</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat__number">${config.stats.countries}</div>
            <div class="hero-stat__label">Countries Covered</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat__number">${config.stats.certifications}</div>
            <div class="hero-stat__label">Certifications</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat__number">${config.stats.events}</div>
            <div class="hero-stat__label">Industry Events</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Why GreenSupplyHub</h2>
          <p>Comprehensive green transformation services for Asia's textile supply chain</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">search</span>
            </div>
            <h3>Precision Supplier Matching</h3>
            <p>Multi-dimensional filtering by certification, product type, and region to quickly find the right green supplier</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">verified_user</span>
            </div>
            <h3>Verified Certifications</h3>
            <p>Integrated GOTS, OEKO-TEX, GRS, bluesign and other international certification data for trustworthy supplier credentials</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">analytics</span>
            </div>
            <h3>Industry Insights</h3>
            <p>Continuously published green textile market analysis, policy interpretation, and technology trend reports</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">handshake</span>
            </div>
            <h3>Trade Matching</h3>
            <p>Online and offline sourcing platform for efficient matchmaking between brands and suppliers</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">school</span>
            </div>
            <h3>Training & Empowerment</h3>
            <p>Regular eco-certification training and sustainable production workshops to elevate supply chain green capabilities</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">
              <span class="material-icons-outlined">public</span>
            </div>
            <h3>Global Market Access</h3>
            <p>Connecting Asian green suppliers with European and American brands through international sustainable sourcing channels</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Brief -->
    <section class="section section--alt">
      <div class="container">
        <div class="about-brief">
          <div class="about-brief__image">
            <span class="placeholder-illustration material-icons-outlined" style="font-size:120px;color:var(--color-primary-300)">park</span>
          </div>
          <div class="about-brief__content">
            <h2>Driving Asia's Textile<br/>Supply Chain Green Transformation</h2>
            <p>Founded in 2020 and headquartered in Shanghai, GreenSupplyHub is dedicated to building Asia's largest green textile supply chain ecosystem, connecting eco-friendly enterprises across the full industry chain from fiber to finished garment.</p>
            <ul class="about-checklist">
              <li>
                <span class="material-icons-outlined">check_circle</span>
                Covering 12 Asian countries including China, Japan, Korea, Vietnam, Thailand, India, and Indonesia
              </li>
              <li>
                <span class="material-icons-outlined">check_circle</span>
                Integrated with 20+ international certification standards including GOTS, OEKO-TEX, and GRS
              </li>
              <li>
                <span class="material-icons-outlined">check_circle</span>
                Facilitated over 1,500 trade matching and business meetings
              </li>
              <li>
                <span class="material-icons-outlined">check_circle</span>
                Publishing 10+ industry reports and hosting 50+ events annually
              </li>
            </ul>
            <a href="#/about" class="btn btn--primary">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Suppliers -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Members</h2>
          <p>Asia's top-tier green textile suppliers</p>
        </div>
        <div class="grid grid--3">
          ${suppliers.slice(0, 6).map(s => `
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
                  ${s.certifications.slice(0, 3).map(c => `<span class="badge badge--green">${c}</span>`).join('')}
                  ${s.certifications.length > 3 ? `<span class="badge">+${s.certifications.length - 3}</span>` : ''}
                </div>
              </div>
              <div class="supplier-card__footer">
                <span class="supplier-card__products">
                  <span class="material-icons-outlined" style="font-size:16px">inventory_2</span>
                  ${s.products.length} Products
                </span>
                <span class="badge badge--gold">${s.category}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#/suppliers" class="btn btn--secondary btn--lg">View All Suppliers</a>
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <h2>Latest News</h2>
          <p>Stay updated on green textile industry trends</p>
        </div>
        <div class="news-grid">
          ${latestNews.map(n => `
            <div class="news-card" onclick="window.location.hash='#/news/${n.id}'">
              <div class="news-card__image">
                <span>${n.icon || '📰'}</span>
              </div>
              <div class="news-card__body">
                <span class="card__tag">${n.category}</span>
                <div class="news-card__date">${n.date}</div>
                <h3 class="news-card__title">${n.title}</h3>
                <p class="news-card__excerpt">${n.excerpt}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#/news" class="btn btn--secondary">More News</a>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Partners & Certifications</h2>
          <p>Established partnerships with leading global certification bodies and industry organizations</p>
        </div>
        <div class="partners-strip">
          <span class="partner-logo">OEKO-TEX&reg;</span>
          <span class="partner-logo">GOTS</span>
          <span class="partner-logo">bluesign&reg;</span>
          <span class="partner-logo">GRS</span>
          <span class="partner-logo">BCI</span>
          <span class="partner-logo">ZDHC</span>
          <span class="partner-logo">Higg Index</span>
          <span class="partner-logo">Cradle to Cradle</span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background:linear-gradient(135deg, var(--color-primary-800), var(--color-primary-600));color:white;text-align:center;">
      <div class="container">
        <h2 style="color:white;margin-bottom:var(--space-4)">Join Asia's Largest Green Textile Supply Chain Network</h2>
        <p style="color:rgba(255,255,255,0.7);font-size:var(--text-lg);margin-bottom:var(--space-8);max-width:600px;margin-left:auto;margin-right:auto">
          Partner with 350+ certified member companies to drive sustainable textile industry transformation
        </p>
        <div class="hero-actions">
          <a href="#/join" class="btn btn--accent btn--lg">Apply for Membership</a>
          <a href="#/contact" class="btn btn--secondary btn--lg" style="border-color:rgba(255,255,255,0.3);color:white">Contact Us</a>
        </div>
      </div>
    </section>
  `;

  createHeroParticles();
}

function createHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}
