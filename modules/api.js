const API_URL = 'http://localhost:3000/tasks';

import { loadFromLocal, saveToLocal } from './storage.js';

export async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error API');
    const data = await res.json();
    saveToLocal(data);
    return data;
  } catch {
    return loadFromLocal();
  }
}

export async function addTask(task) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
  } catch {
    const tasks = loadFromLocal();
    task.id = Date.now();
    task.createdAt = new Date().toISOString();
    task.completed = false;
    tasks.push(task);
    saveToLocal(tasks);
  }
}

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

export async function removeTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch {
    const tasks = loadFromLocal().filter(t => t.id != id);
    saveToLocal(tasks);
  }
}
