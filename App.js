import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WhoForScreen from './screens/onboarding/WhoForScreen';
import OnboardingFrequencyScreen from './screens/onboarding/OnboardingFrequencyScreen';
import OnboardingTriggerScreen from './screens/onboarding/OnboardingTriggerScreen';
import AllSetScreen from './screens/onboarding/AllSetScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ReminderScreen from './screens/ReminderScreen';
import StreakScreen from './screens/StreakScreen';
import SettingsScreen from './screens/SettingsScreen';
import AppNavigator from './screens/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import './global.css';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* LOADING  */}
        <Stack.Screen name="Loading" component={LoadingScreen} />
        {/* ONBOARDING */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="WhoFor" component={WhoForScreen} />
        <Stack.Screen name="OnboardingFrequency" component={OnboardingFrequencyScreen} />
        <Stack.Screen name="OnboardingTrigger" component={OnboardingTriggerScreen} />
        <Stack.Screen name="AllSet" component={AllSetScreen} />
        {/* AUTHENTICATION */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="PasswordReset" component={ForgotPasswordScreen} />
        {/* SCREEN */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="Streak" component={StreakScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* THE NAV */}
        <Stack.Screen name="App" component={AppNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
