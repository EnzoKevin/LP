import { supabase } from "../SupaBase/config";

async function deleteNote(id) {
  if (!confirm("Tem certeza que quer excluir esta nota?")) return;
  const { error } = await supabase.from("TB_LP").delete().eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  fetchNotes();
}

export { deleteNote };
