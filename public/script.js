document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const notification = document.getElementById('notification');

    // Function to show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    }

    // Function to fetch tasks from the server
    function fetchTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = ''; // Clear existing tasks
                tasks.forEach((task, index) => {
                    createTaskElement(task, index);
                });
            });
    }

    // Function to create a task element
    function createTaskElement(task, index) {
        const listItem = document.createElement('li');
        listItem.textContent = task.task;
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Add remove button to the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        listItem.appendChild(removeBtn);

        // Toggle completion
        listItem.addEventListener('click', function() {
            const completed = !task.completed;
            fetch(`/tasks/${index}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            }).then(response => response.json())
              .then(() => fetchTasks());
        });

        // Remove task
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            fetch(`/tasks/${index}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(() => fetchTasks());
        });

        taskList.appendChild(listItem);
    }

    // Add new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: taskText })
            }).then(response => response.json())
              .then(data => {
                  if (data.message === 'Task added') {
                      showNotification('Task created successfully!');
                      taskInput.value = '';
                      fetchTasks();
                  }
              });
        }
    });

    // Handle Enter key for adding tasks
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Fetch tasks on page load
    fetchTasks();
});
