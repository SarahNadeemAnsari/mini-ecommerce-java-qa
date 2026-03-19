(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const apiBase = '/mini_ecommerce/api/products.php';
    const featuredEl = document.getElementById('featured-products');
    const productsContainer = document.getElementById('products-container');

    function normalizeImg(img) {
      img = String(img || '').trim();
      if (!img) return 'https://via.placeholder.com/300x200?text=No+Image';
      if (/^(?:https?:)?\/\//i.test(img) || img.startsWith('/')) return img;
      if (img.startsWith('images/')) return '/mini_ecommerce/static/' + img;
      return '/mini_ecommerce/static/images/' + img;
    }

    function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

    if (featuredEl) {
      fetch(apiBase + '?limit=4')
        .then(res => res.ok ? res.json() : Promise.reject(res.status + ' ' + res.statusText))
        .then(products => {
          if (!products || products.length === 0) { featuredEl.innerHTML = '<p>No products found.</p>'; return; }
          featuredEl.innerHTML = products.map(p => {
            const img = normalizeImg(p.image_url || p.image || '');
            return `
              <div class="card">
                <img loading="lazy" src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}">
                <h4>${escapeHtml(p.name)}</h4>
                <p class="price">Rs ${parseFloat(p.price||0).toFixed(2)}</p>
                <a class="btn small" href="product.html?id=${p.id}">View</a>
              </div>
            `;
          }).join('');
        })
        .catch(err => { console.error('featured load error', err); featuredEl.innerHTML = '<p>Error loading products.</p>'; });
    }

    if (productsContainer) {
      fetch(apiBase)
        .then(res => res.ok ? res.json() : Promise.reject(res.status + ' ' + res.statusText))
        .then(products => {
          if (!products || products.length === 0) { productsContainer.innerHTML = '<p>No products found.</p>'; return; }
          productsContainer.innerHTML = products.map(p => {
            const img = normalizeImg(p.image_url || p.image || '');
            return `
              <div class="product-card">
                <a class="product-link" href="product.html?id=${p.id}">
                  <img loading="lazy" src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}">
                  <h3>${escapeHtml(p.name)}</h3>
                  <p class="desc">${escapeHtml(p.description || '')}</p>
                  <p class="price"><strong>Rs ${parseFloat(p.price||0).toFixed(2)}</strong></p>
                </a>
              </div>
            `;
          }).join('');
        })
        .catch(err => { console.error('products load error', err); productsContainer.innerHTML = '<p>Error loading products.</p>'; });
    }
  });
})();

fetch("http://localhost/mini_ecommerce/api/products.php")
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
          <img src="${product.image_url}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Rs ${product.price}</strong></p>
        </a>
      `;

      container.appendChild(card);
    });
  }) 