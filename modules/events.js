import { flow } from './dataFlow.js';

export function initEvents() {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    await flow.create(title);  // Usamos flow.create para crear tarea
    input.value = '';
  });

  list.addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    const id = li?.dataset?.id;
    if (!id) return;

    if (e.target.classList.contains('delete-btn')) {
      await flow.delete(id);  // Usamos flow.delete para eliminar
    }

    if (e.target.classList.contains('edit-btn')) {
      const newTitle = prompt('Editar tarea:', li.querySelector('span').textContent);
      if (newTitle) {
        await flow.edit(id, { title: newTitle });  // Usamos flow.edit para editar título
      }
    }

    if (e.target.classList.contains('complete-checkbox')) {
      await flow.edit(id, { completed: e.target.checked });  // Usamos flow.edit para marcar completado
    }
  });
}
