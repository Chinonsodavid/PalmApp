import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Do 5 finger stretches', done: false },
    { id: 2, text: 'Take 3 deep breaths', done: false },
    { id: 3, text: 'Tap Palm gently for 10s', done: false },
  ]);

  const [allDoneAt, setAllDoneAt] = useState(null);
  const [countdown, setCountdown] = useState('');
  const [note, setNote] = useState('');

  const allDone = tasks.every((task) => task.done);

  useEffect(() => {
    if (allDone && !allDoneAt) {
      const now = Date.now();
      setAllDoneAt(now + 24 * 60 * 60 * 1000);
    }
  }, [allDone]);

  useEffect(() => {
    if (!allDoneAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = allDoneAt - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setCountdown('00:00:00');
        setAllDoneAt(null);
        setTasks((prev) => prev.map((task) => ({ ...task, done: false })));
        return;
      }

      const hrs = String(Math.floor(remaining / (1000 * 60 * 60))).padStart(2, '0');
      const mins = String(Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const secs = String(Math.floor((remaining % (1000 * 60)) / 1000)).padStart(2, '0');

      setCountdown(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [allDoneAt]);

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  const handleSaveNote = async () => {
    if (!note.trim()) return;

    try {
      const existing = await AsyncStorage.getItem('journalNotes');
      const parsed = existing ? JSON.parse(existing) : [];

      const newEntry = {
        text: note.trim(),
        timestamp: new Date().toISOString(),
      };

      await AsyncStorage.setItem(
        'journalNotes',
        JSON.stringify([newEntry, ...parsed])
      );

      setNote('');
      alert('Note saved to Journal!');
    } catch (e) {
      console.error('Saving note failed', e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#0a1f2b" translucent={false} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Animation */}
        <LinearGradient
          colors={['#0a1f2b', '#1a3c4a']}
          style={styles.headerWrapper}
        >
          <LottieView
            source={require('../assets/animations/wave.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.contentWrapper}>
          <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Tasks</Text>
            <LinearGradient
              colors={['#4ecdc4', '#2a9d8f']}
              style={styles.taskCard}
            >
              {!allDone ? (
                tasks.map((task) => (
                  <Animated.View
                    key={task.id}
                    entering={FadeInLeft.delay(task.id * 100).duration(400)}
                    style={styles.taskRow}
                  >
                    <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                      {task.id === 1 && '✋ '}
                      {task.id === 2 && '🧘‍♂️ '}
                      {task.id === 3 && '💧 '}
                      {task.text}
                    </Text>
                    <Pressable onPress={() => toggleTask(task.id)} style={styles.taskButton}>
                      <Ionicons
                        name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
                        size={28}
                        color={task.done ? '#ffffff' : '#cccccc'}
                      />
                    </Pressable>
                  </Animated.View>
                ))
              ) : (
                <View style={styles.celebrationBox}>
                  <LottieView
                    source={require('../assets/animations/taskdone.json')}
                    autoPlay
                    loop={false}
                    style={styles.celebration}
                  />
                  <Text style={styles.doneText}>Well Done!</Text>
                  <Text style={styles.countdown}>Next tasks in {countdown}</Text>
                </View>
              )}
            </LinearGradient>
          </Animated.View>

          <View style={styles.row}>
            <Animated.View entering={FadeInLeft.delay(200).duration(500)} style={styles.squareCard}>
              <LinearGradient
                colors={['#3b3f40', '#2c2f30']}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.cardTitle}>⏰ Reminder</Text>
              <Text style={styles.cardSubtitle}>Set a new reminder to stay on track.</Text>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(300).duration(500)} style={styles.squareCard}>
              <LinearGradient
                colors={['#1d2b33', '#0f1a20']}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.cardTitle}>🌱 Daily Tip</Text>
              <Text style={styles.cardSubtitle}>Take 3 deep breaths and relax with Palm.</Text>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.journalBox}>
            <LinearGradient
              colors={['#11363f', '#0a252d']}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.journalLabel}>How do you feel today?</Text>
            <TextInput
              placeholder="Write a quick note..."
              placeholderTextColor="#aaaaaa"
              value={note}
              onChangeText={setNote}
              style={styles.journalInput}
              multiline
            />
            <Pressable style={styles.journalButton} onPress={handleSaveNote}>
              <LinearGradient
                colors={['#4ecdc4', '#2a9d8f']}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.journalButtonText}>Save to Journal</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1f2b',
  },
  container: {
    paddingBottom: 60,
  },
  headerWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingTop: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  lottie: {
    width: '100%',
    height: 200,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    // marginBottom: 30,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 15,
    letterSpacing: 1.5,
  },
  taskCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  taskText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
  taskTextDone: {
    color: '#aaaaaa',
    textDecorationLine: 'line-through',
  },
  taskButton: {
    padding: 8,
  },
  celebrationBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  celebration: {
    width: 200,
    height: 200,
  },
  doneText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: 10,
  },
  countdown: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '400',
    marginTop: 8,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  squareCard: {
    width: '48%',
    aspectRatio: 1,
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#dddddd',
    fontSize: 14,
    lineHeight: 20,
  },
  journalBox: {
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  journalLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  journalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    borderRadius: 12,
    padding: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  journalButton: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    overflow: 'hidden',
  },
  journalButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});