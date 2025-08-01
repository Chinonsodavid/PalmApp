import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ReminderScreen from './ReminderScreen';
import StreakScreen from './StreakScreen';
import SettingsScreen from './SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#031c26',
          borderTopWidth: 0,
          paddingTop: 8,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Reminder':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Streak':
              iconName = focused ? 'flame' : 'flame-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#bf988a',
        tabBarInactiveTintColor: '#7a7a7a',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reminder" component={ReminderScreen} />
      <Tab.Screen name="Streak" component={StreakScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
