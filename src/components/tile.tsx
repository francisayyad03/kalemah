// tile.tsx
import { View, Text, StyleSheet } from 'react-native';
import { TileState } from '../game/types';

interface TileProps {
  letter?: string;
  state?: TileState;
  size: number;
}

export function Tile({ letter = '', state, size }: TileProps) {
  const backgroundColor =
    state === 'correct'
      ? '#42762C'
      : state === 'present'
      ? '#FED300'
      : state === 'absent'
      ? '#C65D3B'
      : '#B8A89A';

  const borderColor = letter ? '#565758' : '#3f3a34';
  const fontSize = Math.round(size * 0.55);

  return (
    <View style={[styles.tile, { backgroundColor, borderColor, width: size, height: size }]}>
      <Text style={[styles.letter, { fontSize }]}>{letter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    margin: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
});