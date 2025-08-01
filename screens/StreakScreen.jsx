import { View, Text, StyleSheet } from 'react-native';

export default function StreakScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔥 Streak Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});
