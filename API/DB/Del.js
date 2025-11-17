import { API_URL, API_KEY } from "../SupaBase/config.js";

/**
 * Deleta a nota no banco de dados do supabase
 *
 * recebe o Id
 *
 * @author Enzo Kevin Morais Rocha
 *
 * @param {Id} - Id da nota
 *
 **/

async function deleteNote(id) {
  if (!confirm("Tem certeza que quer excluir esta nota?")) return;

  const res = await fetch(`${API_URL}/TB_LP?id=eq.${id}`, {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Erro ao deletar:", await res.text());
    return;
  }
}

export { deleteNote };
