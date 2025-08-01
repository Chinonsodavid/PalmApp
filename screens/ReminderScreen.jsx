import { View, Text, StyleSheet } from 'react-native';

export default function ReminderScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🕰️ Reminder Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05262e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});
