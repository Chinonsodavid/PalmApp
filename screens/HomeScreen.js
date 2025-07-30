import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.buddyText}>👋 Hey there! Ready to keep those thumbs busy?</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧠 Today's Tip</Text>
          <Text style={styles.tipText}>Try drawing something today!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱️ Progress Tracker</Text>
          <Text style={styles.progressText}>Thumb-free days: <Text style={styles.bold}>3</Text></Text>
          <Text style={styles.progressText}>Last slip: <Text style={styles.bold}>2 days ago</Text></Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧸 Tools for Today</Text>
          <Text style={styles.toolText}>• Breathing Exercise</Text>
          <Text style={styles.toolText}>• Fidget Toy Suggestion</Text>
          <Text style={styles.toolText}>• Nighttime Reminder</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.checkInButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => {
            // Optional: navigate to Check-In or trigger something
          }}
        >
          <Ionicons name="add-circle" size={22} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.checkInText}>Add Check-In</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  buddyText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#0e4b4b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#b8fff1',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  progressText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
    color: '#b8fff1',
  },
  toolText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  checkInButton: {
    flexDirection: 'row',
    backgroundColor: '#4ecdc4',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  checkInText: {
    color: '#031c26',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
