import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text className="text-white text-6xl font-black tracking-widest mb-10">
        PALM
      </Text>
      <ActivityIndicator size="large" color="#bf988a" />
    </View>
  );
}