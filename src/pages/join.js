/**
 * GreenSupplyHub — Join / Apply Page
 */

export function renderJoin() {
  const content = document.getElementById('page-content');
  let currentStep = 1;

  content.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>Join GreenSupplyHub</h1>
        <p>Become a member of Asia's green textile supply chain network and expand your sustainable journey</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="join-form-wrapper">
          <div class="join-steps" id="join-steps">
            <div class="join-step active" data-step="1">
              <div class="join-step__number">1</div>
              <span class="join-step__label">Company Info</span>
            </div>
            <div class="join-step__line"></div>
            <div class="join-step" data-step="2">
              <div class="join-step__number">2</div>
              <span class="join-step__label">Certifications</span>
            </div>
            <div class="join-step__line"></div>
            <div class="join-step" data-step="3">
              <div class="join-step__number">3</div>
              <span class="join-step__label">Confirm & Submit</span>
            </div>
          </div>

          <form id="join-form">
            <!-- Step 1: Company Info -->
            <div class="join-form-step" id="step-1">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Company Name *</label>
                  <input class="form-input" type="text" placeholder="e.g. GreenSilk Textile Co., Ltd." required />
                </div>
                <div class="form-group">
                  <label class="form-label">Trading Name</label>
                  <input class="form-input" type="text" placeholder="e.g. GreenSilk" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Industry Category *</label>
                  <select class="form-select" required>
                    <option value="">Please select</option>
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
                    <option>Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Company Size</label>
                  <select class="form-select">
                    <option value="">Please select</option>
                    <option>Under 50</option>
                    <option>50–100</option>
                    <option>100–300</option>
                    <option>300–500</option>
                    <option>500–1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Country / Region *</label>
                  <select class="form-select" required>
                    <option value="">Please select</option>
                    <option>China</option>
                    <option>Japan</option>
                    <option>South Korea</option>
                    <option>Vietnam</option>
                    <option>Thailand</option>
                    <option>India</option>
                    <option>Indonesia</option>
                    <option>Bangladesh</option>
                    <option>Myanmar</option>
                    <option>Cambodia</option>
                    <option>Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input class="form-input" type="text" placeholder="e.g. Shanghai" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Company Description *</label>
                <textarea class="form-textarea" placeholder="Briefly describe your core business, competitive advantages, and green/eco practices..." required></textarea>
              </div>
            </div>

            <!-- Step 2: Certifications -->
            <div class="join-form-step" id="step-2" style="display:none">
              <div class="form-group">
                <label class="form-label">Certifications Held (select all that apply)</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
                  ${['GOTS', 'OEKO-TEX', 'GRS', 'bluesign', 'BCI', 'ZDHC', 'ISO 14001', 'ISO 9001', 'WRAP', 'SA8000', 'Higg FEM', 'Fairtrade', 'Cradle to Cradle', 'Other'].map(cert => `
                    <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);cursor:pointer">
                      <input type="checkbox" value="${cert}" />
                      ${cert}
                    </label>
                  `).join('')}
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Main Products / Services</label>
                <textarea class="form-textarea" placeholder="List your main products or services, separated by commas"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Contact Person *</label>
                  <input class="form-input" type="text" placeholder="Full name" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Job Title</label>
                  <input class="form-input" type="text" placeholder="e.g. Marketing Director" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Contact Email *</label>
                  <input class="form-input" type="email" placeholder="your@company.com" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input class="form-input" type="tel" placeholder="+86-xxx-xxxx-xxxx" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Company Website</label>
                <input class="form-input" type="url" placeholder="https://www.example.com" />
              </div>
            </div>

            <!-- Step 3: Confirm -->
            <div class="join-form-step" id="step-3" style="display:none">
              <div style="text-align:center;padding:var(--space-8) 0">
                <span class="material-icons-outlined" style="font-size:64px;color:var(--color-primary-500)">fact_check</span>
                <h3 style="margin:var(--space-4) 0">Confirm Your Application</h3>
                <p style="max-width:400px;margin:0 auto">
                  Please verify all information is correct. After submission, our team will review your application within 3 business days and notify you via email.
                </p>
              </div>
              <div style="padding:var(--space-6);background:var(--color-primary-50);border-radius:var(--radius-lg);margin-bottom:var(--space-6)">
                <h4 style="margin-bottom:var(--space-3);font-size:var(--text-sm)">Member Benefits</h4>
                <ul style="list-style:none;display:grid;gap:var(--space-2)">
                  <li style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary)">
                    <span class="material-icons-outlined" style="font-size:16px;color:var(--color-primary-500)">check</span>
                    Company profile showcased on the platform for targeted inquiries
                  </li>
                  <li style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary)">
                    <span class="material-icons-outlined" style="font-size:16px;color:var(--color-primary-500)">check</span>
                    Access to industry summits and trade matching events
                  </li>
                  <li style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary)">
                    <span class="material-icons-outlined" style="font-size:16px;color:var(--color-primary-500)">check</span>
                    Exclusive industry reports and market analysis
                  </li>
                  <li style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--text-secondary)">
                    <span class="material-icons-outlined" style="font-size:16px;color:var(--color-primary-500)">check</span>
                    Free eco-certification training and workshops
                  </li>
                </ul>
              </div>
              <label style="display:flex;align-items:flex-start;gap:var(--space-2);font-size:var(--text-sm);cursor:pointer">
                <input type="checkbox" id="agree-terms" style="margin-top:3px" />
                I have read and agree to the GreenSupplyHub <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn--ghost" id="btn-prev" style="visibility:hidden">
                <span class="material-icons-outlined">arrow_back</span>
                Previous
              </button>
              <button type="button" class="btn btn--primary btn--lg" id="btn-next">
                Next
                <span class="material-icons-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  function showStep(step) {
    currentStep = step;
    document.querySelectorAll('.join-form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';

    document.querySelectorAll('.join-step').forEach(el => {
      const s = parseInt(el.dataset.step);
      el.classList.remove('active', 'completed');
      if (s === step) el.classList.add('active');
      if (s < step) el.classList.add('completed');
    });

    btnPrev.style.visibility = step > 1 ? 'visible' : 'hidden';

    if (step === 3) {
      btnNext.innerHTML = '<span class="material-icons-outlined">check</span> Submit Application';
    } else {
      btnNext.innerHTML = 'Next <span class="material-icons-outlined">arrow_forward</span>';
    }
  }

  btnNext.addEventListener('click', () => {
    if (currentStep < 3) {
      showStep(currentStep + 1);
    } else {
      const agreed = document.getElementById('agree-terms').checked;
      if (!agreed) {
        window.showToast('Please agree to the Terms of Service and Privacy Policy', 'warning');
        return;
      }
      window.showToast('Application submitted! We will review within 3 business days.', 'success');
      setTimeout(() => { window.location.hash = '#/'; }, 2000);
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 1) showStep(currentStep - 1);
  });
}
