(function(){
  const API_BASE = '/mini_ecommerce/api';
  function q(s){ return document.querySelector(s); }
  function placeholder() {
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect fill="%23f3f4f6" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23777" font-family="Arial" font-size="20">No Image</text></svg>';
  }
  function normalizeImg(img) {
    img = String(img || '').trim();
    if (!img) return placeholder();
    if (/^(?:https?:)?\/\//i.test(img) || img.startsWith('/')) return img;
    if (img.startsWith('images/')) return '/mini_ecommerce/static/' + img;
    return '/mini_ecommerce/static/images/' + img;
  }

  async function isAuthed(){
    try {
      const r = await fetch(API_BASE + '/session.php', { credentials: 'same-origin' });
      return r.ok;
    } catch(e){ return false; }
  }

  async function loadServerCart(){
    try {
      const r = await fetch(API_BASE + '/cart.php', { credentials: 'same-origin' });
      if (!r.ok) return [];
      const j = await r.json();
      return j.cart || [];
    } catch(e){ return []; }
  }

  function loadAnonCart(){
    try { return JSON.parse(localStorage.getItem('mini_cart')) || []; } catch(e){ return []; }
  }

  async function saveServerCart(cart){
    await fetch(API_BASE + '/cart.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ cart })
    });
  }

  function saveAnonCart(cart){
    localStorage.setItem('mini_cart', JSON.stringify(cart));
  }

  async function addToCartOnline(item){
    const cart = await loadServerCart();
    const idx = cart.findIndex(i => String(i.id) === String(item.id));
    if (idx > -1) cart[idx].qty = Number(cart[idx].qty) + Number(item.qty);
    else cart.push(item);
    await saveServerCart(cart);
    return cart; // Return the updated cart
  }

  function addToCartLocal(item){
    const cart = loadAnonCart();
    const idx = cart.findIndex(i => String(i.id) === String(item.id));
    if (idx > -1) cart[idx].qty = Number(cart[idx].qty) + Number(item.qty);
    else cart.push(item);
    saveAnonCart(cart);
    return cart; // Return the updated cart
  }

  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function getIdFromUrl(){ return new URLSearchParams(window.location.search).get('id'); }

  async function loadProduct(id){
    const nameEl = q('#product-name');
    if (!id) { if (nameEl) nameEl.textContent = 'Product not found'; return; }
    try {
      const res = await fetch(API_BASE + `/products.php?id=${encodeURIComponent(id)}`);
      if (!res.ok) throw new Error('fetch error');
      const product = await res.json();
      if (!product) { if (nameEl) nameEl.textContent = 'Product not found'; return; }

      q('#product-name') && (q('#product-name').textContent = product.name || '');
      q('#product-description') && (q('#product-description').textContent = product.description || '');
      q('#product-price') && (q('#product-price').textContent = `Rs ${parseFloat(product.price||0).toFixed(2)}`);
      q('#product-stock') && (q('#product-stock').textContent = product.stock != null ? product.stock : '—');
      const img = normalizeImg(product.image_url || product.image || '');
      const imgEl = q('#product-image');
      if (imgEl) { imgEl.src = img; imgEl.alt = product.name || 'Product image'; }

      const addBtn = q('#add-to-cart');
      if (addBtn) {
        addBtn.dataset.pid = product.id;
        addBtn.dataset.name = product.name || '';
        addBtn.dataset.price = product.price || 0;
        addBtn.dataset.image = product.image_url || product.image || '';
      }
    } catch(err){
      console.error('product load error', err);
      if (q('#product-name')) q('#product-name').textContent = 'Error loading product';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const id = getIdFromUrl();
    loadProduct(id);

    const addBtn = q('#add-to-cart');
    if (!addBtn) return;
    addBtn.addEventListener('click', async () => {
      const pid = addBtn.dataset.pid;
      if (!pid) { alert('No product selected'); return; }
      const qtyEl = q('#qty');
      let qty = qtyEl ? parseInt(qtyEl.value,10) : 1;
      if (!qty || qty < 1) qty = 1;

      const item = {
        id: pid,
        name: addBtn.dataset.name || '',
        price: parseFloat(addBtn.dataset.price || 0),
        image: addBtn.dataset.image || '',
        qty: qty
      };

      let updatedCart;
      if (await isAuthed()) {
        updatedCart = await addToCartOnline(item);
      } else {
        updatedCart = addToCartLocal(item);
      }

      // Redirect to cart and ensure it shows updated items
      window.location.href = 'cart.html';
    });
  });
})();
