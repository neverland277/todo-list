const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// In-memory storage for tasks (not persistent)
let tasks = [];

// Route to get tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to add a task
app.post('/tasks', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push({ task: newTask, completed: false });
        res.status(201).json({ message: 'Task added' });
    } else {
        res.status(400).json({ message: 'Task is required' });
    }
});

// Route to update a task
app.put('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { completed } = req.body;
    if (index >= 0 && index < tasks.length && typeof completed === 'boolean') {
        tasks[index].completed = completed;
        res.json({ message: 'Task updated' });
    } else {
        res.status(400).json({ message: 'Invalid index or data' });
    }
});

// Route to delete a task
app.delete('/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted' });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
