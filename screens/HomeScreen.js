import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <Text style={styles.greeting}>Hi there 👋</Text>
      <Text style={styles.message}>How are you feeling today?</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌱 Daily Encouragement</Text>
        <Text style={styles.cardText}>
          “You're doing better than you think. One step at a time.”
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  message: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff1ec',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#944e3d',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#5b3c36',
  },
});
