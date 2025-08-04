import fetch from 'node-fetch';

const URL = "http://localhost:3000/task";



// Create
export async function createTask(task) {
    const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });
    const data = await res.json();
    return data;
}

// Read
export async function getAllTasks() {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
};

// Read [taskId]
export async function getTaskById(taskId) {
    const res = await fetch(`${URL}/${taskId}`);
    const data = await res.json();
    return data;
};

// Read [listId]
export async function getTaskByListId(listId) {
    const res = await fetch(`${URL}?listId=${listId}`);
    const data = await res.json();
    return data;
};

// Update list
export async function updateTask(id, updatingTask) {
    const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(updatingTask)
    });
    const data = await res.json();
};

// Delete list
export async function deleteList(id) {
    await fetch(`${URL}/${id}`, {
        method: "DELETE"
    });
};