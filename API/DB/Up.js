import { API_URL, API_KEY } from "../SupaBase/config.js";

/**
 * Salva a edição da nota no banco de dados do supabase
 *
 * recebe o Id, Titulo e Conteudo
 *
 * @author Enzo Kevin Morais Rocha
 *
 * @param {editID} - Id do input
 * @param {editTitle} - titulo do input
 * @param {ContentInput} - conteudo do input
 *
 * @returns {String} - retorna console.log de sucesso
 **/

async function saveEdit(editID, editTitle, editContent) {
  const title = editTitle;
  const content = editContent;

  if (!editID) return;

  const res = await fetch(`${API_URL}/TB_LP?id=eq.${editID}`, {
    method: "PATCH",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Titulo: title,
      Content: content,
    }),
  });

  if (!res.ok) {
    console.error("Erro ao atualizar:", await res.text());
    return;
  }

  return console.log("Nota atualizada com sucesso!");
}

export { saveEdit };
