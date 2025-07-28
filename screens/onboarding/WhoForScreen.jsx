// screens/WhoForScreen.jsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WhoForScreen({ navigation }) {
  return (
    <LinearGradient colors={['#031c26', '#0a3c3d']} style={styles.container}>
      <Text style={styles.title}>Who is Palm for?</Text>
      <Text style={styles.subtitle}>
        Let us guide you better — are you using Palm for yourself or helping someone else?
      </Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.optionText}>For Me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.optionText}>For My Child</Text>
        </TouchableOpacity>
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
