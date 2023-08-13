$(function() {
    const signupFormHandler = async (event) => {
        event.preventDefault();
    
        const username = document.querySelector('#username-signup').value.trim();         
        const password = document.querySelector('#password-signup').value.trim();
    
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
    
      const showSignupForm = async(e) =>{
        e.preventDefault();
    
        $(".signupButton").hide();
        $(".signupPage").show();
      }
      
      $( ".signup-form" ).on( "submit", signupFormHandler)
      $(".signupButton").click(showSignupForm)
    });