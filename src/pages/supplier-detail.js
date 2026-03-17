/**
 * GreenSupplyHub — Supplier Detail Page
 */
import { dataService } from '../utils/data-service.js';

export async function renderSupplierDetail(id) {
  const content = document.getElementById('page-content');

  if (!id) {
    window.location.hash = '#/suppliers';
    return;
  }

  const supplier = await dataService.getSupplier(id);

  if (!supplier) {
    content.innerHTML = `
      <section class="section text-center">
        <div class="container">
          <span class="material-icons-outlined" style="font-size:80px;color:var(--text-tertiary)">search_off</span>
          <h2 class="mt-4">Supplier Not Found</h2>
          <p>Please return to the supplier list and try again</p>
          <a href="#/suppliers" class="btn btn--primary mt-4">Back to List</a>
        </div>
      </section>
    `;
    return;
  }

  content.innerHTML = `
    <section class="supplier-detail">
      <div class="container">
        <a href="#/suppliers" class="btn btn--ghost mb-8" style="display:inline-flex">
          <span class="material-icons-outlined">arrow_back</span>
          Back to Suppliers
        </a>

        <div class="supplier-detail__header">
          <div class="supplier-detail__logo">${supplier.shortName.slice(0, 2)}</div>
          <div class="supplier-detail__info">
            <h1>${supplier.name}</h1>
            <p style="margin:0;font-size:var(--text-sm);color:var(--text-tertiary)">${supplier.nameEn}</p>
            <div class="supplier-detail__meta">
              <span class="supplier-detail__meta-item">
                <span class="material-icons-outlined" style="font-size:18px;color:var(--color-primary-500)">location_on</span>
                ${supplier.region}
              </span>
              <span class="supplier-detail__meta-item">
                <span class="material-icons-outlined" style="font-size:18px;color:var(--color-primary-500)">business</span>
                Founded ${supplier.founded}
              </span>
              <span class="supplier-detail__meta-item">
                <span class="material-icons-outlined" style="font-size:18px;color:var(--color-primary-500)">group</span>
                ${supplier.employees} Employees
              </span>
              <span class="supplier-detail__meta-item">
                <span class="material-icons-outlined" style="font-size:18px;color:var(--color-primary-500)">category</span>
                ${supplier.category}
              </span>
            </div>
            <div class="supplier-detail__badges">
              ${supplier.certifications.map(c => `<span class="badge badge--green">${c}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="detail-grid">
          <div class="detail-main">
            <div class="detail-section">
              <h2>Company Overview</h2>
              <p style="line-height:var(--leading-relaxed);color:var(--text-secondary)">${supplier.description}</p>
            </div>

            <div class="detail-section">
              <h2>Products & Services</h2>
              <div class="product-tags">
                ${supplier.products.map(p => `<span class="chip active">${p}</span>`).join('')}
              </div>
            </div>

            <div class="detail-section">
              <h2>Certification Details</h2>
              <div class="grid grid--2" style="gap:var(--space-4)">
                ${supplier.certifications.map(c => `
                  <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);background:var(--color-primary-50);border-radius:var(--radius-lg)">
                    <span class="material-icons-outlined" style="color:var(--color-primary-600)">verified</span>
                    <div>
                      <strong style="font-size:var(--text-sm)">${c}</strong>
                      <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin:0">${getCertDescription(c)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="detail-sidebar">
            <div class="card">
              <h4 style="margin-bottom:var(--space-4)">Contact Information</h4>
              <ul class="contact-list">
                <li>
                  <span class="material-icons-outlined">language</span>
                  <a href="${supplier.website}" target="_blank">${supplier.website ? 'Visit Website' : 'N/A'}</a>
                </li>
                <li>
                  <span class="material-icons-outlined">email</span>
                  <a href="mailto:${supplier.email}">${supplier.email}</a>
                </li>
                <li>
                  <span class="material-icons-outlined">phone</span>
                  <a href="tel:${supplier.phone}">${supplier.phone}</a>
                </li>
                <li>
                  <span class="material-icons-outlined">location_on</span>
                  <span>${supplier.address}</span>
                </li>
              </ul>
              <button class="btn btn--primary" style="width:100%;margin-top:var(--space-4)" onclick="window.showToast('Contact request sent! The supplier will respond shortly.')">
                <span class="material-icons-outlined">mail</span>
                Contact Supplier
              </button>
            </div>

            <div class="card">
              <h4 style="margin-bottom:var(--space-4)">Quick Facts</h4>
              <div style="display:grid;gap:var(--space-3)">
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Industry</span>
                  <strong>${supplier.category}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Region</span>
                  <strong>${supplier.region}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Founded</span>
                  <strong>${supplier.founded}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Size</span>
                  <strong>${supplier.employees} Employees</strong>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Products</span>
                  <strong>${supplier.products.length} Types</strong>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-sm)">
                  <span style="color:var(--text-tertiary)">Certifications</span>
                  <strong>${supplier.certifications.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getCertDescription(cert) {
  const descriptions = {
    'GOTS': 'Global Organic Textile Standard',
    'OEKO-TEX': 'International Eco-Textile Certification',
    'GRS': 'Global Recycled Standard',
    'BCI': 'Better Cotton Initiative',
    'bluesign': 'bluesign® Textile Eco-Certification',
    'ZDHC': 'Zero Discharge of Hazardous Chemicals',
    'ISO 14001': 'Environmental Management System',
    'ISO 9001': 'Quality Management System',
    'WRAP': 'Worldwide Responsible Accredited Production',
    'SA8000': 'Social Accountability Standard',
    'Higg FEM': 'Higg Facility Environmental Module',
    'Fairtrade': 'Fairtrade Certification',
    'FSC': 'Forest Stewardship Council',
    'OCS': 'Organic Content Standard',
    'RCS': 'Recycled Claim Standard',
    'STeP': 'Sustainable Textile Production',
    'CNAS Accredited': 'China National Accreditation Service',
    'CMA Certified': 'China Metrology Accreditation',
    'ILAC-MRA': 'International Laboratory Accreditation Cooperation',
    'Ocean Bound Plastic': 'Ocean Bound Plastic Certification',
  };
  return descriptions[cert] || 'International Industry Certification';
}
