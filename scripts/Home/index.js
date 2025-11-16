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

// Modal
const editModal = document.getElementById("edit-modal");
const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("edit-content");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");
let editingId = null;

// Inicial
document.addEventListener("DOMContentLoaded", () => {
  GetNotes();
});

// Eventos
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Nota criada");
  await createNote();
});

refreshBtn.addEventListener("click", GetNotes());
clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  contentInput.value = "";
});

cancelEditBtn.addEventListener("click", () => toggleEditModal(false));
saveEditBtn.addEventListener("click", async () => {
  await saveEdit();
});

function openEdit(note) {
  editingId = note.id;
  editTitle.value = note.title || "";
  editContent.value = note.content || "";
  toggleEditModal(true);
}

// UI helpers
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
    title.textContent = note.title || "(sem título)";
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
    delBtn.addEventListener("click", () => deleteNote(note.id));

    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    head.appendChild(title);
    head.appendChild(controls);

    const content = document.createElement("div");
    content.className = "text-sm text-slate-600 whitespace-pre-wrap";
    content.textContent = note.content || "";

    const date = document.createElement("div");
    date.className = "text-xs text-slate-400";
    date.textContent = new Date(note.inserted_at).toLocaleString();

    li.appendChild(head);
    li.appendChild(content);
    li.appendChild(date);

    notesList.appendChild(li);
  }
}

function toggleEditModal(show) {
  editModal.classList.toggle("hidden", !show);
  if (show) editModal.style.display = "flex";
  else editModal.style.display = "none";
}

function status(text, isError = false) {
  statusEl.textContent = text || "";
  statusEl.className = isError
    ? "mt-3 text-sm text-red-600"
    : "mt-3 text-sm text-slate-500";
}
