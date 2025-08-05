// /grand-project/app/result/[id]/page.tsx

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
import { getPitch } from "./data"; // We'll use the dedicated data function

// Helper component (no changes needed)
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

// THE FIX: Use a clear 'Props' type and access props directly.
type Props = {
  params: {
    id: string;
  };
};

// Mark the component as 'async' and use the 'Props' type.
export default async function ResultPage(props: Props) {
  // Access the id from the props object.
  const id = props.params.id;
  
  // Call our data function to get all the data.
  const { pitchTitle, content } = await getPitch(id);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
          <CardHeader className="bg-primary/5 text-center">
            <Badge variant="secondary" className="mx-auto mb-4 w-fit animate-fade-in-up">
              ✨ {pitchTitle}
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
            <form action={savePitchAction.bind(null, id)}>
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