// /grand-project/app/result/[id]/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PitchDocument from "@/models/PitchDocument";

export async function savePitchAction(pitchId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // Update status in Supabase, ensuring the user owns the pitch
  const { error } = await supabase
    .from('pitches')
    .update({ status: 'saved' })
    .eq('id', pitchId)
    .eq('user_id', user.id);

  if (error) {
    console.error("Save Pitch Error:", error);
    throw new Error("Failed to save pitch");
  }

  // Revalidate paths to update the UI and then redirect
  revalidatePath('/dashboard');
  revalidatePath(`/result/${pitchId}`);
  redirect('/dashboard');
}

export async function deletePitchAction(pitchId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // 1. Delete from Supabase (with security check)
  await supabase.from('pitches').delete().eq('id', pitchId).eq('user_id', user.id);

  // 2. Delete from MongoDB
  await dbConnect();
  await PitchDocument.deleteOne({ pitchId: pitchId, userId: user.id });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}