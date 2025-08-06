const KEY = 'tasks-backup';

// Guardar tareas en localStorage
export function saveToLocal(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

// Cargar tareas desde localStorage (o array vacío)
export function loadFromLocal() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
