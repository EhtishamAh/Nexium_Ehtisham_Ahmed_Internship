import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch only pitches the user has explicitly saved
  const { data: pitches } = await supabase
    .from("pitches")
    .select("id, pitch_title, created_at")
    .eq("user_id", user.id)
    .eq("status", "saved")
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pitch Dashboard</h1>
          <p className="text-muted-foreground">Review your saved pitches.</p>
        </div>
        <Button asChild>
          <Link href="/generate">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Pitch
          </Link>
        </Button>
      </div>

      {pitches && pitches.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pitches.map((pitch) => (
            // This Link now points every card to the same static result page.
            <Link href="/result/new" key={pitch.id}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle>{pitch.pitch_title}</CardTitle>
                  <CardDescription>
                    Saved on {new Date(pitch.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No Pitches Saved Yet</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Ready to create your first masterpiece?
          </p>
          <Button asChild>
            <Link href="/generate">Start Generating</Link>
          </Button>
        </div>
      )}
    </div>
  );
}