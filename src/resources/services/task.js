const URL = "http://localhost:3000/task";



// Create
export async function createTask(task) {
    const res = await fetch( URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query)
    });
    const data = await res.json();
};