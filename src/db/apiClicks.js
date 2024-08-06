import supabase from './supabase'

export async function getClicksForUrls(urlIds) {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);
  console.log(data)

  if (error) {
    console.error(error.message)
    throw new Error('error')
  }
  return data
}
