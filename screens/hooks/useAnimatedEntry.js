// hooks/useAnimatedEntryAndPress.js
import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withDelay, withSpring } from 'react-native-reanimated';

export function useAnimatedEntryAndPress(delay = 0, translateYFrom = 20) {
  // Entry animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(translateYFrom);

  // Press animation value
  const scale = useSharedValue(1);

  // Trigger entry animation once mounted
  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 500 }));
  }, []);

  // Combined style: entry + press
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Press event handlers
  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
}
