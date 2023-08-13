$(function() {
    const postId = document.querySelector('input[name="post-Id"]').value;
    console.log(postId)

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
    
    const deleteClickHandler = async(e) => {
        await fetch('/api/post/${postId}', {
            method: 'DELETE'
        });
        document.location.replace('/dashboard');
    };
    
      $( "#delete-btn" ).on( "click", deleteClickHandler)
      $( "#edit-form" ).on( "submit", editFormHandler)
    });