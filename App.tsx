import { View, StyleSheet, Text } from 'react-native';
import { useGame } from './src/game/useGame';
import { Board } from './src/components/board';
import { Keyboard } from './src/components/keyboard';
import { getKeyboardState } from './src/game/keyboardState';

export default function App() {
  const game = useGame();
  const keyStates = getKeyboardState(game.results);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}></Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121213',
  },

  header: {
    paddingTop: 48,        // accounts for notch
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2c',
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
});
