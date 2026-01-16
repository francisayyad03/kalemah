import { ANSWERS } from '../data/answers';

/**
 * Returns an integer day index since a fixed start date.
 * This guarantees the same word for everyone on the same day.
 */
function getDayIndex(): number {
  const start = new Date(2024, 0, 1);
  const today = new Date();

  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = today.getTime() - start.getTime();

  return Math.floor(diff / msPerDay);
}

/**
 * Pick the daily answer deterministically.
 */
export function getDailyWord(): string {
  const index = getDayIndex() % ANSWERS.length;
  return ANSWERS[index];
}
