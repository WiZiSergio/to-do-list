// dataFlow.js centraliza el flujo de datos: carga, crea, edita, elimina y actualiza UI

import { fetchTasks, addTask, editTask, removeTask } from './api.js';
import { renderTasks } from './dom.js';

export const flow = {
  async load() {
    await renderTasks();
  },

  async create(title) {
    if (!title) throw new Error('Título requerido');
    await addTask({ title });
    await renderTasks();
  },

  async edit(id, updates) {
    if (!id) throw new Error('ID requerido');
    await editTask(id, updates);
    await renderTasks();
  },

  async delete(id) {
    if (!id) throw new Error('ID requerido');
    await removeTask(id);
    await renderTasks();
  },
};
