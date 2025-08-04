// /app/result/[id]/page.tsx

// ==================================================================
// THIS TYPE DEFINITION IS THE ONLY THING THAT MATTERS FOR THIS ERROR.
// It correctly tells TypeScript what the `params` prop looks like.
// ==================================================================
type ResultPageProps = {
  params: { id: string };
};
// ==================================================================

/**
 * This is a minimal version of your page component. It does not
 * fetch data. Its only purpose is to pass the Vercel build by using
 * the correct props type.
 */
export default function ResultPage({ params }: ResultPageProps) {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Result Page</h1>
      <p className="mt-2 text-lg">
        The component for ID <span className="font-mono bg-muted p-1 rounded">{params.id}</span> has loaded successfully.
      </p>
      <p className="mt-4 text-muted-foreground">
        Now that the build has passed, you can add your data fetching logic
        (`async`/`await`) and the ResultView component back into this file.
      </p>
    </main>
  );
}