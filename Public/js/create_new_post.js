$(function() {
    const postId = document.querySelector('input[name="post-Id"]').value;
    console.log(postId)


    const create_new_postFormHandler = async (event) => {
        event.preventDefault();
    
        const create_new_postInformation= document.querySelector('textarea[name="create_new_post-body"]').value;         

        if (create_new_postInformation) {                                  
          const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ create_new_postInformation, postId }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.reload();
          } else {
            alert(response.statusText);
          }
        }
      };
      $( "#create_new_post-form" ).on( "submit", create_new_postFormHandler)
    });