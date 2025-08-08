// frontend/js/api.js
// Comunicación fetch con backend + fallback a localStorage
const API = "http://localhost:3000/api/tasks";
const LS_KEY = "todo_tasks_v1";

export async function fetchTasks(){
  try{
    const res = await fetch(API);
    if(!res.ok) throw new Error("Bad response");
    const data = await res.json();
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    return data;
  }catch(err){
    const raw = localStorage.getItem(LS_KEY);
    return raw? JSON.parse(raw) : [];
  }
}

export async function createTask(task){
  try{
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(task)
    });
    return await res.json();
  }catch{
    const arr = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    const fallback = {...task, id: Date.now()};
    arr.push(fallback);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
    return fallback;
  }
}

export async function updateTask(id, updates){
  try{
    const res = await fetch(`${API}/${id}`, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(updates)
    });
    return await res.json();
  }catch{
    const arr = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    const updated = arr.map(t=> t.id===id ? {...t,...updates} : t);
    localStorage.setItem(LS_KEY, JSON.stringify(updated));
    return updated.find(t=>t.id===id);
  }
}

export async function removeTask(id){
  try{
    await fetch(`${API}/${id}`, {method:"DELETE"});
    return {success:true};
  }catch{
    const arr = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    const filtered = arr.filter(t=>t.id!==id);
    localStorage.setItem(LS_KEY, JSON.stringify(filtered));
    return {success:true};
  }
}
