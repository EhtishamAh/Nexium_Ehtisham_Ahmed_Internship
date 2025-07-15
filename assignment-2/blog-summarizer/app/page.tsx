// file: app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scrapeAndSummarise } from './actions';
import { Sparkles } from 'lucide-react'; // For a nice icon

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduTranslation, setUrduTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSummary("");
    setUrduTranslation("");
    const result = await scrapeAndSummarise(url);
    if (result.error) {
        setError(result.error);
    } else if (result.summary && result.urduTranslation) {
        setSummary(result.summary);
        setUrduTranslation(result.urduTranslation);
    }
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 animated-gradient bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            AI Blog Summariser
          </h1>
          <p className="mt-3 text-base md:text-lg text-slate-400">
            Paste any article URL below and get a concise summary in English and Urdu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex items-center gap-3">
          <Input
            type="url"
            placeholder="https://example.com/blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-grow bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 rounded-lg focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all"
          />
          <Button type="submit" disabled={isLoading} className="bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2">
            {isLoading ? "Summarising..." : <>
              <Sparkles size={16} />
              Summarise
            </>}
          </Button>
        </form>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 rounded-xl">
            <CardHeader><CardTitle className="text-slate-200">English Summary</CardTitle></CardHeader>
            <CardContent><p className="text-slate-300 h-40 overflow-y-auto">{summary || "The summary will appear here."}</p></CardContent>
          </Card>
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 rounded-xl">
            <CardHeader><CardTitle className="text-slate-200">Urdu Translation</CardTitle></CardHeader>
            <CardContent><p className="text-slate-300 h-40 overflow-y-auto" dir="rtl" lang="ur">{urduTranslation || "خلاصہ یہاں ظاہر ہوگا۔"}</p></CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
