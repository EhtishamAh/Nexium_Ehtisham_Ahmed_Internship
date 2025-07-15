// file: lib/ai.ts

export function summarizeText(text: string, wordCount = 100): string {
  const cleanedText = text.replace(/\s+/g, ' ').trim();
  const words = cleanedText.split(' ');
  if (words.length <= wordCount) {
    return cleanedText;
  }
  return words.slice(0, wordCount).join(' ');
}

const urduDictionary: { [key: string]: string } = {
    'the': 'دی',
    'is': 'ہے',
    'a': 'ایک',
    'are': 'ہیں',
    'ai': 'مصنوعی ذہانت',
    'blog': 'بلاگ',
    'post': 'پوسٹ',
    'summary': 'خلاصہ',
    'this': 'یہ',
    'about': 'کے بارے میں',
    'and': 'اور',
    'it': 'یہ',
    'for': 'کے لیے',
    'to': 'کو',
    'in': 'میں',
    'of': 'کا',
    'models': 'ماڈلز',
    'google': 'گوگل',
    'paper': 'پیپر',
    'from': 'سے',
    'that': 'کہ',
    'with': 'کے ساتھ',
    'on': 'پر',
    'as': 'بطور',
    'at': 'پر',
    'by': 'کی طرف سے',
    'we': 'ہم',
    'they': 'وہ',
    'you': 'آپ',
    'can': 'سکتے ہیں',
    'will': 'کریں گے',
    'should': 'چاہیے',
    'data': 'ڈیٹا',
    'code': 'کوڈ',
    'system': 'سسٹم',
    'software': 'سافٹ ویئر',
    'users': 'صارفین',
    'features': 'خصوصیات',
    'new': 'نیا',
    'important': 'اہم',
    'similar': 'اسی طرح',
    'different': 'مختلف',
    'research': 'تحقیق',
    'technology': 'ٹیکنالوجی',
    'development': 'ڈیویلپمنٹ',
    'use': 'استعمال',
    'work': 'کام',
    'like': 'جیسے'
};

export function translateToUrdu(text: string): string {
    const words = text.toLowerCase().replace(/[.,]/g, '').split(' ');
    const translatedWords = words.map(word => urduDictionary[word] || word);
    return translatedWords.join(' ');
}