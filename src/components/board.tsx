import { View, StyleSheet } from 'react-native';
import {Tile} from './tile'
import { TileResult } from '../game/types';

interface BoardProps {
  guesses: string[];
  results: TileResult[][];
  currentGuess: string;
}

const ROWS = 6;
const COLS = 5;

export function Board({ guesses, results, currentGuess }: BoardProps) {
  return (
    <View style={styles.board}>
      {Array.from({ length: ROWS }).map((_, rowIndex) => {
        const guess = guesses[rowIndex];
        const result = results[rowIndex];

        return (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: COLS }).map((_, colIndex) => {
              let letter = '';
              let state;

              if (result) {
                letter = result[colIndex].letter;
                state = result[colIndex].state;
              } else if (rowIndex === guesses.length) {
                letter = currentGuess[colIndex] || '';
              }

              return (
                <Tile
                  key={colIndex}
                  letter={letter}
                  state={state}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row-reverse',
  },
});
