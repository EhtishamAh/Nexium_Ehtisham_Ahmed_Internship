// /grand-project/app/result/[id]/page.tsx
"use client"; // Make this a client component to be safe

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Target,
  Users,
  Goal,
  Gem,
  AlertCircle,
} from "lucide-react";
import { savePitchAction } from "./actions";
import { pitchData } from "@/lib/pitch-data";

function PitchSection({
  icon: Icon,
  title,
  content,
}: {
  icon: React.ElementType;
  title: string;
  content: string;
}) {
  return (
    <div className="flex items-start space-x-4 rounded-lg bg-secondary/50 p-4 animate-fade-in-up">
      <div className="mt-1 flex-shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <p className="text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}

// This is now a simple, non-async component. It does not fetch any data.
export default function ResultPage() {
  const content = pitchData;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
          <CardHeader className="bg-primary/5 text-center">
            <Badge variant="secondary" className="mx-auto mb-4 w-fit animate-fade-in-up">
              ✨ AI-Generated Meal Prep Pitch
            </Badge>
            <CardTitle className="text-3xl font-bold tracking-tight text-primary animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Elevator Pitch
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {content.elevatorPitch}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 md:p-8" style={{ animationDelay: '300ms' }}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <PitchSection icon={AlertCircle} title="The Problem" content={content.problem} />
              <PitchSection icon={Lightbulb} title="Our Solution" content={content.solution} />
              <PitchSection icon={Users} title="Target Market" content={content.targetMarket} />
              <PitchSection icon={Gem} title="Unique Selling Point" content={content.uniqueSellingPoint} />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <PitchSection icon={Goal} title="Call to Action" content={content.callToAction} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4 bg-secondary/30 p-6">
            <form action={savePitchAction}>
              <Button type="submit" size="lg" className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                Save Pitch
              </Button>
            </form>
            <Button asChild size="lg" variant="destructive" className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Link href="/dashboard">Delete</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}