import { normalizeArabic, validateGuess } from '../utils/arabic';

/**
 * Check whether a guess is valid:
 * - Correct Arabic letters
 * - Correct length
 * - Exists in allowed words list
 */
export function isGuessAllowed(
  guess: string,
  allowedWords: Set<string>
): boolean {
  if (!validateGuess(guess)) {
    return false;
  }

  return allowedWords.has(normalizeArabic(guess));
}
