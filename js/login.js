document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;

    // Simple role-based logic
    if (email === 'jdoe@newgen.admin' && password === 'admin123') {
      // Redirect admin to admin dashboard
      window.location.href = 'admin.html';
    } else if (email === 'jdoe@gmail.com' && password === 'user123') {
      // Redirect normal user to user account
      window.location.href = 'user.html';
    } else {
      // Show an error message inline under the input
      let errorElement = document.getElementById('error_message');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error_message';
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '10px';
        document.getElementById('loginForm').appendChild(errorElement);
      }
      errorElement.textContent = 'Invalid email or password. Please try again.';
    }
  });