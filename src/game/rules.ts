import { TileResult } from './types';

/**
 * Compare a guess against the answer and return tile states.
 * Wordle-style matching:
 * 1. Mark correct letters (green)
 * 2. Mark present letters (yellow) using remaining frequency
 * 3. Remaining letters are absent (gray)
 */
export function evaluateGuess(
  guess: string,
  answer: string
): TileResult[] {
  const result: TileResult[] = [];
  const answerLetters = answer.split('');
  const guessLetters = guess.split('');

  // Track which letters in the answer are already matched
  const used = new Array(answerLetters.length).fill(false);

  // First pass: correct (green)
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i] = { letter: guessLetters[i], state: 'correct' };
      used[i] = true;
    } else {
      result[i] = { letter: guessLetters[i], state: 'absent' };
    }
  }

  // Second pass: present (yellow)
  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i].state === 'correct') continue;

    for (let j = 0; j < answerLetters.length; j++) {
      if (!used[j] && guessLetters[i] === answerLetters[j]) {
        result[i] = { letter: guessLetters[i], state: 'present' };
        used[j] = true;
        break;
      }
    }
  }

  return result;
}
