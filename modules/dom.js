import { fetchTasks } from './api.js';

const list = document.getElementById('task-list');

export async function renderTasks() {
  const tasks = await fetchTasks();
  list.innerHTML = '';
  tasks.forEach(renderTask);
}

export function renderTask(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('complete-checkbox');

  const span = document.createElement('span');
  span.textContent = task.title;
  if (task.completed) {
    span.style.textDecoration = 'line-through';
    span.style.color = '#999';
  }

  const date = document.createElement('small');
  const createdDate = new Date(task.createdAt);
  date.textContent = createdDate.toLocaleString();
  date.style.marginLeft = '10px';
  date.style.fontSize = '0.8em';
  date.style.color = '#666';

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.classList.add('edit-btn');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('delete-btn');

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(date);
  li.appendChild(actions);

  list.appendChild(li);
}
