import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useGame } from './src/game/useGame';
import { Board } from './src/components/board';
import { Keyboard } from './src/components/keyboard';
import { getKeyboardState } from './src/game/keyboardState';
import { GameOverModal } from './src/components/GameOverModal';
import { useState, useEffect, useRef } from 'react';
import { StatsModal } from './src/components/statsModal';
import { HelpModal } from './src/components/helpModal';

export default function App() {
  const game = useGame();
  const keyStates = getKeyboardState(game.results);

  const [showModal, setShowModal] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

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
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Left icon: Help */}
        <TouchableOpacity style={styles.headerIconLeft} onPress={() => setShowHelp(true)}>
          <Image source={require('./src/media/question_mark.png')} style={styles.headerIconImage} />
        </TouchableOpacity>

        {/* Center title/logo */}
        <Text style={styles.title}>كلمة</Text>

        {/* Right icon: Stats */}
        <TouchableOpacity style={styles.headerIconRight} onPress={() => setShowStats(true)}>
          <Image source={require('./src/media/stats.png')} style={styles.headerIconImage} />
        </TouchableOpacity>
      </View>

      {/* TOAST */}
      {toastMessage && (
        <View style={styles.toast}>
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
      <View style={styles.keyboardContainer}>
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
      <StatsModal
        visible={showStats}
        stats={game.stats}
        onClose={() => setShowStats(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2A28',
  },

  header: {
    paddingTop: 58,
    paddingBottom: 18,
    borderBottomWidth: 4,
    borderBottomColor: '#3E5F3C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIconLeft: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    padding: 6,
  },

  headerIconRight: {
    position: 'absolute',
    right: 16,
    bottom: 12,
    padding: 6,
  },

  headerIconImage: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  // ===== TOAST STYLES =====
  toast: {
    position: 'absolute',
    top: 110, // below header
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

  keyboardContainer: {
    paddingBottom: 16,
  },
});