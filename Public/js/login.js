$(function() {
    const loginFormHandler = async (event) => {
      event.preventDefault();
  
      // Collect values from the login form
      const username = document.querySelector('#usename-login').value.trim();       
      const password = document.querySelector('#password-login').value.trim();
  
      if (username && password) {         
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // If successful, redirect the browser to their dashboard 
          document.location.replace('/dasboard');
        } else {
          alert(response.statusText);
        }
      }
    };  
    $( ".login-form" ).on( "submit", loginFormHandler)
  });