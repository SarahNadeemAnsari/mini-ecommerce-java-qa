(function(){
  const ANON_KEY = 'mini_cart';
  function q(sel){ return document.querySelector(sel); }
  function format(n){ return 'Rs ' + Number(n || 0).toFixed(2); }

  async function isAuthed(){
    try {
      const r = await fetch('/mini_ecommerce/api/session.php', { credentials: 'same-origin' });
      return r.ok;
    } catch(e){ return false; }
  }

  async function loadServerCart(){
    const r = await fetch('/mini_ecommerce/api/cart.php', { credentials: 'same-origin' });
    if (!r.ok) return [];
    const json = await r.json();
    return json.cart || [];
  }

  function loadAnonCart(){
    try { return JSON.parse(localStorage.getItem(ANON_KEY)) || []; } catch(e){ return []; }
  }

  async function loadCart(){
    const authed = await isAuthed();
    if (authed) {
      return await loadServerCart();
    } else {
      return loadAnonCart();
    }
  }

  async function saveCart(cart){
    const authed = await isAuthed();
    if (authed) {
      await fetch('/mini_ecommerce/api/cart.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ cart })
      });
    } else {
      localStorage.setItem(ANON_KEY, JSON.stringify(cart));
    }
    renderCart();
  }

  function calcTotals(cart){
    const items = cart.reduce((sum, it) => sum + (Number(it.price || 0) * Number(it.qty || 0)), 0);
    const shipping = items > 0 && items < 1000 ? 50 : 0;
    return { itemsCount: cart.reduce((c, i) => c + Number(i.qty||0), 0), subtotal: items, shipping };
  }

  async function renderCart(){
    const cart = await loadCart();
    const container = q('#cart-items');
    const empty = q('#cart-empty');
    const grid = q('#cart-grid');

    const localUser = (() => { try { return JSON.parse(localStorage.getItem('mini_user')); } catch(e){return null;} })();
    if (localUser) {
      const header = q('.container h1');
      if (header) header.textContent = `Your Cart — ${localUser.name || localUser.email}`;
    }

    if (!cart || !cart.length) {
      if (container) container.innerHTML = '';
      if (empty) empty.style.display = 'block';
      if (grid) grid.style.display = 'none';
      return;
    }

    if (empty) empty.style.display = 'none';
    if (grid) grid.style.display = 'grid';

    container.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      const imgSrc = item.image ? item.image : 'https://via.placeholder.com/300x200?text=No+Image';
      div.innerHTML = `
        <img src="${imgSrc}" alt="${escapeHtml(item.name)}">
        <div class="item-meta">
          <h4>${escapeHtml(item.name)}</h4>
          <p class="kv">Price: <strong>${format(item.price)}</strong></p>
          <p class="kv">Subtotal: <strong class="item-sub">${format(Number(item.price||0)*Number(item.qty||0))}</strong></p>
        </div>
        <div class="item-controls">
          <input class="qty-input" type="number" min="1" value="${Number(item.qty||1)}" data-id="${escapeHtml(item.id)}" />
          <button class="remove-btn" data-id="${escapeHtml(item.id)}">Remove</button>
        </div>
      `;
      container.appendChild(div);
    });

    container.querySelectorAll('.qty-input').forEach(inp => {
      inp.addEventListener('change', async (e) => {
        let v = parseInt(e.target.value,10);
        if (!v || v < 1) v = 1;
        e.target.value = v;
        const id = e.target.dataset.id;
        const cur = await loadCart();
        const idx = cur.findIndex(i => String(i.id) === String(id));
        if (idx > -1) {
          cur[idx].qty = v;
          await saveCart(cur);
        }
      });
    });

    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        let cur = await loadCart();
        cur = cur.filter(i => String(i.id) !== String(id));
        await saveCart(cur);
      });
    });

    const totals = calcTotals(cart);
    q('#summary-count').textContent = totals.itemsCount;
    q('#summary-sub').textContent = format(totals.subtotal);
    q('#summary-ship').textContent = format(totals.shipping);
    q('#summary-total').textContent = format(totals.subtotal + totals.shipping);
  }

  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const checkout = q('#checkout-btn');
    const clearBtn = q('#clear-btn');

    if (clearBtn) clearBtn.addEventListener('click', async () => {
      const authed = await isAuthed();
      if (authed) {
        await fetch('/mini_ecommerce/api/cart.php', { method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart: [] })});
      } else {
        localStorage.removeItem(ANON_KEY);
      }
      renderCart();
    });

    if (checkout) checkout.addEventListener('click', async () => {
      const cart = await loadCart();
      if (!cart.length) return alert('Cart is empty');
      const authed = await isAuthed();
      if (authed) {
        await fetch('/mini_ecommerce/api/cart.php', { method:'POST', credentials:'same-origin', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ cart: [] })});
      } else {
        localStorage.removeItem(ANON_KEY);
      }
      renderCart();
      alert('Order placed (demo). Thank you!');
    });
  });
})();