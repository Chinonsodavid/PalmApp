import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { useAnimatedEntryAndPress } from '../hooks/useAnimatedEntry';
import LottieView from 'lottie-react-native';

export default function AllSetScreen({ navigation }) {
  const startAnim = useAnimatedEntryAndPress(200);

  const handleStart = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <View style={styles.content}>
        <LottieView
          source={require('../../assets/animations/clap.json')}
          autoPlay
          loop
          style={styles.animation}
        />

        <Text style={styles.title}>You're All Set!</Text>
        <Text style={styles.subtitle}>
          Let’s begin your journey with Palm 🖐️
        </Text>

        <Pressable
          onPressIn={startAnim.onPressIn}
          onPressOut={startAnim.onPressOut}
          onPress={handleStart}
          style={styles.buttonWrapper}
        >
          <Animated.View style={[styles.startButton, startAnim.animatedStyle]}>
            <Text style={styles.startText}>Start</Text>
          </Animated.View>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  animation: {
    width: 300,
    height: 300,
    marginBottom: 4, // Reduced spacing between animation and title
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  startButton: {
    backgroundColor: '#4ecdc4',
    paddingVertical: 14,
    paddingHorizontal: 55,
    borderRadius: 24,
    alignItems: 'center',
  },
  startText: {
    color: '#031c26',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
