// file: app/api/translate.ts

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!text || !apiKey) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), { status: 400 });
    }

    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);
    encodedParams.set('target', 'ur');
    encodedParams.set('source', 'en');

    const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      body: encodedParams
    });

    const result = await response.json();

    if (!response.ok || !result.data?.translations?.[0]?.translatedText) {
      console.error('Translation API Error:', result);
      return new Response(JSON.stringify({ error: 'Failed to translate text' }), { status: 500 });
    }

    const translatedText = result.data.translations[0].translatedText;

    return new Response(JSON.stringify({ translation: translatedText }), { status: 200 });

  } catch { // The 'error' variable is removed from here
    return new Response(JSON.stringify({ error: 'An internal error occurred' }), { status: 500 });
  }
}