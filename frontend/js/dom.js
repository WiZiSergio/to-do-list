// frontend/js/dom.js
// Funciones para renderizar UI
export function formatDate(iso){
  try{
    return new Date(iso).toLocaleString();
  }catch{ return ""; }
}

export function renderList(targetEl, tasks, handlers){
  targetEl.innerHTML = "";
  tasks.forEach(t=>{
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = t.id;
    li.innerHTML = `
      <div>
        <strong class="title"></strong>
        <span class="meta"></span>
      </div>
      <div class="actions">
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
      </div>
    `;
    li.querySelector(".title").textContent = t.title || t.text || "";
    li.querySelector(".meta").textContent = " · " + formatDate(t.createdAt);
    li.querySelector(".edit").addEventListener("click", ()=> handlers.onEdit(t));
    li.querySelector(".delete").addEventListener("click", ()=> handlers.onDelete(t));
    targetEl.appendChild(li);
  });
}
