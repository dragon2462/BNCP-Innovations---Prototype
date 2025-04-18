  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Password match check
    if (password !== confirmPassword) {
      let errorElement = document.getElementById('error_message');
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'error_message';
        errorElement.style.color = 'red';
        errorElement.style.marginTop = '5px';
        const confirmInput = document.getElementById('confirm_password');
        confirmInput.parentNode.insertBefore(errorElement, confirmInput.nextSibling);
      }
      errorElement.textContent = 'Passwords do not match. Please try again.';
    } else {
      // Remove any previous error message
      const existingError = document.getElementById('error_message');
      if (existingError) {
        existingError.remove();
      }

      // Simulate successful user creation and redirect
      window.location.href = 'user.html';
    }
  });
