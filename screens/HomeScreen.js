import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import LottieView from 'lottie-react-native';
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Do 5 finger stretches', done: false },
    { id: 2, text: 'Take 3 deep breaths', done: false },
    { id: 3, text: 'Tap Palm gently for 10s', done: false },
  ]);

  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  const allDone = tasks.every((task) => task.done);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Top Lottie Animation */}
        <LottieView
          source={require('../assets/animations/wave.json')}
          autoPlay
          loop
          style={styles.lottie}
        />

        {/* Greeting Section */}
        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.section}>
          <Text style={styles.greeting}>👋</Text>
          <Text style={styles.sub}>Let’s make today a thumb-free day!</Text>
        </Animated.View>

        {/* Tasks Section */}
        <View>
          <Text style={styles.dailyText}>Daily Tasks</Text>

          <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.card}>
            {!allDone ? (
              tasks.map((task) => (
                <View key={task.id} style={styles.taskRow}>
                  <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                    {task.text}
                  </Text>
                  <Pressable onPress={() => toggleTask(task.id)}>
                    <Ionicons
                      name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={26}
                      color={task.done ? '#2f9252' : '#fff'}
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
                <Text style={styles.doneText}>🎉 All tasks complete!</Text>
                <Text style={styles.nextTaskText}>Next task in: 24h</Text>
              </View>
            )}
          </Animated.View>
        </View>

        {/* Bottom Cards */}
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
  dailyText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#4ecdc4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    minHeight: 150,
    justifyContent: 'center',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  taskText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
  },
  taskTextDone: {
    color: '#d4f7d4',
    textDecorationLine: 'line-through',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  squareCard: {
    backgroundColor: '#3b3f40',
    borderRadius: 16,
    width: '48%',
    aspectRatio: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  squareCardAlt: {
    backgroundColor: '#1d2b33',
    borderRadius: 16,
    width: '48%',
    aspectRatio: 1,
    padding: 16,
    justifyContent: 'space-between',
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
  celebrationBox: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  celebration: {
    width: 180,
    height: 180,
  },
  doneText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  nextTaskText: {
    fontSize: 16,
    color: '#f3f3f3',
    marginTop: 6,
  },
});
