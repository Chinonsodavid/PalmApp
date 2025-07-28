import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
 

export default function HomeScreen() {
  const [daysWithoutThumbSucking, setDaysWithoutThumbSucking] = useState(0);
  const goal = 21;
  const TIPS = [
    "Stay positive and believe in yourself!",
    "Break the habit loop: identify triggers and avoid them.",
    "Keep your hands busy with a stress ball or fidget spinner.",
    "Practice mindfulness and deep breathing exercises.",
    "Reward yourself for small victories.",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  const quotes = [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future belongs to those who believe in the beauty of their dreams.",
  ];
  const [quote, setQuote] = useState('');

  const handleNextTip = () => {
    setTipIndex((prevIndex) => (prevIndex + 1) % TIPS.length);
  };

  const handleLogSlip = () => {
    Alert.alert(
      "Log a Slip",
      "Did you have a slip-up?",
      [
        { text: "No, continue streak", style: "cancel" },
        { text: "Yes, log it", onPress: () => setDaysWithoutThumbSucking(0) }
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={['#e0eafc', '#cfdef3']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Hey there 👋</Text>
        <Text style={styles.subheading}>Let's stay focused and make today count!</Text>

        <LinearGradient colors={['#a8edea', '#fed6e3']} style={styles.progressCard}>
          <View style={styles.progressCircleContainer}>
            <Progress.Circle
              size={100}
              progress={daysWithoutThumbSucking / goal}
              showsText={true}
              color="#247c6d"
              unfilledColor="#fff"
              borderWidth={0}
              thickness={10}
              formatText={() => `${daysWithoutThumbSucking}`}
              textStyle={{ color: '#247c6d', fontWeight: 'bold', fontSize: 32 }}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={styles.progressLabel}>You've gone</Text>
            <Text style={styles.progressSub}>without thumb sucking!</Text>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>🔥 Streak: {daysWithoutThumbSucking} days</Text>
            </View>
            <Text style={styles.goalText}>{goal - daysWithoutThumbSucking} days to your goal!</Text>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.tipCard}>
          <Text style={styles.tipTitle}>✨ Daily Tip</Text>
          <Text style={styles.tipText}>{TIPS[tipIndex]}</Text>
          <TouchableOpacity onPress={handleNextTip} style={styles.nextTipButton}>
            <Text style={styles.nextTipText}>Show another tip</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.quoteCard}>
          <Text style={styles.quoteText}>“{quote}”</Text>
        </LinearGradient>

        <TouchableOpacity style={styles.logButton} onPress={handleLogSlip}>
          <Text style={styles.logButtonText}>Log a Slip</Text>
        </TouchableOpacity>

        
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: '500',
    color: '#247c6d',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 17,
    color: '#247c6d',
    marginBottom: 28,
    opacity: 0.8,
  },
  progressCard: {
    padding: 28,
    borderRadius: 24,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },
  progressCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLabel: {
    color: '#247c6d',
    fontSize: 17,
    fontWeight: '600',
  },
  progressSub: {
    marginTop: 4,
    color: '#247c6d',
    fontSize: 15,
    opacity: 0.7,
  },
  streakBadge: {
    backgroundColor: '#fff8',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 10,
  },
  streakText: {
    color: '#247c6d',
    fontWeight: 'bold',
    fontSize: 15,
  },
  goalText: {
    color: '#247c6d',
    fontSize: 14,
    marginTop: 8,
    opacity: 0.6,
  },
  tipCard: {
    padding: 22,
    borderRadius: 22,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  tipTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#247c6d',
  },
  tipText: {
    marginTop: 10,
    fontSize: 16,
    color: '#247c6d',
    lineHeight: 23,
    fontWeight: '500',
  },
  nextTipButton: {
    marginTop: 14,
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#247c6d',
  },
  nextTipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  quoteCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
    alignItems: 'center',
  },
  quoteText: {
    color: '#247c6d',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  logButton: {
    backgroundColor: '#247c6d',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  logButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

});