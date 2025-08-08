// frontend/js/events.js
import * as API from './api.js';
import { renderList } from './dom.js';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalInput = document.getElementById('modal-input');
const modalMsg = document.getElementById('modal-message');
const btnCancel = document.getElementById('modal-cancel');
const btnConfirm = document.getElementById('modal-confirm');

let currentAction = null;
let currentTask = null;

async function load(){
  const tasks = await API.fetchTasks();
  renderList(list, tasks, { onEdit: openEdit, onDelete: openDelete });
}

form.addEventListener('submit', async e=>{
  e.preventDefault();
  const title = input.value.trim();
  if(!title) return;
  const task = { title, createdAt: new Date().toISOString(), completed:false };
  await API.createTask(task);
  input.value = "";
  await load();
});

function openEdit(task){
  currentAction = 'edit';
  currentTask = task;
  modalTitle.textContent = "Editar tarea";
  modalInput.classList.remove('hidden');
  modalMsg.classList.add('hidden');
  modalInput.value = task.title || task.text || "";
  modal.classList.remove('hidden');
}

function openDelete(task){
  currentAction = 'delete';
  currentTask = task;
  modalTitle.textContent = "Confirmar eliminación";
  modalInput.classList.add('hidden');
  modalMsg.classList.remove('hidden');
  modalMsg.textContent = `¿Eliminar "${task.title || task.text}"?`;
  modal.classList.remove('hidden');
}

btnCancel.addEventListener('click', ()=>{
  modal.classList.add('hidden');
  currentAction = null;
  currentTask = null;
});

btnConfirm.addEventListener('click', async ()=>{
  if(currentAction === 'edit'){
    const newTitle = modalInput.value.trim();
    if(newTitle){
      await API.updateTask(currentTask.id, { title: newTitle });
      await load();
    }
  }else if(currentAction === 'delete'){
    await API.removeTask(currentTask.id);
    await load();
  }
  modal.classList.add('hidden');
  currentAction = null;
  currentTask = null;
});

// close modal with ESC
window.addEventListener('keydown', e=>{
  if(e.key === 'Escape' && !modal.classList.contains('hidden')){
    modal.classList.add('hidden');
    currentAction = null;
    currentTask = null;
  }
});

// initial load
load();
