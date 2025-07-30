import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to Login after loading
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/load.json')}
        autoPlay
        loop
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26', // your app's primary
    justifyContent: 'center',
    alignItems: 'center',
  },
});
