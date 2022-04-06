// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment = document
      .querySelector('#comment')
      .value.trim();

// Somehow using blog id for the window?
    const blog_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          blog_id,
          comment_text,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
        document.querySelector('#comment-form').style.display = 'block';
      }
    }
  }
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);