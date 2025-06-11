document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Grab elements ---------- */
    const registerButton = document.getElementById('registerButton');
    const popup = document.getElementById('registerPopup');
    const closeBtn = popup.querySelector('.close-btn');
    const registerForm = document.getElementById('registerForm');
    
    // Create user profile container
    const profileContainer = document.createElement('div');
    profileContainer.setAttribute('class', 'profile-container');
    profileContainer.style.display = 'none'; // Hidden by default
    profileContainer.style.position = 'relative';
    profileContainer.style.marginLeft = '10px';
    
    // Create profile picture element
    const profilePic = document.createElement('div');
    profilePic.setAttribute('class', 'profile-pic');
    profilePic.style.width = '29px';
    profilePic.style.height = '27px';
    profilePic.style.borderRadius = '50%';
    profilePic.style.backgroundColor = 'rgb(36, 36, 113)';
    profilePic.style.color = 'white';
    profilePic.style.display = 'flex';
    profilePic.style.alignItems = 'center';
    profilePic.style.justifyContent = 'center';
    profilePic.style.cursor = 'pointer';
    profilePic.style.fontSize = '16px';
    profilePic.style.fontWeight = 'bold';
    
    // Create logout button - IMPROVED POSITIONING
    const logoutBtn = document.createElement('button');
    logoutBtn.setAttribute('class', 'logout-btn');
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.position = 'absolute';
    logoutBtn.style.top = '40px'; // Adjusted to be closer to profile pic
    logoutBtn.style.left = '50%'; // Center align with profile pic
    logoutBtn.style.transform = 'translateX(-50%)'; // Center perfectly
    logoutBtn.style.display = 'none';
    logoutBtn.style.padding = '5px 10px';
    logoutBtn.style.backgroundColor = '#f44336';
    logoutBtn.style.color = 'white';
    logoutBtn.style.border = 'none';
    logoutBtn.style.borderRadius = '4px';
    logoutBtn.style.cursor = 'pointer';
    logoutBtn.style.zIndex = '100'; // Ensure it appears above other elements
    logoutBtn.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    logoutBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'; // Add subtle shadow
    
    // Add elements to DOM
    profileContainer.appendChild(profilePic);
    profileContainer.appendChild(logoutBtn);
    registerButton.parentNode.insertBefore(profileContainer, registerButton.nextSibling);
    
    /* ---------- 1. Load saved user (if any) ---------- */
    const savedUser = JSON.parse(localStorage.getItem('UserDetails') || '{}');
    registerButton.textContent = savedUser.name ? 'Account' : 'Register';
    
    // Show profile if user is logged in
    if (savedUser.name) {
      registerButton.style.display = 'none';
      profileContainer.style.display = 'block';
      profilePic.textContent = savedUser.name.charAt(0).toUpperCase();
    }
    
    /* ---------- 2. Open popup on click ---------- */
    registerButton.addEventListener('click', e => {
      const currentUser = JSON.parse(localStorage.getItem('UserDetails') || '{}');
      if (currentUser.name) return; // already logged in → do nothing
      
      e.preventDefault();
      popup.style.display = 'flex';
    });
    
    /* ---------- 3. Close popup ---------- */
    closeBtn.addEventListener('click', () => (popup.style.display = 'none'));
    popup.addEventListener('click', e => {
      if (e.target === popup) popup.style.display = 'none'; // click backdrop
    });
    
    /* ---------- 4. Handle registration submit ---------- */
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const name = registerForm.querySelector('#name').value.trim();
      const email = registerForm.querySelector('#email').value.trim();
      const password = registerForm.password.value;
      const confirm = registerForm.confirmPassword.value;
      
      // Check if role selection exists before trying to access it
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
      
      // Hide register button, show profile
      registerButton.style.display = 'none';
      profileContainer.style.display = 'block';
      profilePic.textContent = name.charAt(0).toUpperCase();
      
      alert('Registration successful!');
      if (role === 'teacher') {
        window.location.href = 'teacher.html';
      } else {
        popup.style.display = 'none';
        registerForm.reset();
      }
    });
    
    /* ---------- 5. Handle profile click ---------- */
    profilePic.addEventListener('click', () => {
      // Toggle logout button visibility
      logoutBtn.style.display = logoutBtn.style.display === 'none' ? 'block' : 'none';
    });
    
    /* ---------- 6. Handle logout ---------- */
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('UserDetails');
      
      // Hide profile, show register button
      profileContainer.style.display = 'none';
      registerButton.style.display = 'block';
      registerButton.textContent = 'Register';
      
      // Hide logout button
      logoutBtn.style.display = 'none';
      
      alert('Logged out successfully!');
    });
    
    // Hide logout button when clicking elsewhere
    document.addEventListener('click', (e) => {
      if (!profileContainer.contains(e.target)) {
        logoutBtn.style.display = 'none';
      }
    });
  });