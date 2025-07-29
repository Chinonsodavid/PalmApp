// screens/OnboardingFrequencyScreen.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import { useAnimatedEntryAndPress } from '../hooks/useAnimatedEntry';

export default function OnboardingFrequencyScreen({ navigation }) {
  const oftenAnim = useAnimatedEntryAndPress(200);
  const sometimesAnim = useAnimatedEntryAndPress(400);
  const rarelyAnim = useAnimatedEntryAndPress(600); // new

  const handleSelection = async (frequency) => {
    try {
      await AsyncStorage.setItem('frequency', frequency);
      navigation.navigate('NextScreen'); // replace with actual next screen
    } catch (error) {
      console.error('Error saving frequency:', error);
    }
  };

  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <Text style={styles.title}>How often does it happen?</Text>
      <Text style={styles.subtitle}>
        Knowing how often thumb-sucking occurs helps us support you better.
      </Text>

      <View style={styles.buttonGroup}>
        <Pressable
          onPressIn={oftenAnim.onPressIn}
          onPressOut={oftenAnim.onPressOut}
          onPress={() => handleSelection('often')}
        >
          <Animated.View style={[styles.optionButton, oftenAnim.animatedStyle]}>
            <Text style={styles.optionText}>🕒 Very Often</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={sometimesAnim.onPressIn}
          onPressOut={sometimesAnim.onPressOut}
          onPress={() => handleSelection('sometimes')}
        >
          <Animated.View style={[styles.optionButton, sometimesAnim.animatedStyle]}>
            <Text style={styles.optionText}>⏳ Sometimes</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={rarelyAnim.onPressIn}
          onPressOut={rarelyAnim.onPressOut}
          onPress={() => handleSelection('rarely')}
        >
          <Animated.View style={[styles.optionButton, rarelyAnim.animatedStyle]}>
            <Text style={styles.optionText}>🧘‍♀️ Only When Stressed</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonGroup: {
    width: '100%',
    gap: 20,
  },
  optionButton: {
    backgroundColor: '#247c6d',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
