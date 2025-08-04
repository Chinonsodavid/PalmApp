import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function JournalScreen() {
  const [entries, setEntries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadEntries = async () => {
        try {
          const json = await AsyncStorage.getItem('journalEntries');
          const parsed = json ? JSON.parse(json) : [];
          const sorted = parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setEntries(sorted);
        } catch (e) {
          console.error('Failed to load journal entries:', e);
        }
      };
      loadEntries();
    }, [])
  );

  const renderItem = ({ item }) => {
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View style={styles.card}>
        <Text style={styles.entryText}>{item.text}</Text>
        <Text style={styles.timestamp}>{formattedDate} • {formattedTime}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📔 Your Journal</Text>

      {entries.length === 0 ? (
        <Text style={styles.empty}>No entries yet. Write a quick note on the home page!</Text>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#14313f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  entryText: {
    fontSize: 16,
    color: '#e6f0f2',
    marginBottom: 6,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: '#8eaeb7',
  },
  empty: {
    fontSize: 16,
    color: '#7a9ea5',
    textAlign: 'center',
    marginTop: 60,
  },
});
