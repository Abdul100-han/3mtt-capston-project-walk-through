// Utility to store and retrieve tasks in LocalStorage
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

// Redirect to login if not logged in
function ensureLoggedIn() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html'; // Redirect to login page if not logged in
  }
}

// Handle Login
document.querySelector('#login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  
  // Dummy check (replace with real authentication logic if needed)
  if (email && password) {
    localStorage.setItem('user', JSON.stringify({ email }));
    window.location.href = 'index.html';  // Redirect to dashboard after login
  } else {
    alert('Invalid credentials');
  }
});

// Handle Registration
document.querySelector('#register-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.querySelector('#register-email').value;
  const password = document.querySelector('#register-password').value;
  
  // Dummy registration logic (replace with actual logic as needed)
  localStorage.setItem('user', JSON.stringify({ email }));
  window.location.href = 'login.html';  // After registration, go to login page
});

// Handle Logout
document.querySelector('#logout-btn')?.addEventListener('click', function () {
  localStorage.removeItem('user'); // Remove user data from LocalStorage
  window.location.href = 'login.html';  // Redirect to login page after logout
});

// Load tasks if logged in
document.addEventListener('DOMContentLoaded', function () {
  if (isLoggedIn()) {
    const tasks = getTasksFromLocalStorage();
    
    // Display tasks
    const taskList = document.querySelector('#task-list');
    tasks.forEach((task, index) => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('task-card');
      taskCard.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Priority: ${task.priority}</p>
        <p>Due: ${task.deadline}</p>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button class="edit-btn" data-index="${index}">Edit</button>
      `;
      taskList.appendChild(taskCard);
    });
    
    // Handle task creation
    document.querySelector('#task-form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const newTask = {
        title: e.target.title.value,
        description: e.target.description.value,
        priority: e.target.priority.value,
        deadline: e.target.deadline.value
      };
      
      tasks.push(newTask);
      saveTasksToLocalStorage(tasks);
      
      // Refresh task list
      window.location.reload();
    });
    
    // Handle task deletion
    document.querySelector('#task-list').addEventListener('click', function (e) {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        tasks.splice(index, 1); // Remove task from the array
        saveTasksToLocalStorage(tasks); // Save updated tasks to LocalStorage
        window.location.reload(); // Reload the page to reflect changes
      }
    });

    // Handle task editing
    document.querySelector('#task-list').addEventListener('click', function (e) {
      if (e.target.classList.contains('edit-btn')) {
        const index = e.target.getAttribute('data-index');
        const task = tasks[index];

        // Populate the task edit form with the selected task's details
        document.querySelector('[name="title"]').value = task.title;
        document.querySelector('[name="description"]').value = task.description;
        document.querySelector('[name="priority"]').value = task.priority;
        document.querySelector('[name="deadline"]').value = task.deadline;

        // Change the form action to "update" instead of "create"
        document.querySelector('#task-form').setAttribute('data-index', index);
        document.querySelector('#task-form button').textContent = 'Update Task';
      }
    });

    // Handle task update (using the same form)
    document.querySelector('#task-form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const index = e.target.getAttribute('data-index');
      if (index !== null) {
        const updatedTask = {
          title: e.target.title.value,
          description: e.target.description.value,
          priority: e.target.priority.value,
          deadline: e.target.deadline.value
        };
        
        tasks[index] = updatedTask;  // Update the task in the array
        saveTasksToLocalStorage(tasks);  // Save updated tasks to LocalStorage
        
        // Reset the form and button
        document.querySelector('#task-form').removeAttribute('data-index');
        e.target.reset();
        e.target.querySelector('button').textContent = 'Add Task';
        
        // Refresh task list
        window.location.reload();
      }
    });
  } else {
    ensureLoggedIn();  // Only redirects if not logged in.
  }
});
