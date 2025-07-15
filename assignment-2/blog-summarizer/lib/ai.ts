// file: lib/ai.ts

// 1. Simulated Summarization Logic
export function summarizeText(text: string, wordCount = 50): string {
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const words = cleanedText.split(' ');
  if (words.length <= wordCount) {
    return cleanedText;
  }
  return words.slice(0, wordCount).join(' ') + '...';
}

// 2. JavaScript Dictionary for Translation
const urduDictionary: { [key: string]: string } = {
    'the': 'یہ',
    'is': 'ہے',
    'a': 'ایک',
    'blog': 'بلاگ',
    'post': 'پوسٹ',
    'summary': 'خلاصہ',
    'this': 'یہ',
    'about': 'کے بارے میں',
    'and': 'اور',
    'it': 'یہ',
    'web': 'ویب',
    'development': 'ڈیویلپمنٹ',
    'technology': 'ٹیکنالوجی'
};

// 3. Simple Translation Logic
export function translateToUrdu(text: string): string {
    const words = text.toLowerCase().replace(/[.,]/g, '').split(' ');
    const translatedWords = words.map(word => urduDictionary[word] || word);
    return translatedWords.join(' ');
}