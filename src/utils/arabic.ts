const HARAKAT_REGEX = /[\u064B-\u0652]/g;

// Allowed Arabic letters (hamza variants DISTINCT)
export const ARABIC_LETTERS = new Set([
  'ا', 'أ', 'إ', 'آ',
  'ب', 'ت', 'ث',
  'ج', 'ح', 'خ',
  'د', 'ذ',
  'ر', 'ز',
  'س', 'ش',
  'ص', 'ض',
  'ط', 'ظ',
  'ع', 'غ',
  'ف', 'ق', 'ك',
  'ل', 'م', 'ن',
  'ه', 'و', 'ي',
  'ة', 'ى',
]);

/**
 * Remove Arabic diacritics (harakat) from a word.
 * Does NOT normalize letters.
 */
export function stripHarakat(word: string): string {
  return word.replace(HARAKAT_REGEX, '');
}

/**
 * Check if a string consists only of allowed Arabic letters.
 */
export function isValidArabicWord(word: string): boolean {
  if (!word) return false;

  for (const char of word) {
    if (!ARABIC_LETTERS.has(char)) {
      return false;
    }
  }
  return true;
}

/**
 * Validate a guess:
 * - No harakat
 * - Exactly 4 letters
 * - Arabic letters only
 */
export function validateGuess(word: string): boolean {
  const clean = stripHarakat(word);

  if (clean.length !== 4) return false;

  return isValidArabicWord(clean);
}
