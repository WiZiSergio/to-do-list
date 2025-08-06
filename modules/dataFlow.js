// dataFlow.js centraliza el flujo de datos: carga, crea, edita, elimina y actualiza UI

import { fetchTasks, addTask, editTask, removeTask } from './api.js';
import { renderTasks } from './dom.js';

export const flow = {
  // Carga tareas desde API/localStorage y renderiza
  async load() {
    await renderTasks();
  },

  // Crea nueva tarea (con título) y actualiza la lista
  async create(title) {
    if (!title) throw new Error('Título requerido');
    await addTask({ title });
    await renderTasks();
  },

  // Edita tarea por id con los datos que recibas (e.g. { completed: true })
  async edit(id, updates) {
    if (!id) throw new Error('ID requerido');
    await editTask(id, updates);
    await renderTasks();
  },

  // Elimina tarea por id y actualiza la lista
  async delete(id) {
    if (!id) throw new Error('ID requerido');
    await removeTask(id);
    await renderTasks();
  },
};
