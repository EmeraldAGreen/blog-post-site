const blogFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-description').value.trim();
  
      const response = await fetch(`/api/blogs/`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        // document.location.reload();
      } else {
        alert(response.statusText)
        document.querySelector('blog-form').style.display='block';
      }
  };

  document
  .querySelector('.btn').addEventListener('submit', blogFormHandler)
  
  // const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  
  //     const response = await fetch(`/api/blogs/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/');
  //     } else {
  //       alert('Failed to delete project');
  //     }
  //   }
  // };


  // document
  //   .querySelector('.blog-list')
  //   .addEventListener('click', delButtonHandler);
  