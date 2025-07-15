// file: app/actions.ts
'use server';

import * as cheerio from 'cheerio';
import { summarizeText, translateToUrdu } from '@/lib/ai';
import { supabase } from '@/lib/supabaseClient';
import clientPromise from '@/lib/mongodb';

export async function scrapeAndSummarise(url: string) {
  if (!url) {
    return { error: 'URL is required.' };
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const fullText = ($('article, main').text() || $('p').text()).trim();

    if (!fullText) {
      return { error: 'Could not extract any text from the page.' };
    }

    // --- Use local functions for summary and translation ---
    const summary = summarizeText(fullText, 150);
    const urduTranslation = translateToUrdu(summary);

    // --- Save to databases ---
    try {
      // Save to Supabase
      await supabase.from('Summary').insert({ url, summary, translation: urduTranslation });

      // Correctly connect to MongoDB and save data
      const mongoClient = await clientPromise;
      const db = mongoClient.db("blogContent");
      const collection = db.collection('articles');
      await collection.updateOne(
        { url: url },
        { $set: { url: url, fullText: fullText, scrapedAt: new Date() } },
        { upsert: true }
      );

    } catch (dbError) {
      console.error("Database save error:", dbError);
    }
    
    return { summary, urduTranslation };

  } catch (error) {
    if (error instanceof Error) {
      return { error: `An error occurred: ${error.message}` };
    }
    return { error: 'An unknown error occurred.' };
  }
}
