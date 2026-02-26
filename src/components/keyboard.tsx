import { View, StyleSheet, useWindowDimensions } from 'react-native';
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

export function Keyboard({ onKey, onEnter, onBackspace, keyStates }: KeyboardProps) {
  const { height, width } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isTablet = shortSide >= 768;
  const isSmallPhone = !isTablet && height <= 700;

  const compact = isSmallPhone;

  const topGap = isTablet ? 18 : isSmallPhone ? 6 : 12;
  const rowGap = isTablet ? 6 : isSmallPhone ? 2 : 4;

  return (
    <View style={[styles.keyboard, { marginTop: topGap }]}>
      {ROWS.map((row, i) => (
        <View key={i} style={[styles.row, { marginVertical: rowGap / 2 }]}>
          {row.map(key => {
            if (key === 'Enter') {
              return <Key key={key} label="↵" wide onPress={onEnter} compact={compact} />;
            }
            if (key === '⌫') {
              return <Key key={key} label="⌫" wide onPress={onBackspace} compact={compact} />;
            }
            return (
              <Key
                key={key}
                label={key}
                state={keyStates.get(key)}
                onPress={() => onKey(key)}
                compact = {compact}
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});