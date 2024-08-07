import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  let { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function deleteUrl(id) {
  let { data, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load URLs");
  }

  return data;
}
