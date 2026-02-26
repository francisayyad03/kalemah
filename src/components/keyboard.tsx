import { View, StyleSheet } from 'react-native';
import { Key } from './key';

interface KeyboardProps {
  onKey: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  keyStates: Map<string, 'correct' | 'present' | 'absent'>;
}

const ROWS = [
  ['ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج'],
  ['ش','س','ي','ب','ل','ا','ت','ن','م','ك','ة'],
  ['Enter','ء','ظ','ط','ذ','د','ز','ر','و','ى', '⌫'],
];

export function Keyboard({
  onKey,
  onEnter,
  onBackspace,
  keyStates,
}: KeyboardProps) {
  return (
    <View style={styles.keyboard}>
      {ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map(key => {
            if (key === 'Enter') {
              return (
                <Key
                  key={key}
                  label="↵"
                  wide
                  onPress={onEnter}
                />
              );
            }

            if (key === '⌫') {
              return (
                <Key
                  key={key}
                  label="⌫"
                  wide
                  onPress={onBackspace}
                />
              );
            }

            return (
              <Key
                key={key}
                label={key}
                state={keyStates.get(key)}
                onPress={() => onKey(key)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2
  },
});
