document.addEventListener('DOMContentLoaded', () => {
  
  const registerButton = document.getElementById('registerButton');
  const popup          = document.getElementById('registerPopup');
  const closeBtn       = popup.querySelector('.close-btn');
  const registerForm   = document.getElementById('registerForm');
  const icon           = document.getElementById('usericon') || document.createElement('i'); 
  
  
  const logout = document.createElement("button");
  logout.setAttribute("class", "logout");
  logout.innerHTML = "Logout";
  logout.style.marginLeft = "10px";
  
  
  const savedUser = JSON.parse(localStorage.getItem('UserDetails') || '{}');
  registerButton.textContent = savedUser.name || 'Register';
  
 
  if (icon.style) {
    icon.style.visibility = savedUser.name ? 'visible' : 'hidden';
  }
  
 
  if (savedUser.name) {
    if (!registerButton.querySelector('.logout')) {
      registerButton.appendChild(logout);
    }
  }
  
  
  registerButton.addEventListener('click', e => {
    const currentUser = JSON.parse(localStorage.getItem('UserDetails') || '{}');
    if (currentUser.name) return;        // already logged in → do nothing
    e.preventDefault();
    popup.style.display = 'flex';
  });
  
  
  closeBtn.addEventListener('click', () => (popup.style.display = 'none'));
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.style.display = 'none'; // click backdrop
  });
  
 
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const name     = registerForm.querySelector('#name').value.trim();
    const email    = registerForm.querySelector('#email').value.trim();
    const password = registerForm.password.value;
    const confirm  = registerForm.confirmPassword.value;
    
    
    let role = 'student'; // Default role
    const roleInput = registerForm.querySelector('input[name="role"]:checked');
    if (roleInput) {
      role = roleInput.value;
    }
    
    if (password !== confirm) {
      alert('Passwords do not match!');
      return;
    }

    const userDetails = { name, email, password, role };
    localStorage.setItem('UserDetails', JSON.stringify(userDetails));

    registerButton.textContent = name;
    
    if (icon.style) {
      icon.style.visibility = 'visible';
    }
    
   
    if (!registerButton.querySelector('.logout')) {
      registerButton.appendChild(logout);
    }
    
    alert('Registration successful!');
    if (role === 'teacher') {
      window.location.href = 'teacher.html'; 
    } else {
      popup.style.display = 'none';
      registerForm.reset();
    }
  });
  
  /* ---------- 5. Handle logout ---------- */
  logout.addEventListener('click', e => {
    e.stopPropagation(); 
    localStorage.removeItem('UserDetails');
    registerButton.textContent = 'Register';

    
    if (icon.style) {
      icon.style.visibility = 'hidden';
    }
    
  
    if (registerButton.contains(logout)) {
      registerButton.removeChild(logout);
    }
    
    alert('Logged out successfully!');
  });
});