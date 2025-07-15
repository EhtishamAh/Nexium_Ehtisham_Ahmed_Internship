// file: app/api/translate.ts

import type { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Specify edge runtime

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), { status: 400 });
    }

    // We use a free translation API for this example
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ur`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.responseStatus !== 200) {
      return new Response(JSON.stringify({ error: 'Failed to translate text' }), { status: 500 });
    }

    const translatedText = data.responseData.translatedText;

    return new Response(JSON.stringify({ translation: translatedText }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}