import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Tile } from './tile';
import { TileResult } from '../game/types';

interface BoardProps {
  guesses: string[];
  results: TileResult[][];
  currentGuess: string;
}

const ROWS = 6;
const COLS = 5;

export function Board({ guesses, results, currentGuess }: BoardProps) {
  const { width, height } = useWindowDimensions();

  const shortSide = Math.min(width, height);
  const isTablet = shortSide >= 768;

  const boardMaxWidth = width * (isTablet ? 0.75 : 0.92);
  const boardMaxHeight = height * (isTablet ? 0.62 : 0.50);

  const gap = isTablet ? 10 : 1;

  const tileByWidth = Math.floor((boardMaxWidth - gap * (COLS - 1)) / COLS);
  const tileByHeight = Math.floor((boardMaxHeight - gap * (ROWS - 1)) / ROWS);

  let tileSize = Math.min(tileByWidth, tileByHeight);

  if (isTablet) {
    tileSize = Math.max(56, Math.min(tileSize, 90)); // iPad bigger
  } else {
    tileSize = Math.max(40, Math.min(tileSize, 56));  // phones capped
  }

  const boardWidth = tileSize * COLS + gap * (COLS - 1);

  return (
    <View style={[styles.board, { width: boardWidth }]}>
      {Array.from({ length: ROWS }).map((_, rowIndex) => {
        const result = results[rowIndex];

        return (
          <View key={rowIndex} style={[styles.row, { gap, marginBottom: gap }]}>
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
                  size={tileSize}
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row-reverse',
  },
});