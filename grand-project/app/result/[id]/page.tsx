// /grand-project/app/result/[id]/page.tsx
"use client";

import PitchDetails from "./components/pitch-details";

// This is now a simple, synchronous Client Component.
export default function ResultPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* It renders our Server Component, passing the id to it. */}
        <PitchDetails id={id} />
      </div>
    </div>
  );
}