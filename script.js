document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Add new task
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Add remove button to the task
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            listItem.appendChild(removeBtn);

            // Toggle completion
            listItem.addEventListener('click', function() {
                listItem.classList.toggle('completed');
            });

            // Remove task
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                taskList.removeChild(listItem);
            });

            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    });

    // Handle Enter key for adding tasks
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
