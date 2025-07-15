  // file: app/actions.ts
  'use server';

  import * as cheerio from 'cheerio';
  // Import our new AI functions
  import { summarizeText, translateToUrdu } from '@/lib/ai';
  import { supabase } from '@/lib/supabaseClient';

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

    // --- AI LOGIC (Stays the same) ---
    const summary = summarizeText(fullText);
    const urduTranslation = translateToUrdu(summary);

    // --- ADD THE NEW SUPABASE LOGIC HERE ---
    try {
      const { error: supabaseError } = await supabase
        .from('Summary') // The name of the table we created manually
        .insert({
          url: url,
          summary: summary,
          translation: urduTranslation,
        });

      if (supabaseError) {
        throw supabaseError;
      }
      console.log('Summary successfully saved to Supabase for URL:', url);
    } catch (dbError) {
      console.error("Supabase Database Error:", dbError);
      // Don't block the user, just log the error
    }

    // --- RETURN STATEMENT (Stays the same) ---
    return {
      summary,
      urduTranslation,
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
  