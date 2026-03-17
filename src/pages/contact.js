/**
 * GreenSupplyHub — Contact Page
 */

export function renderContact() {
  const content = document.getElementById('page-content');

  content.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — reach out anytime</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info-cards">
            <div class="contact-info-card">
              <div class="contact-info-card__icon">
                <span class="material-icons-outlined">location_on</span>
              </div>
              <div>
                <h4>Office Address</h4>
                <p>18F, Green Economy Center, Tower A<br/>Changning District, Shanghai, China</p>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-card__icon">
                <span class="material-icons-outlined">email</span>
              </div>
              <div>
                <h4>Email</h4>
                <p>info@greensupplyhub.asia</p>
                <p style="color:var(--text-tertiary);font-size:var(--text-xs)">Response within 24 hours on business days</p>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-card__icon">
                <span class="material-icons-outlined">phone</span>
              </div>
              <div>
                <h4>Phone</h4>
                <p>+86-21-6888-8888</p>
                <p style="color:var(--text-tertiary);font-size:var(--text-xs)">Mon–Fri 9:00–18:00 (CST)</p>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-card__icon">
                <span class="material-icons-outlined">chat</span>
              </div>
              <div>
                <h4>WeChat Official Account</h4>
                <p>GreenSupplyHub</p>
                <p style="color:var(--text-tertiary);font-size:var(--text-xs)">Follow for industry news and event updates</p>
              </div>
            </div>
          </div>

          <div class="contact-form-card">
            <h3>Send a Message</h3>
            <form id="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Name *</label>
                  <input class="form-input" type="text" placeholder="Your name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Company</label>
                  <input class="form-input" type="text" placeholder="Company name" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input class="form-input" type="email" placeholder="your@email.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Subject</label>
                <select class="form-select">
                  <option value="">Select a topic</option>
                  <option>Membership Inquiry</option>
                  <option>Business Partnership</option>
                  <option>Certification Services</option>
                  <option>Events & Conferences</option>
                  <option>Media & Press</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea class="form-textarea" placeholder="Please describe your inquiry in detail..." required></textarea>
              </div>
              <button type="submit" class="btn btn--primary btn--lg" style="width:100%">
                <span class="material-icons-outlined">send</span>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.showToast('Message sent! We will get back to you shortly.', 'success');
    e.target.reset();
  });
}
