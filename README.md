# To‑Do List (Full project)

## Briefing
Aplicación To‑Do List con frontend modular (HTML/CSS/JS) y backend en Node.js + Express.
Soporta crear, editar y eliminar tareas. Cada tarea contiene fecha de creación y se guarda en el backend.
Si la API no está disponible, el frontend usa localStorage como respaldo.

## Estructura
- frontend/: cliente (abrir frontend/index.html)
- backend/: backend (node server.mjs)
- screenshots/: imágenes de ejemplo

## Quickstart
1. Instalar backend
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Abrir `frontend/index.html` en el navegador (usar Live Server o abrir archivo).

## Notas
- El backend usa almacenamiento en memoria (no persistente). Para producción, sustituir por DB.
- README incluye dos SVG de muestra en screenshots/.
