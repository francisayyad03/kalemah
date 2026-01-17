import { TileResult } from './types';

export type KeyState = 'correct' | 'present' | 'absent';

/**
 * Derive keyboard coloring from previous guess results.
 * Priority: correct > present > absent
 */
export function getKeyboardState(
  results: TileResult[][]
): Map<string, KeyState> {
  const map = new Map<string, KeyState>();

  for (const row of results) {
    for (const tile of row) {
      const prev = map.get(tile.letter);

      if (tile.state === 'correct') {
        map.set(tile.letter, 'correct');
      } else if (tile.state === 'present' && prev !== 'correct') {
        map.set(tile.letter, 'present');
      } else if (tile.state === 'absent' && !prev) {
        map.set(tile.letter, 'absent');
      }
    }
  }

  return map;
}
