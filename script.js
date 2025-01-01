function Task(title, dueTime, priority) {
    this.title = title;
    this.dueTime = dueTime;
    this.priority = priority;
}

let tasks = [];

function addTask() {
    const title = document.getElementById("taskTitle").value;
    const dueTime = parseInt(document.getElementById("taskDueTime").value, 10);
    const priority = parseInt(document.getElementById("taskPriority").value, 10);

    if (!title || !dueTime || !priority) {
        alert("Please fill in all fields!");
        return;
    }

    const task = new Task(title, dueTime, priority);
    tasks.push(task);
    displayTasks();
    document.getElementById("taskTitle").value = '';
    document.getElementById("taskDueTime").value = '';
    document.getElementById("taskPriority").value = '';
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `Title: ${task.title}, Due in ${task.dueTime} min, Priority: ${task.priority}`;
        taskList.appendChild(taskItem);
        sendReminder(task);
    });
}

function sortTasksByPriority() {
    tasks.sort((a, b) => a.priority - b.priority);
    displayTasks();
}

function displayTasksDueInTimeframe(minutes) {
    const now = Date.now();
    const timeframeEnd = now + minutes * 60 * 1000;
    const tasksDue = tasks.filter(task => {
        const taskTime = now + task.dueTime * 60 * 1000;
        return taskTime <= timeframeEnd;
    });

    const reminderList = document.getElementById("reminderList");
    reminderList.innerHTML = '';

    if (tasksDue.length === 0) {
        const noTaskItem = document.createElement("li");
        noTaskItem.textContent = `No tasks due in the next ${minutes} minutes.`;
        reminderList.appendChild(noTaskItem);
    } else {
        tasksDue.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.textContent = `Title: ${task.title}, Due in ${task.dueTime} minutes, Priority: ${task.priority}`;
            reminderList.appendChild(taskItem);
        });
    }
}

function sendReminder(task) {
    const now = Date.now();
    const taskTime = now + task.dueTime * 60 * 1000;
    const delay = taskTime - now;

    setTimeout(() => {
        alert(`Reminder: Task "${task.title}" is due now!`);
    }, delay);
}
