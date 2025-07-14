import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [daysWithoutThumbSucking, setDays] = useState(5); // placeholder

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.heading}>Hey there 👋</Text>
      <Text style={styles.subheading}>Let's stay focused and make today count!</Text>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>You've gone</Text>
        <Text style={styles.progressValue}>{daysWithoutThumbSucking} days</Text>
        <Text style={styles.progressSub}>without thumb sucking!</Text>
      </View>

      {/* Daily Tip */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>✨ Daily Tip</Text>
        <Text style={styles.tipText}>
          Keep your hands busy with a small activity — like doodling or squeezing a stress ball!
        </Text>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log a Slip</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>You're doing great. Keep it up! 💪</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26',
  },
  content: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: '#247c6d',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  progressLabel: {
    color: '#fff',
    fontSize: 16,
  },
  progressValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  progressSub: {
    marginTop: 4,
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  tipCard: {
    backgroundColor: '#bf988a',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#031c26',
  },
  tipText: {
    marginTop: 8,
    fontSize: 16,
    color: '#031c26',
    lineHeight: 22,
  },
  logButton: {
    backgroundColor: '#bf988a',
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 30,
  },
  logButtonText: {
    color: '#031c26',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
    opacity: 0.7,
  },
});