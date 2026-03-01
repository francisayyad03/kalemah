import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import {COLORS} from '../utils/colors';

import KalemahLogo from '../media/kalemah.svg';
// ───────────────────────────────────────

const LOGO_W = 320;
const LOGO_H = 75;

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const opacity   = useRef(new Animated.Value(0)).current;
  const scale     = useRef(new Animated.Value(0.82)).current;
  const screenOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(1400),

      Animated.timing(screenOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOut }]}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <KalemahLogo width={LOGO_W} height={LOGO_H} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.charcoal,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
