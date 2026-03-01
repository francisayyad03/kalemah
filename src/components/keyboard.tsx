import React, { useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Key, KeyState } from './key';

interface KeyboardProps {
  onKey: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  keyStates: Map<string, KeyState>;
}

const ROWS: Array<Array<string>> = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', '⌫'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ة'],
  ['ء', 'ظ', 'ط', 'ذ', 'د', 'ز', 'ر', 'و', 'ى', 'Enter'],
];

const KEY_H_MARGIN = 2.5;
const OUTER_PADDING = 6;
const MAX_KEYS = 12;

export function Keyboard({ onKey, onEnter, onBackspace, keyStates }: KeyboardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;
  const isLargePhone = !isTablet && screenWidth >= 390;

  const { keyWidth, keyHeight, fontSize } = useMemo(() => {
    const isTablet = screenWidth >= 768;
    const isLargePhone = !isTablet && screenWidth >= 390;

    const available = screenWidth - OUTER_PADDING * 2;

    const totalMargins = MAX_KEYS * KEY_H_MARGIN * 2;
    let w = Math.floor((available - totalMargins) / MAX_KEYS);

    const minW = isTablet ? 42 : isLargePhone ? 26 : 24;
    const maxW = isTablet ? 62 : isLargePhone ? 40 : 36;
    w = Math.max(minW, Math.min(maxW, w));

    const minH = isTablet ? 50 : isLargePhone ? 54 : 40;
    const maxH = isTablet ? 64 : isLargePhone ? 68 : 50;
    const h = Math.max(minH, Math.min(maxH, Math.round(w * 1.15)));

    const fs = isTablet ? Math.round(w * 0.48) : Math.round(w * 0.55);
    const clampedFs = Math.max(20, Math.min(26, fs));

    return { keyWidth: w, keyHeight: h, fontSize: clampedFs };
  }, [screenWidth]);

  return (
    <View style={[styles.outer, { paddingHorizontal: OUTER_PADDING, marginBottom: isLargePhone ? 24 : 0 }]}>
      {ROWS.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((k) => {
            if (k === 'Enter') {
              return (
                <Key
                  key="Enter"
                  label="↵"
                  kind="action"
                  width={keyWidth}
                  height={keyHeight}
                  fontSize={fontSize}
                  onPress={onEnter}
                />
              );
            }

            if (k === '⌫') {
              return (
                <Key
                  key="backspace"
                  label="⌫"
                  kind="action"
                  width={keyWidth}
                  height={keyHeight}
                  fontSize={fontSize}
                  onPress={onBackspace}
                />
              );
            }

            return (
              <Key
                key={k}
                label={k}
                width={keyWidth}
                height={keyHeight}
                fontSize={fontSize}
                state={keyStates.get(k)}
                onPress={() => onKey(k)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
