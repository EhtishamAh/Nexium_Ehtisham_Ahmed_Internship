// /grand-project/app/result/[id]/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function savePitchAction(pitchId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  if (pitchId === "new") {
    const newPitchId = randomUUID();
    const { error } = await supabase
      .from("pitches")
      .insert({
        id: newPitchId,
        user_id: user.id,
        pitch_title: "AI-Generated Meal Prep Pitch",
        status: "saved",
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return;
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}