// URL base de la API
const API_URL = 'http://localhost:3000/tasks';

// Importamos funciones para trabajar con localStorage
import { loadFromLocal, saveToLocal } from './storage.js';

// Obtener todas las tareas
export async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error API');
    const data = await res.json();
    saveToLocal(data); // guardamos en localStorage
    return data;
  } catch {
    // Si falla API, devolvemos respaldo localStorage
    return loadFromLocal();
  }
}

// Crear nueva tarea
export async function addTask(task) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
  } catch {
    // Si falla API, actualizamos localStorage
    const tasks = loadFromLocal();
    task.id = Date.now();
    task.createdAt = new Date().toISOString();
    task.completed = false;
    tasks.push(task);
    saveToLocal(tasks);
  }
}

// Editar tarea (id y campos a actualizar)
export async function editTask(id, updates) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  } catch {
    const tasks = loadFromLocal().map(t =>
      t.id == id ? { ...t, ...updates } : t
    );
    saveToLocal(tasks);
  }
}

// Eliminar tarea por id
export async function removeTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch {
    const tasks = loadFromLocal().filter(t => t.id != id);
    saveToLocal(tasks);
  }
}
