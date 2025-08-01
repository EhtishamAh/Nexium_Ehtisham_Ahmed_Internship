// /grand-project/app/generate/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PitchDocument from "@/models/PitchDocument";

export async function generatePitchAction(prevState: any, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userInput = {
    idea: formData.get("idea") as string,
    problem: formData.get("problem") as string,
    audience: formData.get("audience") as string,
    features: formData.get("features") as string,
    usp: formData.get("usp") as string,
    goal: formData.get("goal") as string,
    tone: formData.get("tone") as string,
  };

  let aiResponse;
  try {
    // --- 1. REAL AI LOGIC ---
    const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput),
    });

    if (!response.ok) {
      throw new Error(`AI service failed with status: ${response.status}`);
    }
    aiResponse = await response.json();
    // -------------------------
  } catch (error) {
    console.error("n8n workflow error:", error);
    return { message: "Error: The AI pitch generator is currently unavailable. Please try again later." };
  }

  // --- 2. SAVE TO DATABASES ---
  const { data: newPitch, error: supabaseError } = await supabase
    .from("pitches")
    .insert({ user_id: user.id, pitch_title: userInput.idea.substring(0, 50) + "...", status: 'draft' })
    .select('id')
    .single();

  if (supabaseError || !newPitch) {
    console.error("Supabase Error:", supabaseError);
    return { message: "Error: Could not create the pitch entry in our database." };
  }

  await dbConnect();
  await PitchDocument.create({
    pitchId: newPitch.id,
    userId: user.id,
    userInput: userInput,
    aiResponse: aiResponse
  });

  // --- 3. REDIRECT TO RESULT PAGE ---
  redirect(`/result/${newPitch.id}`);
}