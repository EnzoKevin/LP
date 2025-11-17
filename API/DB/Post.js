import { API_URL, API_KEY } from "../SupaBase/config.js";
import { GetNotes } from "./Get.js";

/**
 * Cria a nota no banco de dados do supabase
 *
 * recebe o Titulo e Conteudo
 *
 * @author Enzo Kevin Morais Rocha
 *
 * @param {TitleInput} - titulo do input
 * @param {ContentInput} - conteudo do input
 *
 * @returns {GetNotes} - retorna a lista atualizada de notas
 **/

async function createNote(titleInput, contentInput) {
  const Titulo = titleInput.value;
  const content = contentInput.value;

  const res = await fetch(`${API_URL}/TB_LP`, {
    method: "POST",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      Titulo: Titulo,
      Content: content,
    }),
  });

  if (!res.ok) {
    console.log(Titulo, content);
    console.error("Erro ao criar nota:", await res.text());
    return;
  }

  return GetNotes();
}

export { createNote };
