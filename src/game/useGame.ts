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

type Stats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // length 6
};

const DEFAULT_STATS: Stats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
};


export function useGame() {
  const [answer] = useState(getDailyWord);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [results, setResults] = useState<TileResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [status, setStatus] = useState<GameStatus>('playing');
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);

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

    if (normalizedGuess === normalizedAnswer) {
      setStatus('won');
      setStats(prev => {
      const guessesUsed = guesses.length + 1; // this submitted guess
      const dist = [...prev.guessDistribution];
      if (guessesUsed >= 1 && guessesUsed <= 6) dist[guessesUsed - 1]++;

      const currentStreak = prev.currentStreak + 1;

      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak,
        maxStreak: Math.max(prev.maxStreak, currentStreak),
        guessDistribution: dist,
      };
    });
      return;
    }

    if (nextGuesses.length >= MAX_GUESSES) {
      setStatus('lost');
      setStats(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      currentStreak: 0,
    }));
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
  stats,
};
}
