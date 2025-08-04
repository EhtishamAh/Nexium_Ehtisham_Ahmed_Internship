// app/result/[id]/ResultView.tsx
'use client';

import { useState, useTransition } from 'react';
import { IPitchDocument } from "@/models/PitchDocument";
import { savePitchAction, deletePitchAction } from "./actions";

// Import UI components and icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Loader2, Save, Trash2, Zap, Target, Lightbulb, PenSquare } from 'lucide-react';

// A small, reusable component for each section of the pitch
function PitchSection({ title, content, icon: Icon }: { title: string; content: string | undefined; icon: React.ElementType }) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </h3>
        <Button variant="ghost" size="icon" onClick={handleCopy} aria-label={`Copy ${title}`}>
          {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <p className="text-muted-foreground mt-1 ml-7">{content || "Not available."}</p>
    </div>
  );
}


export function ResultView({ pitch }: { pitch: IPitchDocument }) {
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(() => {
      savePitchAction(pitch.pitchId);
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this pitch?")) {
      startTransition(() => {
        deletePitchAction(pitch.pitchId);
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in-up shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3">
            <Zap className="h-7 w-7 text-amber-500" /> Your AI-Generated Pitch
        </CardTitle>
        <CardDescription>
          Here is the pitch generated based on your input. You can copy sections or save the entire pitch.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        {/* Each part of the pitch is now a clean, copyable section */}
        <PitchSection title="Elevator Pitch" content={pitch.aiResponse.elevatorPitch} icon={Lightbulb} />
        <PitchSection title="Problem Statement" content={pitch.aiResponse.problem} icon={PenSquare} />
        <PitchSection title="Our Solution" content={pitch.aiResponse.solution} icon={Zap} />
        <PitchSection title="Target Market" content={pitch.aiResponse.targetMarket} icon={Target} />
        <PitchSection title="Call to Action" content={pitch.aiResponse.callToAction} icon={PenSquare} />
      </CardContent>
      <CardFooter className="flex justify-end gap-3 bg-muted/50 p-4">
        <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Delete
        </Button>
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Pitch
        </Button>
      </CardFooter>
    </Card>
  );
}