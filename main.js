import { flow } from './modules/dataFlow.js';
import { initEvents } from './modules/events.js';

document.addEventListener('DOMContentLoaded', async () => {
  await flow.load();   // Carga y renderiza tareas al iniciar
  initEvents();        // Inicializa eventos de la app
});
