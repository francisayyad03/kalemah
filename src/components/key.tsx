import { Pressable, Text, StyleSheet } from 'react-native';

interface KeyProps {
  label: string;
  onPress: () => void;
  wide?: boolean;
  state?: 'correct' | 'present' | 'absent';
}

export function Key({ label, onPress, wide, state }: KeyProps) {
  const backgroundColor =
    state === 'correct'
      ? '#42762C'
      : state === 'present'
      ? '#FED300'
      : state === 'absent'
      ? '#C65D3B'
      : '#818384';

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.key,
        wide && styles.wide,
        { backgroundColor },
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  key: {
    flex: 1,
    margin: 3,
    paddingVertical: 18,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wide: {
    flex: 1.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
