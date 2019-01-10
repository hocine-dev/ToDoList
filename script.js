// Event listener to add a new task
document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        const timestamp = new Date().toLocaleString(); // Add timestamp for task creation

        listItem.classList.add('task-item');
        listItem.innerHTML = `
            <span class="task-text">${task}</span>
            <span class="timestamp">${timestamp}</span>
            <button class="mark-complete">Complete</button>
            <button class="edit">Edit</button>
            <button class="remove">X</button>
        `;

        // Mark task as completed
        listItem.querySelector('.mark-complete').addEventListener('click', function () {
            listItem.classList.toggle('completed');
            updateLocalStorage();
        });

        // Edit task
        listItem.querySelector('.edit').addEventListener('click', function () {
            const newTask = prompt("Edit your task:", task);
            if (newTask !== null && newTask.trim() !== '') {
                listItem.querySelector('.task-text').textContent = newTask.trim();
                updateLocalStorage();
                toggleNoTasksMessage();
            }
            toggleNoTasksMessage();
        });

        // Delete task
        listItem.querySelector('.remove').addEventListener('click', function () {
            taskList.removeChild(listItem);
            updateLocalStorage();
        });

        taskList.appendChild(listItem);
        taskInput.value = '';
        updateLocalStorage();
        toggleNoTasksMessage();
    }
});

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the task list first

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="timestamp">${task.timestamp}</span>
            <button class="mark-complete">Complete</button>
            <button class="edit">Edit</button>
            <button class="remove">X</button>
        `;
        
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Mark task as completed
        listItem.querySelector('.mark-complete').addEventListener('click', function () {
            listItem.classList.toggle('completed');
            task.completed = !task.completed;
            updateLocalStorage();
        });

        // Edit task
        listItem.querySelector('.edit').addEventListener('click', function () {
            const newTask = prompt("Edit your task:", task.text);
            if (newTask !== null && newTask.trim() !== '') {
                task.text = newTask.trim();
                listItem.querySelector('.task-text').textContent = task.text;
                updateLocalStorage();
            }
        });

        // Delete task
        listItem.querySelector('.remove').addEventListener('click', function () {
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(task);
            updateLocalStorage();
        });

        taskList.appendChild(listItem);
    });
}

// Update localStorage with the current tasks
function updateLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    taskList.querySelectorAll('.task-item').forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const timestamp = item.querySelector('.timestamp').textContent;
        const completed = item.classList.contains('completed');
        
        tasks.push({ text: taskText, timestamp: timestamp, completed: completed });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task from localStorage
function removeTaskFromLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t.text !== task.text || t.timestamp !== task.timestamp);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Filter functionality
document.getElementById('filterAll').addEventListener('click', function () {
    filterTasks('all');
});

document.getElementById('filterActive').addEventListener('click', function () {
    filterTasks('active');
});

document.getElementById('filterCompleted').addEventListener('click', function () {
    filterTasks('completed');
});

document.getElementById('filterImportant').addEventListener('click', function () {
    filterTasks('important');
});

// Filter tasks based on the selected option
function filterTasks(filter) {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        switch (filter) {
            case 'active':
                item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                break;
            case 'completed':
                item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'important':
                // Example: Filter tasks marked as important (you can implement a flag for this)
                item.style.display = item.classList.contains('important') ? 'flex' : 'none';
                break;
            case 'all':
            default:
                item.style.display = 'flex';
                break;
        }
    });
}
// Show or hide the "No tasks" message
function toggleNoTasksMessage() {
    const taskList = document.getElementById('taskList');
    const noTasksMessage = document.getElementById('noTasksMessage');
    if (taskList.children.length === 0) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
    }
}

// Initial load of tasks from localStorage
loadTasks();
toggleNoTasksMessage();
loadTasks();
