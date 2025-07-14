// file: app/actions.ts
'use server';

import * as cheerio from 'cheerio';

export async function scrapeAndSummarise(url: string) {
  if (!url) {
    return { error: 'URL is required.' };
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { error: `Failed to fetch URL: ${response.statusText}` };
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    // A common strategy: find the main content area or just grab all paragraph text.
    // This selector might need to be adjusted for different sites.
    const mainContent = $('article, main, .post-content, .blog-post').text();
    const fullText = mainContent || $('p').text();

    if (!fullText) {
      return { error: 'Could not extract any text from the page.' };
    }

    // We'll add summarization and DB logic here in the next phases.
    // For now, let's return a snippet of the scraped text.
    const simulatedSummary = fullText.trim().substring(0, 500) + '...';

    return {
      summary: simulatedSummary,
      fullText: fullText.trim()
    };

  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
        return { error: `An error occurred: ${error.message}` };
    }
    return { error: 'An unknown error occurred.' };
  }
}