// /grand-project/app/result/[id]/page.tsx

import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import PitchDocument from "@/models/PitchDocument";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultActions } from "./ResultActions";

// Define a clear type for the page's props to resolve the error
type ResultPageProps = {
  params: { id: string };
};

export default async function ResultPage({ params }: ResultPageProps) {
  const pitchId = params.id;
  
  // --- Data fetching logic is now directly inside the component ---
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: pitchMeta } = await supabase
    .from('pitches')
    .select('id, pitch_title, status, user_id')
    .eq('id', pitchId)
    .single();

  if (!pitchMeta || pitchMeta.user_id !== user.id) {
    notFound();
  }

  await dbConnect();
  const pitchDoc = await PitchDocument.findOne({ pitchId }).lean();
  if (!pitchDoc) {
    notFound();
  }
  // --- End of data fetching logic ---

  const pitchSections = Object.entries(pitchDoc.aiResponse).map(([key, value]) => {
    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    return { title, content: value };
  }).filter(section => section.title !== 'Id');

  return (
    <div className="container max-w-4xl mx-auto p-4 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{pitchMeta.pitch_title}</h1>
        <p className="text-muted-foreground">Here is your AI-generated pitch. Review, save, or copy it.</p>
      </div>

      <ResultActions pitch={{ ...pitchMeta, ...pitchDoc }} />

      <div className="space-y-6 mt-6">
        {pitchSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{String(section.content)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}