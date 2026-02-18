// Arabic diacritics (harakat) Unicode range
const HARAKAT_REGEX = /[\u064B-\u0652]/g;

// All hamza variants (treated as the same letter)
const HAMZA_VARIANTS = new Set([
  'ء', 'أ', 'إ', 'آ', 'ؤ', 'ئ',
]);

// Allowed Arabic letters AFTER normalization
// (only ONE logical hamza remains: ء)
export const ARABIC_LETTERS = new Set([
  'ا', 'ء',
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
 */
export function stripHarakat(word: string): string {
  return word.replace(HARAKAT_REGEX, '');
}

/**
 * Normalize all hamza variants into ONE logical hamza (ء).
 */
export function normalizeHamza(word: string): string {
  return word
    .split('')
    .map(char => (HAMZA_VARIANTS.has(char) ? 'ء' : char))
    .join('');
}

/**
 * Check if a string consists only of allowed Arabic letters
 * (AFTER hamza normalization).
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
 * - Strip harakat
 * - Normalize hamza
 * - Exactly 5 letters
 * - Arabic letters only
 */

export function normalizeArabic(word: string): string {
  return normalizeHamza(stripHarakat(word));
}

export function validateGuess(word: string): boolean {
  const clean = normalizeArabic(word);
  if (clean.length !== 5) return false;
  return isValidArabicWord(clean);
}
