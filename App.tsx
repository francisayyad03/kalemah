import { View, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useGame } from './src/game/useGame';
import { Board } from './src/components/board';
import { Keyboard } from './src/components/keyboard';
import { getKeyboardState } from './src/game/keyboardState';
import { GameOverModal } from './src/components/GameOverModal';
import { useState } from 'react';
import { StatsModal } from './src/components/statsModal';
import { HelpModal } from './src/components/helpModal';

export default function App() {
  const game = useGame();
  const keyStates = getKeyboardState(game.results);

  const [showModal, setShowModal] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);

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
          onEnter={game.submitGuess}
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
          onClose={() => setShowModal(false)}
        />
      )}

      {/* HELP MODAL (simple placeholder) */}
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
    borderBottomWidth: 4,          // thicker “border” like you wanted
    borderBottomColor: '#3E5F3C',  // olive accent border
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIconLeft: {
    position: 'absolute',
    left: 16,
    bottom: 12,
    padding: 6
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

  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },

  keyboardContainer: {
    paddingBottom: 16,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 20,
  },

  modalCard: {
    backgroundColor: '#2E2B28',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },

  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },

  modalText: {
    color: '#E8E6E3',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },

  modalButton: {
    marginTop: 14,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#3E5F3C',
  },

  modalButtonText: {
    color: 'white',
    fontWeight: '700',
  },
});