$(function() {
  const postId = document.querySelector('input[name="post-Id"]').value;
  console.log(postId)


  const commentingFormHandler = async (event) => {
    event.preventDefault();
    
    const commentingInformation= document.querySelector('textarea[name="commenting-body"]').value;         

    if (commentingInformation) {                                  
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ commentingInformation, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  const showcreateCommentForm = async(e) =>{
    e.preventDefault();

    $("body").hide();
    $("dashboardPage").show();
  }
  $("btn btn-primary btn-lg").click(showcreateCommentForm)
  $("#commenting-form").on("submit", commentingFormHandler)
});