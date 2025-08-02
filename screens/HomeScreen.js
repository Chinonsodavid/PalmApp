import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { FadeInUp, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Do 5 finger stretches', done: false },
    { id: 2, text: 'Take 3 deep breaths', done: false },
    { id: 3, text: 'Tap Palm gently for 10s', done: false },
  ]);

  const [allDoneAt, setAllDoneAt] = useState(null);
  const [countdown, setCountdown] = useState('');

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

  return (
    <View style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#05252f" translucent={false} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Lottie Animation */}
        <View style={styles.lottieWrapper}>
          <LottieView
            source={require('../assets/animations/wave.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>

        {/* Content below Lottie gets padding */}
        <View style={{ paddingHorizontal: 20, paddingTop: 40 }}>
          <View style={styles.section}>
            <Text style={styles.dailyText}>Daily Tasks</Text>

            <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.card}>
              {!allDone ? (
                tasks.map((task) => (
                  <View key={task.id} style={styles.taskRow}>
                    <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                      {task.id === 1 && '✋'} {task.id === 2 && '🧘‍♂️'} {task.id === 3 && '💧'} {task.text}
                    </Text>
                    <Pressable onPress={() => toggleTask(task.id)}>
                      <Ionicons
                        name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
                        size={28}
                        color={task.done ? '#2f9252' : '#ccc'}
                      />
                    </Pressable>
                  </View>
                ))
              ) : (
                <View style={styles.celebrationBox}>
                  <LottieView
                    source={require('../assets/animations/taskdone.json')}
                    autoPlay
                    loop
                    style={styles.celebration}
                  />
                  <Text style={styles.doneText}>Next tasks available in</Text>
                  <Text style={styles.countdown}>{countdown}</Text>
                </View>
              )}
            </Animated.View>
          </View>

          <View style={styles.row}>
            <Animated.View entering={FadeInLeft.delay(300).duration(500)} style={styles.squareCard}>
              <Text style={styles.cardTitle}>⏰ Reminder</Text>
              <Text style={styles.cardSubSmall}>Set a new reminder.</Text>
            </Animated.View>

            <Animated.View entering={FadeInRight.delay(400).duration(500)} style={styles.squareCardAlt}>
              <Text style={styles.cardTitle}>🌱 Tip</Text>
              <Text style={styles.cardSubSmall}>Take 3 deep breaths and use Palm.</Text>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#031c26',
  },
  container: {
    paddingBottom: 40,
  },
  lottieWrapper: {
    width: '100%',
    backgroundColor: '#05252f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingTop: 70,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  lottie: {
    width: '100%',
    height: 220,
  },
  section: {
    marginTop: 60,
    marginBottom: 30,
  },
  dailyText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 15,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#4ecdc4',
    borderRadius: 15,
    padding: 20,
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  taskText: {
    flex: 1,
    color: '#333',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10,
  },
  taskTextDone: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  celebrationBox: {
    alignItems: 'center',
  },
  celebration: {
    width: 190,
    height: 190,
  },
  doneText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'normal',
    letterSpacing: 1,
  },
  countdown: {
    fontSize: 25,
    color: '#f7f7f7',
    fontWeight: 'normal',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
  },
  squareCard: {
    backgroundColor: '#3b3f40',
    width: '48%',
    aspectRatio: 1,
    padding: 16,
    justifyContent: 'space-between',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  squareCardAlt: {
    backgroundColor: '#1d2b33',
    width: '48%',
    aspectRatio: 1,
    padding: 16,
    justifyContent: 'space-between',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubSmall: {
    color: '#eee',
    fontSize: 13,
    marginTop: 4,
  },
});
