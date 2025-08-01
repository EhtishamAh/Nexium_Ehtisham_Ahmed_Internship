// /grand-project/app/result/[id]/ResultActions.tsx

"use client";

import { Button } from "@/components/ui/button";
import { savePitchAction, deletePitchAction } from "./actions";
import { Copy, Save, Trash2, Check } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

// Define a proper type for the pitch prop to avoid 'any'
interface PitchData {
  pitchId: string;
  status: 'draft' | 'saved';
  aiResponse: {
    // This is more specific than 'any', fixing the lint error
    [key: string]: string; 
  };
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? ( "Saving..." ) : (
        <span className="flex items-center">
          <Save className="mr-2 h-4 w-4" /> Save to Dashboard
        </span>
      )}
    </Button>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" size="icon" disabled={pending} type="submit">
      {pending ? "..." : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}

export function ResultActions({ pitch }: { pitch: PitchData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = Object.entries(pitch.aiResponse)
      .map(([key, value]) => {
        const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        return `${title}:\n${String(value)}\n`;
      })
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
      <Button onClick={handleCopy} variant="outline">
        {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy All'}
      </Button>

      {pitch.status === 'draft' && (
        <form action={() => savePitchAction(pitch.pitchId)}>
          <SaveButton />
        </form>
      )}

       <form 
         action={() => {
            if (window.confirm("Are you sure you want to delete this pitch forever?")) {
                deletePitchAction(pitch.pitchId);
            }
         }}
         className="ml-auto"
       >
          <DeleteButton />
        </form>
    </div>
  );
}