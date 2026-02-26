import { Pressable, Text, StyleSheet } from 'react-native';

interface KeyProps {
  label: string;
  onPress: () => void;
  wide?: boolean;
  state?: 'correct' | 'present' | 'absent';
  compact?: boolean;
}

export function Key({ label, onPress, wide, state, compact }: KeyProps) {
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
        compact && styles.compactKey,
        { backgroundColor },
      ]}
    >
      <Text style={[styles.text, compact && styles.compactText]}>{label}</Text>
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
  compactKey: {
    paddingVertical: 12,
    margin: 2,
  },
  wide: {
    flex: 1.5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  compactText: {
    fontSize: 14,
  },
});