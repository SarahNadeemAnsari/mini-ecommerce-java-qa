(function(){
  function q(s){ return document.querySelector(s); }

  function getAnonCart(){ 
    try { return JSON.parse(localStorage.getItem('mini_cart')) || []; } 
    catch(e){ return []; } 
  }
  
  function clearAnonCart(){ 
    localStorage.removeItem('mini_cart'); 
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = q('#login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = q('#email').value.trim().toLowerCase();
      const password = q('#password').value;
      
      if (!email || !password) return alert('Enter email and password');

      try {
        // Call login API
        const res = await fetch('/mini_ecommerce/api/login.php', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
          const txt = await res.text();
          return alert('Login failed: ' + txt);
        }
        
        const data = await res.json();
        const user = data.user;
        if (!user) return alert('Login failed');

        // Store user locally
        localStorage.setItem('mini_user', JSON.stringify({ 
          id: user.id, 
          email: user.email, 
          name: user.username || user.email.split('@')[0] 
        }));

        // Get anonymous cart
        const anonCart = getAnonCart();

        // If there are anonymous items, merge them into server cart
        if (anonCart.length > 0) {
          try {
            // Fetch current server cart
            const cartRes = await fetch('/mini_ecommerce/api/cart.php', {
              credentials: 'same-origin'
            });
            
            let serverCart = [];
            if (cartRes.ok) {
              const cartData = await cartRes.json();
              serverCart = cartData.cart || [];
            }

            // Merge carts
            const map = {};
            serverCart.forEach(i => map[String(i.id)] = { ...i, qty: Number(i.qty||0) });
            anonCart.forEach(i => {
              const k = String(i.id);
              if (map[k]) map[k].qty = Number(map[k].qty) + Number(i.qty || 0);
              else map[k] = { ...i, qty: Number(i.qty||0) };
            });
            const merged = Object.values(map);

            // Save merged cart to server
            await fetch('/mini_ecommerce/api/cart.php', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({ cart: merged })
            });
          } catch(err){
            console.warn('Cart merge error', err);
          }
        }

        // Clear anonymous cart
        clearAnonCart();

        // Redirect to cart
        const returnTo = sessionStorage.getItem('return_to') || 'cart.html';
        sessionStorage.removeItem('return_to');
        window.location.href = returnTo;
      } catch (err) {
        console.error('Login error:', err);
        alert('Error: ' + err.message);
      }
    });
  });
})();