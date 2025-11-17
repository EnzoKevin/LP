import { API_URL, API_KEY } from "../SupaBase/config.js";

/**
 * Retorna a lista atualizada de notas do banco de dados do supabase
 *
 * @author Enzo Kevin Morais Rocha
 *
 * @returns {data} - retorna a lista atualizada de notas
 **/

async function GetNotes() {
  const res = await fetch(`${API_URL}/TB_LP?select=*`, {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar dados:", await res.text());
    return [];
  }

  const data = await res.json();
  console.log("Dados buscados:", data);
  return data;
}

export { GetNotes };
