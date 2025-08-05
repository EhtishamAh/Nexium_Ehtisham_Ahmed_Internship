// /grand-project/app/result/[id]/data.ts
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { pitchData } from "@/lib/pitch-data";

export async function getPitch(id: string) {
  if (id === "new") {
    return {
      pitchTitle: "AI-Generated Meal Prep Pitch",
      content: pitchData,
    };
  }

  const supabase = createClient();
  const { data: savedPitch, error } = await supabase
    .from("pitches")
    .select("pitch_title")
    .eq("id", id)
    .single();

  if (error || !savedPitch) {
    notFound();
  }

  return {
    pitchTitle: savedPitch.pitch_title,
    content: pitchData,
  };
}