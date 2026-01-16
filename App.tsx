import { View, Text, StyleSheet } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Arabic Wordle 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121213',
  },
  text: {
    color: 'white',
    fontSize: 32,
  },
});


