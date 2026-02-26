import { View, StyleSheet, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useGame } from './src/game/useGame';
import { Board } from './src/components/board';
import { Keyboard } from './src/components/keyboard';
import { getKeyboardState } from './src/game/keyboardState';
import { GameOverModal } from './src/components/GameOverModal';
import { useState, useEffect, useRef } from 'react';
import { StatsModal } from './src/components/statsModal';
import { HelpModal } from './src/components/helpModal';
import {
  SafeAreaView,
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppInner />
    </SafeAreaProvider>
  );
}

function AppInner() {
  const game = useGame();
  const keyStates = getKeyboardState(game.results);

  const [showModal, setShowModal] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isTablet = shortSide >= 768;
  const isSmallPhone = !isTablet && height <= 700;

  const iconSize = isTablet ? 26 : isSmallPhone ? 20 : 22;
  const titleSize = isTablet ? 34 : isSmallPhone ? 24 : 28;

  const safeTop = isTablet ? insets.top : Math.min(insets.top, 20);
  const headerTopPad = safeTop + (isSmallPhone ? 8 : 10);

  const headerBottomPad = isTablet ? 14 : isSmallPhone ? 10 : 12;

  const toastTop = headerTopPad + headerBottomPad + (isTablet ? 52 : 46);

  // ===== TOAST =====
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 1400);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          {
            paddingTop: headerTopPad,
            paddingBottom: headerBottomPad,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowHelp(true)}>
            <Image
              source={require('./src/media/question_mark.png')}
              style={{ width: iconSize, height: iconSize }}
            />
          </TouchableOpacity>

          <Text style={[styles.title, { fontSize: titleSize }]}>كلمة</Text>

          <TouchableOpacity style={styles.iconButton} onPress={() => setShowStats(true)}>
            <Image
              source={require('./src/media/stats.png')}
              style={{ width: iconSize, height: iconSize }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* TOAST */}
      {toastMessage && (
        <View style={[styles.toast, { top: toastTop }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* BOARD */}
      <View style={styles.boardContainer}>
        <Board
          guesses={game.guesses}
          results={game.results}
          currentGuess={game.currentGuess}
        />
      </View>

      {/* KEYBOARD */}
      <View style={[styles.keyboardContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <Keyboard
          onKey={game.addLetter}
          onEnter={() => {
            if (game.currentGuess.length !== 5) return;
            const ok = game.submitGuess();
            if (!ok) showToast('الكلمة غير موجودة في القائمة');
          }}
          onBackspace={game.removeLetter}
          keyStates={keyStates}
        />
      </View>

      {/* GAME OVER MODAL */}
      {game.status !== 'playing' && (
        <GameOverModal
          visible={showModal}
          status={game.status}
          answer={game.answer}
          stats={game.stats}
          results={game.results}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* HELP MODAL */}
      <HelpModal visible={showHelp} onClose={() => setShowHelp(false)} />

      {/* STATS MODAL */}
      <StatsModal visible={showStats} stats={game.stats} onClose={() => setShowStats(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2A28',
  },

  header: {
    borderBottomWidth: 4,
    borderBottomColor: '#3E5F3C',
  },

  headerRow: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconButton: {
    padding: 8,
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  toast: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
    borderColor: '#3A3A3A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    zIndex: 999,
  },

  toastText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },

  keyboardContainer: {},
});