
import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;
const FILE_PATH = './tasks.json';

app.use(cors());
app.use(express.json());

function loadTasks() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = loadTasks();

  const newTask = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    completed: false,
    ...req.body,
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});


app.patch('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const id = Number(req.params.id);
  if (!tasks.some((task) => task.id === id)) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, ...req.body } : task
  );

  saveTasks(updated);
  res.json({ success: true });
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const id = Number(req.params.id);
  if (!tasks.some((task) => task.id === id)) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  const filtered = tasks.filter((task) => task.id !== id);

  saveTasks(filtered);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
