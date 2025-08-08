# 📋 To-Do List App (Node.js + Express + node-fetch + localStorage)

## 🚀 Funcionalidades
- **Crear tareas** con fecha y hora de creación.
- **Editar tareas** en un modal sin recargar la página.
- **Eliminar tareas** con confirmación mediante pop-up.
- **Marcar tareas como completadas**.
- **Persistencia**:
  - Datos guardados en **`tasks.json`** en el servidor.
  - Respaldo automático en **localStorage** si falla la conexión.
- **Diseño responsive** y adaptado para móviles.
- **Flujo de datos documentado** en el código.

---

## 🛠️ Tecnologías usadas
### Frontend
- HTML5
- CSS3
- JavaScript (ES Modules)
- Fetch API

### Backend
- Node.js
- Express
- node-fetch
- CORS

---

## 📂 Estructura del proyecto

todo-app/
│
├── public/
│ ├── index.html # Interfaz principal
│ ├── style.css # Estilos globales y modales
│ ├── events.js # Gestión de eventos de la UI
│ ├── api.js # Comunicación con el backend
│ └── flow.js # Representación funcional del flujo de datos
│
├── tasks.json # Base de datos de tareas (en servidor)
├── server.js # Servidor Express con CRUD
├── package.json # Configuración del proyecto
└── README.md # Documentación del proyecto