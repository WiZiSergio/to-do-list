// Importamos las dependencias necesarias
import express from 'express';
import fs from 'fs';
import cors from 'cors';

// Configuramos la app y el puerto
const app = express();
const PORT = 3000;
const FILE_PATH = './tasks.json';

// Middlewares para CORS y parseo JSON en body
app.use(cors());
app.use(express.json());

// Función para leer tareas del archivo JSON
function loadTasks() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Función para guardar tareas en el archivo JSON
function saveTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

// Ruta GET para obtener todas las tareas
app.get('/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

// Ruta POST para crear una tarea nueva
app.post('/tasks', (req, res) => {
  const tasks = loadTasks();

  // Creamos la nueva tarea con id, fecha y estado completado por defecto
  const newTask = {
    id: Date.now(), // id único basado en timestamp
    createdAt: new Date().toISOString(), // fecha y hora creación
    completed: false, // por defecto no completada
    ...req.body, // resto de propiedades (ej. título)
  };

  tasks.push(newTask); // añadimos al array
  saveTasks(tasks); // guardamos en archivo

  res.status(201).json(newTask); // devolvemos la tarea creada
});

// Ruta PATCH para editar una tarea (por id)
app.patch('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const id = Number(req.params.id);

  // Actualizamos la tarea que coincida con el id
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, ...req.body } : task
  );

  saveTasks(updated);
  res.json({ success: true });
});

// Ruta DELETE para eliminar una tarea (por id)
app.delete('/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const id = Number(req.params.id);

  // Filtramos para quitar la tarea con id indicado
  const filtered = tasks.filter((task) => task.id !== id);

  saveTasks(filtered);
  res.json({ success: true });
});

// Arrancamos el servidor y mostramos en consola la URL
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
