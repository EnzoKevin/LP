import { supabase } from "../SupaBase/config";
async function saveEdit() {
  const title = editTitle.value.trim();
  const content = editContent.value.trim();
  if (!editingId) return;
  const { error } = await supabase
    .from("TB_LP")
    .update({ title, content })
    .eq("id", editingId);

  if (error) {
    console.error(error);
    return;
  }

  toggleEditModal(false);
  fetchNotes();
}

export { saveEdit };
