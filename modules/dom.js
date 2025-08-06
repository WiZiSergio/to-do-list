import { fetchTasks } from './api.js';

// Referencia a la lista de tareas en el DOM
const list = document.getElementById('task-list');

// Renderiza todas las tareas (llamando API o localStorage)
export async function renderTasks() {
  const tasks = await fetchTasks();
  list.innerHTML = '';
  tasks.forEach(renderTask);
}

// Renderiza una tarea individual
export function renderTask(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;

  // Checkbox para marcar completado
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.classList.add('complete-checkbox');

  // Texto de la tarea (con tachado si completada)
  const span = document.createElement('span');
  span.textContent = task.title;
  if (task.completed) {
    span.style.textDecoration = 'line-through';
    span.style.color = '#999';
  }

  // Fecha de creación formateada
  const date = document.createElement('small');
  const createdDate = new Date(task.createdAt);
  date.textContent = createdDate.toLocaleString();
  date.style.marginLeft = '10px';
  date.style.fontSize = '0.8em';
  date.style.color = '#666';

  // Contenedor botones editar y eliminar
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

  // Montaje de elementos en li
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(date);
  li.appendChild(actions);

  list.appendChild(li);
}
