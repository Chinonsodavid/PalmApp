import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <LottieView
          source={require('../assets/animations/wave.json')} // Replace with your top animation
          autoPlay
          loop
          style={styles.lottie}
        />

        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.section}>
          <Text style={styles.greeting}>Hi there 👋</Text>
          <Text style={styles.sub}>Let’s make today a thumb-free day!</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Streak</Text>
          <Text style={styles.cardValue}>3 days</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.cardAlt}>
          <Text style={styles.cardTitle}>⏰ Reminder</Text>
          <Text style={styles.cardSub}>Set a new reminder to check in with Palm.</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(500)} style={styles.tipCard}>
          <Text style={styles.tipTitle}>🌱 Tip of the Day</Text>
          <Text style={styles.tipText}>
            When you feel the urge, take 3 deep breaths and use your Palm tool.
          </Text>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#031c26',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  lottie: {
    width: width * 0.8,
    height: 200,
    alignSelf: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 30,
  },
  greeting: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  sub: {
    color: '#bf988a',
    fontSize: 16,
    marginTop: 6,
  },
  card: {
    backgroundColor: '#4ecdc4',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardAlt: {
    backgroundColor: '#3b3f40',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardSub: {
    color: '#ccc',
    marginTop: 6,
  },
  tipCard: {
    backgroundColor: '#1d2b33',
    padding: 20,
    borderRadius: 20,
  },
  tipTitle: {
    color: '#f0e2d0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipText: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
});
