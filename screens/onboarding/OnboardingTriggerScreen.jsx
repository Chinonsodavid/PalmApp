import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import { useAnimatedEntryAndPress } from '../hooks/useAnimatedEntry';

export default function OnboardingTriggerScreen({ navigation }) {
  const triggers = [
    { key: 'bored', label: '😐 Bored', delay: 200 },
    { key: 'tired', label: '😴 Tired', delay: 400 },
    { key: 'stressed', label: '😣 Stressed', delay: 600 },
    { key: 'watching', label: '📺 Watching TV', delay: 800 },
    { key: 'bedtime', label: '🌙 Bedtime', delay: 1000 },
  ];

  const handleSelection = async (trigger) => {
    try {
      await AsyncStorage.setItem('trigger', trigger);
      navigation.navigate('AllSet'); // replace with actual next screen
    } catch (error) {
      console.error('Error saving trigger:', error);
    }
  };

  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <Text style={styles.title}>When do you notice it happening?</Text>
      <Text style={styles.subtitle}>
        Choose the moment that usually leads to thumb-sucking.
      </Text>

      <View style={styles.buttonGroup}>
        {triggers.map(({ key, label, delay }) => {
          const anim = useAnimatedEntryAndPress(delay);
          return (
            <Pressable
              key={key}
              onPressIn={anim.onPressIn}
              onPressOut={anim.onPressOut}
              onPress={() => handleSelection(key)}
            >
              <Animated.View style={[styles.optionButton, anim.animatedStyle]}>
                <Text style={styles.optionText}>{label}</Text>
              </Animated.View>
            </Pressable>
          );
        })}
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
