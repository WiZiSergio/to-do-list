// frontend/js/storage.js
const KEY = 'todo_tasks_v1';
export function saveLocal(tasks){ localStorage.setItem(KEY, JSON.stringify(tasks)); }
export function loadLocal(){ return JSON.parse(localStorage.getItem(KEY) || "[]"); }
