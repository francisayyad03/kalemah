export type TileState = 'correct' | 'present' | 'absent';

export interface TileResult {
  letter: string;
  state: TileState;
}
