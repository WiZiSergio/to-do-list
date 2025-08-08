// backend/server.mjs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addTask, editTask, removeTask, getTasks } from './api.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/tasks', async (req,res)=>{
  const data = await getTasks();
  res.json(data);
});

app.post('/api/tasks', async (req,res)=>{
  const created = await addTask(req.body);
  res.status(201).json(created);
});

app.patch('/api/tasks/:id', async (req,res)=>{
  const updated = await editTask(req.params.id, req.body);
  res.json(updated);
});

app.delete('/api/tasks/:id', async (req,res)=>{
  const result = await removeTask(req.params.id);
  res.json(result);
});

app.listen(PORT, ()=> console.log('Server listening http://localhost:'+PORT));
