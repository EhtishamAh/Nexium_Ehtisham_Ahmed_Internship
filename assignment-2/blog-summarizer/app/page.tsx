// file: app/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [urduTranslation, setUrduTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic will be added in later phases
    console.log("Submitting URL:", url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-12 bg-gradient-to-br from-gray-900 to-slate-800 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">AI Blog Summariser</h1>
        <p className="mt-2 text-lg text-slate-400">Enter a blog post URL to get a summary and its Urdu translation.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex items-center gap-2">
        <Input
          type="url"
          placeholder="https://example.com/blog-post"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Summarising..." : "Summarise"}
        </Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle>English Summary</CardTitle></CardHeader>
          <CardContent><p className="text-slate-300">{summary || "The summary will appear here."}</p></CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle>Urdu Translation</CardTitle></CardHeader>
          <CardContent><p className="text-slate-300" dir="rtl" lang="ur">{urduTranslation || "خلاصہ یہاں ظاہر ہوگا۔"}</p></CardContent>
        </Card>
      </div>
    </main>
  );
}