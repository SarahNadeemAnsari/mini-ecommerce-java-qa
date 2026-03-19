// add this in index.html, products.html, product.html, cart.html, login.html (before other page scripts)
// <script src="js/nav.js"></script>

(function(){
  function q(s){ return document.querySelector(s); }
  async function getSession(){
    try {
      const r = await fetch('/mini_ecommerce/api/session.php', { credentials: 'same-origin' });
      if (!r.ok) return null;
      const j = await r.json();
      return j.user || null;
    } catch(e){ return null; }
  }
  function buildNode(user){
    const nav = q('header .container nav');
    if (!nav) return;
    const existing = nav.querySelector('.nav-user');
    if (existing) existing.remove();
    const div = document.createElement('div');
    div.className = 'nav-user';
    div.style.marginLeft = '18px';
    div.style.display = 'inline-block';
    div.style.verticalAlign = 'middle';
    if (user) {
      div.innerHTML = `<span style="color:var(--accent);font-weight:600;margin-right:8px">${escapeHtml(user.email || user.name || 'User')}</span>
                       <a href="#" id="logout-link" style="color:#333;text-decoration:none;margin-left:6px">Logout</a>`;
    } else {
      div.innerHTML = `<a href="login.html" style="color:#333;text-decoration:none">Login</a>`;
    }
    nav.appendChild(div);
    const logout = q('#logout-link');
    if (logout) {
      logout.addEventListener('click', async (e) => {
        e.preventDefault();
        try { await fetch('/mini_ecommerce/api/logout.php', { method:'POST', credentials:'same-origin' }); } catch(e){}
        localStorage.removeItem('mini_user');
        window.location.reload();
      });
    }
  }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  document.addEventListener('DOMContentLoaded', async () => {
    const user = await getSession() || (() => { try { return JSON.parse(localStorage.getItem('mini_user')); } catch(e){return null;} })();
    buildNode(user);
  });
})();