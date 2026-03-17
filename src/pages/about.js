/**
 * GreenSupplyHub — About Page
 */

export function renderAbout() {
  const content = document.getElementById('page-content');

  content.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>About GreenSupplyHub</h1>
        <p>Pioneering Asia's textile supply chain green transformation</p>
      </div>
    </section>

    <!-- Mission -->
    <section class="section">
      <div class="container">
        <div class="about-brief">
          <div class="about-brief__content" style="order:1">
            <h2>Our Mission</h2>
            <p>
              GreenSupplyHub is dedicated to building Asia's largest green textile supply chain ecosystem. We connect eco-friendly enterprises across the full industry chain — from fiber to finished garment — driving sustainable transformation in the textile industry.
            </p>
            <p>
              By integrating supplier resources, certification data, industry insights, and trade matching services, we help brands find trusted green supply partners while empowering suppliers to enhance their eco-capabilities and expand into global markets.
            </p>
            <div style="display:flex;gap:var(--space-6);margin-top:var(--space-6)">
              <div class="stat-card" style="padding:var(--space-4)">
                <div class="stat-card__number" style="font-size:var(--text-3xl)">350+</div>
                <div class="stat-card__label">Certified Members</div>
              </div>
              <div class="stat-card" style="padding:var(--space-4)">
                <div class="stat-card__number" style="font-size:var(--text-3xl)">12</div>
                <div class="stat-card__label">Countries</div>
              </div>
              <div class="stat-card" style="padding:var(--space-4)">
                <div class="stat-card__number" style="font-size:var(--text-3xl)">1500+</div>
                <div class="stat-card__label">Trade Matches</div>
              </div>
            </div>
          </div>
          <div class="about-brief__image" style="order:2">
            <span class="material-icons-outlined" style="font-size:120px;color:var(--color-primary-300)">diversity_3</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <h2>Core Values</h2>
          <p>Four guiding principles that drive everything we do</p>
        </div>
        <div class="grid grid--4">
          <div class="feature-card">
            <div class="feature-card__icon" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9)">
              <span class="material-icons-outlined">eco</span>
            </div>
            <h3>Green First</h3>
            <p>Environmental sustainability is our primary criterion for evaluating all partnerships</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon" style="background:linear-gradient(135deg,#E3F2FD,#BBDEFB)">
              <span class="material-icons-outlined" style="color:#1565C0">transparency</span>
            </div>
            <h3>Transparency</h3>
            <p>Advocating full supply chain transparency to build industry-wide trust</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon" style="background:linear-gradient(135deg,#FFF8E1,#FFE082)">
              <span class="material-icons-outlined" style="color:#F57F17">lightbulb</span>
            </div>
            <h3>Innovation-Driven</h3>
            <p>Promoting eco-technology innovation and green production process development</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon" style="background:linear-gradient(135deg,#FCE4EC,#F8BBD0)">
              <span class="material-icons-outlined" style="color:#C62828">favorite</span>
            </div>
            <h3>Responsibility</h3>
            <p>Practicing social responsibility, promoting fair trade and worker welfare</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Our Journey</h2>
          <p>From concept to industry benchmark</p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2020</div>
              <h3>Platform Founded</h3>
              <p>GreenSupplyHub officially established in Shanghai, dedicated to building Asia's green textile supply chain information platform.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2021</div>
              <h3>First Members Onboarded</h3>
              <p>First batch of 50 green textile enterprises from China completed onboarding certification, covering fabric, fiber, and dyeing sectors.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2022</div>
              <h3>Southeast Asia Expansion</h3>
              <p>Business expanded to Vietnam, Thailand, Indonesia and other Southeast Asian countries. Membership surpassed 150. First Asia Green Textile Summit held.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2023</div>
              <h3>Certification System Enhanced</h3>
              <p>Established partnerships with OEKO-TEX, GOTS, bluesign and other international certification bodies. Launched platform certification endorsement system.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2024</div>
              <h3>Pan-Asia Coverage</h3>
              <p>Expanded to Japan, South Korea, India, Bangladesh. Now covering 12 Asian countries and regions with 300+ members.</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__dot"></div>
            <div class="timeline-item__content">
              <div class="timeline-item__year">2025–2026</div>
              <h3>Going Global</h3>
              <p>Released the Asia Textile Carbon Neutrality Roadmap. Launched EU/US brand liaison program, aiming to become the world's #1 green textile supply chain platform.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <h2>Leadership Team</h2>
          <p>Experts in textile industry and sustainable development</p>
        </div>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-card__avatar">
              <span class="material-icons-outlined">person</span>
            </div>
            <div class="team-card__name">James Zhang</div>
            <div class="team-card__role">Founder & CEO</div>
          </div>
          <div class="team-card">
            <div class="team-card__avatar">
              <span class="material-icons-outlined">person</span>
            </div>
            <div class="team-card__name">Grace Lin</div>
            <div class="team-card__role">Chief Operating Officer</div>
          </div>
          <div class="team-card">
            <div class="team-card__avatar">
              <span class="material-icons-outlined">person</span>
            </div>
            <div class="team-card__name">Howard Wang</div>
            <div class="team-card__role">Chief Technology Officer</div>
          </div>
          <div class="team-card">
            <div class="team-card__avatar">
              <span class="material-icons-outlined">person</span>
            </div>
            <div class="team-card__name">Sophie Chen</div>
            <div class="team-card__role">Marketing & Brand Director</div>
          </div>
        </div>
      </div>
    </section>
  `;
}
