//Django rest Api



//Login Page Show Password

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.src = "https://img.icons8.com/ios-filled/50/ffffff/closed-eye.png";
    } else {
      passwordInput.type = "password";
      eyeIcon.src = "https://img.icons8.com/ios-filled/50/ffffff/visible.png";
    }
  }


  //Login page -- get access token

  function handleLogin(event) {
      event.preventDefault(); // stops form from reloading the page
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      console.log("Username:", username);
      console.log("Password:", password);
      const CheckData = {
                      username,
                      password
                  };
      
      fetch('http://127.0.0.1:8000/api/token/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(CheckData)
          })
      .then(res => res.json())
      .then(data => {
              if (data.access) {
                  // Save token in localStorage
                  localStorage.setItem('accessToken', data.access);
                  // Redirect to blog creation page
                  window.location.href = 'blog_create.html';
              } else {
                  alert('Login failed');
              }
          })
          .catch(err => {
              alert('Login error');
              console.error(err);
          });           

          
}


// blog create page -- for create a blog
function Blog_posts(){
    const u_title = document.getElementById('title').value;
    const u_content = document.getElementById('content').value;
    const postdata = {
        title:u_title,
        content:u_content
    };
    const Result_Show = document.getElementById('Result');

    fetch('http://127.0.0.1:8000/posts/',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify( postdata )
    })
.then(response => response.json())

.then((data)=>{
  if(!data.ok){
    Result_Show.innerText="Blog Created Successfuly",
    window.location.href = '/blog_get_all/';
    
  }
})

.catch(
  Result_Show.innerText="pleace check Your Connection",
  Result_Show.style='color:red'
);
 }


 //blog get all


 // Fetch API data using JavaScript
 document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

async function fetchData() {
    try {
        // Show loading spinner
        document.getElementById('loading').style.display = 'block';

        // Call the API endpoint
        const response = await fetch('http://127.0.0.1:8000/posts/');
        const data = await response.json();

        // Hide loading spinner
        document.getElementById('loading').style.display = 'none';

        // Display data dynamically with animations
        const dataContainer = document.getElementById('dataContainer');
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                

                <a href="http://localhost:8080/blog_comment.html?id=${post.id}">Write & Read a Comment _ ${post.id} </a>
                <br>
                
                
            `;
            // Add some animation to each post
            

            dataContainer.appendChild(postElement);
        });
    } catch (error) {
        
    }
}



 

//blog comment write and read



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'id' from the URL and display it

const postId = getQueryParam('id');

document.addEventListener('DOMContentLoaded', function() {

const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const commentsList = document.getElementById('comments-list');
const newCommentText = document.getElementById('new-comment-text');
const submitCommentBtn = document.getElementById('submit-comment');




fetch(`http://127.0.0.1:8000/posts/${postId}/`)
.then(response => response.json())
.then(data => {
postTitle.innerText="Title :"+" "+data.title;
postContent.innerText="Content :"+" "+data.content;

})
.catch();




// Fetch post details

fetch(`http://127.0.0.1:8000/posts/${postId}/comments/`)
.then(response => response.json())
.then(comments => {
commentsList.innerHTML = '';
comments.forEach(comment => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-body">
            <p>${comment.content}</p>
            <p class="name">👤 ${comment.author}</p>
        </div>
    `;
    commentsList.appendChild(card);
    // Apply fade-in animation
    setTimeout(() => {
        card.style.opacity = 1;
        card.style.transition = 'opacity 0.5s ease';
    }, 100);
});
})
.catch(error => console.error('Error fetching data:', error));





});



// Add new comment


const apiUrl = `http://127.0.0.1:8000/posts/${postId}/comments/`;



document.getElementById('submitCommentBtn').addEventListener('click', function() {
const commentContent = document.getElementById('commentContent').value;

if (!commentContent) {
    document.getElementById('statusResult').textContent = "Please write a comment.";
    return;
}

// POST request to add a comment
fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        
    },
    body: JSON.stringify({
        content: commentContent,
        
    })
})
.then(response => response.json())
.then(data => {
    if (data.ok) {
        document.getElementById('statusResult').textContent = "Comment added successfully!";
        
    } else {
        alert("Success: " + JSON.stringify(data));
        window.location.href = `http://localhost:8080/blog_comment.html?id=${post.id}`;
        
    }
})
.catch(error => {
    console.error('Error:', error);
    document.getElementById('statusResult').textContent = "An error occurred.";
});
});




    
