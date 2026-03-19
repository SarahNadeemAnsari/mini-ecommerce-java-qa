(function(){
  function q(s){ return document.querySelector(s); }

  document.addEventListener('DOMContentLoaded', () => {
    const form = q('#signup-form');
    if (!form) {
      console.error('Signup form not found');
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const username = q('#username').value.trim();
      const email = q('#email').value.trim().toLowerCase();
      const password = q('#password').value;
      const passwordConfirm = q('#password-confirm').value;

      // Validation
      if (!username || !email || !password) {
        alert('Fill all fields');
        return;
      }
      if (password !== passwordConfirm) {
        alert('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }

      try {
        const res = await fetch('/mini_ecommerce/api/signup.php', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        
        if (!res.ok) {
          alert('Signup failed: ' + (data.error || 'Unknown error'));
          return;
        }

        alert('Account created! Redirecting to login...');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      } catch (err) {
        console.error('Signup error:', err);
        alert('Error: ' + err.message);
      }
    });
  });
})();