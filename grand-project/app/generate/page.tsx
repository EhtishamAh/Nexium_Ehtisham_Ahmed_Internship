// /grand-project/app/generate/page.tsx

"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { generatePitchAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from "lucide-react";

// The corrected SubmitButton function
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? (
        "Brewing Magic..."
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" /> Generate Pitch
        </>
      )}
    </Button>
  );
}

export default function GeneratePage() {
  const [state, formAction] = useActionState(generatePitchAction, null);

  return (
    <div className="container max-w-2xl mx-auto p-4 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a New Pitch</CardTitle>
          <CardDescription>Fill in the details below and let the AI craft the perfect pitch for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="idea">Business Idea Description</Label>
              <Textarea id="idea" name="idea" placeholder="e.g., A mobile app that connects local gardeners to share surplus produce." required />
            </div>

            {/* --- NEW FIELD --- */}
            <div className="space-y-2">
              <Label htmlFor="problem">The Problem You're Solving</Label>
              <Textarea id="problem" name="problem" placeholder="e.g., Food waste from surplus produce and lack of access to fresh, local food." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input id="audience" name="audience" placeholder="e.g., Urban dwellers with limited garden space" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Key Features</Label>
              <Textarea id="features" name="features" placeholder="e.g., GPS-based matching, in-app chat, user ratings" required />
            </div>

            {/* --- NEW FIELD --- */}
            <div className="space-y-2">
                <Label htmlFor="usp">Unique Selling Proposition (USP) / Competitors</Label>
                <Textarea id="usp" name="usp" placeholder="e.g., Unlike Facebook Marketplace, we are hyper-focused on produce with features for seasonal availability." required />
            </div>

             {/* --- NEW FIELD --- */}
            <div className="space-y-2">
                <Label htmlFor="goal">Specific Goal / Call to Action</Label>
                <Input id="goal" name="goal" placeholder="e.g., Secure $50,000 in seed funding." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Desired Tone</Label>
              <Select name="tone" defaultValue="professional">
                <SelectTrigger>
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly & Casual</SelectItem>
                  <SelectItem value="investor-focused">Investor-Focused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
            {state?.message && <p className="text-red-500 text-sm mt-2">{state.message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}