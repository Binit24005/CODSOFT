const form = document.getElementById('projectForm');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskCard(task));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = {
    projectName: document.getElementById('projectName').value,
    taskName: document.getElementById('task').value,
    assignee: document.getElementById('assignee').value,
    deadline: document.getElementById('deadline').value,
    completed: false
  };

  saveTask(task);
  addTaskCard(task);
  form.reset();
});

function addTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card';
  if (task.completed) card.classList.add('completed');

  card.innerHTML = `
    <h3>${task.projectName}</h3>
    <p><strong>Task:</strong> ${task.taskName}</p>
    <p><strong>Assigned to:</strong> ${task.assignee}</p>
    <p class="task-meta"><strong>Deadline:</strong> ${task.deadline}</p>
    <button class="complete-btn">${task.completed ? 'Completed' : 'Mark Complete'}</button>
  `;

  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    task.completed = !task.completed;
    updateTask(task);
    card.classList.toggle('completed');
    button.textContent = task.completed ? 'Completed' : 'Mark Complete';
  });

  taskList.appendChild(card);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(updatedTask) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task =>
    task.projectName === updatedTask.projectName &&
    task.taskName === updatedTask.taskName &&
    task.assignee === updatedTask.assignee
      ? updatedTask
      : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
