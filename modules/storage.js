const KEY = 'tasks-backup';

export function saveToLocal(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function loadFromLocal() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}
