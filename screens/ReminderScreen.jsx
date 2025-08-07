// ReminderScreen.jsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ReminderScreen() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to send notifications is required!');
      }
    }
  };

  const scheduleReminder = async () => {
    const now = new Date();
    const selected = new Date(time);

    // If the selected time is earlier than now, schedule for tomorrow
    if (selected <= now) {
      selected.setDate(selected.getDate() + 1);
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Time to check in!',
        body: 'This is your Palm reminder 🌿',
      },
      trigger: {
        hour: selected.getHours(),
        minute: selected.getMinutes(),
        repeats: true,
      },
    });

    await AsyncStorage.setItem('reminderTime', selected.toISOString());

    Alert.alert('✅ Reminder Set', `We'll remind you daily at ${selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 Daily Reminder</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Choose Time</Text>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowPicker(true)}
        >
          <Ionicons name="time-outline" size={24} color="#fff" />
          <Text style={styles.timeText}>
            {time.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            mode="time"
            value={time}
            is24Hour={false}
            display="spinner"
            onChange={(event, selected) => {
              setShowPicker(Platform.OS === 'ios');
              if (selected) setTime(selected);
            }}
          />
        )}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={scheduleReminder}
        >
          <Text style={styles.saveButtonText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#0f2a34',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#ddd',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3d47',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4cd137',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

