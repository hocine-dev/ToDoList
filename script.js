document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            ${task} <span class="remove">X</span>
        `;

        listItem.querySelector('.remove').addEventListener('click', function () {
            taskList.removeChild(listItem);
        });

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});
