import { supabase } from "../SupaBase/config";

async function createNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  const { data, error } = await supabase
    .from("TB_LP")
    .insert({ title, content })
    .select()
    .single();

  if (error) {
    console.error(error);
    return;
  }

  titleInput.value = "";
  contentInput.value = "";
  return fetchNotes();
}

export { createNote };
