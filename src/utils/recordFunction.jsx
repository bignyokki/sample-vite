import { supabase } from "./supabase"

export const getAllRecords = async () => {
  const response = await supabase.from("study-record").select("*")
  return response
}

export const postRecord = async (postRecord) => {
  const { error } = await supabase.from("study-record").insert(postRecord)
  return error
}

export const deleteRecord = async (id) => {
  const response = await supabase.from("study-record").delete().eq('id', id)
  return response
}