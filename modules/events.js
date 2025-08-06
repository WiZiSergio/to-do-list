import { flow } from './dataFlow.js';
import { renderTasks } from './dom.js';

export function initEvents() {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');

  // Referencias al modal y sus controles
  const modal = document.getElementById('edit-modal');
  const editInput = document.getElementById('edit-input');
  const saveBtn = document.getElementById('save-btn');
  const cancelBtn = document.getElementById('cancel-btn');

  let currentEditId = null;

  // Crear tarea
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    await flow.create(title);
    input.value = '';
  });

  // Delegación eventos en lista
  list.addEventListener('click', async (e) => {
    const li = e.target.closest('li');
    const id = li?.dataset?.id;
    if (!id) return;

    if (e.target.classList.contains('delete-btn')) {
      await flow.delete(id);
    }

    if (e.target.classList.contains('edit-btn')) {
      // Abrir modal y rellenar input con texto actual
      currentEditId = id;
      editInput.value = li.querySelector('span').textContent;
      modal.classList.remove('hidden');
      editInput.focus();
    }

    if (e.target.classList.contains('complete-checkbox')) {
      await flow.edit(id, { completed: e.target.checked });
    }
  });

  // Guardar cambios desde modal
  saveBtn.addEventListener('click', async () => {
    const newTitle = editInput.value.trim();
    if (!newTitle) {
      alert('El título no puede estar vacío.');
      editInput.focus();
      return;
    }
    if (currentEditId) {
      await flow.edit(currentEditId, { title: newTitle });
      await renderTasks();
      modal.classList.add('hidden');
      currentEditId = null;
    }
  });

  // Cancelar edición
  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    currentEditId = null;
  });

  // Cerrar modal al pulsar ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
      currentEditId = null;
    }
  });
}
