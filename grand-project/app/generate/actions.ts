// /grand-project/app/generate/actions.ts

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Define a clear type for our action's state.
export type ActionState = {
  message: string | null;
};

export async function generatePitchAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Handle errors by returning a state object, which fixes the hook error.
  if (!user) {
    return { message: "You must be logged in to generate a pitch." };
  }

  const userInput = {
    idea: formData.get("idea") as string,
    problem: formData.get("problem") as string,
    audience: formData.get("audience") as string,
    features: formData.get("features") as string,
    usp: formData.get("usp") as string,
    goal: formData.get("goal") as string,
    tone: formData.get("tone") as string,
  };

  // 2. Call the n8n webhook but ignore the response.
  try {
    console.log("Calling n8n webhook...");
    await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput),
    });
    console.log("n8n call finished. The response is being ignored.");
  } catch (error) {
    console.error("n8n workflow error:", error);

  }

 
  redirect(`/result/new`);
}