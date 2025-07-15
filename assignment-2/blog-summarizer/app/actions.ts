// file: app/actions.ts
'use server';

import * as cheerio from 'cheerio';
// Import our new AI functions
import { summarizeText, translateToUrdu } from '@/lib/ai';

// Update the scrapeAndSummarise function
export async function scrapeAndSummarise(url: string) {
  if (!url) {
    return { error: 'URL is required.' };
  }

  try {
    const response = await fetch(url);
    // ... (fetching and cheerio logic remains the same)
    const html = await response.text();
    const $ = cheerio.load(html);
    const fullText = ($('article, main').text() || $('p').text()).trim();

    if (!fullText) {
      return { error: 'Could not extract any text from the page.' };
    }

    // --- NEW LOGIC ---
    // Use our new functions
    const summary = summarizeText(fullText);
    const urduTranslation = translateToUrdu(summary);

    return {
      summary,
      urduTranslation, // Add translation to the return object
      fullText 
    };

  } catch (error) {
    // ... (error handling remains the same)
    if (error instanceof Error) {
        return { error: `An error occurred: ${error.message}` };
    }
    return { error: 'An unknown error occurred.' };
  }
}