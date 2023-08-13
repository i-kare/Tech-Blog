$(function() {
    const postFormHandler = async (event) => {
        event.preventDefault();
    
        const postName = document.querySelector('input[name="post-title"]').value;         
        const postInformation = document.querySelector('textarea[name="post-body"]').value;
    
        if (postInformation) {                                  
          const response = await fetch('/api/post/${postId}', {
            method: 'POST',
            body: JSON.stringify({ postName, postInformation }),
            headers: { 'Content-Type': 'application/json' },
          });
      $( "#post-form" ).on( "submit", postFormHandler)
        }}
    });
