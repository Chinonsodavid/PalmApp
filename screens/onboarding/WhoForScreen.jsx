// screens/WhoForScreen.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
import { useAnimatedEntryAndPress } from '../hooks/useAnimatedEntry';

export default function WhoForScreen({ navigation }) {
  const meAnim = useAnimatedEntryAndPress(200);
  const childAnim = useAnimatedEntryAndPress(400);

  const handleSelection = async (type) => {
    try {
      await AsyncStorage.setItem('userType', type);
      navigation.navigate('OnboardingFrequency');
    } catch (error) {
      console.error('Error saving user type:', error);
    }
  };

  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <Text style={styles.title}>Who is Palm for?</Text>
      <Text style={styles.subtitle}>
        Let us guide you better — are you using Palm for yourself or helping someone else?
      </Text>

      <View style={styles.buttonGroup}>
        <Pressable
          onPressIn={meAnim.onPressIn}
          onPressOut={meAnim.onPressOut}
          onPress={() => handleSelection('me')}
        >
          <Animated.View style={[styles.optionButton, meAnim.animatedStyle]}>
            <Text style={styles.optionText}>🧍 For Me</Text>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={childAnim.onPressIn}
          onPressOut={childAnim.onPressOut}
          onPress={() => handleSelection('child')}
        >
          <Animated.View style={[styles.optionButton, childAnim.animatedStyle]}>
            <Text style={styles.optionText}>🧒 For My Child</Text>
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
