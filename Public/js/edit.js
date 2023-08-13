$(function() {
    const editFormHandler = async (event) => {
        event.preventDefault();
    
        const postName = document.querySelector('input[name="post-title"]').value;         
        const postInformation = document.querySelector('textarea[name="post-body"]').value;
    
        if (username && password) {                                  
          const response = await fetch('/api/post/${postId}', {
            method: 'PUT',
            body: JSON.stringify({ postName, postInformation }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert(response.statusText);
          }
        }
        document.location.replace('/dashboard');
      };
    
      const showSignupForm = async(e) =>{
        e.preventDefault();
    
        $(".signupButton").hide();
        $(".signupPage").show();
      }
    
      $( ".edit-form" ).on( "submit", editFormHandler)
      $( ".signup-form" ).on( "submit", signupFormHandler)
      $(".signupButton").click(showSignupForm)
    });