

    const loginFormHandler = async (event) => {
      event.preventDefault();
  
      // Collect values from the login form
      const username = document.querySelector('#usename-login');     
      const password = document.querySelector('#password-login');
  
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

    const signupFormHandler = async (event) => {
      event.preventDefault();
  
      const username = document.querySelector('#username-signup');      
      const password = document.querySelector('#password-signup');
  
      if (username && password) {                                  
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
    };
    
document.querySelector( ".login-form" ).addEventListener( "submit", loginFormHandler);

   





