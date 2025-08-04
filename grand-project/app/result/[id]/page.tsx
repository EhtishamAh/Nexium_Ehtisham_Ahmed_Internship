// /app/result/[id]/page.tsx
'use client'; // This is now a client component

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { IPitchDocument } from '@/models/PitchDocument';
import { ResultView } from './ResultView';
import { Loader2 } from 'lucide-react';

export default function ResultPage() {
  const params = useParams();
  const id = params.id as string;

  // State to hold our data, loading status, and any errors
  const [pitchData, setPitchData] = useState<IPitchDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPitch = async () => {
      try {
        setIsLoading(true);
        // Fetch data from the new API route
        const response = await fetch(`/api/result/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pitch data.');
        }
        
        const data = await response.json();
        setPitchData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPitch();
  }, [id]); // Re-run effect if the id changes

  // Render a loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-4 text-lg">Loading your pitch...</p>
      </div>
    );
  }

  // Render an error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Render the result once data is loaded
  return (
    <main className="container mx-auto p-4 md:p-8">
      {pitchData && <ResultView pitch={pitchData} />}
    </main>
  );
}