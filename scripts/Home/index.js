import { createNote } from "../../API/DB/Post.js";
import { GetNotes } from "../../API/DB/Get.js";
import { deleteNote } from "../../API/DB/Del.js";
import { saveEdit } from "../../API/DB/Up.js";

const form = document.getElementById("note-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const statusEl = document.getElementById("status");
const notesList = document.getElementById("notes-list");
const emptyEl = document.getElementById("empty");
const refreshBtn = document.getElementById("refresh");
const clearBtn = document.getElementById("clear");

const editModal = document.getElementById("edit-modal");
const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("edit-content");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");
let editingId = null;

document.addEventListener("DOMContentLoaded", loadNotes);

// Carrega as notas e inicia a func pra renderizar
async function loadNotes() {
  const notes = await GetNotes();
  renderNotes(notes);
}

// seta o formulario de pra zero quando se e adicionado uma nova nota
// e tambem salva a nota nova
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await createNote(titleInput, contentInput);
  loadNotes();
  titleInput.value = "";
  contentInput.value = "";
});

// recarrega as notas
refreshBtn.addEventListener("click", loadNotes);

// limpa os campos do formulario
clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  contentInput.value = "";
});

// cancela a edição de uma nota
cancelEditBtn.addEventListener("click", () => toggleEditModal(false));

// salva a edição de uma nota
saveEditBtn.addEventListener("click", async () => {
  await saveEdit(editingId, editTitle.value, editContent.value);
  loadNotes();
  toggleEditModal(false);
});

// abre a edição
function openEdit(note) {
  editingId = note.id;
  editTitle.value = note.title || "";
  editContent.value = note.content || "";
  toggleEditModal(true);
}

// renderiza as notas na tela junto com o html
// OBS: SE VOCE DEIXASSE USAR OQUE EU SEI ESSE CODIGO SERIA TAO MAIS SIMPLES E BONITO
function renderNotes(notes) {
  notesList.innerHTML = "";

  if (!notes || notes.length === 0) {
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  for (const note of notes) {
    const li = document.createElement("li");
    li.className = "border rounded p-3 bg-white flex flex-col gap-2";

    const head = document.createElement("div");
    head.className = "flex items-start justify-between gap-3";

    const title = document.createElement("strong");
    title.textContent = note.Titulo || "(sem título)";
    title.className = "text-slate-800";

    const controls = document.createElement("div");
    controls.className = "flex gap-2";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "text-sm px-2 py-1 border rounded";
    editBtn.addEventListener("click", () => openEdit(note));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Excluir";
    delBtn.className = "text-sm px-2 py-1 border rounded text-red-600";
    delBtn.addEventListener("click", async () => {
      await deleteNote(note.id);
      loadNotes();
    });

    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    head.appendChild(title);
    head.appendChild(controls);

    const content = document.createElement("div");
    content.className = "text-sm text-slate-600 whitespace-pre-wrap";
    content.innerHTML = note.Content || "";

    li.appendChild(head);
    li.appendChild(content);

    notesList.appendChild(li);
  }
}

// deixa visivel ou não o modal de edição
function toggleEditModal(show) {
  editModal.classList.toggle("hidden", !show);
  editModal.style.display = show ? "flex" : "none";
}
