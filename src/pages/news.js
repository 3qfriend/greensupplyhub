/**
 * GreenSupplyHub — News Page
 */
import { dataService } from '../utils/data-service.js';

export async function renderNews(articleId) {
  const content = document.getElementById('page-content');

  if (articleId) {
    return renderNewsDetail(articleId, content);
  }

  const news = await dataService.getNews();
  const categories = ['all', ...new Set(news.map(n => n.category))];

  content.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <h1>Industry News</h1>
        <p>Latest green textile trends, policy updates and market insights</p>
      </div>
    </section>

    <section class="section" style="padding-top:var(--space-6)">
      <div class="container">
        <div class="filters-bar" style="justify-content:flex-start;margin-bottom:var(--space-8)">
          ${categories.map(c => `
            <button class="chip ${c === 'all' ? 'active' : ''}" data-category="${c}">
              ${c === 'all' ? 'All' : c}
            </button>
          `).join('')}
        </div>

        <div class="news-grid" id="news-grid">
          ${renderNewsCards(news)}
        </div>
      </div>
    </section>
  `;

  document.querySelectorAll('.chip[data-category]').forEach(chip => {
    chip.addEventListener('click', async () => {
      document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const category = chip.dataset.category;
      const filtered = category === 'all' ? news : news.filter(n => n.category === category);
      document.getElementById('news-grid').innerHTML = renderNewsCards(filtered);
    });
  });
}

function renderNewsCards(news) {
  if (news.length === 0) {
    return `<div class="text-center" style="grid-column:1/-1;padding:var(--space-16) 0">
      <span class="material-icons-outlined" style="font-size:64px;color:var(--text-tertiary)">article</span>
      <p class="mt-4">No articles found</p>
    </div>`;
  }

  return news.map(n => `
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
  `).join('');
}

async function renderNewsDetail(id, content) {
  const article = await dataService.getNewsItem(id);

  if (!article) {
    content.innerHTML = `
      <section class="section text-center">
        <div class="container">
          <span class="material-icons-outlined" style="font-size:80px;color:var(--text-tertiary)">search_off</span>
          <h2 class="mt-4">Article Not Found</h2>
          <a href="#/news" class="btn btn--primary mt-4">Back to News</a>
        </div>
      </section>
    `;
    return;
  }

  const allNews = await dataService.getNews();
  const related = allNews.filter(n => n.id !== id && n.category === article.category).slice(0, 3);

  content.innerHTML = `
    <section class="section" style="padding-top:var(--space-8)">
      <div class="container container--narrow">
        <a href="#/news" class="btn btn--ghost mb-8" style="display:inline-flex">
          <span class="material-icons-outlined">arrow_back</span>
          Back to News
        </a>

        <article>
          <span class="card__tag">${article.category}</span>
          <h1 style="margin:var(--space-4) 0;font-size:var(--text-3xl)">${article.title}</h1>
          <div style="display:flex;align-items:center;gap:var(--space-6);color:var(--text-tertiary);font-size:var(--text-sm);margin-bottom:var(--space-8);padding-bottom:var(--space-6);border-bottom:1px solid var(--color-neutral-100)">
            <span class="flex gap-2">
              <span class="material-icons-outlined" style="font-size:16px">calendar_today</span>
              ${article.date}
            </span>
            <span class="flex gap-2">
              <span class="material-icons-outlined" style="font-size:16px">person</span>
              ${article.author}
            </span>
          </div>

          <div style="font-size:var(--text-base);line-height:var(--leading-relaxed);color:var(--text-secondary)">
            ${article.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
          </div>
        </article>

        ${related.length > 0 ? `
          <div style="margin-top:var(--space-16);padding-top:var(--space-8);border-top:1px solid var(--color-neutral-100)">
            <h3 style="margin-bottom:var(--space-6)">Related Articles</h3>
            <div class="news-grid">
              ${renderNewsCards(related)}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
