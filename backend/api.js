// backend/api.js
// Simple in-memory store with console logs for each operation.
let tasks = [];
let counter = 1;

export async function addTask(task){
  console.log('[API] addTask called with:', task);
  const newTask = { id: counter++, ...task };
  tasks.push(newTask);
  return newTask;
}

export async function editTask(id, updates){
  console.log('[API] editTask called with id:', id, 'updates:', updates);
  id = Number(id);
  tasks = tasks.map(t => t.id === id ? {...t, ...updates} : t);
  return tasks.find(t => t.id === id);
}

export async function removeTask(id){
  console.log('[API] removeTask called with id:', id);
  id = Number(id);
  tasks = tasks.filter(t => t.id !== id);
  return { success:true };
}

export async function getTasks(){
  console.log('[API] getTasks called');
  return tasks;
}
