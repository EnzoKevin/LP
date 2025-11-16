import { supabase } from "../SupaBase/config";

async function GetNotes() {
  const { data, error } = await supabase.from("TB_CONTATO").select("*");

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export { GetNotes };
