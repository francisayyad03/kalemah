import { useState } from 'react';
import { evaluateGuess } from './rules';
import { isGuessAllowed } from './validator';
import { getDailyWord } from './dailyword';
import { TileResult } from './types';
import { ALLOWED_WORDS } from '../data/allowed';
import { normalizeArabic } from '../utils/arabic';

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export type GameStatus = 'playing' | 'won' | 'lost';

export function useGame() {
  const [answer] = useState(getDailyWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<TileResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');

  function addLetter(letter: string) {
    if (status !== 'playing') return;
    if (currentGuess.length >= WORD_LENGTH) return;

    setCurrentGuess(prev => prev + letter);
  }

  function removeLetter() {
    if (status !== 'playing') return;

    setCurrentGuess(prev => prev.slice(0, -1));
  }

  function submitGuess() {
    console.log('Submitting guess:', currentGuess, currentGuess.length);
    if (status !== 'playing') return;
    if (currentGuess.length !== WORD_LENGTH) return;

    if (!isGuessAllowed(currentGuess, ALLOWED_WORDS)) {
      alert('Word not in list');
      console.log('Guess not allowed:', currentGuess);
      return;
    }

    const normalizedGuess = normalizeArabic(currentGuess);
    const normalizedAnswer = normalizeArabic(answer);

    const evaluation = evaluateGuess(normalizedGuess, normalizedAnswer);

    const nextGuesses = [...guesses, currentGuess];
    const nextResults = [...results, evaluation];

    setGuesses(nextGuesses);
    setResults(nextResults);
    setCurrentGuess('');

    if (currentGuess === answer) {
      setStatus('won');
      return;
    }

    if (nextGuesses.length >= MAX_GUESSES) {
      setStatus('lost');
    }
  }

return {
  answer,
  guesses,
  results,
  currentGuess,
  status,
  addLetter,
  removeLetter,
  submitGuess,
};
}
